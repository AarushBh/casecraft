import assert from 'node:assert/strict';
import {catalog,getCases,review} from '../app/training/engine';
import {companyTracksForRole,getCompanyCases} from '../app/training/company-content';
const roles=catalog.filter(e=>e.path==='interviews');const ids=new Set<string>();
for(const role of roles){
 const tracks=companyTracksForRole(role.id);assert.ok(tracks.length>=2,role.id);
 for(const track of tracks){const cases=getCompanyCases(role,track.id);assert.equal(cases.length,2);for(const c of cases){assert.ok(!ids.has(c.id));ids.add(c.id);assert.equal(c.eventId,role.id);assert.equal(c.company?.id,track.id);assert.ok(c.company?.source.startsWith('https://'));assert.equal(c.followups.length,2);assert.ok(c.benchmark.length>200);assert.ok(!getCases(role).some(x=>x.id===c.id));const result=review(c,{response:'A thoughtful answer does not automatically earn a reasoning grade.',results:c.numbers.map(n=>String(n.answer)),followups:['','']},0);assert.equal(result.score,null);assert.equal(result.numericSummary.passed,c.numbers.length);for(const n of c.numbers){assert.ok(Number.isFinite(n.answer));assert.ok(n.tolerance>=0)}}}
 assert.deepEqual(getCompanyCases(role,'unknown'),[]);
}
assert.equal(ids.size,46);
const swe=roles.find(r=>r.id==='software-engineering')!;
assert.deepEqual(companyTracksForRole(swe.id).slice(0,3).map(c=>c.name),['Citadel','Jane Street','Optiver']);
assert.equal(new Set(getCompanyCases(swe).filter(c=>c.index===0).map(c=>c.title)).size,4);
assert.deepEqual(getCompanyCases(catalog.find(e=>e.path==='deca')!),[]);
console.log('Company prep: 23 role/company tracks, 46 stable assignments, source links, follow-ups, isolated IDs and numeric definitions passed.');
