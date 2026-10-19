# rc.9 validation — 2026-10-19

Basis: the user's `alirezaserver-web-upload(2).zip`, not the older local preview. See RC9-BASELINE.json for input hash and changed-file inventory. All original source-package files are retained. Native Nova source files and AdGuard UI/configuration are unmodified.

## Results actually obtained

- Node: **104 tests, 103 PASS, 1 SKIP, 0 FAIL**. The skipped real non-root test needs UID/GID 65534 mapping unavailable here.
- Python: **43 PASS, 0 FAIL**. Installer download timeout/fallback, permission handling, rollback and release regression harnesses included; these are not a fresh real-VPS install.
- Installer self-test: **93 embedded modules syntax PASS**.
- Pinned Nova **1.85.4**: contract hashes, original theme/style/script retention, authentication and JavaScript syntax PASS.
- Actual temporary MariaDB + PHP-FPM: schema repeat migration, web login and management pages PASS. No live Telegram token was used.
- Native subscription regression reproduced the old `sni=8.8.8.8` while the selected identity was `panel.example.com`; repaired raw and structured exports use the certificate domain. Native VLESS/VMess/Trojan CDN WS exports have matching endpoint/Host/SNI. Custom SNI, custom certificates, remote nodes and unsupported transports are preserved.
- Actual official Xray **26.3.27** on loopback: four successful HTTP payload transfers through generated clients: VLESS/TCP/TLS, VLESS/WS/TLS, VMess/WS/TLS, Trojan/TCP/TLS. Each corresponding deliberately wrong TLS certificate identity was rejected. Client routing was forced through the proxy to avoid a false positive from private-address bypass.
- Official Xray archive SHA256 `23cd9af937744d97776ee35ecad4972cf4b2109d1e0fe6be9930467608f7c8ae`, checked against upstream `.dgst`. Test binary/certificates/private keys are not distributed.
- API startup retry, immediate permission-failure handling, exact HTTP01 nonce through real local challenge handler, and wrong-handler rejection PASS.
- Bot job returns immediately; stage file reflects real Python installation boundaries. Completion requires actual service readiness. Encrypted credentials are owner-only, one-time, expire after 24h, and are invalidated on reset. Cross-origin, unauthenticated and reseller access are denied. Unit/DOM tests use explicit job fixtures; actual system package installation is not simulated as a production success.
- DOM interactions in Persian at width 390 and English at width 1366 PASS, including job progress, completion and hidden-password display. Chrome startup failed with SIGTRAP in this environment; **visual browser/layout QA is not completed**.

## Resource measurement

Controller only, Node v24.19.0, test heap ceiling 192 MiB: peak RSS before request batch **108.87 MiB**, V8 heap **30.16 MiB**; 50 sequential loopback HTTP requests: **911.75 ms wall**, peak RSS **164.75 MiB**, heap after GC **29.03 MiB**. CPU measurements are in resources-rc9.json. These are process peaks, not current RSS or total system memory. Background DNS, PHP, MariaDB, VPN engines, client traffic, installer peak RAM and a real 1-vCPU/1-GiB VPS were **not** included; no all-services 1-GiB support guarantee is made.

The new job adds no daemon. UI progress polls only while running, slows while hidden and stops after completion. Existing features/effects are retained.

## Limits and operation

No real CA issuance/renewal, Cloudflare DNS token, Cloudflare traffic, current user VPS, restricted client network, or external client ping was tested. IP ICMP reachability does not establish TLS/proxy reachability. Software repairs cannot guarantee unblocking an ISP path. Arbitrary raw TCP/Reality/UDP cannot be put through ordinary Cloudflare HTTP proxy. For a remaining fault use `sudo alireza support` plus a redacted client error/config; do not disclose credentials.

Closing the browser does not cancel a bot install. Restarting the panel process can interrupt the job; it is marked interrupted and can be repaired by retry. The Python manager retains its operation lock to reject overlapping package/database work. Progress is a count of actual stages, not a fabricated byte percentage or duration estimate.

Backup from the existing alireza menu before upgrading. Upload every outer-ZIP file at repository root, keep source-code.zip compressed, and run the new install.sh to repair/update the existing installation. Refresh subscriptions in clients afterwards. No GitHub publication or real VPS changes were performed.
