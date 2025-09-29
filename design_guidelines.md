# VSK Gujarat Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern organizational and cultural websites with clean, institutional aesthetics while incorporating traditional Indian color symbolism.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Saffron: #FF9933 (primary brand color representing cultural heritage)
- White: #FFFFFF (clean background and contrast)
- Green: #138808 (secondary brand color, cultural significance)
- Gold: Accent color for highlights and CTAs

**Usage:**
- Header/Navigation: White background with saffron accents
- Hero sections: Saffron gradients or solid backgrounds
- Content cards: White backgrounds with subtle shadows
- CTAs and buttons: Saffron primary, green secondary

### B. Typography
- **Primary Font**: Poppins (English content) - modern, clean sans-serif
- **Regional Fonts**: Noto Sans Gujarati, Noto Sans Devanagari for multilingual support
- **Hierarchy**: Clear distinction between headings (bold weights) and body text (regular/medium)

### C. Layout System
- **Spacing**: Use consistent 8px grid system (Tailwind units: 2, 4, 8, 12, 16)
- **Responsive Grid**: 
  - Mobile: 1 column layout
  - Tablet: 2 column layout  
  - Desktop: 3+ column layout
- **Container**: Max-width with centered content and appropriate padding

### D. Component Library

**Navigation:**
- Clean header with logo and horizontal menu
- Mobile hamburger menu with smooth slide-in animation
- Sticky navigation on scroll

**Cards:**
- Clean, modern card design with subtle shadows
- Rounded corners (8px border radius)
- Hover effects with slight elevation increase
- Image + title + excerpt + CTA button layout

**Buttons:**
- Rounded corners with hover effects
- Primary: Saffron background, white text
- Secondary: Green background, white text
- Outline variants with appropriate contrast

**Content Sections:**
- Hero banner with featured image slider
- Grid-based layouts for news, gallery, publications
- Preview sections on homepage with "View All" links

### E. Animations
- Smooth scroll navigation between sections
- Fade-in animations for content loading
- Hover zoom effects on images and cards
- Subtle transitions (300ms duration) for interactive elements

## Page-Specific Design Requirements

### Homepage
- **Hero Section**: Large banner/slider with featured images showcasing organizational activities
- **Preview Sections**: Latest News, Important Days, Gallery, Publications - each with 3-4 items and "View All" button
- **Layout**: Stacked sections with generous whitespace

### Content Pages (News, Gallery, Publications, Important Days)
- **Grid Layout**: Responsive card-based design
- **Filtering**: Clean filter interface for categories/dates
- **Detail Views**: Modal or dedicated page layouts for expanded content

### Gallery
- **Lightbox**: Modern overlay with smooth transitions
- **Mixed Media**: Support for both images and embedded YouTube videos
- **Masonry Layout**: Optimal image arrangement

### Contact
- **Form Design**: Clean, accessible form with proper validation
- **Map Integration**: Google Maps embed with organization location
- **Contact Info**: Well-organized address and social media links

## Images
- **Hero Images**: Large, high-quality banners showcasing cultural events, activities, and organizational moments
- **News Images**: Thumbnail images for articles (16:9 aspect ratio recommended)
- **Gallery Images**: Various cultural events, celebrations, and organizational activities
- **Publication Thumbnails**: PDF preview images or document icons
- All images should be optimized for web with lazy loading implementation

## Responsive Considerations
- Mobile-first approach with progressive enhancement
- Touch-friendly button sizes (minimum 44px)
- Readable font sizes across all devices
- Optimized image loading for different screen densities

## Accessibility & SEO
- High contrast ratios meeting WCAG guidelines
- Proper heading hierarchy (H1-H6)
- Alt text for all images
- Focus indicators for keyboard navigation
- Semantic HTML structure with proper meta tags