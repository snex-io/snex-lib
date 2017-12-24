#! /usr/bin/env bash
rm -rf ./dist ./browser

yarn run build

yarn run test:postbuild
