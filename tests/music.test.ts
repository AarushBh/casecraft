import assert from 'node:assert/strict';
import {introTracks,pickIntroTrack,availableIntroTracks} from '../app/music/tracks';
import recordings from '../docs/music-recordings.json';
assert.equal(introTracks.length,10);
assert.equal(new Set(introTracks.map(t=>t.id)).size,10);
for(const track of introTracks){
 const source=recordings.find(t=>t.id===track.id);
 assert.ok(source,`Missing source for ${track.title}`);
 assert.equal(source.isExplicit,false);
 assert.equal(track.explicit,false);
}
const rare=introTracks.find(t=>t.rare)!;
assert.equal(pickIntroTrack(undefined,()=>0,true).id,rare.id);
assert.equal(pickIntroTrack(undefined,()=>0.009999,true).id,rare.id);
assert.notEqual(pickIntroTrack(undefined,()=>0.01,true).id,rare.id);
for(const prior of introTracks)for(const n of [0,0.005,0.01,0.5,0.999999]){
 assert.notEqual(pickIntroTrack(prior.id,()=>n,true).id,prior.id,'Shuffle must not repeat immediately');
}
let rareCount=0;
for(let i=0;i<10000;i++){let calls=0;const t=pickIntroTrack(undefined,()=>calls++===0?i/10000:0.5,true);if(t.rare)rareCount++}
assert.equal(rareCount,100,'Rare track must occupy exactly 1% of selection interval');
console.log('Music: 10 verified recordings, shuffle exclusions and 1% rare selection passed');

assert.equal(availableIntroTracks(false).length,9);
assert.ok(availableIntroTracks(false).every(track=>!track.rare));
for(const n of [0,0.009,0.5,0.999])assert.ok(!pickIntroTrack(undefined,()=>n,false).rare);
for(const removed of ['Every Chance I Get','Myself','Ran To Atlanta'])assert.ok(!introTracks.some(t=>t.title===removed));

import {createVisitTracker} from '../app/music/visits';
let saved:string|null=null;
const storage={getItem:()=>saved,setItem:(_key:string,value:string)=>{saved=value}};
for(let visit=1;visit<=7;visit++){
 const tracker=createVisitTracker(()=>storage);
 const current=tracker();
 assert.equal(current,Math.min(visit,6));
 for(let reopen=0;reopen<10;reopen++)assert.equal(tracker(),current,'Reopening must not count as another visit');
 assert.equal(!!pickIntroTrack(undefined,()=>0,current>5).rare,visit>5);
 assert.equal(availableIntroTracks(current>5).some(t=>t.rare),visit>5);
}
for(const invalid of ['broken','-1','100','5.5','Infinity']){
 saved=invalid;assert.equal(createVisitTracker(()=>storage)(),1);
}
assert.equal(createVisitTracker(()=>{throw Error('Storage blocked')})(),1);
assert.equal(createVisitTracker(()=>({getItem:()=> '5',setItem:()=>{throw Error('Quota')}}))(),1);
console.log('Music: first five visits locked, sixth unlocked, reopens and blocked storage checked');
