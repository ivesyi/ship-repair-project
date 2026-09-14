import {BrowserWindow,ipcMain,dialog} from 'electron'
import {join} from 'node:path'
import {writeFile} from 'node:fs/promises'
let workbenchWindow:BrowserWindow|null=null
let exporting=false
export async function openShipWorkbench(harnessUrl:string){
 const origin=new URL(harnessUrl).origin
 if(workbenchWindow&&!workbenchWindow.isDestroyed()){workbenchWindow.show();workbenchWindow.focus();return}
 const w=new BrowserWindow({title:'船舶维修工作台',width:1440,height:950,minWidth:1040,minHeight:720,webPreferences:{preload:join(__dirname,'../preload/ship-plan.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:true}})
 workbenchWindow=w
 ipcMain.removeHandler('ship:plan-pdf')
 ipcMain.handle('ship:plan-pdf',async(event)=>{
  if(event.sender!==w.webContents||event.senderFrame!==w.webContents.mainFrame||event.senderFrame.url!==origin+'/api/ship.workbench')throw Error('无效报告请求')
  if(exporting)throw Error('报告正在生成，请稍候')
  exporting=true
  let printWindow:BrowserWindow|null=null
  try{
   const response=await w.webContents.session.fetch(origin+'/api/ship.plan-report')
   if(!response.ok)throw Error('请先完成方案复核与报告编制')
   const target=await dialog.showSaveDialog(w,{title:'保存维修方案报告',defaultPath:'维修工程方案与预成本测算报告.pdf',filters:[{name:'PDF 报告',extensions:['pdf']}]})
   if(target.canceled||!target.filePath)return {cancelled:true}
   printWindow=new BrowserWindow({show:false,webPreferences:{session:w.webContents.session,contextIsolation:true,nodeIntegration:false,sandbox:true}})
   await printWindow.loadURL(origin+'/api/ship.plan-report')
   await printWindow.webContents.executeJavaScript('document.fonts.ready.then(()=>true)')
   const pdf=await printWindow.webContents.printToPDF({pageSize:'A4',printBackground:true,preferCSSPageSize:true,displayHeaderFooter:true,headerTemplate:'<span></span>',footerTemplate:'<div style="font-size:9px;width:100%;text-align:center;color:#777">船舶维修方案 · 会议演练 · 第 <span class="pageNumber"></span> / <span class="totalPages"></span> 页</div>'})
   await writeFile(target.filePath,pdf)
   return {path:target.filePath}
  }finally{printWindow?.destroy();exporting=false}
 })
 w.webContents.setWindowOpenHandler(()=>({action:'deny'}))
 w.webContents.on('will-navigate',(event,url)=>{if(url!==origin+'/api/ship.workbench')event.preventDefault()})
 await w.loadURL(origin+'/api/ship.workbench');w.show();w.focus()
}
