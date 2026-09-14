import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './source.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="source-scene"><Visual kind={"source"} title={"公开原件"} note={"中国渔政33012 · 2022维修采购预算"} data={"0"}/></div>;
if(step === 1) return <div className="source-scene"><Visual kind={"source"} title={"局部除锈"} note={"145平方米 × 46元／平方米 = 6,670元"} data={"1"}/></div>;
if(step === 2) return <div className="source-scene"><Visual kind={"equation"} title={"所选两行小计"} note={"不是全船报价"} data={"6,670 + 54,096|60,766 元"}/></div>;
return null;}
