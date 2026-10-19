# rc.6 — گزارش واقعی آزمون و محدودیت

تاریخ: ۲۰۲۶-۱۰-۱۸. مبنا: HEAD مخزن alirezaserver به شناسهٔ `90b0f3554a09829e9ae38c9601ada8623ebab247`؛ ۷۷ فایل جاسازی‌شدهٔ نصاب rc.3 مبنای همسان‌سازی‌اند. این اصلاح با alirezapanel مخلوط نشده است. نوا: 1.85.4، commit `17e9373ec17ceede95369fcd26d6fabfda83b504`.

## علت‌های تأییدشده

لاگ ارسال‌شده از VPS نشان داد ابتدا config، سپس `/var/log/nova/access.log` و بعد `/etc/nova/origin.pem` برای User واقعی `xray` قابل دسترسی نبود. اصلاح دستی با nobody برای چنین واحدی درست نبود. پنل نوا فایل JSON را اتمیک با 0600 بازنویسی می‌کرد؛ بنابراین chmod یک‌باره بعد از تغییر تنظیمات از بین می‌رفت. نبود listener روی 443 پیامد افتادن Xray بود؛ verifier نباید آن را نادیده بگیرد.

rc.6 هم hook نویسندهٔ اتمیک محدود به config را حفظ می‌کند، هم قبل از هر start با ExecStartPre و هویت واقعی سیستم دسترسی config/cert/log را آماده می‌کند. سرویس Xray به root تبدیل نمی‌شود. hotfix محدود قبلی کنسول شناسایی و قبل از جایگزینی ذخیره می‌شود؛ drop-in یا مسیر سفارشی ناشناخته رد می‌شود.

در وب ربات، هر دو مقصد error_log با `/proc/self/fd/2` باعث خطای واقعی PHP-FPM روی VPS شده بودند. generator و تعمیر نصب موجود به syslog تغییر کرده‌اند. قالب PHP مقدار navy را ثابت می‌کرد و CSS Cyberpunk با !important تمام ۹ قالب را بازنویسی می‌کرد. ویرایشگر دکمه‌ها API را در `/api/keyboard.php` ریشه جست‌وجو می‌کرد، نه زیر مسیر کامل mount. این مسیرها اصلاح شده‌اند.

## اجراشده در محیط توسعه

| آزمون | نتیجه / محدوده |
|---|---|
| Node integration/unit/DOM | ۶۷ موفق از ۶۸؛ یک SKIP صریح برای UID/GID غیرقابل نگاشت؛ صفر شکست |
| Python | ۳۹ موفق؛ شامل fixtures نصب Xray، diagnostics، حفظ source baseline، permissions، مهاجرت drop-in، تعمیر FPM، reset مستقل و allowlist CLI |
| PHP واقعی | syntax check تمام ۹۳۲ فایل PHP با PHP 8.2؛ صفر خطا |
| وب ربات واقعی | MariaDB و PHP-FPM 8.2 موقت و loopback؛ migration دوباره، ورود درست/نادرست، ۹ صفحهٔ مدیریت، ذخیره/بارگذاری theme/accent/radius، رد CSRF/داده نامعتبر/ناشناس؛ FPM با syslog واقعی اجرا شد |
| صفحه‌کلید واقعی | دریافت JSON، ذخیرهٔ چیدمان با CSRF در دیتابیس، دریافت مجدد برابر با دادهٔ ذخیره‌شده؛ توکن اشتباه 403 |
| تنظیمات ظاهری DOM | اجرای JS اصلی در jsdom با عرض 390 و 1366، localStorage مسدود، انتخاب theme، رنگ/گردی، ارسال API و نمایش خطای ذخیره؛ این آزمون موتور layout/تصویر مرورگر نیست |
| فرم‌های دستی | فرم‌های واقعی pinned Nova در jsdom، فارسی/انگلیسی، پروتکل‌ها و ارسال OpenVPN از Inbounds؛ بدون daemon VPN |
| verifier نصب | native HTTP و نشست/SQLite واقعی همراه fixture AdGuard؛ redirect دقیق و دارایی‌ها؛ HTTPS غیرقابل استفاده واقعاً مردود می‌شود |
| CLI credentials | دیتابیس واقعی موقت، فهرست بدون hash، فقط حساب انتخابی، حساب قدیمی بدون رمز بازیابی، رد شناسه نامعتبر |
| syntax نصاب | bash و ۸۴ فایل جاسازی‌شدهٔ JS/Python/shell؛ PASS |
| سازگاری نوا | hash قراردادها، API هویت owner و فرم‌ها روی نسخهٔ pinned؛ PASS |

آزمون‌های AI خطاهای نبود کلید، سطح دسترسی، سهمیه، قطع شبکه، MIME/SSE نامعتبر، توقف و تاریخچهٔ جدا را با transport کنترل‌شده می‌سنجند؛ درخواست واقعی با کلید Gemini شخصی انجام نشده است. آزمون‌های نصب Xray از fixture و دانلود شبیه‌سازی‌شده استفاده می‌کنند؛ اجرای apt/systemd واقعی یا دانلود و اجرای بسته روی VPS آزمایشگاه انجام نشده است. تعمیر bot/Xray با systemctl ساختگی و فایل‌های موقت آزمون شده؛ شاهد موفقیت تعمیر دستی روی VPS، خروجی خود کاربر در چت است و جای نصب end-to-end rc.6 را نمی‌گیرد.

گزارش‌های خام: `test-node-rc6.log`، `test-python-rc6.log`، `test-selftest-rc6.log`، `test-php-lint-rc6.log` و `test-compat-rc6.log` در همین پوشه.

## منابع اندازه‌گیری‌شده

نمونهٔ واقعی native HTTP/controller + addons، Node v24.19.0 با `--max-old-space-size=192 --expose-gc`:

- heap بیکار پس از GC: حدود **29.88 MiB**؛ peak RSS تا این مرحله **101.79 MiB**.
- ۵۰ درخواست ترتیبی loopback: **487.91 ms** wall، **768.21 ms** CPU؛ peak RSS کل نمونه **176.19 MiB**؛ heap پس از GC **28.76 MiB**.
- نمونهٔ بیکاری ۱۲۰۰٫۷۳ ms: CPU حدود **4.19 ms**.

منبع: [resources-rc6.json](resources-rc6.json). `/proc` در محیط در دسترس نیست؛ RSS لحظه‌ای اندازه‌گیری نشده و peak از getrusage است. این نمونه شامل MariaDB/PHP/AdGuard، jobهای agent، سرویس‌های پروتکل یا ترافیک کاربران نیست. مصرف جداگانهٔ آن سرویس‌ها و مصرف VPN زیر بار اندازه‌گیری نشده‌اند. سقف heap، سقف کل RAM نیست. اعداد از این محیط به VPS واقعی تعمیم قطعی ندارند.

## انجام‌نشده

- نصب تازه/ارتقا/بازگشت کامل روی Debian/Ubuntu دارای systemd، با ۱ vCPU و ۱GiB RAM.
- راه‌اندازی actual Xray با کاربر غیرroot در این sandbox؛ UID/GID 65534 قابل نگاشت نیست و آزمون مربوط SKIP است.
- screenshot و pixel/layout check با Chrome/مرورگر واقعی موبایل و دسکتاپ. jsdom جای آن نیست.
- Telegram/BotFather واقعی، عملیات پرداخت و تمام جریان‌های تجاری upstream؛ تغییر رنگ دکمهٔ وب به معنی تغییر قابلیت دکمهٔ تلگرام نیست.
- کلید واقعی Gemini، SSH نصب روی مقصد زنده، مسیر WAN تونل و اتصال واقعی کلاینت‌های تمام پروتکل‌ها.
- stress طولانی، packet loss، ظرفیت هم‌زمان کاربران، crash/reboot/recovery کامل و گواهی یک‌گیگابایتی.
- preferred frontend source مستقل بعضی خروجی‌های کامپایل‌شدهٔ upstream در مرجع نیست؛ محدودیت Corresponding Source در SOURCES.md باقی است.

هیچ سرور واقعی یا GitHub در این کار تغییر داده نشد. این بسته قابل نصب و بررسی است؛ ادعای «بدون باگ»، «Stable تأییدشده» یا اجرای همهٔ سرویس‌ها با هر بار روی یک گیگ ارائه نمی‌شود.

## تکرار آزمون‌ها

از ریشهٔ پروژه اجرا کنید. `NOVA_TEST_DIR` باید source دقیق pinned Nova باشد؛ `UI_TEST_JSDOM` مسیر jsdom lib/api.js توسعه‌ای است. PHP/MariaDB تست‌های اختیاری به runtime قابل اجرا نیاز دارند؛ بستهٔ release این runtimeهای آزمایشگاه را روی VPS نصب نمی‌کند.

```bash
python3 tools/build.py
bash install.sh --self-test
node addon/compat-check.mjs "$NOVA_TEST_DIR"
NOVA_INSTALLER_FIXTURE="$NOVA_TEST_DIR/install/nova-node.sh" python3 tests/xray-install.py
python3 tests/terminal-repair.py
python3 tests/xray-permissions.py
node --test tests/ai.mjs tests/backend.mjs tests/bot-appearance.mjs tests/bot-system.mjs tests/terminal-accounts.mjs tests/dns-readonly.mjs tests/dns.mjs tests/inbounds-ui.mjs tests/installer-verify.mjs tests/manual-core.mjs tests/manual-ui.mjs tests/native.mjs tests/ui.mjs tests/verify-inbounds.mjs tests/xray-access.mjs
node --max-old-space-size=192 --expose-gc tests/resources.mjs --integrated
```

برای bot-system باید `BOT_TEST_DB_BASE` و `BOT_TEST_PHP_BASE` را به prefixهای runtime MariaDB و PHP 8.2 بدهید؛ بدون آن‌ها این تست صریحاً skip می‌شود. `tests/browser.mjs` تنها با آدرس نصب دورریختنی و Playwright قابل اجراست؛ در این محیط اجرا نشده است. آزمون‌ها نباید به VPS تولید متصل شوند.
