import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './inputs.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="inputs-scene"><Visual kind={"scan"} title={"文字识别 · OCR"} note={"拟建：扫描件字段必须能回到原图"} data={"原图区域|名称、数量、单位"}/></div>;
if(step === 1) return <div className="inputs-scene"><Visual kind={"wave"} title={"语音转写 · ASR"} note={"拟建：船名、规格、数量重点复核"} data={"现场口述|转写后确认"}/></div>;
if(step === 2) return <div className="inputs-scene"><Visual kind={"wave"} title={"语音合成 · TTS"} note={"拟建：读出待办提醒"} data={"待办文字|语音提醒"}/></div>;
if(step === 3) return <div className="inputs-scene"><Visual kind={"camera"} title={"摄像头入口"} note={"拟建：事件识别另做样本与误报测试"} data={"检查记录|人工复核"}/></div>;
if(step === 4) return <div className="inputs-scene"><Visual kind={"ports"} title={"统一进入订单"} note={"以上输入模块尚未接入工作台"} data={"输入模块|统一字段|订单"}/></div>;
return null;}