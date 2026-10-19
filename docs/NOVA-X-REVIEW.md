# Current integration scope

Reference: NOVA-X-PANEL commit e0931b3c5834dab9d5406489033ac89bb95056c6. Host: pinned Nova 1.85.4 commit 17e9373ec17ceede95369fcd26d6fabfda83b504. This work continues the authoritative recovered installer payload, not alirezapanel.

- Manual inbound workflow uses real native forms and handlers, with existing presets preserved. OpenVPN is inline in Inbounds and retains its own backend data/certificates.
- Hosts use the native API with grouped multi-inbound/multi-address editing and concurrent-write protection.
- Existing managed Hashem tunnel integration and independent carrier source are retained, not replaced by a new mock transport.
- The independent Alirezabot application is the supplied upstream Mirza app, with original functions/assets/licenses and explicit branding/integration patches. rc.6 adds validated appearance controls and repairs its mounted keyboard route. It is not a rewrite of the whole bot and not a claim that every upstream feature has been validated.
- AI and remote alirezadns retain existing real APIs. AdGuard's code and interface are unchanged by rc.6.

Bot standalone pages remain largely upstream Persian; native addon interfaces support their existing Persian/English flows. Actual screenshots and WAN/client tests are not available from this environment. Sources/licensing limitations for compiled upstream assets are in SOURCES.md.
