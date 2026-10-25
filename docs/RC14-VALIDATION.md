# rc.14 validation — 2026-10-25

Status: release candidate, built from the complete rc.13 package. No GitHub publish or live server installation was performed. This report distinguishes executable tests from inspection and untested deployment scenarios.

## Preserved behavior

RC14-BASELINE.json records the exact changed/added runtime files and SHA256 of 1,243 unchanged runtime files. In particular, native endpoint identity, TLS coordinators/renewal, Xray access/config helpers, protocol/manual inbound logic and AdGuard integration remain unchanged. The native Network navigation is removed by an extension UI hook; existing settings/data and network services are retained. This is not an attempt to change ISP filtering.

## Tests performed

- Full Node test matrix: 126 tests; 125 passed, one skipped. The skip is a real non-root UID/GID permission test because this runtime lacks mapping for UID/GID 65534. Filesystem/runtime access tests not requiring that mapping passed.
- Python scripts: 64 tests across 15 scripts passed, including installer embedding/checksums, preservation baselines, update transaction rollback, bot schema repair/upgrade and Xray installation/access contracts. The intentionally broken updater fixture is expected to report a compatibility error.
- Final targeted sales/compatibility suite: 13 passed; final sales/Network DOM suite: 3 passed. Embedded installer self-test passed for 108 JavaScript modules.
- JavaScript syntax for all addon JS/MJS, Python compilation, installer shell syntax and changed PHP syntax passed with Node 24.22.1 / PHP 8.2.35.
- Official Nova 1.92.3 and previous 1.85.4 isolated preflight passed: owner identity, real temporary native create/edit/delete, country exits, subscription/runtime config, host profile, native reseller quota and scoped sessions.
- Unknown compatible future-version fixture passed isolated approval and restart; altered files invalidated the receipt. Broken future API fixture was rejected before approval. These are compatibility fixtures, not a guarantee for every future release.
- Native reseller sale uses real Nova admin APIs and quota/capability records. Login with the delivered reseller password resolves the correct native identity. Native reseller creates scoped VPN users and gets actual subscription/config output.
- Real temporary MariaDB + PHP + native HTTP API tested simultaneous same-order purchase, one wallet debit, lost HTTP response after account creation, retry without duplicate account/debit, safe cancellation and one-time refund. Existing fractional wallet balances are preserved.
- Seller/buyer quote, wallet, plan and order isolation; owner-only admin plan creation; viewer rejection; encrypted credentials/token/owner approval; main-bot token rejection; stale bot epoch and group-message rejection; expired provisioning lease replay were tested.
- DOM interaction tests cover FA/EN, 390/1366 width inputs, AI safe streamed output/settings, DNS deliberate fingerprint/preflight/install steps, bot actual-stage progress/one-time credentials, sales form role controls and Network menu/hash/search removal. **These are DOM tests, not visual browser/layout certification.**
- Four actual local Xray TLS data transfers passed: VLESS/TCP, VLESS/WebSocket, VMess/WebSocket, Trojan/TCP. Wrong TLS identity failed as expected. Other protocols retain their original implementation and validation tests; they were not all exercised with external VPN clients.

Full logs are in RC14-test-logs.zip; all old raw logs remain in source-code.zip. Post-refinement targeted sales/compatibility tests are logged separately from the full matrix.

## Resource measurement

Actual local controller benchmark, Node 24.22.1, `--max-old-space-size=192 --expose-gc`, native Nova 1.92.3 plus integrated addons, disposable loopback HTTP. After initial page/AI-settings load: V8 heap 34.63 MiB; peak RSS so far 128.66 MiB; 5.25 ms CPU over 1.20 seconds idle. Fifty sequential page requests: 356.79 ms elapsed, 676.45 ms CPU, heap after GC 33.45 MiB, peak RSS 196.93 MiB. Peak RSS is process getrusage, not current RSS; /proc/self current RSS is unavailable here. Host CPU scheduling can make these timings vary.

Scope excludes AdGuard, MariaDB/PHP-FPM, OpenVPN, other protocol daemons, actual VPN traffic, Telegram requests and enabled per-seller polling. This is **not** a 1-vCPU/1-GB whole-stack/load certification. No claim is made about arbitrary client counts on 1 GB.

Efficiency changes: shared in-process seller scheduler with bounded batches and due-time polling; no per-seller daemon, port or PHP pool; reuse existing bot cron for paid-order recovery; SQL indexes and bounded pagination; lazy private SQLite, WAL checkpoint/journal size controls; no frontend source build on the VPS; existing ondemand PHP limits/visual effects retained. Runtime security upgrades may restart the affected controller/PHP service; active protocol processes remain separate.

## Deployment limits

- No live VPS/root systemd/APT fresh install, OS upgrade, full install/uninstall, live certificate issuance/renewal or Cloudflare validation was run. Installer paths are syntax/fixture/transaction tested.
- No real Telegram token/payment gateway/customer funds were used. Telegram transport errors and delivery retry are implemented; live Telegram polling/delivery and main-bot checkout must receive staging acceptance testing.
- Playwright Chromium download returned a blocked 195-byte HTML response; the cloud browser could not reach the local preview. Therefore no desktop/mobile screenshots or visual browser QA are claimed.
- No external SSH/alirezadns install, external client/ISP ping/filtering benchmark or long-running whole-stack 1-GB stress test was available.
- Nginx is not needed or added. Used installed Node/PHP APT packages are upgraded and selected binary security baselines verified. This is not a full-system vulnerability audit or a promise of unconditional security.
- Backups contain confidential keys/credentials and must be stored privately. Native reseller volume quota is distinct from unmetered manager/admin1 roles; the UI and README disclose that difference.

Before production rollout: take an off-server backup, test install/upgrade on a disposable VPS, verify real certificates and each enabled protocol from the intended client network, exercise bot checkout/refund with a small controlled amount, and monitor RAM for the actual enabled services/load.
