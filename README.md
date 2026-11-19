::: {align="center"}
```{=html}
<!-- Animated header: rendered by GitHub's Markdown engine. -->
```
`<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:050816,35:101B3D,70:5B21B6,100:06B6D4&text=ALIREZASERVER&fontColor=FFFFFF&fontSize=54&fontAlignY=38&desc=Server%20Control%20%7C%20Nova%20Integration%20%7C%20DNS%20%7C%20OpenVPN&descAlignY=60&animation=twinkling" alt="Animated Alirezaserver header"/>`{=html}

`<a href="https://github.com/alirezachatgpt97-coder/alirezaserver">`{=html}`<img src="https://img.shields.io/badge/GitHub-alirezaserver-181717?style=for-the-badge&logo=github" alt="GitHub"/>`{=html}`</a>`{=html}
`<img src="https://img.shields.io/badge/Release-0.8.0--rc.17-7C3AED?style=for-the-badge&logo=semanticrelease" alt="README release label"/>`{=html}
`<img src="https://img.shields.io/badge/License-GPL--3.0-16A34A?style=for-the-badge&logo=gnu" alt="License"/>`{=html}
`<img src="https://img.shields.io/badge/Platform-Ubuntu%20%7C%20Debian-E95420?style=for-the-badge&logo=linux" alt="Linux platform"/>`{=html}

### ⚡ A server-management stack built around Nova, with DNS, OpenVPN and automation integrations.

[Installation](#-quick-installation) · [Features](#-feature-map) ·
[Commands](#-command-reference) · [Ports](#-network-ports--firewall) ·
[Security](#-security-hardening) · [Troubleshooting](#-troubleshooting)

`<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=18&duration=2600&pause=700&color=22D3EE&center=true&vCenter=true&width=780&lines=One+entry+point.+Multiple+server+workflows.;Nova+integration+%7C+AdGuard+Home+%7C+OpenVPN;Backups%2C+diagnostics%2C+updates+and+recovery" alt="Animated project tagline"/>`{=html}
:::

------------------------------------------------------------------------

> \[!IMPORTANT\] **Read before installing.** This repository's public
> README identifies the package as `0.8.0-rc.17`, while the currently
> visible `main/install.sh` identifies its embedded add-on as `0.4.0`
> and pins a Nova base commit/version. Those are different version
> labels for different layers. Always inspect the exact files on the
> branch or release you intend to run. This document does not silently
> rewrite the install command or claim that every feature described in
> the package notes is implemented by the currently visible installer.

> \[!WARNING\] This is server software. It can install services, change
> firewall rules, configure DNS, and manage VPN interfaces. Use a clean
> supported VPS, keep an out-of-band console, back up data first, and
> understand every exposed port. Never run an installer from a URL you
> have not verified.

## 🧭 Table of contents

-   [Project at a glance](#-project-at-a-glance)
-   [Feature map](#-feature-map)
-   [Architecture](#-architecture)
-   [Compatibility and prerequisites](#-compatibility-and-prerequisites)
-   [Quick installation](#-quick-installation)
-   [Install options](#-installer-options)
-   [First-run checklist](#-first-run-checklist)
-   [Command reference](#-command-reference)
-   [Network ports and firewall](#-network-ports--firewall)
-   [DNS and AdGuard Home](#-dns-and-adguard-home)
-   [OpenVPN management](#-openvpn-management)
-   [Nova integration](#-nova-integration)
-   [Alirezabot and remote bot node](#-alirezabot-and-remote-bot-node)
-   [Product and service sales
    workflow](#-product-and-service-sales-workflow)
-   [Backups, restore and rollback](#-backups-restore-and-rollback)
-   [Updates and compatibility](#-updates-and-compatibility)
-   [Security hardening](#-security-hardening)
-   [Diagnostics and logs](#-diagnostics-and-logs)
-   [Troubleshooting](#-troubleshooting)
-   [Repository layout](#-repository-layout)
-   [Testing and verification](#-testing-and-verification)
-   [Known limitations](#-known-limitations)
-   [License and upstream notices](#-license-and-upstream-notices)
-   [Contributing](#-contributing)

## 🚀 Project at a glance

**Alirezaserver** is a server-management project that combines a
Nova-based panel environment with additional integrations and
operational tooling. The repository's package notes describe a stack
that includes Nova, Alirezabot, service sales workflows, AdGuard Home,
destination-side `alirezadns` integration, OpenVPN management,
backup/diagnostic helpers, and a Gemini API assistant integration.

The project is intended to provide a single operational entry point for
common server-management tasks. It is not a promise that every optional
service is installed, enabled, publicly exposed, or production-certified
on every VPS.

### Project facts

  ---------------------------------------------------------------------------------------------------------------------------------------
  Item                                Repository information
  ----------------------------------- ---------------------------------------------------------------------------------------------------
  Repository                          [`alirezachatgpt97-coder/alirezaserver`](https://github.com/alirezachatgpt97-coder/alirezaserver)

  Package label in the visible README `0.8.0-rc.17`

  Nova base described in package      `1.94.3`
  notes                               

  Visible installer's embedded add-on `0.4.0`
  label                               

  Visible installer's pinned Nova     `17e9373ec17ceede95369fcd26d6fabfda83b504`
  commit                              

  Visible installer's AdGuard Home    `v0.107.79`
  version                             

  Supported installer OS targets      Ubuntu 24.04, Debian 12, Debian 13

  Supported CPU architectures         `amd64`, `arm64`

  Init system                         `systemd`

  License shown by repository         GPL-3.0

  Main management command documented  `sudo alireza`
  in package notes                    
  ---------------------------------------------------------------------------------------------------------------------------------------

### Design goals

-   🧩 Integrate related server services without replacing their
    upstream identity.
-   🔐 Keep administrative endpoints private where the installer
    explicitly configures them as loopback-only.
-   🧰 Provide checks, diagnostics, backup and recovery operations.
-   🛰️ Support a remote Alirezabot deployment workflow through SSH, as
    described by the package notes.
-   🧱 Keep compatibility checks and pinned upstream artifacts in the
    installation path.
-   📚 Make operational behavior understandable before an administrator
    exposes a service to the Internet.

## ✨ Feature map

The following table separates **documented package capabilities** from
**what the visible `install.sh` proves it installs**. This distinction
matters because the repository README and installer currently show
different release-layer labels.

  ----------------------------------------------------------------------------
  Area                    Capability described in Evidence / qualification
                          package notes           
  ----------------------- ----------------------- ----------------------------
  Nova panel              Nova-based panel        Package notes identify Nova
                          integration             `1.94.3`; visible installer
                                                  pins a separate Nova commit
                                                  and labels its embedded
                                                  add-on `0.4.0`. Verify the
                                                  exact release bundle.

  Main CLI                `sudo alireza`          Documented in the repository
                          management entry point  README.

  AdGuard Home            DNS service, panel      Visible installer downloads
                          integration, owner-only AdGuard Home `v0.107.79`,
                          web access              verifies its checksum, and
                                                  configures DNS on port 53.

  OpenVPN                 Server and account      Visible installer installs
                          management through the  OpenVPN and integrates
                          panel                   management into Nova.

  Firewall                Rules for DNS and       Visible installer writes an
                          enabled OpenVPN         `alireza-firewall.service`
                          instances               integration and manages
                                                  dedicated iptables chains.

  Alirezabot              Telegram bot and        Described in package notes;
                          service-sales workflow  verify the matching release
                                                  files before relying on any
                                                  specific bot command.

  Remote bot host         Install bot             Described in package notes
                          runtime/database on a   for `0.8.0-rc.17`; it is not
                          separate SSH            established by the visible
                          destination             `install.sh` alone.

  Service catalog         Nova inbounds,          Described in package notes.
                          AmneziaWG, MTProto,     Availability depends on the
                          mieru, SOAR, Telegram   connected panel, configured
                          Web, Smart DNS, VIP,    service and account
                          OpenVPN and destination permissions.
                          `alirezadns`            

  Destination             Remote DNS product      Described in package notes;
  `alirezadns`            integration through a   configure and secure the
                          destination API         destination API explicitly.

  Gemini                  Gemini API assistant    Described in package notes.
                          integration             Requires the appropriate
                                                  external API configuration;
                                                  it is not a locally hosted
                                                  model.

  Backup                  Add-on state backup;    Visible installer supports
                          remote-bot snapshot in  `--backup`; remote-bot
                          the documented remote   backup behavior is described
                          mode                    in package notes.

  Update / rollback       Installer update and    Visible installer supports
                          rollback helpers        `--update`,
                                                  `--update-status`,
                                                  `--rollback`, and `--check`.

  Compatibility           Fail-closed checks for  Visible installer includes
                          selected upstream       compatibility and
                          contracts               verification code.
  ----------------------------------------------------------------------------

### Product/service types mentioned in the package notes

  -----------------------------------------------------------------------
  Product type            What it represents      Important condition
  ----------------------- ----------------------- -----------------------
  Nova inbound            A configured inbound on Must be active and
                          the managed Nova panel  authorized.

  AmneziaWG               A supported service     Must already be
                          type in the sales       configured and
                          catalog                 available.

  MTProto                 Telegram proxy service  Must be configured and
                          type                    healthy.

  mieru                   Supported service type  Must be configured and
                                                  healthy.

  SOAR                    Supported service type  Must be configured and
                                                  healthy.

  Telegram Web            Telegram Web-related    Must be configured and
                          service type            healthy.

  Smart DNS               DNS-related product     Does not guarantee NAT
                          type                    traversal or access to
                                                  every game/service.

  VIP                     A product category      Define the actual
                                                  entitlement and
                                                  delivery behavior in
                                                  the panel.

  OpenVPN                 VPN account product     The package notes say
                                                  owner-bot-only sales in
                                                  the described release.

  Destination             DNS account on a        The destination API
  `alirezadns`            registered destination  must be reachable and
                                                  explicitly configured.
  -----------------------------------------------------------------------

## 🏗️ Architecture

### High-level view

``` mermaid
flowchart TB
    Admin[Administrator]
    Client[End user / customer]
    Internet((Internet))
    subgraph Main["Main VPS"]
      Nova[Nova panel / agent]
      CLI[alireza CLI]
      AG[AdGuard Home]
      OVPN[OpenVPN integration]
      BotWeb[Bot web entry / panel integration]
      Store[(Local add-on state)]
      FW[Firewall integration]
    end
    subgraph Optional["Optional remote bot VPS"]
      Bot[Alirezabot runtime]
      DB[(Bot database)]
      SSH[SSH management channel]
    end
    Admin --> CLI
    Admin --> Nova
    Client --> Internet
    Internet --> Nova
    Nova --> AG
    Nova --> OVPN
    CLI --> Store
    FW --> AG
    FW --> OVPN
    BotWeb --> SSH
    SSH --> Bot
    Bot --> DB
```

This is a conceptual map, not a guarantee that every component is
installed in every deployment. The optional remote bot design is
described in the package notes. Confirm the exact release's installer
and configuration before planning a production topology.

### Main installation paths shown by the visible installer

The installer uses these paths:

  ---------------------------------------------------------------------------------
  Path                                          Purpose
  --------------------------------------------- -----------------------------------
  `/opt/alirezaserver`                          Add-on application and integration
                                                files

  `/var/lib/alirezaserver`                      Persistent add-on state

  `/var/log/alirezaserver`                      Installer logs

  `/etc/systemd/system/nova-agent.service.d/`   Nova agent systemd drop-in
                                                integration

  `/opt/nova-node-agent`                        Nova node-agent installation path
                                                checked by the installer
  ---------------------------------------------------------------------------------

The installer applies restrictive permissions to its application/state
directories and uses a restrictive umask. Do not manually change
ownership or permissions unless you understand the impact.

### Services referenced by the visible installer

  -----------------------------------------------------------------------
  systemd unit                        Role
  ----------------------------------- -----------------------------------
  `nova-agent.service`                Nova agent; the installer checks
                                      that it is active.

  `AdGuardHome.service`               AdGuard Home DNS service.

  `alireza-firewall.service`          Firewall integration for DNS and
                                      OpenVPN rules.

  `alireza-update.timer`              Scheduled update-related timer
                                      enabled by the installer.
  -----------------------------------------------------------------------

Use `systemctl status` to inspect a unit. A unit name listed here is not
a substitute for checking its actual state on your server.

## 💻 Compatibility and prerequisites

### Supported targets in the visible installer

  -----------------------------------------------------------------------
  Requirement                         Supported / expected value
  ----------------------------------- -----------------------------------
  Operating system                    Ubuntu 24.04 or Debian 12 / Debian
                                      13

  Architecture                        `x86_64` (`amd64`) or `aarch64` /
                                      `arm64`

  Init system                         `systemd`

  Privileges                          Root execution, normally through
                                      `sudo`

  Network                             Outbound HTTPS access to required
                                      upstream repositories and download
                                      endpoints

  Kernel feature                      `/dev/net/tun` for OpenVPN;
                                      installer attempts `modprobe tun`
                                      and stops if TUN remains
                                      unavailable

  Node.js                             Node.js 24 or newer is checked by
                                      the visible installer

  Python                              `python3` is installed/used by the
                                      installer

  Disk                                Enough space for Nova, AdGuard,
                                      logs, state, packages and backups

  DNS ports                           TCP and UDP 53 must be available on
                                      loopback and the detected IPv4
                                      address during a fresh install

  AdGuard admin port                  TCP 18085 must be available on
                                      loopback during a fresh install
  -----------------------------------------------------------------------

### VPS sizing

The package notes mention a target of **1 vCPU / 1 GB RAM**. Treat that
as a target profile, not a capacity guarantee. Actual memory and CPU use
depends on Nova, DNS traffic, OpenVPN throughput, PHP/database workloads
if deployed, the number of users, enabled services, logs and concurrent
connections.

For production workloads, measure real usage and size the VPS with
headroom. Do not infer that a one-gigabyte VPS can safely run every
optional service at high load.

### Before you begin

-   [ ] You have root or sudo access.
-   [ ] You have verified the repository and installer source.
-   [ ] You have a provider console or rescue path.
-   [ ] You have recorded the VPS public IP and hostname.
-   [ ] You have checked the provider firewall/security group.
-   [ ] You have confirmed TUN support if you plan to use OpenVPN.
-   [ ] You have checked whether ports 53 and 18085 are already
    occupied.
-   [ ] You have a backup of any existing Nova, DNS, VPN or bot data.
-   [ ] You understand which services should be public and which must
    remain private.

## 🚀 Quick installation

### Official repository installation command

The following command is copied **exactly as shown in the repository's
visible README**. It is intentionally preserved without changing its
URL, flags, output filename or execution sequence:

``` bash
curl -fL --connect-timeout 15 --max-time 180 https://raw.githubusercontent.com/alirezachatgpt97-coder/alirezaserver/main/install.sh -o install.sh && sudo bash install.sh
```

### What the command does

  ----------------------------------------------------------------------------------------
  Segment                                              Meaning
  ---------------------------------------------------- -----------------------------------
  `curl`                                               Starts an HTTP(S) download.

  `-f`                                                 Fails on HTTP error responses
                                                       rather than treating them as a
                                                       successful download.

  `-L`                                                 Follows redirects.

  `--connect-timeout 15`                               Limits connection establishment
                                                       time to 15 seconds.

  `--max-time 180`                                     Limits the overall download
                                                       operation to 180 seconds.

  `https://raw.githubusercontent.com/.../install.sh`   Downloads the installer from the
                                                       repository's `main` branch.

  `-o install.sh`                                      Saves the downloaded script as
                                                       `install.sh` in the current
                                                       directory.

  `&&`                                                 Runs the next command only if the
                                                       download succeeds.

  `sudo bash install.sh`                               Executes the downloaded script with
                                                       root privileges.
  ----------------------------------------------------------------------------------------

> \[!CAUTION\] The command downloads from the moving `main` branch. For
> repeatable production deployment, inspect the exact script first and
> prefer a reviewed release/tag or a commit-pinned artifact when the
> project publishes one. Do not assume the contents of `main` are
> immutable.

### Recommended pre-install review

``` bash
# Download the script without executing it.
curl -fL --connect-timeout 15 --max-time 180 \
  https://raw.githubusercontent.com/alirezachatgpt97-coder/alirezaserver/main/install.sh \
  -o install.sh

# Inspect the script.
less install.sh

# Show the beginning of the script and its documented options.
sed -n '1,80p' install.sh

# Calculate a local checksum for your own audit record.
sha256sum install.sh

# Only after review, run the installer.
sudo bash install.sh
```

The review commands above are optional administrator precautions; they
do not replace or modify the official one-line installation command.

### Installer behavior

The visible installer:

1.  Requires root execution.
2.  Requires a Linux system with `systemd`.
3.  accepts Ubuntu 24.04, Debian 12 and Debian 13.
4.  accepts `amd64` and `arm64`.
5.  checks for an existing installation and refuses to overwrite
    unrecognized directories.
6.  installs required OS packages through APT.
7.  checks TUN availability.
8.  checks relevant port availability on a fresh installation.
9.  downloads the pinned AdGuard Home release and verifies its SHA-256
    checksum.
10. installs or validates the pinned Nova base.
11. checks that `nova-agent.service` is active.
12. installs add-on files and integration components.
13. configures AdGuard DNS and its loopback-only admin endpoint.
14. configures firewall integration.
15. performs local integration verification.
16. enables the update timer and reports readiness.

The installer is an online installer, not an offline bundle. It
downloads upstream dependencies from their configured sources.

## 🧰 Installer options

The visible `install.sh` declares the following options. These are the
exact option names present in the script's argument parser and usage
comments.

  ----------------------------------------------------------------------------------------
  Command                                  Purpose                 Operational note
  ---------------------------------------- ----------------------- -----------------------
  `sudo bash install.sh`                   Install, repair or      Default path; installer
                                           resume                  checks whether existing
                                                                   files belong to this
                                                                   installation.

  `sudo bash install.sh --repair`          Repair/resume           Explicit equivalent of
                                                                   the default install
                                                                   path in the argument
                                                                   parser.

  `sudo bash install.sh --help`            Print usage             Displays the
                                                                   installer's embedded
                                                                   usage lines.

  `sudo bash install.sh -h`                Print usage             Short help option.

  `sudo bash install.sh --check`           Run local checks        Requires an existing
                                                                   add-on installation.

  `sudo bash install.sh --backup`          Run add-on backup       Requires an existing
                                           helper                  add-on installation.

  `sudo bash install.sh --rollback`        Roll back add-on        Requires the rollback
                                           integration             helper to exist.

  `sudo bash install.sh --update`          Run update retry helper Requires the installed
                                                                   update helper.

  `sudo bash install.sh --update-status`   Print update status     Requires a previous
                                           JSON                    update-status file.

  `sudo bash install.sh --diagnose`        Package README          **Not present in the
                                           documented diagnostic   visible installer's
                                           command                 argument parser.**
                                                                   Verify the exact
                                                                   release before using
                                                                   it.
  ----------------------------------------------------------------------------------------

### Help

``` bash
sudo bash install.sh --help
```

### Check

``` bash
sudo bash install.sh --check
```

The visible check path runs the add-on's check script. It verifies
expected systemd units, queries AdGuard status on loopback, checks DNS
port configuration, runs the integration verifier and probes DNS over
TCP and UDP. External DNS reachability may produce a warning rather than
prove that every client network can reach the server.

### Backup

``` bash
sudo bash install.sh --backup
```

The visible installer dispatches this option to the add-on backup
helper. Protect the resulting archive as sensitive data. Backups may
contain configuration, certificates, service metadata or other private
material.

### Rollback

``` bash
sudo bash install.sh --rollback
```

Rollback is for the add-on integration. Do not interpret it as a general
VPS factory reset, a Nova data migration, or a guaranteed restore of
unrelated services. Read the rollback helper and preserve a backup
before running it.

### Update

``` bash
sudo bash install.sh --update
```

The visible installer dispatches this option to the installed Python
update helper with `--retry`. Review update status and backups before
applying updates to a production server.

### Update status

``` bash
sudo bash install.sh --update-status
```

This prints the update status JSON file if a check has already run. It
does not itself guarantee that an update is available or installed.

### DNS client allow-list on first install

The visible installer's comments document this environment-variable
pattern:

``` bash
DNS_ALLOWED_CIDRS="203.0.113.12/32,198.51.100.0/24" sudo -E bash install.sh
```

Replace the example documentation ranges with the real client CIDRs you
intend to allow. `203.0.113.0/24` and `198.51.100.0/24` are reserved
documentation networks; they are not real public client ranges. The `-E`
option preserves the environment variable through sudo where sudo policy
permits it.

The installer's comments say DNS accepts public clients by default with
AdGuard rate limiting. Restrict access through AdGuard Access settings
or `DNS_ALLOWED_CIDRS` when appropriate. Validate your actual access
policy after installation.

## ✅ First-run checklist

### Immediately after installation

``` bash
# Open the project management menu.
sudo alireza

# Inspect Nova.
sudo systemctl status nova-agent.service

# Inspect AdGuard Home.
sudo systemctl status AdGuardHome.service

# Inspect firewall integration.
sudo systemctl status alireza-firewall.service

# Inspect the update timer.
sudo systemctl status alireza-update.timer
```

### Validate DNS listeners

``` bash
# DNS over UDP.
dig @127.0.0.1 example.com

# DNS over TCP.
dig @127.0.0.1 -p 53 example.com +tcp

# Inspect listening sockets.
sudo ss -lntup
```

A successful localhost query does not prove that a remote client can
reach DNS through the provider firewall. Test from a separate network
and apply an intentional client allow-list.

### Validate the panel front door

The visible installer verifies the Nova front door using HTTPS and
defaults the front-end port to `443` unless the Nova
environment/configuration says otherwise. Use the hostname and path
shown by your own installation. Do not assume a hostname or path that
has not been configured.

## 🖥️ Command reference

### Commands documented by the repository README

The repository README documents the following management entry point and
examples:

  ------------------------------------------------------------------------------
  Command                        Documented purpose      Notes
  ------------------------------ ----------------------- -----------------------
  `sudo alireza`                 Open the main           Primary interactive
                                 management menu         entry point.

  `sudo alireza panels`          Show panel addresses    Documented in the
                                                         repository's earlier
                                                         command list; verify on
                                                         the exact installed
                                                         version.

  `sudo alireza status`          Show service status     Documented command;
                                                         exact output depends on
                                                         installed services.

  `sudo alireza ports`           Show port information   Documented command;
                                                         compare output with
                                                         `ss` and firewall
                                                         rules.

  `sudo alireza doctor`          Run health checks       Documented command; do
                                                         not confuse with the
                                                         installer `--check`
                                                         option.

  `sudo alireza repair`          Repair supported        Review prompts and
                                 components              backup first.

  `sudo alireza support`         Prepare support         Review report for
                                 information             secrets before sharing.

  `sudo alireza tls`             TLS management          Exact subcommands
                                                         depend on installed
                                                         version.

  `sudo alireza tls-status`      Show TLS status         Verify certificate and
                                                         renewal state.

  `sudo alireza network`         Network diagnostics     Does not replace
                                                         provider firewall
                                                         inspection.

  `sudo alireza openvpn`         OpenVPN management      Only meaningful when
                                                         OpenVPN integration is
                                                         installed.

  `sudo alireza backup`          Backup operation        Keep copies off the
                                                         VPS.

  `sudo alireza update`          Update operation        Review release notes
                                                         and backup first.

  `sudo alireza restart panel`   Restart panel component Can interrupt
                                                         management access.

  `sudo alireza restart xray`    Restart Xray            Existing client
                                                         sessions may
                                                         disconnect.

  `sudo alireza restart bot`     Restart bot component   Applies only where that
                                                         bot component exists.

  `sudo alireza logs xray`       View Xray logs          Avoid publishing logs
                                                         without redaction.

  `sudo alireza logs bot`        View bot logs           Bot logs may contain
                                                         user or transaction
                                                         metadata.
  ------------------------------------------------------------------------------

> \[!NOTE\] This table preserves the command examples documented in the
> repository materials available for this README. The currently visible
> `install.sh` does **not** define the `alireza` CLI parser; therefore
> this document does not invent subcommands, flags, arguments, or output
> formats. Run `sudo alireza` and inspect the installed version's own
> help/menu for authoritative details.

### Generic Linux service inspection commands

These are standard Linux/systemd commands, not custom Alirezaserver CLI
commands.

  -----------------------------------------------------------------------------------------------------
  Command                                                           What it does
  ----------------------------------------------------------------- -----------------------------------
  `sudo systemctl status nova-agent.service`                        Shows Nova agent status.

  `sudo systemctl status AdGuardHome.service`                       Shows AdGuard Home status.

  `sudo systemctl status alireza-firewall.service`                  Shows firewall integration status.

  `sudo systemctl status alireza-update.timer`                      Shows update timer status.

  `sudo systemctl is-active nova-agent.service`                     Prints whether Nova is active.

  `sudo systemctl is-enabled AdGuardHome.service`                   Shows whether AdGuard is enabled at
                                                                    boot.

  `sudo systemctl restart nova-agent.service`                       Restarts Nova agent.

  `sudo systemctl restart AdGuardHome.service`                      Restarts AdGuard Home.

  `sudo systemctl daemon-reload`                                    Reloads systemd unit definitions.

  `sudo journalctl -u nova-agent.service -n 100 --no-pager`         Shows recent Nova logs.

  `sudo journalctl -u AdGuardHome.service -n 100 --no-pager`        Shows recent AdGuard logs.

  `sudo journalctl -u alireza-firewall.service -n 100 --no-pager`   Shows recent firewall integration
                                                                    logs.

  `sudo ss -lntup`                                                  Lists listening TCP/UDP sockets.

  `sudo iptables -S`                                                Lists filter table rules.

  `sudo iptables -t nat -S`                                         Lists NAT table rules.

  `ip -br address`                                                  Shows concise interface addresses.

  `ip route`                                                        Shows routing table.

  `df -h`                                                           Shows filesystem capacity.

  `free -h`                                                         Shows memory usage.

  `uptime`                                                          Shows uptime and load averages.
  -----------------------------------------------------------------------------------------------------

### Safe command usage

-   Run read-only status and inspection commands before restart or
    repair operations.
-   Restart one service at a time and verify it returns healthy.
-   Do not run firewall flush commands on a remote VPS unless you have
    console access and a tested recovery plan.
-   Do not paste unredacted logs, database dumps, private keys, bot
    tokens or SSH credentials into public issues.

## 🌐 Network ports & firewall

The port table below distinguishes ports explicitly identified by the
visible installer from ports that are selected dynamically or depend on
the operator's configuration.

### Ports explicitly identified in repository materials

  ------------------------------------------------------------------------------------------------------
            Port Protocol      Bind / exposure Component     Purpose               Recommendation
  -------------- ------------- --------------- ------------- --------------------- ---------------------
           `443` TCP           Public HTTPS    Nova panel /  Main browser access   Allow only if the
                               front door, if  reverse proxy                       panel is intended to
                               configured                                          be public; use valid
                                                                                   TLS and strong
                                                                                   authentication.

            `80` TCP           Public only     HTTP-01       ACME HTTP-01          Open only when the
                               when needed     certificate   challenge             chosen certificate
                                               validation                          flow requires it.

            `53` UDP           Loopback and    AdGuard Home  DNS queries           Restrict clients
                               detected IPv4   DNS                                 intentionally; public
                               interface                                           DNS has
                                                                                   abuse/amplification
                                                                                   risk.

            `53` TCP           Loopback and    AdGuard Home  TCP DNS queries       Apply the same access
                               detected IPv4   DNS                                 policy as UDP 53.
                               interface                                           

         `18085` TCP           `127.0.0.1`     AdGuard Home  Local management and  **Do not expose
                               only            admin/API     panel proxy           publicly.**

          `8088` TCP           Nova internal   Nova /        Internal panel        Treat as private;
                               listener        integration   integration           verify actual bind
                               default used by API                                 address.
                               integration                                         
                               code                                                

         `10085` ---           Not confirmed   ---           Not established by    Do not open based on
                               by the                        the visible install   this README.
                               currently                     script                
                               visible                                             
                               installer                                           

        Selected UDP or TCP    Public when an  OpenVPN       VPN client transport  Choose in the OpenVPN
    OpenVPN port               OpenVPN server                                      configuration and
                               is enabled                                          open the same
                                                                                   protocol/port at the
                                                                                   provider firewall.

      Remote bot TCP,          Loopback-only   SSH tunnel /  Private               Not a new public
  loopback ports dynamically   in the package  remote bot    main-to-destination   listener; inspect the
                 selected      notes           bridge        communication         live configuration.
  ------------------------------------------------------------------------------------------------------

### Port details

#### TCP 443 --- HTTPS

-   Used as the default front-door port in the visible installer's
    verification logic.
-   The actual public hostname and panel path depend on Nova
    configuration.
-   Keep TLS valid and renewed.
-   Do not assume the panel is safe merely because it uses HTTPS;
    authentication and access controls still matter.

#### TCP 80 --- HTTP-01 validation

-   The package notes describe TCP 80 as needed only when using an
    HTTP-01 certificate flow.
-   It is not automatically required for every TLS deployment.
-   If using DNS-based validation, the HTTP-01 requirement may not
    apply.
-   Confirm the selected ACME challenge type before changing firewall
    rules.

#### UDP/TCP 53 --- DNS

-   The visible installer configures AdGuard DNS on port 53.
-   It binds to loopback and the detected default IPv4 address.
-   The installer checks availability of TCP and UDP 53 during a fresh
    install.
-   The firewall integration allows both TCP and UDP DNS.
-   DNS clients can query over UDP; TCP is also required for correct DNS
    behavior in many situations.
-   Public recursive DNS can be abused. Apply allow-lists, rate limits
    and monitoring.

#### TCP 18085 --- AdGuard administrative endpoint

-   The visible installer configures the AdGuard HTTP endpoint at
    `127.0.0.1:18085`.
-   The panel integration proxies the administrative interface through
    the main panel.
-   The firewall integration explicitly avoids opening this admin port
    publicly.
-   Do not add a public firewall allow rule for this port.

#### TCP 8088 --- Nova integration listener

-   The visible installer integration code reads `NOVA_PORT` and
    defaults it to `8088` when checking the Nova integration endpoint.
-   This is an internal integration listener in the visible code
    context.
-   Verify the actual bind address and Nova configuration on your host
    before changing firewall policy.
-   Do not expose it publicly just because it appears in an integration
    script.

#### OpenVPN port --- selected per server

-   The installer firewall code reads each enabled OpenVPN server's
    protocol and port.
-   Supported protocols in that code path are `udp` and `tcp`.
-   The configured port must be in the range `1024–65535`.
-   The firewall integration adds an allow rule for the selected
    protocol and port.
-   The VPS provider firewall/security group must separately allow the
    same protocol and port.
-   There is no single universal OpenVPN port guaranteed by this README.

### Firewall checklist

  -----------------------------------------------------------------------
  Direction               Port / protocol         Action
  ----------------------- ----------------------- -----------------------
  Inbound                 TCP 443                 Allow if public panel
                                                  access is required.

  Inbound                 TCP 80                  Allow only if HTTP-01
                                                  validation is used.

  Inbound                 UDP 53                  Allow only intended DNS
                                                  clients.

  Inbound                 TCP 53                  Allow only intended DNS
                                                  clients.

  Inbound                 Selected OpenVPN        Allow when that OpenVPN
                          UDP/TCP port            server is enabled.

  Inbound                 TCP 18085               Deny public access;
                                                  loopback only.

  Inbound                 TCP 8088                Keep private unless the
                                                  actual deployment
                                                  explicitly requires
                                                  otherwise.

  Inbound                 TCP 10085               Do not open based on
                                                  current evidence.

  Inbound                 SSH port                Restrict to
                                                  administrator IPs where
                                                  possible.

  Outbound                TCP 443                 Required for HTTPS
                                                  downloads, APIs and
                                                  Telegram/upstream
                                                  access as applicable.

  Outbound                DNS                     Permit the server's
                                                  configured upstream DNS
                                                  behavior.
  -----------------------------------------------------------------------

Provider firewalls and host firewalls are separate layers. A host rule
does not automatically update a cloud security group, and a provider
allow rule does not guarantee the service is listening.

### Inspect actual listeners

``` bash
sudo ss -lntup
sudo lsof -nP -i
```

### Inspect firewall rules

``` bash
sudo iptables -S
sudo iptables -t nat -S
sudo iptables -L -n -v
```

Do not copy firewall rules from another server without checking
interface names, network ranges, existing chains and provider policy.

## 🛡️ DNS and AdGuard Home

### DNS behavior in the visible installer

The visible installer:

-   Downloads AdGuard Home `v0.107.79`.
-   Verifies the downloaded archive against an architecture-specific
    SHA-256 value.
-   Configures DNS port `53`.
-   Configures loopback and the detected IPv4 address as DNS bind hosts.
-   Configures the administrative HTTP endpoint at `127.0.0.1:18085`.
-   Sets upstream DNS servers to `1.1.1.1` and `9.9.9.9` in the initial
    configuration.
-   Enables filtering and installs a filter-list entry.
-   Configures a rate limit of 20 queries per second in the initial
    configuration.
-   Preserves existing configuration during recognized repair/resume
    operations, subject to the installer's migration logic.

### DNS port matrix

  -------------------------------------------------------------------------
  Listener          Transport         Address             Role
  ----------------- ----------------- ------------------- -----------------
  DNS               UDP               `127.0.0.1:53`      Local DNS queries

  DNS               TCP               `127.0.0.1:53`      Local TCP DNS
                                                          queries

  DNS               UDP               Detected server     DNS queries from
                                      IPv4 `:53`          permitted network
                                                          clients

  DNS               TCP               Detected server     TCP DNS queries
                                      IPv4 `:53`          from permitted
                                                          network clients

  AdGuard admin/API TCP               `127.0.0.1:18085`   Private
                                                          administration
                                                          and panel proxy
  -------------------------------------------------------------------------

### Restrict DNS clients

The installer comments document `DNS_ALLOWED_CIDRS` for first-install
access restrictions. You can also use AdGuard Access settings after
installation.

Use CIDR notation carefully:

  -----------------------------------------------------------------------
  Example                             Meaning
  ----------------------------------- -----------------------------------
  `198.51.100.25/32`                  One IPv4 address (documentation
                                      example only).

  `203.0.113.0/24`                    One IPv4 /24 network (documentation
                                      example only).

  `10.20.0.0/16`                      Private IPv4 range example.

  `192.168.10.0/24`                   Private LAN range example.
  -----------------------------------------------------------------------

Do not use the documentation-only example ranges as real public client
IPs.

### DNS troubleshooting

1.  Check `AdGuardHome.service`.
2.  Confirm TCP and UDP 53 are listening.
3.  Check AdGuard upstream DNS configuration.
4.  Test a local UDP query.
5.  Test a local TCP query.
6.  Test from an authorized remote client.
7.  Check host firewall and provider firewall independently.
8.  Review AdGuard Access settings and rate limiting.
9.  Confirm the upstream resolver is reachable.
10. Avoid opening the AdGuard admin port to the Internet.

## 🔐 OpenVPN management

### What the visible installer establishes

The visible installer installs the `openvpn` package, checks for
`/dev/net/tun`, and includes OpenVPN management integration in the Nova
add-on. The firewall helper handles enabled server definitions and
permits configured `udp` or `tcp` ports in the allowed range.

The repository's package notes describe an OpenVPN product and
account-management workflow. The exact UI actions and account fields
should be verified in the installed panel version.

### Operational concepts

  -----------------------------------------------------------------------
  Concept                             Explanation
  ----------------------------------- -----------------------------------
  Server                              A configured OpenVPN instance.

  Protocol                            UDP or TCP transport.

  Port                                Selected listening port,
                                      constrained by the visible firewall
                                      code to `1024–65535`.

  Tunnel interface                    A virtual interface used by the VPN
                                      server.

  Subnet                              Private network assigned to VPN
                                      clients.

  Client profile                      Configuration material used by a
                                      client to connect.

  NAT / masquerade                    Allows VPN client traffic to leave
                                      through the server's WAN interface
                                      when configured.

  DNS push                            Supplies DNS configuration to
                                      connected clients.
  -----------------------------------------------------------------------

### Firewall behavior in the visible integration

The firewall helper creates dedicated chains:

  -----------------------------------------------------------------------
  Chain                   Table                   Purpose
  ----------------------- ----------------------- -----------------------
  `ALIREZA_IN`            `filter`                Handles inbound DNS and
                                                  OpenVPN traffic.

  `ALIREZA_FWD`           `filter`                Handles forwarding
                                                  rules for VPN client
                                                  networks.

  `ALIREZA_NAT`           `nat`                   Handles masquerading
                                                  for VPN client
                                                  networks.

  `ALIREZA_DNS`           `nat`                   Handles DNS destination
                                                  translation for
                                                  configured VPN
                                                  networks.
  -----------------------------------------------------------------------

The helper checks that each configured OpenVPN server has a valid ID,
private IPv4 `/24` subnet, supported protocol and valid port. It enables
IPv4 forwarding when at least one server is enabled.

### OpenVPN safety notes

-   Confirm TUN is available before troubleshooting client connectivity.
-   Avoid overlapping VPN subnets and existing routes.
-   Do not expose an OpenVPN port unless the matching server is enabled.
-   Match protocol and port between the application, host firewall and
    provider firewall.
-   Protect client profiles and private keys.
-   Revoke lost or compromised client credentials.
-   Test from a real external client; local service status alone does
    not prove end-to-end connectivity.

## 🤖 Nova integration

The package notes identify Nova as the base panel and describe
compatibility checks for selected API behavior, reseller quotas and link
generation.

The visible installer performs a pinned Nova installation or validates
an existing Nova node-agent layout. It checks that the Nova package
identity is `nova-node-agent`, verifies the Nova service is active, and
includes compatibility/integration verification.

### Nova integration principles

-   Keep upstream Nova files and notices intact.
-   Do not manually replace pinned upstream files with arbitrary
    versions.
-   Review compatibility checks before upgrading the upstream panel.
-   Back up the panel and add-on state before a release change.
-   Treat internal API listeners as private.
-   Validate panel access through the configured HTTPS front door.

### Nova service inspection

``` bash
sudo systemctl status nova-agent.service
sudo journalctl -u nova-agent.service -n 100 --no-pager
```

The exact Nova CLI and API are upstream concerns and may change
independently of this add-on. Use the matching Nova documentation for
upstream behavior.

## 🛰️ Alirezabot and remote bot node

The repository's `0.8.0-rc.17` package notes describe an owner-bot
installation mode that can use the main server or a separate destination
server.

### Remote mode described by the package notes

-   The operator selects **Another server** in the Alirezabot
    installation workflow.
-   SSH credentials are provided.
-   The destination host fingerprint is checked against the destination
    console.
-   Authentication may use a password or key, with root or passwordless
    sudo as described in the package notes.
-   The bot runtime and database are located on the destination in this
    mode.
-   The bot web entry remains accessible through the main panel's HTTPS
    entry point.
-   The notes describe private loopback/SSH communication and no
    additional public port opened for this bridge.

### Suggested destination platform in package notes

  -----------------------------------------------------------------------
  Requirement                         Suggested value
  ----------------------------------- -----------------------------------
  OS                                  Ubuntu 24.04 or Debian 12 / 13

  Init system                         `systemd`

  Network                             Public IPv4 and outbound access to
                                      repositories and Telegram

  Access                              SSH with verified host fingerprint

  Privilege                           Root or passwordless sudo, as
                                      supported by the workflow
  -----------------------------------------------------------------------

### Important migration warning

Installing a new remote bot instance is not the same as migrating an
already-running bot database from the main server. The package notes
warn that moving an existing installation needs a separate migration to
avoid duplicate Telegram polling and lost orders. Do not run two bot
pollers against the same bot token unless the application explicitly
supports that architecture.

### Remote bot backup warning

The package notes describe a remote backup snapshot that includes the
remote bot database and files in `remote-bot/alirezabot.tar.gz`. If the
destination is unavailable, the remote backup is not considered
complete. Restoring the main panel files alone does not restore the
remote bot database.

Protect SSH keys, bot tokens, database dumps and backup archives as
secrets.

## 🛒 Product and service sales workflow

The package notes describe a sales workflow through the Mirza web
panel's product area.

### Documented high-level workflow

1.  Configure the service on the main panel first.
2.  Confirm that the service is active and healthy.
3.  Open the web panel's product management area.
4.  Select the managed panel named `alirezaserver`.
5.  Configure the service types and permissions available for that
    product.
6.  Set the product price, volume and duration using the existing
    product form.
7.  Test a controlled purchase.
8.  Test renewal, suspension and customer delivery.
9.  Confirm the customer receives the expected service link or
    instructions.
10. Review logs and account state after each test.

### Product compatibility rules in package notes

-   Only prepared and authorized services should be sold.
-   The standard product option is described as preserving legacy
    product behavior.
-   Destination `alirezadns` and OpenVPN sales are described as
    owner-bot-only in the referenced package notes.
-   Resellers are limited to the actual permissions of their Nova
    accounts.
-   Renewal must validate service compatibility before deducting
    balance.
-   Changing an account's service type or destination during renewal is
    not a migration and is rejected.
-   Smart DNS does not guarantee NAT traversal or access to every game.
-   DNS destination renewal is constrained by the destination API's
    full-day incremental behavior as described in the notes.

### Destination `alirezadns` setup notes

1.  Register the destination in the destination-side `alirezadns`
    installer.
2.  Obtain the destination API key using the intended secure workflow.
3.  In the main server's Alirezabot configuration, verify and save the
    destination API key.
4.  Confirm the API is reachable from the main server.
5.  Configure the destination's Public API setting deliberately.
6.  Test account creation and renewal with a controlled account.
7.  Confirm that uncertain API responses do not cause duplicate blind
    account creation.

The package notes explicitly distinguish AdGuard Home from the
destination `alirezadns` product. Do not assume that configuring one
configures the other.

## 💾 Backups, restore and rollback

### Backup principles

-   Keep at least one backup outside the VPS.
-   Encrypt backups that contain credentials, certificates, databases or
    private configuration.
-   Test restoration before relying on a backup.
-   Record the version and date associated with each backup.
-   Keep the remote bot backup together with the matching destination
    metadata.
-   Do not upload backup archives to public issue trackers or public
    repositories.

### Backup command paths

  -----------------------------------------------------------------------
  Command                             Meaning
  ----------------------------------- -----------------------------------
  `sudo alireza`                      Open the main management interface
                                      and use its available backup
                                      workflow.

  `sudo alireza backup`               Command documented by repository
                                      materials.

  `sudo bash install.sh --backup`     Invoke the visible add-on backup
                                      helper.
  -----------------------------------------------------------------------

### Remote bot backup

The package notes describe a remote snapshot containing the bot database
and bot files. A disconnected destination causes the remote portion to
be considered incomplete. Keep the destination backup and its restore
instructions together.

### Restore considerations

-   Restore to a compatible version.
-   Restore the database and files as a matched set.
-   Preserve ownership and restrictive permissions.
-   Avoid running two bot polling processes with the same token.
-   Verify the service after restoration.
-   Confirm that the restored certificates and API keys are still valid.
-   Keep the pre-restore backup until the system has passed
    verification.

### Rollback

``` bash
sudo bash install.sh --rollback
```

The visible installer routes this option to its add-on rollback helper.
Read the helper before running it. It is not a universal rollback for
all upstream Nova changes or all unrelated system packages.

## 🔄 Updates and compatibility

### Update commands

``` bash
# Show the current update status, if one exists.
sudo bash install.sh --update-status

# Run the installed update helper.
sudo bash install.sh --update
```

The package notes also describe rerunning the installer as an
upgrade/repair path. Before doing so, back up from the management
interface and store the backup off-server.

### Update safety sequence

1.  Read the release notes.
2.  Confirm the package and installer versions.
3.  Back up panel and add-on data.
4.  Back up remote bot data if remote mode is enabled.
5.  Confirm sufficient disk space.
6.  Confirm the VPS has outbound connectivity.
7.  Run the documented update flow.
8.  Inspect update status.
9.  Run local checks.
10. Verify Nova, AdGuard and firewall units.
11. Test DNS over UDP and TCP.
12. Test OpenVPN from an external client if enabled.
13. Test the bot workflow if enabled.
14. Keep the backup until the new version has been stable.

### Version labels are not interchangeable

The repository README currently labels the package `0.8.0-rc.17`. The
visible installer source header and embedded notice label its add-on
`0.4.0`. The installer also pins a Nova commit and AdGuard version.
These labels refer to different layers and should not be collapsed into
one version number.

Always verify the exact `README.md`, `install.sh`, `CHANGELOG.md`,
`SOURCES.md`, `SHA256SUMS` and release assets from the same commit or
release bundle.

## 🔒 Security hardening

### Administrative access

-   Use SSH keys where possible.
-   Disable password SSH authentication only after confirming key access
    works.
-   Restrict SSH to trusted source IPs when practical.
-   Use a separate administrator account with sudo if appropriate.
-   Keep provider console access available.
-   Protect panel credentials with unique passwords and MFA where
    supported.

### Network exposure

-   Keep `127.0.0.1:18085` private.
-   Treat the Nova integration listener as internal.
-   Do not expose undocumented ports.
-   Limit DNS clients intentionally.
-   Open only the selected OpenVPN port/protocol.
-   Review IPv4 and IPv6 separately; the visible installer notes that
    direct IPv6 DNS listening is not preconfigured.
-   Check both host firewall and provider firewall rules.

### Secrets

Never commit or publicly share:

-   Telegram bot tokens.
-   Gemini API keys.
-   SSH private keys.
-   SSH passwords.
-   Database passwords.
-   Panel session cookies.
-   TLS private keys.
-   OpenVPN client private keys.
-   API keys for destination DNS services.
-   Backup archives containing credentials or customer data.

### DNS security

Public DNS services can be abused for reflection/amplification and
unwanted recursive use. Apply access controls, rate limiting, monitoring
and upstream policy. Confirm that the DNS service is intended to be
public before allowing global access.

### Supply-chain safety

The visible installer downloads upstream artifacts and verifies
checksums for selected downloads. Checksum verification is useful only
when the expected checksum itself is obtained from a trusted, reviewed
source. Review release assets, source notices and upstream licensing
before redistribution.

## 🩺 Diagnostics and logs

### Installer log location

The visible installer writes timestamped logs under:

``` text
/var/log/alirezaserver/
```

A log filename follows the pattern:

``` text
install-YYYYMMDDTHHMMSSZ.log
```

The installer creates the log directory with restrictive permissions and
sets the log file mode to `600`.

### Service diagnostics

``` bash
sudo systemctl status nova-agent.service
sudo systemctl status AdGuardHome.service
sudo systemctl status alireza-firewall.service
sudo systemctl status alireza-update.timer
```

### Recent logs

``` bash
sudo journalctl -u nova-agent.service -n 100 --no-pager
sudo journalctl -u AdGuardHome.service -n 100 --no-pager
sudo journalctl -u alireza-firewall.service -n 100 --no-pager
```

### Network diagnostics

``` bash
ip -br address
ip route
sudo ss -lntup
sudo iptables -S
sudo iptables -t nat -S
```

### Resource diagnostics

``` bash
free -h
df -h
uptime
top
```

### Support report hygiene

Before sharing a support report, inspect and redact:

-   Public IPs if they should remain private.
-   Hostnames and domains.
-   Usernames.
-   Bot usernames and IDs.
-   API endpoints.
-   Tokens and passwords.
-   Private keys and certificate material.
-   Customer identifiers and order details.

A support bundle is not automatically safe for public publication.

## 🧯 Troubleshooting

### Installer says root is required

Run the installer with sudo:

``` bash
sudo bash install.sh
```

Do not run it as an unprivileged user and expect it to configure system
services.

### Unsupported operating system

The visible installer accepts Ubuntu 24.04 and Debian 12/13. It stops on
other OS versions. Do not bypass the OS guard unless you have reviewed
and tested the installer on that platform.

### Unsupported architecture

The visible installer accepts `amd64` and `arm64`. Other architectures
are rejected.

### TUN device is unavailable

Check:

``` bash
ls -l /dev/net/tun
```

The installer attempts to load the TUN module. If the device remains
unavailable, ask the VPS provider to enable TUN support. OpenVPN cannot
operate correctly without the required kernel/network support.

### Port 53 is already occupied

Check:

``` bash
sudo ss -lntup | grep ':53'
```

Identify the service before changing anything. The installer
deliberately refuses to stop an existing service just to claim the port.

### Port 18085 is already occupied

Check:

``` bash
sudo ss -lntp | grep ':18085'
```

The installer expects the AdGuard administrative endpoint to use
loopback TCP 18085. Do not solve a conflict by exposing the admin
interface publicly.

### AdGuard service is not active

Check:

``` bash
sudo systemctl status AdGuardHome.service
sudo journalctl -u AdGuardHome.service -n 100 --no-pager
```

Confirm the configuration file, filesystem permissions, port
availability and upstream DNS reachability.

### DNS works locally but not remotely

Check all of the following:

1.  AdGuard binds to the expected IPv4 address.
2.  TCP and UDP 53 are permitted by host firewall rules.
3.  Provider firewall/security group permits the intended traffic.
4.  AdGuard Access settings allow the client.
5.  The client is using the correct server address.
6.  The upstream DNS resolver is reachable.
7.  The service is not rate-limiting the client.

### Nova service is unhealthy

Check:

``` bash
sudo systemctl status nova-agent.service
sudo journalctl -u nova-agent.service -n 150 --no-pager
```

Do not overwrite the Nova installation manually. Review the installer
log and the pinned upstream compatibility requirements.

### Update status file does not exist

The visible `--update-status` option requires a previous update check.
Run the supported update/check workflow for the installed version and
inspect the resulting status.

### Remote bot destination is offline

The package notes say a remote bot backup cannot be accepted as complete
when the destination is disconnected. Restore connectivity and rerun the
appropriate backup workflow. Do not assume a main-server-only archive
contains the remote database.

### OpenVPN service is active but clients cannot connect

Check:

-   TUN availability.
-   The configured OpenVPN protocol and port.
-   Host firewall rules.
-   Provider firewall/security group.
-   VPN subnet conflicts.
-   IPv4 forwarding.
-   NAT/masquerade rules.
-   Client profile validity.
-   Whether the server is actually listening on the configured address.

Use an external client test. A successful systemd status is not an
end-to-end VPN test.

## 📁 Repository layout

The visible repository root contains the following entries:

  Path                Purpose
  ------------------- ----------------------------
  `addon/`            Add-on content
  `assets/`           Project assets
  `docs/`             Documentation
  `tests/`            Tests
  `tools/`            Helper tools
  `CHANGELOG.md`      Change history
  `LICENSE`           License file
  `README.md`         Main project documentation
  `SHA256SUMS`        Checksums
  `SOURCES.md`        Upstream source notices
  `install.sh`        Installer
  `setup.sh`          Setup script
  `source-code.zip`   Source archive

The package notes also state that `source-code.zip` is an archive
artifact and should not be extracted when publishing the outer release
bundle into the repository root. Follow the release packaging
instructions for the exact version.

## 🧪 Testing and verification

### Checks visible in the installer

The visible installer includes checks for:

-   Supported operating system and architecture.
-   Root privileges and systemd availability.
-   TUN device availability.
-   Fresh-install port availability.
-   SHA-256 verification of downloaded artifacts.
-   Nova package identity and service health.
-   AdGuard service status.
-   DNS listener configuration.
-   DNS resolution over UDP and TCP.
-   Panel front-door verification over HTTPS.
-   Integration endpoints and expected API behavior.
-   Firewall integration service state.

### What a local check does not prove

A local check cannot prove:

-   Global reachability from every ISP or country.
-   Correct provider firewall policy.
-   Long-term performance under production load.
-   Compatibility with every future upstream release.
-   Successful client connectivity from every device.
-   Correctness of every external Telegram payment or messaging
    workflow.
-   Full multi-VPS migration safety.
-   That every optional product type is configured and ready to sell.

### Release validation checklist

-   [ ] Installer succeeds on a clean supported VPS.
-   [ ] Repair/resume succeeds without destroying recognized
    configuration.
-   [ ] Nova service is healthy.
-   [ ] AdGuard service is healthy.
-   [ ] DNS responds over UDP and TCP locally.
-   [ ] DNS access policy matches the intended audience.
-   [ ] AdGuard admin interface is not publicly reachable.
-   [ ] OpenVPN service starts when configured.
-   [ ] OpenVPN works from a separate external client.
-   [ ] Provider firewall matches host firewall policy.
-   [ ] Backup completes and is copied off-server.
-   [ ] Restore procedure has been tested.
-   [ ] Update status is understandable and accurate.
-   [ ] Rollback behavior has been tested in a non-production
    environment.
-   [ ] Bot token and API secrets are not present in logs or public
    artifacts.
-   [ ] Remote bot mode has been tested on two separate VPS instances if
    used.

## ⚠️ Known limitations and important caveats

-   The visible installer is an online installer, not an offline
    installation bundle.
-   The visible installer supports only the OS versions and
    architectures listed above.
-   The visible installer requires Node.js 24 or newer.
-   The visible installer requires TUN availability for its OpenVPN
    integration.
-   Direct IPv6 DNS listening and standalone encrypted DNS listeners are
    not preconfigured by the visible installer.
-   The visible installer configures AdGuard administration on loopback.
-   The package notes describe remote bot installation, but migration of
    an existing bot installation is a separate operation.
-   A remote bot destination must be available for a complete remote-bot
    backup.
-   Smart DNS does not guarantee NAT traversal or universal game access.
-   The package notes do not claim that all future Nova versions are
    compatible.
-   The package notes explicitly state that full live multi-node, real
    Telegram, ISP-network and long-duration 1 GB load certification was
    not completed in the referenced environment.
-   A one-vCPU/one-gigabyte target is not a production capacity
    guarantee.
-   The `0.8.0-rc.17` package label and `0.4.0` visible installer add-on
    label must be reconciled against the exact release bundle before
    making release claims.

## 📜 License and upstream notices

The repository displays a GPL-3.0 license. The visible installer embeds
notices describing separately downloaded upstream components and their
licensing. In particular, the installer states that Nova Server is
separately downloaded and retains its own upstream license, while
AdGuard Home remains under its upstream GPL-3.0 license. It also
includes notices for OpenVPN integration conventions adapted from
another project.

Read these files before redistributing:

-   [`LICENSE`](./LICENSE)
-   [`SOURCES.md`](./SOURCES.md)
-   [`CHANGELOG.md`](./CHANGELOG.md)

Do not remove upstream copyright notices or imply that third-party
software has been relicensed by this project.

## 🤝 Contributing

Contributions should improve reliability, clarity, security and
maintainability.

### Suggested contribution workflow

1.  Open an issue describing the problem or proposal.
2.  Include the affected version and operating system.
3.  Provide a minimal reproduction where possible.
4.  Remove secrets and personal data from logs.
5.  Keep changes focused.
6.  Preserve upstream notices.
7.  Add or update tests for behavior changes.
8.  Update documentation when commands, ports or defaults change.
9.  Verify install, repair, check, backup and rollback behavior where
    relevant.
10. Submit a pull request with a clear summary and test evidence.

### Documentation contribution rules

-   Mark commands as **verified**, **documented**, or **illustrative**.
-   Never invent a port number.
-   State the bind address and protocol for every documented listener.
-   Distinguish public listeners from loopback-only listeners.
-   Keep release version, installer version and upstream version
    separate.
-   Record whether a feature is available in the current release or only
    planned.
-   Explain destructive actions before showing commands.

## 🌌 A final note

::: {align="center"}
### Build carefully. Expose intentionally. Back up relentlessly.

`<img src="https://capsule-render.vercel.app/api?type=waving&height=120&section=footer&color=0:06B6D4,50:5B21B6,100:050816" alt="Decorative footer"/>`{=html}

**Alirezaserver** · Server control with a focus on practical operations.

[⬆ Back to top](#alirezaserver)
:::
