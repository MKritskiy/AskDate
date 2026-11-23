// Static checks for the AskDate frontend: node tools/check-frontend.mjs
// 1) JS parses   2) i18n keys exist in ru and en, used keys are defined, no unused keys
// 3) every id passed to el('...') exists in index.html or is created by the JS itself
// 4) functions called from inline handlers exist   5) no emoji characters
import { readFileSync } from 'node:fs';

const root = new URL('../Web/wwwroot/', import.meta.url);
const js = readFileSync(new URL('app.js', root), 'utf8');
const html = readFileSync(new URL('index.html', root), 'utf8');
const css = readFileSync(new URL('style.css', root), 'utf8');

let problems = 0;
const fail = message => { problems++; console.log('FAIL  ' + message); };
const uniq = list => Array.from(new Set(list));

// --- 1. JS parses (import would also run the file; a Function body only compiles it) ---
try {
    new Function(js);
    console.log('OK    app.js parses');
} catch (error) {
    fail('app.js does not parse: ' + error.message);
}

// --- 2. i18n ---
const ruBlock = js.slice(js.indexOf("'ru': {"), js.indexOf("'en': {"));
const enBlock = js.slice(js.indexOf("'en': {"), js.indexOf('// ============================================================\n// i18n'));
const keysOf = block => uniq(Array.from(block.matchAll(/'([a-zA-Z0-9.]+)':\s*'/g), match => match[1]));
const ruKeys = keysOf(ruBlock);
const enKeys = keysOf(enBlock);
const keySet = new Set(ruKeys);

const missingInEn = ruKeys.filter(key => !enKeys.includes(key));
const missingInRu = enKeys.filter(key => !ruKeys.includes(key));
if (missingInEn.length) fail('keys missing in en: ' + missingInEn.join(', '));
if (missingInRu.length) fail('keys missing in ru: ' + missingInRu.join(', '));
console.log(`OK    i18n tables have the same ${ruKeys.length} keys in ru and en`);

const usedInJs = uniq([
    ...Array.from(js.matchAll(/\bgetT\(\s*'([a-zA-Z0-9.]+)'/g), match => match[1]),
    ...Array.from(js.matchAll(/\btF\(\s*'([a-zA-Z0-9.]+)'/g), match => match[1]),
    // any other dotted string literal outside the translation tables (ternaries such as getT(ok ? 'a.on' : 'a.off'))
    ...Array.from(js.slice(js.indexOf('// i18n')).matchAll(/'([a-z]+\.[a-zA-Z0-9]+)'/g), match => match[1]).filter(key => key !== 'favicon.svg')
]);
const usedInHtml = uniq(Array.from(html.matchAll(/data-(?:i18n|i18n-placeholder|title-i18n|aria-i18n)="([a-zA-Z0-9.]+)"/g), match => match[1]));
const used = new Set([...usedInJs, ...usedInHtml]);

// Keys composed at runtime (markToast builds them from the mark type and shape)
const DYNAMIC_KEYS = [
    'toast.freeDay', 'toast.busyDay', 'toast.rangeFree', 'toast.rangeBusy',
    'toast.freeTime', 'toast.busyTime', 'toast.freeRangeTime', 'toast.busyRangeTime'
];
const undefinedKeys = [...used].filter(key => !keySet.has(key));
if (undefinedKeys.length) fail('used but not defined: ' + undefinedKeys.join(', '));
const unusedKeys = ruKeys.filter(key => !used.has(key) && !DYNAMIC_KEYS.includes(key));
if (unusedKeys.length) fail('defined but never used: ' + unusedKeys.join(', '));
if (!undefinedKeys.length && !unusedKeys.length) console.log(`OK    all ${used.size} i18n keys are defined and used`);

// --- 3. element ids ---
const htmlIds = new Set(Array.from(html.matchAll(/\bid="([a-zA-Z0-9_-]+)"/g), match => match[1]));
const createdIds = new Set(Array.from(js.matchAll(/\bid=\\?"([a-zA-Z0-9_]+)(?:_|\\?")/g), match => match[1]));
const elIds = uniq(Array.from(js.matchAll(/\bel\('([a-zA-Z0-9_]+)'\)/g), match => match[1]));
const missingIds = elIds.filter(id => !htmlIds.has(id) && !createdIds.has(id) && !id.startsWith('recDay'));
if (missingIds.length) fail("el('...') targets that do not exist: " + missingIds.join(', '));
if (!missingIds.length) console.log(`OK    all ${elIds.length} el('...') targets exist`);
const duplicates = Array.from(html.matchAll(/\bid="([a-zA-Z0-9_-]+)"/g), match => match[1]).filter((id, index, all) => all.indexOf(id) !== index);
if (duplicates.length) fail('duplicate ids in index.html: ' + uniq(duplicates).join(', '));

// --- 4. inline handlers ---
const exported = new Set(Array.from(js.slice(js.indexOf('Object.assign(window, {')).matchAll(/\b([a-zA-Z]+)[,:\s]/g), match => match[1]));
const globals = new Set([...Array.from(js.matchAll(/^(?:async )?function ([a-zA-Z0-9_]+)/gm), match => match[1]), ...exported]);
const htmlCalls = uniq(Array.from(html.matchAll(/on(?:click|keydown|change|input)="([a-zA-Z0-9_]+)\(/g), match => match[1]));
const unknown = htmlCalls.filter(name => !globals.has(name));
if (unknown.length) fail('inline handlers call unknown functions: ' + unknown.join(', '));
if (!unknown.length) console.log(`OK    all ${htmlCalls.length} functions used by inline handlers exist`);

// --- 5. no emoji ---
const emoji = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{FE0F}]/u;
for (const [name, text] of [['app.js', js], ['index.html', html], ['style.css', css]]) {
    const lines = text.split('\n').map((line, index) => ({ line, number: index + 1 })).filter(item => emoji.test(item.line));
    if (lines.length) fail(`emoji in ${name}: line ${lines.map(item => item.number).join(', ')}`);
}
console.log('OK    no emoji characters in app.js, index.html, style.css');

// --- 6. CSS classes used from JS/HTML exist ---
const cssClasses = new Set(Array.from(css.matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g), match => match[1]));
const usedClasses = uniq([
    ...Array.from(html.matchAll(/class="([^"]+)"/g), match => match[1]).flatMap(value => value.split(/\s+/)),
    ...Array.from(js.matchAll(/class(?:Name)?=\\?"([^"\\$]+)\\?"/g), match => match[1]).flatMap(value => value.split(/\s+/)),
    ...Array.from(js.matchAll(/classList\.(?:add|toggle|remove)\('([a-zA-Z0-9_-]+)'/g), match => match[1])
]).filter(name => /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name));
// fc-*: FullCalendar's own styles; the rest are semantic wrappers that need no rules
const external = name => name.startsWith('fc-') || name.startsWith('upcoming-card')
    || ['list-item', 'flex-row', 'btn', 'hidden', 'avatar', 'skeleton', 'modal', 'toast', 'seg-btn', 'sidebar', 'content', 'offline', 'comment-view'].includes(name);
const missingCss = usedClasses.filter(name => !cssClasses.has(name) && !external(name));
if (missingCss.length) fail('classes without CSS rules: ' + missingCss.join(', '));
if (!missingCss.length) console.log(`OK    all ${usedClasses.length} statically used classes have CSS rules`);

// --- 7. no direct self-recursion (a bulk rename once made a helper call itself unconditionally) ---
const codeOnly = js
    .replace(/`(?:\\[\s\S]|[^\\`])*`/g, '``')
    .replace(/'(?:\\.|[^\\'\n])*'/g, "''")
    .replace(/"(?:\\.|[^\\"\n])*"/g, '""')
    .replace(/\/\/.*$/gm, '');
// Intentional recursion: "load more" re-arms itself through a click handler; a series repeat
// takes the description of its parent.
const INTENTIONAL_RECURSION = new Set(['appendUpcomingEvents', 'getRecurrenceDescription']);
const recursive = [];
for (const match of codeOnly.matchAll(/^(?:async )?function ([a-zA-Z0-9_]+)\(/gm)) {
    const name = match[1];
    if (INTENTIONAL_RECURSION.has(name)) continue;
    const open = codeOnly.indexOf('{', match.index);
    let depth = 0;
    let end = open;
    for (; end < codeOnly.length; end++) {
        if (codeOnly[end] === '{') depth++;
        else if (codeOnly[end] === '}' && --depth === 0) break;
    }
    if (new RegExp(`(?<![.\\w$])${name}\\(`).test(codeOnly.slice(open, end))) recursive.push(name);
}
if (recursive.length) fail('functions call themselves directly: ' + recursive.join(', '));
else console.log('OK    no function calls itself directly');

console.log(problems ? `\n${problems} PROBLEM(S)` : '\nALL CHECKS PASSED');
process.exit(problems ? 1 : 0);
