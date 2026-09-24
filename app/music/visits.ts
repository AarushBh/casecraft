const visitKey='casecraft-music-visits-v1';
type VisitStorage=Pick<Storage,'getItem'|'setItem'>;
// One count per document, even if React remounts or the intro is reopened.
export function createVisitTracker(getStorage:()=>VisitStorage){
 let currentVisit:number|undefined;
 return ()=>{
  if(currentVisit!==undefined)return currentVisit;
  currentVisit=1;
  try{
   const storage=getStorage();
   const raw=storage.getItem(visitKey);
   const previous=raw!==null&&/^[0-6]$/.test(raw)?Number(raw):0;
   const next=Math.min(previous+1,6);
   storage.setItem(visitKey,String(next));
   currentVisit=next;
  }catch{/* Keep the rare track locked when visits cannot be saved reliably. */}
  return currentVisit;
 };
}
export const getMusicVisit=createVisitTracker(()=>localStorage);
