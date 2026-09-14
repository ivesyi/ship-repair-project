import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './investment.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="investment-scene"><Visual kind={"hardware"} title={"支撑内部使用的设备投入"} note={"用于本地运行、资料存储与备份；配置根据实际需要确定"} data={"本地计算|本地存储|备份资源"}/></div>;
return null;}
