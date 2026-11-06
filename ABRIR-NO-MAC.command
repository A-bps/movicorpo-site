#!/bin/bash
# Abre a demonstracao do site MoviCorpo no Mac.
cd "$(dirname "$0")" || exit 1
PORTA=5174
(sleep 1.5; open "http://localhost:$PORTA") &
if command -v node >/dev/null 2>&1; then
  node servir.js
else
  python3 -m http.server $PORTA
fi
