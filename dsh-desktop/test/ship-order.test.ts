import { describe,it,expect } from 'vitest';
// @ts-ignore local ESM plugin
import { audit,cents } from '../packages/ship-order-tools/core.js';
import { readFileSync } from 'node:fs';
const order=JSON.parse(readFileSync(new URL('../ship-delivery/orders/demo003.json',import.meta.url),'utf8'));
describe('订单金额与边界',()=>{
 it('发现行金额错而表尾正确',()=>{const r=audit(order);expect(r.表尾加总一致).toBe(true);expect(r.按所列单价试算合计).toBe('70776.00');expect(r.明细[0].差额).toBe('1610.00');expect(r.状态).toBe('待工程师复核')});
 it('拒绝模糊金额和未知单位',()=>{expect(()=>cents('1,200')).toThrow();expect(()=>cents('-1')).toThrow();expect(()=>audit({...order,items:[{...order.items[0],unit:'公斤'}]})).toThrow()});
 it('拒绝不明确的舍入',()=>{expect(()=>audit({...order,items:[{...order.items[0],quantity:'0.01',unitPrice:'0.01'}]})).toThrow()});
});

it('保存原件指纹、拒绝越界、重复调用保留报告',async()=>{
 const {mkdtemp,writeFile,mkdir,readFile,rm}=await import('node:fs/promises');
 const {tmpdir}=await import('node:os');const {join}=await import('node:path');
 // @ts-ignore local ESM plugin
 const {readAndAudit}=await import('../packages/ship-order-tools/core.js');
 const dir=await mkdtemp(join(tmpdir(),'ship-order-'));
 try {
  await mkdir(join(dir,'orders'));const raw=JSON.stringify(order);await writeFile(join(dir,'orders','demo003.json'),raw);
  const [a,b]=await Promise.all([readAndAudit(dir,'demo003'),readAndAudit(dir,'demo003')]);
  expect(a).toEqual(b);expect(a.数据性质).toBe('模拟数据');expect(a.原件指纹).toMatch(/^[a-f0-9]{64}$/);
  expect(await readFile(join(dir,'orders','demo003.json'),'utf8')).toBe(raw);
  await expect(readAndAudit(dir,'../secret')).rejects.toThrow();
 } finally {await rm(dir,{recursive:true,force:true})}
});
