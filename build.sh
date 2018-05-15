#!/usr/bin/env bash
./install.sh
rm -rf client/dist
rm -rf server/public/dist
npm run build