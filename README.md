## Design Resources

### Final Figma File

The primary design source for this project is the Syncfusion Material 3 prototype available in Figma:

```text
https://www.figma.com/design/IAuAh0FGiuetvkeZY0I2Ta/Syncfusion-Test?node-id=0-1&t=DaPNvsMG0w30d33l-1
```

---

### Design System Assets

The project includes dedicated design system resources, AI workflows, and design tokens:

```text
.cursor/
├── rules/
└── skills/

.vscode/
└── mcp.json

design-tokens/
├── css-variables.css
├── material3-tokens.json
└── material3-dark-tokens.json
```

These assets provide:

* Syncfusion Material 3 design tokens
* Component implementation standards
* Cursor AI project context
* Figma MCP integration
* Reusable design-to-code workflows
* Theme and styling foundations

---

### Technology Stack

* Angular
* TypeScript
* SCSS
* Syncfusion EJ2 Angular Components
* Syncfusion Material 3 Theme
* Cursor AI
* Figma MCP (Model Context Protocol)

---

### Design Principles

The application follows:

* Material 3 design standards
* RTL and LTR support
* Responsive layouts
* Reusable component architecture
* Design token–driven styling
* Enterprise dashboard patterns
* Accessibility-first design
* Consistent design-to-code implementation

---

### Component Strategy

UI elements are mapped to Syncfusion EJ2 Angular components whenever possible to ensure:

* Design system consistency
* Faster development
* Reduced custom implementation
* Improved maintainability
* Material 3 compliance
* Scalable enterprise architecture

---

### Design-to-Code Workflow

1. Analyze the Figma design using Figma MCP.
2. Review available design tokens and Material 3 assets.
3. Apply project-specific Cursor rules and skills.
4. Map design elements to Syncfusion EJ2 Angular components.
5. Generate Angular structure, HTML, SCSS, and TypeScript.
6. Apply design tokens and theme variables.
7. Validate responsive layouts.
8. Validate RTL and LTR behavior.
9. Review implementation against the original Figma design.
10. Refine for reusability, consistency, and maintainability.

---

### AI-Assisted Development

This project follows an AI-native development workflow where Cursor AI, Figma MCP, Syncfusion Material 3 assets, and project-specific rules work together to accelerate implementation while maintaining consistency with the design system.

The goal is to establish a repeatable Design-to-Code process that transforms Figma designs into production-ready Angular applications with minimal manual translation effort.

---

### Prompts

Act as lead Angular architect for Khwarizmi.

Before doing anything, read:
- khwarizmi-design-system.rules.mdc
- frontend-architecture.rules.mdc
- angular.rules.mdc
- syncfusion.rules.mdc

Generate the complete src/ folder structure for Khwarizmi following
frontend-architecture.rules.mdc exactly:
- app/core/ (auth, http, layout — singletons only)
- app/shared/ (components, pipes, directives, models)
- app/features/: dashboard, surveys, samples, data-collection,
  reports, ai-insights, settings, auth
- app/styles/ (token and global SCSS files)

Each feature folder must contain: pages/, components/, services/,
models/, [feature].routes.ts — per the Feature Folder Rules section.

Shared components required: empty-state, confirm-dialog, page-header,
status-badge, skeleton-card, plus one component per: Accordion, Avatar,
Breadcrumb, Button, Card, Checkbox, Dropdown, File Upload, Notification,
Toast, Radio, Rating, Stepper, Switch, Table, Pagination, Tabs, Tags,
Text Input, Text Area, Tooltip — each mapped to its Syncfusion
equivalent per syncfusion.rules.mdc (no custom controls where a
Syncfusion component exists).

Output:
1. Complete file tree with real final file names
2. One line per top-level folder explaining its purpose
3. The 5 most important files to create first, in order, with reason

Do not generate component code. Do not write files to disk yet —
this is a planning step only. Do not invent features not listed above.
Do not hardcode any color, spacing, or radius value anywhere in the plan.

Act as Senior Product Designer and Design System Specialist for Khwarizmi.

Use Figma MCP to read:
File: v3PawI7Ubat6HYUyDdnGnb
Node: 56-134

First, confirm access and report:
1. All pages in the file
2. All libraries used
3. Count of variables, styles, and components

Do not generate code at this stage.

Then, following khwarizmi-design-system.rules.mdc as the source of truth:
1. Analyze available components, variables, typography styles, and
   spacing/layout patterns in the library
2. Audit the target screen for:
   - Component violations (non-Syncfusion-equivalent patterns)
   - Typography violations (off-scale font sizes/line-heights)
   - Layout/spacing violations (non-token values)
   - Accessibility issues
   - Enterprise UX issues (per the Design Decision Hierarchy)
3. Propose specific improvements for each violation found
4. Generate a refined version of the screen using only existing
   Khwarizmi tokens and Syncfusion Material-3 components

Apply Language and Direction rule from khwarizmi-design-system.rules.mdc:
infer LTR/RTL from the actual text content in the frame — do not assume
either direction.

If a value or component doesn't exist in the design system, flag it
with a comment instead of inventing one.

Push the refined screen to a new Figma page named: Survey Dashboard — Audited

Do not generate Angular code in this prompt.

Use Figma MCP to read this frame:
File: v3PawI7Ubat6HYUyDdnGnb
Node: 1374-2

Follow implementation-workflow.rules.mdc exactly.
