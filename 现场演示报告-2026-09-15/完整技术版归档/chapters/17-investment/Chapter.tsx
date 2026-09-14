import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './investment.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="investment-scene"><Visual kind={"links"} title={"更新前先复测"} note={"旧订单未退步，再决定升级；保留可回退版本"} data={"旧版本|回归测试|升级或回退"}/></div>;
if(step === 1) return <div className="investment-scene"><Visual kind={"book"} title={"交付要能接手"} note={"部署包、数据结构、版本清单与培训一并交接"} data={"部署资源|操作文档|维护交接"}/></div>;
if(step === 2) return <div className="investment-scene"><Visual kind={"queue"} title={"10人使用 ≠ 10人并发"} note={"以同时处理的长文件和图片任务做压力测试"} data={""}/></div>;
if(step === 3) return <div className="investment-scene"><Visual kind={"balance"} title={"正式报价拆开列"} note={"软件服务范围与设备采购分别说明"} data={"设备费用|整理、开发与维护"}/></div>;
if(step === 4) return <div className="investment-scene"><Visual kind={"hardware"} title={"硬件成本，按实测配置"} note={"20—30万元仅为会中口头硬件粗估，不是正式总报价"} data={"本地计算|本地存储|备份资源"}/></div>;
return null;}