# 🔍 Google Dork Helper

A fully client-side, zero-dependency web app for building, saving, and executing Google Dork queries — from basic keyword filters to advanced OSINT operators.

> No installation. No server. No sign-up. Open `google-dork-helper.html` in any modern browser and start dorking.

---

## Screenshot (features)

```
┌─────────────────────────────────────────────────────────────────────┐
│ 🔍 Google Dork Helper  [⚒️ Builder] [🔬 Advanced Form] [📚 Guide] [💾 Saved]  │
├─────────────────────────────────────────────────────────────────────┤
│  Basic Search Terms          │  OSINT Presets                       │
│  ─────────────────           │  🔑 Exposed Credentials              │
│  All of these words:  [    ] │  [ENV files] [SQL dumps] [Git config]│
│  Exact phrase:        [    ] │                                       │
│  Any of these words:  [    ] │  Core Operators                      │
│  None of these words: [    ] │  [site:] [inurl:] [intitle:] ...     │
│                              │                                       │
│  Generated Query ────────────────────────────────────────────────── │
│  site:example.com filetype:pdf intitle:"confidential"               │
│  [🔍 Google ▾] [🚀 Search] [📋 Copy] [💾 Save] [🗑️ Clear]           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## What is Google Dorking?

**Google Dorking** (also called *Google Hacking*) is the practice of using Google's advanced search operators — called *dorks* — to find information that is not easily surfaced through standard queries. By combining operators like `site:`, `filetype:`, `intitle:`, and `inurl:`, you can filter billions of indexed pages down to a precise, targeted result set.

The technique is widely used in:

- **Security assessments** — discovering accidentally exposed credentials, admin panels, and configuration files
- **OSINT investigations** — mapping an organisation's public attack surface without active scanning
- **Competitive / market research** — finding public documents, reports, or technical disclosures
- **Journalism & academic research** — locating publicly indexed government or corporate records

> You are not hacking Google. You are using its own syntax to ask smarter questions about what it has already indexed.

---

## Features

| Feature | Description |
|---|---|
| **Visual Query Builder** | Toggle operators on/off, fill values, see the query update in real time |
| **Google Advanced Search Form** | A structured form mirroring `google.com/advanced_search` that auto-generates the correct operators |
| **Operator Reference Guide** | Complete in-app documentation for all major search operators, with examples |
| **OSINT Presets** | 20+ one-click dork templates for common findings (exposed creds, open directories, login panels, etc.) |
| **Multi-Engine Search** | Open results in Google, Bing, DuckDuckGo, Yandex, Yahoo, Startpage, or Brave Search |
| **Syntax Highlighting** | Query box colour-codes each operator token for readability |
| **Clipboard Copy** | One-click copy of the generated query |
| **Saved Queries** | Persist named queries in `localStorage`; reload, search, or delete them later |
| **Dark / Light Mode** | Toggle between dark (default) and light themes; preference is saved across sessions |
| **Manual Override** | Paste a raw dork directly into the query box to bypass the builder |
| **100% Client-Side** | No network requests except the final search tab; nothing leaves your browser |

---

## Usage Guide

### ⚒️ Builder Tab

1. **Basic Search Terms** — fill in keywords to AND together, an exact phrase (auto-wrapped in quotes), OR-logic words, and words to exclude.
2. **Core Operators** — click any operator chip to expand an input for its value. Active operators turn highlighted. Supported operators:

   | Operator | Purpose |
   |---|---|
   | `site:` | Restrict to a domain or TLD (e.g. `.gov`, `example.com`) |
   | `inurl:` | Word must appear in the URL |
   | `intitle:` | Word must appear in the page `<title>` |
   | `intext:` | Word must appear in the body text |
   | `filetype:` | Match a specific file format |
   | `ext:` | Match by file extension (alias for `filetype:`) |
   | `cache:` | View Google's cached version of a URL |
   | `related:` | Find sites similar to a given domain |
   | `link:` | Find pages linking to a URL (deprecated but still works) |
   | `allinurl:` | All listed words must appear in the URL |
   | `allintitle:` | All listed words must appear in the title |
   | `allintext:` | All listed words must appear in the body |
   | `before:` | Indexed before YYYY-MM-DD |
   | `after:` | Indexed after YYYY-MM-DD |

3. **OSINT Presets** — click any preset chip to instantly load a ready-made dork query template.
4. **Manual Override** — paste any raw query into the *Manual Query Override* textarea to bypass the builder fields.
5. **Generated Query** — the live preview below shows your built query with colour-coded operator tokens.
6. **Search** — choose your preferred search engine from the dropdown and click **🚀 Search** to open results in a new tab.

### 🔬 Advanced Form Tab

Mirrors the layout of [Google's Advanced Search page](https://www.google.com/advanced_search). Each field maps directly to a dork operator:

| Field | Operator Generated |
|---|---|
| All these words | plain keywords |
| Exact phrase | `"phrase"` |
| Any of these words | `word1 OR word2` |
| None of these words | `-word` |
| Numbers ranging from | `min..max` |
| Site or domain | `site:` |
| URL contains | `inurl:` |
| Title contains | `intitle:` |
| File type | `filetype:` |
| Published after | `after:` |
| Published before | `before:` |

### 💾 Saved Tab

- All saved queries are stored in your browser's `localStorage` — they persist across sessions on the same device and are never sent anywhere.
- Each saved query shows a name, raw query string, and action buttons: **Load** (into Builder), **Search**, **Copy**, and **Delete**.
- When saving, you will be prompted to enter a friendly short name.

### 🌙 Dark / Light Mode

Click the **🌙 Dark / ☀️ Light** button in the top-right of the header. Your preference is saved to `localStorage` and restored on the next visit.

---

## OSINT Presets Reference

| Preset | Generated Dork | Use Case |
|---|---|---|
| ENV files | `ext:env "DB_PASSWORD" OR "APP_KEY"` | Exposed .env config files |
| SQL dumps | `filetype:sql "CREATE TABLE" "INSERT INTO" "password"` | Exposed database dumps |
| Git config | `inurl:.git/config "url = https://"` | Exposed Git repo credentials |
| htpasswd | `inurl:.htpasswd filetype:htpasswd` | Exposed Apache auth files |
| AWS keys | `intext:"AKIA" (filetype:txt OR filetype:env)` | Exposed AWS access keys |
| DB backup | `(ext:sql OR ext:bak OR ext:dump) intitle:"index of"` | Exposed backup files |
| Index of / | `intitle:"index of /" -htm -html` | Open directory listings |
| Open uploads | `intitle:"index of" inurl:uploads` | Open upload directories |
| Backup dirs | `intitle:"index of" inurl:backup` | Open backup directories |
| Admin panels | `inurl:admin intitle:login` | Admin login pages |
| phpMyAdmin | `intitle:"phpMyAdmin" inurl:/phpmyadmin/` | Exposed phpMyAdmin |
| cPanel | `inurl:2082 OR inurl:2083 intitle:cPanel` | cPanel login pages |
| Webmail | `inurl:webmail intitle:"Roundcube Webmail"` | Webmail interfaces |
| Confidential PDFs | `filetype:pdf intitle:"confidential"` | Sensitive PDF documents |
| Password XLS | `filetype:xls intext:"password" intext:"username"` | Passwords in spreadsheets |
| Network configs | `(ext:cfg OR ext:conf) intext:"password"` | Exposed config files |
| Internal docs | `filetype:pdf OR filetype:doc intext:"not for distribution"` | Internal documents |
| Subdomain enum | `site:*.example.com -www` | Subdomain discovery |
| Tech stack | `site:example.com filetype:php OR filetype:asp` | Technology detection |
| Error messages | `site:example.com intext:"Fatal error" OR intext:"stack trace"` | Exposed stack traces |

---

## Search Engines

| Engine | Operator Support | Notes |
|---|---|---|
| **Google** | Full | Most comprehensive; may rate-limit aggressive queries |
| **Bing** | Full | Often indexes content Google doesn't |
| **DuckDuckGo** | Partial | `site:` works well; other operators inconsistent |
| **Yandex** | Partial | Large index for CIS/Russian-language web |
| **Yahoo** | Partial | Powered by Bing index |
| **Startpage** | Full | Proxies Google results anonymously |
| **Brave Search** | Partial | Independent index; growing operator support |

---

## ⚖️ Ethics & Legal Considerations

> **This tool is intended for authorised security research, penetration testing, and OSINT investigations only.**

- Accessing data you are not authorised to view — even if it is publicly indexed — may violate the **Computer Fraud and Abuse Act (CFAA)**, **UK Computer Misuse Act**, **GDPR**, or equivalent legislation in your jurisdiction.
- Downloading, storing, or distributing exposed credentials or personal data is **illegal** regardless of how it was found.
- If you discover inadvertently exposed data belonging to a third party, the ethical response is **responsible disclosure** — notify the owner privately, do not exploit or publish the data.
- Automated scraping or high-volume querying may violate Google's Terms of Service.

**Always obtain explicit written authorisation before performing dork-based reconnaissance on third-party systems.**

---

## Limitations

- The `cache:` operator has been partially deprecated by Google (it still works in some regions).
- The `link:` operator returns only a sample of linking pages and is considered legacy.
- DuckDuckGo, Yandex, Yahoo, and Brave Search do not support the full Google operator set — results may vary.
- Results depend entirely on the public search engine index — this tool does not perform any active scanning.

---

## Repository Structure

```
google-dork-helper/
├── google-dork-helper.html   # Single-file web app
├── README.md                 # This file
└── CHANGELOG.md              # Version history
```

---

## Acknowledgements

- Inspired by [Johnny Long's Google Hacking Database (GHDB)](https://www.exploit-db.com/google-hacking-database)
- Advanced Form layout based on [Google Advanced Search](https://www.google.com/advanced_search)
- Part of the [dev-essentials](../README.md) open-source toolkit

---

## License

MIT — free to use, modify, and distribute.