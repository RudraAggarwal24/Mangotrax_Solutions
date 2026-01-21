# Consolidated CSS and JavaScript Files

## Overview

All CSS and JavaScript files have been merged into two consolidated files for easier management and better performance:

- **`css/consolidated.css`** - Contains all CSS for all pages
- **`js/consolidated.js`** - Contains all JavaScript for all pages

## File Structure

### CSS File (`css/consolidated.css`)

The consolidated CSS file contains styles for all pages in the following order:

1. **BASE STYLES** (`css/style.css`)
   - Global styles, CSS variables, reset, layout components
   - Navigation, footer, buttons, modals
   - Common utilities and animations

2. **HOME PAGE** (`css/home.css`)
   - Hero section, services grid, industries section
   - Intelligence section, KPI section, CTA section

3. **ABOUT PAGE** (`css/about.css`)
   - Hero section, Mission/Vision cards
   - Who We Are section, Why Choose Us section
   - Intelligence application, How We Work timeline

4. **CONTACT PAGE** (`css/contact.css`)
   - Contact form styles
   - Form validation styles, multi-select dropdown
   - Business details section

5. **SERVICES PAGE** (`css/services.css`)
   - Services overview, service capabilities
   - Intelligence support section

6. **SERVICE PAGES** (Individual service pages)
   - Digital Marketing (`css/digital-marketing.css`)
   - Web Design (`css/web-design.css`)
   - App Development (`css/app-development.css`)
   - Software Development (`css/software-development.css`)
   - Event Management (`css/event-management.css`)

7. **INDUSTRY PAGES** (Individual industry pages)
   - Education (`css/education.css`)
   - SaaS (`css/saas.css`)
   - Healthcare (`css/healthcare.css`)
   - Retail (`css/retail.css`)
   - Manufacturing (`css/manufacturing.css`)
   - E-commerce (`css/ecommerce.css`)

8. **INTELLIGENT SOLUTIONS PAGE**
   - Main styles (`css/intelligent-solutions.css`)
   - Additional styles (`css/intelligent-solutions-additions.css`)

9. **INDUSTRIES PAGE** (`css/industries.css`)
   - Industries overview, industry cards

10. **BLOGS/INSIGHTS PAGE** (`css/blogs.css`)
    - Blog listing, filter, search functionality

11. **CASE STUDIES PAGE** (`css/casestudies.css`)
    - Case study listing, filters

12. **RESPONSIVE ENHANCEMENTS** (`css/responsive-enhancements.css`)
    - Mobile, tablet, desktop breakpoints
    - Touch device optimizations

### JavaScript File (`js/consolidated.js`)

The consolidated JavaScript file contains scripts for all pages in the following order:

1. **MAIN JAVASCRIPT** (`js/main.js`)
   - Global functionality: Navigation, modal, animations
   - WhatsApp button, number counter animations
   - Intersection observers, lazy loading
   - "Connect With Us" modal functionality

2. **CONTACT FORM PAGE** (`js/contact-form.js`)
   - Form validation, multi-select dropdown
   - Form submission handling

3. **CONTACT PAGE** (`js/contact.js`)
   - Contact form enhancements
   - Service selector functionality

4. **BLOGS PAGE** (`js/blogs.js`)
   - Filter functionality
   - Search functionality

5. **SHOWCASE PAGE** (`js/showcase.js`)
   - Filter functionality
   - Load more functionality

## How to Use

### Option 1: Use Consolidated Files (Recommended)

Replace all CSS and JS links in your HTML files with:

```html
<!-- In <head> section -->
<link rel="stylesheet" href="css/consolidated.css">

<!-- Before closing </body> tag -->
<script src="js/consolidated.js"></script>
```

### Option 2: Keep Individual Files

If you prefer to keep individual files for development, you can continue using them. The consolidated files are available as an alternative.

## Benefits

1. **Reduced HTTP Requests**: One CSS file and one JS file instead of multiple files
2. **Better Caching**: Browser caches one large file instead of many small files
3. **Easier Management**: All styles and scripts in one place
4. **Clear Organization**: Each section is clearly marked with comments
5. **Better Performance**: Faster page loads, especially on slower connections

## File Size

- `css/consolidated.css`: ~15,000+ lines
- `js/consolidated.js`: ~1,500+ lines

## Notes

- All page-specific sections are clearly marked with comments
- The `@import` statement for responsive-enhancements.css has been removed (it's now included directly)
- All functionality from individual files is preserved
- The consolidated files are production-ready

## Maintenance

When updating styles or scripts:

1. **For Development**: Edit individual CSS/JS files
2. **For Production**: Re-run the merge script to update consolidated files
3. **For Quick Fixes**: Edit consolidated files directly (remember to update individual files too)

## Page Coverage

All pages are covered:
- ✅ Home Page
- ✅ About Page
- ✅ Contact Page
- ✅ Services Page
- ✅ All 5 Service Pages (Digital Marketing, Web Design, App Development, Software Development, Event Management)
- ✅ All 6 Industry Pages (Education, SaaS, Healthcare, Retail, Manufacturing, E-commerce)
- ✅ Intelligent Solutions Page
- ✅ Industries Page
- ✅ Blogs/Insights Page
- ✅ Case Studies Page

No page is left out!
