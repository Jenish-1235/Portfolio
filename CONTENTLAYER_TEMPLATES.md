# Contentlayer Templates & Metadata Guide

This guide provides ready-to-use templates for creating blogs, projects, and papers in your portfolio. Simply copy and paste the appropriate template and fill in your content.

## Table of Contents

1. [Project Templates](#project-templates)
2. [Blog Templates](#blog-templates)
3. [Paper Templates](#paper-templates)
4. [Metadata Field Explanations](#metadata-field-explanations)
5. [File Naming Conventions](#file-naming-conventions)
6. [Content Guidelines](#content-guidelines)

---

## Project Templates

### Basic Project Template

```markdown
---
title: "Your Project Title"
date: 2024-MM-DD
slug: "project-slug"
category: "Development Category"
coverImage: "https://images.unsplash.com/photo-id?w=1200&h=800&fit=crop"
description: "Brief description of what your project does and its main purpose."
techStack:
  - "Technology 1"
  - "Technology 2"
  - "Technology 3"
  - "Technology 4"
liveUrl: "https://your-live-project.com"
github: "https://github.com/yourusername/project-name"
---

## Overview

Write a comprehensive overview of your project here. Explain what it does, why you built it, and what problems it solves.

## Features

- Key feature 1
- Key feature 2
- Key feature 3

## Technical Implementation

### Architecture

Describe your project's architecture and design decisions.

### Key Technologies

```javascript
// Include relevant code snippets
```

## Challenges and Solutions

> ⚠️ **Challenge:** Describe a specific challenge you faced.

> ✅ **Solution:** Explain how you overcame it.

## Results

Share metrics, feedback, or outcomes from your project.

## Future Enhancements

- [ ] Planned feature 1
- [ ] Planned feature 2
- [ ] Performance improvements
```

## Blog Templates

### Technical Blog Post Template

```markdown
---
title: "How to Build/Implement [Technical Topic]"
date: 2024-MM-DD
slug: "technical-blog-slug"
summary: "Learn how to [accomplish something technical] with step-by-step instructions and examples."
tags:
  - "tutorial"
  - "web development"
  - "javascript"
  - "react"
---

## Introduction

Brief introduction to the topic and what readers will learn.

## Prerequisites

- Basic knowledge of X
- Familiarity with Y
- Development environment setup

## Step-by-Step Guide

### Step 1: Setup

```bash
# Setup commands
```

### Step 2: Implementation

```javascript
// Code examples with explanations
```

### Step 3: Testing

```javascript
// Testing code
```

## Best Practices

> 💡 **Tip:** Share important tips and best practices.

## Common Pitfalls

> ⚠️ **Warning:** Highlight common mistakes to avoid.

## Conclusion

Summarize what was covered and next steps.

## Further Reading

- [Resource 1](https://example.com)
- [Resource 2](https://example.com)
```

## Paper Templates

### Research Paper Template

```markdown
---
title: "Research Paper Title: [Descriptive Title]"
date: 2024-MM-DD
slug: "research-paper-slug"
summary: "Abstract or brief summary of your research findings and methodology."
tags:
  - "research"
  - "academic"
  - "data analysis"
---

## Abstract

A concise summary of your research question, methodology, findings, and conclusions.

## Introduction

### Problem Statement
Define the problem you're investigating.

### Research Questions
- Primary research question
- Secondary questions

### Objectives
- Objective 1
- Objective 2
- Objective 3

## Literature Review

Review of existing research and how your work contributes.

## Methodology

### Research Design
Explain your approach and methodology.

### Data Collection
```python
# Data collection methods and code
```

### Analysis Techniques
```python
# Statistical analysis code
```

## Results

### Key Findings
Present your main findings with supporting data.

### Statistical Analysis
| Variable | Mean | Std Dev | P-value |
|----------|------|---------|---------|
| Variable 1 | 2.45 | 0.67 | 0.023 |
| Variable 2 | 1.89 | 0.45 | 0.001 |

## Discussion

Interpret your results and their implications.

## Limitations

> ⚠️ **Limitation:** Acknowledge study limitations and their impact.

## Conclusions

Summarize key findings and their significance.

## References

- Reference 1
- Reference 2
- Reference 3
```

---

## File Naming Conventions

### Projects
```
content/projects/YYYY/YYYY-MM-DD--project-slug.mdx
```
**Examples:**
- `content/projects/2024/2024-05-15--ai-analytics.mdx`
- `content/projects/2024/2024-08-20--ecommerce-platform.mdx`

### Blogs
```
content/blogs/YYYY/YYYY-MM-DD--blog-slug.mdx
```
**Examples:**
- `content/blogs/2024/2024-06-10--react-hooks-guide.mdx`
- `content/blogs/2024/2024-09-05--career-lessons.mdx`

### Papers
```
content/papers/YYYY/YYYY-MM-DD--paper-slug.mdx
```
**Examples:**
- `content/papers/2024/2024-07-01--ml-research.mdx`
- `content/papers/2024/2024-11-15--data-analysis-study.mdx`

---

## Content Guidelines

### Writing Tips

1. **Start with a compelling overview** that hooks the reader
2. **Use proper heading hierarchy** (H2 → H3 → H4)
3. **Include code examples** with proper language specification
4. **Add special note blocks** for important information
5. **Use tables** for structured data comparison
6. **Include visuals** when they add value

### SEO Best Practices

- Write descriptive titles (50-60 characters)
- Create compelling summaries/descriptions (150-160 characters)
- Use relevant tags and categories
- Include alt text for images
- Use descriptive slugs with hyphens

### Technical Content

- Always specify programming language for code blocks
- Comment complex code snippets
- Include setup instructions when relevant
- Provide working examples
- Link to external resources

### Image Guidelines

- Use high-quality images (1200x800 recommended)
- Unsplash images work well for cover images
- Optimize file sizes for web
- Include descriptive alt text
- Consider using consistent aspect ratios

---

## Quick Copy-Paste Templates

### New Project (Web App)
```markdown
---
title: ""
date: 2024-MM-DD
slug: ""
category: "Web Development"
coverImage: ""
description: ""
techStack:
  - ""
  - ""
  - ""
liveUrl: ""
github: ""
---

## Overview

## Features

## Technical Implementation

## Challenges and Solutions

## Results
```

### New Blog Post
```markdown
---
title: ""
date: 2024-MM-DD
slug: ""
summary: ""
tags:
  - ""
  - ""
---

## Introduction

## Main Content

## Conclusion
```

### New Research Paper
```markdown
---
title: ""
date: 2024-MM-DD
slug: ""
summary: ""
tags:
  - ""
  - ""
---

## Abstract

## Introduction

## Methodology

## Results

## Discussion

## Conclusions
```

---

Save this file as a reference and use these templates to maintain consistency across all your portfolio content!
