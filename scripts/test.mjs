import {createRequire} from 'node:module';
import {mkdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const require=createRequire(import.meta.url);
const esbuild=require(require.resolve('esbuild',{paths:[require.resolve('wrangler/package.json')]}));
await mkdir('work',{recursive:true});
for(const name of ['model-engine','training','competition','music','library','company']){
 const outfile=`work/${name}.test.mjs`;
 await esbuild.build({entryPoints:[`tests/${name}.test.ts`],bundle:true,platform:'node',format:'esm',outfile});
 const result=spawnSync(process.execPath,[outfile],{stdio:'inherit'});if(result.status!==0)process.exit(result.status??1);
}
