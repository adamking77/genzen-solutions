# GenZen Solutions Homepage Redesign Plan

This document outlines the plan to redesign the GenZen Solutions homepage. The goal is to enhance the visual impact, improve content manageability, and better align the page structure with the narrative flow of the company's services.

## 1. Content Management Strategy

To improve maintainability and separate content from presentation, all text and structured data currently hardcoded within `src/pages/index.astro` will be centralized into a single TypeScript file.

*   **New File:** `src/data/homePageContent.ts`
*   **Structure:** This file will export a single, comprehensive object (e.g., `homePageContent`) containing all the necessary strings, lists, and data points for the entire homepage.

**Benefits of this approach:**

*   **Improved Maintainability:** Content updates can be made in one central location without touching the component code.
*   **Separation of Concerns:** The `index.astro` file will be responsible for page structure and layout, while `homePageContent.ts` will be the single source of truth for content.
*   **Easier Updates:** Non-developers can be guided to update the content file with greater ease and less risk of breaking the page layout.
*   **Type Safety:** Using TypeScript ensures that the data structure remains consistent and helps prevent errors when components consume the content.

## 2. Component Mapping

The current homepage uses basic components. To better tell the GenZen story and engage the user, we will replace them with more sophisticated, purpose-built components from the theme library.

| Section (from Copy) | Current Component | Proposed Component | Justification |
| :--- | :--- | :--- | :--- |
| **Hero & Evidence** | `CompanyHero`, `DataGrid` | `DataStory` | The `DataStory` component is ideal for weaving a compelling narrative around key statistics. It can present the initial "Threat" and the supporting "Evidence" data points in a more integrated and visually engaging way than two separate, static components. |
| **Patterns** | `MinimalList` | `Timeline` | The "What Trust Architecture Exploitation Looks Like" section describes patterns that unfold over time. The `Timeline` component provides a powerful visual metaphor to present these exploitation methods as a sequence of events, making the threat feel more concrete and understandable. |
| **Solution & Services** | `SplitContent` | `BrandPlatform` | The `BrandPlatform` component is designed to showcase a company's core pillars or service offerings. It is the perfect replacement for the generic `SplitContent` block, allowing us to present both "Legacy Intelligence: The Missing Capability" and the "Legacy Threat Analysis" services in a structured, clear, and visually appealing format. |
| **About & Founder** | `About` (x2) | `FoundedStory` | Using two separate `About` components is repetitive. The `FoundedStory` component is specifically designed to combine the company's mission with the founder's background, creating a unified and compelling narrative about the origins and expertise of GenZen Solutions. |
| **Final CTA** | `CTA` | `CTA` | The existing `CTA` component is suitable for the final call to action. It will be retained but will source its content from the new centralized data file, ensuring consistency with the new content management strategy. |

## 3. New Page Structure

The new `src/pages/index.astro` will be significantly cleaner, focusing on layout and data flow. It will import the content from `src/data/homePageContent.ts` and pass the relevant sections to the new, more dynamic components.

```astro
---
// src/pages/index.astro (Proposed)

import BaseLayout from '../layouts/BaseLayout.astro';
import { homePageContent } from '../data/homePageContent';

// Import the new, more sophisticated components
import DataStory from '../components/layouts/DataStory.astro';
import Timeline from '../components/layouts/Timeline.astro';
import BrandPlatform from '../components/layouts/BrandPlatform.astro';
import FoundedStory from '../components/layouts/FoundedStory.astro';
import CTA from '../components/sections/CTA.astro';
---

<BaseLayout 
  title={homePageContent.meta.title} 
  description={homePageContent.meta.description}
>

  <DataStory
    title={homePageContent.hero.title}
    subtitle={homePageContent.hero.subtitle}
    dataPoints={homePageContent.evidence.dataPoints}
  />

  <Timeline
    title={homePageContent.patterns.title}
    events={homePageContent.patterns.events}
    closingText={homePageContent.patterns.closingText}
  />

  <BrandPlatform
    title={homePageContent.solution.title}
    platforms={homePageContent.solution.platforms}
  />

  <FoundedStory
    companyName={homePageContent.about.companyName}
    companyStory={homePageContent.about.companyStory}
    founderName={homePageContent.about.founderName}
    founderStory={homePageContent.about.founderStory}
    founderImage={homePageContent.about.founderImage}
  />

  <CTA
    headline={homePageContent.cta.headline}
    subtext={homePageContent.cta.subtext}
    buttonText={homePageContent.cta.buttonText}
    buttonLink={homePageContent.cta.buttonLink}
  />

</BaseLayout>