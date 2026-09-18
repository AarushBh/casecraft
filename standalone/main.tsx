import React,{useEffect} from 'react';
import {createRoot} from 'react-dom/client';

function revealApp(){
  const boot=document.getElementById('boot-screen');
  if(!boot)return;
  boot.classList.add('boot-ready');
  window.setTimeout(()=>boot.remove(),250);
}
function Ready({children}:{children:React.ReactNode}){
  useEffect(()=>{const frame=requestAnimationFrame(revealApp);return()=>cancelAnimationFrame(frame)},[]);
  return children;
}
function startupError(){
  const status=document.getElementById('boot-status'),retry=document.getElementById('boot-retry');
  if(status)status.textContent='Couldn’t open Casecraft. Check your connection and retry.';
  if(retry)retry.hidden=false;
}
class StartupBoundary extends React.Component<{children:React.ReactNode},{failed:boolean}>{
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true}}
  componentDidCatch(){startupError()}
  render(){return this.state.failed?<div role="alert" style={{padding:40}}>Casecraft couldn’t open. <a href="">Reload</a></div>:this.props.children}
}
// The HTML loader stays visible while the application and its stylesheet load.
Promise.all([import('../app/page'),import('../app/globals.css')]).then(([{default:Home}])=>{
  createRoot(document.getElementById('root')!).render(<React.StrictMode><StartupBoundary><Ready><Home/></Ready></StartupBoundary></React.StrictMode>);
}).catch(startupError);
