import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './change.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="change-scene"><Visual kind={"area"} title={"演示假设"} note={"除锈面积从145改成160平方米"} data={"145|160"}/></div>;
if(step === 1) return <div className="change-scene"><Visual kind={"equation"} title={"增加 690 元"} note={"沿用历史单价演示计算；两行合计变为61,456元"} data={"15 × 46|690 元"}/></div>;
return null;}
