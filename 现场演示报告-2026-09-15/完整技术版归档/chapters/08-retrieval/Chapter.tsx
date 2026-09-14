import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './retrieval.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="retrieval-scene"><Visual kind={"archive"} title={"整理内部档案"} note={"版本与适用范围先清理"} data={"原始文件|分段整理|建立索引"}/></div>;
if(step === 1) return <div className="retrieval-scene"><Visual kind={"select"} title={"找到相关片段"} note={"船型、等级、维修部位和日期一起核对"} data={"新需求|相关片段|指定参照"}/></div>;
if(step === 2) return <div className="retrieval-scene"><Visual kind={"links"} title={"检索增强生成 · RAG"} note={"先把相关资料交给模型"} data={"检索片段|辅助生成|回答草稿"}/></div>;
if(step === 3) return <div className="retrieval-scene"><Visual kind={"paper"} title={"结论旁的证据"} note={"相似文字仍需核对适用性"} data={"文件名|页码|版本"}/></div>;
if(step === 4) return <div className="retrieval-scene"><Visual kind={"gap"} title={"没有依据"} note={"接知识库不等于训练模型"} data={"已找到的证据|缺口待确认"}/></div>;
return null;}