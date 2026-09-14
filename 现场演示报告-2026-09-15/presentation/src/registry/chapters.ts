import type { ChapterDef } from './types';
import C0 from '../chapters/01-basics/Basics';
import {narrations as n0} from '../chapters/01-basics/narrations';
import C1 from '../chapters/07-inputs/Chapter';
import {narrations as n1} from '../chapters/07-inputs/narrations';
import C2 from '../chapters/08-retrieval/Chapter';
import {narrations as n2} from '../chapters/08-retrieval/narrations';
import C3 from '../chapters/11-source/Chapter';
import {narrations as n3} from '../chapters/11-source/narrations';
import C4 from '../chapters/12-change/Chapter';
import {narrations as n4} from '../chapters/12-change/narrations';
import C5 from '../chapters/13-orders/Chapter';
import {narrations as n5} from '../chapters/13-orders/narrations';
import C6 from '../chapters/16-offline/Chapter';
import {narrations as n6} from '../chapters/16-offline/narrations';
import C7 from '../chapters/17-investment/Chapter';
import {narrations as n7} from '../chapters/17-investment/narrations';
export const CHAPTERS:ChapterDef[] = [{id:"basics",title:"用一张维修单认识智能体",narrations:n0,Component:C0},
{id:"inputs",title:"它怎样接收现场信息",narrations:n1,Component:C1},
{id:"retrieval",title:"它怎样查自己的资料",narrations:n2,Component:C2},
{id:"source",title:"拿真实维修单看一遍",narrations:n3,Component:C3},
{id:"change",title:"现场变了，结果跟着改",narrations:n4,Component:C4},
{id:"orders",title:"每笔订单都按同一套步骤",narrations:n5,Component:C5},
{id:"offline",title:"资料放在哪里",narrations:n6,Component:C6},
{id:"investment",title:"最后再看设备投入",narrations:n7,Component:C7}];
