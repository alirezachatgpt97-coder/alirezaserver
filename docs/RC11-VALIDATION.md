# rc.11 validation — local environment only

Input: user-provided full rc.10 ZIP, SHA256 `3e105b2f341b026882d741b01e190d27b8a6fbf1b5b8d21f9c11b565df6fa890`. Node v24.19.0, Python 3.12.14. No user VPS modified; nothing published on GitHub.

| Check | Actual result |
|---|---|
| Python suite, including update transaction and file preservation | 55 passed, 0 failed |
| Full JS matrix / Nova 1.91.1 | 110 tests: 107 passed, 3 skipped, 0 failed |
| Original JS matrix / Nova 1.85.4 | 105 tests: 102 passed, 3 skipped, 0 failed |
| Updated native HTTP/auth/update-button suite / 1.85.4 | 11 passed |
| Official release compatibility + owner identity | 1.85.4 and 1.91.1 passed |
| Installer and embedded module syntax | 99 modules passed |
| Protected addon/core files from rc.10 | 1,256 byte-identical |
| Actual Xray transfers, both Nova fixtures | VLESS/TCP TLS, VLESS/WS TLS, VMess/WS TLS, Trojan/TCP TLS passed; incorrect certificate identity refused |
| Failure rollback simulation | altered runtime config restored with old code/config/cert snapshot; ownership/modes retained; runtime repair invoked |
| Native update authorization | real native HTTP/session: owner accepted; unauthenticated/reseller/cross-origin denied; host systemctl mocked |
| Unknown profile | refused without rewriting candidate |

Official tarballs were pinned by commit and SHA256 checked; see SOURCES.md and addon/compat-profiles.json. Actual Xray 26.3.27 test binary SHA256: `23cd9af937744d97776ee35ecad4972cf4b2109d1e0fe6be9930467608f7c8ae`.

Three skipped JS checks: two actual PHP/MariaDB bot schema/page tests (runtimes absent this run) and one real non-root Xray identity check (UID 65534 not mapped). Existing rc.10 SQL integration tests and sources remain included. RC10-VALIDATION results are historical, not counted as this run.

## Scoped resource measurement

One short controller-only loopback sample per version, using `node --max-old-space-size=192 --expose-gc tests/resources.mjs --integrated`, with NOVA_TEST_DIR selecting the verified fixture. Raw JSON is included alongside this report.

| Metric | Nova 1.85.4 | Nova 1.91.1 |
|---|---:|---:|
| Peak RSS before load, MiB | 107.39 | 123.38 |
| Heap after GC before load, MiB | 30.18 | 33.47 |
| Idle CPU over approx. 1.2 seconds, ms | 4.19 | 5.12 |
| 50 sequential panel requests, wall ms | 374.84 | 346.00 |
| Peak RSS after load, MiB | 166.46 | 203.69 |
| Heap after GC after load, MiB | 29.05 | 32.30 |

Peak RSS uses getrusage, not current RSS. These are not throughput/stability benchmarks. No agent jobs, AdGuard, OpenVPN, bot database/workers or VPN/protocol daemon load was included. The complete stack on 1 vCPU/1 GB has NOT been measured. Existing V8 heap limit, UI/effects and polling are unchanged. Updater hashing/path traversal now stream; no new permanent daemon.

## Reproduce

Set NOVA_TEST_DIR and ALIREZA_NOVA_DIR to an extracted, verified official Nova fixture, UI_TEST_JSDOM to jsdom 26.1.0 lib/api.js, and XRAY_TEST_BIN to the verified Xray binary. For installer tests use NOVA_INSTALLER_FIXTURE pointing to pinned official install/nova-node.sh, SHA256 `26df405f09a5eed8b430545688c0e2dc0df4cc50f617a91c820dd1821a7ca79d`.

```bash
bash install.sh --self-test
node --test tests/update-bridge.mjs tests/compat-profile.mjs
python3 tests/update-transaction.py
python3 tests/rc11-preservation.py
```

Included per-test logs list individual checks and skips. Native HTTP, UI DOM, TLS and manual form tests require the environment variables above. Packaging scripts and all sources are in source-code.zip.

## Limits

No full systemd VPS install/update, public CA issuance/renewal, live Telegram, actual Cloudflare transit, ISP reachability, all-protocol client transfer, multi-node traffic, long soak or whole-stack 1 GB stress test. Rollback tests mock systemctl; they are not a live system upgrade. DOM/interaction tests passed; new browser screenshots were not produced; existing UI/theme files are unchanged.

SSL does not remove ISP restrictions. ICMP ping does not prove proxy/TLS operation. The rc.9 connection adapters are preserved, with four actual local Xray transfers validated, rather than a claim that every protocol/route works from the user's network.

Future candidates with matching reviewed bridge contracts and passing checks may update automatically; unknown incompatible bridge changes are blocked for review. Two local rollback snapshots do not replace off-server backups.
