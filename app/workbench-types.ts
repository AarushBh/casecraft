import type {ModelRow} from './model-engine';
export type Visual={id:string;title:string;type:'bar'|'line'|'area';unit:string;caption:string;series:{label:string;formula:string}[]};
export type Draft={caseId:number;rows:ModelRow[];memo:{recommendation:string;analysis:string;assumptions:string;risks:string;alternatives:string;execution:string};visuals:Visual[];scenario:number[];elapsed:number};
export type AICritique={summary:string;verdict:string;reasoning:{score:number;feedback:string};feasibility:{score:number;feedback:string};communication:{score:number;feedback:string};strengths:string[];gaps:{claim:string;issue:string;consequence:string;fix:string}[];alternatives:string[];nextSteps:string[]};
