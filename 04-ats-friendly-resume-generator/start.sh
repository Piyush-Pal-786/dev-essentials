#!/usr/bin/env bash
set -e

if ! command -v node &>/dev/null; then
  echo ""
  echo " Node.js is not installed."
  echo " Please download and install it from: https://nodejs.org"
  echo ""
  exit 1
fi

echo ""
echo " Installing dependencies (first run only)..."
npm install --silent

echo ""
echo " Starting ATS Resume Generator..."
echo " Opening http://localhost:5173 ..."
echo ""

# Open browser after 2 s
(sleep 2 && (open "http://localhost:5173" 2>/dev/null || xdg-open "http://localhost:5173" 2>/dev/null || true)) &

npm run dev
