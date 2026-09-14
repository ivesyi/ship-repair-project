import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './offline.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="offline-scene"><Visual kind={"network"} title={"资料留在内部局域网"} note={"计划在内部查资料、处理订单、保存记录"} data={""}/></div>;
if(step === 1) return <div className="offline-scene"><Visual kind={"gate"} title={"在实际工作中确认好不好用"} note={"核对处理结果，确认断网后的使用情况"} data={"公开维修单试用|内部环境试用"}/></div>;
return null;}
