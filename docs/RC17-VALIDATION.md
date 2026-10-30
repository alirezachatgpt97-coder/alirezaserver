# rc.17 — validation and operational limits

## Scope and source

Input is the modular rc.16 source from `alirezachatgpt97-coder/alirezaserver`, SHA-256 `c2b08510aac1a1c5b714d31652e73108da8d58cab124821db916a293a36c1a9d`. The official Nova release inspected for this work is **1.94.3**, commit `3b19813ee96591d491eb1dd3030cff0f26e77b98`. The downloaded agent archive matches the official release asset digest `8668c40e0721f7ff861c06b32bf0e1a5605c2b4d93f8ca2821be5bf5a5310722`.

No production server was accessed or changed. No GitHub publication or Telegram message was sent. `RC17-BASELINE.json` identifies the exact intended changes and the hashes of 1,251 unchanged runtime files. In particular, the existing TLS coordinator, certificate handling, Xray permission repair, endpoint identity, firewall, native manual editor, host rendering core, AdGuard integration, guarded updater transaction implementation and rc.16 bulk assignment implementation are preserved. The Nova base itself is updated as requested; this is not a claim that its new upstream code is byte-identical to its old release.

## Implemented paths

| Area | Actual implementation |
|---|---|
| Nova base | Fixed official commit/archive digest; installer invokes the guarded latest-release check for both fresh installs and addon upgrades |
| Compatibility guard | Existing isolated identity/user/quota/link/config/receipt tests retained; Smart DNS commerce contract additionally tested when the candidate contains that module |
| Bot location | Owner selects local or another public IPv4 host; SSH password/key, pinned fingerprint, root/passwordless sudo; generated restricted forwarding key for ongoing transport |
| Remote runtime | Existing Mirza installer, dedicated PHP pool, MariaDB, poller and maintenance on destination; loopback Python FastCGI gateway and bidirectional SSH forwarding; same main-panel HTTPS URL |
| Remote control | Status, start/stop/restart, password reset, web repair and tunnel repair follow the stored destination; terminal password operations follow it too |
| Telegram verification | Remote installations verify `getMe` from the destination; initial SSH host-key approval is required before destination commands |
| Products | Additive nullable `product.az_service`; standard/legacy mode remains the default for old plans |
| Nova products | Explicit active inbound selection and per-user AmneziaWG, MTProto, mieru, SOAR, Telegram Web, Smart DNS/VIP grants; availability and native reseller permissions checked |
| OpenVPN products | Existing addon SQLite accounts, real password hashing/encrypted share credentials, quota, expiry, status, share rotation and profile portal; 1–64 devices follows the existing addon capability |
| alirezadns products | Enrolled destination + encrypted API key; HyperDNS v2 create/read/patch/delete/reset/rotate, v1 actual byte-usage read, private service portal delivery |
| Retry safety | Persistent external-account intent; DNS searches its unique order name before retry; uncertain creation is never blindly posted twice |
| Renewal | Service/destination compatibility checked before payment in the primary Telegram path and before mutation in the shared extend path; normal updates no longer overwrite managed users' inbound lists with the panel default |
| Customer messages | Product badges, concise connection help and a portal label instead of exposing a long token-bearing URL as a configuration button title |
| Backup | Remote database/files are streamed through the private tunnel into a nested archive; failure prevents calling the combined backup complete |

## Completed checks

| Check | Result and evidence |
|---|---|
| Full Node test matrix | **151 tests: 150 passed, 1 skipped, 0 failed**; `final-node.log` |
| Final affected-service regression after small follow-up changes | **16 passed, 0 failed**; real Nova API, OpenVPN SQLite, DNS contract fixtures, PHP/MariaDB CRUD/login, DOM controls and Python gateway → PHP; `final-service-regression.log` |
| Python regression/preservation/install/update tests | **21 scripts, 79 tests passed**; includes five SSH tests after the default-port known-host correction; `final-python.log` |
| Official Nova 1.94.3 preflight | Syntax, panel hooks, owner identity, user create/update/delete, quota isolation, subscription/runtime config, host profiles and new Smart DNS sale contract passed; `compat-check-final.log` |
| Actual Xray traffic | VLESS/TCP, VLESS/WS, VMess/WS and Trojan/TCP transferred a real HTTP payload through local Xray; wrong certificate identity rejected |
| Mirza database | Actual temporary MariaDB/PHP; repeat migration, preservation of old values, service-plan create/edit/delete, rejecting incompatible location changes and OpenVPN device limits |
| Remote web | Real Python HTTP gateway to real PHP-FPM, request body/CGI/HTTPS prefix, cookie boundary, static assets, auth rejection and private-path traversal rejection |
| SSH | Actual local Paramiko server handshake/password auth; fingerprint mismatch refused before auth; default/custom-port known-host entries parsed by OpenSSH `ssh-keygen` |
| UI logic | Persian/English DOM checks at fixture mobile/desktop widths; destination choice, real job-state rendering, one-time credentials, product selection/serialization and existing bulk UI |
| Installer | `bash -n`, embedded module self-test, source/embedded equality, bounded Xray download/fallback checks, rollback/update failure-path tests |
| Package | ZIP integrity and every listed SHA-256 verified; browser-upload file count and per-file size checked by packager |

The one skipped Node test requires a real non-root UID/GID mapping that this runtime does not provide. The Xray account-permission tests that do not require that mapping passed.

The full matrix ran before the last narrow online-status/SSH follow-ups; the affected 16-test regression, final SSH/bootstrap tests, embedded self-test and Python suite were run after those changes. Logs distinguish tests using explicit fixtures from actual native API/PHP/SQLite/handshake checks. A contract fixture is not described as a real HyperDNS installation.

## Resource observation

`RC17-resources.json` contains a real measurement of the loopback **HTTP/controller only**, Node 24.22.1, `--max-old-space-size=192 --expose-gc`, in a shared restricted development environment:

| Observation | Result |
|---|---:|
| V8 heap after initial load/GC | 36.37 MiB |
| Peak RSS at the idle observation | 130.88 MiB |
| Process CPU during ~1.20 s idle window | 8.68 ms |
| 50 sequential panel requests, elapsed | 457.55 ms |
| Process CPU during that request burst | 788.25 ms |
| Heap after the burst/GC | 35.16 MiB |
| Peak RSS during run | 210.99 MiB |

Current RSS cannot be read in this environment; peak RSS comes from `getrusage`, not a guessed current value. This excludes PHP, MariaDB, the remote gateway/SSH process, AdGuard, active install jobs, protocol daemons, VPN clients and real user load. It is **not** a whole-stack 1 GB benchmark or long-running stability certification. Remote mode avoids installing primary-bot PHP/MariaDB locally when no local bot is installed; it moves their resource consumption to the destination, rather than making it disappear. Existing tenant bots may still run on the main host.

## Not verified here / limits

- No two-VPS end-to-end install, real systemd forwarding unit activation, production SSH daemon policy, remote backup/restore round trip or destination package installation. The installation code is implemented, but these operations need VPS validation.
- The sandbox disallows Unix-domain listening sockets; the actual PHP gateway integration test used a loopback TCP FastCGI override. Production defaults to the dedicated Unix socket.
- No real Telegram token, payment gateway transaction, CA issuance/renewal, Cloudflare change, ISP reachability or direct-connect censorship measurement.
- HyperDNS is checked against its official versioned API specification and bounded contract fixtures, not against a live external DNS server in this turn. Its Public API gate must explicitly allow the primary server, or the existing private network path must make it reachable. The addon does not silently weaken that gate.
- Actual data-plane handshakes for AmneziaWG, MTProto, mieru, SOAR, Telegram Web, OpenVPN and Smart DNS were not performed. The user-grant and commerce control paths were exercised; this is not a protocol load certification.
- No visual browser screenshots in this turn. DOM interaction checks do not establish real font metrics, clipping or rendered mobile layout. Review the new cards/forms in a real browser before production rollout.
- Existing local bot relocation is deliberately rejected, preserving its database and preventing double polling. A new remote deployment or repair of the same destination is supported; migration of an already running bot needs a separate controlled database transfer.
- One primary bot location is managed at a time. Reseller Mirza instances remain local, isolated and limited to their native service permissions; owner-only OpenVPN/alirezadns provisioning is not delegated to them.
- HyperDNS v2 supports additive whole-day extensions; incompatible shortening/unlimited conversions are rejected explicitly. No fabricated online status is shown when its API has no such field.
- A future Nova version is accepted only after the guard passes. Compatibility with every future release, universal network access and zero bugs are not promised.

## Publication and upgrade

Use the outer web-upload ZIP as described in the short root README. Keep `source-code.zip` compressed when uploading through GitHub's browser UI. Back up first, then run the new installer. Nothing in this delivery was published to GitHub or run on a production VPS.
