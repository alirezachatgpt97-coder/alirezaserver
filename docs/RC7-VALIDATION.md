# rc.7 — آزمون و محدودهٔ واقعی

مبنا: همان ZIP پیوست‌شدهٔ rc.6؛ SHA256 ورودی:
`79391cf0d9087b2ec09e3d2b9aed955d52f294d2c229942f06dd088aa4d478bc`.

از preview قدیمی یا alirezapanel هیچ فایلی روی این مبنا ادغام نشده است. تمام فایل‌های `core/alirezabot` و UI/assetهای موجود ربات byte-identical با ورودی‌اند. فرم‌های اینباند، میزبان، تونل، OpenVPN، AI و AdGuard بازطراحی نشده‌اند. تغییر preload محدود به adapterهای TLS، challenge و هدایت HTTP است. ESM hooks با SHA دقیق cert.mjs و server.mjs نسخهٔ pinned نوا محافظت می‌شوند؛ فایل‌های میزبان روی دیسک تغییر نمی‌کنند.

## یافته و اصلاح

- نصب نوا پیش از ادغام برای دامنه اقدام می‌کرد و برای IP تنها self-signed داشت. درخواست معتبر اکنون پس از آماده‌شدن listener و دسترسی runtime انجام می‌شود.
- standalone همراه stop/start با وب‌سرور موجود روی 80 ناسازگار بود. webroot و bypass محدود challenge جایگزین می‌شوند و holder پورت در این مسیر بسته نمی‌شود.
- هویت واقعی Xray برای خواندن گواهی انتخاب می‌شود؛ مجوز با حدس nobody تعیین نمی‌شود.
- checkHost برای IP SAN کافی نیست و مقایسهٔ متنی SAN، IPv6 فشرده/wildcard را اشتباه تشخیص می‌داد. بررسی crypto متناسب با IP یا نام میزبان انجام می‌شود.
- IPها runtime و config مجزای Certbot دارند، پس Certbot قدیمی سیستم مجبور به تمدید گواهی IP نمی‌شود. timer هر شش ساعت فقط policy اختصاصی را هدف می‌گیرد.
- پس از تغییر گواهی اصلی توسط مدیر، timer آن را بازنویسی نمی‌کند؛ شکست راه‌اندازی/سلامت تمدید جفت قبلی را بازمی‌گرداند. جفت سالم قبل از صدور هم پشتیبان خصوصی دارد.
- بررسی عمومی HTTPS با CA روشن است؛ cookie مدیر ارسال نمی‌شود و خطای Cloudflare origin مثل 526 موفق معرفی نمی‌شود.

## آزمون اجراشده

| مورد | نتیجه |
|---|---|
| مجموعهٔ Node | **۸۰ موفق، ۱ SKIP، صفر شکست**؛ ۸۱ آزمون |
| مجموعهٔ Python | **۴۲ موفق، صفر شکست** |
| self-test نصاب | **۸۸ فایل جاسازی‌شده** و syntax Bash/JS/Python موفق |
| قرارداد نوا | hash، نحو، renderer و هویت واقعی owner روی نوا 1.85.4 موفق |
| ربات | PHP-FPM/MariaDB واقعی موقت، ورود، صفحات، ظاهر و ذخیرهٔ keyboard در مجموعهٔ Node دوباره گذشت |
| TLS | ۱۳ آزمون اختصاصی با شرح زیر؛ صفر شکست |
| حفظ UI | مقایسهٔ بایت فایل‌ها با ZIP ورودی، شامل سورس کامل ربات؛ UI و پروتکل‌های موجود تغییر ندارند |

TLS شامل این موارد است: ساخت واقعی گواهی‌های آزمایشی با OpenSSL و بررسی SAN/کلید؛ رد private/loopback/documentation IP و ورودی تزریقی؛ سرور HTTP واقعی روی loopback برای challenge و رد traversal/symlink/POST؛ تبدیل دقیق فرمان standalone؛ اجرای مسیر provisioning با فایل/فرمان کنترل‌شده و بررسی گروه واقعی و جدایی config؛ حفظ native flow دامنه؛ تمدید و rollback با failure injection؛ جلوگیری از overwrite گواهی جایگزین؛ هدایت HTTP به هویت تنظیم‌شده به‌جای Host جعلی و حفظ API loopback؛ import واقعی native module تحت hash hooks؛ شناسایی IPv6/wildcard؛ بررسی فعال‌بودن CA و نبود cookie در public probe با transport کنترل‌شده؛ backup خصوصی و idempotent جفت قبلی.

آزمون Certbot provisioning و systemctl از فرمان کنترل‌شده استفاده می‌کند؛ **اجرای Certbot روی Let's Encrypt زنده نیست**. گواهی‌های OpenSSL محلی self-signed فقط fixture بررسی crypto هستند و به‌عنوان گواهی عمومی معتبر معرفی نشده‌اند. fixture public probe رفتار خطای 526 و rejectUnauthorized را بررسی می‌کند؛ ارتباط واقعی Cloudflare نیست. HTTPS probe پس از تمدید در تولید واقعی پیاده‌سازی شده، ولی در آزمون rollback با probe تزریق‌شده بررسی می‌شود.

SKIP موجود به نگاشت‌نشدن UID/GID غیرroot در sandbox مربوط است؛ به‌عنوان موفق گزارش نمی‌شود. کد PHP در این نسخه تغییر نکرد؛ گزارش lint ۹۳۲ فایل rc.6 همراه تاریخچه حفظ شده و به‌عنوان lint تازهٔ rc.7 جا زده نشده است.

## اندازه‌گیری منابع

منبع: [resources-rc7.json](resources-rc7.json). Node v24.19.0 با `--max-old-space-size=192 --expose-gc`، فقط HTTP/controller + addons:

- heap بیکار حدود **30.10 MiB**؛ peak RSS تا آن مرحله **109.81 MiB**.
- ۵۰ درخواست ترتیبی loopback: **459.85 ms** wall و **853.66 ms** CPU؛ peak RSS کل نمونه **173.30 MiB**؛ heap پس از GC **28.98 MiB**.
- CPU نمونهٔ بیکاری ۱۲۰۱٫۴۹ ms حدود **5.75 ms**.

RSS لحظه‌ای در این محیط بدون `/proc` در دسترس نیست؛ peak از getrusage است. این نمونه مصرف کل VPS، Certbot/Python هنگام صدور، PHP/MariaDB، AdGuard، daemonهای پروتکل، agent jobها یا ترافیک VPN را اندازه نگرفته است. timer مقیم نیست؛ اجراهای کوتاه هنگام صدور/تمدید هزینهٔ جدا دارند و مصرفشان اندازه‌گیری نشده است. **پشتیبانی قطعی کل مجموعه روی ۱GiB اعلام نمی‌شود.**

## انجام‌نشده / باقی‌مانده

- نصب تازه، repair و timer در systemd واقعی VPS؛ دانلود venv/wheel در همان محیط.
- صدور Let's Encrypt زنده برای IP/domain و آزمون واقعی پایان اعتبار شش‌روزه.
- اتصال Cloudflare با token واقعی، DNS propagation/CAA، تنظیمات WAF یا Full (strict) روی zone واقعی.
- آزمون بدون VPN از ISP کاربر یا شبکهٔ ایران. آزمون VPS معادل این سناریو نیست؛ رفع فیلتر IP تضمین نشده است.
- آزمون تصویری Chrome، موبایل، WAN، بار VPN، stress بلندمدت و محدودیت واقعی ۱GiB.
- محدودیت preferred source بعضی assetهای کامپایل‌شدهٔ upstream در SOURCES.md همچنان باقی است؛ پیش از انتشار عمومی بررسی شود.

هیچ سرور واقعی یا GitHub تغییر نکرده است. rc.7 یک نامزد قابل نصب/بررسی است، نه تضمین نبود باگ یا گواهی Stable در همهٔ شبکه‌ها. برای رفتار نصب، روش‌های صدور و شرایط پورت‌ها [TLS.md](TLS.md) را بخوانید.

## تکرار

همان envهای توسعه و دستورهای گزارش rc.6 معتبرند؛ `tests/tls.mjs` و `tests/terminal-english.py` اضافه شده‌اند. `NOVA_TEST_DIR` باید سورس pinned نوا، `UI_TEST_JSDOM` مسیر jsdom توسعه، و BOT_TEST_DB_BASE/BOT_TEST_PHP_BASE runtimeهای آزمایشگاه باشند. بدون envهای bot، تست اختیاری آن صریحاً SKIP می‌شود.

```bash
python3 tools/build.py
bash install.sh --self-test
node addon/compat-check.mjs "$NOVA_TEST_DIR"
node --test tests/tls.mjs
python3 tests/terminal-english.py
NOVA_INSTALLER_FIXTURE="$NOVA_TEST_DIR/install/nova-node.sh" python3 tests/xray-install.py
```

گزارش‌های خام: `test-node-rc7.log`، `test-python-rc7.log`، `test-selftest-rc7.log` و `test-compat-rc7.log`. بررسی ZIP نهایی شامل testzip، تطبیق hash تمام ورودی‌ها و تطبیق setup با install است.
