# Component Architecture (Atomic Design)

This directory follows **Atomic Design** principles, organizing components by complexity level.

## 📁 Directory Structure

```
components/
├── atoms/              # Basic building blocks
├── molecules/          # Simple combinations
├── organisms/          # Complex sections
└── templates/          # Page layouts
```

---

## 🔹 Atoms (Basic Building Blocks)

**Purpose:** The smallest, most fundamental UI elements that cannot be broken down further.

**Examples:**
- `Button` - Reusable button with variants (primary, secondary, outline)
- `Input` - Text input field with consistent styling
- `Label` - Form labels
- `Icon` - SVG icons or icon wrappers

**Guidelines:**
- Should be pure and reusable
- Accept minimal props (value, onChange, onClick, etc.)
- No business logic
- No API calls

**Location:** `components/atoms/[ComponentName]/[ComponentName].tsx`

---

## 🔸 Molecules (Simple Combinations)

**Purpose:** Simple UI patterns that combine multiple atoms into functional groups.

**Examples:**
- `FormField` - Label + Input + Error message
- `FormCheckbox` - Checkbox + Label
- `FormRadio` - Radio button + Label
- `FormSelect` - Dropdown select with options

**Guidelines:**
- Combine 2-3 atoms
- Handle simple UI logic (validation display, toggling)
- Reusable across pages
- Accept data via props

**Location:** `components/molecules/[feature]/[ComponentName].tsx`

**Current Molecules:**
```
molecules/
└── form/
    ├── formField.tsx          # Text input with label
    ├── formCheckBox.tsx       # Checkbox group
    ├── formRadio.tsx          # Radio button group
    └── formDropDown.tsx       # Dropdown select
```

---

## 🔶 Organisms (Complex Sections)

**Purpose:** Complex, feature-specific components that combine molecules and atoms into distinct sections.

**Examples:**
- `Navbar` - Full navigation bar with links, profile button
- `Footer` - Site footer with links and info
- `ProfileForm` - Complete profile editing form
- `MentorDisplay` - Mentor listing with filters and cards

**Guidelines:**
- Combine multiple molecules and atoms
- Can contain business logic
- May interact with context/state
- Feature-specific (not always reusable)
- Can make API calls

**Location:** `components/organisms/[feature]/[ComponentName].tsx`

**Current Organisms:**
```
organisms/
├── navigation/
│   ├── Navbar.tsx              # Main navigation bar
│   ├── NavbarTabs.tsx          # Navigation tabs
│   ├── ProfileButton.tsx       # User profile dropdown
│   └── Footer.tsx              # Site footer
├── portal/
│   ├── Profile/
│   │   ├── Profile.tsx         # Profile page wrapper
│   │   └── ProfileForm.tsx     # Profile edit form
│   ├── MentorDisplay/
│   │   └── MentorDisplay.tsx   # Mentor listing page
│   ├── MentorFilterBar/
│   │   └── MentorFilterBar.tsx # Filter controls
│   └── Pagination/
│       └── Pagination.tsx      # Pagination controls
├── landingPage/
│   ├── about/
│   │   ├── LandingPage.tsx     # About page content
│   │   ├── Content.tsx         # About content section
│   │   └── Profile.tsx         # Team member profile card
│   ├── initiatives/
│   │   ├── Initiatives.tsx     # Programs/initiatives page
│   │   ├── Programs.tsx        # Programs tab
│   │   ├── PastEvents.tsx      # Past events tab
│   │   ├── ProgramCard.tsx     # Program display card
│   │   ├── EventList.tsx       # Event listing
│   │   └── TabPanel.tsx        # Tab container
│   ├── resources/
│   │   ├── Resources.tsx       # Resources page
│   │   ├── ResourcesDisplay.tsx # Resource cards grid
│   │   └── ResourceCard.tsx    # Single resource card
│   ├── TeamDisplay/
│   │   └── TeamDisplay.tsx     # Team member grid
│   ├── ImpactBanner/
│   │   ├── Banner.tsx          # Impact metrics banner
│   │   └── BannerCard.tsx      # Single metric card
│   └── UpcomingEventsCard/
│       └── UpcomingEventsCard.tsx # Event preview card
└── calendar/
    └── ...                     # Calendar components
```

---

## 🔷 Templates (Page Layouts)

**Purpose:** High-level page structures that define layouts and composition patterns.

**Examples:**
- `PageLayout` - Standard page wrapper with Navbar + AuthProvider

**Guidelines:**
- Define page structure, not content
- Provide slots for content (`children`)
- Handle global providers (auth, theme)
- Consistent across pages

**Location:** `components/templates/[feature]/[ComponentName].tsx`

**Current Templates:**
```
templates/
└── layout/
    └── PageLayout.tsx          # Main page wrapper (Navbar + Auth)
```

---

## 📖 Component Creation Guide

### When creating a new component:

1. **Determine the level:**
   - **Can it be used in many places without change?** → Atom
   - **Does it combine 2-3 atoms into a simple pattern?** → Molecule
   - **Is it feature-specific and complex?** → Organism
   - **Does it define page structure?** → Template

2. **Create the file:**
   ```
   components/[level]/[feature or ComponentName]/ComponentName.tsx
   ```

3. **Use TypeScript:**
   ```typescript
   interface ComponentNameProps {
     // Define props
   }

   export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
     // Implementation
   }
   ```

4. **Import using absolute paths:**
   ```typescript
   import Button from '@/components/atoms/Button/Button';
   import FormField from '@/components/molecules/form/formField';
   import Navbar from '@/components/organisms/navigation/Navbar';
   ```

---

## 🎯 Benefits of Atomic Design

✅ **Consistency** - Reusable atoms ensure uniform UI  
✅ **Scalability** - Easy to add new features using existing components  
✅ **Maintainability** - Changes to atoms propagate throughout the app  
✅ **Testability** - Isolated components are easier to test  
✅ **Documentation** - Clear hierarchy makes onboarding easier  
✅ **Collaboration** - Teams can work on different levels independently

---

## 🔄 Migration Notes

All components have been reorganized into atomic structure. Import paths have been updated throughout the codebase:

**Old:**
```typescript
import Navbar from '@/components/navigation/Navbar';
import FormField from '../../components/form/formField';
```

**New:**
```typescript
import Navbar from '@/components/organisms/navigation/Navbar';
import FormField from '@/components/molecules/form/formField';
```

---

## 🛠️ Future Additions

When the codebase grows, consider creating:

**More Atoms:**
- `Badge`, `Avatar`, `Spinner`, `Tooltip`, `Divider`

**More Molecules:**
- `SearchBar`, `Tabs`, `Card`, `Modal`, `Breadcrumb`

**More Organisms:**
- `Header`, `Sidebar`, `Dashboard`, `CommentSection`

---

For more information, see the full architecture documentation: `/apps/portal/ARCHITECTURE.md`
