import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './orders.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="orders-scene"><Visual kind={"archive"} title={"每单独立"} note={"新建订单不带入样例船的价格"} data={"订单甲|订单乙|空白新订单"}/></div>;
if(step === 1) return <div className="orders-scene"><Visual kind={"sop"} title={"接单到证据"} note={"每一步都有输入要求和完成标准"} data={"2"}/></div>;
if(step === 2) return <div className="orders-scene"><Visual kind={"sop"} title={"勘验到测算"} note={"数量、单价与范围都要说明依据"} data={"4"}/></div>;
if(step === 3) return <div className="orders-scene"><Visual kind={"sop"} title={"复核与退回"} note={"前序修改会让后续重新待复核"} data={"5"}/></div>;
if(step === 4) return <div className="orders-scene"><Visual kind={"sop"} title={"交付归档"} note={"本机保存、可导出备份；未实现团队同步"} data={"6"}/></div>;
return null;}