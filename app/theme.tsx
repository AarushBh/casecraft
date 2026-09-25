import {useEffect,useState} from 'react';
import {Moon} from 'lucide-react';
export function ThemeControl(){
 const [theme,setTheme]=useState(()=>{try{const saved=localStorage.getItem('casecraft-theme');return saved==='dark'||saved==='light'?saved:'system'}catch{return 'system'}});
 useEffect(()=>{const media=matchMedia('(prefers-color-scheme: dark)');const apply=()=>{document.documentElement.dataset.theme=theme==='system'?(media.matches?'dark':'light'):theme};apply();media.addEventListener('change',apply);try{localStorage.setItem('casecraft-theme',theme)}catch{}return()=>media.removeEventListener('change',apply)},[theme]);
 return <label className="theme-control"><Moon size={15}/><span className="sr-only">Color theme</span><select aria-label="Color theme" value={theme} onChange={e=>setTheme(e.target.value)}><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></label>
}
