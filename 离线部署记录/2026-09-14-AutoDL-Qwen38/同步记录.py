import subprocess,time,pathlib,datetime
base=pathlib.Path(__file__).resolve().parent
host='root@connect.westd.seetacloud.com'
remote='/root/autodl-tmp/qwen38-offline'
ssh=['ssh','-o','BatchMode=yes','-o','ConnectTimeout=10','-S','/tmp/ship-qwen38-ssh.sock','-p','23606',host]
scp=['scp','-o','BatchMode=yes','-o','ConnectTimeout=10','-o','ControlPath=/tmp/ship-qwen38-ssh.sock','-P','23606']
for attempt in range(150):
 try:
  result=subprocess.run(ssh+[f"if test -f {remote}/artifacts/package-completed.txt; then echo PACKAGE_DONE; fi; du -h {remote}/models/Qwen3.8-27B-Q4_K_M.gguf; tail -n 5 {remote}/logs/run-when-ready.log"],capture_output=True,text=True,timeout=20)
  if result.returncode:raise RuntimeError('连接暂不可用；远端后台任务不受此同步失败影响')
  subprocess.run(scp+['-r',host+':'+remote+'/logs',host+':'+remote+'/scripts',str(base)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,timeout=90)
  done='PACKAGE_DONE' in result.stdout
  (base/'当前状态.md').write_text('# 部署当前状态\n\n更新时间：'+datetime.datetime.now().astimezone().isoformat()+'\n\n'+('自动启动、请求测试及打包已结束。需要人工检查模型回答；并不代表客户离线环境验收通过。' if done else '后台下载／部署仍在进行。具体结果以日志为准。')+'\n\n```text\n'+result.stdout+'\n```\n')
  if done:
   subprocess.run(scp+['-r',host+':'+remote+'/artifacts',host+':'+remote+'/SHA256SUMS',str(base)],check=True,timeout=600)
   break
 except Exception as e:
  with (base/'同步状态.log').open('a') as f:f.write(datetime.datetime.now().isoformat()+' '+str(e)+'\n')
 time.sleep(60)
