import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './models.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="models-scene"><Visual kind={"select"} title={"同题比较"} note={"比较字段、依据与工程师修改量"} data={"同一维修任务|候选模型|人工评审"}/></div>;
if(step === 1) return <div className="models-scene"><Visual kind={"model"} title={"Qwen3-8B"} note={"拟测候选：字段任务资源基线"} data={"8"}/></div>;
if(step === 2) return <div className="models-scene"><Visual kind={"model"} title={"Qwen3-32B"} note={"拟测候选：复杂差异同题对照"} data={"32"}/></div>;
if(step === 3) return <div className="models-scene"><Visual kind={"model"} title={"DeepSeek-R1"} note={"拟测千问蒸馏版：Distill-Qwen-14B"} data={"14"}/></div>;
if(step === 4) return <div className="models-scene"><Visual kind={"gate"} title={"分别评测"} note={"完整模型与蒸馏模型不能混称效果相同"} data={"完整版本|蒸馏版本"}/></div>;
if(step === 5) return <div className="models-scene"><Visual kind={"balance"} title={"够用的资源"} note={"没有本项目排名，先测效果与开销"} data={"资源开销|任务效果"}/></div>;
if(step === 6) return <div className="models-scene"><Visual kind={"stamp"} title={"逐项准入"} note={"国产名称不能替代客户准入审查"} data={"具体版本|依赖与许可|供应主体"}/></div>;
return null;}