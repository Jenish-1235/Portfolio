# Comprehensive Markdown Guide for Portfolio Content

This guide covers all the markdown syntax you can use when creating content for your portfolio projects, blogs, and papers.

## Table of Contents

1. [Basic Text Formatting](#basic-text-formatting)
2. [Headings](#headings)
3. [Lists](#lists)
4. [Links and Images](#links-and-images)
5. [Code and Syntax Highlighting](#code-and-syntax-highlighting)
6. [Tables](#tables)
7. [Special Note Blocks](#special-note-blocks)
8. [Horizontal Rules](#horizontal-rules)
9. [Blockquotes](#blockquotes)
10. [Advanced GitHub Flavored Markdown](#advanced-github-flavored-markdown)

---

## Basic Text Formatting

### Bold and Italic

```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
`Inline code`
```

**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
`Inline code`

---

## Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

## Lists

### Unordered Lists

```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3

* Alternative syntax
* Works the same way
+ Also works
```

- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3

### Ordered Lists

```markdown
1. First item
2. Second item
   1. Nested numbered item
   2. Another nested item
3. Third item
```

1. First item
2. Second item
   1. Nested numbered item
   2. Another nested item
3. Third item

### Task Lists

```markdown
- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task
```

- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task

---

## Links and Images

### Links

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Hover title")
<https://example.com>
[Reference link][ref]

[ref]: https://example.com "Reference link"
```

### Images

```markdown
![Alt text](image-url.jpg)
![Alt text](image-url.jpg "Image title")
[![Image as link](image-url.jpg)](https://example.com)
```

---

## Code and Syntax Highlighting

### Inline Code

```markdown
Use `const variable = value;` for inline code.
```

### Code Blocks

#### Basic Code Block

```markdown
```
function hello() {
  console.log("Hello World!");
}
```
```

#### Language-Specific Syntax Highlighting

```markdown
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

```python
def greet(name):
    return f"Hello, {name}!"
```

```bash
npm install
npm run build
npm start
```

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};
```

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

```sql
SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id
WHERE orders.created_at > '2024-01-01';
```

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "next": "^14.0.0"
  }
}
```
```

### Supported Languages

Your portfolio supports syntax highlighting for:
- `javascript` / `js`
- `typescript` / `ts`
- `react` / `jsx` / `tsx`
- `python` / `py`
- `bash` / `shell` / `sh`
- `css`
- `html`
- `json`
- `sql`
- `yaml` / `yml`
- `markdown` / `md`

---

## Tables

```markdown
| Feature | Support | Notes |
|---------|---------|-------|
| Headers | ✅ | Required |
| Alignment | ✅ | Left, center, right |
| Complex data | ✅ | Links, code, etc. |

| Left | Center | Right |
|:-----|:------:|------:|
| Text | Text | Text |
| More | More | More |
```

| Feature | Support | Notes |
|---------|---------|-------|
| Headers | ✅ | Required |
| Alignment | ✅ | Left, center, right |
| Complex data | ✅ | Links, code, etc. |

---

## Special Note Blocks

Your portfolio has enhanced blockquote styling that automatically detects special note types:

### Information Notes

```markdown
> ℹ️ **Info:** This is an informational note with helpful details.

> **Note:** You can also use "Note:" to trigger info styling.
```

> ℹ️ **Info:** This is an informational note with helpful details.

### Warning Notes

```markdown
> ⚠️ **Warning:** This is a warning about potential issues.

> **Caution:** Important things to watch out for.
```

> ⚠️ **Warning:** This is a warning about potential issues.

### Tips and Pro Tips

```markdown
> 💡 **Tip:** Here's a helpful tip for better results.

> **Pro Tip:** Advanced techniques for experienced users.
```

> 💡 **Tip:** Here's a helpful tip for better results.

### Error/Danger Notes

```markdown
> ❌ **Error:** This describes an error condition.

> **Danger:** Critical warnings about destructive actions.
```

> ❌ **Error:** This describes an error condition.

### Success Notes

```markdown
> ✅ **Success:** This indicates successful completion.

> **Done:** Task completed successfully.
```

> ✅ **Success:** This indicates successful completion.

### Regular Blockquotes

```markdown
> This is a regular blockquote without special styling.
> It can span multiple lines and will use the default theme.
```

> This is a regular blockquote without special styling.
> It can span multiple lines and will use the default theme.

---

## Horizontal Rules

```markdown
---
***
___
```

---

## Advanced GitHub Flavored Markdown

### Strikethrough

```markdown
~~This text is crossed out~~
```

~~This text is crossed out~~

### Automatic URL Linking

```markdown
Visit https://github.com for more information.
Email me at user@example.com
```

### Mentions and References

```markdown
@username
#123 (issue reference)
SHA: a5c3785ed8d6a35868bc169f07e40e889087fd2e
```

### Emoji Support

```markdown
:smile: :heart: :thumbsup: :rocket: :fire:
```

😄 ❤️ 👍 🚀 🔥

---

## Best Practices for Portfolio Content

### 1. Structure Your Content

- Use proper heading hierarchy (H1 → H2 → H3)
- Include a brief overview at the top
- Break content into logical sections

### 2. Code Examples

- Always specify the language for syntax highlighting
- Include copy buttons will be automatically added
- Comment your code when necessary

### 3. Use Special Notes Wisely

- Use info blocks for important details
- Use warning blocks for potential pitfalls
- Use tip blocks for helpful advice
- Use success blocks to highlight achievements

### 4. Images and Media

- Use descriptive alt text
- Optimize images for web (use appropriate sizes)
- Consider using external image hosting for large files

### 5. Tables

- Keep tables simple and readable
- Use alignment for better visual hierarchy
- Include headers for all columns

---

## Example Project Content Structure

```markdown
---
title: "Your Project Title"
date: 2024-01-15
slug: "project-slug"
category: "Development Category"
coverImage: "https://example.com/image.jpg"
description: "Brief project description"
techStack:
  - "React"
  - "TypeScript"
  - "Node.js"
liveUrl: "https://your-project.com"
github: "https://github.com/username/project"
---

## Overview

Brief description of what the project does and why it's important.

> 💡 **Tip:** Start with a compelling overview that hooks the reader.

## Features

- Feature 1
- Feature 2
- Feature 3

## Technical Implementation

### Backend Architecture

```typescript
// Your code examples here
```

### Frontend Components

```jsx
// React component examples
```

## Challenges and Solutions

> ⚠️ **Challenge:** Describe a specific challenge you faced.

> ✅ **Solution:** Explain how you solved it.

## Results and Impact

| Metric | Before | After | Improvement |
|--------|---------|-------|-------------|
| Performance | 3s | 1s | 67% faster |
| User Engagement | 45% | 78% | +33% |

## Lessons Learned

- Lesson 1
- Lesson 2
- Lesson 3

## Future Improvements

- [ ] Feature to implement
- [ ] Performance optimization
- [ ] UI/UX enhancements
```

---

This guide covers all the markdown features available in your portfolio. The enhanced styling will automatically apply to make your content look professional and engaging!
