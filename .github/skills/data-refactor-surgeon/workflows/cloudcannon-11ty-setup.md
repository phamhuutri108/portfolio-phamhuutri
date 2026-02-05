# CloudCannon + Eleventy Setup Guide

## Prerequisites

- ✅ Eleventy project đã setup
- ✅ Markdown files đã tạo
- ✅ GitHub repo đã có
- ✅ Site build thành công locally

---

## Step 1: Create CloudCannon Account

1. Go to https://app.cloudcannon.com/
2. Sign up with GitHub
3. Create new site
4. Connect GitHub repo

---

## Step 2: Configure Build Settings

**In CloudCannon dashboard:**
```
Build command: npm run build
Output directory: _site
Install command: npm install
Node version: 18
```

**Save & Build**

---

## Step 3: Create CloudCannon Config

**File:** `.cloudcannon/config.yml`
```yaml
# Collections
collections_config:
  short-films:
    path: src/content/short-films
    output: true
    url: /short-films/[slug]/
    icon: movie
    _enabled_editors:
      - visual
      - content
      - data
    
  commercials:
    path: src/content/commercials
    output: true
    url: /commercials/[slug]/
    icon: ad_units
    _enabled_editors:
      - visual
      - content
  
  others:
    path: src/content/others
    output: true
    url: /others/[slug]/
    icon: folder
    _enabled_editors:
      - visual
      - content
  
  writings:
    path: src/content/writings
    output: true
    url: /writings/[slug]/
    icon: article
    _enabled_editors:
      - visual
      - content

# Input configurations
_inputs:
  title_vi:
    type: text
    label: Tiêu đề (Tiếng Việt)
    comment: Tên phim bằng tiếng Việt
  
  title_en:
    type: text
    label: Title (English)
    comment: Film title in English
  
  slug:
    type: text
    label: URL Slug
    comment: Used in URL (e.g., dad-dont-lie-to-me)
  
  thumbnail:
    type: image
    label: Poster/Thumbnail
    comment: Main image for the film
  
  category:
    type: select
    label: Category
    options:
      values:
        - short-films
        - commercials
        - others
        - writings
  
  year:
    type: number
    label: Release Year
  
  duration:
    type: text
    label: Duration
    comment: Format: MM:SS (e.g., 39:45)
  
  genre:
    type: multiselect
    label: Genre
    options:
      values:
        - drama
        - comedy
        - documentary
        - observational
        - experimental
  
  order:
    type: number
    label: Display Order
    comment: Lower numbers appear first

# Paths
paths:
  uploads: src/assets/images
  dam_uploads: src/assets

# Source editor
source_editor:
  tab_size: 2
  theme: monokai

# Timezone
timezone: Asia/Ho_Chi_Minh
```

---

## Step 4: Create Schemas (Optional)

**File:** `src/content/short-films/_schema.md`
```markdown
---
_schema: film
_inputs:
  title_vi:
    type: text
    label: Tiêu đề (Tiếng Việt)
  title_en:
    type: text
    label: Title (English)
  slug:
    type: text
  thumbnail:
    type: image
  year:
    type: number
  duration:
    type: text
  genre:
    type: multiselect
    options:
      values:
        - drama
        - comedy
        - documentary
_enabled_editors:
  - visual
  - content
  - data
---

# Schema Template

This defines the structure for film content.
```

---

## Step 5: Test CloudCannon Editor

1. Push config to GitHub
2. CloudCannon auto-syncs
3. Go to "Collections" in CloudCannon
4. Open "Short Films"
5. Click on a film
6. Click "Visual" tab

**Check:**
- [ ] Visual editor loads
- [ ] Can edit text
- [ ] Can upload images
- [ ] Can edit frontmatter fields

---

## Step 6: Setup Image Uploads
```yaml
# .cloudcannon/config.yml

# Image upload settings
paths:
  uploads: src/assets/images/{category}
  dam_uploads: src/assets
  dam_static: https://assets.phamhuutri.com

# Image optimization
images:
  resize:
    - width: 1920
      height: 1080
      format: webp
      quality: 85
    - width: 640
      height: 360
      format: webp
      quality: 80
```

---

## Step 7: Setup Preview URLs
```yaml
# .cloudcannon/config.yml

# Preview configuration
collection_groups:
  - heading: Content
    collections:
      - short-films
      - commercials
      - others
      - writings

# Preview settings
_editables:
  content:
    bold: true
    italic: true
    link: true
    bulletedlist: true
    numberedlist: true
    image: true
    table: true
    code: true
```

---

## Step 8: Enable Visual Editor Features
```yaml
# .cloudcannon/config.yml

# Rich text editor
_editables:
  text:
    bold: true
    italic: true
    underline: false
    strike: false
    subscript: false
    superscript: false
  block:
    format: p h1 h2 h3 h4
    undo: true
    redo: true
  content:
    blockquote: true
    bold: true
    format: p h1 h2 h3 h4 h5 h6 pre address div
    italic: true
    link: true
    bulletedlist: true
    numberedlist: true
    outdent: true
    indent: true
    image: true
    table: true
    undo: true
    redo: true
```

---

## Step 9: Setup Workflow
```yaml
# .cloudcannon/config.yml

# Git workflow
source:
  branch: main

# Publishing
publish:
  branch: production
  enabled: true

# Editor options
editor:
  default_path: /src/content/short-films/
```

---

## Step 10: Test Full Workflow

1. Edit a film in CloudCannon
2. Click "Save"
3. CloudCannon commits to GitHub
4. Cloudflare Pages auto-builds
5. Check production site

**Verify:**
- [ ] Changes appear on site
- [ ] Build succeeds
- [ ] No broken links
- [ ] Images load

---

## Advanced Features

### Custom Preview

**File:** `src/_includes/layouts/preview.njk`
```njk
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/style.css">
    <style>
        body { padding: 20px; }
    </style>
</head>
<body>
    {{ content | safe }}
</body>
</html>
```

**Config:**
```yaml
_structures:
  film_sections:
    values:
      - label: Logline
        icon: notes
        value:
          _type: logline
          content:
      - label: Synopsis
        icon: article
        value:
          _type: synopsis
          content:
```

---

## Troubleshooting

### CloudCannon not building

Check build log:
- Node version correct?
- `npm install` succeeds?
- Build command correct?

### Visual editor not working

Check:
- HTML structure valid?
- No unclosed tags?
- `_enabled_editors` includes `visual`?

### Images not uploading

Check:
- `paths.uploads` configured?
- Folder exists in repo?
- Permissions correct?

---

## Checklist
```markdown
- [ ] CloudCannon account created
- [ ] GitHub connected
- [ ] Build settings configured
- [ ] CloudCannon config created
- [ ] Collections visible
- [ ] Visual editor works
- [ ] Can upload images
- [ ] Git workflow works
- [ ] Production deploys OK
```

---

## Next Steps

- Train content editors
- Setup user permissions
- Configure backup strategy
- Monitor build times
- Optimize images