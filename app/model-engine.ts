import type {Challenge} from './workbench-data';
export type ModelRow={label:string;formula:string;unit:string};
export type CellResult={value:number|null;error:string|null};
// A bounded arithmetic parser. It never executes JavaScript or accesses object properties.
export function evaluateModel(rows:ModelRow[],data:number[]):CellResult[]{
 const cache=new Map<number,CellResult>(),visiting=new Set<number>();
 function cell(index:number):CellResult{
  if(cache.has(index))return cache.get(index)!;
  if(index<0||index>=rows.length)return{value:null,error:'Unknown model reference'};
  if(visiting.has(index))return{value:null,error:'Circular reference'};
  if(!rows[index].formula.trim())return{value:null,error:'Add a formula'};
  visiting.add(index);
  try{const value=parse(rows[index].formula,(ref)=>{const i=Number(ref.slice(1))-1;if(ref[0]==='D'){if(i<0||i>=data.length||!Number.isFinite(data[i]))throw Error('Invalid data reference '+ref);return data[i]}const r=cell(i);if(r.value===null)throw Error(ref+': '+r.error);return r.value});const result={value,error:null};cache.set(index,result);return result}catch(e){const result={value:null,error:e instanceof Error?e.message:'Invalid formula'};cache.set(index,result);return result}finally{visiting.delete(index)}
 }
 return rows.map((_,i)=>cell(i));
}
export function parse(input:string,resolve:(ref:string)=>number):number{
 const source=input.trim().replace(/^=/,'').toUpperCase();if(source.length>500)throw Error('Formula is too long');
 const tokens:string[]=[];let offset=0;
 while(offset<source.length){const rest=source.slice(offset);const space=/^\s+/.exec(rest);if(space){offset+=space[0].length;continue}const m=/^(?:\d+(?:\.\d*)?|\.\d+)(?:E[+-]?\d+)?|^[A-Z]+\d*|^[+\-*/(),%]/.exec(rest);if(!m)throw Error('Unsupported character at position '+(offset+1));tokens.push(m[0]);offset+=m[0].length;if(tokens.length>200)throw Error('Formula is too complex')}
 let p=0,depth=0;const peek=()=>tokens[p];const take=()=>tokens[p++];
 function atom():number{if(++depth>50)throw Error('Formula is too deeply nested');let value:number;const t=take();if(t==='+'||t==='-')value=(t==='-'?-1:1)*atom();else if(t==='('){value=expression();if(take()!==')')throw Error('Missing closing parenthesis')}else if(t&&/^(?:\d|\.)/.test(t)){value=Number(t)}else if(t&&/^[DM][1-9]\d*$/.test(t)){value=resolve(t)}else if(t&&['SUM','MIN','MAX','ABS','ROUND'].includes(t)){if(take()!=='(')throw Error('Expected ( after '+t);const args=[expression()];while(peek()===','){take();args.push(expression())}if(take()!==')')throw Error('Missing closing parenthesis');if(t==='ABS'&&args.length!==1)throw Error('ABS needs one argument');if(t==='ROUND'&&(args.length<1||args.length>2))throw Error('ROUND needs one or two arguments');if(t==='SUM')value=args.reduce((a,b)=>a+b,0);else if(t==='MIN')value=Math.min(...args);else if(t==='MAX')value=Math.max(...args);else if(t==='ABS')value=Math.abs(args[0]);else{const places=args[1]??0;if(!Number.isInteger(places)||Math.abs(places)>10)throw Error('ROUND precision must be an integer from -10 to 10');value=Math.round(args[0]*10**places)/10**places}}else throw Error(t?'Unknown reference or function: '+t:'Incomplete formula');if(peek()==='%'){take();value/=100}depth--;return value}
 function product():number{let v=atom();while(peek()==='*'||peek()==='/'){const op=take(),r=atom();if(op==='/'&&r===0)throw Error('Division by zero');v=op==='*'?v*r:v/r}return v}
 function expression():number{let v=product();while(peek()==='+'||peek()==='-'){const op=take(),r=product();v=op==='+'?v+r:v-r}return v}
 const result=expression();if(p!==tokens.length)throw Error('Unexpected token: '+peek());if(!Number.isFinite(result)||Math.abs(result)>1e15)throw Error('Result is outside the supported numeric range');return result;
}
export type CheckResult={label:string;unit:string;expected:number;actual:number|null;pass:boolean;error:string|null;why:string};
export type ModelReport={score:number;base:CheckResult[];scenarios:{name:string;changes:Record<number,number>;checks:CheckResult[]}[];basePoints:number;robustPoints:number;gaps:string[]};
export function markModel(c:Challenge,rows:ModelRow[]):ModelReport{
 const refs=c.outputs.map(o=>({label:o.label,formula:o.formula,unit:o.unit}));
 const check=(data:number[])=>{const actual=evaluateModel(rows,data),expected=evaluateModel(refs,data);return c.outputs.map((o,i)=>{const wanted=expected[i].value!;return{label:o.label,unit:o.unit,expected:wanted,actual:actual[i]?.value??null,error:actual[i]?.error??null,pass:actual[i]?.value!==null&&actual[i]?.value!==undefined&&Math.abs(actual[i].value!-wanted)<=Math.max(o.unit==='ratio'?0.000001:0.01,Math.abs(wanted)*.001),why:o.why}})};
 const base=check(c.data.map(d=>d.value));const scenarios=c.scenarios.map(s=>({name:s.name,changes:s.changes,checks:check(c.data.map((d,i)=>s.changes[i]??d.value))}));
 const basePoints=Math.round(50*base.filter(r=>r.pass).length/base.length);const tests=scenarios.flatMap(s=>s.checks);const robustPoints=Math.round(50*tests.filter(r=>r.pass).length/tests.length);const gaps:string[]=[];
 for(const r of base.filter(r=>!r.pass))gaps.push(`${r.label}: ${r.error? r.error+'. ':''}${r.why}`);
 if(base.every(r=>r.pass)&&tests.some(r=>!r.pass))gaps.push('Your base case works, but changed inputs break the model. Replace hard-coded answers or assumptions with D and M references and test the dependency chain.');
 if(tests.some(r=>!r.pass))gaps.push('The model is not yet reliable across the supplied scenarios. Open each failed test below to see the specific gap.');
 return{score:basePoints+robustPoints,base,scenarios,basePoints,robustPoints,gaps};
}
export const format=(v:number|null,unit='')=>v===null?'—':(unit==='$'?'$':'')+new Intl.NumberFormat('en-US',{maximumFractionDigits:unit==='ratio'?4:2}).format(v)+(unit==='multiple'?'×':'');
