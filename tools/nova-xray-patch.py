#!/usr/bin/env python3
"""Patch only the hash-verified initial Nova installer's Xray download stage."""
import pathlib,sys
OLD='if bash "$XRAY_SH" "${XRAY_ARGS[@]}" >"$XRAY_LOG" 2>&1; then'
NEW='''# Bound the entire child process group, including the installer's own curl.
  # XTLS defines its own curl function, so exporting a wrapper is insufficient.
  say "Xray upstream installation: live output; maximum 240 seconds, then verified mirror fallback."
  if timeout --signal=TERM --kill-after=10s 240s bash "$XRAY_SH" "${XRAY_ARGS[@]}" 2>&1 | tee "$XRAY_LOG"; then'''
def patch(source):
    replacements=[(OLD,NEW),
      ('curl -fsSL --max-time 60 -o "$out" "$u" 2>/dev/null','curl -fSL --connect-timeout 15 --max-time 60 --speed-time 30 --speed-limit 1024 --proto "=https" --proto-redir "=https" -o "$out" "$u"'),
      ('curl -fsSL --max-time 30 -H "Accept: application/vnd.github.v3+json"','curl -fsSL --connect-timeout 15 --max-time 30 -H "Accept: application/vnd.github.v3+json"'),
      ('curl -fsSL --max-time 300 --proto-redir \'=https\' "$XRAY_MIRROR_BASE/$_asset"','curl -fSL --connect-timeout 20 --max-time 300 --speed-time 30 --speed-limit 1024 --proto \'=https\' --proto-redir \'=https\' "$XRAY_MIRROR_BASE/$_asset"'),
      ('install -m 0755 "$_d/xray" /usr/local/bin/xray', 'timeout --kill-after=2s 10s "$_d/xray" version >/dev/null 2>&1 || { rm -rf "$_d"; return 1; }\n  install -m 0755 "$_d/xray" /usr/local/bin/xray'),
      ('XRAY_BIN="$(command -v xray || echo /usr/local/bin/xray)"\nok "xray', 'XRAY_BIN="$(command -v xray || echo /usr/local/bin/xray)"\ntimeout --kill-after=2s 10s "$XRAY_BIN" version >/dev/null 2>&1 || die "xray binary is missing or unusable; installation is incomplete."\nok "xray')]
    for old,new in replacements:
        if source.count(old)!=1:raise ValueError('Unsupported Nova installer contract: '+old[:65])
        source=source.replace(old,new)
    return source
if __name__=='__main__':
    p=pathlib.Path(sys.argv[1]);s=patch(p.read_text());p.write_text(s)
