# Troubleshooting Guide

Common errors và solutions trong quá trình migration.

---

## 🔍 How to Use This Guide

1. Find your error message/symptom
2. Try solutions in order
3. If fixed → Continue migration
4. If not fixed → Check "Advanced Solutions"
5. Still stuck → Rollback và consult

---

## 📦 Installation & Setup Errors

### Error: "command not found: npm"

**Symptom:**
```bash
$ npm install
bash: npm: command not found
```

**Cause:** Node.js chưa cài đặt

**Solutions:**

```bash
# Mac
brew install node

# Windows
# Download từ: https://nodejs.org
# Chạy installer

# Linux (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

---

### Error: "Cannot find module '@11ty/eleventy'"

**Symptom:**
```bash
$ npx @11ty/eleventy
Error: Cannot find module '@11ty/eleventy'
```

**Cause:** Eleventy chưa được install

**Solutions:**

```bash
# Install Eleventy
npm install @11ty/eleventy --save-dev

# Verify installation
npx @11ty/eleventy --version

# If still error, try global install
npm install -g @11ty/eleventy
```

---

### Error: "EACCES: permission denied"

**Symptom:**
```bash
npm install
Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules'
```

**Cause:** Permission issues

**Solutions:**

```bash
# Option 1: Use npm's built-in fix
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Option 2: Fix permissions (Mac/Linux)
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Option 3: Use npx (no install needed)
npx @11ty/eleventy --serve
```

---

## 🏗️ Build Errors

### Error: "Template render error"

**Symptom:**
```bash
[11ty] Problem writing Eleventy templates:
[11ty] 1. Having trouble rendering njk template ./src/index.njk
[11ty] TemplateContentRenderError: ...
```

**Cause:** Syntax error trong Nunjucks template

**Solutions:**

**Step 1: Find the line**
```
Error message shows: (./src/index.njk) [Line 45, Column 12]
```

**Step 2: Check common issues:**

```njk
{# ❌ WRONG - Missing closing tag #}
{% for film in collections.shortFilms %}
  <div>{{ film.data.title }}</div>
{# Missing: {% endfor %} #}

{# ✅ CORRECT #}
{% for film in collections.shortFilms %}
  <div>{{ film.data.title }}</div>
{% endfor %}
```

```njk
{# ❌ WRONG - Typo in variable #}
{{ film.data.tittle }}

{# ✅ CORRECT #}
{{ film.data.title }}
```

```njk
{# ❌ WRONG - Wrong filter syntax #}
{{ content | safe() }}

{# ✅ CORRECT #}
{{ content | safe }}
```

**Step 3: Validate syntax:**
```bash
# Check for unclosed tags
grep -n "{% for" src/*.njk
grep -n "{% endfor" src/*.njk
# Count should match

# Check for unclosed if
grep -n "{% if" src/*.njk
grep -n "{% endif" src/*.njk
```

---

### Error: "Cannot read property 'data' of undefined"

**Symptom:**
```bash
TypeError: Cannot read property 'data' of undefined
    at Object.eval (eval at _compile ...)
```

**Cause:** Collection empty hoặc không tồn tại

**Solutions:**

**Step 1: Check collection exists:**

```javascript
// .eleventy.js
eleventyConfig.addCollection("shortFilms", function(collectionApi) {
  const films = collectionApi.getFilteredByGlob("src/content/short-films/*.md");
  
  // Debug: Check if empty
  console.log("Films found:", films.length);
  if (films.length === 0) {
    console.warn("WARNING: No films found!");
  }
  
  return films;
});
```

**Step 2: Verify glob pattern:**
```bash
# Check files exist
ls -la src/content/short-films/*.md

# Should list .md files
# If empty → files không ở đúng chỗ
```

**Step 3: Fix template:**
```njk
{# ❌ WRONG - No safety check #}
{% for film in collections.shortFilms %}
  {{ film.data.title }}
{% endfor %}

{# ✅ CORRECT - Check if exists #}
{% if collections.shortFilms %}
  {% for film in collections.shortFilms %}
    {{ film.data.title }}
  {% endfor %}
{% else %}
  <p>No films found.</p>
{% endif %}
```

---

### Error: "Unexpected token < in JSON"

**Symptom:**
```bash
SyntaxError: Unexpected token < in JSON at position 0
```

**Cause:** Trying to parse HTML as JSON (usually from API/fetch)

**Solutions:**

**For data files:**
```javascript
// ❌ WRONG - Importing HTML as JSON
import data from './data.html';

// ✅ CORRECT
import data from './data.json';
```

**For fetch requests:**
```javascript
// ❌ WRONG - Getting HTML instead of JSON
const response = await fetch('/api/films');
const data = await response.json();  // Fails if response is HTML

// ✅ CORRECT - Check content type
const response = await fetch('/api/films');
const contentType = response.headers.get('content-type');

if (contentType && contentType.includes('application/json')) {
  const data = await response.json();
} else {
  console.error('Received HTML instead of JSON');
  const text = await response.text();
  console.log(text);  // Shows the HTML for debugging
}
```

---

### Error: "ENOENT: no such file or directory"

**Symptom:**
```bash
Error: ENOENT: no such file or directory, open 'src/content/films/film.md'
```

**Cause:** File path không đúng

**Solutions:**

**Step 1: Check file exists:**
```bash
# Absolute path
ls -la src/content/films/film.md

# If "No such file or directory"
# → File không tồn tại hoặc path sai
```

**Step 2: Check relative paths:**
```javascript
// .eleventy.js
return {
  dir: {
    input: "src",        // ← Base directory
    output: "_site",
    includes: "_includes"
  }
};

// Glob pattern phải relative to input:
"src/content/films/*.md"  // ❌ WRONG (double src)
"content/films/*.md"      // ✅ CORRECT
```

**Step 3: Check file permissions:**
```bash
# Check readable
ls -l src/content/films/

# Should see: -rw-r--r--
# If: ---------- → No permissions
chmod 644 src/content/films/*.md
```

---

## 📝 Markdown Processing Errors

### Error: Markdown not rendering to HTML

**Symptom:** Page shows raw Markdown instead of HTML:
```
## Logline

This is **bold** text
```

**Cause:** Markdown parser not configured

**Solutions:**

**Step 1: Check Eleventy config:**
```javascript
// .eleventy.js
let markdownIt = require("markdown-it");

let options = {
  html: true,        // ← IMPORTANT: Allow HTML in Markdown
  breaks: true,
  linkify: true
};

let markdownLib = markdownIt(options);
eleventyConfig.setLibrary("md", markdownLib);
```

**Step 2: Install markdown-it:**
```bash
npm install markdown-it --save-dev
```

**Step 3: Check file extension:**
```bash
# Must be .md
mv film.txt film.md
```

**Step 4: Check template:**
```njk
{# ❌ WRONG - Shows raw markdown #}
{{ content }}

{# ✅ CORRECT - Renders HTML #}
{{ content | safe }}
```

---

### Error: HTML tags stripped from Markdown

**Symptom:** `<iframe>` tags disappear in output

**Cause:** `html: false` in Markdown config

**Solutions:**

```javascript
// .eleventy.js
let options = {
  html: true,  // ← Must be true to preserve HTML
  breaks: true
};

let markdownLib = markdownIt(options);
eleventyConfig.setLibrary("md", markdownLib);
```

**Verify in output:**
```html
<!-- _site/films/film-name/index.html -->
<!-- Should see: -->
<iframe src="https://youtube.com/..."></iframe>

<!-- NOT: -->
<!-- Empty or stripped -->
```

---

### Error: Code blocks not rendering

**Symptom:** Code shows as plain text without highlighting

**Solutions:**

**Option 1: Use Prism (built-in):**
```javascript
// .eleventy.js
module.exports = function(eleventyConfig) {
  // Prism is included by default
  // Just need CSS
};
```

```html
<!-- Add to layout -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css">
```

**Option 2: Use Highlight.js:**
```bash
npm install @11ty/eleventy-plugin-syntaxhighlight
```

```javascript
// .eleventy.js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
};
```

---

## 🎨 CSS & Styling Issues

### Error: Styles not applying

**Symptom:** Site has no styling, looks like plain HTML

**Cause:** CSS file not copied to output

**Solutions:**

**Step 1: Check passthrough copy:**
```javascript
// .eleventy.js
module.exports = function(eleventyConfig) {
  // Add this:
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/assets");
  
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
```

**Step 2: Check CSS path in HTML:**
```html
<!-- ❌ WRONG -->
<link rel="stylesheet" href="style.css">

<!-- ✅ CORRECT (from root) -->
<link rel="stylesheet" href="/style.css">
```

**Step 3: Verify file copied:**
```bash
# Check output
ls -la _site/style.css

# Should exist
# If not → passthrough not configured
```

---

### Error: Images not displaying

**Symptom:** Broken image icons

**Solutions:**

**Step 1: Check image path:**
```markdown
<!-- In Markdown -->
![Alt text](../assets/image.jpg)  <!-- ❌ Relative might break -->
![Alt text](/assets/image.jpg)    <!-- ✅ From root -->
```

**Step 2: Check passthrough:**
```javascript
eleventyConfig.addPassthroughCopy("src/assets");
```

**Step 3: External images (Cloudflare R2):**
```bash
# Test URL directly in browser
https://assets.phamhuutri.com/assets/films/poster.jpg

# If 403 Forbidden → Check R2 bucket permissions
# If 404 Not Found → Check filename/path
# If CORS error → Check R2 CORS config
```

**Fix R2 CORS (if needed):**
```json
[
  {
    "AllowedOrigins": ["https://phamhuutri.com"],
    "AllowedMethods": ["GET"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3000
  }
]
```

---

## 🌐 CloudCannon Integration Issues

### Error: Site not syncing to CloudCannon

**Symptom:** Changes in GitHub not appearing in CloudCannon

**Solutions:**

**Step 1: Check sync status:**
```
CloudCannon Dashboard → Settings → Source Syncing
Status should be: "Synced" (green checkmark)
```

**Step 2: Manual sync:**
```
Click "Sync" button
Wait 1-2 minutes
Refresh page
```

**Step 3: Check webhook:**
```
GitHub repo → Settings → Webhooks
Should see: https://app.cloudcannon.com/...
Recent Deliveries: Check for errors
```

**Step 4: Re-connect GitHub:**
```
CloudCannon → Settings → Source Syncing
Click "Disconnect"
Click "Connect" → Re-authorize
```

---

### Error: Collections not showing in CloudCannon

**Symptom:** CloudCannon shows no collections

**Solutions:**

**Step 1: Check config file exists:**
```bash
ls -la .cloudcannon/config.yml
# Must exist and be committed to Git
```

**Step 2: Verify config syntax:**
```yaml
# .cloudcannon/config.yml
collections_config:
  short-films:           # ← Collection name
    path: src/content/short-films  # ← Must match actual path
    output: true
```

**Step 3: Check path correctness:**
```bash
# Path in config: src/content/short-films
# Check exists:
ls -la src/content/short-films/
# Should list .md files
```

**Step 4: Re-sync:**
```
CloudCannon → Click "Sync"
Wait for build to complete
Refresh Collections page
```

---

### Error: Visual editor not working

**Symptom:** Visual editor shows blank or errors

**Solutions:**

**Step 1: Check _enabled_editors:**
```yaml
# In config.yml OR in file frontmatter
_enabled_editors:
  - visual
  - content
  - data
```

**Step 2: Check HTML structure:**
```html
<!-- Layout must have valid HTML -->
<!DOCTYPE html>
<html>
<head>...</head>
<body>
  <!-- Content here -->
</body>
</html>

<!-- NOT: Fragment without <html> tags -->
```

**Step 3: Check for JavaScript errors:**
```
Open Visual editor
Press F12 → Console
Look for red errors
Fix any JavaScript issues
```

**Step 4: Use Content editor instead:**
```yaml
# If Visual editor problematic
_enabled_editors:
  - content  # Markdown editor (always works)
  - data     # Form editor
```

---

### Error: Can't save changes in CloudCannon

**Symptom:** "Save" button doesn't work or shows error

**Solutions:**

**Step 1: Check permissions:**
```
GitHub repo → Settings → Collaborators
CloudCannon bot should have Write access
```

**Step 2: Check branch protection:**
```
GitHub repo → Settings → Branches
If main branch protected:
  → Allow CloudCannon app to push
```

**Step 3: Check file permissions in frontmatter:**
```yaml
---
title: "Film Title"
# Don't have any locked fields unless intentional
---
```

**Step 4: Try Data editor:**
```
Switch from Visual → Data editor
Try saving there
```

---

## 🚀 Deployment Errors

### Error: Cloudflare Pages build failing

**Symptom:** Build status shows "Failed"

**Solutions:**

**Step 1: Check build logs:**
```
Cloudflare Pages → Deployments → Click failed build
Read error message in logs
```

**Common errors:**

**A) Node version mismatch:**
```
Error: The engine "node" is incompatible with this module
```

**Fix:**
```
Cloudflare Pages Settings → Build settings
Environment variable: NODE_VERSION = 18
```

**B) Missing dependencies:**
```
Error: Cannot find module '@11ty/eleventy'
```

**Fix:**
```
# Check package.json committed
git status
git add package.json package-lock.json
git commit -m "Add dependencies"
git push
```

**C) Build command wrong:**
```
Build command: npx @11ty/eleventy
Output directory: _site
```

**D) Build timeout:**
```
Increase timeout in Cloudflare settings
Or optimize build (remove large files)
```

---

### Error: 404 on deployed site

**Symptom:** Site deployed but pages show 404

**Solutions:**

**Step 1: Check output directory:**
```
Cloudflare Pages Settings
Build output directory: _site  (must match Eleventy output)
```

**Step 2: Check file structure:**
```bash
# Local build
npm run build
ls -la _site/

# Should see:
_site/
  index.html
  short-films/
    film-slug/
      index.html

# NOT:
_site/
  src/
    index.html  (← Wrong, too nested)
```

**Step 3: Check URLs:**
```
Eleventy generates: /short-films/film-slug/
NOT: /short-films/film-slug.html

If you want .html:
```

```javascript
// .eleventy.js
return {
  htmlOutputSuffix: ".html"
};
```

---

## 🔧 Data & Content Errors

### Error: Frontmatter not parsing

**Symptom:** Frontmatter shows as text in page

**Solutions:**

**Step 1: Check delimiters:**
```markdown
---
title: "Film Title"
---

Content here...
```

**Must have:**
- Exactly 3 dashes: `---`
- Empty line after closing `---`
- Valid YAML syntax

**Step 2: Check YAML syntax:**
```yaml
# ❌ WRONG
title: Film with "quotes  (missing closing quote)
tags: drama, comedy  (should be array)

# ✅ CORRECT
title: "Film with quotes"
tags:
  - drama
  - comedy
```

**Step 3: Validate YAML:**
```bash
# Use online validator: https://www.yamllint.com/
# Or install yamllint
npm install -g yaml-lint
yamllint file.md
```

---

### Error: Special characters breaking

**Symptom:** Vietnamese characters show as � or weird symbols

**Solutions:**

**Step 1: Check file encoding:**
```bash
# Check encoding
file -I src/content/films/film.md
# Should show: charset=utf-8

# If not UTF-8, convert:
iconv -f ISO-8859-1 -t UTF-8 film.md > film-utf8.md
mv film-utf8.md film.md
```

**Step 2: Check HTML meta tag:**
```html
<head>
  <meta charset="UTF-8">  <!-- MUST be present -->
  ...
</head>
```

**Step 3: Save file as UTF-8 in editor:**
```
VS Code: Bottom right → Select encoding → Save with UTF-8
```

---

### Error: Date fields not working

**Symptom:** Dates show as [object Object] or undefined

**Solutions:**

```yaml
# ❌ WRONG formats
date: 2024-01-01  (string, not Date)
date: "January 1, 2024"

# ✅ CORRECT format
date: 2024-01-01T00:00:00Z  (ISO 8601)
```

```njk
{# Display date #}
{{ film.data.date | date: "%Y-%m-%d" }}

{# Or use JavaScript filter #}
{{ film.data.date.toISOString() | truncate(10) }}
```

---

## 🐛 JavaScript Errors

### Error: "X is not defined"

**Symptom:** Console shows ReferenceError

**Solutions:**

```javascript
// ❌ Problem
console.log(films);  // films not defined

// ✅ Solutions:

// 1. Check variable declared
let films = [];

// 2. Check scope
function loadFilms() {
  let films = [];  // Only available inside function
}
console.log(films);  // Error: out of scope

// 3. Check typo
let filmData = [];
console.log(films);  // Error: filmData ≠ films
```

---

### Error: Collections data not available in browser

**Symptom:** Can't access collection data client-side

**Cause:** Eleventy collections are build-time only

**Solutions:**

**Generate JSON for client-side:**

```javascript
// .eleventy.js
eleventyConfig.addCollection("shortFilms", function(collectionApi) {
  const films = collectionApi.getFilteredByGlob("src/content/short-films/*.md");
  
  // Create JSON file
  const fs = require('fs');
  const filmsData = films.map(f => ({
    slug: f.data.slug,
    title: f.data.title_vi,
    thumbnail: f.data.thumbnail
  }));
  
  fs.writeFileSync('_site/api/films.json', JSON.stringify(filmsData));
  
  return films;
});
```

```javascript
// Client-side JavaScript
fetch('/api/films.json')
  .then(res => res.json())
  .then(films => {
    console.log(films);
    // Use films data
  });
```

---

## 🔍 Debugging Tips

### Enable verbose logging

```bash
# Eleventy verbose mode
DEBUG=* npx @11ty/eleventy

# Or specific namespace
DEBUG=Eleventy* npx @11ty/eleventy
```

### Check generated HTML

```bash
# Build site
npm run build

# Open generated file
cat _site/short-films/film-slug/index.html

# Search for issue
grep -n "error-text" _site/**/*.html
```

### Use browser DevTools

```
1. Open page
2. Press F12
3. Check tabs:
   - Console: JavaScript errors
   - Network: Failed requests
   - Elements: Inspect HTML
   - Sources: Debug JavaScript
```

---

## 🆘 When All Else Fails

### Rollback procedure

```bash
# Option 1: Git revert
git log --oneline  # Find last good commit
git checkout <commit-hash>
npm run build

# Option 2: Restore from backup branch
git checkout backup-YYYYMMDD-HHMM
npm install
npm run build

# Option 3: Restore from local backup
cd ../project-backup-YYYYMMDD
npm install
npm run build
```

### Start fresh

```bash
# Nuclear option: Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Ask for help

**Before asking, collect:**
```markdown
1. Error message (full text)
2. Command that caused error
3. Relevant code snippets
4. Steps to reproduce
5. What you've tried already

Template:
"I'm getting [error] when I run [command]. 
I tried [solutions] but it didn't work.
Here's my code: [paste]
Here's the full error: [paste]"
```

---

## 📚 Additional Resources

**Eleventy docs:** https://www.11ty.dev/docs/  
**CloudCannon docs:** https://cloudcannon.com/documentation/  
**Markdown-it:** https://markdown-it.github.io/  
**Nunjucks:** https://mozilla.github.io/nunjucks/  

**Community:**
- Eleventy Discord: https://www.11ty.dev/blog/discord/
- CloudCannon Support: support@cloudcannon.com

---

**Last updated:** 2025-02-05