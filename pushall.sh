#!/usr/bin/env bash
read -p "Introduce el mensaje del commit: " msg
git add .
git commit -m "$msg"
git push
