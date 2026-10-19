# rc.7 — current controller sample

[Current validation](RC7-VALIDATION.md) and [raw sample](resources-rc7.json): idle heap 30.10MiB, idle peak RSS 109.81MiB, whole 50-request sample peak 173.30MiB. This excludes all protocol daemons, certificate issuance/renewal, PHP/DB and user traffic. It is not 1GiB certification.

# rc.6 — current measurement

See [RC6-VALIDATION](RC6-VALIDATION.md) and [raw sample](resources-rc6.json). Controller-only idle peak RSS 101.79MiB; whole 50-request sample peak 176.19MiB. Other services and total 1GiB capacity are unmeasured. Runtime repair now also runs briefly before Xray starts; it adds no resident process. Historical samples below are not current certification.

# rc.5 controller-only measurement

Actual measured peak RSS: idle 101.96MiB, entire 50 sequential HTTP request sample 176.62MiB. Heap after GC 28.75MiB. Node v24.19.0 with 192MiB heap cap. Raw sample: resources-rc5.json. Current RSS unavailable without /proc; peak is getrusage. No PHP/DB/protocol daemons or VPN users are included, so this is not a 1GiB VPS capacity certification. Permission repair runs only on installation/repair; the small writer adapter runs in the existing agent on configuration writes. No extra background process is installed.

## Prior rc.4 sample

# rc.4 actual controller measurement

Node v24.19.0, --max-old-space-size=192, real pinned Nova HTTP plus addons. Idle peak RSS 102.25MiB, idle heap 29.87MiB. For 50 sequential HTTP requests: 302.85ms wall, 550.20ms CPU, total peak RSS 176.91MiB, heap after GC 28.74MiB. Idle sample: 3.97ms CPU over 1200.96ms. Current RSS is unavailable because /proc/self is not exposed; peak uses getrusage. Raw values: resources-rc4.json.

This is not total VPS consumption. No agent jobs, AdGuard daemon, PHP/MariaDB, protocol daemons or VPN clients are included. No 1GiB capacity claim is made. This hotfix adds no resident daemon or frontend build dependency. The verifier and diagnostics only run on explicit checks/install/update; existing UI effects and protocol features are retained.
