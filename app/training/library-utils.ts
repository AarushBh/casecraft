export type HistoryEntry={id:string;caseId?:string;title:string;score:number;max:number};
export function readPracticeHistory(value:unknown):HistoryEntry[]{
 if(!Array.isArray(value))return [];
 return value.filter((entry):entry is HistoryEntry=>{
  if(!entry||typeof entry!=='object')return false;
  const v=entry as Record<string,unknown>;const max=v.max??100;
  return typeof v.id==='string'&&typeof v.title==='string'&&(v.caseId===undefined||typeof v.caseId==='string')&&typeof v.score==='number'&&Number.isFinite(v.score)&&v.score>=0&&typeof max==='number'&&Number.isFinite(max)&&max>0&&v.score<=max;
 }).map(entry=>({...entry,max:entry.max??100})).slice(0,30);
}
export function matchesSearch(text:string,query:string){
 return query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean).every(term=>text.toLocaleLowerCase().includes(term));
}
export function wordCount(text:string){return text.trim()?text.trim().split(/\s+/).length:0}
