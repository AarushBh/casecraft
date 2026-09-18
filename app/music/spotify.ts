type PlaybackEvent = {data:{isPaused:boolean;isBuffering:boolean;position:number;duration:number;playingURI:string}};
export type SpotifyController = {
  play:()=>void; pause:()=>void; destroy:()=>void;
  addListener:(event:'ready'|'playback_update',callback:(event:PlaybackEvent)=>void)=>void;
};
type SpotifyAPI = {createController:(element:HTMLElement,options:{uri:string;width:string;height:number;theme:string},callback:(controller:SpotifyController)=>void)=>void};
declare global {interface Window {onSpotifyIframeApiReady?:(api:SpotifyAPI)=>void;}}
let apiPromise:Promise<SpotifyAPI>|undefined;
export function getSpotifyAPI():Promise<SpotifyAPI>{
  if(apiPromise)return apiPromise;
  apiPromise=new Promise((resolve,reject)=>{
    const script=document.createElement('script');
    const timeout=window.setTimeout(()=>fail(),12000);
    function fail(){window.clearTimeout(timeout);script.remove();apiPromise=undefined;reject(new Error('Spotify is unavailable'));}
    window.onSpotifyIframeApiReady=api=>{window.clearTimeout(timeout);resolve(api)};
    script.src='https://open.spotify.com/embed/iframe-api/v1';script.async=true;script.onerror=fail;document.head.appendChild(script);
  });
  return apiPromise;
}
