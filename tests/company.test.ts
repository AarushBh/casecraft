import assert from 'node:assert/strict';
import {catalog,getCases,review} from '../app/training/engine';
import {companyTracksForRole,getCompanyCases} from '../app/training/company-content';
const roles=catalog.filter(e=>e.path==='interviews');const ids=new Set<string>();
for(const role of roles){
 const tracks=companyTracksForRole(role.id);assert.ok(tracks.length>=5&&tracks.length<=15,role.id);
 for(const track of tracks){const cases=getCompanyCases(role,track.id);assert.equal(cases.length,18);for(const c of cases){assert.ok(!ids.has(c.id));ids.add(c.id);assert.equal(c.eventId,role.id);assert.equal(c.company?.id,track.id);assert.ok(c.company?.source.startsWith('https://'));assert.equal(c.followups.length,2);assert.ok(c.benchmark.length>60);assert.ok(!getCases(role).some(x=>x.id===c.id));const result=review(c,{response:'A thoughtful answer does not automatically earn a reasoning grade.',results:c.numbers.map(n=>String(n.answer)),followups:['','']},0);assert.equal(result.score,null);assert.equal(result.numericSummary.passed,c.numbers.length);for(const n of c.numbers){assert.ok(Number.isFinite(n.answer));assert.ok(n.tolerance>=0)}}}
 assert.deepEqual(getCompanyCases(role,'unknown'),[]);
}
assert.equal(ids.size,954);
const swe=roles.find(r=>r.id==='software-engineering')!;
assert.deepEqual(companyTracksForRole(swe.id).slice(0,3).map(c=>c.name),['Citadel','Jane Street','Optiver']);
assert.equal(new Set(getCompanyCases(swe).filter(c=>c.index===0).map(c=>c.title)).size,4);
assert.deepEqual(getCompanyCases(catalog.find(e=>e.path==='deca')!),[]);
console.log('Company prep: 53 role/company tracks, 954 assignments (including shared role cases), source links, follow-ups, isolated IDs and numeric definitions passed.');

for(const role of roles){for(const co of companyTracksForRole(role.id)){for(const c of getCompanyCases(role,co.id).filter(c=>c.sharedRoleCaseId)){const original=getCases(role).find(x=>x.id===c.sharedRoleCaseId)!;assert.ok(original);assert.equal(original.drillKind,'Core');assert.equal(c.prompt,original.prompt);assert.deepEqual(c.numbers,original.numbers);assert.equal(c.benchmark,original.benchmark)}}}
