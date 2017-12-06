#! /usr/bin/env bash
rm -rf ./dist ./browser

npm run build

npm run build:test
