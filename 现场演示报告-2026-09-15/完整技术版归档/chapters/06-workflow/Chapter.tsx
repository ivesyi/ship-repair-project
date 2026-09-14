import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './workflow.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="workflow-scene"><Visual kind={"archive"} title={"10年以上"} note={"已有电子资料，从同类任务切入"} data={"工程明细|历史方案|验收记录"}/></div>;
if(step === 1) return <div className="workflow-scene"><Visual kind={"paper"} title={"接单建档"} note={"先明确本次任务条件"} data={"船型|修理等级|初始工程明细"}/></div>;
if(step === 2) return <div className="workflow-scene"><Visual kind={"hull"} title={"勘验补充"} note={"用本次现场发现确定范围"} data={"原定范围|实际损伤"}/></div>;
if(step === 3) return <div className="workflow-scene"><Visual kind={"select"} title={"指定参照船"} note={"工程师先选一份适用历史方案"} data={"历史档案|指定参照|本次任务"}/></div>;
if(step === 4) return <div className="workflow-scene"><Visual kind={"diff"} title={"逐项对照"} note={"每处增减都保留依据"} data={"保留项目|新增项目|取消项目"}/></div>;
if(step === 5) return <div className="workflow-scene"><Visual kind={"gap"} title={"成果草稿"} note={"缺定额的部分交工程师确认"} data={"材料与预成本|工时待依据"}/></div>;
return null;}