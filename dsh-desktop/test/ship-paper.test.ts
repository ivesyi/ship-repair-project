import {it,expect} from 'vitest'
// @ts-ignore business module
import {draftOf,validateDraft,checkPaper,decide,archivePaper} from '../packages/ship-workbench/paper-state.js'
function order(){return {phase:3,history:[],source:{name:'模拟单'},confirmed:{vessel:'示例船',date:'2026-09-14',total:'150.00',note:'每块5公斤',items:[{id:'1',name:'锌块',quantity:'2',unit:'块',unitPrice:'100.00',amount:'150.00'}]}}}
it('识别草稿保留不清晰内容，但人工确认前必须补齐数字',()=>{const raw={...order().confirmed,items:[{...order().confirmed.items[0],quantity:'',box:[1,2,3,4]}]};const draft=draftOf(raw);expect(draft.items[0].quantity).toBe('');expect(()=>validateDraft(draft)).toThrow();expect(draftOf({...raw,items:[{...raw.items[0],box:[10,20,5,1]}]}).items[0].box).toBeNull()})
it('核算保留原金额，问题未处理不能归档，待补充仍阻断',()=>{const o:any=order();checkPaper(o);expect(o.report.total).toBe('200.00');expect(o.confirmed.items[0].amount).toBe('150.00');expect(o.issues).toHaveLength(3);o.task='archive';expect(()=>archivePaper(o)).toThrow();decide(o,o.issues[0].id,'需补报价','待补充');expect(()=>archivePaper(o)).toThrow();for(const issue of o.issues)decide(o,issue.id,'演练：依据已说明，提交正式审批复核','已说明');archivePaper(o);expect(o.archive.status).toBe('待正式审批');expect(o.archive.confirmed.items[0].amount).toBe('150.00')})
it('分以下尾数不能伪造总额',()=>{const o:any=order();o.confirmed.items[0].quantity='0.01';o.confirmed.items[0].unitPrice='0.01';checkPaper(o);expect(o.report.total).toBeNull();expect(o.issues.some((x:any)=>x.title.includes('分以下'))).toBe(true)})

it('图片经编码进入会话，草稿确认后才启动检查',async()=>{
 const {mkdtemp,rm}=await import('node:fs/promises');const {tmpdir}=await import('node:os');const {join}=await import('node:path');
 // @ts-ignore local plugin
 const {applyPaper}=await import('../packages/ship-workbench/paper.js');
 const dir=await mkdtemp(join(tmpdir(),'paper-flow-'));try{const routes=new Map();const events=new Map();const prompts:any[]=[];let count=0;
 applyPaper({connection:{fetch:{register:(r:any)=>routes.set(r.path,r)}},attachments:{saveImage:async()=>({})},sessionController:{create:async()=>{const sessionId='test-'+(++count);events.set(sessionId,[]);return {sessionId}},selectModel:async()=>{},inspect:async(id:string)=>({events:events.get(id)}),prompt:async(p:any)=>{prompts.push(p)}}},{dataRoot:dir});
 const call=async(action:string,args:any={})=>{const r=await routes.get('/api/ship.paper').fetch(new Request('http://localhost/api/ship.paper',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,args})}));return {status:r.status,data:await r.json()}};
 let r=await call('sample');const id=r.data.orders[0].id;expect(prompts[0].content[1].data).toMatch(/^iVBOR/);expect(prompts[0].content[1].attachment).toBeUndefined();expect((await call('confirm',{id,draft:order().confirmed})).status).toBe(400);
 events.get('test-1').push({seq:1,type:'assistant/message',data:{message:{content:[{type:'text',text:JSON.stringify(order().confirmed)}]}}},{seq:2,type:'turn/end',data:{reason:{kind:'completed'}}});r=await call('state');expect(r.data.orders[0].phase).toBe(1);
 r=await call('confirm',{id,draft:order().confirmed});expect(r.data.orders[0].phase).toBe(2);expect(r.data.orders[0].ocrSession).toBe('test-1');expect(r.data.orders[0].session).toBe('test-2');expect(prompts[1].content[0].text).toContain('ship_paper_check');expect((await call('finish',{id})).status).toBe(400);
 const {readFile}=await import('node:fs/promises');const bytes=await readFile(new URL('../packages/ship-workbench/public/paper-sample.png',import.meta.url));const form=new FormData();form.append('file',new Blob([bytes],{type:'image/png'}),'模拟上传.png');const uploaded=await routes.get('/api/ship.paper').fetch(new Request('http://localhost/api/ship.paper',{method:'POST',body:form}));expect(uploaded.status).toBe(200);const uploadedState=await uploaded.json();expect(uploadedState.orders[0].source.name).toBe('模拟上传.png');expect(uploadedState.orders[0].id).not.toBe(id);
 }finally{await rm(dir,{recursive:true,force:true})}
})
