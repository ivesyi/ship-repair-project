import {resolve} from 'node:path';
import {defineTool} from '@deepseek-ai/dsh-tools';
import {loadState,saveState} from 'ship-order-tools/workbench.js';
import {audit} from 'ship-order-tools/core.js';
import {serial} from './state-lock.js';
export const name='ship-workbench-tools';
export const inject=['tools'];
export function apply(ctx,config={}){
 const dir=config.dataRoot||resolve(process.env.DSH_HOME,'../ship-workbench');

  ctx.tools.register(defineTool({name:'ship_order_audit',description:'读取当前会话所关联的订单原件，程序核算金额并返回原件数据和差异。必须先调用再分析，不可批准采购。',parameters:{orderId:{type:'string',required:true,description:'当前订单编号'}},output:{schema:{type:'string'},render:(_a,value)=>[{type:'text',text:value}]},execute:({orderId},exec)=>serial(dir,async()=>{
   const s=await loadState(dir),o=s.orders.find(x=>x.id===orderId);
   if(!o||o.agentSessionId!==exec.agent?.session.id)throw Error('该会话未关联此订单');
   o.report=audit(o);o.agentToolCalls=(o.agentToolCalls||0)+1;
   s.events.unshift({at:new Date().toISOString(),text:'Harness Agent 执行订单核算工具：'+orderId});await saveState(dir,s);
   return JSON.stringify({...o.report,前序复核意见:(o.checks||[]).map((结论,步骤)=>({步骤:步骤+1,结论})),资料问题:s.documents.filter(d=>(d.orderId||'demo003')===o.id).map(d=>({资料:d.name,疑点:d.issue,确认记录:d.review||'待确认'})),关联案例:(o.references||[]).map(id=>s.knowledge.find(k=>k.id===id)).filter(Boolean)});
  })}));

}
