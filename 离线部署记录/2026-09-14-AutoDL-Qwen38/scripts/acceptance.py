import base64,json,time,urllib.request,pathlib
from decimal import Decimal
base=pathlib.Path(__file__).resolve().parent.parent;opener=urllib.request.build_opener(urllib.request.ProxyHandler({}));endpoint='http://127.0.0.1:8080/v1/chat/completions'
text='请仅依据以下工程单回答：局部除锈145平方米，单价46元；整体后续涂装483平方米，单价112元；锌块36块，单价210元。分别整理项目、数量、单位、单价，并说明这些信息能否确定人工工时。不要编造未给出的数据。'
image=base64.b64encode((base/'artifacts/公开采购文件第23页.png').read_bytes()).decode()
tests={'文字核对':text,'工程单图片':[{'type':'image_url','image_url':{'url':'data:image/png;base64,'+image}},{'type':'text','text':'只依据图片提取原文2.1、2.2和5三个项目的名称、数量、单位、单价及金额。看不清时明确说明。再说明能否从图中确定人工工时。'}]}
for name,content in tests.items():
 payload={'model':'qwen38-27b-q4','messages':[{'role':'system','content':'你是工程资料核对助手。中文作答；保持证据边界，不补造工时或现场事实。'},{'role':'user','content':content}],'max_tokens':1800,'temperature':0.7,'top_p':0.8,'chat_template_kwargs':{'enable_thinking':False}}
 start=time.monotonic();request=urllib.request.Request(endpoint,data=json.dumps(payload).encode(),headers={'Content-Type':'application/json'})
 with opener.open(request,timeout=600) as r: result=json.load(r)
 result['test_elapsed_seconds']=round(time.monotonic()-start,3);(base/'artifacts'/(name+'-结果.json')).write_text(json.dumps(result,ensure_ascii=False,indent=2));print(name,result['test_elapsed_seconds'],result['choices'][0]['message'],flush=True)
total=sum(Decimal(q)*Decimal(p) for q,p in [('145','46'),('483','112'),('36','210')]);assert total==Decimal('68326');print('程序复算金额',format(total,'.2f'),flush=True)
