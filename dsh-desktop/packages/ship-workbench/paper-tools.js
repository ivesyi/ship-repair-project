import {resolve} from 'node:path';
import {defineTool} from '@deepseek-ai/dsh-tools';
import {readPaper,savePaper,checkPaper,archivePaper} from './paper-state.js';
import {serial} from './state-lock.js';
export const name='ship-paper-tools';export const inject=['tools'];
export function apply(ctx,config={}){const dir=config.dataRoot||resolve(process.env.DSH_HOME,'../ship-workbench');for(const [name,fn,task] of [['ship_paper_check',checkPaper,'review'],['ship_paper_archive',archivePaper,'archive']])ctx.tools.register(defineTool({name,description:task==='review'?'读取当前纸单已由人确认的电子明细，程序核算并保存问题清单。':'检查所有问题已人工说明，保存待正式审批档案；不批准采购。',parameters:{orderId:{type:'string',required:true,description:'纸单订单编号'}},output:{schema:{type:'string'},render:(_a,v)=>[{type:'text',text:v}]},execute:({orderId},exec)=>serial(dir+'/paper',async()=>{const s=await readPaper(dir),o=s.orders.find(x=>x.id===orderId);if(!o||o.session!==exec.agent?.session.id||o.task!==task||!o.running)throw Error('该会话没有当前纸单任务权限');const result=fn(o);o.toolCalls=(o.toolCalls||0)+1;await savePaper(dir,s);return JSON.stringify(result)})}));}
