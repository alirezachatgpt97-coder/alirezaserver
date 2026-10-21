# rc.13 validation — guarded automatic Nova updates

## Reproduced cause

GitHub connector checked official Nova 1.92.1 and user repository source (rc.11). The previous rc.11/rc.12 updater was reproduced rejecting the new candidate with NOVA_COMPATIBILITY_REVIEW_REQUIRED before activation. Its strict whole-file whitelist knew only 1.85.4 and 1.91.1. Its error status used generic code 26. No live VPS error log was available; this is a reproduced code defect, not proof that every code-26 failure has the same cause.

Official 1.92.1 archive was downloaded at commit 8c57ea6bfa4909bf1ae3b21a69bc6bbb390b7880 and SHA256 checked against 85b62c753db12aecf3e3805398926ae39d2499575a4d2f412cf1e4c04e834b84. Current package retains rc.12 bot product-country-exit option even though the online repo still had rc.11. Custom online README content is preserved below current instructions.

## Implementation

Known reviewed profiles remain supported. Downloaded/checksummed future candidates can pass isolated preflight rather than being blocked solely by changed hashes. Syntax, binding/export/host-profile/UI contracts, owner sessions and real temporary native HTTP/account/subscription/runtime-config behavior are tested before issuing a local receipt. Receipt binds the seven bridge file hashes, package version and adapter fingerprint. Unreviewed runtime code has no provisional authority unless running explicitly as the updater's preflight child. Changed code after approval invalidates its receipt. Ordinary startup does not self-approve unknown code.

Smoke tests use a temporary SQLite/config tree and loopback HTTP, with NOVA_NO_EXEC and manager exec:false. They do not use live accounts, secrets, certificates or install services. The process is an official trusted-code compatibility test, not an OS sandbox for arbitrary untrusted packages. The existing HTTPS/checksum/archive/downgrade/space checks, code read-only mount, owner-only update route, timer, backups and post-activation real install verifier remain.

Failures now include reason and failedStage; primary JS errors survive long minified stack output. Committed healthy updates retain successful status if old-snapshot cleanup fails. Whole-file source hash comparison protects 1,259 other runtime files, including rc.12 bot behavior, TLS identity, config generation, DNS and UI. No new permanent service, model, dependency or on-VPS source build was added.

## Actual results in this run

| Test | Result |
|---|---|
| Python suite | 61 passed, 0 failed |
| Full JS matrix / Nova 1.92.1 | 115 tests: 114 passed, 1 skipped, 0 failed |
| Native API/auth/bot/update route / Nova 1.85.4 | 19 passed |
| Native API/auth/bot/update route / Nova 1.91.1 | 19 passed |
| Future compatible candidate with changed hash/version | Passed full preflight, receipt issued, revalidation/restart check passed |
| Post-approval file modification | Rejected; no silent trust |
| Future candidate with broken createServer | Failed preflight; no receipt issued |
| Official 1.92.1 isolated behavior preflight | Passed |
| Actual PHP 8.2.32 / MariaDB 10.11.18 | Bot login, migrations, product CRUD/country-exit opt-in and repeated repair passed |
| Real Xray 26.3.27 loopback transfers | VLESS/TCP TLS, VLESS/WS TLS, VMess/WS TLS, Trojan/TCP TLS passed; wrong certificate identity rejected |
| Installer + embedded syntax | 100 modules passed |
| Update transaction failures | Snapshot restore, permissions/ownership, legacy journal mapping, cache invalidation, meaningful failure status and cleanup-warning handling passed |

The one skip needs a mapped real non-root UID 65534, unavailable in this runtime. No SQL integration test was skipped. Historical rc.11/rc.12 measurements are not counted again.

Environment: Node v24.19.0 and Python 3.12.14. jsdom 26.1.0 for DOM/interaction checks. PHP/MariaDB packages were extracted into temporary development runtime folders, never installed as host services. Test binaries and upstream fixture trees are not release payloads. Official fixture references/checksums are in SOURCES.md.

## Reproduce

Provide a checksum-verified extracted Nova fixture using NOVA_TEST_DIR/ALIREZA_NOVA_DIR, jsdom lib/api.js using UI_TEST_JSDOM, the verified Xray binary using XRAY_TEST_BIN, and extracted PHP/MariaDB roots using BOT_TEST_PHP_BASE/BOT_TEST_DB_BASE. For installer Python tests, NOVA_INSTALLER_FIXTURE selects the pinned official installer.

```bash
node --test tests/compat-future.mjs tests/native.mjs tests/local-connection.mjs
python3 tests/update-transaction.py
python3 tests/rc13-preservation.py
bash install.sh --self-test
```

The preflight CLI `node addon/compat-check.mjs /path/to/verified-candidate --probe-official` tests and writes only a receipt inside that candidate; do not use it to treat arbitrary untrusted code as safe. Normal `node addon/compat-check.mjs /path/to/candidate` requires reviewed hashes or a valid receipt.

Raw results are in RC13-test-logs.zip and individual RC13-*.txt files inside source-code.zip. Original source files and historical reports are retained. New raw logs are compressed together in the browser-upload package to stay below 100 files.

## Limits

No live VPS/systemd deployment/upgrade, actual public CA renewal, Cloudflare route, ISP connectivity, Telegram sale, Tor/Psiphon internet transfer, multi-node protocol load, long soak or 1 GB whole-stack resource certification occurred. Native update route tests mock systemctl; rollback tests simulate host service actions and filesystem transactions. Successful local transfer does not prove every protocol works on the user's network.

Future compatible versions can update without manually adding a new whole-file hash entry. Future breaking APIs, runtime requirements, CSS/UI contracts, network failures or failed post-install health checks still stop or roll back, with a specific failure reason. No promise of arbitrary future compatibility or zero bugs is made. Keep off-server backups.

## Applying this fix

Publish/install the NEW complete install.sh first, then run `sudo bash install.sh --update`. Calling --update on the previous installer simply invokes its previous installed updater. Do not reinstall the VPS or delete databases. Automatic checking remains every six hours; immediate retry uses --update. Until the user uploads this release, their GitHub main URL still serves their older installer.
