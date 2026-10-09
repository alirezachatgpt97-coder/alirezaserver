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

Nova, AdGuard and HyperDNS binaries are downloaded, not included in this ZIP. No upstream Nova file is patched or relicensed. Prepared binaries avoid building Nova on a small VPS. Nova/HyperDNS automatic updates may select a newer compatible release under their existing checksum, contract and rollback checks; pinned initial versions above are not a promise that every future release works.

## Official Gemini API references checked 2026-10-09

- https://ai.google.dev/api — `x-goog-api-key` header and streaming API.
- https://ai.google.dev/api/models — paginated `models.list`, `supportedGenerationMethods`, `outputTokenLimit`.
- https://ai.google.dev/api/generate-content — `streamGenerateContent?alt=sse`, `contents`, `systemInstruction`, `generationConfig`.

Runtime endpoint is fixed to `https://generativelanguage.googleapis.com/v1beta/`; the user cannot replace it with a credential-stealing endpoint. Models are discovered at runtime and filtered to text-generation-compatible API resources; no guessed default model is embedded. Key stays in the server-side encrypted vault and HTTPS header, not a query parameter. No SDK, local model, tool execution or provider telemetry collector is added.

## Development-only tools

Node.js 24.19.0, Python 3, jsdom **26.1.0** (DOM interaction tests), optional Playwright Chromium (browser tests). These are not installed by the VPS runtime installer. Browser execution failed in the current environment; no screenshots are claimed. Development dependencies and downloaded binaries are not bundled in the release ZIP.

Custom integration code retains the previous GPL-3.0-or-later notice. Nova has its independent upstream terms. AdGuard remains GPL-3.0; HyperDNS remains AGPL-3.0. Existing attribution and OpenVPN adaptation notices are retained in `addon/NOTICE.txt`, `addon/COPYING.vpn-ui` and `addon/COPYING.HyperDNS`.
