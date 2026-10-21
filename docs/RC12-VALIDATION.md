# rc.12 validation — per-product Nova country exits

Based on the complete delivered rc.11 package, SHA256 `361da00d4c9175537ca8f601c56039e25f5cb4abf7f296578df78a93f865ba35`. Runtime: Node v24.19.0, Python 3.12.14, local extracted Debian PHP 8.2.32 and MariaDB 10.11.18 test runtimes. No live VPS, Telegram, host systemd install or GitHub write.

## Scope

Only 17 existing bot runtime/payload/schema/translation files changed; 1,246 other runtime files match rc.11 byte for byte. See RC12-BASELINE.json and tests/rc12-preservation.py. Nova update, TLS/identity, protocol/config generators, DNS/AdGuard and main theme/effects modules are protected unchanged. Install metadata and documentation identify rc.12.

The product geo_exits flag maps to Nova user.geoExits through the existing authenticated local bot bridge. It includes Nova country exits already configured/enabled by the operator; it does not install Tor/Psiphon, add countries, rewrite global routes or alter existing sold users. Remote providers never receive the field. Default is off for legacy products. Editing a product affects new account creation, not a bulk account migration. Ordinary client updates preserve their existing geo flag.

## Current actual tests

| Check | Result |
|---|---|
| Python suite incl. backup/idempotent bot UI upgrade | 57 passed, 0 failed |
| Full JS matrix with official Nova 1.91.1 | 113 tests: 112 passed, 1 skipped, 0 failed |
| Native account flag/auth/update tests with Nova 1.85.4 | 19 passed |
| PHP syntax for all 12 changed PHP files | Passed |
| Installer plus 99 embedded module syntax checks | Passed |
| Real PHP-FPM/MariaDB product migration + CRUD | Passed, no SQL mocks |
| Actual PHP driver/client serialization | Passed with mocked HTTP transport; local on/off and legacy default correct, remote field absent |
| Native Nova API/SQLite per-user opt-in | Passed on both supported Nova fixtures; accounts isolated; ordinary update retains flag; invalid flag rejected before account write |
| Product editor DOM | Checked state restored on edit; switching between products clears stale state |
| TLS/protocol regression | Four actual local Xray transfers passed; wrong TLS identity rejected |

The one skipped JS test requires a real mapped non-root UID 65534, unavailable in this environment. Actual bot SQL tests are NOT skipped this run. Test service processes and test databases were temporary loopback-only children.

Actual SQL integration checked existing-table repair, private pre-migration product backup, repeated no-op repair, old disabled plans/IP limits/prices preserved, fresh first bootstrap, web login/CSRF, adding enabled product, editing disabled, JSON API add/edit, omitted flag preserved, invalid flag rejected, and plan deletion. Existing bot management-page integration also passed. UI upgrade test used real payload extraction/write/backup logic in a temporary tree; OS user chown was mocked because no installed alirezabot identity is present. Existing credential config was retained.

## Reproduce

Download/checksum the official Nova fixtures documented in SOURCES.md. Point NOVA_TEST_DIR and ALIREZA_NOVA_DIR at the extracted fixture; UI_TEST_JSDOM at jsdom 26.1.0 lib/api.js; XRAY_TEST_BIN at verified Xray 26.3.27. PHP/MariaDB tests accept extracted runtime roots via BOT_TEST_PHP_BASE and BOT_TEST_DB_BASE. No apt/systemd invocation occurs in these integration tests.

```bash
node --test tests/bot-product-sql.mjs tests/bot-geo-driver.mjs tests/bot-product-ui.mjs tests/local-connection.mjs
python3 tests/bot-geo-upgrade.py
python3 tests/rc12-preservation.py
bash install.sh --self-test
```

For the full Python suite set NOVA_INSTALLER_FIXTURE to the pinned official installer. Included RC12-*.txt files list individual executed checks. Previous release reports and resource measurements are historical.

## Limitations

No actual Tor/Psiphon country-exit internet transfer, live Telegram purchase, public certificate issuance/renewal, ISP reachability, complete VPS upgrade or whole-stack 1 vCPU/1 GB benchmark was performed. This feature adds one small product column and uses existing request/account generation paths, without a daemon, polling or background job. Existing country exit services and user traffic still have their own resource needs. No guarantee of all-protocol WAN connectivity, universal filtering avoidance, all future Nova compatibility or bug-free operation is claimed.
