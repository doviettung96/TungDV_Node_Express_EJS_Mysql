#!/bin/sh

if [ -z "2a135cb8949cdf4bd683a3b9f513e384a135f2f6" ]; then
    echo "You must set the GH_TOKEN environment variable."
    echo "See README.md for more details."
    exit 1
fi

# This will build, package and upload the app to GitHub.
node_modules/.bin/build --win --mac -p always