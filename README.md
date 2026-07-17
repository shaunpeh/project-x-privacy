# Privacy policies

Privacy policies for a small family of Chrome extensions, served at
**https://shaunpeh.github.io/project-x-privacy/**

They are public and in version control on purpose. A privacy policy is a claim about
what software does; if you cannot see when the claim changed, it isn't worth much.

## Why it is generated

`tools.mjs` holds the facts — one entry per extension, each read out of that
extension's own `manifest.json` and source rather than assumed. `build.mjs` renders
them into `docs/`.

Ten hand-written pages drift. One facts file and one template cannot. If an
extension's behaviour changes, the fix is one edit and a rebuild — and the diff shows
exactly which claim changed.

```bash
node build.mjs   # writes docs/index.html + one page per extension
```

## The short version

- Nine of the ten extensions make **no network requests at all**.
- The tenth, Broken Link Checker, contacts the sites you ask it to check — which is
  the only way to tell a live link from a dead one. Nothing goes to us either way.
- Three store **nothing whatsoever**.
- There is no server, no account, no analytics, no telemetry, no advertising.

## Adding or changing a policy

1. Edit the extension's entry in `tools.mjs`.
2. `node build.mjs`
3. Commit. The change is then public and dated.

Do not edit anything in `docs/` by hand — it is generated and will be overwritten.

## Licence

The policy text is free to read and to quote. The extensions themselves are separate.
