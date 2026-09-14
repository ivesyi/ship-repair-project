import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './history.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="history-scene"><Visual kind={"photo"} title={"1956"} note={"人工智能成为研究议题"} data={"dartmouth.png"}/></div>;
if(step === 1) return <div className="history-scene"><Visual kind={"links"} title={"2017"} note={"词语之间的联系"} data={"输入词语|注意力机制|语言表示"}/></div>;
if(step === 2) return <div className="history-scene"><Visual kind={"dialog"} title={"2022"} note={"对话成为入口"} data={"请帮我整理这份文件|先提取内容，再形成文字草稿"}/></div>;
if(step === 3) return <div className="history-scene"><Visual kind={"ports"} title={"2024"} note={"工具有了标准连接方式"} data={"助手|MCP|外部工具"}/></div>;
if(step === 4) return <div className="history-scene"><Visual kind={"book"} title={"2025"} note={"需要时，载入作业方法"} data={"任务说明|模板与脚本|按需载入"}/></div>;
return null;}