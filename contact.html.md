# Contact Page - Direct Messaging Form

## Purpose
Direct contact form for inquiries, collaboration opportunities, and general communication.

## Form Integration

### Formspree Service
- **Platform**: Third-party form handling service
- **Endpoint**: https://formspree.io/f/mjvonvak
- **Method**: POST request for secure message delivery
- **Processing**: Server-side handling with email delivery

### Form Fields
1. **Name**: Required text input for sender identification
2. **Email**: Required email input with validation for response capability  
3. **Message**: Required textarea (5 rows) for detailed communication
4. **Submit Button**: Full-width green button (#4CAF50) with hover effects

## Design Features

### Visual Styling
- **Container**: Centered 600px max-width with dark theme (#222 background)
- **Form Elements**: Dark input styling (#444 background) with white text
- **Typography**: Clear labels with proper spacing and hierarchy
- **Button Design**: Prominent green submit button with hover state (#45a049)

### User Experience
- **Responsive Layout**: Mobile-first design with proper spacing
- **Accessibility**: Proper labeling and form structure
- **Validation**: HTML5 required attributes for essential fields
- **Feedback**: Visual hover states for interactive elements

### Technical Implementation
- **Input Styling**: Consistent dark theme across all form elements
- **Spacing**: Proper margin and padding for readability
- **Border Handling**: Borderless inputs with rounded corners
- **Typography**: Roboto font family matching site design

## Integration Benefits
- **No Backend Required**: Leverages Formspree for message processing
- **Email Delivery**: Messages sent directly to designated email address
- **Spam Protection**: Built-in filtering through Formspree service
- **Analytics**: Form submission tracking capabilities

This contact page provides a professional, accessible way for visitors to communicate directly while maintaining the site's design consistency and technical simplicity.