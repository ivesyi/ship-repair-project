import pathlib,hashlib,json,subprocess,shutil
base=pathlib.Path(__file__).resolve().parent.parent
for pkg in ['libstdc++6','libgcc-s1','libssl3','libgomp1']:
 src=pathlib.Path('/usr/share/doc')/pkg/'copyright'
 if src.exists():shutil.copy2(src,base/'licenses'/(pkg+'-copyright'))
files=[]
for directory in ['runtime','scripts','models']:
 for p in sorted((base/directory).rglob('*')):
  if not p.is_file() or p.is_symlink():continue
  if directory=='models' and p.name not in ['Qwen3.8-27B-Q4_K_M.gguf','mmproj-Qwen3.8-27B-BF16.gguf']:continue
  h=hashlib.sha256()
  with p.open('rb') as f:
   for b in iter(lambda:f.read(8*1024*1024),b''):h.update(b)
  files.append(h.hexdigest()+'  '+str(p.relative_to(base)))
(base/'SHA256SUMS').write_text('\n'.join(files)+'\n')
subprocess.run(['tar','-czf',str(base/'artifacts/qwen38-runtime-linux-x86_64-sm120.tar.gz'),'-C',str(base),'runtime','scripts','licenses','SHA256SUMS'],check=True)
print('运行包已生成；两份模型文件需要单独搬运到 models 目录。目标为 Ubuntu 22.04、x86_64、RTX 5090。')
