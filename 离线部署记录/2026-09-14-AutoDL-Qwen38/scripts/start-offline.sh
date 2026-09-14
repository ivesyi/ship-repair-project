#!/usr/bin/env bash
set -euo pipefail
base=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
export LD_LIBRARY_PATH="$base/runtime/lib:$base/runtime/bin${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
unset http_proxy https_proxy all_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY
exec "$base/runtime/bin/llama-server" \
 --model "$base/models/Qwen3.8-27B-Q4_K_M.gguf" \
 --mmproj "$base/models/mmproj-Qwen3.8-27B-BF16.gguf" \
 --alias qwen38-27b-q4 --ctx-size 131072 --parallel 1 \
 --gpu-layers 99 --flash-attn on --jinja --reasoning off \
 --offline --host 127.0.0.1 --port 8080
