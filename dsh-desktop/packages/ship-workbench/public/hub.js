const labels={paper:'上传原件 → 核对电子草稿 → Agent 检查 → 人工处理疑点 → 留档',plan:'历史案例与本船任务 → 初案 → 勘验修订 → 人工复核 → PDF 报告'};
function select(id){for(const name of ['paper','plan']){document.getElementById(name).hidden=name!==id;document.getElementById(name+'-tab').setAttribute('aria-pressed',String(name===id))}document.getElementById('guide').textContent=labels[id];sessionStorage.setItem('ship-demo',id)}
for(const id of ['paper','plan'])document.getElementById(id+'-tab').onclick=()=>select(id);
select(sessionStorage.getItem('ship-demo')==='plan'?'plan':'paper');
