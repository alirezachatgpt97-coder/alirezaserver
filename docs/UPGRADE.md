# rc.10 SQL upgrade

Use the complete new install.sh for both fresh install and upgrade. For a managed existing bot, the normal installer calls repair-schema under the existing bot operation lock before UI repair. This snapshots the product table, adds only missing columns/valid defaults and verifies readiness. New bot installs contain the migration in their packaged source, check existing schema before bootstrap where applicable, and verify the result afterwards. No separate repair file is needed.

The private backup contains SHOW CREATE TABLE and streamed JSONL rows. It is not a backup of the entire database. SQL DDL cannot be rolled back as an ordinary transaction; on error the previous migration file is restored but added columns are not destructively dropped. Data is retained and retry is idempotent. A failed DB permission/connection check stops installation at the reported stage instead of reporting success. Back up from the existing alireza menu before the overall upgrade.

---

# ارتقای rc.7

از snapshot و پشتیبان rc.6 شروع کنید. تمام محتوای بسته را در ریشهٔ همین مخزن جایگزین و از پوشهٔ جدید `sudo bash install.sh --repair` اجرا کنید. مرحلهٔ Trusted TLS گواهی موجود معتبر را بررسی یا برای IP/دامنه درخواست ثبت می‌کند. در خطای CA، DNS، CAA یا Cloudflare، داده و HTTPS قبلی باقی می‌ماند؛ خطا را طبق [TLS](TLS.md) رفع و با `alireza tls` روش درست را انتخاب کنید. سپس همان نصاب را دوباره اجرا کنید. `alireza` اکنون انگلیسی است؛ `alireza network` تشخیص خواندنی اتصال دارد.

این نسخه سرویس تمدید شش‌ساعته برای IP کوتاه‌مدت دارد؛ در rollback timer متوقف می‌شود. برای جلوگیری از انقضا، TLS قبلی/renewal مناسب را آگاهانه بازیابی کنید. دستور rollback ادغام، restore کامل VPS نیست. بررسی عمومی HTTPS از خود سرور، آزمون دسترسی از ISP کاربر نیست.

## تاریخچهٔ راهنما

# ارتقای rc.6

تمام فایل‌های این ZIP را جایگزین سورس همین مخزن کنید؛ setup.sh و install.sh باید جفت هم باشند. پیش از اجرا snapshot VPS، backup خود نوا و `sudo python3 /opt/alirezaserver/backup.py` را بگیرید. در پوشهٔ جدید اجرا کنید:

```bash
sudo bash install.sh --repair
sudo bash install.sh --check
sudo alireza
```

این ارتقا فایل‌های صریح UI ربات مدیریت‌شده را با backup در `/var/lib/alirezabot/ui-backup-*.tar.gz` به‌روز می‌کند؛ دیتابیس، پیکربندی ربات، offsets و inbox پاک نمی‌شوند. تنظیم FPM مدیریت‌شدهٔ قبلی تعمیر و سلامت سوکت کنترل می‌شود. reset رمز اختیاری و مستقل است. از storage موجود هنگام نصب دوباره محافظت می‌شود.

دسترسی config، origin.pem/key و لاگ‌های Nova برای User/Group واقعی Xray آماده می‌شود و helper پیش از هر شروع سرویس دوباره اجرا می‌شود. hotfix محدود کنسول قبلی قابل مهاجرت است و قبل از تغییر backup می‌شود؛ drop-in ناشناخته رد می‌شود. restart Xray ممکن است اتصال فعال را قطع کند؛ زمان مناسب انتخاب کنید.

بازگشت کامل باید با snapshot متناظر کد/دادهٔ نوا و backup افزونه انجام شود. آرشیو UI فقط همان فایل‌های UI را برمی‌گرداند و جای دیتابیس یا snapshot نیست. از `--rollback` انتظار downgrade کامل نداشته باشید. آزمون نصب/ارتقای این rc روی VPS واقعی در محیط توسعه اجرا نشده است.

## راهنماهای نسخه‌های قبل

# ارتقای ۰٫۷٫۱

پیش از اجرا snapshot/backup نوا و backup افزونه را بگیرید. تمام محتویات بسته را در ریشهٔ مخزن alirezaserver قرار دهید؛ setup.sh و install.sh باید همزمان به‌روز شوند چون launcher هش installer را بررسی می‌کند. اجرای محلی ZIP: `sudo bash install.sh --repair` سپس `sudo bash install.sh --check`.

در این نسخه دادهٔ نوا یا OpenVPN migrate نمی‌شود؛ ساخت دستی تازه در storage اصلی اینباندهای نوا انجام می‌شود. certificate path واردشده باید روی نود واقعی وجود داشته باشد. برای برگشت کد قبلی، روش restore نسخهٔ قبلی/سnapshot را استفاده کنید؛ --rollback به معنی downgrade کد نیست و افزونه‌ها را غیرفعال می‌کند. نصب/ارتقا روی VPS واقعی هنوز تست نشده است.

## دستورهای قبلی

# تغییرات ارتقای ۰٫۷٫۰

از snapshot/backup نوا و backup افزونه استفاده کنید، سپس `sudo bash install.sh --repair` و `sudo bash install.sh --check` را اجرا کنید. ورودی مستقل OpenVPN به منو برنمی‌گردد؛ از اینباندها → OpenVPN استفاده کنید. دادهٔ سرورها، حساب‌ها و certificateها همان است و URLهای subscription تغییر نکرده‌اند. UI سادهٔ نوا اکنون از ساخت دستی به تنظیمات AmneziaWG هم دسترسی دارد؛ خود سرویس بدون اقدام شما فعال نمی‌شود.

برای برگشت کامل رابط ۰٫۶٫۱، snapshot یا backup آن کد را با روش بازگردانی پایین بازیابی کنید. `--rollback` یک فرمان downgrade به نسخهٔ قبلی نیست؛ افزونه‌ها را غیرفعال می‌کند. این ارتقا روی VPS واقعی اجرا نشده است.

# ارتقا، پشتیبان و بازگشت

این نسخه مربوط به alirezaserver است. روی VPS واقعی در این محیط نصب یا ارتقا نشده است. ابتدا روی snapshot/کلون آزمایشی نصب موجود تمرین کنید؛ backup را بیرون همان VPS نیز نگه دارید.

## چه چیزی حفظ می‌شود؟

- نوا از نصب موجودِ دارای Xray قابل اجرا و واحد سرویس موجود استفاده می‌کند؛ بازسازی npm انجام نمی‌شود. اگر نصب پایه ناقص باشد، نسخهٔ پین‌شدهٔ نصب‌کنندهٔ نوا برای ادامه اجرا می‌شود؛ این مسیر روی VPS واقعی آزمایش نشده است.
- فایل‌های اصلی نوا، کاربران، ادمین‌ها، نودها و اینباندها توسط افزونه بازنویسی نمی‌شوند. مسیر enrollment و پارامترهای فنی NOVA_* تغییر نام نمی‌دهند.
- `addon.db`، فایل‌های OpenVPN و CA/کلیدهای موجود نگه داشته می‌شوند. برای حساب قدیمی بدون نسخهٔ رمزگذاری‌شدهٔ رمز، UI درخواست تعیین رمز جدید می‌کند و رمز را حدس نمی‌زند.
- `AdGuardHome.yaml` موجود و داده‌های آن از نو ایجاد نمی‌شوند. این نسخه مهاجرت خودکار پیش‌فرض‌های DNS قدیمی را اجرا نمی‌کند. تست سلامت rewrite موقت هم ایجاد نمی‌کند.
- فایل مقصدها و `subscription.key` حفظ می‌شوند. AI دیتابیس مستقل `ai.db` دارد و دادهٔ کاربران نوا را مهاجرت نمی‌دهد.
- منابع جدید در `/opt/alirezaserver` هستند؛ systemd drop-in برای بارگذاری preload در process موجود نوا استفاده می‌شود. سرور/مدل AI جداگانه نصب نمی‌شود.

## پیش از ارتقا

۱. backup خود نوا و snapshot VPS بگیرید. نصب‌کنندهٔ نسخهٔ قبلی را نیز نگه دارید.
۲. backup افزونه را بگیرید:

```bash
sudo bash install.sh --backup
```

این آرشیو در `/var/backups/alirezaserver` ساخته می‌شود و شامل کد افزونه، داده/گواهی/کلید آن، SQLite snapshot سازگار `addon.db` و در نسخهٔ ۰٫۶، `ai.db` و واحدهای وابسته است. **پشتیبان کل نوا/VPS یا مقصد DNS نیست**. SQLite هنگام snapshot آنلاین است؛ برای snapshot سازگار داده‌های غیر-SQLite AdGuard از snapshot سیستم یا پنجرهٔ توقف کنترل‌شدهٔ AdGuard استفاده کنید. backup حاوی رمز/کلید و URLهای دسترسی است؛ عمومی نکنید.

۳. ثبت کنید: پورت/دامنه/path اصلی، وضعیت نودها، سرویس‌های فعال OpenVPN، وضعیت AdGuard، چند اتصال واقعی و لینک اشتراک آزمایشی. دیسک برای پشتیبان و کد جدید کافی باشد.

## اجرای ارتقا

پس از آپلود نسخهٔ جدید روی همان مخزن، راه‌انداز جدید را دریافت کنید؛ یا ZIP را استخراج و در ریشهٔ آن اجرا کنید:

```bash
sudo bash install.sh --repair
sudo bash install.sh --check
```

ترمیم ابتدا backup افزونهٔ موجود را اجرا می‌کند. مراحل نصب و خطا ثبت می‌شوند. AdGuard سالم با unit بدون تغییر فقط start idempotent می‌گیرد. OpenVPN فقط اگر config/unit/قواعد وابسته تغییر کرده باشند یا سرویس فعال نباشد restart می‌شود. برای اعمال افزونهٔ جدید، process نوا یک بار restart می‌شود؛ `--repair` بی‌تغییر نباید بی‌دلیل آن را restart کند.

پس از موفقیت، نشست‌ها و پنل، نودها/اینباندهای اصلی، DNS، OpenVPN، دانلود کانفیگ و لینک‌های قبلی را با کلاینت واقعی بررسی کنید. AI را بدون کلید هم امتحان کنید؛ خطای نبود کلید باید فقط داخل AI باشد. پیش از برگشت، لاگ و `failed-stage` را نگه دارید؛ همین نسخه را می‌توانید برای ادامه اجرا کنید.

## دو نوع بازگشت متفاوت

### غیرفعال‌کردن افزونه‌ها و برگشت به اجرای اصلی نوا

```bash
sudo bash install.sh --rollback
```

این فرمان مکانیزم قبلی پروژه است؛ افزونه‌ها و سرویس‌های وابستهٔ محلی را غیرفعال می‌کند. **به معنی restore کامل نسخهٔ قبلی نیست** و ممکن است AdGuard/OpenVPN محلی قطع شوند. فایل‌ها و داده‌ها نگه داشته می‌شوند و مقصد DNS از راه دور حذف نمی‌شود. برای صرفاً برگشت از ۰٫۶ به ۰٫۵، بازیابی نسخهٔ قبلی بهتر است.

### بازیابی نسخهٔ قبلی افزونه

اول snapshot کل VPS یا restore آزمایش‌شدهٔ خودتان را ترجیح دهید. برای آرشیو `--backup`، قبل از استخراج باید نوا، AdGuard و نمونه‌های فعال OpenVPN متوقف باشند؛ از unitهای فعال قبل از توقف فهرست بگیرید. از وضعیت فعلی نیز پشتیبان/کپی قابل بررسی بگیرید. نصب یا آپدیت هم‌زمان اجرا نشود.

با آرشیو **محرمانه و مورد اعتماد خودتان** و در پنجرهٔ نگهداری:

```bash
sudo systemctl stop nova-agent.service AdGuardHome.service
sudo systemctl stop 'alireza-openvpn@*.service'
# آرشیو وضعیت فعلی را جدا نگه دارید؛ فایل BACKUP.tar.gz باید متعلق به نصب خودتان باشد.
sudo tar -tzf BACKUP.tar.gz
sudo tar -xzf BACKUP.tar.gz -C /
sudo rm -f /var/lib/alirezaserver/addon.db-wal /var/lib/alirezaserver/addon.db-shm
# فقط اگر آرشیو ai.db هم دارد، WAL/SHM آن را پس از توقف کامل process حذف کنید.
sudo systemctl daemon-reload
sudo systemctl start AdGuardHome.service alireza-firewall.service nova-agent.service
```

نمونه‌های OpenVPN که **پیش از توقف فعال بوده‌اند** را با شناسهٔ ثبت‌شده دوباره start کنید و اتصال/DNS را بررسی کنید. دستورهای این بخش در محیط فعلی روی VPS آزمایش نشده‌اند. اگر backup قدیمی `ai.db` ندارد، دادهٔ AI فعلی را بی‌دلیل حذف نکنید؛ نسخهٔ ۰٫۵ فقط رابط آن را ندارد. پشتیبان بازسازی‌شده را با `--check` و کلاینت واقعی کنترل کنید. فایل‌های اضافهٔ جدید را بدون بررسی داده حذف نکنید.

## آپدیت خود نوا

updater قبلی در سرویس مستقل و تراکنش journal دار اجرا می‌شود. checksum و نسخه از commit رسمی، استخراج امن، کنترل runtime/UI/auth/theme، snapshot مسیرهای ثابت و سلامت پس از startup بررسی می‌شوند؛ نسخهٔ نامناسب رد می‌شود. کنترل جدید، نشست واقعی مالک را در KV حافظه‌ای/HTTP loopback نسخهٔ candidate نیز می‌آزماید. کد افزونه و دادهٔ OpenVPN/AI/مقصدها توسط تعویض فایل‌های نوا پاک نمی‌شوند.

```bash
sudo bash install.sh --update-status
sudo bash install.sh --update
```

اگر نسخه رد شد، اصرار به جایگزینی دستی نکنید؛ علت قرارداد یا runtime را بررسی کنید. کنترل قرارداد نمی‌تواند همهٔ تغییرات آینده را کشف کند. مسیر دیتابیس سفارشی خارج از snapshot یا چیدمان symlink سفارشی طبق guard قبلی نیاز به adapter جدا دارد.

## مقصد DNS

backup محلی اصلی، دیتابیس مقصد HyperDNS را از راه دور کپی نمی‌کند. روی مقصد از `/opt/hyperdns` و `/opt/alirezadns-agent` snapshot سازگار بگیرید. updater مقصد، دو backup اخیر و recovery journal خود را نگه می‌دارد. resume نصب موجود تنظیمات را پاک نمی‌کند؛ secret SSH برای اجرای خودکار پس از restart ذخیره نشده و باید دوباره توسط کاربر وارد شود.

## rc.4 installation-verifier repair

Use every file from the same ZIP in the repository root. On an existing VPS, take an independent snapshot and run `sudo bash install.sh --backup`, then `sudo bash install.sh --repair` and `sudo bash install.sh --check`. --rollback disables integration; it is not a full database downgrade. Retain the old source ZIP and matching data snapshot. For any failure, run `sudo bash install.sh --diagnose`; detailed private logs remain under /var/log/alirezaserver. Redact passwords/tokens and secret panel URLs before sharing full logs. A deleted VPS has no recoverable local data in this package. Live upgrade is not certified in this environment.

## rc.5: existing permission-denied installation

Keep the VPS. Upload/extract this complete ZIP and run install.sh --repair from its actual directory, then install.sh --check. The existing Nova base is reused; permission policy is applied before the new agent starts and reapplied before testing Xray health. Only a stopped/failed Xray is restarted by this repair stage. Existing config contents, certificates, accounts and data are retained. Metadata xray-access-before.json stores prior uid/gid/mode; it contains no config secrets. A custom ExecStart path, symlink or unexpected owner requires review instead of unsafe chmod. An independent full snapshot/backup is still recommended before repair; --rollback is not a complete data downgrade.
