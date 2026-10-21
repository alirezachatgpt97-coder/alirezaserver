::: {align="center"}
`<img src="docs/alirezaserver-banner.gif" width="100%" alt="alirezaserver animated banner">`{=html}

# 🚀 ALIREZASERVER --- Nova Control Stack

### ⚡ Nova • Xray • sing-box • AdGuard • Alirezabot • OpenVPN • TLS • Automation

![release](https://img.shields.io/badge/release-0.8.0--rc.11-7c3aed?style=for-the-badge)
![linux](https://img.shields.io/badge/Linux-Debian%20%7C%20Ubuntu-f97316?style=for-the-badge&logo=linux)
![arch](https://img.shields.io/badge/Arch-amd64%20%7C%20arm64-06b6d4?style=for-the-badge)
![license](https://img.shields.io/badge/License-GPL--3.0-22c55e?style=for-the-badge)
![shell](https://img.shields.io/badge/CLI-alireza-ec4899?style=for-the-badge)
![security](https://img.shields.io/badge/Security-TLS%20%2B%20Guard-ef4444?style=for-the-badge)

**یک مرکز کنترل یکپارچه برای مدیریت Nova، شبکه، TLS، Xray، DNS، ربات و
سرویس‌های جانبی.**

[⚡ نصب سریع](#-نصب-تکخطی) • [🧭 شروع سریع](#-شروع-سریع) • [🔌
پورت‌ها](#-جدول-کامل-پورتها) • [🧰 دستورات](#-مرجع-دستورات-alireza) • [🛡️
امنیت](#️-امنیت) • [🩺 عیب‌یابی](#-عیبیابی) • [🤖 ربات](#-alirezabot) •
[🔐 TLS](#-tls--ssl)
:::

------------------------------------------------------------------------

> \[!IMPORTANT\] این README برای شاخهٔ `main` و خط انتشار `0.8.0-rc.11`
> نوشته شده است. دستورهای نسخه‌های تاریخی نباید به‌عنوان روش نصب فعلی
> استفاده شوند.

> \[!WARNING\] پورت‌های loopback مانند `127.0.0.1:8088`،
> `127.0.0.1:10085` و `127.0.0.1:18085` را بدون دلیل امنیتی روشن روی
> اینترنت منتشر نکنید.

> \[!NOTE\] مقدار واقعی پورت‌ها و سرویس‌های فعال روی هر VPS می‌تواند با
> انتخاب‌های نصب و کانفیگ شما متفاوت باشد. مرجع نهایی همان سرور است:
> `sudo alireza ports`.

# ⚡ نصب تک‌خطی

### 🔥 نصب / ارتقای اصلی

``` bash
curl -fL --connect-timeout 15 --max-time 180 https://raw.githubusercontent.com/alirezachatgpt97-coder/alirezaserver/main/install.sh -o install.sh && sudo bash install.sh
```

بعد از نصب:

``` bash
sudo alireza
```

بررسی سلامت:

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

بررسی وضعیت آپدیت محافظت‌شده:

``` bash
sudo bash install.sh --update-status
```

اجرای آپدیت:

``` bash
sudo bash install.sh --update
```

# 🌌 پروژه چیست؟

`alirezaserver` یک بستهٔ مدیریت سرور است که اجزای مختلف شبکه و پنل را در
یک تجربهٔ مدیریتی کنار هم قرار می‌دهد. هدف پروژه این است که مدیر سرور برای
کارهای متداول مجبور نباشد بین تعداد زیادی فایل، سرویس و دستور پراکنده
جابه‌جا شود.

## ✨ قابلیت‌های شاخص

  حوزه                 قابلیت
  -------------------- ----------------------------------------------------
  🧭 مدیریت            منوی تعاملی `sudo alireza`
  🌐 پنل               مدیریت Nova و مسیرهای وابسته
  ⚡ Runtime           Xray و مسیرهای کانفیگ
  📦 Runtime اختیاری   sing-box در نصب‌هایی که آن را دارند
  🛡️ TLS               دامنه، IP و مسیرهای صدور/بررسی گواهی
  ☁️ Cloudflare        مسیر DNS-01 در صورت وجود توکن معتبر
  🧠 AI                اتصال سمت‌سرور به Gemini با کلید مالک
  🧹 DNS               AdGuard و ابزارهای بررسی DNS
  🤖 Bot               Alirezabot، PHP-FPM اختصاصی، MariaDB محلی و poller
  🔐 VPN               مدیریت OpenVPN در مسیرهای پشتیبانی‌شده
  💾 Backup            پشتیبان افزونه و داده‌های مرتبط
  🩺 Diagnostics       doctor، network، status، logs و support
  🔄 Update            آپدیت محافظت‌شده با بررسی سازگاری و rollback

# 🧭 شروع سریع

``` text
1. یک VPS پشتیبانی‌شده آماده کنید.
2. DNS دامنه را در صورت استفاده بررسی کنید.
3. دستور نصب تک‌خطی را اجرا کنید.
4. مراحل تعاملی نصب را کامل کنید.
5. با sudo alireza panels آدرس‌های واقعی را ببینید.
6. با sudo alireza doctor سلامت را بررسی کنید.
7. با sudo alireza ports سوکت‌های واقعی را کنترل کنید.
8. فقط پورت‌هایی را در فایروال باز کنید که واقعاً لازم‌اند.
9. از تنظیمات و دیتابیس نسخهٔ پشتیبان بگیرید.
10. سپس سرویس‌های اختیاری مثل Bot/OpenVPN را فعال کنید.
```

## 🖥️ سیستم‌عامل هدف

-   Debian 12 / 13
-   Ubuntu 24.04
-   amd64
-   arm64
-   دسترسی `root` یا `sudo`
-   اینترنت برای مخازن سیستم و منابع دانلود پروژه

> \[!CAUTION\] این نصب آفلاین نیست. در دسترس نبودن GitHub، مخازن سیستم،
> CA یا منابع لازم می‌تواند نصب را متوقف کند.

# 🔌 جدول کامل پورت‌ها

  ----------------------------------------------------------------------------------------
        پورت    پروتکل     Bind / Scope  مؤلفه            عمومی؟     الزام     توضیح
                                                                               امنیتی
  ---------- ------------- ------------- ------------- ------------- --------- -----------
        `80`      TCP      Public        HTTP / ACME     ✅ معمولاً   وابسته به برای
                                                                     TLS       redirect و
                                                                               HTTP-01؛
                                                                               کورکورانه
                                                                               حذف نکنید

       `443`      TCP      Public        HTTPS / TLS /      ✅       معمولاً    ورودی اصلی
                                         Proxy                                 TLS؛ سرویس
                                                                               واقعی را
                                                                               روی VPS
                                                                               بررسی کنید

      `8088`      TCP      `127.0.0.1`   Nova               ❌       داخلی     روی اینترنت
                                         API/Control                           publish
                                                                               نکنید

     `10085`      TCP      `127.0.0.1`   Xray API           ❌       داخلی     فقط کنترل
                                                                               محلی

      `2087`      TCP      `127.0.0.1`   VLESS-WS پایه      ❌       وابسته به مقدار واقعی
                                                                     config    کانفیگ مرجع
                                                                               است

     `10087`      TCP      `127.0.0.1`   sing-box           ❌       اختیاری   فقط در نصب
                                         control                               دارای سرویس

        `53`      UDP      IP انتخابی /  AdGuard DNS        ⚠️       اختیاری   DNS عمومی
                           local                                               بدون ACL
                                                                               می‌تواند
                                                                               ریسک abuse
                                                                               داشته باشد

        `53`      TCP      IP انتخابی /  AdGuard DNS        ⚠️       اختیاری   نیاز واقعی
                           local                                               را بررسی
                                                                               کنید

     `18085`      TCP      `127.0.0.1`   AdGuard            ❌       داخلی     از طریق پنل
                                         management                            proxy می‌شود

      `1194`      UDP      انتخابی       OpenVPN            ⚠️       اختیاری   فقط بعد از
                                                                               ساخت
                                                                               OpenVPN

        `22`      TCP      مقصد DNS /    SSH                ⚠️       وابسته    ممکن است
                           انتخابی                                             SSH شما
                                                                               پورت دیگری
                                                                               داشته باشد

      `3306`      TCP      Local/Unix    MariaDB Bot        ❌       اختیاری   برای ربات
                           preferred                                           نیازی به
                                                                               public کردن
                                                                               نیست

       `443` TCP Outbound  Internet      Telegram /        خروجی     اختیاری   اتصال HTTPS
                                         Gemini                                خروجی

     Dynamic    TCP/UDP    انتخابی       Inbounds           ⚠️       اختیاری   بر اساس
                                                                               پروتکل و
                                                                               تنظیم واقعی

     Dynamic    TCP/UDP    انتخابی       Tunnels            ⚠️       اختیاری   بر اساس
                                                                               engine و
                                                                               transport
  ----------------------------------------------------------------------------------------

### 🧪 مشاهدهٔ حقیقت روی خود سرور

``` bash
sudo alireza ports
sudo ss -lntup
sudo alireza status
sudo alireza doctor
```

> \[!WARNING\] جدول بالا «نقشهٔ نقش‌ها و پیش‌فرض‌ها» است، نه دستور بازکردن
> همهٔ پورت‌ها. فایروال باید بر اساس سرویس‌های واقعاً فعال تنظیم شود.

# 🧰 مرجع دستورات `alireza`

  دستور                           کاربرد
  ------------------------------- --------------------------------
  `sudo alireza`                  منوی اصلی
  `sudo alireza panels`           آدرس واقعی پنل‌ها
  `sudo alireza tls`              مدیریت TLS
  `sudo alireza tls-status`       وضعیت گواهی
  `sudo alireza network`          بررسی DNS/TCP/HTTPS
  `sudo alireza status`           وضعیت سرویس‌ها
  `sudo alireza ports`            پورت‌ها و سوکت‌های واقعی
  `sudo alireza doctor`           تشخیص سلامت
  `sudo alireza repair`           تعمیر بخش‌های مدیریت‌شده
  `sudo alireza support`          خروجی تشخیصی خواندنی
  `sudo alireza password panel`   بازنشانی رمز مالک Nova
  `sudo alireza password bot`     بازنشانی رمز وب ربات
  `sudo alireza openvpn`          مدیریت OpenVPN
  `sudo alireza restart panel`    restart پنل
  `sudo alireza restart xray`     restart Xray
  `sudo alireza restart bot`      restart ربات
  `sudo alireza logs xray`        لاگ Xray
  `sudo alireza logs bot`         لاگ وب ربات
  `sudo alireza logs telegram`    لاگ poller
  `sudo alireza backup`           پشتیبان
  `sudo alireza update`           تلاش برای آپدیت رسمی محافظت‌شده

# 🔐 TLS / SSL

TLS فقط «داشتن یک فایل certificate» نیست. DNS، نام گواهی، SNI، دسترسی
شبکه، مسیر challenge و پاسخ واقعی سرویس باید با هم سازگار باشند.

``` bash
sudo alireza tls
sudo alireza tls-status
sudo alireza network
sudo alireza doctor
```

برای دامنهٔ Cloudflare، حالت SSL/TLS سمت Cloudflare را متناسب با گواهی
معتبر origin تنظیم کنید. در سناریوهای پشتیبانی‌شده، DNS-01 به توکن معتبر
نیاز دارد. HTTP-01 نیز به DNS درست و دسترسی TCP/80 وابسته است.

> \[!TIP\] موفق بودن ping به معنی سالم بودن TLS یا پروتکل VPN نیست. تست
> را در لایهٔ درست انجام دهید.

# ⚡ Xray

Xray یکی از runtimeهای کلیدی است. مسیرهای config و دسترسی فایل‌ها باید با
User/Group واقعی سرویس systemd هماهنگ باشند.

``` bash
sudo alireza status
sudo alireza logs xray
sudo alireza restart xray
sudo alireza repair
```

از `chmod 777` به‌عنوان راه‌حل عمومی permission استفاده نکنید. ابتدا
مالکیت، گروه، مسیر config، certificate و هویت سرویس را مشخص کنید.

# 🧹 AdGuard / DNS

AdGuard در معماری پروژه با مسیر مدیریتی داخلی کار می‌کند. پورت مدیریت
داخلی نباید صرفاً برای دسترسی راحت روی اینترنت منتشر شود.

``` bash
sudo alireza network
sudo alireza ports
sudo alireza status
```

پورت 53 را فقط زمانی public کنید که واقعاً DNS عمومی می‌خواهید و سیاست
دسترسی مناسب دارید.

# 🤖 Alirezabot

نصب ربات اختیاری است و می‌تواند PHP-FPM اختصاصی، MariaDB محلی و poller
تلگرام را فعال کند.

### مسیر پیشنهادی

1.  Bot Token معتبر را آماده کنید.
2.  شناسهٔ عددی مدیر را وارد کنید.
3.  نصب را از بخش Alirezabot شروع کنید.
4.  اطلاعات ورود یک‌بارنمایش را امن ذخیره کنید.
5.  وضعیت نصب را تا پایان بررسی کنید.
6.  محصول، قیمت و پرداخت را مطابق نیاز خودتان تعریف کنید.

``` bash
sudo alireza logs bot
sudo alireza logs telegram
sudo alireza password bot
sudo alireza restart bot
```

# 🔐 OpenVPN

OpenVPN اختیاری است و پورت آن باید از تنظیم واقعی خوانده شود. `1194/UDP`
فقط پیشنهاد/پیش‌فرض متداول مسیر پروژه است و الزام همیشگی نیست.

``` bash
sudo alireza openvpn
sudo alireza ports
```

# 🧠 Gemini / AI

AI به‌صورت مدل محلی روی VPS نصب نمی‌شود. درخواست‌ها با کلید مالک از سمت
سرور به API مربوط ارسال می‌شوند.

-   کلید را در README، issue یا log عمومی قرار ندهید.
-   خطای AI نباید مانع ورود به پنل شود.
-   پاسخ مدل به‌تنهایی مجوز اجرای دستور سیستم نیست.

# 💾 Backup & Restore

قبل از ارتقا، تغییر TLS، مهاجرت دیتابیس یا تغییر بزرگ شبکه پشتیبان
بگیرید.

``` bash
sudo alireza backup
sudo python3 /opt/alirezaserver/backup.py
```

پشتیبان افزونه را با snapshot کامل VPS اشتباه نگیرید. برای تغییرات حساس
داشتن snapshot سمت provider نیز مفید است.

# 🔄 Update Guard

مسیر آپدیت Nova محافظت‌شده طراحی شده تا قبل از تعویض، سازگاری و سلامت را
بررسی کند.

``` bash
sudo bash install.sh --update-status
sudo bash install.sh --update
sudo alireza update
```

نسخهٔ ناسازگار باید متوقف شود؛ «جدیدتر بودن» به‌تنهایی دلیل امن بودن
upgrade نیست.

# 🛡️ امنیت

## چک‌لیست سریع

-   🔒 APIهای loopback را public نکنید.
-   🧱 فقط پورت‌های لازم را در firewall باز کنید.
-   🔑 Token، password، private key و URL مخفی را در Issue عمومی
    نگذارید.
-   🧾 قبل از ارسال log، secrets را حذف کنید.
-   🗄️ MariaDB ربات را بدون نیاز public نکنید.
-   🧹 DNS عمومی را بدون سیاست دسترسی رها نکنید.
-   🪪 certificate و private key را با permission مناسب نگه دارید.
-   🧪 بعد از upgrade، `doctor` و `network` را اجرا کنید.
-   💾 قبل از migration پشتیبان بگیرید.
-   🔄 نسخه‌های ناسازگار را با force نصب نکنید.

## اصل کمترین دسترسی

هر سرویس فقط باید به فایل‌ها، سوکت‌ها و شبکه‌ای دسترسی داشته باشد که برای
کار خودش لازم دارد. بازکردن همهٔ پورت‌ها یا اجرای همهٔ daemonها با root،
راه‌حل عیب‌یابی محسوب نمی‌شود.

# 🩺 عیب‌یابی فوق‌کامل

```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 001 --- پنل HTTPS باز
نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 443، سرویس پنل و TLS

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza doctor
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 002 --- گواهی صادر نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 80، challenge و CA

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 003 --- Xray بالا نمی‌آید`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

config، permission و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs xray
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 004 --- ربات وب باز نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

PHP-FPM، socket و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 005 --- Telegram پاسخ
نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

poller، token و HTTPS خروجی

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs telegram
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 006 --- DNS پاسخ نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

AdGuard، bind و پورت 53

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza network
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 007 --- پورت اشغال است`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

listener فعلی و conflict

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza ports
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 008 --- بعد از ارتقا خطا دیده
می‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

سلامت، guard و repair

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza repair
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 009 --- رمز پنل فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی امن مالک

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password panel
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 010 --- رمز ربات فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی مدیر ربات

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 011 --- OpenVPN وصل نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

پورت، transport و firewall

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza openvpn
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 012 --- Cloudflare loop ایجاد
می‌کند`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

TLS mode، origin و redirect

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 013 --- پنل HTTPS باز
نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 443، سرویس پنل و TLS

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza doctor
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 014 --- گواهی صادر نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 80، challenge و CA

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 015 --- Xray بالا نمی‌آید`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

config، permission و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs xray
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 016 --- ربات وب باز نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

PHP-FPM، socket و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 017 --- Telegram پاسخ
نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

poller، token و HTTPS خروجی

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs telegram
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 018 --- DNS پاسخ نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

AdGuard، bind و پورت 53

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza network
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 019 --- پورت اشغال است`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

listener فعلی و conflict

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza ports
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 020 --- بعد از ارتقا خطا دیده
می‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

سلامت، guard و repair

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza repair
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 021 --- رمز پنل فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی امن مالک

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password panel
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 022 --- رمز ربات فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی مدیر ربات

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 023 --- OpenVPN وصل نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

پورت، transport و firewall

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza openvpn
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 024 --- Cloudflare loop ایجاد
می‌کند`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

TLS mode، origin و redirect

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 025 --- پنل HTTPS باز
نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 443، سرویس پنل و TLS

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza doctor
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 026 --- گواهی صادر نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 80، challenge و CA

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 027 --- Xray بالا نمی‌آید`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

config، permission و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs xray
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 028 --- ربات وب باز نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

PHP-FPM، socket و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 029 --- Telegram پاسخ
نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

poller، token و HTTPS خروجی

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs telegram
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 030 --- DNS پاسخ نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

AdGuard، bind و پورت 53

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza network
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 031 --- پورت اشغال است`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

listener فعلی و conflict

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza ports
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 032 --- بعد از ارتقا خطا دیده
می‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

سلامت، guard و repair

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza repair
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 033 --- رمز پنل فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی امن مالک

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password panel
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 034 --- رمز ربات فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی مدیر ربات

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 035 --- OpenVPN وصل نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

پورت، transport و firewall

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza openvpn
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 036 --- Cloudflare loop ایجاد
می‌کند`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

TLS mode، origin و redirect

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 037 --- پنل HTTPS باز
نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 443، سرویس پنل و TLS

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza doctor
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 038 --- گواهی صادر نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 80، challenge و CA

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 039 --- Xray بالا نمی‌آید`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

config، permission و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs xray
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 040 --- ربات وب باز نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

PHP-FPM، socket و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 041 --- Telegram پاسخ
نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

poller، token و HTTPS خروجی

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs telegram
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 042 --- DNS پاسخ نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

AdGuard، bind و پورت 53

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza network
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 043 --- پورت اشغال است`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

listener فعلی و conflict

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza ports
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 044 --- بعد از ارتقا خطا دیده
می‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

سلامت، guard و repair

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza repair
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 045 --- رمز پنل فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی امن مالک

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password panel
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 046 --- رمز ربات فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی مدیر ربات

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 047 --- OpenVPN وصل نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

پورت، transport و firewall

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza openvpn
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 048 --- Cloudflare loop ایجاد
می‌کند`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

TLS mode، origin و redirect

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 049 --- پنل HTTPS باز
نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 443، سرویس پنل و TLS

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza doctor
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 050 --- گواهی صادر نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 80، challenge و CA

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 051 --- Xray بالا نمی‌آید`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

config، permission و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs xray
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 052 --- ربات وب باز نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

PHP-FPM، socket و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 053 --- Telegram پاسخ
نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

poller، token و HTTPS خروجی

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs telegram
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 054 --- DNS پاسخ نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

AdGuard، bind و پورت 53

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza network
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 055 --- پورت اشغال است`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

listener فعلی و conflict

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza ports
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 056 --- بعد از ارتقا خطا دیده
می‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

سلامت، guard و repair

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza repair
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 057 --- رمز پنل فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی امن مالک

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password panel
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 058 --- رمز ربات فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی مدیر ربات

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 059 --- OpenVPN وصل نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

پورت، transport و firewall

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza openvpn
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 060 --- Cloudflare loop ایجاد
می‌کند`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

TLS mode، origin و redirect

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 061 --- پنل HTTPS باز
نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 443، سرویس پنل و TLS

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza doctor
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 062 --- گواهی صادر نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 80، challenge و CA

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 063 --- Xray بالا نمی‌آید`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

config، permission و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs xray
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 064 --- ربات وب باز نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

PHP-FPM، socket و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 065 --- Telegram پاسخ
نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

poller، token و HTTPS خروجی

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs telegram
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 066 --- DNS پاسخ نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

AdGuard، bind و پورت 53

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza network
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 067 --- پورت اشغال است`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

listener فعلی و conflict

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza ports
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 068 --- بعد از ارتقا خطا دیده
می‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

سلامت، guard و repair

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza repair
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 069 --- رمز پنل فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی امن مالک

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password panel
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 070 --- رمز ربات فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی مدیر ربات

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 071 --- OpenVPN وصل نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

پورت، transport و firewall

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza openvpn
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 072 --- Cloudflare loop ایجاد
می‌کند`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

TLS mode، origin و redirect

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 073 --- پنل HTTPS باز
نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 443، سرویس پنل و TLS

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza doctor
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 074 --- گواهی صادر نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 80، challenge و CA

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 075 --- Xray بالا نمی‌آید`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

config، permission و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs xray
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 076 --- ربات وب باز نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

PHP-FPM، socket و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 077 --- Telegram پاسخ
نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

poller، token و HTTPS خروجی

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs telegram
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 078 --- DNS پاسخ نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

AdGuard، bind و پورت 53

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza network
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 079 --- پورت اشغال است`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

listener فعلی و conflict

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza ports
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 080 --- بعد از ارتقا خطا دیده
می‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

سلامت، guard و repair

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza repair
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 081 --- رمز پنل فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی امن مالک

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password panel
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 082 --- رمز ربات فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی مدیر ربات

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 083 --- OpenVPN وصل نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

پورت، transport و firewall

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza openvpn
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 084 --- Cloudflare loop ایجاد
می‌کند`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

TLS mode، origin و redirect

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 085 --- پنل HTTPS باز
نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 443، سرویس پنل و TLS

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza doctor
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 086 --- گواهی صادر نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 80، challenge و CA

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 087 --- Xray بالا نمی‌آید`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

config، permission و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs xray
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 088 --- ربات وب باز نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

PHP-FPM، socket و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 089 --- Telegram پاسخ
نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

poller، token و HTTPS خروجی

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs telegram
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 090 --- DNS پاسخ نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

AdGuard، bind و پورت 53

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza network
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 091 --- پورت اشغال است`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

listener فعلی و conflict

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza ports
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 092 --- بعد از ارتقا خطا دیده
می‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

سلامت، guard و repair

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza repair
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 093 --- رمز پنل فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی امن مالک

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password panel
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 094 --- رمز ربات فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی مدیر ربات

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 095 --- OpenVPN وصل نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

پورت، transport و firewall

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza openvpn
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 096 --- Cloudflare loop ایجاد
می‌کند`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

TLS mode، origin و redirect

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 097 --- پنل HTTPS باز
نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 443، سرویس پنل و TLS

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza doctor
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 098 --- گواهی صادر نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 80، challenge و CA

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 099 --- Xray بالا نمی‌آید`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

config، permission و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs xray
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 100 --- ربات وب باز نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

PHP-FPM، socket و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 101 --- Telegram پاسخ
نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

poller، token و HTTPS خروجی

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs telegram
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 102 --- DNS پاسخ نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

AdGuard، bind و پورت 53

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza network
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 103 --- پورت اشغال است`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

listener فعلی و conflict

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza ports
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 104 --- بعد از ارتقا خطا دیده
می‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

سلامت، guard و repair

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza repair
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 105 --- رمز پنل فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی امن مالک

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password panel
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 106 --- رمز ربات فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی مدیر ربات

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 107 --- OpenVPN وصل نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

پورت، transport و firewall

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza openvpn
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 108 --- Cloudflare loop ایجاد
می‌کند`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

TLS mode، origin و redirect

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 109 --- پنل HTTPS باز
نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 443، سرویس پنل و TLS

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza doctor
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 110 --- گواهی صادر نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

DNS، پورت 80، challenge و CA

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 111 --- Xray بالا نمی‌آید`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

config، permission و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs xray
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 112 --- ربات وب باز نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

PHP-FPM، socket و log

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 113 --- Telegram پاسخ
نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

poller، token و HTTPS خروجی

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza logs telegram
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 114 --- DNS پاسخ نمی‌دهد`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

AdGuard، bind و پورت 53

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza network
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 115 --- پورت اشغال است`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

listener فعلی و conflict

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza ports
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 116 --- بعد از ارتقا خطا دیده
می‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

سلامت، guard و repair

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza repair
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 117 --- رمز پنل فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی امن مالک

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password panel
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 118 --- رمز ربات فراموش شده`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

بازنشانی مدیر ربات

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza password bot
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 119 --- OpenVPN وصل نمی‌شود`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

پورت، transport و firewall

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza openvpn
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}🧪 سناریو 120 --- Cloudflare loop ایجاد
می‌کند`</strong>`{=html}
```{=html}
</summary>
```
### 🎯 تمرکز

TLS mode، origin و redirect

### 1️⃣ وضعیت را ثبت کنید

``` bash
sudo alireza status
sudo alireza ports
```

### 2️⃣ تشخیص سطح بالا

``` bash
sudo alireza doctor
sudo alireza network
```

### 3️⃣ دستور تخصصی این سناریو

``` bash
sudo alireza tls-status
```

### 4️⃣ قبل از تغییر

-   خروجی خطا را کامل بخوانید.
-   زمان وقوع خطا را یادداشت کنید.
-   آخرین تغییر انجام‌شده را مشخص کنید.
-   از فایل یا دیتابیس حساس پشتیبان بگیرید.
-   secretها را قبل از اشتراک log حذف کنید.

### 5️⃣ چیزهایی که نباید کورکورانه انجام شوند

-   بازکردن همهٔ پورت‌ها.
-   `chmod 777` روی کل مسیرها.
-   خاموش‌کردن firewall بدون تشخیص.
-   حذف دیتابیس برای رفع خطای UI.
-   تعویض certificate بدون بررسی نام دامنه.
-   force کردن upgrade ناسازگار.

### 6️⃣ تأیید بعد از اصلاح

``` bash
sudo alireza doctor
sudo alireza status
sudo alireza ports
```

اگر مشکل باقی ماند، log همان سرویس و وضعیت bind/listener را کنار هم
بررسی کنید. وجود process به‌تنهایی به معنی سالم بودن مسیر end-to-end
نیست.

```{=html}
</details>
```
# 🧪 دستورات تعمیر و بررسی

``` bash
sudo bash install.sh --repair
sudo bash install.sh --check
sudo alireza repair
sudo alireza doctor
sudo alireza support
```

# 🧱 Firewall --- رویکرد پیشنهادی

README عمداً یک دستور «همه‌چیز را باز کن» ارائه نمی‌کند. ابتدا سرویس واقعی
را مشخص کنید:

``` bash
sudo alireza ports
sudo ss -lntup
```

سپس فقط ورودی‌های موردنیاز را مطابق provider/firewall خودتان مجاز کنید.
Loopbackها نباید به‌خاطر یک rule عمومی ناخواسته public شوند.

# 📊 مدل ذهنی شبکه

``` text
Internet
   │
   ├── TCP/80  ──► HTTP / ACME
   │
   ├── TCP/443 ──► TLS / HTTPS / Proxy
   │
   ├── UDP/TCP 53 ──► DNS (فقط در صورت نیاز)
   │
   └── Dynamic ──► Inbounds / VPN / Tunnelهای انتخابی

Server Loopback
   │
   ├── 127.0.0.1:8088  ──► Nova control/API
   ├── 127.0.0.1:10085 ──► Xray API
   ├── 127.0.0.1:2087  ──► internal VLESS-WS
   ├── 127.0.0.1:10087 ──► sing-box control (optional)
   └── 127.0.0.1:18085 ──► AdGuard management
```

# 🧬 Upgrade workflow

``` text
Backup
  ↓
Preflight
  ↓
Compatibility guard
  ↓
Snapshot
  ↓
Apply update
  ↓
Health check
  ├── PASS → keep
  └── FAIL → rollback path
```

# 🧰 Build / Development

``` bash
python3 tools/package-bot.py
python3 tools/build.py
bash install.sh --self-test
python3 tools/package.py ../alirezaserver-package.zip
```

# 📚 مستندات تکمیلی

-   `docs/TLS.md` --- TLS و Cloudflare
-   `docs/UPGRADE.md` --- ارتقا و rollback
-   `docs/RC11-VALIDATION.md` --- اعتبارسنجی rc.11
-   `docs/RC11-BASELINE.json` --- baseline انتشار
-   `SOURCES.md` --- منابع و attribution
-   `LICENSE` --- مجوز
-   `NOTICE` / `COPYING` --- اعلان‌ها و مجوزهای وابستگی‌ها

# ❓ FAQ

```{=html}
<details>
```
```{=html}
<summary>
```
آیا باید همهٔ پورت‌های جدول را باز کنم؟
```{=html}
</summary>
```
خیر. جدول نقش‌ها را توضیح می‌دهد. `sudo alireza ports` و کانفیگ واقعی سرور
مرجع هستند.
```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
آیا 8088 و 10085 باید از اینترنت قابل دسترسی باشند؟
```{=html}
</summary>
```
در معماری مستندشده این‌ها loopback هستند و نباید صرفاً برای راحتی public
شوند.
```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
آیا نصب ربات اجباری است؟
```{=html}
</summary>
```
خیر. Bot و وابستگی‌های آن بخش اختیاری هستند.
```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
آیا Gemini روی VPS مدل AI نصب می‌کند؟
```{=html}
</summary>
```
خیر. مسیر AI از API خارجی با کلید مالک استفاده می‌کند.
```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
آیا موفق بودن ping یعنی VPN سالم است؟
```{=html}
</summary>
```
خیر. ICMP، TLS، HTTP و transport پروتکل‌ها لایه‌های متفاوتی هستند.
```{=html}
</details>
```
# 🏁 جمع‌بندی

::: {align="center"}
### 🚀 Install • 🛡️ Secure • 🩺 Diagnose • 🔄 Update • 💾 Backup

``` bash
sudo alireza
```

**ساخته‌شده برای مدیریت شفاف‌تر سرور، نه پنهان‌کردن پیچیدگی‌های شبکه.**

⭐ اگر پروژه برایتان مفید است، Star فراموش نشود.
:::

# 📖 پیوست اپراتوری --- ۵۰۰ بررسی سریع

### ✅ Operator Check 001

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 002

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 003

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 004

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 005

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 006

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 007

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 008

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 009

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 010

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 011

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 012

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 013

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 014

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 015

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 016

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 017

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 018

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 019

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 020

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 021

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 022

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 023

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 024

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 025

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 026

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 027

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 028

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 029

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 030

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 031

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 032

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 033

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 034

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 035

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 036

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 037

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 038

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 039

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 040

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 041

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 042

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 043

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 044

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 045

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 046

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 047

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 048

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 049

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 050

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 051

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 052

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 053

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 054

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 055

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 056

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 057

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 058

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 059

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 060

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 061

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 062

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 063

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 064

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 065

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 066

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 067

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 068

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 069

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 070

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 071

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 072

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 073

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 074

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 075

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 076

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 077

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 078

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 079

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 080

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 081

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 082

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 083

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 084

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 085

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 086

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 087

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 088

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 089

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 090

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 091

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 092

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 093

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 094

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 095

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 096

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 097

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 098

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 099

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 100

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 101

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 102

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 103

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 104

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 105

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 106

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 107

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 108

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 109

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 110

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 111

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 112

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 113

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 114

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 115

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 116

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 117

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 118

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 119

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 120

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 121

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 122

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 123

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 124

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 125

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 126

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 127

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 128

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 129

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 130

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 131

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 132

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 133

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 134

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 135

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 136

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 137

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 138

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 139

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 140

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 141

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 142

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 143

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 144

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 145

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 146

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 147

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 148

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 149

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 150

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 151

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 152

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 153

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 154

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 155

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 156

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 157

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 158

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 159

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 160

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 161

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 162

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 163

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 164

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 165

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 166

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 167

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 168

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 169

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 170

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 171

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 172

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 173

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 174

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 175

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 176

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 177

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 178

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 179

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 180

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 181

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 182

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 183

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 184

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 185

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 186

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 187

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 188

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 189

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 190

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 191

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 192

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 193

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 194

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 195

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 196

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 197

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 198

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 199

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 200

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 201

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 202

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 203

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 204

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 205

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 206

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 207

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 208

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 209

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 210

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 211

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 212

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 213

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 214

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 215

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 216

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 217

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 218

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 219

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 220

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 221

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 222

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 223

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 224

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 225

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 226

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 227

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 228

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 229

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 230

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 231

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 232

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 233

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 234

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 235

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 236

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 237

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 238

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 239

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 240

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 241

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 242

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 243

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 244

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 245

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 246

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 247

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 248

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 249

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 250

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 251

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 252

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 253

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 254

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 255

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 256

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 257

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 258

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 259

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 260

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 261

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 262

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 263

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 264

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 265

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 266

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 267

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 268

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 269

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 270

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 271

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 272

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 273

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 274

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 275

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 276

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 277

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 278

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 279

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 280

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 281

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 282

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 283

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 284

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 285

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 286

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 287

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 288

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 289

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 290

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 291

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 292

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 293

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 294

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 295

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 296

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 297

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 298

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 299

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 300

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 301

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 302

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 303

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 304

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 305

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 306

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 307

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 308

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 309

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 310

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 311

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 312

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 313

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 314

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 315

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 316

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 317

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 318

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 319

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 320

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 321

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 322

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 323

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 324

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 325

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 326

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 327

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 328

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 329

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 330

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 331

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 332

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 333

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 334

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 335

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 336

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 337

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 338

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 339

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 340

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 341

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 342

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 343

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 344

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 345

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 346

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 347

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 348

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 349

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 350

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 351

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 352

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 353

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 354

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 355

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 356

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 357

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 358

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 359

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 360

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 361

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 362

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 363

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 364

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 365

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 366

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 367

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 368

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 369

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 370

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 371

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 372

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 373

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 374

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 375

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 376

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 377

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 378

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 379

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 380

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 381

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 382

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 383

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 384

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 385

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 386

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 387

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 388

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 389

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 390

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 391

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 392

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 393

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 394

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 395

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 396

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 397

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 398

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 399

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 400

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 401

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 402

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 403

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 404

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 405

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 406

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 407

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 408

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 409

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 410

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 411

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 412

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 413

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 414

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 415

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 416

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 417

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 418

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 419

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 420

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 421

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 422

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 423

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 424

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 425

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 426

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 427

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 428

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 429

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 430

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 431

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 432

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 433

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 434

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 435

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 436

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 437

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 438

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 439

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 440

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 441

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 442

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 443

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 444

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 445

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 446

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 447

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 448

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 449

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 450

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 451

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 452

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 453

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 454

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 455

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 456

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 457

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 458

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 459

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 460

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 461

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 462

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 463

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 464

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 465

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 466

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 467

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 468

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 469

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 470

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 471

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 472

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 473

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 474

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 475

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 476

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 477

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 478

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 479

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 480

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 481

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 482

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 483

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 484

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 485

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 486

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 487

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 488

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 489

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 490

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 491

-   وضعیت سرویس‌ها را قبل از restart ثبت کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 492

-   پورت listener را با تنظیم firewall تطبیق دهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 493

-   Loopback را با public bind اشتباه نگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 494

-   قبل از upgrade یک backup تازه داشته باشید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 495

-   بعد از upgrade سلامت HTTPS را دوباره بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 496

-   توکن‌ها را در screenshot عمومی نمایش ندهید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 497

-   برای خطای TLS ابتدا DNS و نام گواهی را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 498

-   برای خطای Xray ابتدا log و permission را بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 499

-   برای Bot، PHP-FPM و poller را جداگانه بررسی کنید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.

### ✅ Operator Check 500

-   برای DNS، UDP و TCP را جداگانه در نظر بگیرید.
-   دستور پایه: `sudo alireza doctor`
-   مشاهدهٔ پورت: `sudo alireza ports`
-   نتیجه را قبل و بعد از تغییر مقایسه کنید.
