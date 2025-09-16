# Task Prioritization App

## Overview

A Swedish productivity application that helps users prioritize tasks based on time required and business value. The app automatically categorizes tasks into four priority levels (A, B, C, D) using a 2x2 matrix approach, providing clear visual guidance on what to tackle first. Features include interactive bubble chart visualization, task management forms, PDF export capabilities, and both light/dark theme support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type-safe development
- **Vite** as the build tool and development server for fast compilation
- **Wouter** for lightweight client-side routing
- **SPA (Single Page Application)** architecture with component-based design
- **Tailwind CSS** with custom design system for styling
- **Shadcn/ui** component library providing consistent UI primitives

### Component Structure
- **Modular component design** with clear separation of concerns
- **Form handling** using React Hook Form with Zod validation
- **State management** through React Query for server state and local React state
- **Custom hooks** for reusable logic (mobile detection, toast notifications)
- **Example components** provided for development reference

### Backend Architecture
- **Express.js** REST API server with TypeScript
- **Middleware-based request handling** with logging and error management
- **Modular routing system** separating API endpoints from server setup
- **Storage abstraction** using interface pattern for potential database switching
- **In-memory storage** as default with extensible storage interface

### Task Classification System
- **Automatic categorization** based on time rating (1-10) and value rating (1-10)
- **Four priority categories**:
  - A: Quick tasks with high value (do first)
  - B: Time-consuming tasks with high value (schedule and optimize)
  - C: Quick tasks with low value (do when available)
  - D: Time-consuming tasks with low value (eliminate or automate)

### Data Visualization
- **Custom bubble chart** using HTML5 Canvas for interactive task visualization
- **Responsive design** with mobile-first approach
- **Real-time updates** reflecting task priority changes
- **Export functionality** generating PDF reports with task categorization

### Styling System
- **Utility-first approach** with Tailwind CSS
- **Material Design principles** for data visualization
- **Custom color palette** with semantic category colors
- **Dark/light theme support** with CSS custom properties
- **Consistent spacing system** using standardized Tailwind primitives

## External Dependencies

### Core Framework Dependencies
- **React ecosystem**: React 18, React DOM, React Hook Form for form management
- **TypeScript** for type safety and developer experience
- **Vite** for build tooling and development server
- **Express.js** for backend API server

### UI and Styling
- **Tailwind CSS** for utility-first styling approach
- **Radix UI** primitives for accessible component foundation
- **Shadcn/ui** component library for consistent design system
- **Lucide React** for iconography
- **Class Variance Authority** for component variant management

### Data Management
- **TanStack React Query** for server state management and caching
- **Zod** for runtime type validation and schema definition
- **Date-fns** for date manipulation and formatting

### Database and Storage
- **Drizzle ORM** for type-safe database operations
- **PostgreSQL** as the target database (configured but not yet implemented)
- **Neon Database** serverless PostgreSQL integration ready

### Development and Build Tools
- **TSX** for TypeScript execution in development
- **ESBuild** for production bundling
- **PostCSS** with Autoprefixer for CSS processing
- **Replit integration** with development banner and error overlay

### Export and PDF Generation
- **jsPDF** for PDF document generation
- **html2canvas** for capturing visual elements in exports

### Session and Storage
- **connect-pg-simple** for PostgreSQL session storage (ready for implementation)
- **Nanoid** for generating unique identifiers