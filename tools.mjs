/**
 * The facts. Every claim on every generated page comes from here, and every one
 * of these was read out of the extension's own manifest and source — not
 * assumed, not copied from a template.
 *
 * If a tool's behaviour changes, change it here and rebuild. A privacy policy
 * that drifts from the code is worse than none: it is a false statement you
 * published on purpose.
 */

export const EFFECTIVE = '17 July 2026';
export const CONTACT = 'shaunpeh@gmail.com';

/** True of every tool in this portfolio, and the reason the rest is short. */
export const COMMON = {
  noAccount: 'There is no account, no sign-up and no login.',
  noAnalytics: 'The extension contains no analytics, no telemetry, no advertising and no tracking of any kind.',
  noSale: 'Nothing is sold, rented or shared. There is no third party to share it with.',
  storage: 'Anything saved is kept in your browser’s own extension storage on this device, using chrome.storage.local.',
  deletion: 'Uninstalling the extension deletes everything it stored. You can also clear it yourself from the extension’s options at any time.',
};

export const TOOLS = [
  {
    slug: 'broken-link-checker',
    name: 'Broken Link Checker',
    tagline: 'Find dead links on any page in one click.',
    stores: null,
    // The one tool in the portfolio that necessarily reaches the network.
    network: {
      does: true,
      what: [
        'When you click Scan, the extension sends a request to every link on the page to find out whether it still works. There is no other way to tell a live link from a dead one.',
        'Those requests go directly from your browser to each linked site, exactly as if you had clicked the link yourself. That means each of those sites can see your IP address and that something requested the page.',
        'Nothing is sent to us, or to any server of ours. We do not have one.',
        'The results are shown in the popup and are gone when you close it.',
      ],
    },
    permissions: [
      ['activeTab', 'To read the list of links on the page you are looking at, and only when you click Scan.'],
      ['scripting', 'To run the small function that collects those links from the page.'],
      ['storage', 'Declared for the subscription feature, which is built on <a href="https://extensionpay.com">ExtensionPay</a>. The current free version does not activate it, so nothing is written to your device today. If a paid tier is ever turned on, ExtensionPay uses this to remember your subscription on this device — nothing else.'],
      ['&lt;all_urls&gt; (optional)', 'Requested at the moment you click Scan, never at install. Testing a link means contacting the site it points at, and those sites can be anywhere — so the permission has to cover any address. If you decline, nothing is scanned.'],
    ],
  },
  {
    slug: 'dyslexia-font-swap',
    name: 'Dyslexia Font Swap',
    tagline: 'Read every page in a dyslexia-friendly font.',
    stores: ['Your font choice and your spacing, line height and text size settings. Five numbers and a font name.'],
    network: { does: false },
    permissions: [
      ['storage', 'To remember your font and spacing settings between pages and sessions.'],
      ['&lt;all_urls&gt;', 'The extension restyles text on every page automatically, with no click. A tool that needed permission per page would be useless as a reading aid — you would have to ask for it every time you followed a link. It applies a stylesheet; it does not read what the page says.'],
    ],
  },
  {
    slug: 'tab-time-tracker',
    name: 'Tab Time Tracker',
    tagline: 'See where your browser time actually goes.',
    stores: [
      'The <strong>domain</strong> of sites you view and how many milliseconds each was in front — for example <code>github.com, 1h 45m</code>, bucketed by day.',
      'It does not store page addresses, page titles, page content, or anything you typed. Only the domain.',
      'Data older than 90 days is deleted automatically.',
    ],
    network: { does: false },
    permissions: [
      ['tabs', 'Chrome shows this as “Read your browsing history”, and that warning is fair — it is the honest name for it. Knowing which site is in front of you is the entire function, and Chrome offers no narrower way to ask. The extension reads the tab’s address only to extract the domain, and keeps nothing else.'],
      ['idle', 'To stop the clock when you step away, so time you were not at the machine is never counted. This is what stops the numbers being wrong.'],
      ['storage', 'To keep your own totals on this device.'],
    ],
  },
  {
    slug: 'text-snippets',
    name: 'Text Snippets',
    tagline: 'Type a short trigger, get the whole paragraph.',
    stores: ['The snippets you create: the trigger and the text it expands into. That is all — they are your words, written by you.'],
    network: { does: false },
    sensitive: {
      title: 'What it sees while you type',
      body: [
        'To expand a trigger, the extension has to watch what you type into text boxes. This is worth being blunt about, because it is the obvious question.',
        'It compares the characters immediately before your cursor against your own list of triggers. If there is no match — which is almost always — nothing happens and nothing is kept.',
        'It never stores what you type, never sends it anywhere, and never builds any record of it.',
        '<strong>It does not run in password fields at all.</strong> Password boxes are excluded outright, and so are card, number and date fields.',
      ],
    },
    permissions: [
      ['storage', 'To keep your snippets on this device.'],
      ['&lt;all_urls&gt;', 'A text expander that only worked on some sites would not be a text expander. It has to be present in whatever box you happen to be typing in, on the first keystroke, without you clicking anything first.'],
    ],
  },
  {
    slug: 'form-autosave',
    name: 'Form Autosave',
    tagline: 'Never lose a long form again.',
    stores: [
      'What you type into forms, so it can be put back after a crash or a timeout. This is the most sensitive thing anything in this portfolio keeps, so here is exactly what is and is not included.',
      'It is stored against the page address without its query string — so session tokens in the address are never saved.',
      'Drafts older than 30 days are deleted automatically.',
    ],
    sensitive: {
      title: 'What it never saves',
      body: [
        '<strong>Password fields.</strong> Never, under any circumstances.',
        '<strong>Payment card fields</strong> — card number, expiry, security code, cardholder name.',
        '<strong>Any field the site marks private.</strong> If a site sets <code>autocomplete="off"</code>, we honour it and skip the field, even though that costs us coverage on sites that set it carelessly. The site’s instruction wins over our convenience.',
        '<strong>Hidden fields, file uploads,</strong> and anything whose name looks like a security code, national insurance or social security number, bank routing number, IBAN or passport number.',
        'That last check deliberately over-excludes: it will skip fields that were harmless. A field we miss costs you a retype. A field we should not have kept is a much worse problem.',
      ],
    },
    network: { does: false },
    permissions: [
      ['storage', 'To keep your drafts on this device.'],
      ['&lt;all_urls&gt;', 'A form is only worth rescuing if it was being saved while you typed — which means before you knew you would need it. There is no click we could wait for.'],
    ],
  },
  {
    slug: 'highlight-markdown',
    name: 'Highlight to Markdown',
    tagline: 'Right-click any quote. Get clean Markdown with the source link.',
    stores: ['The quotes you save: the selected text, the page address and title it came from, and when you saved it. Only what you deliberately right-clicked and chose to keep.'],
    network: { does: false },
    permissions: [
      ['contextMenus', 'To add the “Save quote to Markdown” item to your right-click menu.'],
      ['activeTab', 'Granted only at the instant you use that menu item, to read the page title for the citation. Not before, not after.'],
      ['scripting', 'To read that title.'],
      ['storage', 'To keep your quotes on this device.'],
    ],
    note: 'This extension has no access to any page until you right-click a selection. It is not present on pages you are simply reading.',
  },
  {
    slug: 'consent-auditor',
    name: 'Consent Auditor',
    tagline: 'See which third parties a page contacts before anyone agrees to anything.',
    stores: [
      'For pages you visit while it is enabled: the page address, and the list of addresses that page requested — which is the audit itself.',
      'The page address is stored in full, including any query string, because an auditor needs to know exactly which page produced a finding.',
      'It records what the page loaded. It does not record page content, form input, or anything you typed.',
    ],
    network: { does: false },
    permissions: [
      ['storage', 'To keep audits on this device.'],
      ['&lt;all_urls&gt;', 'The whole point is to see what a page does <em>before</em> you touch it, which means being present from the moment it starts loading. Nothing to click, because a click is the thing being measured.'],
    ],
    note: 'This is a professional auditing tool. It observes what pages request, using timing information the browser already collects. It does not intercept, block or modify traffic.',
  },
  {
    slug: 'font-licence-auditor',
    name: 'Font Licence Auditor',
    tagline: 'Which foundry owns the fonts on this page.',
    stores: null,
    network: { does: false },
    permissions: [
      ['activeTab', 'To read which fonts the page loaded, and only when you click Check.'],
      ['scripting', 'To run the function that collects them.'],
      ['storage', 'Declared for the subscription feature, which is built on <a href="https://extensionpay.com">ExtensionPay</a>. The current free version does not activate it, so nothing is written to your device today. If a paid tier is ever turned on, ExtensionPay uses this to remember your subscription on this device — nothing else.'],
    ],
    note: 'The database of foundries and licence types ships inside the extension. Nothing is looked up online, so no one learns which sites you audited.',
  },
  {
    slug: 'evidence-capture',
    name: 'Evidence Capture',
    tagline: 'Capture a page whole, fingerprinted and timestamped.',
    stores: [
      'A log of your captures: the page address, its title, the time, the SHA-256 fingerprint and the file size. Plus the case name you typed.',
      'The captured archives themselves are saved to your Downloads folder by your browser, like any other download. They are yours, on your disk, and this extension does not read them again.',
    ],
    network: { does: false },
    permissions: [
      ['pageCapture', 'To save the page and its images as a single archive file.'],
      ['activeTab', 'To capture the page you are looking at, when you click Capture.'],
      ['storage', 'To keep your capture log on this device.'],
    ],
    note: 'This tool exists because investigators need their chain of custody on their own machine. Sending captures to a server would defeat the purpose, so there is no server.',
  },
  {
    slug: 'accessibility-auditor',
    name: 'Accessibility Auditor',
    tagline: 'The six accessibility problems you can actually fix.',
    stores: null,
    network: { does: false },
    permissions: [
      ['activeTab', 'To examine the page you are looking at, and only when you click Check.'],
      ['scripting', 'To run the checks inside the page.'],
      ['storage', 'Declared for the subscription feature, which is built on <a href="https://extensionpay.com">ExtensionPay</a>. The current free version does not activate it, so nothing is written to your device today. If a paid tier is ever turned on, ExtensionPay uses this to remember your subscription on this device — nothing else.'],
    ],
  },
  {
    slug: 'payment-script-inventory',
    name: 'Payment Page Script Inventory',
    tagline: 'Inventory every script on your payment page, with a justification for each.',
    stores: [
      'A baseline of the scripts found on a page: each script’s address and its SHA-256 fingerprint. It is saved only when you export, so that a later scan can tell you what has changed since.',
    ],
    // Like Broken Link Checker, this one necessarily reaches the network — it
    // must fetch each script to fingerprint it.
    network: {
      does: true,
      what: [
        'When you click Scan, the extension fetches each script the page loaded, so it can compute a SHA-256 fingerprint of the exact code. There is no other way to verify that a script has not been altered.',
        'Those requests go directly from your browser to wherever each script is hosted, exactly as the page itself loaded them. Each of those hosts can see your IP address, as they already did when the page loaded.',
        'Nothing is sent to us, or to any server of ours. We do not have one.',
        'The inventory is shown in the popup. When you export, a CSV file is saved to your Downloads folder, on your own disk.',
      ],
    },
    permissions: [
      ['activeTab', 'To read the scripts on the page you are looking at, and only when you click Scan.'],
      ['scripting', 'To run the small function that collects them from the page.'],
      ['storage', 'To keep the baseline you export, so a later scan can detect changes — and, if a paid tier is ever turned on, your subscription state via <a href="https://extensionpay.com">ExtensionPay</a>.'],
      ['&lt;all_urls&gt; (optional)', 'Requested at the moment you click Scan, never at install. Fingerprinting a script means fetching it from wherever it is hosted, and those hosts can be anywhere — so the permission has to cover any address. If you decline, the scripts are still listed, but they cannot be fingerprinted.'],
    ],
    note: 'The database of script vendors and their draft justifications ships inside the extension; the fingerprinting happens in your browser. This tool produces the inventory PCI DSS 6.4.3 asks for. It never states that you are compliant — that is your assessor’s judgement, not ours.',
  },
];
