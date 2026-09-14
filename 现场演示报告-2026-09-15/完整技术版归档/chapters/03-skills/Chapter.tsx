import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './skills.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="skills-scene"><Visual kind={"paper"} title={"工程单"} note={"先把必填项定义清楚"} data={"项目名称|单位与数量|来源页码"}/></div>;
if(step === 1) return <div className="skills-scene"><Visual kind={"transfer"} title={"统一模板"} note={"相同任务，按同一套要求交付"} data={"工程明细|待确认项"}/></div>;
if(step === 2) return <div className="skills-scene"><Visual kind={"equation"} title={"确定计算"} note={"计算脚本示意"} data={"145 × 46|6,670 元"}/></div>;
if(step === 3) return <div className="skills-scene"><Visual kind={"stamp"} title={"规则审核"} note={"工艺版本与模型版本分别管理"} data={"适用条件|业务审核|版本留存"}/></div>;
return null;}