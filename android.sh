#!/usr/bin/env bash

# Build on android. (to replace with Dockerfile)
npx ionic build
npx ionic capacitor run android -l --external # externals makes sure I use the wifi


