#!/usr/bin/env bash
set -euo pipefail
export PATH=/usr/local/cuda-12.8/bin:$PATH
base=/root/autodl-tmp/qwen38-offline
cd "$base/src/llama.cpp-0.4.0"
cmake -S . -B build -DGGML_CUDA=ON -DGGML_CUDA_NCCL=OFF -DCMAKE_CUDA_ARCHITECTURES=120 -DGGML_NATIVE=OFF -DLLAMA_BUILD_TESTS=OFF -DLLAMA_USE_PREBUILT_UI=OFF -DLLAMA_BUILD_UI=OFF -DCMAKE_BUILD_TYPE=Release
cmake --build build --target llama-server llama-cli -j 12
./build/bin/llama-server --version
