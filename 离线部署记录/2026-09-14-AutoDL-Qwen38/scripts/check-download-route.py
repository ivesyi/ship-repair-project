import urllib.request,time
url='https://huggingface.co/ggml-org/Qwen3.8-27B-GGUF/resolve/0669b98607d47046c7c2b3f801011d54a08cfccf/mmproj-Qwen3.8-27B-BF16.gguf'
try:
 r=urllib.request.urlopen(urllib.request.Request(url,method='HEAD'),timeout=20);final=r.url
 opener=urllib.request.build_opener(urllib.request.ProxyHandler({}));start=time.monotonic()
 with opener.open(urllib.request.Request(final,headers={'Range':'bytes=0-1048575'}),timeout=15) as r: data=r.read(1048576);print('直接访问文件节点',r.status,len(data),'耗时',round(time.monotonic()-start,2))
except Exception as e: print('直接访问测试失败',type(e).__name__)
