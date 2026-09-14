import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './products.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="products-scene"><Visual kind={"dialog"} title={"ChatGPT"} note={"通用任务助手 · 能力示意"} data={"研究一项问题|整理资料并使用工具"}/></div>;
if(step === 1) return <div className="products-scene"><Visual kind={"links"} title={"Claude Code"} note={"开发任务助手 · 能力示意"} data={"代码任务|开发工具|修改与验证"}/></div>;
if(step === 2) return <div className="products-scene"><Visual kind={"ports"} title={"Dify"} note={"应用搭建平台 · 能力示意"} data={"知识库|处理流程|业务应用"}/></div>;
if(step === 3) return <div className="products-scene"><Visual kind={"gate"} title={"现场选型"} note={"形态科普之后，再核查部署条件"} data={"产品能力|离线要求"}/></div>;
return null;}