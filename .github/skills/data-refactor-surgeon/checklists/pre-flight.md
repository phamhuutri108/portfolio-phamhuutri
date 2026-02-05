# Pre-flight Checklist

Hoàn thành TẤT CẢ items này trước khi bắt đầu migration.

---

## ✅ Phase 1: Backup & Safety

### 1.1 Current Site Verification

```markdown
- [ ] Site đang chạy OK (no errors)
- [ ] Browser console clean
- [ ] All pages load correctly
- [ ] Images display
- [ ] Links work
```

**Test steps:**
```bash
# Open site in browser
# Press F12 → Console tab
# Should see no red errors
# Navigate through all pages
# Check all categories work
```

---

### 1.2 Git Backup

```markdown
- [ ] Create backup branch
- [ ] Push to remote
- [ ] Verify on GitHub/GitLab
```

**Commands:**
```bash
# Create timestamped backup branch
git checkout -b backup-$(date +%Y%m%d-%H%M)
git add .
git commit -m "Backup before migration"
git push origin backup-$(date +%Y%m%d-%H%M)

# Verify branch exists
git branch -a | grep backup

# Return to main branch
git checkout main
```

---

### 1.3 Local Backup

```markdown
- [ ] Copy entire project outside repo
- [ ] Test backup can run
- [ ] Note backup location: _______________
```

**Commands:**
```bash
# Mac/Linux
cp -r my-project ../my-project-backup-$(date +%Y%m%d)

# Windows PowerShell
Copy-Item -Path my-project -Destination ..\my-project-backup-$(Get-Date -Format "yyyyMMdd") -Recurse

# Test backup works
cd ../my-project-backup-*
# Open index.html in browser
```

---

## ✅ Phase 2: Information Gathering

### 2.1 List Data Files

```markdown
Data files to migrate:
- [ ] _________________.js (_____ lines)
- [ ] _________________.js (_____ lines)
- [ ] _________________.js (_____ lines)
- [ ] _________________.js (_____ lines)

Total files: ____
Estimated hours: ____ (4-6 hours per file)
```

**Find & count:**
```bash
# Find all data files
find . -name "*-data.js" -o -name "*Data.js"

# Count lines in each
wc -l short-films-data.js
wc -l commercials-data.js
wc -l others-data.js
wc -l writings-data.js

# Total lines
cat *-data.js | wc -l
```

---

### 2.2 List Files Using Data

```markdown
Files importing data:
- [ ] index.html (lines: ________)
- [ ] ____________ (lines: ________)

Total files need updating: ____
```

**Find imports:**
```bash
# Find script tags with data.js
grep -n "data\.js" index.html

# Find all .js references
grep -rn "\.js\"" *.html

# VS Code method:
# Ctrl/Cmd + Shift + F
# Search: "data.js"
# Note all file paths and line numbers
```

---

### 2.3 Analyze Data Structure

**Pick one data file and analyze:**

```markdown
File: _________________

Structure type:
- [ ] Object with keys
- [ ] Array of objects
- [ ] Other: __________

Nested levels: ____ (count deepest nesting)

Content analysis:
- [ ] Has HTML strings
- [ ] Has <iframe> tags
- [ ] Has <ul>/<li> lists
- [ ] Has functions/methods
- [ ] Bilingual (vi/en)
- [ ] Has images/assets

Sample item structure:
```

**Check sample:**
```javascript
// Open data file
// Copy first complete item
// Paste here to analyze:

// Example from short-films-data.js:
"short-films-slug": {
    title: { vi: "...", en: "..." },  // ← Bilingual object
    thumbnail: "https://...",
    vi: `<p>Long HTML...</p>`,        // ← HTML string
    en: `<p>Long HTML...</p>`
}

// Analysis:
// - Type: Object with string keys
// - Nested: 2 levels (title.vi, title.en)
// - HTML: YES (in vi/en fields)
// - Bilingual: YES
// - Recommendation: MARKDOWN format
```

---

## ✅ Phase 3: Environment Setup

### 3.1 Check Node.js

```markdown
- [ ] Node.js installed
- [ ] Version >= 18
- [ ] npm works
```

**Commands:**
```bash
node --version
# Should output: v18.x.x or v20.x.x

npm --version
# Should output: 9.x.x or higher
```

**If not installed:**
```bash
# Mac (using Homebrew)
brew install node

# Windows
# Download installer from: https://nodejs.org

# Linux (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

### 3.2 Check Git

```markdown
- [ ] Git installed
- [ ] Repository initialized
- [ ] Remote configured
- [ ] GitHub/GitLab access working
```

**Commands:**
```bash
git --version
# Should output: git version 2.x.x

git status
# Should not error

git remote -v
# Should show origin URL

git push --dry-run
# Should connect without error
```

---

### 3.3 Tools Ready

```markdown
- [ ] Code editor installed (VS Code recommended)
- [ ] Terminal/Command Prompt access
- [ ] Browser DevTools familiar
- [ ] Text editor for notes
```

**VS Code extensions (recommended):**
```
- Markdown All in One
- YAML
- Nunjucks
```

---

## ✅ Phase 4: Project Understanding

### 4.1 Framework Detection

```markdown
Current framework/setup:
- [ ] Vanilla JS (no framework)
- [ ] React
- [ ] Vue
- [ ] Astro
- [ ] Other: __________

Build system:
- [ ] None (static HTML)
- [ ] Webpack
- [ ] Vite
- [ ] Other: __________
```

**Check for:**
```bash
# Look for package.json
cat package.json

# Check for framework dependencies
grep -E "react|vue|astro|eleventy" package.json

# If no package.json → Vanilla JS
```

---

### 4.2 Hosting & Deployment

```markdown
Current hosting:
- [ ] Cloudflare Pages
- [ ] Netlify
- [ ] Vercel
- [ ] GitHub Pages
- [ ] Other: __________

Deployment method:
- [ ] Git push auto-deploy
- [ ] Manual upload
- [ ] CI/CD pipeline
- [ ] Other: __________

Build settings (if applicable):
Build command: ________________
Output directory: _____________
```

---

### 4.3 CloudCannon Account

```markdown
- [ ] CloudCannon account created
- [ ] GitHub connected to CloudCannon
- [ ] Can create new site
- [ ] Know how to access dashboard
```

**Setup:**
1. Go to https://app.cloudcannon.com
2. Sign up with GitHub
3. Authorize CloudCannon access
4. Verify dashboard loads

---

## ✅ Phase 5: Time & Resource Planning

### 5.1 Time Allocation

```markdown
Estimated total time: _____ hours

Breakdown:
- Setup Eleventy: 2-3 hours
- Convert first category: 4-6 hours
- Convert remaining categories: 12-20 hours
- Testing & fixes: 4-8 hours
- CloudCannon setup: 2-3 hours
- Documentation: 2-3 hours

Total: 26-43 hours

Available time per week: _____ hours
Estimated weeks: _____
```

---

### 5.2 Phased Approach Decision

```markdown
Number of categories: ____

If 1-2 categories:
- [ ] All at once approach (OK)

If 3-4 categories:
- [ ] Phased approach (RECOMMENDED)
- [ ] Week 1: Setup + Category 1
- [ ] Week 2: Category 2
- [ ] Week 3: Category 3
- [ ] Week 4: Category 4 + cleanup

If 5+ categories:
- [ ] Extended phased approach
- [ ] 1-2 categories per week
```

---

### 5.3 Rollback Plan

```markdown
If migration fails:

Option A: Git revert
- [ ] Command ready: git checkout backup-[timestamp]

Option B: Restore from local backup
- [ ] Know backup location: _______________
- [ ] Tested restore process

Option C: Cloudflare Pages rollback
- [ ] Know how to access dashboard
- [ ] Can rollback to previous deployment

Emergency contact:
- [ ] Team member: __________
- [ ] Phone: __________
```

---

## ✅ Phase 6: Risk Assessment

### 6.1 Complexity Check

```markdown
STOP if ANY of these are true:
- [ ] Data has >5 nested levels
- [ ] Data contains functions/classes that can't be separated
- [ ] Data has <script> tags that execute code
- [ ] Project has real-time features (WebSockets, etc.)
- [ ] Deadline is <1 week away
- [ ] No backup exists

CAUTION if ANY of these are true:
- [ ] Data has 4 nested levels
- [ ] Heavy client-side JavaScript logic
- [ ] Complex routing (SPA-like behavior)
- [ ] >10 data files
- [ ] Limited testing time

PROCEED if:
- [ ] Data is mostly content (HTML strings)
- [ ] 1-4 nested levels
- [ ] Static or simple routing
- [ ] Can test thoroughly
- [ ] Have rollback plan
```

---

### 6.2 Success Criteria

```markdown
Migration is successful when:
- [ ] Site builds without errors
- [ ] Visual matches 100% (screenshot comparison)
- [ ] All pages accessible
- [ ] All images load
- [ ] All links work
- [ ] No console errors
- [ ] CloudCannon can edit content
- [ ] Build time <2x original
- [ ] Page load time similar

Acceptable issues:
- [ ] Minor CSS tweaks needed (document them)
- [ ] Build time slightly slower (10-20%)
```

---

## ✅ Phase 7: Final Go/No-Go

### 7.1 Pre-flight Summary

```markdown
Backups: ____/3 complete
- [ ] Git backup
- [ ] Local backup
- [ ] Verified restorable

Information: ____/3 complete
- [ ] Data files identified
- [ ] Structure analyzed
- [ ] Import locations noted

Environment: ____/3 complete
- [ ] Node.js ready
- [ ] Git working
- [ ] Tools installed

Planning: ____/3 complete
- [ ] Time allocated
- [ ] Phased approach decided
- [ ] Rollback plan ready

Total: ____/12

If 12/12 → GO
If 10-11/12 → CAUTION (complete missing items)
If <10/12 → NO GO (complete checklist first)
```

---

### 7.2 Final Checklist

```markdown
I have:
- [ ] Read all instructions in workflows/
- [ ] Understood the migration approach
- [ ] Set realistic timeline
- [ ] Prepared for potential issues
- [ ] Informed stakeholders (if applicable)
- [ ] Scheduled uninterrupted work time
- [ ] Have rollback plan ready

I understand:
- [ ] Visual may break temporarily
- [ ] Will need testing time
- [ ] May need multiple attempts
- [ ] Can pause between phases
- [ ] Can rollback anytime

I commit to:
- [ ] Follow checklist strictly
- [ ] Test thoroughly at each step
- [ ] Not skip validation
- [ ] Document issues encountered
- [ ] Not panic if errors occur
```

---

## 🚀 Ready to Proceed

**If ALL items checked:**

```bash
# Create migration branch
git checkout -b migration-eleventy

# Proceed to workflows/vanilla-js-to-markdown.md
```

**If ANY items unchecked:**

```
STOP → Complete checklist → Try again
```

---

## 📞 Emergency Contacts

```markdown
Claude conversation: [save conversation URL]
Backup location: _________________
Git backup branch: _______________
CloudCannon login: _______________
Hosting dashboard: _______________

Notes:
_______________________________________
_______________________________________
_______________________________________
```

---

**Last updated:** [Fill in date when you complete checklist]  
**Completed by:** [Your name]  
**Estimated start date:** __________  
**Estimated completion:** __________