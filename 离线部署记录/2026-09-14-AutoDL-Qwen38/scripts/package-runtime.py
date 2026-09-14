import pathlib,subprocess,shutil,json,hashlib
base=pathlib.Path(__file__).resolve().parent.parent;binpath=base/'src/llama.cpp-0.4.0/build/bin';target=base/'runtime';(target/'lib').mkdir(parents=True,exist_ok=True);
for item in binpath.iterdir():
 dest=target/'bin'/item.name;dest.parent.mkdir(exist_ok=True)
 if item.is_symlink():
  if dest.is_symlink() or dest.exists():dest.unlink()
  dest.symlink_to(item.readlink())
 elif item.is_file():shutil.copy2(item,dest)
output=subprocess.check_output(['ldd',str(binpath/'llama-server')],text=True);(base/'logs/runtime-ldd-final.txt').write_text(output)
exclude={'libcuda.so.1','libc.so.6','libm.so.6','libdl.so.2','libpthread.so.0','librt.so.1'}
manifest=[]
for line in output.splitlines():
 parts=line.split()
 if len(parts)>2 and parts[1]=='=>':
  name,path=parts[0],parts[2]
  if path=='not':raise RuntimeError(line)
  if path.startswith('/') and name not in exclude and not path.startswith(str(binpath)):
   dest=target/'lib'/name;shutil.copy2(path,dest);manifest.append({'library':name,'original_path':path,'bytes':dest.stat().st_size,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()})
(base/'artifacts/runtime-libraries.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
lic=base/'licenses';lic.mkdir(exist_ok=True);shutil.copy2(base/'src/llama.cpp-0.4.0/LICENSE',lic/'llama.cpp-LICENSE')
print('已打包运行程序和依赖库',len(manifest),'项；系统 glibc 和宿主驱动需另行安装')
