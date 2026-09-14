import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './framework.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="framework-scene"><Visual kind={"architecture"} title={"资料输入与识别"} note={"拟建框架：从原始材料形成统一字段"} data={"0"}/></div>;
if(step === 1) return <div className="framework-scene"><Visual kind={"architecture"} title={"历史资料与工艺规则"} note={"历史片段用于解释，确认规则用于计算"} data={"1"}/></div>;
if(step === 2) return <div className="framework-scene"><Visual kind={"architecture"} title={"智能体组织工具调用"} note={"任务决定技能与工具，权限限定操作"} data={"2"}/></div>;
if(step === 3) return <div className="framework-scene"><Visual kind={"architecture"} title={"确定计算与回写"} note={"数量、单价和依据一起进入订单"} data={"3"}/></div>;
if(step === 4) return <div className="framework-scene"><Visual kind={"architecture"} title={"工程师复核"} note={"资料变化后，相关结果重新核对"} data={"4"}/></div>;
if(step === 5) return <div className="framework-scene"><Visual kind={"architecture"} title={"多订单复用"} note={"当前已有流程原型；自动识别和检索待接入"} data={"5"}/></div>;
return null;}