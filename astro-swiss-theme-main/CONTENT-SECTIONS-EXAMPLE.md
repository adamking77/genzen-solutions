# Enhanced Content Sectioning System - Example

This demonstrates the new content sectioning system for mixed report/project layouts.

## Example Report Frontmatter

```yaml
---
title: "Mixed Layout Report Example"
subtitle: "Demonstrating the new content sectioning system"
description: "How to create magazine-style layouts with alternating content and components"
author: "Design Team"
publishDate: "2024-12-15"
category: "Documentation"
tags: ["Layout", "Components", "CMS"]
readTime: "8 min read"

# New content sections configuration
contentSections:
  - type: "markdown"
    id: "introduction" 
    layout: "prose"
  - type: "component"
    component: "DataStory"
    year: "2024"
    storyTitle: "Performance Metrics"
    storyDescription: "Our Q4 performance analysis..."
    dataTitle: "Key Results"
    dataGrid: 
      - ["99%", "95%", "< 1s", "100%"]
      - ["Uptime", "Satisfaction", "Load Time", "SEO Score"]
  - type: "markdown"
    id: "analysis"
    layout: "wide"
  - type: "component"
    component: "ContentSplit"
    leftTitle: "Technical Architecture"
    leftDescription: "Our implementation approach..."
    rightTitle: "Performance Chart"
    rightChart:
      embedUrl: "https://graph-zen.app?embed=true&config=..."
      height: "400px"
  - type: "markdown"
    id: "conclusion"
    layout: "prose"
---

<!-- Section: introduction -->
# Executive Summary

This report demonstrates the new content sectioning system that allows for mixed layouts throughout the document. Instead of having all content in a single container with components only at the bottom, we can now create magazine-style layouts.

## Key Benefits

- **Layout Variety**: Mix prose, wide, and full-width content sections
- **Component Integration**: Insert interactive components anywhere
- **CMS Friendly**: Configure through frontmatter
- **Performance**: Static generation with Astro best practices

<!-- Section: analysis -->
## Detailed Analysis

This section uses the "wide" layout for better readability of technical content. The wider container allows for more detailed explanations and better use of screen real estate on larger displays.

### Technical Implementation

The system works by:

1. **Parsing frontmatter** contentSections array
2. **Splitting markdown** content by section markers
3. **Rendering sections** with appropriate layouts
4. **Inserting components** between content sections

This creates a dynamic, engaging reading experience while maintaining clean separation between content and presentation.

<!-- Section: conclusion -->
## Conclusions

The enhanced content sectioning system provides the flexibility needed for modern web content while maintaining Astro's content-first philosophy and CMS compatibility.

This approach delivers 80% of MDX benefits without the complexity overhead for content creators.
```

## Layout Options

### Content Layouts:
- **prose**: Standard article width (`max-w-4xl`) - best for reading
- **wide**: Wider content (`max-w-6xl`) - good for technical content
- **full-width**: Full screen width - for emphasis or special content

### Available Components:
- **Layout Components**: ContentSplit, Timeline, DataStory, HybridShowcase
- **Report Components**: FinancialHighlights, MarketAnalysis, PerformanceMetrics
- **Interactive Elements**: Charts, data visualizations, embedded content

## CMS Integration

In PagesCMS, content editors can:
1. **Add/remove sections** through array fields
2. **Select component types** from dropdown
3. **Configure component data** through form fields
4. **Edit markdown content** with familiar editor
5. **Preview sections** individually

This maintains the simplicity content editors expect while providing the layout flexibility developers need.