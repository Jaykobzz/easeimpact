# Task Prioritization App Design Guidelines

## Design Approach
**Utility-Focused Design System Approach** - This productivity tool prioritizes efficiency and data clarity over visual appeal. Following **Material Design** principles for their excellent data visualization components and clear information hierarchy.

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 220 85% 45% (Professional blue)
- Secondary: 220 15% 60% (Neutral gray-blue)
- Success: 142 70% 45% (Category A - Green)
- Warning: 38 95% 60% (Category B - Orange) 
- Info: 220 85% 65% (Category C - Light blue)
- Error: 0 70% 55% (Category D - Red)
- Background: 0 0% 98%
- Surface: 0 0% 100%

**Dark Mode:**
- Primary: 220 85% 65%
- Secondary: 220 15% 70%
- Success: 142 60% 55%
- Warning: 38 80% 65%
- Info: 220 75% 70%
- Error: 0 60% 65%
- Background: 220 15% 8%
- Surface: 220 15% 12%

### Typography
- **Primary Font:** Inter (Google Fonts)
- **Headers:** 600-700 weight, sizes from text-lg to text-3xl
- **Body:** 400-500 weight, text-sm to text-base
- **Data Labels:** 500 weight, text-xs to text-sm

### Layout System
**Tailwind Spacing Primitives:** 2, 4, 6, 8, 12, 16
- Consistent padding/margins using p-4, p-6, p-8
- Card spacing with gap-4, gap-6
- Section breaks with mb-8, mb-12

### Component Library

**Core Components:**
- Clean input forms with floating labels
- Category-colored task cards with subtle shadows
- Data-dense tables with zebra striping
- Interactive bubble chart with Material Design tooltips
- Floating action button for "Add Task"
- Progress indicators during classification

**Navigation:**
- Simple tab navigation between List View and Chart View
- Breadcrumb showing current step in workflow
- Action bar with Save PDF and Clear All buttons

**Data Displays:**
- Priority-coded task lists (A/B/C/D sections)
- Responsive bubble chart with zoom capabilities
- Summary statistics cards
- Classification matrix overlay on chart

**Forms:**
- Step-by-step task input wizard
- Slider-based rating system for Time/Value
- Confirmation dialogs for destructive actions

**Key UX Patterns:**
- Auto-save task inputs to prevent data loss
- Visual feedback during classification calculations
- Smooth transitions between workflow steps
- Hover states revealing additional task information
- Export progress indicator for PDF generation

**Accessibility:**
- High contrast mode support
- Keyboard navigation for all chart interactions
- Screen reader optimized task descriptions
- Focus indicators on all interactive elements

**Mobile Considerations:**
- Collapsible chart view with touch gestures
- Swipe-friendly task cards
- Simplified input forms for mobile screens
- Touch-optimized bubble chart interactions

This design prioritizes data clarity, workflow efficiency, and professional aesthetics appropriate for a productivity tool while maintaining Material Design's proven usability patterns.