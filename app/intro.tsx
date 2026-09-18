'use client';

import {useEffect,useRef,useState} from 'react';
import {ArrowRight, Layers3, Shuffle, VolumeX, Volume2} from 'lucide-react';
import {Dialog, DialogContent, DialogTitle, DialogDescription} from '@/components/ui/dialog';
import {introTracks,pickIntroTrack,type IntroTrack} from './music/tracks';
import {getSpotifyAPI,type SpotifyController} from './music/spotify';

function Player({track}:{track:IntroTrack}) {
  const host=useRef<HTMLDivElement>(null);
  const [state,setState]=useState<'loading'|'ready'|'playing'|'unavailable'>('loading');
  useEffect(()=>{
    let disposed=false,controller:SpotifyController|undefined;
    const container=host.current!;
    const mount=document.createElement('div');container.appendChild(mount);
    setState('loading');
    const timeout=window.setTimeout(()=>{if(!disposed)setState('unavailable')},15000);
    getSpotifyAPI().then(api=>{
      if(disposed)return;
      api.createController(mount,{uri:`spotify:track:${track.id}`,width:'100%',height:152,theme:'dark'},instance=>{
        if(disposed){instance.destroy();return}
        controller=instance;
        instance.addListener('ready',()=>{
          if(disposed)return;
          window.clearTimeout(timeout);setState('ready');
          // Audible autoplay remains subject to browser and Spotify policy.
          try{instance.play()}catch{/* The visible Spotify play control remains usable. */}
        });
        instance.addListener('playback_update',event=>{
          if(!disposed){window.clearTimeout(timeout);setState(event.data.isPaused?'ready':'playing')}
        });
      });
    }).catch(()=>{if(!disposed){window.clearTimeout(timeout);setState('unavailable')}});
    return()=>{disposed=true;window.clearTimeout(timeout);if(controller)controller.destroy();container.replaceChildren()};
  },[track.id]);
  return <><div ref={host} className="soundtrack-player"/>
    <p className="soundtrack-status" role="status">{state==='loading'?'Connecting to Spotify…':state==='playing'?'Playing on Spotify':state==='unavailable'?'Spotify is unavailable. You can still enter Casecraft.':'If sound hasn’t started, press play in Spotify.'}</p>
    <p className="soundtrack-note">Clean edition · Spotify may play a preview. <a href={`https://open.spotify.com/track/${track.id}`} target="_blank" rel="noreferrer">Open in Spotify ↗</a></p>
  </>;
}

function Soundtrack(){
  const [track,setTrack]=useState(()=>pickIntroTrack());
  const [enabled,setEnabled]=useState(()=>{try{return localStorage.getItem('casecraft-music-off')!=='yes'}catch{return true}});
  function toggle(){try{localStorage.setItem('casecraft-music-off',enabled?'yes':'no')}catch{}setEnabled(!enabled)}
  return <section className="soundtrack" aria-label="Intro soundtrack">
    <div className="soundtrack-tools"><span>{track.rare?'A rare little detour.':'A little music before you begin.'}</span><div>
      <button aria-label="Shuffle intro song" title="Shuffle song" onClick={()=>setTrack(pickIntroTrack(track.id))}><Shuffle size={17}/></button>
      <button aria-label={enabled?'Turn music off':'Turn music on'} title={enabled?'Turn music off':'Turn music on'} onClick={toggle}>{enabled?<VolumeX size={18}/>:<Volume2 size={18}/>}</button>
    </div></div>
    {enabled?<Player key={track.id} track={track}/>:<p className="soundtrack-off">Music off. Your preference is saved.</p>}
    <details className="soundtrack-choices"><summary>Choose a song</summary><label>Soundtrack<select aria-label="Choose intro song" value={track.id} onChange={event=>setTrack(introTracks.find(song=>song.id===event.target.value)!)}>{introTracks.map(song=><option key={song.id} value={song.id}>{song.title} — {song.artist}</option>)}</select></label><p>Only recordings marked non-explicit by Spotify. The rare pick has a 1% chance on shuffle.</p></details>
  </section>;
}

export default function Intro({open,onEnter}:{open:boolean;onEnter:()=>void}) {
  return <Dialog open={open} onOpenChange={value=>{if(!value)onEnter()}}><DialogContent className="entrance-dialog" showCloseButton={false}>
    <div className="entrance-top"><span><Layers3 size={22}/> casecraft</span><button onClick={onEnter}>Skip <ArrowRight size={16}/></button></div>
    <div className="entrance-main"><div className="entrance-orbit" aria-hidden="true"><Layers3 size={34}/></div>
      <DialogTitle className="entrance-title">Make your next move.</DialogTitle>
      <DialogDescription className="entrance-description">A little practice. A lot more confidence.</DialogDescription>
      <button className="enter-casecraft" onClick={onEnter}>Enter Casecraft <ArrowRight size={19}/></button>
      {open&&<Soundtrack/>}
    </div>
    <div className="entrance-bottom">Competition Hall <span>·</span> Career Launchpad</div>
  </DialogContent></Dialog>;
}
