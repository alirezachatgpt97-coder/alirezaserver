# منابع و وابستگی‌ها

Baseline: `alirezachatgpt97-coder/alirezaserver`, commit `5c6af8114764bee28a5ed3c9aecb83186fbcc434` (0.5.0), branch main. Retrieved 2026-10-09. The unrelated alirezapanel repository is not a source for this release.

| Dependency | Version / source | Verification |
|---|---|---|
| Nova Server | 1.85.4, `IRNova/Nova-Server`, commit `17e9373ec17ceede95369fcd26d6fabfda83b504` | Prepared agent archive SHA-256 `544adcbfd54d09df4ba637a5abeb0803258076308a2abe025e41ea550fa039dc` |
| Nova installer | Same immutable commit, `nova-node.sh` | SHA-256 `26df405f09a5eed8b430545688c0e2dc0df4cc50f617a91c820dd1821a7ca79d` |
| AdGuard Home | v0.107.79, official AdguardTeam release | amd64 archive `c48f4a43000665484c5ec28177de11a004759b620dae8f77b2aabefc9ef3687f`; arm64 `3f7893c18e8aaadc456d0452839190561c306ca95175a2254958be80a769c1ae` |
| HyperDNS, destination only | v2.2.0-beta.1, official IzumiRain release | amd64 `17d9015200115878a375f74c56cff2c6b9e22e682a7ceab61104f55d54c7f6bf`; arm64 `ca19bfb5b144838ef3d28b5d29074534084ee54713594d297a076e23cc551e98` |
| Node.js | 24+ required by Nova | Original Nova installation/runtime path; no extra runtime npm packages |
| OpenVPN, OpenSSL, Python 3, python3-paramiko, curl, ca-certificates, iptables, iproute2, dnsutils, logrotate | Ubuntu/Debian distribution packages | Exact installed versions recorded in `/var/lib/alirezaserver/package-versions.txt`; OS repositories are not frozen by this package |
| Font | Original embedded Vazirmatn from installed Nova | Extracted and served by existing font module; no network font/CDN added |

Nova, AdGuard and HyperDNS binaries are downloaded, not included in this ZIP. The initial downloaded, hash-verified Nova installer receives the narrowly scoped, contract-checked Xray safety patch in tools/nova-xray-patch.py before execution; installed Nova agent/UI/protocol sources remain untouched and no upstream component is relicensed. Prepared binaries avoid building Nova on a small VPS. Nova/HyperDNS automatic updates may select a newer compatible release under their existing checksum, contract and rollback checks; pinned initial versions above are not a promise that every future release works.

## Official Gemini API references checked 2026-10-09

- https://ai.google.dev/api — `x-goog-api-key` header and streaming API.
- https://ai.google.dev/api/models — paginated `models.list`, `supportedGenerationMethods`, `outputTokenLimit`.
- https://ai.google.dev/api/generate-content — `streamGenerateContent?alt=sse`, `contents`, `systemInstruction`, `generationConfig`.

Runtime endpoint is fixed to `https://generativelanguage.googleapis.com/v1beta/`; the user cannot replace it with a credential-stealing endpoint. Models are discovered at runtime and filtered to text-generation-compatible API resources; no guessed default model is embedded. Key stays in the server-side encrypted vault and HTTPS header, not a query parameter. No SDK, local model, tool execution or provider telemetry collector is added.

## Development-only tools

Node.js 24.19.0, Python 3, jsdom **26.1.0** (DOM interaction tests), optional Playwright Chromium (browser tests). These are not installed by the VPS runtime installer. Browser execution failed in the current environment; no screenshots are claimed. Development runtimes are not bundled. Prebuilt carrier binaries are embedded; their complete preferred source and pinned WebSocket dependency are included.

Custom integration code retains the previous GPL-3.0-or-later notice. Nova has its independent upstream terms. AdGuard remains GPL-3.0; HyperDNS remains AGPL-3.0. Existing attribution and OpenVPN adaptation notices are retained in `addon/NOTICE.txt`, `addon/COPYING.vpn-ui` and `addon/COPYING.HyperDNS`.

## Xray installation hotfix 0.6.1

Official XTLS installer checked: https://raw.githubusercontent.com/XTLS/Xray-install/main/install-release.sh . It defines its own curl wrapper; retry-max-time is not a connection/transfer timeout. We bound the complete child process group to 240 seconds (+10-second kill grace) instead of trying to override that wrapper. Existing pinned Nova fallback version 26.3.27 and both original architecture checksums remain unchanged. The fallback transfer has HTTPS-only redirects, connection/total/low-speed deadlines. Existing working Xray binaries are not downgraded.

## Inbounds 0.7.0

Current alirezaserver/main installer read via GitHub on 2026-10-14, blob e7fc43b571ee33b23ae198a3032ec225c0f00624 (0.6.1), identical to previous local release except final newline. Native Inbounds integration targets the pinned Nova source above. Runtime HTML gains an external form bridge; original inline style/script blocks and installed agent sources remain unchanged. New source in addon/inbounds-ui.js, compatibility contracts in addon/compat-check.mjs. Unsupported protocol engines are explicitly listed in docs/INBOUNDS.md.

## Graphical manual form 0.7.1

addon/manual-core.js builds Xray raw configuration plus matching native metadata. addon/manual-editor.js supplies native-class form controls; original Nova account injection remains authoritative. Native SOCKS/HTTP editor is retained because raw accounts do not use the clients replacement contract. X25519 uses Node crypto DER key encoding with 32-byte raw base64url keys. Model/UI and owner/same-origin key-generation tests cover this route, not live VPN protocol traffic.

## Review checkpoint 2026-10-17

alirezaserver base: e7d2fcac68a3dd69f1679de4414123b8bfc2f203. NOVA-X-PANEL reference: e0931b3c5834dab9d5406489033ac89bb95056c6 (GPL-3.0 root); embedded Mirza bot declares AGPL-3.0 independently. This candidate includes the AGPL bot source archive, original Hashem script and managed carrier source/binaries. New native forms/hosts code is independently written under the existing project GPL notice; sources/workflow reviewed are listed in docs/NOVA-X-REVIEW.md. Official Gemini generate-content and models API pages were rechecked on 2026-10-17; model discovery remains runtime-based.

## 0.8.0-rc.1 third-party payloads

- NOVA X PANEL e0931b3c5834dab9d5406489033ac89bb95056c6: root GPL-3.0; embedded Mirza archive independently AGPL-3.0-or-later. Payload modifications and archive hashes: addon/reference-versions.json. The PHP source, vendor notices and original web assets as supplied upstream are retained. The supplied miniapp is upstream's compiled asset; its separate frontend development sources were not present in either referenced archive or NOVA-BOT clone. No claim of a reproducible miniapp rebuild is made.
- Hashem c1ea91194979aa31b65d93256601cc14dff8eba1: AGPL-3.0; addon/hashem-source.sh and core/hashem. The custom adapter namespaces paths/services, confines interface/firewall changes and replaces mutable downloads with verified artifacts. Original author notices retained.
- Gorilla WebSocket v1.5.3, commit ce903f6d1d961af3a8602f2842c8b1c3fca58c4d: BSD; source vendored under core/hashem/deps/websocket.
- FRP 0.71.0, Backhaul 0.7.2: official release archives, amd64/arm64 URLs, archive and binary SHA256 in addon/tunnel-downloads.json. Downloaded only when owner installs Hashem. Their independent licenses apply; binaries are not relicensed.
- Go carrier builds: Go1.27.2, CGO disabled; per-architecture raw/compressed SHA and target in addon/hashem-core-build.json. Build toolchain archive reviewed from official go.dev: SHA256 ecbadb99091a3f46e31f5f934b068b1864eafa7995211b39eaddf76996045fe5.
- Xray config validation: official v26.3.27 linux64 archive SHA256 23cd9af937744d97776ee35ecad4972cf4b2109d1e0fe6be9930467608f7c8ae, checked against official .dgst. Development only, not embedded.
- Actual PHP8.2.32 and MariaDB10.11.18 tests used official Debian packages. OS apt resolves runtime packages; exact installed versions are reported by the package manager and must be considered when reproducing deployment.

## Recovered rc.3 provenance

Base is the exact user-attached alirezaserver-0.8.0-rc.2-review(1).zip, SHA256 `41f2b9086d257fa3eb752dec33387dac3eeb5b1a6e96fbe474804f3efbd7d144`. No earlier preview sources were merged over this base. Reference NOVA-X-PANEL commit remains e0931b3c5834dab9d5406489033ac89bb95056c6; Nova remains 1.85.4 commit 17e9373ec17ceede95369fcd26d6fabfda83b504. New workspace/manual/inline/hosts code is under the existing GPL-3.0-or-later notice. Bot display-brand changes and payload digest are in addon/reference-versions.json. Original independent bot CSS/fonts remain byte-identical to the supplied rc.2 payload.

The upstream compiled customer miniapp lacks its separate preferred frontend source in the reviewed reference. PHP/admin web source and supplied dependencies are included, but a reproducible miniapp rebuild is not claimed. Resolve the Corresponding Source issue before public redistribution.

## rc.4 installation hotfix provenance

Current GitHub HEAD 90b0f3554a09829e9ae38c9601ada8623ebab247 was cloned for this work. Its 77 embedded rc.3 addon files are authoritative; divergent standalone files were synchronized to those exact bytes. Source hashes and allowed changes are in docs/RC4-BASELINE.json. The carrier preferred source was restored from its existing source archive. No preview or alirezapanel source was merged. Existing independently licensed bot payload is byte-unchanged by this hotfix.

## rc.5 native writer adaptation

The pinned manager src/xray/manager.mjs SHA256 deb37645d23c5a83b32582b5249a19b1d5aeb8fca5a964ff073e431540891720 is now included in the compatibility guard. Its exported writer defaults to mode 0600. The narrow in-memory decorator routes only the exact policy config path to an atomic 0640 writer for the existing non-root service group. Unrelated writes keep the original implementation. New integration code retains GPL-3.0-or-later.

## rc.6 — current deliverable

Continues the recovered authoritative rc.3 payload, pinned Nova and rc.4/rc.5 fixes above. Per-admin bot appearance and mounted keyboard-route changes are now explicit modifications; historical statements that bot CSS was unchanged apply only to those earlier releases. The full supplied PHP/admin app is readable in core/alirezabot. The two new appearance PHP modules and JS/CSS are maintained there. tools/package-bot.py reproducibly packages this tree; addon/reference-versions.json records rc.6 modified files and the new archive digest. Rebuilding the tar is distinct from rebuilding the upstream compiled React miniapp/keyboard assets; their separate preferred frontend development sources remain unavailable in the supplied reference. Resolve that Corresponding Source limitation before public redistribution. No licensing issue is silently claimed resolved. Existing copyright notices, vendor sources and licenses remain.

The animated README banner is independently generated with tools/build-readme-art.py (Pillow development dependency only). No extra runtime package or external image service is required. New terminal management uses Python's standard library and existing native Node/PHP reset paths. The latest actual local checks are documented in docs/RC6-VALIDATION.md.

## rc.7 — user-supplied rc.6 basis and TLS

Input alirezaserver-0.8.0-rc.6(1).zip SHA256 79391cf0d9087b2ec09e3d2b9aed955d52f294d2c229942f06dd088aa4d478bc. This update does not merge the older preview tree. Core bot, UI assets and protocol sources are preserved. New GPL adapters are in addon/tls-core.mjs, tls-control.mjs, tls-runtime.py and tls-renew.mjs. Exact host hashes include cert.mjs and server.mjs; decorators change only certificate behavior, without rewriting native files on disk. The verified initial installer additionally defers domain issuance and saves the requested identity. Sources and current official references are listed in docs/TLS.md. Certbot 5.8.0 is downloaded from PyPI in an isolated venv, wheels only, with an installation report and package-version inventory; transitive dependencies are resolved under upstream constraints, not fully frozen. No Certbot binaries or Python build toolchain are bundled. Existing compiled-frontend preferred-source limitations above still apply.

## rc.8 — current work baseline

Based strictly on the previously delivered rc.7 source, preserving its pinned Nova contracts and readable bot payload. Changes are limited to first-prompt certificate orchestration, local origin/subscription addressing, managed bot defaults/driver/mounted subscription routes, read-only support diagnostics, tests and documentation. No new public repository revision or server was used as an unreviewed replacement. No Xray binary/CA/Cloudflare credential was available for live client/issuance tests in this environment.


## rc.9 reference review (2026-10-19)

MHSanaei/3x-ui (GPL-3.0), `frontend/src/lib/xray/inbound-link.ts`, blob `05681202fba5a2fd23ccad6c8b11d84a4ac36fdf`, was reviewed as a reference for independent dial-address / Host / TLS server-name handling. No 3x-ui implementation or UI was copied into this release. The repair is an original narrow adapter over the existing pinned Nova export paths.

Primary compatibility references: https://developers.cloudflare.com/fundamentals/reference/network-ports/ and https://developers.cloudflare.com/network/websockets/ . Real Cloudflare transit is not part of the local tests.


## rc.10 product-schema repair

The only new preferred bot source is `core/alirezabot/db/migrations/013_alirezaserver_product_schema.php` (AGPL-3.0-or-later). Its identical copy `addon/bot-product-schema.php`, root-side `addon/bot_schema.py`, and `addon/bot-schema-tool.php` provide private streamed product-table backup and safe existing-install migration. Existing protocol/TLS/UI sources are unmodified. `tools/package-bot.py` rebuilds the readable source into the verified bot payload; `tools/build.py` embeds exact addon sources into install.sh and updates the bootstrap checksum. See RC10-BASELINE/VALIDATION for provenance and scope.
