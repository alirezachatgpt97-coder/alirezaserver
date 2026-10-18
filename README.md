<div dir="rtl" align="center">

<img src="docs/readme-hero.svg" width="100%" alt="AlirezaServer">

# 🚀 AlirezaServer

### پنل و مجموعهٔ یکپارچهٔ مدیریت سرور، Nova، Xray، DNS، OpenVPN، Alirezabot و ابزار ترمینال

![Version](https://img.shields.io/badge/version-0.8.0--rc.6-7c4dff?style=for-the-badge)
![Linux](https://img.shields.io/badge/Linux-Ubuntu%2024.04%20%7C%20Debian%2012%2F13-00bfa5?style=for-the-badge&logo=linux)
![Arch](https://img.shields.io/badge/CPU-amd64%20%7C%20arm64-2196f3?style=for-the-badge)
![License](https://img.shields.io/badge/License-GPL--3.0-f57c00?style=for-the-badge)
![Shell](https://img.shields.io/badge/Installer-Bash-4eaa25?style=for-the-badge&logo=gnubash)

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=23&pause=1000&color=00E5FF&center=true&vCenter=true&width=900&lines=ALIREZASERVER+%3A%3A+ONLINE;Nova+%2B+Xray+%2B+DNS+%2B+OpenVPN;Alirezabot+%2B+AI+%2B+Server+Management;Install+%E2%80%A2+Repair+%E2%80%A2+Backup+%E2%80%A2+Update" alt="Typing animation">

**نسخهٔ فعلی: `0.8.0-rc.6` — Release Candidate**

⚡ نصب سریع • 🌐 مدیریت شبکه • 🛡️ Xray • 🌍 DNS • 🤖 Alirezabot • 🧠 AI • ⌨️ CLI

</div>

> [!IMPORTANT]
> نسخهٔ فعلی **Release Candidate** است. قبل از نصب یا ارتقا روی سرور اصلی، از VPS و اطلاعات مهم Snapshot/Backup بگیرید.

---

# 📖 دربارهٔ AlirezaServer

**AlirezaServer** مجموعه‌ای برای نصب، یکپارچه‌سازی و مدیریت سرویس‌های مختلف روی VPS است. هدف پروژه این است که مدیریت Nova، Xray، DNS، OpenVPN، Alirezabot، AI و عملیات روزمرهٔ سرور تا جای ممکن در یک محیط منظم و قابل کنترل انجام شود.

این پروژه فقط یک صفحهٔ گرافیکی نیست؛ بخش‌های مدیریتی به سرویس‌ها، فایل‌های تنظیمات و backend واقعی متصل می‌شوند. با این حال قابلیت‌هایی که به daemon، kernel module، موتور شبکه یا تنظیم جداگانه نیاز دارند همچنان به پیش‌نیاز واقعی خود وابسته‌اند.

## ✨ امکانات مهم

- ⚡ نصب سریع با یک دستور
- 🔐 بررسی SHA-256 قبل از اجرای installer
- 🧩 یکپارچه‌سازی با Nova
- 🚀 مدیریت و تعمیر Xray
- 🌍 DNS و AdGuard
- 🛡️ OpenVPN
- 🤖 Alirezabot و پنل مدیریت ربات
- 🧠 Gemini / AI
- 🌐 مدیریت Inboundها
- 🔁 Update / Repair / Rollback
- 💾 Backup
- 🩺 Doctor و ابزار عیب‌یابی
- ⌨️ ابزار مدیریتی `alireza`
- 📊 مشاهدهٔ پورت‌های واقعی سرور
- 🧪 تست و Validation
- 🔒 جداسازی سرویس‌های داخلی روی Loopback و Unix Socket در موارد مناسب

---

# 🧭 فهرست

- [پیش‌نیازها](#-پیشنیازها)
- [نصب سریع](#-نصب-فوقسریع)
- [روش‌های نصب](#-روشهای-نصب)
- [بعد از نصب](#-بعد-از-نصب)
- [دستورات alireza](#️-دستورات-alireza)
- [پورت‌ها](#-پورتها)
- [Xray](#-xray)
- [Inbounds](#-inbounds)
- [OpenVPN](#-openvpn)
- [DNS و AdGuard](#-dns-و-adguard)
- [Alirezabot](#-alirezabot)
- [Gemini / AI](#-gemini--ai)
- [ارتقا](#-ارتقا)
- [Backup](#-backup)
- [Rollback](#️-rollback)
- [عیب‌یابی](#-عیبیابی)
- [امنیت](#-امنیت)
- [توسعه](#-توسعه)
- [ساختار پروژه](#-ساختار-پروژه)

---

# 💻 پیش‌نیازها

## سیستم‌عامل

| سیستم‌عامل | نسخه | وضعیت |
|---|---:|---|
| Ubuntu | 24.04 | ✅ پشتیبانی‌شده |
| Debian | 12 | ✅ پشتیبانی‌شده |
| Debian | 13 | ✅ پشتیبانی‌شده |
| سایر توزیع‌ها | — | ⚠️ توسط launcher فعلی تأیید نشده |

## معماری

| معماری | وضعیت |
|---|---|
| amd64 / x86_64 | ✅ |
| arm64 / aarch64 | ✅ |
| سایر معماری‌ها | ❌ تأیید نشده |

## نیازهای عمومی

- دسترسی `root` یا `sudo`
- VPS دارای `systemd`
- اینترنت خروجی
- دسترسی به GitHub و منابع پروژه
- فضای دیسک کافی
- در صورت استفاده از Domain، تنظیم DNS صحیح
- تنظیم Firewall متناسب با سرویس‌های فعال

> [!NOTE]
> نصب کاملاً Offline نیست. برخی dependencyها و binaryها در زمان نصب از شبکه دریافت می‌شوند.

---

# ⚡ نصب فوق‌سریع

ابتدا وارد سرور شوید:

```bash
ssh root@SERVER_IP
```

اگر با کاربر sudo وارد شده‌اید:

```bash
sudo -i
```

سپس دستور زیر را اجرا کنید:

```bash
curl -fL --connect-timeout 15 --max-time 120 https://raw.githubusercontent.com/alirezachatgpt97-coder/alirezaserver/main/setup.sh -o /root/alirezaserver-setup.sh && bash /root/alirezaserver-setup.sh
```

🎉 تمام! Launcher نسخهٔ pin‌شدهٔ installer را دریافت و قبل از اجرا بررسی می‌کند.

## 🔐 کارهایی که setup.sh قبل از نصب انجام می‌دهد

1. بررسی root
2. بررسی وجود systemd
3. بررسی سیستم‌عامل
4. بررسی معماری CPU
5. بررسی `sha256sum`
6. بررسی `flock`
7. جلوگیری از اجرای هم‌زمان چند launcher
8. دانلود با HTTPS
9. بررسی SHA-256
10. بررسی syntax فایل Bash
11. اجرای installer فقط بعد از تأیید

---

# 🧰 روش‌های نصب

## روش اول — Launcher پیشنهادی

```bash
sudo -i
curl -fL --connect-timeout 15 --max-time 120 https://raw.githubusercontent.com/alirezachatgpt97-coder/alirezaserver/main/setup.sh -o /root/alirezaserver-setup.sh
bash /root/alirezaserver-setup.sh
```

## روش دوم — Git Clone

```bash
git clone https://github.com/alirezachatgpt97-coder/alirezaserver.git
cd alirezaserver
sudo bash install.sh
```

## روش سوم — ZIP

ZIP پروژه را Extract کنید:

```bash
cd /path/to/alirezaserver
sudo bash install.sh
```

> [!WARNING]
> `install.sh` را به‌تنهایی از نسخه‌ای دیگر کنار فایل‌های قدیمی قرار ندهید. فایل‌های همان Release باید با یکدیگر هماهنگ باشند.

---

# 🧰 گزینه‌های setup.sh

نمایش Help:

```bash
sudo bash setup.sh --help
```

Repair:

```bash
sudo bash setup.sh --repair
```

Diagnose:

```bash
sudo bash setup.sh --diagnose
```

Check:

```bash
sudo bash setup.sh --check
```

Backup:

```bash
sudo bash setup.sh --backup
```

Update:

```bash
sudo bash setup.sh --update
```

وضعیت Update:

```bash
sudo bash setup.sh --update-status
```

Rollback:

```bash
sudo bash setup.sh --rollback
```

فقط Download و Verify:

```bash
sudo bash setup.sh --download-only
```

| گزینه | توضیح |
|---|---|
| `--repair` | تعمیر/ادامهٔ نصب با حفظ داده‌های مدیریت‌شده |
| `--diagnose` | گزارش خواندنی وضعیت خرابی |
| `--check` | بررسی integration نصب‌شده |
| `--backup` | تهیهٔ Backup |
| `--update` | اجرای Update محافظت‌شده |
| `--update-status` | نمایش نتیجهٔ آخرین Update |
| `--rollback` | غیرفعال‌سازی integration و بازگشت اجرای اصلی |
| `--download-only` | دانلود و Verify بدون نصب |

---

# ✅ بعد از نصب

## باز کردن ابزار مدیریت

```bash
sudo alireza
```

## نمایش آدرس پنل‌ها

```bash
sudo alireza panels
```

## بررسی وضعیت

```bash
sudo alireza status
```

## بررسی پورت‌ها

```bash
sudo alireza ports
```

## Doctor

```bash
sudo alireza doctor
```

> [!IMPORTANT]
> همیشه خروجی همان VPS را مرجع اصلی بدانید. پورت‌ها ممکن است بر اساس تنظیمات شما تغییر کنند.

---

# ⌨️ دستورات Alireza

## منوی تعاملی

```bash
sudo alireza
```

ابزار `alireza` یک daemon دائمی اضافه نیست و هنگام اجرای فرمان فعال می‌شود.

### Panels

```bash
sudo alireza panels
```

### Status

```bash
sudo alireza status
```

### Ports

```bash
sudo alireza ports
```

### Doctor

```bash
sudo alireza doctor
```

### Repair

```bash
sudo alireza repair
```

### تغییر رمز Nova

```bash
sudo alireza password panel
```

### تغییر رمز Alirezabot

```bash
sudo alireza password bot
```

### OpenVPN

```bash
sudo alireza openvpn
```

### Backup

```bash
sudo alireza backup
```

### Update

```bash
sudo alireza update
```

## Restart

```bash
sudo alireza restart panel
sudo alireza restart xray
sudo alireza restart bot
sudo alireza restart telegram
sudo alireza restart dns
```

## Start

```bash
sudo alireza start panel
sudo alireza start xray
sudo alireza start bot
sudo alireza start telegram
sudo alireza start dns
```

## Stop

```bash
sudo alireza stop panel
sudo alireza stop xray
sudo alireza stop bot
sudo alireza stop telegram
sudo alireza stop dns
```

> [!CAUTION]
> Stop یا Restart سرویس Xray/DNS می‌تواند اتصال کاربران فعال را قطع کند.

## Logs

Xray:

```bash
sudo alireza logs xray
```

Bot:

```bash
sudo alireza logs bot
```

Telegram:

```bash
sudo alireza logs telegram
```

---

# 🌐 پورت‌ها

## 🚨 قبل از هر چیز

وجود یک پورت در جدول زیر **به معنی بازکردن آن روی اینترنت نیست**.

پورت‌ها ممکن است:

- 🌍 Public باشند.
- 🏠 فقط Loopback باشند.
- 🔌 Unix Socket باشند.
- ⚙️ توسط کاربر انتخاب شده باشند.

## جدول پورت‌ها

| پورت | پروتکل | Scope | کاربرد | Public؟ |
|---|---|---|---|---|
| `443` | TCP | Public | TLS / Panel / Proxy / Xray | ✅ معمولاً |
| `80` | TCP | Public | HTTP / ACME | ✅ معمولاً |
| `8088` | TCP | `127.0.0.1` | Nova API/Control | ❌ |
| `10085` | TCP | `127.0.0.1` | Xray API | ❌ |
| `2087` | TCP | `127.0.0.1` | VLESS-WS داخلی config پایه | ❌ |
| `10087` | TCP | `127.0.0.1` | sing-box control | ❌ |
| `53` | UDP | انتخابی | DNS | ⚠️ |
| `53` | TCP | انتخابی | DNS | ⚠️ |
| `18085` | TCP | `127.0.0.1` | AdGuard internal management | ❌ |
| `1194` | UDP | انتخابی | OpenVPN پیشنهادی | ⚙️ |
| `22` | TCP | مقصد | SSH مقصد DNS | ⚙️ |
| `3306` | TCP | Local DB | MariaDB | ❌ برای ربات عمومی نکنید |
| `443` | TCP outbound | خروجی | Telegram / Gemini / Downloads | ➡️ |

## بررسی واقعی پورت‌ها

```bash
sudo alireza ports
```

یا:

```bash
sudo ss -lntup
```

TCP:

```bash
sudo ss -lntp
```

UDP:

```bash
sudo ss -lnup
```

بررسی 443:

```bash
sudo ss -lntup | grep ':443'
```

بررسی DNS:

```bash
sudo ss -lntup | grep ':53'
```

> [!WARNING]
> `127.0.0.1:8088`، `127.0.0.1:10085`، `127.0.0.1:2087`، `127.0.0.1:10087` و `127.0.0.1:18085` را صرفاً برای دسترسی اینترنتی Public نکنید.

---

# 🚀 Xray

نسخهٔ فعلی مسیر نصب Xray را با timeout و کنترل خطا مدیریت می‌کند و دسترسی config، certificate و log برای هویت واقعی systemd آماده می‌شود.

## وضعیت

```bash
sudo alireza status
```

## Logs

```bash
sudo alireza logs xray
```

## Restart

```bash
sudo alireza restart xray
```

## Repair

```bash
sudo alireza repair
```

### اگر Xray در نصب گیر کرد

مستند کامل:

[📘 XRAY-INSTALL](docs/XRAY-INSTALL.md)

> [!CAUTION]
> برای حل Permission از `chmod 777` استفاده نکنید و سرویس را بدون دلیل به root تبدیل نکنید.

---

# 🧭 Inbounds

ساخت دستی از بخش Inbounds انجام می‌شود و فرم‌ها به قابلیت‌های واقعی Nova متصل می‌شوند.

موارد موجود/مرتبط شامل:

- VLESS
- VMess
- Trojan
- Shadowsocks
- SS2022
- WireGuard
- Hysteria2
- TUIC
- Naive
- SOCKS
- HTTP
- Port Forwarding
- AmneziaWG
- Mieru
- MTProto
- OpenVPN

> [!NOTE]
> بعضی موارد سرویس singleton یا موتور جداگانه هستند و الزاماً یک Inbound عادی Xray محسوب نمی‌شوند.

جزئیات:

[📘 INBOUNDS](docs/INBOUNDS.md)

---

# 🛡️ OpenVPN

OpenVPN در بخش مدیریت یکپارچه در دسترس است.

پورت پیشنهادی اولیه:

```text
1194/UDP
```

اما مقدار واقعی می‌تواند تغییر کند.

## مدیریت

```bash
sudo alireza openvpn
```

## بررسی Port

```bash
sudo alireza ports
```

---

# 🌍 DNS و AdGuard

DNS و AdGuard با هدف حفظ تنظیمات موجود مدیریت می‌شوند.

## DNS

```text
53/UDP
53/TCP
```

## مدیریت داخلی AdGuard

```text
127.0.0.1:18085/TCP
```

این پورت را مستقیم Public نکنید.

## بررسی

```bash
sudo alireza doctor
```

## Restart

```bash
sudo alireza restart dns
```

> [!WARNING]
> Public DNS Resolver بدون محدودسازی مناسب می‌تواند مورد سوءاستفاده قرار بگیرد. Firewall/allowlist را متناسب با نیاز واقعی خود تنظیم کنید.

---

# 🛰️ AlirezaDNS مقصد

نصب DNS مقصد برای سرور جداگانه طراحی شده است.

قبل از نصب باید موارد زیر بررسی شوند:

- SSH
- Host key
- sudo
- دسترسی شبکه
- پورت‌های مقصد
- IP مقصد

SSH معمولاً:

```text
22/TCP
```

است، ولی پورت واقعی همان مقداری است که روی سرور خودتان تنظیم کرده‌اید.

---

# 🤖 Alirezabot

نصب Alirezabot اختیاری است.

نصب پایهٔ AlirezaServer برای شروع به Telegram Token یا Gemini Key نیاز ندارد.

## راه‌اندازی

1. وارد پنل اصلی شوید.
2. Alirezabot را باز کنید.
3. Token معتبر BotFather را وارد کنید.
4. Telegram Admin ID عددی را وارد کنید.
5. Public URL کامل را وارد کنید.
6. نصب را شروع کنید.
7. اطلاعات ورود پنل ربات را ذخیره کنید.

## تغییر رمز

```bash
sudo alireza password bot
```

## Logs

```bash
sudo alireza logs bot
```

Telegram:

```bash
sudo alireza logs telegram
```

## Restart

```bash
sudo alireza restart bot
sudo alireza restart telegram
```

## PHP-FPM

ربات از Unix Socket استفاده می‌کند:

```text
/run/alirezabot/php.sock
```

پس نیازی نیست برای PHP یک HTTP Port عمومی جدید باز کنید.

## MariaDB

برای اتصال محلی ربات نیازی نیست:

```text
3306/TCP
```

را روی اینترنت Public کنید.

---

# 🧠 Gemini / AI

مالک می‌تواند API Key شخصی Gemini را در بخش AI وارد کند.

### Network

```text
443/TCP outbound
```

### نکات

- مدل AI محلی روی VPS نصب نمی‌شود.
- درخواست AI سمت سرور انجام می‌شود.
- مشکل Gemini نباید Login اصلی را از کار بیندازد.
- پاسخ AI خودکار Shell Command اجرا نمی‌کند.
- API Key را در GitHub یا log عمومی قرار ندهید.

---

# 🔁 ارتقا

قبل از Upgrade:

1. Snapshot بگیرید.
2. Backup Nova بگیرید.
3. Backup AlirezaServer بگیرید.
4. Portها و وضعیت سرویس‌ها را ثبت کنید.

## Backup

```bash
sudo alireza backup
```

یا:

```bash
sudo bash install.sh --backup
```

## Repair / Upgrade

```bash
sudo bash install.sh --repair
sudo bash install.sh --check
```

## Update

```bash
sudo bash setup.sh --update-status
sudo bash setup.sh --update
```

یا:

```bash
sudo alireza update
```

مستند کامل:

[📘 UPGRADE](docs/UPGRADE.md)

---

# 💾 Backup

```bash
sudo alireza backup
```

قبل از تغییر بزرگ پیشنهاد می‌شود:

```bash
sudo alireza status
sudo alireza ports
sudo alireza backup
```

و سپس از پنل شرکت VPS یک Snapshot کامل بگیرید.

> [!CAUTION]
> Backup ممکن است حاوی Token، Credential، Certificate، Secret، URL مخفی یا اطلاعات کاربران باشد. آن را داخل مخزن Public قرار ندهید.

---

# ↩️ Rollback

```bash
sudo bash setup.sh --rollback
```

یا:

```bash
sudo bash install.sh --rollback
```

> [!WARNING]
> Rollback در اینجا **Downgrade کامل نسخه یا Restore کامل دیتابیس نیست**. برای برگشت کامل از Snapshot یا Backup آزمایش‌شده استفاده کنید.

---

# 🧯 عیب‌یابی

## نصب ناقص است

```bash
sudo bash setup.sh --diagnose
```

سپس:

```bash
sudo bash install.sh --repair
sudo bash install.sh --check
```

## 443 پاسخ نمی‌دهد

```bash
sudo alireza status
sudo alireza ports
sudo alireza doctor
sudo alireza logs xray
```

در صورت نیاز:

```bash
sudo alireza repair
```

## Xray بالا نمی‌آید

```bash
sudo alireza logs xray
sudo alireza repair
sudo alireza status
```

## Bot باز نمی‌شود

```bash
sudo alireza logs bot
sudo alireza repair
```

## رمز Bot فراموش شده

```bash
sudo alireza password bot
```

## رمز Panel فراموش شده

```bash
sudo alireza password panel
```

## Telegram مشکل دارد

```bash
sudo alireza logs telegram
sudo alireza status
```

## DNS مشکل دارد

```bash
sudo alireza doctor
sudo alireza ports
```

## Port اشغال است

```bash
sudo alireza ports
sudo ss -lntup
```

## نصب Xray گیر کرده

[📘 راهنمای رفع توقف Xray](docs/XRAY-INSTALL.md)

---

# 🔐 امنیت

## 🚨 این اطلاعات را Public نکنید

- Password
- Telegram Token
- Gemini API Key
- SSH Private Key
- Private Certificate Key
- Session Cookie
- URL مخفی
- Subscription Secret
- Database
- Backup
- Log خام حاوی Credential

## Loopback یعنی داخلی

موارد زیر در حالت معمول باید داخلی بمانند:

```text
127.0.0.1:8088
127.0.0.1:10085
127.0.0.1:2087
127.0.0.1:10087
127.0.0.1:18085
```

## chmod 777 نزنید

برای Permission مشکل‌دار:

```bash
sudo alireza repair
```

را بررسی کنید و User/Group واقعی سرویس را پیدا کنید.

## DB را Public نکنید

برای Alirezabot نیازی به Public کردن `3306` نیست.

## Firewall را فقط بر اساس سرویس واقعی تنظیم کنید

ابتدا:

```bash
sudo alireza ports
```

بعد فقط Port مورد نیاز را باز کنید.

---

# 📊 منابع سرور

هدف پایه استفاده روی VPS سبک است، اما 1 vCPU / 1 GiB RAM تضمین ظرفیت نیست.

مصرف به این موارد بستگی دارد:

- تعداد کاربران
- تعداد Connectionها
- Xray
- sing-box
- OpenVPN
- AdGuard
- MariaDB
- PHP-FPM
- Telegram
- Tunnelها
- Logging
- workload واقعی

AI مدل محلی نصب نمی‌کند و CLI نیز daemon دائمی اضافه نمی‌کند.

---

# 🩺 دستورات عمومی بررسی سرور

## Failed Services

```bash
systemctl --failed
```

## Listening Ports

```bash
ss -lntup
```

## RAM

```bash
free -h
```

## Disk

```bash
df -h
```

## Load

```bash
uptime
```

## Journal

```bash
journalctl -u SERVICE_NAME --no-pager -n 100
```

---

# 🧪 تست و Build

```bash
python3 tools/package-bot.py
python3 tools/build.py
bash install.sh --self-test
python3 tools/package.py ../alirezaserver-0.8.0-rc.6.zip
```

| دستور | کاربرد |
|---|---|
| `package-bot.py` | بسته‌بندی سورس Bot |
| `build.py` | Build payload و همگام‌سازی installer |
| `--self-test` | تست installer |
| `package.py` | ساخت Package نهایی و کنترل فایل‌ها |

---

# 📁 ساختار پروژه

```text
alirezaserver/
├── README.md
├── CHANGELOG.md
├── LICENSE
├── SOURCES.md
├── SHA256SUMS
├── setup.sh
├── install.sh
├── addon/
│   ├── ai.html
│   ├── ai.mjs
│   ├── alirezadns.html
│   ├── alirezadns.mjs
│   ├── backend.mjs
│   ├── backup.py
│   ├── firewall.py
│   ├── openvpn.html
│   ├── openvpn-ui.js
│   ├── update.py
│   └── ...
├── docs/
│   ├── INBOUNDS.md
│   ├── UPGRADE.md
│   ├── VALIDATION.md
│   ├── XRAY-INSTALL.md
│   └── readme-hero.svg
├── tests/
│   └── ...
└── tools/
    └── ...
```

---

# 🏗️ معماری ساده

```text
                         INTERNET
                            │
                      ┌─────┴─────┐
                      │ 80 / 443  │
                      └─────┬─────┘
                            │
                  ┌─────────▼─────────┐
                  │   NOVA / XRAY     │
                  └─────┬────────┬────┘
                        │        │
                   Loopback     Proxy
                        │        │
                ┌───────▼───┐ ┌──▼──────────┐
                │ NOVA API  │ │ DNS/AdGuard │
                └───────────┘ └─────────────┘
                        │
             ┌──────────▼─────────────────┐
             │      ALIREZASERVER         │
             │ Bot • AI • VPN • DNS • CLI │
             └──────┬────────┬────────────┘
                    │        │
                Unix Socket  HTTPS Out
                    │        │
                  PHP      Telegram/Gemini
```

---

# 📝 فایل‌های مهم

## setup.sh

Launcher کوچک برای دریافت و Verify کردن installer.

## install.sh

Installer اصلی پروژه.

## CHANGELOG.md

تاریخچهٔ تغییرات.

## SOURCES.md

منابع و اطلاعات dependencyها.

## docs/UPGRADE.md

راهنمای Upgrade، Backup و Rollback.

## docs/INBOUNDS.md

جزئیات Inboundها.

## docs/XRAY-INSTALL.md

رفع مشکلات نصب Xray.

---

# ❓ سوالات متداول

<details>
<summary><b>آیا با یک دستور نصب می‌شود؟</b></summary>

بله. دستور نصب سریع بالای README از `setup.sh` رسمی همین مخزن استفاده می‌کند.

</details>

<details>
<summary><b>روی Ubuntu 22.04 نصب می‌شود؟</b></summary>

Launcher فعلی Ubuntu 24.04 و Debian 12/13 را به‌عنوان سیستم‌های هدف قبول می‌کند.

</details>

<details>
<summary><b>ARM پشتیبانی می‌شود؟</b></summary>

بله، arm64/aarch64 در کنار amd64/x86_64 هدف فعلی است.

</details>

<details>
<summary><b>پورت 3306 را باز کنم؟</b></summary>

برای دیتابیس محلی Alirezabot خیر.

</details>

<details>
<summary><b>پورت 10085 را Public کنم؟</b></summary>

خیر؛ Xray API در حالت معمول Loopback است.

</details>

<details>
<summary><b>رمز پنل را فراموش کردم؛ دوباره نصب کنم؟</b></summary>

خیر:

```bash
sudo alireza password panel
```

</details>

<details>
<summary><b>رمز ربات را فراموش کردم؛ دوباره نصب کنم؟</b></summary>

خیر:

```bash
sudo alireza password bot
```

</details>

<details>
<summary><b>Rollback نسخهٔ قبلی را کامل Restore می‌کند؟</b></summary>

خیر. برای Restore کامل Snapshot/Backup مناسب‌تر است.

</details>

<details>
<summary><b>1GB RAM حتماً کافی است؟</b></summary>

خیر. این یک هدف پایه است، نه تضمین benchmark.

</details>

---

# 📚 مستندات

- [📘 CHANGELOG](CHANGELOG.md)
- [📘 SOURCES](SOURCES.md)
- [📘 INBOUNDS](docs/INBOUNDS.md)
- [📘 UPGRADE](docs/UPGRADE.md)
- [📘 VALIDATION](docs/VALIDATION.md)
- [📘 XRAY INSTALL](docs/XRAY-INSTALL.md)
- [📘 RESOURCES](docs/RESOURCES.md)

---

# 🤝 مشارکت

```bash
git clone https://github.com/alirezachatgpt97-coder/alirezaserver.git
cd alirezaserver
git checkout -b feature/my-change
```

قبل از Pull Request:

- تست مرتبط را اجرا کنید.
- Port جدید را مستند کنید.
- Service جدید را مستند کنید.
- تغییر امنیتی را توضیح دهید.
- Migration داده را شفاف بنویسید.
- Secret یا Backup واقعی Commit نکنید.

---

# ⚖️ مجوز

این مخزن تحت **GNU GPL v3.0** منتشر شده است.

اجزای upstream می‌توانند License و NOTICE مستقل داشته باشند. فایل‌های زیر را نگه دارید:

- `LICENSE`
- `SOURCES.md`
- فایل‌های `COPYING`
- فایل‌های `NOTICE`

نام تجاری AlirezaServer مجوز پروژه‌های upstream را تغییر نمی‌دهد.

---

<div align="center">

## 💙 ALIREZASERVER

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=20&pause=1000&color=00FFA3&center=true&vCenter=true&width=800&lines=ALIREZASERVER+%3A%3A+READY;INSTALL+%E2%80%A2+MANAGE+%E2%80%A2+REPAIR;BACKUP+%E2%80%A2+UPDATE+%E2%80%A2+MONITOR;THANKS+FOR+USING+ALIREZASERVER" alt="Footer animation">

### ⚡ سریع‌تر نصب کن • 🛡️ امن‌تر مدیریت کن • 🩺 راحت‌تر عیب‌یابی کن

⭐ اگر پروژه برایت مفید بود، Star فراموش نشود!

</div>
