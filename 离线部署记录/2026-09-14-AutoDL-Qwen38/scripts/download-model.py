import json,subprocess,hashlib,time,pathlib,concurrent.futures,urllib.request,os,re
base=pathlib.Path('/root/autodl-tmp/qwen38-offline');meta=json.loads((base/'logs/model-repo.json').read_text());rev=meta['sha'];names=['Qwen3.8-27B-Q4_K_M.gguf','mmproj-Qwen3.8-27B-BF16.gguf']
def fetch(name):
 record=next(x for x in meta['siblings'] if x['rfilename']==name);url=f'https://huggingface.co/ggml-org/Qwen3.8-27B-GGUF/resolve/{rev}/{name}';dest=base/'models'/name
 print(time.asctime(),'开始',name,record['size'],flush=True)
 ms=json.loads((base/'logs/modelscope-files.json').read_text());entry=next(x for x in ms['Data']['Files'] if x['Path']==name);assert entry['Sha256']==record['lfs']['sha256'];mirror=f"https://modelscope.cn/models/ggml-org/Qwen3.8-27B-GGUF/resolve/{entry['Revision']}/{name}"
 final=mirror
 cleanenv={k:v for k,v in os.environ.items() if 'proxy' not in k.lower()}
 result=subprocess.run(['aria2c','--continue=true','--max-connection-per-server=16','--split=16','--min-split-size=16M','--file-allocation=none','--summary-interval=60','--console-log-level=warn','--download-result=hide','--max-tries=8','--retry-wait=5','--dir='+str(dest.parent),'--out='+name,'--input-file=-'],input=final+'\n  out='+name+'\n  dir='+str(dest.parent)+'\n',text=True,env=cleanenv,stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
 print(re.sub(r'https?://[^\s]+','[下载地址已省略]',result.stdout),flush=True)
 result.check_returncode()
 h=hashlib.sha256()
 with dest.open('rb') as f:
  for block in iter(lambda:f.read(8*1024*1024),b''):h.update(block)
 digest=h.hexdigest();expected=record['lfs']['sha256'];assert dest.stat().st_size==record['size'];assert digest==expected,(name,digest,expected)
 result={'file':name,'bytes':dest.stat().st_size,'sha256':digest,'source':url,'download_source':mirror,'revision':rev,'verified':True};(base/'artifacts'/(name+'.json')).write_text(json.dumps(result,ensure_ascii=False,indent=2));print(time.asctime(),'校验通过',name,flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as ex:list(ex.map(fetch,names))
