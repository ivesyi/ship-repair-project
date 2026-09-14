import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './change.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="change-scene"><Visual kind={"hull"} title={"测厚改变范围"} note={"Hydrex鹿特丹案例 · 根据公开报道绘制示意"} data={"原先预计|扩大损伤"}/></div>;
if(step === 1) return <div className="change-scene"><Visual kind={"links"} title={"现场发现推动修订"} note={"公开案例记载更换两块新板并进行独立无损检测"} data={"测厚检查|修复调整|检验确认"}/></div>;
if(step === 2) return <div className="change-scene"><Visual kind={"area"} title={"演示假设"} note={"除锈面积从145改成160平方米"} data={"145|160"}/></div>;
if(step === 3) return <div className="change-scene"><Visual kind={"equation"} title={"增加 690 元"} note={"沿用历史单价演示计算；两行合计变为61,456元"} data={"15 × 46|690 元"}/></div>;
if(step === 4) return <div className="change-scene"><Visual kind={"gate"} title={"事实与假设分开"} note={"采购原件不能用来给Hydrex案例报价"} data={"真实维修报道|独立改数演示"}/></div>;
return null;}