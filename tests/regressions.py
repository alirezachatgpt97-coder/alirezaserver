import hashlib,importlib.util,json,pathlib,re,subprocess,tarfile,tempfile,unittest,io
ROOT=pathlib.Path(__file__).resolve().parents[1]
def load(name):
    spec=importlib.util.spec_from_file_location(name,ROOT/'addon'/f'{name}.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
class RegressionTests(unittest.TestCase):
    def test_embedded_sources_match_maintainable_sources(self):
        s=(ROOT/'install.sh').read_text();found={m[1]:m[3]+'\n' for m in re.finditer(r'cat > "\$APP/([^"\n]+)" <<\x27([^\x27]+)\x27\n(.*?)\n\2\n',s,re.S)}
        for p in (ROOT/'addon').iterdir():
            if p.is_file():self.assertEqual(found[p.name],p.read_text(),p.name)
    def test_sensitive_unchanged_baseline_modules(self):
        baseline=json.loads((ROOT/'docs/baseline.json').read_text())['addonFiles']
        for name in ['auth.py','model.mjs','firewall.py','dns-repair.py','update.py','update-hook.mjs','vault.mjs','theme.css','theme.js','alirezadns-brand.js']:
            self.assertEqual(hashlib.sha256((ROOT/'addon'/name).read_bytes()).hexdigest(),baseline[name],name)
    def test_no_css_or_extension_ai_injection_into_main_panel(self):
        s=(ROOT/'addon/preload.mjs').read_text();section=s[s.index('export function injectHTML'):s.index('let panelCache')]
        self.assertNotIn('extension.css',section);self.assertNotIn('theme.css',section);self.assertIn('brand.js',section)
        brand=(ROOT/'addon/brand.js').read_text();self.assertIn("['ai','AI']",brand)
    def test_adguard_proxy_is_unchanged_and_legacy_migration_is_not_invoked(self):
        s=(ROOT/'addon/preload.mjs').read_text();self.assertIn("headers={host:'127.0.0.1:18085'",s)
        installer=(ROOT/'install.sh').read_text();self.assertNotIn('python3 "$APP/dns-repair.py"',installer)
        self.assertIn('if not os.path.exists(root+\'/adguard/AdGuardHome.yaml\')',installer)
    def test_bootstrap_sha_is_exact(self):
        digest=hashlib.sha256((ROOT/'install.sh').read_bytes()).hexdigest();self.assertIn('SHA256='+digest,(ROOT/'setup.sh').read_text())
    def test_updater_rejects_archive_traversal_symlinks_and_preserves_safe_members(self):
        update=load('update')
        with tempfile.TemporaryDirectory() as d:
            root=pathlib.Path(d)
            for name,kind in [('../escape',tarfile.REGTYPE),('/absolute',tarfile.REGTYPE),('link',tarfile.SYMTYPE)]:
                archive=root/'bad.tar.gz'
                with tarfile.open(archive,'w:gz') as tar:
                    info=tarfile.TarInfo(name);info.type=kind;info.size=1 if kind==tarfile.REGTYPE else 0;info.linkname='/etc/passwd';tar.addfile(info,io.BytesIO(b'x') if info.size else None)
                with self.assertRaises(RuntimeError):update.safe_extract(archive,root/'out')
            archive=root/'good.tar.gz'
            with tarfile.open(archive,'w:gz') as tar:
                info=tarfile.TarInfo('src/module.mjs');info.size=2;tar.addfile(info,io.BytesIO(b'OK'))
            update.safe_extract(archive,root/'out');self.assertEqual((root/'out/src/module.mjs').read_text(),'OK')
    def test_destination_preflight_never_installs_packages_or_stops_services(self):
        m=load('alirezadns-remote');import inspect
        source=inspect.getsource(m.preflight)
        for action in ['apt-get','systemctl','write_text','unlink']:self.assertNotIn(action,source)
        installer=inspect.getsource(m.install);self.assertIn('preflight(cfg)',installer);self.assertIn('META.exists()',installer)
    def test_guarded_update_backups_precede_activation(self):
        source=(ROOT/'addon/update.py').read_text();self.assertIn('compat-check.mjs',source);self.assertIn('update-pending.json',source);self.assertIn('retry_health()',source);self.assertIn('restore(journal)',source)
    def test_backup_includes_encrypted_ai_and_consistent_database(self):
        source=(ROOT/'addon/backup.py').read_text();self.assertIn("ai.db",source);self.assertIn('src.backup(dst)',source);self.assertIn('var/lib/alirezaserver',source)
    def test_repair_compares_service_artifacts_and_avoids_source_builds(self):
        source=(ROOT/'install.sh').read_text();self.assertIn('OV_CHANGED',source);self.assertIn('AG_UNIT_BEFORE',source);self.assertIn('ADDON_CHANGED',source)
        self.assertNotIn('npm install',source);self.assertNotIn('npm run build',source);self.assertIn('NOVA_JOIN_TOKEN',source)
if __name__=='__main__':unittest.main()
