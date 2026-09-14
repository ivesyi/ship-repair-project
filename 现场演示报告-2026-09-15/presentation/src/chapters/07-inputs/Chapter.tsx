import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './inputs.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="inputs-scene"><Visual kind={"scan"} title={"文字识别 · OCR"} note={"功能示意：识别出的名称和数量，可对照原图核对"} data={"原图区域|名称、数量、单位"}/></div>;
if(step === 1) return <div className="inputs-scene"><Visual kind={"wave"} title={"语音转写 · ASR"} note={"功能示意：口述转文字，重要信息再确认"} data={"现场口述|转写后确认"}/></div>;
if(step === 2) return <div className="inputs-scene"><Visual kind={"camera"} title={"摄像头入口"} note={"功能示意：留下现场检查记录，方便回看与复核"} data={"检查记录|人工复核"}/></div>;
return null;}
