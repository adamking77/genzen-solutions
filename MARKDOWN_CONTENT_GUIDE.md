# Markdown Content Guide for Reports

## ✅ **Now Available: Standard Astro Markdown Workflow**

Your report system now uses the standard Astro Content Collections with Markdown - exactly as you expected! This makes content creation much simpler and more intuitive.

## 🎯 **How to Create New Reports**

### 1. Create a New `.md` File
Simply create a new file in `src/content/reports/your-report-name.md`

### 2. Add Frontmatter (Metadata)
```markdown
---
title: "Your Report Title"
subtitle: "Brief description"
description: "Longer description for SEO and previews"
author: "Your Name"
publishDate: "January 2025"
category: "Intelligence" # or "Strategic", "Analysis", etc.
tags: ["Security", "Analysis", "Threat Intelligence"]
readTime: "12 min read"
featured: true # Optional - adds "Featured" badge
---
```

### 3. Add Optional Structured Data
For interactive components (Executive Summary, Metrics, Client Insights):

```yaml
executiveSummary:
  keyPoints:
    - "Key finding one"
    - "Key finding two"
  recommendations:
    immediate: "What to do now"
    shortTerm: "Next 6 months"
    longTerm: "Long-term strategy"
  nextReview: "Q2 2025"
  timeline: "12 mo"

metrics:
  - label: "Success Rate"
    value: "94%"
    change: "+12%"
    period: "YoY"
  - label: "Response Time"
    value: "4.2 min"
    change: "-34%"
    period: "vs baseline"

insights:
  - category: "Client Satisfaction"
    score: 9.2
    feedback: "Detailed feedback here"
    clients: 47
```

### 4. Write Your Content in Markdown
```markdown
## Executive Summary

Your content here using **standard Markdown syntax**.

### Subsections

- Bullet points
- Work naturally
- As expected

1. Numbered lists
2. Also work
3. Perfectly

**Bold text**, *italic text*, and [links](https://example.com) all work as expected.

> Blockquotes for important callouts

### Code blocks work too:
```
Code examples here
```

## Benefits of This Approach

### ✅ **What You Get Now:**

1. **Standard Markdown Editing**
   - Write content in any Markdown editor
   - Full syntax support: headers, lists, links, emphasis
   - No complex JSON structure to manage

2. **Frontmatter for Metadata**
   - Standard YAML frontmatter for report data
   - Familiar to anyone who's used Jekyll, Hugo, or Gatsby
   - Easy to understand and edit

3. **Optional Interactive Components**
   - Add `executiveSummary`, `metrics`, or `insights` in frontmatter
   - These render as beautiful interactive sections
   - Skip them if you just want plain content

4. **Automatic Features**
   - Report listing page automatically updates
   - SEO metadata handled automatically
   - Related reports generated automatically
   - Search and filtering (if you add it later)

### 🚀 **Content Creation Workflow:**

1. **Copy existing report** as template
2. **Edit frontmatter** with your metadata
3. **Write content** in Markdown
4. **Save file** - that's it!

### 📝 **Example: Creating a Security Report**

```markdown
---
title: "Q1 2025 Threat Intelligence Brief"
subtitle: "Emerging threats targeting UHNW families"
category: "Intelligence"
tags: ["Threats", "Intelligence", "Security"]
author: "Security Team"
publishDate: "March 2025"
readTime: "8 min read"
---

## Threat Overview

New sophisticated attacks are targeting family offices through...

### Key Findings

1. **Social Engineering Evolution**: Attackers now spend 6+ months...
2. **Technology Exploitation**: AI-powered voice cloning used in...
3. **Insider Threat Patterns**: Staff cultivation techniques show...

## Recommendations

### Immediate Actions
- Implement voice verification protocols
- Review all staff background checks
- Update incident response procedures
```

## Customization Options

### Current Template Supports:
- ✅ **Executive Summary** with key points and recommendations
- ✅ **Financial/Performance Metrics** with trend indicators  
- ✅ **Client Insights** with satisfaction scores
- ✅ **Full Markdown Content** for detailed analysis
- ✅ **Related Reports** automatically generated
- ✅ **Responsive Design** with brand styling

### Easy to Add Later:
- Charts and visualizations
- Photo galleries
- Video embeds
- Custom sections for specific report types

## File Management

### Reports Location:
`src/content/reports/`

### Naming Convention:
- Use kebab-case: `trust-vulnerability-assessment.md`
- URLs automatically generated: `/reports/trust-vulnerability-assessment`
- File name becomes the slug

### Organization Tips:
- Group by year: `2025-q1-threat-brief.md`
- Group by type: `intel-report-jan-2025.md`  
- Keep names descriptive but concise

This is exactly the standard Astro approach you were expecting - simple, powerful, and familiar to anyone who's worked with modern static site generators!