import {mkdir,readFile,writeFile,rename} from 'node:fs/promises';import {join} from 'node:path';import {randomUUID} from 'node:crypto';import {seedPlan} from './plan-data.js';
export async function readPlan(dir){await mkdir(dir,{recursive:true});try{return JSON.parse(await readFile(join(dir,'repair-plan.json'),'utf8'))}catch(e){if(e.code!=='ENOENT')throw e;return seedPlan()}}
export async function savePlan(dir,s){const tmp=join(dir,randomUUID()+'.tmp');await writeFile(tmp,JSON.stringify(s,null,2));await rename(tmp,join(dir,'repair-plan.json'))}
export function event(s,text){s.events.push({at:new Date().toISOString(),text})}
