import assert from 'node:assert/strict';
import {introTracks,pickIntroTrack} from '../app/music/tracks';
import recordings from '../docs/music-recordings.json';
assert.equal(introTracks.length,13);
assert.equal(new Set(introTracks.map(t=>t.id)).size,13);
for(const track of introTracks){
 const source=recordings.find(t=>t.id===track.id);
 assert.ok(source,`Missing source for ${track.title}`);
 assert.equal(source.isExplicit,false);
 assert.equal(track.explicit,false);
}
const rare=introTracks.find(t=>t.rare)!;
assert.equal(pickIntroTrack(undefined,()=>0).id,rare.id);
assert.equal(pickIntroTrack(undefined,()=>0.009999).id,rare.id);
assert.notEqual(pickIntroTrack(undefined,()=>0.01).id,rare.id);
for(const prior of introTracks)for(const n of [0,0.005,0.01,0.5,0.999999]){
 assert.notEqual(pickIntroTrack(prior.id,()=>n).id,prior.id,'Shuffle must not repeat immediately');
}
let rareCount=0;
for(let i=0;i<10000;i++){let calls=0;const t=pickIntroTrack(undefined,()=>calls++===0?i/10000:0.5);if(t.rare)rareCount++}
assert.equal(rareCount,100,'Rare track must occupy exactly 1% of selection interval');
console.log('Music: 13 verified recordings, shuffle exclusions and 1% rare selection passed');
