# Validation Protocol

Checklist này được thực hiện SAU KHI code migration hoàn tất, TRƯỚC KHI deploy production.

---

## 📋 Overview

**Khi nào dùng:** Sau khi convert data → Markdown và update code

**Mục tiêu:** Đảm bảo ZERO visual breaking và functionality intact

**Time needed:** 1-2 hours per category

---

## ✅ Level 1: Build Validation

### 1.1 Local Build Test

```markdown
- [ ] Build command succeeds
- [ ] No errors in terminal
- [ ] Output directory created
- [ ] Files generated correctly
```

**Commands:**
```bash
# Clean previous build
rm -rf _site

# Run build
npm run build
# hoặc: npx @11ty/eleventy

# Check for errors
# Should end with: "Wrote X files in Y seconds"

# Verify output exists
ls -la _site/
# Should see index.html and content folders
```

**Expected output:**
```
[11ty] Writing _site/index.html from ./src/index.njk
[11ty] Writing _site/short-films/dad-dont-lie-to-me/index.html
[11ty] Wrote 25 files in 1.43 seconds (v2.0.0)
```

**If errors:**
→ Check troubleshooting.md
→ Fix before proceeding

---

### 1.2 Dev Server Test

```markdown
- [ ] Dev server starts
- [ ] No errors in terminal
- [ ] Port accessible (usually 8080)
- [ ] Hot reload works
```

**Commands:**
```bash
# Start dev server
npm run dev
# hoặc: npx @11ty/eleventy --serve

# Should see:
# [11ty] Server at http://localhost:8080/

# Open browser
open http://localhost:8080

# Make a small change
# Should auto-reload
```

---

## ✅ Level 2: Data Validation

### 2.1 Console Comparison

**Purpose:** Verify data structure unchanged

```markdown
- [ ] Collections load correctly
- [ ] Item count matches old data
- [ ] Keys/fields preserved
- [ ] Data types correct
```

**Test in browser console:**

```javascript
// If using Eleventy collections in template
// Add temporary debug code:

// In index.njk or film template:
<script>
  console.log("Collections test");
  
  // Check if global data available
  // (depends on how you expose it)
</script>

// Or check in Node during build:
// In .eleventy.js:
eleventyConfig.addCollection("shortFilms", function(collectionApi) {
  const films = collectionApi.getFilteredByGlob("src/content/short-films/*.md");
  
  // Debug output
  console.log("Total films:", films.length);
  console.log("First film:", films[0].data);
  
  return films;
});
```

**Manual check:**
```markdown
OLD data file had: ____ items
NEW collection has: ____ items

Sample item comparison:

OLD:
{
  title: { vi: "...", en: "..." },
  thumbnail: "...",
  ...
}

NEW (check in browser):
{
  title_vi: "...",
  title_en: "...",
  thumbnail: "...",
  ...
}

Keys match: YES/NO
If NO → Fix frontmatter keys
```

---

### 2.2 Content Rendering Check

```markdown
- [ ] Markdown converts to HTML
- [ ] HTML tags preserved (iframe, ul, etc)
- [ ] Line breaks render correctly
- [ ] Special characters display (Vietnamese)
- [ ] Code blocks render (if any)
```

**Visual checks:**

1. **Open a film page**
2. **Right-click → Inspect**
3. **Check rendered HTML:**

```html
<!-- Should see proper HTML structure -->
<h3>Logline</h3>
<p>Content here...</p>

<iframe src="https://youtube.com/..."></iframe>

<ul>
  <li><b>Director:</b> Name</li>
</ul>

<!-- NOT raw Markdown -->
## Logline  <!-- ❌ Wrong -->
**Director:** Name  <!-- ❌ Wrong -->
```

---

### 2.3 Bilingual Content Check

```markdown
- [ ] Vietnamese content displays
- [ ] English content displays
- [ ] Language switching works
- [ ] Both versions complete
```

**Test:**
```markdown
1. Open film page
2. Check both language sections visible
3. Switch language (if have switcher)
4. Verify content changes
5. Check no混 mixing of vi/en
```

**Sample check:**
```
Page: dad-dont-lie-to-me

Vietnamese section:
- [ ] Title: "Ba Ơi, Đừng Nói Dối"
- [ ] Logline in Vietnamese
- [ ] Content in Vietnamese

English section:
- [ ] Title: "Dad, Don't Lie To Me"
- [ ] Logline in English
- [ ] Content in English
```

---

## ✅ Level 3: Visual Validation

### 3.1 Screenshot Comparison

**Purpose:** Ensure pixel-perfect match

```markdown
- [ ] Take screenshot of OLD site
- [ ] Take screenshot of NEW site
- [ ] Compare side-by-side
- [ ] Identify differences
```

**Process:**

**Before migration:**
```bash
# Capture old site screenshots
# Use browser or tool like:
# - Full Page Screen Capture (Chrome extension)
# - Firefox Screenshot tool

# Save as:
screenshots/before/
  - homepage.png
  - short-films-list.png
  - film-detail-1.png
  - film-detail-2.png
```

**After migration:**
```bash
# Capture new site screenshots
# Same pages, same browser size

# Save as:
screenshots/after/
  - homepage.png
  - short-films-list.png
  - film-detail-1.png
  - film-detail-2.png
```

**Compare:**
```markdown
Tool options:
- Visual diff tools (diffchecker.com/image-diff)
- Side-by-side in image editor
- Overlay with 50% opacity

Acceptable differences:
- [ ] None (100% match)

Unacceptable differences:
- [ ] Layout shifted
- [ ] Missing images
- [ ] Wrong fonts
- [ ] Broken styling
- [ ] Missing content

If differences found:
→ Fix CSS/HTML
→ Re-test
→ Repeat until match
```

---

### 3.2 Responsive Check

```markdown
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
```

**Test each device:**
```markdown
1. Open site
2. Navigate to all sections
3. Check layout integrity
4. Test interactions
5. Verify images scale

Browser DevTools:
- F12 → Toggle device toolbar
- Select preset devices
- Test each one
```

**Checklist per device:**
```markdown
Desktop:
- [ ] Sidebar visible
- [ ] Content centered
- [ ] Images full quality
- [ ] No horizontal scroll

Mobile:
- [ ] Hamburger menu works (if applicable)
- [ ] Content readable
- [ ] Images scale down
- [ ] Touch targets adequate
```

---

### 3.3 Browser Compatibility

```markdown
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if Mac available)
- [ ] Mobile browsers
```

**Quick test:**
```markdown
Each browser:
1. Homepage loads
2. Navigate to film
3. Images display
4. Iframe plays (YouTube)
5. No console errors
```

---

## ✅ Level 4: Functionality Validation

### 4.1 Navigation Test

```markdown
- [ ] All menu links work
- [ ] Category links work
- [ ] Film detail links work
- [ ] Back button works
- [ ] Breadcrumbs work (if applicable)
```

**Test flow:**
```markdown
1. Click "Short Films" in sidebar
   → Should show films list
   
2. Click first film
   → Should open detail page
   → URL should be: /short-films/[slug]/
   
3. Browser back button
   → Should return to list
   
4. Click another category
   → Should switch content
   
5. Direct URL access
   → Type: /short-films/dad-dont-lie-to-me/
   → Should load directly (no 404)
```

---

### 4.2 Images & Assets

```markdown
- [ ] All images load
- [ ] Thumbnails display
- [ ] Full images load on detail pages
- [ ] No 404 errors for images
- [ ] Cloudflare R2 assets accessible
```

**Check:**
```bash
# Open DevTools → Network tab
# Filter: Img
# Reload page
# Should see all images: Status 200

# Look for any red (failed):
# Status 404 → Image not found
# Status 403 → Permission denied
```

**Test external assets:**
```markdown
Cloudflare R2 URLs:
- [ ] https://assets.phamhuutri.com/... loads
- [ ] CORS configured correctly
- [ ] Images from R2 display

If broken:
→ Check R2 bucket permissions
→ Verify URLs haven't changed
```

---

### 4.3 Embedded Content

```markdown
- [ ] YouTube iframes play
- [ ] Videos load correctly
- [ ] Aspect ratio correct
- [ ] Controls work
```

**Test:**
```markdown
1. Navigate to film with video
2. Find iframe embed
3. Click play
   → Should play without errors
   
4. Check aspect ratio
   → Should be 16:9 (560x315)
   
5. Test controls
   → Pause, volume, fullscreen
```

**If broken:**
```markdown
Common issues:
- [ ] Missing iframe src
- [ ] Wrong YouTube URL format
- [ ] Missing allowfullscreen attribute

Check generated HTML:
<iframe 
  src="https://www.youtube.com/embed/VIDEO_ID"
  width="560" 
  height="315"
  allowfullscreen>
</iframe>
```

---

### 4.4 Language Switching

```markdown
- [ ] EN/VI buttons work
- [ ] Content changes language
- [ ] URL updates (if applicable)
- [ ] State persists on navigation
```

**Test:**
```javascript
// If using localStorage
// Check in Console:
localStorage.getItem('language')
// Should return: 'vi' or 'en'

// Test switching:
// 1. Click VI button
//    → Content should change to Vietnamese
//    → localStorage should update
// 2. Navigate to another page
//    → Should stay in Vietnamese
// 3. Refresh page
//    → Should remember Vietnamese
```

---

## ✅ Level 5: Performance Validation

### 5.1 Build Performance

```markdown
- [ ] Build time acceptable
- [ ] Not significantly slower than before
- [ ] File sizes reasonable
```

**Measure:**
```bash
# Build and time
time npm run build

# Output:
# real    0m2.543s  ← Total time
# user    0m4.123s
# sys     0m0.234s

# Compare to before:
Before: ____ seconds
After:  ____ seconds
Increase: ____% (should be <100%)

Acceptable: <2x slower
Warning: 2-3x slower
Stop: >3x slower (investigate)
```

---

### 5.2 Page Load Performance

```markdown
- [ ] Homepage loads quickly
- [ ] Film pages load quickly
- [ ] Images lazy load (if configured)
- [ ] No blocking resources
```

**Test with DevTools:**
```markdown
1. Open DevTools → Network tab
2. Disable cache (checkbox)
3. Reload page
4. Check metrics:

   DOMContentLoaded: ____ ms (should be <1000ms)
   Load: ____ ms (should be <3000ms)
   
5. Look for slow resources:
   - Red = >1000ms
   - Yellow = 500-1000ms
   - Green = <500ms
```

**Lighthouse test:**
```markdown
1. Open DevTools → Lighthouse tab
2. Select:
   - [x] Performance
   - [x] Accessibility
   - [x] Best Practices
   - [x] SEO
3. Click "Analyze page load"

Target scores:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

If <90:
→ Check recommendations
→ Fix critical issues
→ Re-test
```

---

### 5.3 File Size Check

```markdown
- [ ] HTML files reasonable size
- [ ] CSS not duplicated
- [ ] JS not bloated
- [ ] Total bundle size acceptable
```

**Measure:**
```bash
# Check output sizes
du -sh _site/
# Total site size

du -h _site/short-films/*/index.html | sort -h
# Individual page sizes

# Compare to before:
Before total: ____ MB
After total:  ____ MB

Acceptable: <2x larger
Warning: 2-3x larger
Stop: >3x larger
```

---

## ✅ Level 6: Content Validation

### 6.1 Content Completeness

```markdown
- [ ] All items migrated
- [ ] No missing content
- [ ] All sections present
- [ ] Crew lists complete
```

**Count check:**
```markdown
OLD short-films-data.js:
Total items: ____

NEW src/content/short-films/:
Count .md files:
```

```bash
ls -1 src/content/short-films/*.md | wc -l
```

```markdown
Should match: YES/NO

If mismatch:
→ Find missing items
→ Convert and add them
→ Re-count
```

---

### 6.2 Content Accuracy

**Sample 3 random items:**

```markdown
Item 1: ________________

OLD data:
Title: ________________
Thumbnail: ____________
Content length: ____ chars

NEW markdown:
Title: ________________
Thumbnail: ____________
Content length: ____ chars

Match: YES/NO
```

**Spot check:**
```markdown
1. Open OLD site
2. Copy paragraph from film description
3. Search in NEW site
4. Should find exact match

If differences:
→ Check Markdown conversion
→ Verify HTML preserved
→ Fix discrepancies
```

---

### 6.3 Special Characters

```markdown
- [ ] Vietnamese characters (ă, â, đ, ê, ô, ơ, ư)
- [ ] Quotes and apostrophes
- [ ] Dashes and hyphens
- [ ] Bullet points
- [ ] Emojis (if any)
```

**Test:**
```markdown
Find pages with Vietnamese text
Check these characters display correctly:
- à, á, ạ, ả, ã, â, ầ, ấ, ậ, ẩ, ẫ
- ă, ằ, ắ, ặ, ẳ, ẵ
- đ
- è, é, ẹ, ẻ, ẽ, ê, ề, ế, ệ, ể, ễ

Should not see:
- � (replacement character)
- Mojibake (weird symbols)
- HTML entities (&#273; instead of đ)
```

**Check encoding:**
```html
<!-- In HTML <head> -->
<meta charset="UTF-8">  <!-- Must be present -->
```

---

## ✅ Level 7: SEO Validation

### 7.1 Meta Tags

```markdown
- [ ] Title tags present
- [ ] Meta descriptions present
- [ ] OG tags for social sharing
- [ ] Canonical URLs correct
```

**Check:**
```html
<!-- View source: Ctrl/Cmd + U -->

<head>
  <title>Film Title - Pham Huu Tri</title>  <!-- ✓ -->
  <meta name="description" content="...">   <!-- ✓ -->
  
  <meta property="og:title" content="...">  <!-- ✓ -->
  <meta property="og:image" content="...">  <!-- ✓ -->
  <meta property="og:url" content="...">    <!-- ✓ -->
  
  <link rel="canonical" href="https://..."> <!-- ✓ -->
</head>
```

---

### 7.2 URL Structure

```markdown
- [ ] URLs clean (no .html if not wanted)
- [ ] Slugs match old URLs
- [ ] No broken internal links
- [ ] Redirects configured (if URLs changed)
```

**Test:**
```markdown
OLD URL: /short-films/dad-dont-lie-to-me
NEW URL: /short-films/dad-dont-lie-to-me/

Should work: YES/NO

If different:
→ Setup 301 redirects
→ Update sitemap
→ Update Google Search Console
```

---

### 7.3 Sitemap & Robots

```markdown
- [ ] Sitemap.xml generated
- [ ] All pages included
- [ ] Robots.txt configured
- [ ] No pages blocked accidentally
```

**Check sitemap:**
```bash
# View sitemap
cat _site/sitemap.xml
# OR visit: https://yoursite.com/sitemap.xml

# Should list all pages:
<url>
  <loc>https://yoursite.com/short-films/dad-dont-lie-to-me/</loc>
  <lastmod>2025-02-05</lastmod>
</url>
```

**Check robots.txt:**
```
User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

---

## ✅ Level 8: Integration Validation

### 8.1 CloudCannon Integration

```markdown
- [ ] Site syncs to CloudCannon
- [ ] Collections visible
- [ ] Can open editor
- [ ] Visual editor works
- [ ] Can save changes
- [ ] Changes commit to Git
```

**Test workflow:**
```markdown
1. Login to CloudCannon
2. Navigate to Collections
3. Open "Short Films"
   → Should list all films
   
4. Click one film
5. Click "Visual" editor
   → Should load page with editing
   
6. Make small change (e.g., fix typo)
7. Click "Save"
   → Should commit to Git
   
8. Check GitHub repo
   → Should see new commit from CloudCannon
   
9. Wait for build
10. Check live site
    → Change should appear
```

---

### 8.2 Cloudflare Pages Integration

```markdown
- [ ] GitHub webhook triggers build
- [ ] Build succeeds on Cloudflare
- [ ] Deploy completes
- [ ] Production site updates
- [ ] No build errors
```

**Test:**
```markdown
1. Make change in CloudCannon
2. Go to Cloudflare Pages dashboard
3. Check "Deployments" tab
   → Should see new build starting
   
4. Click on build
   → View build logs
   → Should complete successfully
   
5. Check "Production" URL
   → Change should be live
   
Time from commit to live: ____ minutes
(Should be <5 minutes)
```

---

## ✅ Level 9: Final Smoke Test

### 9.1 Complete User Journey

**Simulate real user:**

```markdown
Scenario 1: New visitor
1. [ ] Land on homepage
2. [ ] Read About section
3. [ ] Browse Short Films
4. [ ] Click on a film
5. [ ] Watch trailer
6. [ ] Navigate to Commercials
7. [ ] Click on commercial
8. [ ] Return to homepage

No errors encountered: YES/NO
```

```markdown
Scenario 2: Direct link
1. [ ] Someone shares film URL
2. [ ] Open: /short-films/dad-dont-lie-to-me/
3. [ ] Page loads correctly
4. [ ] Can navigate site from there

Works as expected: YES/NO
```

```markdown
Scenario 3: Mobile user
1. [ ] Open site on phone
2. [ ] Menu works
3. [ ] Can browse films
4. [ ] Images load
5. [ ] Video plays
6. [ ] No UI breakage

Mobile experience good: YES/NO
```

---

### 9.2 Error Handling

```markdown
- [ ] 404 page works
- [ ] Missing images show placeholder
- [ ] Broken links detected
```

**Test:**
```markdown
1. Visit non-existent page: /short-films/fake-slug/
   → Should show 404 page
   → Not blank or server error
   
2. Break image link temporarily
   → Should show broken image icon or placeholder
   → Not break page layout
   
3. Check for broken links:
```

```bash
# Use tool like linkchecker
linkchecker http://localhost:8080

# Or manually check all links
```

---

## ✅ Level 10: Documentation Check

### 10.1 Comments & Docs

```markdown
- [ ] Code commented where complex
- [ ] README updated
- [ ] CloudCannon setup documented
- [ ] Known issues documented
```

---

### 10.2 Handoff Preparation

**If training others:**

```markdown
- [ ] Content editor guide written
- [ ] CloudCannon workflow documented
- [ ] Common tasks explained
- [ ] Troubleshooting tips included

Materials ready:
- [ ] How to add new film
- [ ] How to edit existing content
- [ ] How to upload images
- [ ] How to publish changes
```

---

## 🎯 Final Validation Checklist

```markdown
ALL levels passed:
- [ ] Level 1: Build (2/2)
- [ ] Level 2: Data (3/3)
- [ ] Level 3: Visual (3/3)
- [ ] Level 4: Functionality (4/4)
- [ ] Level 5: Performance (3/3)
- [ ] Level 6: Content (3/3)
- [ ] Level 7: SEO (3/3)
- [ ] Level 8: Integration (2/2)
- [ ] Level 9: Smoke Test (2/2)
- [ ] Level 10: Documentation (2/2)

Total: ____/27

If 27/27 → APPROVED for production
If 24-26/27 → FIX minor issues
If <24/27 → DO NOT DEPLOY (fix critical issues)
```

---

## 📸 Evidence Collection

**Save these for records:**

```markdown
- [ ] Before/After screenshots (folder)
- [ ] Build logs (saved)
- [ ] Lighthouse scores (screenshot)
- [ ] Test results documented
- [ ] Known issues listed
```

---

## ✅ Sign-off

```markdown
Validated by: ________________
Date: ________________
Time spent: _______ hours
Issues found: _______
Issues fixed: _______
Remaining issues: _______

Ready for production: YES / NO

Notes:
_________________________________
_________________________________
_________________________________
```

---

**Next step:** If all validated → Deploy to production  
**See:** deployment-checklist.md (if available)