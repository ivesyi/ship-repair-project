import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './connect.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="connect-scene"><Visual kind={"transfer"} title={"从方法到动作"} note={"拟建工具示意"} data={"查历史资料|调用计算器"}/></div>;
if(step === 1) return <div className="connect-scene"><Visual kind={"ports"} title={"MCP"} note={"模型上下文协议"} data={"助手|标准连接|工具"}/></div>;
if(step === 2) return <div className="connect-scene"><Visual kind={"gap"} title={"连接之后"} note={"资料和工具仍需实际接入"} data={"连接已约定|业务资料待接入"}/></div>;
if(step === 3) return <div className="connect-scene"><Visual kind={"gate"} title={"访问权限"} note={"查询与写回分开授权"} data={"只读历史档案|写入订单草稿"}/></div>;
return null;}