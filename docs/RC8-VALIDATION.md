# rc.8 — گزارش اجرای واقعی آزمون‌های توسعه، ۲۰۲۶-۱۰-۱۹

مبنا همان سورس بستهٔ تحویل‌شدهٔ rc.7 است. پروژهٔ alirezapanel و مخزن جدید دیگری با آن ترکیب نشده‌اند. نسخهٔ نوا و hash قراردادهای آن تغییر نکرده‌اند.

## نتایج

| بررسی | نتیجه و محدوده |
|---|---|
| Node.js v24.19.0 | ۸۸ تست؛ ۸۷ موفق، ۱ SKIP محیطی، صفر شکست |
| Python | ۴۳ تست موفق، صفر شکست |
| خودآزمایی نصاب | Bash و syntax همهٔ ۹۰ ماژول جاسازی‌شده موفق |
| قرارداد نوا | Nova 1.85.4، identity مالک، theme و JavaScript موفق |
| PHP | lint فایل‌های helper و driver اصلاح‌شده موفق |
| دیتابیس/وب ربات | MariaDB و PHP-FPM واقعی و موقت: دو migration، ورود، CSRF، مدیریت، ذخیرهٔ ظاهر و دکمه‌ها، ثبت پیش‌فرض پنل محلی و حفظ نام/قیمت سفارشی در sync مجدد موفق |
| API واقعی نوا | SQLite و HTTP محلی واقعی: ساخت حساب ربات با اینباند پیش‌فرض legacy، URI مطابق UUID و WebSocket path کانفیگ نوشته‌شده، به‌روزرسانی URL اشتراک پس از تغییر دامنه، تعویض/ابطال توکن و حذف/غیرفعال‌کردن حساب موفق |
| job دامنهٔ واقعی نوا | با executor صدور و daemon تزریق‌شده: commit و rollback هنگام شکست runtime، حفظ IP مبدأ و تنظیمات قبلی موفق؛ این مورد صدور واقعی CA نیست |
| گواهی | OpenSSL/X509 واقعی برای IP، IPv6، wildcard و تطابق کلید؛ webroot challenge از HTTP واقعی؛ renewal/rollback با executor کنترل‌شده موفق |
| Cloudflare خودکار | با پاسخ کنترل‌شدهٔ API: توکن موجود، DNS-01، بدون نوشتن A/AAAA/proxy و حفظ origin؛ خطای WAF، wrong instance و origin error در بررسی عمومی رد می‌شوند |
| نصاب | fixture دقیق و hash-verified نوا: timeout کل گروه فرایند، checksum، mirror، binary خراب، ادامهٔ نصب و تفکیک TLS صاحب پنل از fleet join بررسی شد |

تست SKIP مربوط به اجرای واقعی با UID/GID 65534 است؛ محیط نگاشت هویت لازم را ندارد. آزمون‌های محتوای config و مجوزهای هدفمند جدا موفق‌اند. رندر تعاملی UI با jsdom در عرض موبایل/دسکتاپ اجرا شد؛ این جای مرورگر تصویری Chrome را نمی‌گیرد.

## نمونهٔ منابع، نه تأیید VPS یک گیگابایت

نمونهٔ همین محیط با `--max-old-space-size=192 --expose-gc`، فقط فرایند HTTP/controller نوا همراه افزونه:

- idle پس از warm-up: heap حدود 30.13MiB؛ **peak RSS تا آن لحظه** 109.80MiB؛ حدود 5.85ms CPU طی 1.20s انتظار.
- ۵۰ درخواست ترتیبی محلی: حدود 587ms wall و 884ms CPU؛ heap پس از GC حدود 29.00MiB و peak RSS کل 204.05MiB.
- `/proc/self` ارائه نمی‌شود؛ RSS جاری قابل اندازه‌گیری نبود. peak از getrusage است.
- این تست نه CPU محدود به یک هسته بود و نه اجرای هم‌زمان Xray، AdGuard، OpenVPN، MariaDB و کاربران VPN. مجموع مصرف پایه، بار کاربران و پایداری روی VPS یک گیگابایت هنوز تأیید نشده است.

افزونهٔ جدید daemon دائمی اضافه نکرده است. اتصال ربات به API loopback از self-fetch عمومی و خطاهای hairpin/Cloudflare آن مسیر جلوگیری می‌کند؛ این تغییر ادعای کاهش اندازه‌گیری‌شدهٔ کل مصرف سرور نیست.

## مواردی که این محیط تأیید نکرده است

صدور یا تمدید زندهٔ Let's Encrypt، توکن واقعی Cloudflare، نصب سرتاسری روی systemd VPS، مسیر WAN، ping یا handshake واقعی تک‌تک پروتکل‌ها از برنامهٔ کاربر، فیلترینگ ISP، آزمون بار/بلندمدت و Chrome. دریافت باینری Xray از GitHub در این محیط با timeout پراکسی متوقف شد؛ نتیجهٔ ساخت URI با اتصال واقعی اشتباه گرفته نشده است. GitHub و VPS کاربر تغییر نکرده‌اند.

رکورد صحیح DNS، دسترسی CA به پورت 80 برای HTTP-01، مجوز DNS برای DNS-01 و پورت‌های موردنیاز سرویس‌ها همچنان لازم‌اند. `sudo alireza support` تشخیص خواندنی انگلیسی ارائه می‌دهد؛ آزمون آن از VPS است، نه ISP کاربر.

گزارش‌های خام `test-node-rc8.log`، `test-python-rc8.log`، `test-selftest-rc8.log`، `test-compat-rc8.log` و `resources-rc8.json` در همین پوشه‌اند. دستورهای تکرار آزمون‌ها مطابق گزارش rc.7، با افزودن `tests/local-connection.mjs` و `tests/tls-coordinator.mjs` هستند. محدودیت preferred source دارایی‌های upstream ربات در SOURCES.md باقی است.
