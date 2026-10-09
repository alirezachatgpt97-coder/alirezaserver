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
