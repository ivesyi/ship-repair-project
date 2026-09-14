import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './gaps.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="gaps-scene"><Visual kind={"gap"} title={"面积 ≠ 耗量"} note={"涂装面积无法直接给出油漆公斤数"} data={"已知平方米|缺少耗用定额"}/></div>;
if(step === 1) return <div className="gaps-scene"><Visual kind={"gate"} title={"金额 ≠ 工时"} note={"还需工艺和现场作业条件"} data={"历史金额|工时待依据"}/></div>;
if(step === 2) return <div className="gaps-scene"><Visual kind={"book"} title={"工艺卡"} note={"让书面规则能够复核"} data={"适用条件|规则版本|审核人"}/></div>;
if(step === 3) return <div className="gaps-scene"><Visual kind={"gate"} title={"老师傅的判断"} note={"经验梳理后保留适用边界"} data={"经验访谈|工程师判断"}/></div>;
if(step === 4) return <div className="gaps-scene"><Visual kind={"gap"} title={"待报价"} note={"已知小计可以计算，未决项目保留"} data={"已有价格|新增项目待报价"}/></div>;
return null;}