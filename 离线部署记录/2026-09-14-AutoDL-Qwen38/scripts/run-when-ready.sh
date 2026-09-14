#!/usr/bin/env bash
set -euo pipefail
base=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
cd "$base"
echo "$(date -Is) 等待最终构建与模型校验"
for attempt in $(seq 1 360); do
 if grep -q 'built with GNU' logs/build-runtime-final.log && test -f artifacts/Qwen3.8-27B-Q4_K_M.gguf.json && test -f artifacts/mmproj-Qwen3.8-27B-BF16.gguf.json; then break; fi
 if test "$attempt" -eq 360; then echo '等待超时，尚未启动服务'; exit 1; fi
 sleep 20
done
python scripts/package-runtime.py
LD_LIBRARY_PATH="$base/runtime/lib:$base/runtime/bin" ldd runtime/bin/llama-server > logs/packaged-ldd.txt
if grep -q 'not found' logs/packaged-ldd.txt; then echo '运行库缺失'; exit 1; fi
nohup bash scripts/start-offline.sh > logs/server.log 2>&1 &
echo $! > logs/server.pid
for attempt in $(seq 1 120); do
 if curl --noproxy '*' -fsS http://127.0.0.1:8080/health > artifacts/health.json; then break; fi
 if ! kill -0 "$(cat logs/server.pid)" 2>/dev/null; then echo '服务启动失败'; exit 1; fi
 if test "$attempt" -eq 120; then echo '健康检查超时'; exit 1; fi
 sleep 5
done
nvidia-smi > logs/gpu-after-load.txt
python scripts/acceptance.py > logs/acceptance.log 2>&1
nvidia-smi > logs/gpu-after-tests.txt
echo "$(date -Is) 已完成首轮请求，业务内容待人工检查" > artifacts/first-run-completed.txt
python scripts/finalize-package.py > logs/finalize-package.log 2>&1
bash scripts/inventory.sh
date -Is > artifacts/package-completed.txt
