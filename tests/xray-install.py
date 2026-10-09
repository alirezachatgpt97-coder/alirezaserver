import importlib.util,pathlib,subprocess,tempfile,time,unittest,os
ROOT=pathlib.Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('patcher',ROOT/'tools/nova-xray-patch.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
# Immutable upstream fixture path may be supplied; production installer never uses it.
FIXTURE=pathlib.Path(os.environ.get('NOVA_INSTALLER_FIXTURE',ROOT.parent/'server-work/nova/install/nova-node.sh'))
class XrayInstallTests(unittest.TestCase):
 def setUp(self):self.original=FIXTURE.read_text();self.patched=m.patch(self.original)
 def test_patch_is_confined_to_xray_stage(self):
  a=self.original.index('# ---- xray-core');b=self.original.index('# Geo databases:')
  self.assertEqual(self.original[:a],self.patched[:a]);self.assertTrue(self.patched.endswith(self.original[b:]))
  subprocess.run(['bash','-n'],input=self.patched,text=True,check=True)
 def test_changed_contract_refuses_patch(self):
  with self.assertRaises(ValueError):m.patch(self.original.replace(m.OLD,'changed',1))
 def test_embedded_patch_matches_source(self):
  s=(ROOT/'install.sh').read_text();self.assertIn((ROOT/'tools/nova-xray-patch.py').read_text(),s)
  self.assertEqual(s.count('patch_nova_xray "$'),2)
 def run_stage(self,script,mirror=0):
  begin=self.patched.index('if ! command -v xray');end=self.patched.index('# Repair a node',begin)
  stage=self.patched[begin:end].replace('240s','1s').replace('--kill-after=10s','--kill-after=1s')
  with tempfile.TemporaryDirectory() as d:
   stage=stage.replace('/usr/local/',d+'/local/')
   p=pathlib.Path(d)/'upstream.sh';p.write_text(script)
   harness='''set -Eeuo pipefail
say(){ echo "$*"; };warn(){ echo "$*"; };ok(){ echo "OK $*"; };die(){ echo "ERROR $*"; exit 1; }
mark_owned(){ echo "OWNED $*"; }
xray_installer(){ cp "$TEST_SCRIPT" "$1"; }
xray_latest_tag(){ echo v26.3.27; }
xray_from_mirror(){ echo MIRROR; return "$TEST_MIRROR"; }
XRAY_MIRROR_VERSION=26.3.27
'''+stage
   start=time.monotonic();r=subprocess.run(['bash'],input=harness,text=True,capture_output=True,timeout=6,env={**os.environ,'TEST_SCRIPT':str(p),'TEST_MIRROR':str(mirror),'TMPDIR':d})
   return r,time.monotonic()-start
 def test_success_does_not_use_mirror(self):
  r,_=self.run_stage('echo DOWNLOAD_VISIBLE\nexit 0\n');self.assertEqual(r.returncode,0);self.assertIn('DOWNLOAD_VISIBLE',r.stdout);self.assertNotIn('\nMIRROR\n',r.stdout)
 def test_failure_uses_mirror(self):
  r,_=self.run_stage('echo DOWNLOAD_FAILED\nexit 22\n');self.assertEqual(r.returncode,0);self.assertIn('MIRROR',r.stdout);self.assertIn('DOWNLOAD_FAILED',r.stdout+r.stderr)
 def test_hung_child_group_terminates_and_falls_back(self):
  r,t=self.run_stage('echo CONNECTING\nsleep 30 &\nwait\n');self.assertLess(t,4);self.assertEqual(r.returncode,0);self.assertIn('MIRROR',r.stdout)
 def test_total_failure_is_not_ok(self):
  r,_=self.run_stage('exit 22\n',1);self.assertNotEqual(r.returncode,0);self.assertNotIn('OK ',r.stdout);self.assertIn('ERROR',r.stdout)
 def run_mirror(self,checksum=0,binary=0,arch='x86_64'):
  a=self.patched.index('xray_from_mirror() {');b=self.patched.index('# Write xray',a)
  with tempfile.TemporaryDirectory() as d:
   function=self.patched[a:b].replace('/usr/local/',d+'/local/')
   pathlib.Path(d+'/local/bin').mkdir(parents=True);pathlib.Path(d+'/local/share/xray').mkdir(parents=True)
   harness='''set -Eeuo pipefail
uname(){ echo "$TEST_ARCH"; }
curl(){ echo "FETCH $*"; }
sha_is(){ echo CHECKSUM; return "$TEST_CHECKSUM"; }
unzip(){ printf '#!/bin/sh\\nexit %s\\n' "$TEST_BINARY" > "$TMPDIR"/payload; chmod +x "$TMPDIR"/payload; cp "$TMPDIR"/payload "${@: -1}/xray"; }
write_xray_unit(){ echo UNIT; }
XRAY_MIRROR_BASE=https://github.com/IRNova/Tools/releases/download/xray
'''+function+'\nif xray_from_mirror; then echo SUCCESS; else exit 1; fi\n'
   r=subprocess.run(['bash'],input=harness,text=True,capture_output=True,timeout=5,env={**os.environ,'TMPDIR':d,'TEST_ARCH':arch,'TEST_CHECKSUM':str(checksum),'TEST_BINARY':str(binary)})
   return r,pathlib.Path(d+'/local/bin/xray').exists()
 def test_mirror_checksum_failure_never_installs(self):
  r,exists=self.run_mirror(checksum=1);self.assertNotEqual(r.returncode,0);self.assertFalse(exists);self.assertNotIn('UNIT',r.stdout)
 def test_mirror_unusable_binary_never_installs(self):
  r,exists=self.run_mirror(binary=1);self.assertNotEqual(r.returncode,0);self.assertFalse(exists)
 def test_both_mirror_architectures_install_after_verification(self):
  for arch,asset in [('x86_64','Xray-linux-64.zip'),('aarch64','Xray-linux-arm64-v8a.zip')]:
   r,exists=self.run_mirror(arch=arch);self.assertEqual(r.returncode,0,r.stderr);self.assertTrue(exists);self.assertIn(asset,r.stdout);self.assertIn('--speed-time 30',r.stdout);self.assertIn('UNIT',r.stdout)
 def test_installer_skips_healthy_base_and_resumes_incomplete_base(self):
  s=(ROOT/'install.sh').read_text();self.assertIn('command -v xray >/dev/null && timeout',s);self.assertIn('systemctl cat xray.service',s)
if __name__=='__main__':unittest.main()
