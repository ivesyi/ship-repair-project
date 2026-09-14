import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './offline.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="offline-scene"><Visual kind={"gate"} title={"资料边界"} note={"今天使用公开材料；内部资料留在允许环境"} data={"公开演示|客户内部资料"}/></div>;
if(step === 1) return <div className="offline-scene"><Visual kind={"network"} title={"局域网内部署"} note={"拟建：模型、资料和记录留在客户内部"} data={""}/></div>;
if(step === 2) return <div className="offline-scene"><Visual kind={"gate"} title={"云端测试 ≠ 离线验收"} note={"最终要在拟交付设备上验收"} data={"云端技术验证|客户设备离线验收"}/></div>;
if(step === 3) return <div className="offline-scene"><Visual kind={"results"} title={"云端初测已完成"} note={"2026年9月14日 · Qwen3.8-27B量化版本"} data={"文字 5.3秒|单页图片 8.4秒"}/></div>;
if(step === 4) return <div className="offline-scene"><Visual kind={"gate"} title={"先确认入场方式"} note={"录音明确：苹果电脑、手机、手表不能带入"} data={"合规设备与介质|客户现场确认"}/></div>;
return null;}