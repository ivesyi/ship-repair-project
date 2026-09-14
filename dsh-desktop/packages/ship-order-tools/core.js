import { readFile, mkdir, writeFile, link, unlink } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
export function cents(value) {
  if (typeof value !== 'string' || !/^\d{1,12}(\.\d{1,2})?$/.test(value)) throw new Error('金额必须是非负十进制字符串，最多两位小数');
  const [a,b=''] = value.split('.'); return BigInt(a)*100n+BigInt(b.padEnd(2,'0'));
}
export const money = n => `${n < 0n ? '-' : ''}${(n < 0n ? -n : n)/100n}.${String((n < 0n ? -n : n)%100n).padStart(2,'0')}`;
export function audit(order) {
  if (!Array.isArray(order.items) || !order.items.length) throw new Error('订单明细不能为空');
  const ids=new Set(); let total=0n, entered=0n;
  const rows=order.items.map(row=>{
    if (!row.id || ids.has(row.id)) throw new Error('项目编号缺失或重复'); ids.add(row.id);
    if (!['平方米','块'].includes(row.unit)) throw new Error('不支持的计价单位，转人工复核');
    const qty=cents(row.quantity), price=cents(row.unitPrice), original=cents(row.amount);
    const product=qty*price;
    if(product%100n) throw new Error('金额存在分以下尾数，需明确舍入规则');
    const calculated=product/100n; total+=calculated; entered+=original;
    return {项目:row.id,数量:row.quantity,单位:row.unit,原金额:money(original),试算金额:money(calculated),差额:money(calculated-original)};
  });
  return {订单编号:order.id,数据性质:order.simulated===true?'模拟数据':'业务数据（待核实）',状态:'待工程师复核',明细:rows,原表合计:order.total,录入行加总:money(entered),表尾加总一致:entered===cents(order.total),按所列单价试算合计:money(total),单价依据:order.priceSource??'未提供',备注:order.note??'',限制:['以上为按所列单价试算，不是现行报价或结算批准。','数量与金额冲突时依据实测签认核实，不得倒改数量配平金额。','需核验当前单价、工程量及计价单位，人工签认前禁止采购。']};
}
export async function readAndAudit(base,id) {
  if(!/^[a-zA-Z0-9_-]{1,64}$/.test(id)) throw new Error('订单编号格式不正确');
  const raw=await readFile(join(resolve(base),'orders',id+'.json'),'utf8');
  const order=JSON.parse(raw); if(order.id!==id) throw new Error('文件编号与订单不一致');
  const hash=createHash('sha256').update(raw).digest('hex');
  const report={...audit(order),原件指纹:hash};
  const out=join(resolve(base),'reviews'); await mkdir(out,{recursive:true});
  const target=join(out,id+'-'+hash+'.json');
  const temp=join(out,'.'+randomUUID()+'.tmp');
  await writeFile(temp,JSON.stringify(report,null,2),{flag:'wx'});
  try { await link(temp,target); }
  catch(error) { if(error.code!=='EEXIST') throw error; return JSON.parse(await readFile(target,'utf8')); }
  finally { await unlink(temp); }
  return report;
}
