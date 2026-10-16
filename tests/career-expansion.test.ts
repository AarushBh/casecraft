import assert from 'node:assert/strict';
import {careerFamilies,expandedCareerCases} from '../app/training/career-expansion';
import {catalog,getCases,review} from '../app/training/engine';
const roles=catalog.filter(e=>e.path==='interviews');
assert.equal(Object.values(careerFamilies).flat().length,80);
assert.equal(new Set(Object.values(careerFamilies).flat().map(f=>f.title)).size,80);
for(const role of roles){
 const families=careerFamilies[role.id];assert.equal(families.length,8);
 const added=expandedCareerCases(role.id);assert.equal(added.length,24);
 const all=getCases(role);assert.equal(all.length,48);assert.equal(all.filter(c=>c.drillKind==='Core').length,16);
 for(let i=0;i<24;i++)assert.equal(all[i].id,`${role.id}:${i}`,'Existing draft IDs must remain stable');
 for(let i=0;i<8;i++){
 const family=families[i];assert.ok(family.facts.length>=2);assert.equal(family.probeAnswers.length,2);
 assert.ok(family.probeAnswers.every(a=>a.length>100));
 for(let j=0;j<3;j++){const c=all[24+i*3+j];assert.equal(c.title,added[i*3+j].title);assert.equal(c.drillKind,['Core','Deep dive','Pressure test'][j]);if(j){assert.equal(c.numbers.length,0);assert.equal(c.benchmark,family.probeAnswers[j-1]);assert.ok(c.task.includes(family.followups[j-1]))}}
 }
}
// Independently derived arithmetic: formulas do not read the stored expected answers.
const expected:Record<string,number[][]>={
 banking:[[12/(.1-.03)],[15*(1-(1.1)**-5)/.1-30],[120000*9/12],[3/(100*(.08-.06))],[(25*8-70)/80],[(100*20+25*16)/125],[],[]],
 consulting:[[(35-25)*30],[(50*.9-30)*12000],[60*10000],[],[(.05-.03)*1000*100*.8],[],[],[]],
 quant:[[100*.64/(.25+.64)],[(3*3.5+4+5+6)/6],[],[],[100*Math.sqrt(.5**2*.2**2*2)],[],[],[]],
 'software-engineering':[[],[],[3**3],[],[],[],[],[]],
 'data-analytics':[[],[],[(180*20+20*100)/200],[80/575*100,80/100*100],[],[],[],[]],
 'corporate-finance':[[],[1200*90-1000*100],[60+45-30,10*20000],[10*120000*.5*1.25+10*8000],[25-18-1-2],[2000000*(1.5-1.4)],[],[]],
 'technical-sales':[[],[],[(200000-120000)/120000*100],[],[],[],[],[]]
};
let numeric=0;
for(const [roleId,values] of Object.entries(expected)){const role=roles.find(r=>r.id===roleId)!;values.forEach((answers,i)=>{const c=getCases(role)[24+i*3];assert.equal(c.numbers.length,answers.length);answers.forEach((answer,j)=>{numeric++;assert.ok(Math.abs(c.numbers[j].answer-answer)<=c.numbers[j].tolerance+1e-9);const result=review(c,{response:'',results:answers.map(String),followups:[]},0);assert.equal(result.numeric[j].correct,true)})})}
console.log(`Career expansion: 80 original families, 240 additional drills, stable drafts, specific follow-up solutions and ${numeric} independently calculated checks passed.`);

for(const e of catalog.filter(e=>e.path!=='interviews'))assert.ok(getCases(e).every(c=>c.drillKind===undefined),'Interview drill metadata must not overwrite competition format metadata');
