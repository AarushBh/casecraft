export type IntroTrack = {id:string; title:string; artist:string; rare?:boolean; explicit:false};
// Exact non-explicit recording IDs verified against Spotify embed metadata on 2026-09-17.
// Never replace these with artist feeds: those can contain explicit recordings.
export const introTracks: IntroTrack[] = [
  {id:'0uMCmwW1C3rVTcjBUNHSdY',title:'N 2 Deep',artist:'Drake · Future',explicit:false},
  {id:'1HPLaUGGBXvkUYRVkQQmS9',title:'Race My Mind',artist:'Drake',explicit:false},
  {id:'1bply5aur6hqqxlRJ2IpXP',title:'Get Along Better',artist:'Drake · Ty Dolla $ign',explicit:false},
  {id:'3c9LSxnx0AXdsXiewstFC1',title:'Passionfruit',artist:'Drake',explicit:false},
  {id:'4aUhlz5XQyjlHhY3D4LHNU',title:'New Bestie',artist:'Drake',explicit:false},
  {id:'5hTl2uxJGd1sbLtovguuuk',title:'Stars Align',artist:'Majid Jordan · Drake',explicit:false},
  {id:'0LGtMvQJ37SsEYbkP6TcVJ',title:'Outta Time',artist:'Bryson Tiller · Drake',explicit:false},
  {id:'24pUq4mLt3s4OZWI8pq5zy',title:'Some of Your Love',artist:'PARTYNEXTDOOR',explicit:false},
  {id:'1jQQA41RYAT71rU7919ewj',title:'Routine Rouge',artist:'PARTYNEXTDOOR',explicit:false},
  {id:'1wmJMnPvbpOe4iYYFyu085',title:'Fukashigi no Karte',artist:'Bunny Girl Senpai cast · All Heroine Ver.',rare:true,explicit:false},
];
export function availableIntroTracks(rareUnlocked:boolean){return introTracks.filter(track=>rareUnlocked||!track.rare)}
export function pickIntroTrack(previous?:string,random:()=>number=Math.random,rareUnlocked=false):IntroTrack {
  const rare=introTracks.find(track=>track.rare)!;
  if(rareUnlocked&&previous!==rare.id&&random()<0.01)return rare;
  const regular=introTracks.filter(track=>!track.rare&&track.id!==previous);
  return regular[Math.min(regular.length-1,Math.floor(random()*regular.length))];
}
