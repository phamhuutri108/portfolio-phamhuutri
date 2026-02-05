# Vanilla JS → Markdown Migration Guide

## Overview

Migrate từ Vanilla JavaScript data files sang Markdown content files qua Eleventy static site generator.

**Time:** 2-4 hours per category  
**Difficulty:** Medium  
**Recommended for:** Vanilla JS websites với data hardcoded

---

## Current Structure Analysis

### Your Setup
```
project/
├── index.html (main file)
├── style.css
├── short-films-data.js ← Data hardcoded
├── commercials-data.js
├── others-data.js
└── writings-data.js
```

### Data Format
```javascript
const filmsData = {
    "short-films-slug": {
        title: { vi: "...", en: "..." },
        thumbnail: "https://...",
        vi: `<p>Long HTML content...</p>`,
        en: `<p>Long HTML content...</p>`
    }
}
```

### Issues
- ❌ Cannot edit via CMS
- ❌ HTML strings hard to maintain
- ❌ No version control for content
- ❌ No visual editor

---

## Target Structure

### After Migration
```
project/
├── src/
│   ├── index.njk
│   ├── style.css
│   ├── _includes/
│   │   └── layouts/
│   │       └── film.njk
│   ├── content/
│   │   ├── short-films/
│   │   │   ├── dad-dont-lie-to-me.md ← Content
│   │   │   └── ...
│   │   ├── commercials/
│   │   └── others/
├── .eleventy.js
├── package.json
└── .cloudcannon/
    └── config.yml
```

### Benefits
- ✅ CloudCannon visual editor
- ✅ Markdown easy editing
- ✅ Git-based content versioning
- ✅ Bilingual support
- ✅ Keep visual unchanged

---

## Step-by-Step Migration

### Step 1: Install Eleventy
```bash
# Create package.json
npm init -y

# Install Eleventy
npm install @11ty/eleventy --save-dev

# Install Markdown parser
npm install markdown-it --save-dev
```

**Add to package.json:**
```json
{
  "scripts": {
    "dev": "eleventy --serve",
    "build": "eleventy"
  }
}
```

---

### Step 2: Create Eleventy Config

**File:** `.eleventy.js`
```javascript
module.exports = function(eleventyConfig) {
  
  // Copy static files
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Markdown configuration
  let markdownIt = require("markdown-it");
  let options = {
    html: true,        // Allow HTML in Markdown
    breaks: true,      // Convert \n to <br>
    linkify: true      // Auto-convert URLs to links
  };
  eleventyConfig.setLibrary("md", markdownIt(options));
  
  // Create collections
  eleventyConfig.addCollection("shortFilms", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/short-films/*.md")
      .sort((a, b) => a.data.order - b.data.order);
  });
  
  eleventyConfig.addCollection("commercials", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/commercials/*.md");
  });
  
  eleventyConfig.addCollection("others", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/others/*.md");
  });
  
  eleventyConfig.addCollection("writings", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/writings/*.md");
  });
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
```

---

### Step 3: Restructure Folders
```bash
mkdir -p src/{content/{short-films,commercials,others,writings},_includes/layouts,_data}
mv index.html src/index.njk
mv style.css src/
```

---

### Step 4: Convert Data to Markdown

#### Example Conversion

**CŨ:** `short-films-data.js`
```javascript
"short-films-dad-dont-lie-to-me": {
    title: {
        vi: "Ba Ơi, Đừng Nói Dối",
        en: "Dad, Don't Lie To Me"
    },
    thumbnail: "https://assets.phamhuutri.com/...",
    vi: `
        <p><b>Thể loại:</b> Phim ngắn / Tâm lý<br>
        <b>Năm:</b> 2026</p>
        
        <iframe src="https://youtube.com/..."></iframe>
        
        <h3>Logline</h3>
        <p>Một bác sĩ trung niên...</p>
    `,
    en: `...`
}
```

**MỚI:** `src/content/short-films/dad-dont-lie-to-me.md`
```markdown
---
slug: dad-dont-lie-to-me
title_vi: "Ba Ơi, Đừng Nói Dối"
title_en: "Dad, Don't Lie To Me"
thumbnail: "https://assets.phamhuutri.com/assets/short-films/BODND/BODND_Still.jpeg"
category: short-films
year: 2026
duration: "39:45"
genre:
  - drama
  - observational
order: 1
layout: layouts/film.njk
---

## Metadata (VI)
**Thể loại:** Phim ngắn / Tâm lý, Quan sát  
**Năm:** Sắp ra mắt (2026)  
**Thời lượng:** 39:45

## Trailer

<iframe 
  width="100%" 
  height="315" 
  style="max-width: 560px; border-radius: 4px;" 
  src="https://www.youtube.com/embed/ooWID56SmHk" 
  title="Dad, Don't Lie To Me" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>

## Logline (VI)

Một bác sĩ trung niên bất đắc dĩ, thông qua điện thoại, phải đóng giả làm cha của một cậu bé bệnh nhân ung thư của anh, để đánh lừa cậu về cái chết của người cha ruột.

## Director's Statement (VI)

Khoảng cuối năm 2023, khi tôi đang túc trực ở bệnh viện...

## Crew

- **Diễn viên:** Ngô Nhật Trường, Cô Nhum, Nguyễn Vũ Uy Nhân
- **Đạo diễn và Kịch bản:** Phạm Hữu Trí
- **Cố vấn nghệ thuật:** NSND. Đạo diễn Đào Bá Sơn
- **Sản xuất:** Thục Mai
- **Đồng sản xuất:** Thảo Quiêng

---

## Metadata (EN)
**Genre:** Short Film / Drama, Observational  
**Year:** Coming soon (2026)  
**Duration:** 39:45

## Logline (EN)

A middle-aged doctor reluctantly pretends to be the father of a young cancer patient over the phone, deceiving the boy about his real father's death.

## Director's Statement (EN)

In late 2023, while I was staying at the hospital...
```

---

### Step 5: Create Layout Template

**File:** `src/_includes/layouts/film.njk`
```njk
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title_vi }} - Pham Huu Tri</title>
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <div class="wrapper">
        <aside class="sidebar">
            {# Sidebar content #}
        </aside>
        
        <main class="content">
            <article class="film-detail">
                <h1 class="content-vi">{{ title_vi }}</h1>
                <h1 class="content-en">{{ title_en }}</h1>
                
                <img src="{{ thumbnail }}" alt="{{ title_vi }}">
                
                <div class="film-content">
                    {{ content | safe }}
                </div>
            </article>
        </main>
    </div>
    
    <script src="/script.js"></script>
</body>
</html>
```

---

### Step 6: Update Index Page

**File:** `src/index.njk`
```njk
---
layout: layouts/base.njk
---

<div class="category-group" id="group-short-films">
    <h4>
        <a href="#short-films">
            <span class="content-en">Short Films</span>
            <span class="content-vi">Phim Ngắn</span>
        </a>
    </h4>
    <ul class="category-list" id="sidebar-short-films-list">
        {% for film in collections.shortFilms %}
        <li>
            <a href="/short-films/{{ film.data.slug }}/">
                <span class="content-vi">{{ film.data.title_vi }}</span>
                <span class="content-en">{{ film.data.title_en }}</span>
            </a>
        </li>
        {% endfor %}
    </ul>
</div>
```

---

### Step 7: Handle Bilingual Content

**Option A: Single file với sections (Recommended)**
```markdown
---
title_vi: "..."
title_en: "..."
---

## Logline (VI)
Vietnamese content...

## Logline (EN)
English content...
```

Then trong template:
```njk
<div class="content-vi">
    {# Filter Vietnamese sections #}
</div>
<div class="content-en">
    {# Filter English sections #}
</div>
```

**Option B: Separate files**
```
dad-dont-lie-to-me-vi.md
dad-dont-lie-to-me-en.md
```

Frontmatter:
```yaml
slug: dad-dont-lie-to-me
lang: vi
alternate_lang: en
```

---

### Step 8: Test Locally
```bash
npm run dev
```

**Open:** http://localhost:8080

**Check:**
- [ ] Homepage loads
- [ ] Film list shows
- [ ] Click film → detail page loads
- [ ] Images load
- [ ] Markdown renders to HTML
- [ ] Bilingual switching works

---

### Step 9: Deploy

**Update Cloudflare Pages:**
```
Build command: npm run build
Build output directory: _site
Node version: 18
```

**Push to GitHub:**
```bash
git add .
git commit -m "Migrate to Eleventy + Markdown"
git push origin main
```

Cloudflare Pages auto-builds.

---

## Conversion Script (Optional)

**File:** `convert-data.js`
```javascript
const fs = require('fs');

// Load old data
const filmsData = require('./short-films-data.js').filmsData;

// Convert each film
Object.entries(filmsData).forEach(([slug, film]) => {
  const frontmatter = `---
slug: ${slug.replace('short-films-', '')}
title_vi: "${film.title.vi}"
title_en: "${film.title.en}"
thumbnail: "${film.thumbnail}"
category: short-films
layout: layouts/film.njk
---

`;
  
  const content = film.vi; // Vietnamese content
  
  const markdown = frontmatter + content;
  
  const filename = `src/content/short-films/${slug.replace('short-films-', '')}.md`;
  
  fs.writeFileSync(filename, markdown, 'utf8');
  console.log(`Created: ${filename}`);
});
```

**Run:**
```bash
node convert-data.js
```

---

## Troubleshooting

### Error: "Cannot find module eleventy"
```bash
npm install @11ty/eleventy --save-dev
```

### Error: "ENOENT: no such file or directory"

Check folder structure:
```bash
ls -la src/content/short-films/
```

### Markdown not rendering HTML

Check `.eleventy.js`:
```javascript
let options = {
  html: true  // ← Must be true
};
```

### Images not loading

Add passthrough:
```javascript
eleventyConfig.addPassthroughCopy("src/assets");
```

---

## Next Steps

After migration:
1. Setup CloudCannon (see `cloudcannon-11ty-setup.md`)
2. Test content editing in CMS
3. Train content editors
4. Monitor analytics
5. Remove old `.js` files

---

## Checklist
```markdown
- [ ] Eleventy installed
- [ ] Config file created
- [ ] Folders restructured
- [ ] 1 Markdown file created & tested
- [ ] Layout template works
- [ ] Local dev server runs
- [ ] Visual matches original
- [ ] Deploy successful
- [ ] CloudCannon integration (next step)
```