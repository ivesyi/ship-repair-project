import {contextBridge,ipcRenderer} from 'electron'
contextBridge.exposeInMainWorld('shipPlan',{exportPdf:()=>ipcRenderer.invoke('ship:plan-pdf')})
