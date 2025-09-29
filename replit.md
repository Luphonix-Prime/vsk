# VSK Gujarat Website

## Overview

This is a cultural organization website for VSK (Vishwa Sanskrit Kendra) Gujarat, designed to preserve and promote Gujarati cultural heritage while building community connections. The site features a modern, clean design with traditional Indian color symbolism (saffron, white, green) and serves as a platform for cultural events, news, publications, and community engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system implementing traditional color palette
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful API with structured error handling
- **File Structure**: Monorepo structure with shared schema between client and server
- **Development**: Hot module replacement with Vite integration

### Database Schema
- **Users Table**: Authentication with admin role support
- **Blog Posts Table**: Content management with publishing workflow
- **Categories Table**: Content organization and filtering
- **Relationships**: Foreign key constraints between posts, users, and categories

### Component Architecture
- **Reusable Cards**: NewsCard, GalleryCard, PublicationCard, ImportantDayCard for consistent content display
- **Layout Components**: Header with responsive navigation, Footer with contact info
- **Form Components**: ContactForm with validation and toast notifications
- **Page Components**: Dedicated pages for About, News, Gallery, Publications, Important Days, Contact, and Admin

### Design System
- **Color Palette**: Saffron (#FF9933) primary, White backgrounds, Green (#138808) secondary
- **Typography**: Poppins for English, Noto Sans for Gujarati/Devanagari
- **Grid System**: 8px spacing grid with responsive breakpoints
- **Component Library**: Consistent card designs, button variants, and hover effects

## External Dependencies

### Database
- **Neon Serverless Postgres**: Cloud PostgreSQL database with connection pooling
- **Connection**: Environment variable-based configuration with fallback for development

### UI/UX Libraries
- **Radix UI**: Accessible component primitives for dialog, dropdown, navigation
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel components
- **Class Variance Authority**: Type-safe component variants

### Development Tools
- **ESBuild**: Fast bundling for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **Replit Plugins**: Development banner and error modal for Replit environment

### Fonts
- **Google Fonts**: Poppins for modern English typography
- **Noto Fonts**: Gujarati and Devanagari scripts for multilingual support

### Build and Deployment
- **Vite**: Development server with HMR and production builds
- **TypeScript**: Full type safety across client, server, and shared code
- **Environment**: Configured for both local development and Replit deployment