# Homepage - Full-Screen 6-Card Grid Navigation

## Design Overview
Complete redesign from traditional homepage to a modern 6-card grid interface inspired by Jonathan Patterson's aesthetic. Features a full-screen viewport-covering navigation system with glassmorphism effects and mobile-responsive design.

## Page Structure
- **Full-Screen Grid**: 3x2 card layout covering entire viewport (100vw × 100vh)
- **Hidden Navigation**: Traditional navbar completely hidden (display: none)
- **Profile Card**: Special top-left card with personal information
- **Navigation Cards**: Projects, Research, About, Contact cards with hover effects
- **Mobile Contact Section**: Additional mobile-only contact links at bottom

## Card Layout

### Profile Card (Top-Left)
- **Profile Header**: Photo, name, and title
- **Quote Section**: Voltaire quote with centered layout
- **Location**: Philadelphia, PA with gradient divider
- **Styling**: Left-aligned text, flexbox layout

### Navigation Cards
1. **Projects Card** - Commercial applications and iOS development
2. **Research Card** - Academic work and publications  
3. **About Card** - Personal background and journey
4. **Contact Card** - Get in touch information

Each card features:
- **Default State**: Icon, title, and description visible
- **Hover State**: Large centered icon with title overlay
- **Glassmorphism**: Semi-transparent background with backdrop blur
- **Animations**: Smooth transitions and hover effects

## Mobile Responsiveness

### Mobile Layout (≤768px)
- **Grid**: Single column vertical stacking
- **Scrolling**: Enabled with position: static override
- **Card Size**: Minimum 200px height with flexible content
- **Profile Card**: Smaller photo and text sizes
- **Contact Section**: Mobile-only "Other Ways to Connect" with horizontal links

### Tablet Layout (640px-1024px)
- **Grid**: 2x3 layout maintaining card structure
- **Responsive**: Maintains hover effects and animations

## Mobile-Only Contact Section
- **Visibility**: Hidden on desktop, shown on mobile only
- **Links**: Email, LinkedIn, GitHub in horizontal flex layout
- **Styling**: Glassmorphism background matching design system
- **Position**: Bottom of navigation grid on mobile

## Technical Implementation

### CSS Architecture
- **CSS Grid**: 3x2 layout with full viewport coverage
- **Glassmorphism**: `backdrop-filter: blur(10px)` effects
- **Color Scheme**: #5FF280 green accent, #0a0a0a dark background
- **Typography**: Inter font family for modern appearance
- **Animations**: fadeInUp keyframes with staggered delays

### JavaScript Features
- **Scroll Handling**: Disabled on desktop, enabled on mobile
- **Animation Triggers**: Staggered card appearance
- **Mobile Menu**: Standard toggle functionality (though navbar hidden)

### Performance Optimizations
- **Font Loading**: Google Fonts with display=swap
- **Image Optimization**: WebP format profile picture
- **CSS-in-HTML**: Inline styles for faster loading
- **Minimal Dependencies**: Font Awesome icons only

## Hover Effects
- **Icon Scale**: Transform scale(1) on hover
- **Background**: Enhanced glassmorphism opacity
- **Border**: Green accent border color
- **Shadow**: Elevated shadow for depth
- **Content**: Hide default content, show large icon overlay

## Design Philosophy
Inspired by Jonathan Patterson's modern, clean aesthetic with emphasis on:
- **Minimalism**: Clean, uncluttered interface
- **Glassmorphism**: Modern semi-transparent design trend
- **Mobile-First**: Responsive design prioritizing mobile experience
- **Accessibility**: High contrast ratios and readable typography
- **Performance**: Fast loading with optimized assets