import {describe,it,expect} from 'vitest'
// @ts-ignore local plugin module
import {seedPlan,history,calculate,totals,buildVersion,proposal} from '../packages/ship-workbench/plan-data.js'
describe('维修方案联动',()=>{
 it('十套历史案例均可完整核算',()=>{expect(history).toHaveLength(10);for(const c of history){expect(calculate(c.scope)).toHaveLength(6);expect(totals(calculate(c.scope)).total).toBeGreaterThan(0)}})
 it('增加取消新增共同影响材料与工时',()=>{const s=seedPlan();s.versions=[buildVersion(s,s.initial,'初案')];const quantities=[260,320,60,2,0,1];const ids=['clean','paint','zinc','valve','steer','pump'];const quotes=s.inspection.replace('勘验确认：','').replace('。','').split('；');const v=proposal(s,ids.map((id,i)=>({id,quantity:quantities[i],quote:quotes[i]})));expect(s.versions[0].totals).toEqual({material:11416,hours:133,labor:7980,total:19396});expect(v.totals).toEqual({material:18640,hours:177,labor:10620,total:29260});expect(v.changes[4].kind).toBe('取消');expect(v.changes[5].kind).toBe('新增')})
 it('拒绝没有原文支持的变更和非法数量',()=>{const s=seedPlan();s.versions=[buildVersion(s,s.initial,'初案')];expect(()=>proposal(s,[{id:'pump',quantity:8,quote:'新增冷却水泵更换1台'}])).toThrow();expect(()=>calculate({...s.initial,zinc:-1})).toThrow()})
})
