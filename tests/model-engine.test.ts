import assert from 'node:assert/strict';
import {parse,evaluateModel,markModel} from '../app/model-engine';
import {challenges} from '../app/workbench-data';
import {validateDraft,validateCritique} from '../app/grading-contract';
const ref=(r:string)=>({D1:100,D2:25,M1:10}[r]??0);
for(const [source,expected] of [['=D1-D2*2',50],['=(D1-D2)*2',150],['=SUM(D1,D2,5)',130],['=MIN(3,MAX(1,2))',2],['=ABS(-5)',5],['=ROUND(1/3,2)',.33],['=20%*100',20],['=-D1+10',-90],['=1e3 + .5',1000.5],['=-5%',-.05]] as [string,number][]){assert.equal(parse(source,ref),expected,source)}
for(const invalid of ['1/0','window.alert(1)','D1.constructor','process.env','fetch(1)','SUM()','1 2','(1+2','ROUND(2,100)','1e100','2**4',''.padEnd(501,'1')]){assert.throws(()=>parse(invalid,ref),invalid)}
const result=evaluateModel([{label:'a',unit:'',formula:'=M2+5'},{label:'b',unit:'',formula:'=D1*2'}],[3]);assert.equal(result[0].value,11);assert.equal(result[1].value,6);
assert.match(evaluateModel([{label:'a',unit:'',formula:'=M1'}],[])[0].error!,/Circular/);
assert.equal(evaluateModel([{label:'a',unit:'',formula:''}],[])[0].value,null);
assert.match(evaluateModel([{label:'a',unit:'',formula:'=D99'}],[3])[0].error!,/Invalid data reference/);
assert.match(evaluateModel([{label:'a',unit:'',formula:'=D1'}],[NaN])[0].error!,/Invalid data reference/);
assert.match(evaluateModel([{label:'a',unit:'',formula:'=M2'},{label:'b',unit:'',formula:'=M1'}],[])[0].error!,/Circular/);
assert.equal(challenges.length,8);
for(const c of challenges){const rows=c.outputs.map(o=>({label:o.label,unit:o.unit,formula:o.formula}));const report=markModel(c,rows);assert.equal(report.score,100,c.title);assert.equal(report.scenarios.length,3);assert.equal(report.base.length,4);assert.ok(report.scenarios.every(s=>s.checks.every(c=>c.pass)));const empty=rows.map(r=>({...r,formula:''}));assert.equal(markModel(c,empty).score,0);const hardcoded=report.base.map((r,i)=>({...rows[i],formula:String(r.expected)}));assert.ok(markModel(c,hardcoded).score<100,c.title+' must reject hard-coded base outputs');}
const coffee=challenges[0],report=markModel(coffee,coffee.outputs);assert.deepEqual(report.base.map(r=>r.expected),[200000,160000,-40000,160000/1200000]);
const cedar=challenges[5];assert.deepEqual(markModel(cedar,cedar.outputs).base.map(r=>r.expected),[62500000,13000000,49500000,12.5]);
const kiln=challenges[7];for(const scenario of [{changes:{},name:'base'},...kiln.scenarios]){const data=kiln.data.map((d,i)=>scenario.changes[i as keyof typeof scenario.changes]??d.value);const actual=evaluateModel(kiln.outputs,data).map(v=>v.value!);let best=-Infinity;for(let a=0;a<=data[2];a++)for(let b=0;b<=data[5];b++)if(a*data[1]+b*data[4]<=data[6])best=Math.max(best,a*data[0]+b*data[3]);assert.equal(actual[2],best,scenario.name);assert.ok(actual[3]<=data[6]);}
const draft={caseId:1,rows:coffee.outputs,memo:{recommendation:'A',analysis:'B',assumptions:'C',risks:'D',alternatives:'E',execution:'F'},visuals:[],scenario:coffee.data.map(d=>d.value),elapsed:30};assert.equal(validateDraft(draft).caseId,1);
for(const bad of [{...draft,caseId:9},{...draft,rows:[]},{...draft,scenario:[null]},{...draft,memo:{}},{...draft,visuals:[{type:'script'}]}])assert.throws(()=>validateDraft(bad));
assert.throws(()=>validateCritique({summary:'a',verdict:'b',reasoning:{score:100,feedback:'a'}}));
console.log('PASS: parser arithmetic and safety, cycle detection, all 128 output checks, hard-coded-answer rejection, independent allocation optimization, and submission validation.');
