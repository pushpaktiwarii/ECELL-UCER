// Enhanced AOS (Animate On Scroll) with Mobile Optimization
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
    disable: window.innerWidth < 768, // Disable on mobile for better performance
    mobile: false
});

// Mobile-specific optimizations
const isMobile = window.innerWidth < 768;
const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

// Optimize animations for mobile
if (isMobile) {
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
    document.documentElement.style.setProperty('--transition-duration', '0.2s');
} else {
    document.documentElement.style.setProperty('--animation-duration', '0.8s');
    document.documentElement.style.setProperty('--transition-duration', '0.3s');
}

// Fade in sections on scroll
function fadeInSections() {
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.initiative-snapshot-card, .event-highlight-card, .team-preview-member');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize fade effects
document.addEventListener('DOMContentLoaded', function() {
    fadeInSections();
    
    // Add staggered animation to cards
    const cards = document.querySelectorAll('.initiative-snapshot-card, .event-highlight-card, .team-preview-member');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Enhanced Loading Screen with Performance Optimization
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
    
    // Optimize images for mobile
    if (isMobile) {
        optimizeImagesForMobile();
    }
    
    // Initialize lazy loading
    initializeLazyLoading();
});

// Optimize images for mobile devices
function optimizeImagesForMobile() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.dataset.mobileSrc) {
            img.src = img.dataset.mobileSrc;
        }
    });
}

// Lazy loading for better performance
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Enhanced Sticky Navbar with Responsive Handling
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });

// Responsive breakpoint handling
window.addEventListener('resize', debounce(() => {
    const newIsMobile = window.innerWidth < 768;
    const newIsTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // Update mobile state
    if (newIsMobile !== isMobile) {
        location.reload(); // Reload for better mobile/desktop experience
    }
}, 250));

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced Mobile Menu Toggle with Better UX
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        // Add focus trap for accessibility
        const firstLink = navMenu.querySelector('.nav-link');
        if (firstLink) firstLink.focus();
    } else {
        document.body.style.overflow = '';
    }
});

// Enhanced dropdown functionality for mobile
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        if (isMobile) {
            e.preventDefault();
            const dropdown = toggle.closest('.dropdown');
            dropdown.classList.toggle('active');
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Enhanced touch and click handling
let touchStartY = 0;
let touchEndY = 0;

// Touch gesture for mobile menu
document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartY - touchEndY;
    
    // Swipe up to close mobile menu
    if (swipeDistance > swipeThreshold && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Event Modal Functionality
const eventModal = document.getElementById('eventModal');
const modalClose = document.getElementById('modalClose');
const knowMoreBtns = document.querySelectorAll('.know-more-btn');

// Open modal when "Know More" button is clicked
knowMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const eventType = btn.getAttribute('data-event');
        
        // Show the appropriate modal content
        const modalContent = document.getElementById(`${eventType}-content`);
        if (modalContent) {
            // Hide all modal contents first
            document.querySelectorAll('.event-modal-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // Show the specific content
            modalContent.style.display = 'block';
            
            // Show modal
            eventModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Handle iframe loading for registration form
            handleIframeLoad();
        }
    });
});

// Handle iframe loading for Google Forms
function handleIframeLoad() {
    const iframe = document.querySelector('.registration-form iframe');
    const fallback = document.getElementById('form-fallback');
    
    if (iframe && fallback) {
        // Set a timeout to show fallback if iframe doesn't load within 3 seconds
        setTimeout(() => {
            if (iframe.contentWindow && iframe.contentWindow.location.href) {
                // Iframe loaded successfully
                iframe.style.display = 'block';
                fallback.style.display = 'none';
            } else {
                // Iframe failed to load, show fallback
                iframe.style.display = 'none';
                fallback.style.display = 'block';
            }
        }, 3000);
    }
}

// Close modal when close button is clicked
modalClose.addEventListener('click', () => {
    eventModal.classList.remove('show');
    document.body.style.overflow = '';
});

// Close modal when clicking on overlay
eventModal.addEventListener('click', (e) => {
    if (e.target === eventModal || e.target.classList.contains('modal-overlay')) {
        eventModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && eventModal.classList.contains('show')) {
        eventModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Smooth Scrolling for Navigation Links with Mobile Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = window.innerWidth <= 768 ? 80 : 100;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Touch Optimizations
if ('ontouchstart' in window) {
    // Add touch feedback to buttons
    document.querySelectorAll('.btn, .nav-link, .social-links a').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Optimize scroll performance on mobile
    let ticking = false;
    function updateScroll() {
        // Mobile-specific scroll optimizations
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }, { passive: true });
}

// Counter Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            if (!counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(counter => {
    observer.observe(counter);
});

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
};

// Parallax Effect for Hero Elements (Optimized)
const floatingElements = document.querySelectorAll('.floating-element');
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;

    floatingElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        element.style.transform = `translateY(${rate * speed}px)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

// Continuous Typing Animation for Hero Subtitle
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const texts = [
        'Start Small',
        'Dream Big',
        'Act Now!'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const typeWriter = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = 100;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeWriter, typeSpeed);
    };
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

// Form Handling Functions
function showSuccessMessage(elementId, message) {
    const successElement = document.getElementById(elementId);
    if (successElement) {
        successElement.style.display = 'flex';
        successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 5000);
    }
}

function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('btn-loading');
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    } else {
        button.classList.remove('btn-loading');
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
}

// Enhanced Toast Success Message Function
function showToastSuccess(message, duration = 2000) {
    // Remove any existing toast messages
    const existingToast = document.querySelector('.toast-success-message');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-success-message';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span class="message-text">${message}</span>
        <button class="close-btn" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to body
    document.body.appendChild(toast);
    
    // Show animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Swipe functionality
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    // Touch events for mobile
    toast.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        toast.style.cursor = 'grabbing';
    });
    
    toast.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        
        // Limit the drag distance
        if (Math.abs(diffX) > 50) {
            toast.style.transform = `translateX(${diffX}px)`;
            toast.style.opacity = Math.max(0, 1 - Math.abs(diffX) / 200);
        }
    });
    
    toast.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        toast.style.cursor = 'grab';
        
        const diffX = currentX - startX;
        
        if (Math.abs(diffX) > 100) {
            // Swipe threshold reached - hide toast
            if (diffX > 0) {
                toast.classList.add('swipe-right');
            } else {
                toast.classList.add('swipe-left');
            }
            
            setTimeout(() => {
                toast.remove();
            }, 300);
        } else {
            // Reset position
            toast.style.transform = '';
            toast.style.opacity = '';
        }
    });
    
    // Mouse events for desktop
    toast.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        toast.style.cursor = 'grabbing';
    });
    
    toast.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
        const diffX = currentX - startX;
        
        if (Math.abs(diffX) > 50) {
            toast.style.transform = `translateX(${diffX}px)`;
            toast.style.opacity = Math.max(0, 1 - Math.abs(diffX) / 200);
        }
    });
    
    toast.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        toast.style.cursor = 'grab';
        
        const diffX = currentX - startX;
        
        if (Math.abs(diffX) > 100) {
            if (diffX > 0) {
                toast.classList.add('swipe-right');
            } else {
                toast.classList.add('swipe-left');
            }
            
            setTimeout(() => {
                toast.remove();
            }, 300);
        } else {
            toast.style.transform = '';
            toast.style.opacity = '';
        }
    });
    
    // Auto-hide after duration
    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.add('hide');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }
    }, duration);
    
    return toast;
}

// Contact Form Handling with AJAX to prevent page redirect
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(this);
        
        // Submit form using fetch
        fetch(this.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Show enhanced toast success message
                showToastSuccess('Thank you! Your message has been sent successfully.', 2000);
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Show error message or fallback
            alert('There was an error sending your message. Please try again.');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Newsletter Form Handling with AJAX to prevent page redirect
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(this);
        
        // Submit form using fetch
        fetch(this.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Show enhanced toast success message
                showToastSuccess('Thank you! You\'ve been subscribed to our newsletter.', 2000);
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Show error message or fallback
            alert('There was an error subscribing to the newsletter. Please try again.');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}



// Enhanced Contact Form Submission (fallback for any forms without FormSubmit)
const existingContactForm = document.querySelector('.contact-form form');
if (existingContactForm && !existingContactForm.id) {
    existingContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        const submitBtn = existingContactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#28a745';
        
        // Reset form
        existingContactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// Enhanced Ripple Effect for Buttons with Mobile Support
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        // Handle both mouse and touch events
        const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : rect.width / 2);
        const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : rect.height / 2);
        
        const x = clientX - rect.left - size / 2;
        const y = clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});



// Enhanced Card Hover Effects with Mobile Support
document.querySelectorAll('.process-card, .initiative-card, .event-card, .team-member').forEach(card => {
    // Only add hover effects on devices that support hover
    if (window.matchMedia('(hover: hover)').matches) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
    
    // Add touch feedback for mobile
    if ('ontouchstart' in window) {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    }
});

// Text Reveal Animation
const textElements = document.querySelectorAll('h1, h2, h3, p');
const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

textElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    textObserver.observe(element);
});



// Particle Background Effect (Optimized for Mobile)
const createParticle = () => {
    // Reduce particles on mobile for better performance
    if (window.innerWidth <= 768 && Math.random() > 0.3) {
        return;
    }
    
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
    `;
    
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translateY(0px)', opacity: 1 },
        { transform: `translateY(-${window.innerHeight}px)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'linear'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
};

// Create particles at intervals (reduced frequency on mobile)
const particleInterval = window.innerWidth <= 768 ? 4000 : 2000;
setInterval(createParticle, particleInterval);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-based animations can be added here
}, 16);

window.addEventListener('scroll', throttledScrollHandler, { passive: true });

// Mobile-specific optimizations
if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
    
    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
    
    // Add mobile-specific touch gestures
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            // Handle swipe gestures if needed
        }
    }
}



// News Banner Functionality
function closeBanner() {
    const banner = document.getElementById('newsBanner');
    if (banner) {
        banner.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => {
            banner.style.display = 'none';
        }, 500);
        
        // Store in localStorage so it doesn't show again in this session
        localStorage.setItem('bannerClosed', 'true');
    }
}

// Banner visibility control - ONLY on home page with scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    const isHomePage = currentPage === '/' || currentPage === '/index.html' || currentPage === '';
    
    console.log('Current page:', currentPage);
    console.log('Is home page:', isHomePage);
    
    // ONLY add home-page class if it's actually the home page
    if (isHomePage) {
        document.body.classList.add('home-page');
        console.log('Added home-page class to body');
        
        // Only handle banner on home page
        const banner = document.getElementById('newsBanner');
        if (banner) {
            if (localStorage.getItem('bannerClosed') === 'true') {
                banner.style.display = 'none';
                console.log('Banner hidden - user closed it');
            } else {
                banner.style.display = 'block';
                console.log('Banner shown - home page and not closed');
                
                // Add scroll-based visibility
                let lastScrollTop = 0;
                const scrollThreshold = 100; // Hide after 100px scroll
                
                window.addEventListener('scroll', function() {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    if (scrollTop > scrollThreshold) {
                        // Hide banner when scrolled down
                        banner.style.opacity = '0';
                        banner.style.transform = 'translateX(100%)';
                        banner.style.pointerEvents = 'none';
                    } else {
                        // Show banner when at top
                        banner.style.opacity = '1';
                        banner.style.transform = 'translateX(0)';
                        banner.style.pointerEvents = 'auto';
                    }
                    
                    lastScrollTop = scrollTop;
                }, { passive: true });
            }
        }
    } else {
        console.log('Not home page - banner will be hidden by CSS');
        // Ensure banner is hidden on non-home pages
        const banner = document.getElementById('newsBanner');
        if (banner) {
            banner.style.display = 'none';
        }
    }
    
    // Add click functionality to scroll arrow
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Add CSS for ripple effect and animations
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .news-item {
        animation-fill-mode: both;
    }
`;
document.head.appendChild(style);

// Volunteer Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const volunteerForm = document.getElementById('volunteerForm');
    const volunteerSuccessMessage = document.getElementById('volunteerSuccessMessage');
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = volunteerForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Set loading state
            setButtonLoading(submitButton, true);
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Hide form and show success message
                volunteerForm.style.display = 'none';
                volunteerSuccessMessage.style.display = 'block';
                
                // Reset button
                setButtonLoading(submitButton, false);
                submitButton.innerHTML = originalText;
                
                // Scroll to success message
                volunteerSuccessMessage.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Reset form after showing success message
                setTimeout(() => {
                    volunteerForm.reset();
                    volunteerForm.style.display = 'block';
                    volunteerSuccessMessage.style.display = 'none';
                }, 5000);
                
            }, 2000);
        });
    }
});

// Partner Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const partnerForm = document.getElementById('partnerForm');
    const partnerSuccessMessage = document.getElementById('partnerSuccessMessage');
    
    if (partnerForm) {
        partnerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = partnerForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Set loading state
            setButtonLoading(submitButton, true);
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Hide form and show success message
                partnerForm.style.display = 'none';
                partnerSuccessMessage.style.display = 'block';
                
                // Reset button
                setButtonLoading(submitButton, false);
                submitButton.innerHTML = originalText;
                
                // Scroll to success message
                partnerSuccessMessage.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Reset form after showing success message
                setTimeout(() => {
                    partnerForm.reset();
                    partnerForm.style.display = 'block';
                    partnerSuccessMessage.style.display = 'none';
                }, 5000);
                
            }, 2000);
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Image Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const imagePopup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    const imagePopupClose = document.getElementById('imagePopupClose');
    const galleryImages = document.querySelectorAll('.picture-item img');
    
    // Open popup when clicking on gallery images
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            popupImage.src = this.src;
            popupImage.alt = this.alt;
            imagePopup.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });
    });
    
    // Close popup when clicking close button
    imagePopupClose.addEventListener('click', function() {
        imagePopup.classList.remove('show');
        document.body.style.overflow = ''; // Restore background scroll
    });
    
    // Close popup when clicking overlay
    imagePopup.addEventListener('click', function(e) {
        if (e.target === imagePopup || e.target.classList.contains('image-popup-overlay')) {
            imagePopup.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imagePopup.classList.contains('show')) {
            imagePopup.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
});