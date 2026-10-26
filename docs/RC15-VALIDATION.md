# rc.15 validation — 2026-10-26

Release candidate built from rc.14 (`a0d0b4db01cd68be251994f64efe485ab3c73c7a058d1e7008c6cbb2424f0f04`). No live VPS or GitHub publication occurred. This is an implementation with executable tests, not a certification that every deployment is bug-free.

## Scope and actual behavior

- Full Mirza is installed for each eligible native admin/reseller using the same checked application payload and installer template. Server-derived identity selects a separate SQL database/user, service UID, FPM socket, bot state, web path and session path. FPM explicitly passes its own appearance-state directory.
- Template namespaces accept only a server-derived 24-hex key. Executable instance PHP/config stays root-owned; only designated runtime directories/assets are writable by its service identity. Repair/upgrade must not execute tenant-edited application code as root. APT/dependency installs share a serialized lock; child process groups are tracked for termination/timeout cleanup.
- The native bridge rechecks seller identity/caps and scopes users/inbounds. Its reseller-panel sale endpoint is denied. Separate tenant secrets cannot authorize the owner's bridge. A tenant cannot obtain credentials for a panel purchased by another Telegram buyer.
- Local testing found that the native API accepted allocations above the reseller's remaining volume. The Mirza bridge now explicitly rejects unlimited quota, allocation above remaining volume, user-count overflow and unauthorized country exits before forwarding. Existing native runtime quota behavior is retained; the bot does not attempt to rewrite core enforcement.
- Owner panel sales remain in the full Mirza web interface. The separate rc.14 storefront and Hosts manager navigation/API are removed. Existing connection host profiles and legacy financial data are retained.
- Customer My panels reads actual native quota/capacity, reveals encrypted stored delivery credentials only on deliberate private-chat actions, and rotates native passwords with confirmation. Pending rotations are encrypted and replayable after uncertain responses; concurrent rotation is serialized and successive rotations have a one-minute cooldown. Stored delivery passwords may be stale if changed outside this system; the UI explains reset rather than pretending passwords can be recovered from hashes.
- Owner billing uses the existing Mirza SQL wallet and idempotent order path. Old standalone rc.14 seller-wallet balances are retained in shop.db and are **not automatically credited into new Mirza wallets**. Existing funded deployments require reconciliation before migration; silently duplicating customer funds would be unsafe.

## Tests performed

- Full Node matrix: **128 total, 127 passed, 1 skipped**. The skip remains the real non-root UID/GID permission test because this environment lacks the required mapping. Existing native UI/API, bot SQL/wallet, update guard, TLS, DNS and protocol tests passed.
- Final targeted native-panel/tenant/progress tests: **15 passed**, including rejection of the previous password after rotation.
- Python release matrix: **68 tests across 17 scripts passed**. Includes installer embedding/checksums, preservation, product schema repair, update rollback, Xray install/access fixtures, and namespace/security properties of the complete Mirza installer template.
- Actual Nova 1.92.3 API: create a paid reseller, read its real remaining quota, reject a different buyer's credentials, rotate its password, authenticate with the new password and reject the old one. The scoped Mirza bridge creates a real native customer; above-quota and unlimited-volume requests are rejected.
- Tenant setup orchestration is tested with a stubbed system installer/Telegram transport and real native accounts. Tests check separate secrets, instance ownership, readiness state, one-time web credentials, scoped inbound/user creation, viewer rejection and prohibition of panel resale. **This does not mean actual multi-instance systemd/APT installation was executed.**
- Real temporary PHP 8.2.35 + MariaDB integration retains main wallet single-debit behavior, lost-response retry, no duplicate native account and one-time safe refund. Existing web login/product pages and SQL migrations pass their integration tests.
- Four actual local Xray TLS transfers pass: VLESS/TCP, VLESS/WS, VMess/WS and Trojan/TCP. Wrong TLS identity fails as expected. Other protocol daemons were not all exercised with external clients.
- Official Nova isolated preflight passes native identity, bot CRUD, country exits, subscription/config and reseller quota/password contracts. Compatible future-version fixtures pass approval; broken API or tampering invalidates approval.
- Generated tenant FPM configuration passed the actual PHP-FPM 8.2.35 configuration parser with temporary paths and test-only root identity; no instance services were installed.
- All addon JS/MJS syntax, Python compilation, changed PHP syntax and installer shell syntax pass. Embedded installer self-test passes **112 JavaScript modules**.
- Previous DOM tests for FA/EN, progress/credentials and AI/DNS behavior remain. Some legacy storefront DOM tests are retained as source regressions even though that UI is no longer exposed. There is no claim that old standalone storefront controls remain live.

Raw final logs and the resource sample are in RC15-test-logs.zip. RC15-BASELINE.json protects **1,258 unchanged runtime files**, including update.py, native endpoint identity/TLS helpers, protocol/manual-inbound logic, host renderer and the existing main bot bridge.

## Actual controller measurement

Native Nova 1.92.3 plus integrated addons, Node 24.22.1, `--max-old-space-size=192 --expose-gc`, disposable loopback HTTP. After initial page/AI settings load: V8 heap 34.67 MiB, peak RSS so far 128.73 MiB, 6.23 ms CPU over 1.20 seconds idle. Fifty sequential page requests: 476.80 ms elapsed, 878.71 ms CPU, heap after GC 33.48 MiB, peak RSS 185.72 MiB. RSS is peak process getrusage; current RSS is unavailable here. Concurrent host work affects timing.

Scope excludes real Mirza instances, Telegram polling, PHP-FPM/MariaDB, AdGuard, protocol daemons and actual VPN traffic. This is not a whole-stack 1-vCPU/1-GB benchmark. Each full Mirza instance adds its own service footprint; ondemand PHP and optional installation do not make unlimited bot instances fit in 1 GB. No artificial client/feature limit was added to claim otherwise.

## Remaining acceptance tests / limits

- No real VPS/systemd/APT full install, several active Mirza instance services, instance restore, live CA issuance/renewal, Cloudflare, external SSH or long-running 1-GB stress test was available. Installer paths are template/syntax/fixture tested and require staging verification.
- No real Telegram token/customer funds/payment gateway were used. Emoji button/card navigation is implemented; live Telegram delivery and all Mirza workflows should be verified with controlled test accounts.
- Browser binary download was blocked in the preceding environment and cloud browser could not reach the local preview. No new mobile/desktop screenshots or visual browser QA are claimed. DOM tests are not layout certification.
- ISP reachability/filtering cannot be guaranteed. Connection/TLS/protocol sources were preserved and local data-transfer tests passed; client-network tests still matter.
- Backups now include managed instance files, SQL dumps and units. Full multi-instance restore has not been executed; recovery must verify database credentials and file ownership, not only extract files.
- There is no whole-project security audit or guarantee of compatibility with every future Nova release. Preflight rejects detected incompatibility rather than overwriting working data blindly.

Before production: off-server backup, disposable-VPS install/upgrade, two independent seller bots/web logins, scoped sales/quota/error/retry/refund tests, native password rotation, actual protocol clients and resource monitoring for the enabled services.
