const locks=new Map();
export function serial(dir,fn){const p=(locks.get(dir)||Promise.resolve()).catch(()=>{}).then(fn);locks.set(dir,p);return p;}
