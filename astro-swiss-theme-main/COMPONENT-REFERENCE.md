# Component Quick Reference

A concise reference for using ContentSplit and MinimalList components in the Astro Swiss Theme.

## Component Types

### ContentSplit
Two-column layout with descriptive content on the left and structured items on the right.

### MinimalList  
Clean, numbered or bulleted list with optional meta information.

## Field Reference

### ContentSplit Component

```yaml
- type: "ContentSplit"               # Required: Component type
  leftTitle: "string"                # Required: Left column title
  leftDescription: "string"          # Required: Left column description
  rightTitle: "string"               # Required: Right column title
  rightItems:                        # Required: Array of items
    - title: "string"                # Required: Item title
      description: "string"          # Required: Item description
      meta: "string"                 # Optional: Meta information
  reversed: boolean                  # Optional: Reverse column order (default: false)
```

### MinimalList Component

```yaml
- type: "MinimalList"                # Required: Component type
  title: "string"                    # Required: List title
  items:                             # Required: Array of items
    - title: "string"                # Required: Item title
      description: "string"          # Required: Item description
      meta: "string"                 # Optional: Meta information
  numbered: boolean                  # Optional: Use numbers vs bullets (default: false)
```

## Common Usage Patterns

### Single Component
```yaml
components:
  - type: "MinimalList"
    title: "Project Timeline"
    numbered: true
    items:
      - title: "Phase 1"
        description: "Planning and analysis"
        meta: "Week 1-2"
```

### Multiple Components
```yaml
components:
  - type: "MinimalList"
    # ... MinimalList configuration
  - type: "ContentSplit"
    # ... ContentSplit configuration
```

## Field Validation Rules

| Field | Type | Min Length | Max Length | Required |
|-------|------|------------|------------|----------|
| `type` | String | - | - | ✅ |
| `leftTitle` | String | 1 | - | ✅ |
| `leftDescription` | String | 1 | - | ✅ |
| `rightTitle` | String | 1 | - | ✅ |
| `title` | String | 1 | - | ✅ |
| `rightItems` | Array | 1 item | 10 items | ✅ |
| `items` | Array | 1 item | 15 items | ✅ |
| `item.title` | String | 1 | - | ✅ |
| `item.description` | String | 1 | - | ✅ |
| `item.meta` | String | - | - | ❌ |
| `reversed` | Boolean | - | - | ❌ |
| `numbered` | Boolean | - | - | ❌ |

## Best Practices

### Content Guidelines
- **Keep titles concise** (5-8 words max)
- **Limit descriptions** to 1-2 sentences
- **Use meta consistently** (timing, categories, status)
- **Maximum 5 items** per component for readability

### Layout Guidelines
- **Component order**: MinimalList → ContentSplit works best
- **Page limit**: 2-3 components maximum per page
- **Mobile-first**: Content stacks vertically on mobile

### Meta Field Examples
```yaml
# Timing information
meta: "Week 1-2"
meta: "2-3 months"
meta: "Q1 2024"

# Category labels
meta: "Frontend"
meta: "Primary KPI"
meta: "High Priority"

# Status indicators  
meta: "Complete"
meta: "In Progress"
meta: "Planned"
```

## Quick Templates

### Project Timeline
```yaml
- type: "MinimalList"
  title: "Project Timeline"
  numbered: true
  items:
    - title: "Discovery Phase"
      description: "Requirements gathering and stakeholder interviews."
      meta: "Week 1-2"
    - title: "Development Phase"
      description: "Core feature development and testing."
      meta: "Week 3-8"
    - title: "Launch Phase"
      description: "Deployment, monitoring, and user onboarding."
      meta: "Week 9-10"
```

### Service Overview
```yaml
- type: "ContentSplit"
  leftTitle: "Our Approach"
  leftDescription: "We combine strategic thinking with tactical execution to deliver measurable results that align with your business objectives."
  rightTitle: "Service Areas"
  rightItems:
    - title: "Strategy & Planning"
      description: "Comprehensive strategic planning and roadmap development."
      meta: "Consulting"
    - title: "Implementation"
      description: "Hands-on execution with continuous monitoring and optimization."
      meta: "Development"
```

### Key Features
```yaml
- type: "MinimalList"
  title: "Key Features"
  numbered: false
  items:
    - title: "Real-time Analytics"
      description: "Monitor performance with live dashboards and automated alerts."
      meta: "Core Feature"
    - title: "Custom Integrations"
      description: "Connect with existing tools through our flexible API platform."
      meta: "Premium"
```

### Technical Stack
```yaml
- type: "ContentSplit"
  leftTitle: "Technical Excellence"
  leftDescription: "Built with modern technologies for performance, scalability, and maintainability."
  rightTitle: "Technology Stack"
  rightItems:
    - title: "Frontend Framework"
      description: "React with TypeScript for type-safe development."
      meta: "UI Layer"
    - title: "Backend Services"
      description: "Node.js with PostgreSQL for reliable data management."
      meta: "API Layer"
  reversed: false
```

## Troubleshooting

### Validation Errors

**Missing required field:**
```
Error: "leftTitle" is required
Fix: Add all required fields per component type
```

**Empty arrays:**
```  
Error: Array must contain at least 1 element(s)
Fix: Add at least one item to rightItems or items arrays
```

**Invalid component type:**
```
Error: Invalid discriminator value. Expected 'ContentSplit' | 'MinimalList'
Fix: Use exact type strings: "ContentSplit" or "MinimalList"
```

### Common Issues

1. **Component not rendering**
   - Check YAML syntax and indentation
   - Verify all required fields are present
   - Ensure `type` field matches exactly

2. **Styling problems**
   - Components inherit theme colors automatically
   - Test on mobile devices for responsive behavior
   - Check for conflicting custom CSS

3. **Content overflow**
   - Keep descriptions concise (recommended: 100-150 characters)
   - Use meta fields for additional context
   - Break long content into multiple items

## File Locations

Components are supported in these collections:
- `src/content/reports/*.md`
- `src/content/projects/*.md`

Component renderer: `src/components/ContentRenderer.astro`
Schema definitions: `src/content/config.ts`

## Integration Notes

### Markdown Files
Add `components` field to frontmatter YAML block.

### Headless CMS
Configure JSON field in your CMS to accept component array structure.

### API Integration
Components are included in content collection query results automatically.

## Support

For detailed examples and CMS integration, see:
- `COMPONENTS.md` - Complete usage guide
- `CMS-EXAMPLES.md` - Headless CMS integration examples