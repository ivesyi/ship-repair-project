#!/usr/bin/env bash
set -eu
base=/root/autodl-tmp/qwen38-offline
{ date -Is; cat /etc/os-release; uname -m; nvidia-smi; /usr/local/cuda-12.8/bin/nvcc --version; python --version; cmake --version; gcc --version; git --version; df -h / /root/autodl-tmp; } > "$base/logs/environment.txt"
dpkg-query -W -f='${Package}\t${Version}\n' > "$base/logs/system-packages.tsv"
python -m pip list --format=json > "$base/logs/python-packages.json"
