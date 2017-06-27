#!/bin/sh

# This will build, package and upload the app to GitHub.
node_modules/.bin/build --win --x64 --ia32
rm -rf wwwroot
mkdir -p wwwroot
cp dist/*.yml wwwroot/
cp dist/*.exe wwwroot/
# node_modules/.bin/http-server wwwroot/ -p 8080