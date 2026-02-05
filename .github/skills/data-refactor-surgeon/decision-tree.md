Decision Tree: Migration Format Choice
Quick Reference
Your Situation Recommended Format Vanilla JS website Eleventy + Markdown React/Vue app Keep framework, add CMS Static HTML only Eleventy + Markdown Astro project Keep Astro + Markdown
For Vanilla JS Projects
Should I migrate?
YES if:
* ✓ Data is in .js files
* ✓ Want visual editor
* ✓ Need content management
NO if:
* ✗ Very complex JS logic
* ✗ Heavy client-side interactions
Which SSG?
Eleventy (Recommended)
* Minimal learning curve
* Keep HTML structure
* Best CloudCannon support
Data Format: JSON vs Markdown?
Use Markdown if:
* Long content (>500 chars)
* Has HTML markup
* Need visual editor
For your case: → MARKDOWN
Bilingual Strategy
Single file (Recommended):

---
title_vi: "..."
title_en: "..."
---

Content both languages...
Migration Approach
Phased (Recommended for 4+ categories):
* Week 1: Setup + 1 category
* Week 2-4: Remaining categories
Ready Checklist

- [ ] Backed up current site
- [ ] Git repository setup
- [ ] Time allocated (40-60 hours)
- [ ] Have rollback plan
All checked? → Proceed