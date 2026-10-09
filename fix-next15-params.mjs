import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('src/app', (file) => {
  if (file.endsWith('.tsx')) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Fix `params: { lang: string }` -> `params: Promise<{ lang: string }>`
    // Fix `params: { lang: string; slug: string }` -> `params: Promise<{ lang: string; slug: string }>`
    if (content.match(/params:\s*\{\s*lang:\s*string\s*\}/)) {
      content = content.replace(/params:\s*\{\s*lang:\s*string\s*\}/g, 'params: Promise<{ lang: string }>');
      changed = true;
    }
    if (content.match(/params:\s*\{\s*lang:\s*string;\s*slug:\s*string\s*\}/)) {
      content = content.replace(/params:\s*\{\s*lang:\s*string;\s*slug:\s*string\s*\}/g, 'params: Promise<{ lang: string; slug: string }>');
      changed = true;
    }
    
    // Now replace `params.lang` or `params.slug` with a resolved version.
    // A simple hack since most components just do `const lang = params.lang;`
    // If it's an async component, we can do `const p = await params;`
    // Actually, let's just do a string replacement.
    if (changed) {
       // Find all component definitions and inject `const resolvedParams = await params;` 
       // Then replace `params.lang` with `resolvedParams.lang`
       content = content.replace(/export async function (.*?)\(.*params.*\) \{/g, 'export async function $1(props: any) { const params = await props.params;');
       content = content.replace(/export default async function (.*?)\(.*params.*\) \{/g, 'export default async function $1(props: any) { const params = await props.params;');
       
       // For generateMetadata, some don't have props explicitly named, but we replaced the type. Let's just restore the manual fix.
    }
    
    // Better Regex logic:
    // If we just replace `params: {` with `params: Promise<{` we still need `await`.
  }
});
