# rc.16 validation — 2026-10-26

Release candidate based on the complete rc.15 package, SHA256 `b4046061d7452641880179102d002600dfd38b31e1ca84194f6571af6578ca79`. No live VPS or GitHub publication was performed.

## Scope

Only the Mirza reseller-page layout/access controls and the owner bulk inbound assignment workflow were developed. RC16-BASELINE.json records 1,270 unchanged runtime files, including protocol/manual-inbound logic, TLS identity/renewal, update.py, bot wallet/bridge/customer password management and isolated Mirza instance management. Nova's compatibility probe is extended to check preservation of fields during partial access updates; this is not a replacement of core protocols.

The supplied screenshot showed an oversized continuous paragraph and unstructured permission checkboxes. The page now uses scoped typography, wrapping, padded cards, responsive grids, fixed-size checkboxes, translated capability cards and real Mirza theme variables. Existing plan CRUD/payment/credentials remain. Styling is scoped under `.az-reseller`; other pages retain their appearance.

## Bulk workflow and safety

- Primary Mirza owner only: native web authentication + owner check + CSRF; server API is behind the existing loopback main-bot bearer bridge. Tenant Mirza instances cannot use the owner shop bridge.
- Choose native reseller accounts or VPN users; search, select page/all matching results, retain selection across pages, select active inbound IDs, preview then confirm.
- Default operation is additive. Existing IDs are merged; all-inbound users are left unrestricted. No port, transport, security, quota, UUID, password or expiry setting is intentionally rewritten.
- User access uses the tested native partial `{id,inboundIds}` update. The native admin API broadens capabilities if caps are omitted, so admin updates explicitly carry their existing role/caps after rechecking the snapshot. No default capability set is guessed.
- Native admin updates can prune customer permissions even when extending a parent list. Before mutation, the job inspects dependent customers and refuses independently granted inbound/node/protocol access that could be pruned. Missing/inconsistent ownership metadata also fails conservatively. The actual regression test confirms the child record remains unchanged.
- Account access/role/cap changes detected since preview stop that account rather than silently applying an old snapshot. This is an application-level check, not an atomic compare-and-swap primitive added to Nova; simultaneous writes at the exact native request boundary still require operator coordination.
- Encrypted job snapshots/progress share existing shop.db/backup. A small in-process scheduler handles at most five accounts per step; no new daemon/port/dependency is installed. Job/status rows and browser results are paginated. Idle processing only checks the existing DB for queued jobs.
- Pause lets an in-flight native request finish. Resume handles failed items; an already committed update after a lost response is recognized before another mutation. Expired leases can recover after process restart (up to three minutes).
- Undo is a new preview of known-successful items only. Resellers with dependent customers/allocated traffic are rejected for automatic undo to avoid native pruning of customer access. It requires a separate confirmation and rejects conflicting later inbound changes. Uncertain failed items should first be reviewed/resumed. Native core reload behavior is retained; zero interruption under every load is not promised.
- Previews expire after 15 minutes. Safety limit is 10,000 selected accounts per operation, not a limit on the panel's total users. Larger populations can use filters/multiple operations. Large-population throughput was not benchmarked.

## Executable tests

- Complete Node matrix: **136 tests, 135 passed, 1 skipped**. The skip is the existing real non-root UID/GID mapping test unavailable in this environment.
- Final targeted bulk/native/DOM suite: **12 passed**, including the regression showing why omitted native admin caps must not be used.
- Python release matrix: **70 tests across 18 scripts passed**. Includes historical preservation, exact embedded payload/checksums, schema, update rollback, Xray access/install fixtures and the scoped-page owner boundary.
- Actual Nova 1.92.3 temporary DB/API: read-only preview, additive reseller/user grants, preservation of quota/caps/UUID/enabled fields, unchanged all-inbound users, conditional undo, concurrent-change refusal, visible lost-response failure/retry, pause, expiry and recovery through a fresh worker module with idempotent runtime verification, and rejection/retry of a failed native runtime apply.
- Real PHP 8.2.35 + MariaDB: existing Mirza schema/login/product/wallet tests pass. The actual reseller PHP page renders its new markup; bulk AJAX works through a local catalog fixture, and invalid CSRF is rejected. This PHP rendering fixture is distinct from the actual native bulk API tests.
- DOM interaction tests at width inputs 390/1366 verify safe escaped labels, page selection persistence, preview without mutation, explicit confirmation and progress controls. These are DOM tests, not layout screenshots.
- Four actual local Xray TLS transfers still pass: VLESS/TCP, VLESS/WS, VMess/WS and Trojan/TCP; wrong TLS identity fails. Other protocol daemons were not all tested with external clients.
- Official Nova preflight and compatible/broken future-version fixtures pass their expected outcomes. Partial user/admin access preservation is now part of candidate preflight.
- JS/Python/PHP/shell syntax and the embedded installer self-test pass. Raw logs are in RC16-test-logs.zip.

## Visual/browser limitation

An official Debian Chromium 150 binary and required shared libraries were downloaded into a temporary development directory (not installed on the host and not shipped). It reports its version, but both Playwright launch and a direct headless launch terminate with SIGTRAP in this execution environment, before page rendering. Therefore no successful visual browser/screenshot QA is claimed. `tools/visual-reseller.mjs` retains optional reproducible browser checks; generated screenshots, if run elsewhere, are test artifacts rather than production data. The supplied reference image was inspected directly.

## Resource sample / deployment limits

Actual inactive controller-only sample, Nova 1.92.3 + addons, Node 24.22.1, `--max-old-space-size=192 --expose-gc`: V8 heap 34.80 MiB after initial page/AI-settings load; peak RSS so far 128.42 MiB; idle 23.36 ms CPU over 1.20 seconds. Fifty sequential page requests took 473.66 ms elapsed / 853.65 ms CPU; heap after GC 33.51 MiB; peak RSS 195.89 MiB. Current RSS is unavailable, so peak getrusage RSS is reported. Concurrent host work affects timing.

This excludes active bulk jobs, real Mirza instances, MariaDB/PHP-FPM, AdGuard, protocol daemons, Telegram polling and VPN clients. It does not certify a whole stack or arbitrary user counts on one core/1 GB.

No live VPS/systemd/APT fresh install/upgrade, real Telegram checkout, certificate issuance, external client-network/ISP test, multi-node test, long-run stability or 10,000-account stress test was run. Installation is syntax/fixture/embedding tested; live staging acceptance remains necessary. Preserve an off-server backup, deploy the full new installer, test a small selected group first, refresh client subscriptions for newly assigned entries, and check each enabled protocol from the actual client network.
