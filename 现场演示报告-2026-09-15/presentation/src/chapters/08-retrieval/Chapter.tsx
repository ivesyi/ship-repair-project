import type { ChapterStepProps } from '../../registry/types';
import { Visual } from '../../components/Visual';
import './retrieval.css';
export default function Chapter({step}:ChapterStepProps){
if(step === 0) return <div className="retrieval-scene"><Visual kind={"links"} title={"先查资料，再回答"} note={"检索增强生成 · RAG：让回答参考自己的历史档案"} data={"检索片段|辅助生成|回答草稿"}/></div>;
if(step === 1) return <div className="retrieval-scene"><Visual kind={"paper"} title={"结论旁的证据"} note={"相似文字仍需核对适用性"} data={"文件名|页码|版本"}/></div>;
return null;}
