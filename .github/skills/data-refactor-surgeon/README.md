# Data Refactor Surgeon v3.0
## Vanilla JS → Markdown Migration for CloudCannon CMS

### 🎯 Skill này giải quyết vấn đề gì?

Chuyển đổi website Vanilla JavaScript với data hardcoded sang CloudCannon CMS-ready format (Markdown) thông qua Eleventy static site generator.

**Đảm bảo:**
- ✅ Zero visual breaking
- ✅ Keep HTML/CSS structure
- ✅ CloudCannon integration ready
- ✅ Bilingual content support

---

### 📋 Tech Stack

**Current:**
- HTML: Vanilla HTML
- CSS: style.css
- JS: Inline + data files
- Data: `.js` files với HTML strings
- Hosting: Cloudflare Pages

**Target:**
- Framework: Eleventy (11ty)
- Templates: Nunjucks/HTML
- Content: Markdown files
- CMS: CloudCannon
- Hosting: Cloudflare Pages (unchanged)

---

### 🚀 Quick Start

#### Step 1: Upload SKILL.md to Claude

```
1. Mở Claude.ai
2. New conversation
3. Upload SKILL.md
4. Nói: "Tôi cần migrate Vanilla JS sang Markdown với Eleventy"
```

#### Step 2: Provide Your Files

```
Cần chuẩn bị:
- Current data file (e.g., short-films-data.js)
- Current HTML file (relevant sections)
- List categories cần migrate
```

#### Step 3: Follow Workflow

Claude sẽ guide bạn theo:
- `workflows/vanilla-js-to-markdown.md`
- `workflows/cloudcannon-11ty-setup.md`

---

### 📚 File Structure

```
data-refactor-surgeon-v3/
├── README.md (this file)
├── SKILL.md (core instruction)
├── workflows/
│   ├── vanilla-js-to-markdown.md
│   └── cloudcannon-11ty-setup.md
├── examples/
│   └── tri-portfolio-migration/
│       ├── MIGRATION-PLAN.md
│       └── conversion-script.js
├── decision-tree.md
├── troubleshooting.md
└── checklists/
    ├── pre-flight.md
    └── validation.md
```

---

### ⚠️ Important Notes

**Your case đặc biệt:**
- 4 data files (810+ lines mỗi file)
- Heavy HTML content
- Bilingual (vi/en)
- Complex routing logic

**Recommendation:** Phased migration (1 category/week)

---

### 🆘 Support

**If stuck:**
1. Check `troubleshooting.md`
2. Re-upload SKILL.md in new conversation
3. Describe exact error

**Version:** 3.0  
**Optimized for:** Vanilla JS → Eleventy + CloudCannon  
**Last Updated:** 2025-02-05