# Current: rc.7

See [current report](RC7-VALIDATION.md) and [TLS setup](TLS.md). Earlier reports below are historical.

# Current: rc.6

See [current report](RC6-VALIDATION.md). Older results below are historical.

# Validation — rc.5 Xray permission fix

The real VPS log identified `open /usr/local/etc/xray/config.json: permission denied` with service exit 23, followed by a refused HTTPS front port. Inspection of pinned Nova's exported `writeJsonAtomic` confirmed it explicitly resets JSON files to mode 0600. The default Xray service uses a non-root identity. This is independent of the rc.4 stale-verifier fix, which is retained.

Current full Node suite: **62 PASS, 1 SKIP, zero failures (63 tests)**. After final ownership/directory-safety guards, the four dedicated writer tests were rerun: 3 PASS, 1 SKIP. Python: **32 PASS** (14 regression/SSH, 11 Xray installer fixtures, 2 diagnostic-cleanup, 3 release-integrity, 2 permission-repair). Installer self-test: **81 embedded modules**, Bash/JS/Python syntax PASS. Pinned Nova compatibility including the new manager SHA contract passed.

The dedicated Node test imports the actual pinned native manager through production hooks, performs repeated atomic writes under umask 077, checks 0640/ownership/content, confirms unrelated files remain 0600 and rejects symlink targets. The runtime cannot map UID/GID 65534: fchown returns EINVAL, so the actual non-root identity read/denial test is explicitly SKIPPED, not passed. Tests use the mapped current group to verify the writer mechanics. Python repair tests use temporary files and mocked systemd identity/ExecStart; content preservation, permission snapshots, repeatability and refusal of unknown config layouts pass.

A real systemd/VPS installation, real nobody read test, Xray daemon startup and public HTTPS after rc.5 repair have not been run here. They must not be described as certified. No real server was modified by this work. The user should retain the current VPS for the repair and report fresh Xray output if it remains unhealthy.

## Scope and security

Only the fixed runtime config and Nova origin TLS paths are repaired. No world-readable credentials, recursive chmod, root Xray user or blanket service override is introduced. Group access follows the existing systemd identity. Previous modes/owners are recorded. Atomic native config generation is adapted in memory only after an exact manager hash check, without modifying upstream files on disk. UI, protocols, OpenVPN, Hosts, bot payload and AdGuard behavior are retained. A new daemon or build step on the VPS is not added.

Miniapp preferred-source and broader deployment/1GiB/browser limitations remain in SOURCES.md and README. Historical evidence below is labelled rc.4.

# Validation — 0.8.0-rc.4 installer hotfix

Current run: **59 Node tests PASS, zero failures/skips**. Python suites: **30 PASS** (14 regression/SSH, 11 Xray installer fixtures, 2 failure-cleanup diagnostics, 3 release/source-integrity checks). Self-test: Bash and **79 embedded modules** passed syntax checks. Pinned Nova 1.85.4 integration/identity contracts passed.

## Exact production verifier exercised

`tests/installer-verify.mjs` launches real pinned Nova HTTP/auth/SQLite and executes `addon/verify-install.mjs` in a child process. Both root and hidden panel paths pass. AdGuard is a loopback HTTP fixture; no AdGuard installation or network configuration is changed. A third test deliberately uses an unusable HTTPS endpoint and verifies that the production verifier fails: broken public access is not silently certified. A successful real VPS public HTTPS front door is not tested here.

Five focused tests cover exact legacy OpenVPN redirect, both base paths, missing inline assets, external redirect rejection and stale panel injection. Three DOM tests execute real pinned Nova form declarations for all native preset protocols in Persian/English and submit an OpenVPN server through the inline form. Existing API/auth/AI mock-provider, OpenVPN backend, DNS and manual-form tests also ran.

Failure-cleanup tests execute the installer cleanup function in a temporary sandbox with a service-state stub. They verify preservation of exit code, phase/line, verifier output, private file mode and workdir cleanup. No actual service was restarted. Xray download/service actions use fixtures with real Bash/timeouts; they are not a live VPS install.

## Feature preservation

`RC4-BASELINE.json` records all 77 addon files embedded in the current GitHub rc.3 installer at commit 90b0f3554a09829e9ae38c9601ada8623ebab247. All existing addon bytes except NOTICE.txt and verify-install.mjs are unchanged from that authoritative payload. Two files are new: verify-inbounds.mjs and install-diagnostics.sh. Standalone sources had diverged from the installer and were restored to its contents. Source/installer equality and preferred carrier source checks passed. Main UI, protocol engines, bot payload, Hosts, tunnels and AdGuard were not redesigned in this hotfix.

## Unverified

The deleted VPS cannot be inspected. The stale HTTP-200 verification predicate is a confirmed code defect, but the historical inability to log in cannot be attributed definitively without its logs. Full apt/systemd fresh install/upgrade/restore, public WAN access, actual VPN client load, all-service 1CPU/1GiB capacity and visual browser/mobile layout were not tested. No new Telegram/Gemini requests with real credentials were made. Historical logs in this repository are not current-run results. This package is a release candidate, not a no-bug/Stable certification.

The upstream bot miniapp preferred frontend source issue remains documented in SOURCES.md; public redistribution readiness is not certified.

Raw current evidence: test-node-rc4.log, test-python-rc4.log, test-xray-rc4.log, test-diagnostics-rc4.log, test-integrity-rc4.log, test-selftest-rc4.log, test-compat-rc4.log and resources-rc4.json.
