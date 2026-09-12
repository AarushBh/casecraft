import {cp,rm,writeFile} from 'node:fs/promises';
await rm('docs',{recursive:true,force:true});
await cp('public-dist','docs',{recursive:true});
await writeFile('docs/.nojekyll','');
console.log('GitHub Pages output ready in docs/');
