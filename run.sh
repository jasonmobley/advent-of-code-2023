#!/usr/bin/env bash

day="$1"

if [ -z $day ]; then
  echo "Specify which day to run, e.g. 01"
  exit 1
fi

node -r ts-node/register --no-warnings "src/$day"
