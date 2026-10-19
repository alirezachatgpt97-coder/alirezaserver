# 0.8.0-rc.7 — trusted TLS and English terminal control

Defer initial domain issuance until runtime integration is ready. Add hash-guarded native certificate adapters: webroot HTTP-01 with the HTTP listener kept alive, actual Xray group, IP SAN validation, corrected compressed IPv6/wildcard health. Add IP-capable pinned Certbot 5.8.0 in an isolated wheel-only venv with private config; six-hour renewal timer, private pair backups, changed-primary protection and health rollback. Verify public CA TLS and fail on Cloudflare origin 5xx. Preserve native domain jobs/rollback and Cloudflare DNS workflow. Redirect public panel HTTP to HTTPS without changing local API/upgrade events. Make the alireza TUI fully English, grouped and colored with real service state, TLS wizard/status and read-only network diagnostics. No bot/UI/protocol/AdGuard redesign. Live CA/Cloudflare/ISP/1GiB testing remains outstanding.

# 0.8.0-rc.6 — persistent runtime repair, Alirezabot preferences and terminal control

Repair Xray config/certificate/log access for the actual service identity before each start using a privileged preparation helper, preserving the daemon identity. Migrate only the exact legacy console hotfix and back it up; reject unrelated drop-ins. Keep the native atomic-writer guard. Rotate known Xray logs without replacing their owner. Repair both FPM log destinations to syslog; validate configuration and wait for a real active socket. Upgrade only explicit managed bot UI paths with backup, preserving database/storage. Fix bot theme overrides and mounted keyboard API; persist per-admin validated appearance with CSRF. Add independent password reset with PHP-session revocation and one-time credential response. Add on-demand root alireza CLI/TUI, native stdin password reset, selective OpenVPN credentials, ports, status, repair, logs and backups. Include editable bot source, deterministic bot packaging and animated README. This remains a release candidate; no full VPS/1GiB/visual-browser certification.

# 0.8.0-rc.5 — Xray runtime permission repair

Fix the confirmed permission-denied failure: native atomic runtime writes created a root-only config while Xray ran as a non-root service. Preserve native transactions and configuration contents; scope the atomic writer adapter to the exact configured runtime file, apply the existing systemd service group before rename and keep other private JSON at 0600. Record prior file permissions; refuse symlinks/custom unsupported layouts; repair existing files and restart Xray only if inactive. Keep rc.4 verifier fix and diagnostics, now including Xray service state. No blanket chmod, root daemon, protocol/UI/AdGuard changes.

# 0.8.0-rc.4 — installer verification hotfix

Fix the stale standalone OpenVPN HTTP-200 assertion after its move into native Inbounds. Verify the exact legacy redirect, actual unified assets and native HTML injection. Preserve failure stage/exit/line and private verifier/service-state evidence across cleanup; add read-only --diagnose. Synchronize standalone addon files with the authoritative embedded rc.3 payload and restore preferred carrier source. Existing UI, backend features and AdGuard remain unchanged. Full VPS installation and deleted-server login failure are not certified.

# 0.8.0-rc.3 — recovered from user-supplied rc.2

Unified manual protocol selection with native engine forms; inline OpenVPN management without iframe; grouped native Hosts page and atomic edits; native Alirezabot management page, retained secrets and matching PHP-FPM; direct AI navigation with robust storage/language/theme handling. Existing presets, backend services, native main UI and AdGuard remain preserved. Syntax and behavioral checks are recorded in docs/VALIDATION.md. This is a review candidate, not a certified Stable build.

# 0.8.0-rc.2 — 2026-10-17

- Transactional native Hosts management, batch editing, format-aware client overrides, exact profile matching, safe transport export and protection against legacy UI dropping metadata.
- KCP updated to actual Xray 26.3.27 FinalMask; editable fallbacks, transport options and round-trip preservation of existing settings. Actual KCP echo and routed VLESS authentication tests.
- Durable bot inbox/receipts, bounded handler runtime, deadlock-free subprocess output, owner-reviewed retries, real Telegram connection status and verified Telegram TLS. Independent bot web CSS/fonts preserved.
- FRP performance controls, role-aware ports, durable endpoint adapter, proper forms, explicit matching VLESS/WS inbound provisioning with batch rollback; own-service/firewall isolation retained.
- No VPS/WAN/Telegram/payment/1GiB or browser certification. See VALIDATION and NOVA-X-REVIEW.

# 0.8.0-rc.1 — integrated review candidate

- Added full upstream PHP bot/web payload with alirezabot branding, original fonts/CSS, private on-demand FPM, unprivileged polling, maintenance, encrypted credentials and native-account adapter.
- Added managed Hashem/FRP/Backhaul/carrier section within native Tunnel, pinned downloads, prebuilt amd64/arm64 Go carrier, SSH fingerprint verification, persisted jobs, owned-service/port/route checks and snapshots/rollback.
- Scoped inherited firewall/MSS/FoU operations to owned resources; disabled inherited UFW/global sysctl rewrites. Separate mutable core directory avoids Nova code read-only mounts.
- Expanded graphical TLS/Reality/sniffing options; actual Xray validation found and now rejects invalid Reality+WS/HTTPUpgrade combinations. Native core apply failures are no longer toasted as success.
- Added host ordering, real bot DB backup, status coalescing and bounded bot logs. AI key/model fixes and native theme integration retained.
- Advanced reference Host overrides and extra protocol engines remain incomplete. This is not a Stable or 1GiB capacity certification.

# 0.8.0-preview.1 — reviewed development checkpoint

- Six-tab native manual Xray workflow, socket and WS/gRPC settings.
- Centralized native subscription-host CRUD with stale-list detection.
- AI key/model onboarding, atomic settings and credential-cache invalidation.
- Scoped Nova-themed AI/remote-DNS console styling; AdGuard assets unchanged.
- 90 automated tests pass. Complete reference Hashem/bot integration remains unimplemented; see docs/NOVA-X-REVIEW.md. No Stable/complete claim.

# 0.7.1 — configurable manual form

- Visible protocol catalog cards; graphical controls replace JSON for common Xray manual creation.
- Transport/security/TLS/Reality/account controls; consistent native metadata plus raw configuration.
- Owner-only X25519 key generation with same-origin protection, without a subprocess or local AI.
- SOCKS/HTTP remain on native account-aware editor to avoid empty-account raw configs.
- Added model/UI/native authorization regressions; unsupported extra protocol engines still not claimed.

# 0.7.0 — Inbounds integration

- Owner-only manual protocol/transport/security picker reuses the complete native Nova editor and validation.
- OpenVPN navigation entry removed; full existing management lazily embedded in Inbounds with native theme inheritance and language selection.
- AmneziaWG/Mieru/MTProto direct access uses existing singleton-service controls, not fake new inbound rows.
- Installer source/hash verified against current GitHub 0.6.1; no runtime data schema migration.
- Guarded updater checks the new native form contracts before activation.
- Protocol inventory explicitly records engines still absent; this is not delivery of every alirezapanel protocol.

# 0.6.1 — رفع توقف نصب Xray

- سقف زمانی برای کل گروه فرایند نصب Xray، خروجی زنده و fallback واقعی پس از timeout.
- محدودیت اتصال، کم‌سرعتی و HTTPS برای دریافت mirror؛ حفظ نسخه و checksumهای قبلی هر دو معماری.
- بررسی قابلیت اجرای binary پیش از نصب mirror و پیش از گزارش OK.
- تشخیص نصب پایهٔ ناقص برای ادامه؛ نصب پایهٔ سالم مجدداً اجرا نمی‌شود.
- ۱۱ آزمون اختصاصی جدید؛ هیچ تغییر UI، پروتکل، دادهٔ کاربران یا AdGuard در این hotfix نیست.

# 0.6.0 — 2026-10-09

- Maintained the original Nova panel CSS, scripts, effects, layout and branding; added an AI menu entry and separate extension documents.
- Improved OpenVPN management/subscription UI, English technical numbers, owner-only credential reveal/copy, explicit user toggles and connection instructions; kept profiles, existing CA, accounts and subscription tokens.
- Added official server-side Gemini streaming advisor, dynamic compatible models, encrypted owner-managed key, per-identity paginated SQLite message history, stop/retry/copy/delete, safe text/code rendering and opt-in sanitized summary preview.
- Added remote DNS SSH hostname/user support, passwordless sudo, authenticated preflight, actual stage events, persistent jobs, restart/interruption visibility and owner-initiated HTTPS health checks. Existing managed destinations resume without wiping settings.
- Coalesced OpenVPN accounting/status work, batched systemctl reads, avoided repeated status-stamp writes and unnecessary disconnect probes, added bounded static-panel/theme caches and non-overlapping extension polling.
- Preserved AdGuard proxy styling and native behavior; removed automatic legacy DNS migration from repair and made installation DNS checks read-only.
- Reduced unnecessary service restarts on no-change repair, added installer-log rotation and consistent AI SQLite backup; strengthened Nova candidate identity checks.
- Added maintainable addon sources and standalone-installer generator, baseline hashes, regression/native/DOM tests, optional browser checks, honest resource measurements and Persian installation/upgrade/rollback docs.

Live VPS installation, protocol traffic, SSH destination installation, real Gemini quotas, full AdGuard daemon, visual browser QA and one-core/1 GiB load certification remain untested in this environment. See docs/VALIDATION.md.
