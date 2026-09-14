import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './pilot.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="pilot-scene"><Visual kind={"ten"} title={"10 → 11"} note={"验证设计：十套参照，留出一套新需求"} data={""}/></div>;
if(step === 1) return <div className="pilot-scene"><Visual kind={"gap"} title={"当前资料范围"} note={"尚无十套完整同类公开档案"} data={"真实公开原件|完整历史集待准备"}/></div>;
if(step === 2) return <div className="pilot-scene"><Visual kind={"ten"} title={"答案不进入参照"} note={"测试前留出一单，防止把答案带进资料库"} data={""}/></div>;
if(step === 3) return <div className="pilot-scene"><Visual kind={"paper"} title={"工程师逐项评"} note={"记录错误、人工修改和完成时间"} data={"错误项|修改量|总耗时"}/></div>;
if(step === 4) return <div className="pilot-scene"><Visual kind={"gate"} title={"确定一类任务"} note={"现场一起明确资料负责人、复核人与环境"} data={"任务范围|责任与环境"}/></div>;
return null;}