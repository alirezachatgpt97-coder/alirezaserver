# rc.10 validation — 2026-10-19

## Authoritative basis and preservation

Input: the user's `alirezaserver-rc9-web-upload(2).zip`, SHA256 `aa055b1dc44e757ffc6e12586a98c960fddd4ab0c7df6a232ba185d343aa0867`. The full inner source archive was extracted and retained. This is a complete project/release package, not the earlier standalone hotfix or an older preview.

RC10-BASELINE.json records **1353 protected pre-existing files**, checked byte-for-byte against the input. All original source files remain present. Native protocol engines, native source, inbound/config export logic, TLS/certificate/renewal adapters, AdGuard assets, panel themes/effects/UI and previous optimization code are unmodified. The bot preferred-source/payload changes by exactly one new PHP migration; all pre-existing bot file contents are identical. Installer changes outside embedded addon updates are restricted to the schema operation in the existing managed-bot upgrade block and rc.10 release metadata.

## What changed

Only SQL product-schema migration/verification and its installer integration:

- Missing `product.limitip` is added with default zero, matching existing form semantics.
- Missing `status_product` is added with active default. An existing NULL default is repaired and existing NULL statuses normalized to active. Explicit disable/custom statuses, nonzero limits, prices and account data remain intact.
- Existing DBs are streamed to a private product-table snapshot before changes. There is no unbounded fetchAll of product rows and no new daemon or normal-runtime polling.
- Fresh bot installs contain the migration, inspect old DBs before bootstrap if present, then verify the actual resulting schema. Bootstrap's generic migration-error logging cannot silently pass this check.
- The ordinary complete panel installer calls repair-schema for a managed existing bot under its operation lock. A separate user repair command is not required.
- The helper performs no systemd restart, network/DNS/firewall changes or credential writes. Existing base-installer upgrade behavior is retained.

## Tests actually run

- Node: **105 total, 100 PASS, 5 SKIP, 0 FAIL**.
- Python: **49 PASS, 0 FAIL**.
- Total successful test cases: **149**. Four optional actual-Xray cases were not rerun because the test binary is not available in this session; one real non-root permission case was skipped because UID/GID 65534 mapping is absent. rc.9 actual-Xray results are retained as historical evidence, not counted as current test successes.
- Installer self-test: **96 embedded module syntax checks PASS**.
- Pinned Nova **1.85.4** contracts/themes/JavaScript and native owner identity PASS.
- New PHP helper and preferred migration syntax PASS.

### Real SQL and HTTP integration

Temporary MariaDB 10.11 and PHP 8.2/FPM processes ran under workspace/loopback only. The actual manager `repair-schema` dispatcher was invoked while holding the same operation lock used in production. The old-schema SQL failure `42S22 / 1054` was reproduced before repair. Snapshots, repair, verification and repeat no-op behavior were checked. A legacy plan with nonzero IP limit and explicit disable status survived repair and a repeat real bootstrap. Snapshot permissions were 0600; no extra snapshot was created on repeat.

A genuinely new database ran the fresh missing-table branch and succeeded after **one** bootstrap with the new migration, followed by the actual verify_schema helper. Through the real authenticated web panel, tests added a Persian plan with a quote in its name, checked saved price/limit/status, edited and deleted it, rejected invalid CSRF, and verified the legacy plan was retained. Existing bot web login, appearance persistence and management pages also passed their regression tests.

Tests cover relative/symlink path rejection, operation-lock exclusion, exact source/payload/embedded-module consistency and protected rc.9 file hashes. Every existing bot payload member was checked against its preferred source.

## Practical limits

No real user VPS, live Telegram sales/payment transaction, package-manager installation on a VPS, public CA renewal or network stress test was performed. The user's exact original SQL message was not available; the repaired missing-column error was independently reproduced. Whole-panel bug-free operation is not guaranteed.

Visual browser QA was not repeated: no UI source was changed, native style/script retention and DOM interaction tests passed. The base controller, effects, service architecture and optimizations remain the supplied rc.9 code. Streamed product backup limits incremental repair memory; no new full-system 1-vCPU/1-GiB benchmark is claimed. Prior resource reports remain historical and do not certify arbitrary user load.

SQL DDL is not an ordinary rollbackable transaction. On failure the previous migration file is restored, but added columns are not destructively dropped. The private JSONL snapshot retains schema and rows for manual recovery. It is a product-table snapshot, not a full database backup; use the existing alireza backup before the overall upgrade.

No GitHub publication or production server mutation was performed.
