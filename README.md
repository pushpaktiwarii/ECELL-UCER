# E-Cell UCER Website

A modern, responsive website for E-Cell UCER inspired by IIT BHU's E-Cell website, featuring beautiful animations and interactive elements.

## 🚀 Features

- **Modern Design**: Clean, professional design with gradient backgrounds and modern typography
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Animations**: AOS (Animate On Scroll) library integration with custom animations
- **Interactive Elements**: Hover effects, button animations, and smooth transitions
- **Loading Screen**: Beautiful loading animation with spinner
- **Navigation**: Fixed navigation with smooth scrolling and mobile menu
- **Counter Animations**: Animated statistics counters
- **Parallax Effects**: Subtle parallax scrolling effects
- **Form Handling**: Contact form with validation and notifications
- **Progress Indicator**: Scroll progress bar at the top
- **Floating Action Button**: Scroll-to-top button
- **Particle Background**: Subtle floating particles for visual appeal

## 📁 File Structure

```
Ecell UCER 2/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 Customization Guide

### 1. Colors and Branding

The website uses a modern color scheme with gradients. You can customize the colors in `styles.css`:

```css
/* Primary Colors */
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--secondary-gradient: linear-gradient(45deg, #ffd89b, #19547b);
--accent-color: #667eea;
```

### 2. Content Updates

#### Update College Information
- **College Name**: Replace "UCER" with your college name throughout the files
- **Contact Information**: Update email, phone, and address in the contact section
- **Statistics**: Modify the numbers in the stats section to reflect your achievements

#### Update Team Information
Replace the placeholder team member information in `index.html`:

```html
<div class="team-member">
    <div class="member-image">
        <img src="path/to/actual/image.jpg" alt="Team Member">
    </div>
    <div class="member-info">
        <h3>Actual Name</h3>
        <p class="position">Actual Position</p>
        <div class="social-links">
            <a href="linkedin-url"><i class="fab fa-linkedin"></i></a>
            <a href="twitter-url"><i class="fab fa-twitter"></i></a>
            <a href="mailto:email"><i class="fas fa-envelope"></i></a>
        </div>
    </div>
</div>
```

#### Update Events
Modify the events section with your actual events:

```html
<div class="event-card">
    <div class="event-image">
        <div class="event-date">
            <span class="day">15</span>
            <span class="month">Dec</span>
        </div>
    </div>
    <div class="event-content">
        <h3>Your Event Name</h3>
        <p>Your event description</p>
        <div class="event-meta">
            <span><i class="fas fa-map-marker-alt"></i> Your Venue</span>
            <span><i class="fas fa-clock"></i> Your Time</span>
        </div>
        <button class="btn btn-primary">Register Now</button>
    </div>
</div>
```

### 3. Images and Media

#### Replace Placeholder Images
- Team member photos: Replace placeholder URLs with actual image paths
- Event images: Add actual event images
- Logo: Add your college logo

#### Recommended Image Sizes
- Team member photos: 300x300px
- Event images: 400x200px
- Logo: 200x80px

### 4. Social Media Links

Update social media links in the footer and team sections:

```html
<div class="social-links">
    <a href="your-facebook-url"><i class="fab fa-facebook"></i></a>
    <a href="your-twitter-url"><i class="fab fa-twitter"></i></a>
    <a href="your-linkedin-url"><i class="fab fa-linkedin"></i></a>
    <a href="your-instagram-url"><i class="fab fa-instagram"></i></a>
</div>
```

## 🛠️ Technical Features

### Animations Included
- **Floating Elements**: Animated icons in the hero section
- **Counter Animations**: Statistics that count up when scrolled into view
- **Parallax Scrolling**: Subtle background movement effects
- **Hover Effects**: Cards and buttons with smooth hover animations
- **Loading Screen**: Spinner animation on page load
- **Scroll Progress**: Progress bar showing scroll position
- **Text Reveal**: Text elements fade in as you scroll

### Interactive Elements
- **Mobile Menu**: Hamburger menu for mobile devices
- **Smooth Scrolling**: Navigation links scroll smoothly to sections
- **Form Validation**: Contact form with input validation
- **Notifications**: Success/error messages for form submissions
- **Ripple Effects**: Button click animations
- **Scroll-to-Top**: Floating action button

## 📱 Responsive Design

The website is fully responsive and includes:
- Mobile-first design approach
- Breakpoints for tablets and desktops
- Touch-friendly navigation
- Optimized images for different screen sizes

## 🚀 Getting Started

1. **Download/Clone** the project files
2. **Customize** the content as per your college's information
3. **Replace** placeholder images with actual photos
4. **Update** contact information and social media links
5. **Test** the website on different devices
6. **Deploy** to your web server

## 🌐 Deployment

### Local Testing
Simply open `index.html` in a web browser to view the website locally.

### Web Server Deployment
Upload all files to your web server:
- `index.html`
- `styles.css`
- `script.js`
- Any images and media files

### Recommended Hosting Platforms
- GitHub Pages (free)
- Netlify (free tier available)
- Vercel (free tier available)
- Traditional web hosting

## 📞 Support

If you need help customizing the website:
1. Check this README for common customization tasks
2. Review the code comments for specific functionality
3. Test changes locally before deploying

## 🎯 Performance Tips

- Optimize images before uploading (use WebP format when possible)
- Minimize CSS and JavaScript files for production
- Enable gzip compression on your web server
- Use a CDN for faster loading times

## 📄 License

This website template is created for E-Cell UCER. Feel free to modify and use it for your organization.

---

**Created with ❤️ for E-Cell UCER**

*Inspired by IIT BHU's E-Cell website with enhanced animations and modern design* 