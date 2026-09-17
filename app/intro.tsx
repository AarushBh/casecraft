'use client';

import {useState} from 'react';
import {ArrowRight, Headphones, Layers3, VolumeX, ExternalLink} from 'lucide-react';
import {Dialog, DialogContent, DialogTitle, DialogDescription} from '@/components/ui/dialog';

const artist = 'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4';

export default function Intro({open,onEnter}:{open:boolean;onEnter:()=>void}) {
  const [music,setMusic]=useState(false);
  function enter(){setMusic(false);onEnter()}
  return <Dialog open={open} onOpenChange={value=>{if(!value)enter()}}><DialogContent className="entrance-dialog" showCloseButton={false}>
    <div className="entrance-grid" aria-hidden="true"/>
    <div className="entrance-top"><span><Layers3 size={24}/> casecraft</span><button onClick={enter}>Skip intro <ArrowRight size={16}/></button></div>
    <div className="entrance-layout"><div className="entrance-copy">
      <div className="entrance-kicker"><span/> YOUR NEXT REP STARTS HERE</div>
      <DialogTitle className="entrance-title">Think clearly.<br/><span>Make your case.</span></DialogTitle>
      <DialogDescription className="entrance-description">A place to test your judgment, defend your thinking, and get better with every attempt.</DialogDescription>
      <div className="entrance-cards" aria-hidden="true"><div>01 / THINK<span>Find the real question.</span></div><div>02 / BUILD<span>Make the evidence count.</span></div><div>03 / DEFEND<span>Explain why it works.</span></div></div>
      <button className="enter-casecraft" onClick={enter}>Enter Casecraft <ArrowRight size={21}/></button>
      <p className="entrance-small">Competition Hall · Career Launchpad<br/>Enter anytime. No account or music required.</p>
    </div><aside className="entrance-music" aria-label="Optional intro music">
      <div className="music-heading"><Headphones size={21}/><span>SET THE MOOD</span></div>
      <h2>Your warm-up soundtrack.</h2><p>Real tracks from Drake, through Spotify’s official player.</p>
      {music?<><iframe title="Drake on Spotify" src="https://open.spotify.com/embed/artist/3TVXtAsR1Inumwj472S9r4?utm_source=generator&theme=0" width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/><button className="music-toggle" onClick={()=>setMusic(false)}><VolumeX size={17}/> Stop music & close player</button></>:<><div className="entrance-record" aria-hidden="true"><div><Layers3 size={29}/></div></div><button className="music-toggle" onClick={()=>setMusic(true)}><Headphones size={17}/> Load Spotify player</button></>}
      <p className="music-disclosure">{music?'Press play in Spotify to listen.':'Optional: loading the player connects to Spotify.'} Playback may be a preview or require sign-in. Music stops when you enter.</p>
      <a href={artist} target="_blank" rel="noreferrer">Listen on Spotify <ExternalLink size={13}/></a>
    </aside></div>
    <div className="entrance-bottom"><span>YOUR THINKING. YOUR NEXT LEVEL.</span><span>Independent practice. No artist affiliation.</span></div>
  </DialogContent></Dialog>;
}
