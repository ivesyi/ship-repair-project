import { defineTool } from '@deepseek-ai/dsh-tools';
import { readAndAudit } from './core.js';
export const name='ship-order-tools';
export const inject=['tools'];
export function apply(ctx,config) {
  if (!config?.dataRoot) throw new Error('必须配置订单资料目录');
  ctx.tools.register(defineTool({
    name:'ship_order_audit',
    description:'读取指定订单原件，用程序核算金额并保存带原件指纹的待复核报告。只能生成试算，不能批准采购。',
    parameters:{orderId:{type:'string',required:true,description:'订单编号'}},
    output:{schema:{type:'string'},render:(_args,value)=>[{type:'text',text:value}]},
    async execute({orderId}) {return JSON.stringify(await readAndAudit(config.dataRoot,orderId));}
  }));
}
