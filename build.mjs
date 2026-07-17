/**
 * Generates the site from tools.mjs. Ten hand-written pages would drift; one
 * facts file and one template cannot.
 *
 * Run: node build.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { TOOLS, COMMON, EFFECTIVE, CONTACT } from './tools.mjs';

const CSS = `
:root {
  --paper:#DCE0DE; --surface:#FFFFFF; --ink:#15191A; --muted:#6B7371;
  --rule:#C2C8C5; --signal:#1F5F4B; --alert:#9B2C1E;
  --serif: ui-serif, Georgia, "Iowan Old Style", "Times New Roman", serif;
  --mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  --ui: system-ui, -apple-system, sans-serif;
}
@media (prefers-color-scheme: dark) {
  :root { --paper:#0D1011; --surface:#171B1C; --ink:#E4E9E7; --muted:#8B9491;
          --rule:#2C3335; --signal:#58A88C; --alert:#D2705E; }
}
* { box-sizing: border-box; }
body { margin:0; background:var(--paper); color:var(--ink); font-family:var(--ui);
       line-height:1.6; padding: clamp(24px,5vw,64px) clamp(16px,4vw,32px) 64px; }
.wrap { max-width: 720px; margin:0 auto; }
a { color: var(--ink); text-underline-offset: 2px; }
.eyebrow { font-family:var(--mono); font-size:11px; letter-spacing:.14em;
           text-transform:uppercase; color:var(--muted); margin:0 0 12px; }
h1 { font-family:var(--serif); font-weight:400; font-size:clamp(30px,5vw,44px);
     line-height:1.08; letter-spacing:-.015em; margin:0 0 6px; text-wrap:balance; }
.tagline { margin:0 0 28px; color:var(--muted); font-size:15px; }
h2 { font-family:var(--serif); font-weight:400; font-size:22px; margin:34px 0 10px;
     padding-top:20px; border-top:1px solid var(--rule); }
h2:first-of-type { border-top:0; padding-top:0; }
p, li { font-size:15px; }
ul { padding-left:20px; }
li { margin-bottom:7px; }
code { font-family:var(--mono); font-size:.88em; background:var(--surface);
       padding:1px 4px; border-radius:3px; }
@media (prefers-color-scheme: dark) { code { background:#22282A; } }
.headline { border:1px solid var(--signal); color:var(--signal); padding:14px 16px;
            border-radius:2px; margin:0 0 28px; font-size:15px; }
.headline strong { font-weight:600; }
.warn { border-left:3px solid var(--alert); padding:2px 0 2px 16px; margin:16px 0; }
.warn h3 { margin:0 0 6px; font-size:15px; }
table { width:100%; border-collapse:collapse; margin:10px 0; }
th, td { text-align:left; padding:8px 10px 8px 0; border-bottom:1px solid var(--rule);
         vertical-align:top; font-size:14px; }
th { font-family:var(--mono); font-size:10px; letter-spacing:.08em; text-transform:uppercase;
     color:var(--muted); font-weight:400; }
td:first-child { font-family:var(--mono); font-size:12px; white-space:nowrap; padding-right:16px; }
.foot { margin-top:44px; padding-top:20px; border-top:1px solid var(--rule);
        font-size:13px; color:var(--muted); }
.index-list { list-style:none; padding:0; margin:24px 0 0; }
.index-list li { margin:0; border-top:1px solid var(--rule); }
.index-list a { display:flex; justify-content:space-between; gap:16px; align-items:baseline;
                padding:12px 0; text-decoration:none; }
.index-list a:hover .n { text-decoration:underline; }
.n { font-size:16px; }
.t { color:var(--muted); font-size:13px; text-align:right; }
`;

const page = (title, body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>${CSS}</style>
</head>
<body><div class="wrap">
${body}
</div></body>
</html>
`;

const foot = (extra = '') => `
<div class="foot">
  <p>Effective ${EFFECTIVE}. Questions, or a correction: <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>
  ${extra}
  <p><a href="./">All privacy policies</a></p>
</div>`;

function toolPage(t) {
  const parts = [];

  parts.push(`<p class="eyebrow">Privacy policy</p>`);
  parts.push(`<h1>${t.name}</h1>`);
  parts.push(`<p class="tagline">${t.tagline}</p>`);

  // The headline answer, first, because it is the only thing most people want.
  if (t.network.does) {
    parts.push(`<div class="headline">
      <strong>This extension sends no data to us — we have no server.</strong>
      It does contact the websites you ask it to check, which is how it works. Details below.
    </div>`);
  } else {
    parts.push(`<div class="headline">
      <strong>This extension makes no network requests at all.</strong>
      Nothing you do with it leaves your computer, because there is nowhere for it to go.
    </div>`);
  }

  parts.push(`<h2>What it keeps</h2>`);
  if (!t.stores) {
    parts.push(`<p><strong>Nothing.</strong> This tool stores no data whatsoever. It looks at the page when you ask it to, shows you the answer, and forgets it when you close the popup.</p>`);
  } else {
    parts.push('<ul>' + t.stores.map((s) => `<li>${s}</li>`).join('\n') + '</ul>');
    parts.push(`<p>${COMMON.storage}</p>`);
  }

  if (t.sensitive) {
    parts.push(`<div class="warn"><h3>${t.sensitive.title}</h3>`
      + t.sensitive.body.map((b) => `<p>${b}</p>`).join('\n') + '</div>');
  }

  parts.push(`<h2>What leaves your computer</h2>`);
  if (t.network.does) {
    parts.push(t.network.what.map((w) => `<p>${w}</p>`).join('\n'));
  } else {
    parts.push(`<p><strong>Nothing.</strong> ${COMMON.noAnalytics} ${COMMON.noSale}</p>`);
  }

  parts.push(`<h2>Permissions, and why each one</h2>`);
  parts.push('<table><thead><tr><th>Permission</th><th>Why it is needed</th></tr></thead><tbody>'
    + t.permissions.map(([p, why]) => `<tr><td>${p}</td><td>${why}</td></tr>`).join('\n')
    + '</tbody></table>');

  if (t.note) parts.push(`<p>${t.note}</p>`);

  parts.push(`<h2>Your data, your machine</h2>`);
  parts.push(`<p>${COMMON.noAccount} ${COMMON.deletion}</p>`);
  parts.push(`<p>Because nothing is transmitted, there is no copy of anything on any server for us to hand over, lose, or be asked for. That is a deliberate design choice, not an oversight.</p>`);

  parts.push(`<h2>Paid features</h2>`);
  parts.push(`<p>There are none today — every feature is free, and no payment code runs. If a paid tier is added later, payment would be handled by ExtensionPay and Stripe, who would receive your email and payment details directly. This page will be updated before that happens, not after.</p>`);

  parts.push(`<h2>Children</h2>`);
  parts.push(`<p>This extension is a professional tool and is not directed at children. It collects nothing from anyone, of any age.</p>`);

  parts.push(`<h2>Changes</h2>`);
  parts.push(`<p>If what the extension does changes, this page changes first. Every claim here is generated from a single facts file that is kept beside the code, so the two cannot quietly drift apart. The history of this page is public in the repository linked below.</p>`);

  parts.push(foot());

  return page(`${t.name} — Privacy Policy`, parts.join('\n'));
}

function indexPage() {
  const rows = TOOLS.map((t) => `<li><a href="./${t.slug}.html">
      <span class="n">${t.name}</span><span class="t">${t.tagline}</span></a></li>`).join('\n');

  return page('Privacy Policies', `
<p class="eyebrow">Privacy policies</p>
<h1>None of these extensions have a server.</h1>
<p class="tagline">Which makes most of this document short.</p>

<div class="headline">
  <strong>Nine of the ten make no network requests at all.</strong>
  The tenth, Broken Link Checker, contacts the sites you ask it to check — because that is
  the only way to find out whether a link is dead. None of them send anything to us.
</div>

<p>Every one of these tools does its work on your machine. There is no account to create, no
data to sync, and no analytics. Three of them store nothing at all; the rest keep only what
they need, in your browser, where you can delete it by uninstalling.</p>

<p>Each policy below says exactly what that tool keeps, what it never touches, and why it asks
for each permission — in plain words rather than the usual defensive fog.</p>

<ul class="index-list">
${rows}
</ul>

${foot(`<p>These pages are generated from a single facts file kept beside the extensions’ source, so they cannot drift from the code. Both are public: <a href="https://github.com/shaunpeh/project-x-privacy">github.com/shaunpeh/project-x-privacy</a>.</p>`)}
`);
}

mkdirSync('docs', { recursive: true });
writeFileSync('docs/index.html', indexPage());
for (const t of TOOLS) writeFileSync(`docs/${t.slug}.html`, toolPage(t));

console.log(`built docs/index.html + ${TOOLS.length} policies`);
for (const t of TOOLS) console.log(`  docs/${t.slug}.html`);
