import {applyPlan} from './plan.js';
import {applyPaper} from './paper.js';
import {readFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID} from 'node:crypto';
import {loadState,saveState,change} from 'ship-order-tools/workbench.js';
export const name='ship-workbench';
export const inject=['connection','sessionController','attachments'];
import {serial} from './state-lock.js';
const format=s=>String(s).replace(/\b\d{1,3}(?:,\d{3})+(?:\.\d+)?\b/g,x=>x.replace(/,/g,''));
export function apply(ctx,config={}){
 applyPaper(ctx,config);
 applyPlan(ctx,config);

 const dir=config.dataRoot||resolve(process.env.DSH_HOME,'../ship-workbench');
 const assets={'/api/ship.paper.js':['paper-app.js','text/javascript'],'/api/ship.paper.css':['paper.css','text/css'],'/api/ship.workbench':['workbench.html','text/html'],'/api/ship.plan-workbench':['plan.html','text/html'],'/api/ship.hub.js':['hub.js','text/javascript'],'/api/ship.hub.css':['hub.css','text/css'],'/api/ship.paper-workbench':['paper.html','text/html'],'/api/ship.plan.js':['plan-app.js','text/javascript'],'/api/ship.plan.css':['plan.css','text/css'],'/api/ship.app.js':['app.js','text/javascript'],'/api/ship.style.css':['style.css','text/css'],'/api/ship.source.png':['source-page.png','image/png']};
 for(const [path,[file,type]] of Object.entries(assets))ctx.connection.fetch.register({path,methods:['GET'],requestBody:'buffered',fetch:async()=>new Response(await readFile(join(fileURLToPath(new URL('./public/',import.meta.url)),file)),{headers:{'content-type':type+'; charset=utf-8','cache-control':'no-store','content-security-policy':"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:"}})});
 async function refresh(s){
  for(const o of s.orders){
   if(!o.agentSessionId){if(o.advice){o.legacyAdvice=o.advice;o.advice='';}continue;}
   if(o.agentStatus!=='执行中')continue;
   const info=await ctx.sessionController.inspect(o.agentSessionId,new AbortController().signal);
   const ev=info.events.filter(e=>e.seq>=(o.agentStartSeq||0));
   const labels={'user/message':'提交订单任务','tool/call':'调用订单工具','tool/result':'工具返回结果','assistant/message':'模型生成回复','turn/end':'本轮结束'};
   o.agentTrace=ev.filter(e=>labels[e.type]).map(e=>({seq:e.seq,type:e.type,label:labels[e.type],name:e.data.name||'',failed:!!e.data.message?.isError}));
   const end=ev.findLast(e=>e.type==='turn/end');
   if(!end)continue;
   const tool=ev.filter(e=>e.type==='tool/result'&&!e.data.message?.isError);
   const messages=ev.filter(e=>e.type==='assistant/message');
   o.adviceRaw=messages.flatMap(e=>(e.data.message?.content||[]).filter(p=>p.type==='text').map(p=>p.text)).join('\n');
   o.advice=format(o.adviceRaw);
   const reason=end.data.reason?.kind;
   o.agentStatus=reason==='completed'&&o.advice&&tool.length?'已完成':reason==='max-tokens'?'回答未完成':reason==='aborted'?'已中断':'执行失败';
   o.adviceIncomplete=o.agentStatus!=='已完成';
   o.agentError=end.data.reason?.error?.message||'';
   s.events.unshift({at:new Date().toISOString(),text:'Harness 订单任务'+o.agentStatus+'：'+o.id});
  }
  return s;
 }
 ctx.connection.fetch.register({path:'/api/ship.action',methods:['POST'],requestBody:'buffered',fetch:async(request)=>{
  try{const {action,args={}}=await request.json();return await serial(dir,async()=>{
   let s=await refresh(await loadState(dir));
   if(action==='suggest'){
    const o=s.orders.find(x=>x.id===args.id);if(!o)throw Error('订单不存在');if(o.agentStatus==='执行中')throw Error('该订单任务正在执行');
    if(!o.agentSessionId){const result=await ctx.sessionController.create({cwd:dir,agentPreset:'ship-workbench'});o.agentSessionId=result.sessionId;await saveState(dir,s);}
    await ctx.sessionController.selectModel({sessionId:o.agentSessionId,provider:'ship-local',model:'qwen38-27b-q4'});
    const info=await ctx.sessionController.inspect(o.agentSessionId,new AbortController().signal);o.agentStartSeq=(info.events.at(-1)?.seq??-1)+1;o.agentStatus='执行中';o.advice='';o.agentTrace=[];await saveState(dir,s);
    try{await ctx.sessionController.prompt({sessionId:o.agentSessionId,requestId:randomUUID(),content:[{type:'text',text:'请处理模拟订单 '+o.id+'。先调用 ship_order_audit，再根据工具结果给出300字以内中文复核清单。不得批准采购，不得倒改数量。金额不加千位逗号。'}]},request.signal);}catch(e){o.agentStatus='执行失败';await saveState(dir,s);throw e;}
   }else if(action!=='state'&&action!=='export'){
    const o=s.orders.find(x=>x.id===args.id);if(o?.agentStatus==='执行中')throw Error('订单任务执行中，请等待完成后修改');
    s=change(s,action,args);
   }
   await saveState(dir,s);return Response.json(s);
  });}catch(e){console.error('ship action failed',e);return Response.json({error:e.message},{status:400});}
 }});
}
