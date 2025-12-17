// ============================================
// Main JavaScript for Mangotrax Solutions
// ============================================

// DOM Elements - Initialize after DOM is ready
let loader, header, navToggle, navMenu, navLinks, consultationBtn, auditBtn, footerAuditBtn, modal, modalClose, consultationForm;

function initDOMElements() {
    loader = document.getElementById('loader');
    header = document.getElementById('header');
    navToggle = document.getElementById('nav-toggle');
    navMenu = document.getElementById('nav-menu');
    navLinks = document.querySelectorAll('.nav-link');
    consultationBtn = document.getElementById('consultation-btn');
    auditBtn = document.getElementById('audit-btn');
    footerAuditBtn = document.getElementById('footer-audit-btn');
    modal = document.getElementById('consultation-modal');
    modalClose = document.querySelector('.modal-close');
    consultationForm = document.getElementById('consultation-form');
}

// Initialize immediately (script is at end of body, so DOM should be ready)
initDOMElements();

// Also initialize on DOMContentLoaded as fallback
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDOMElements);
}

// ============================================
// Loading Screen
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
});

// ============================================
// Header Scroll Effect - Fixed Header
// ============================================
// Header is fixed at the top - logo, navigation menu, and buttons are always visible
// Clean and professional design with smooth user experience
if (header) {
    // Optional: Add subtle shadow on scroll for better visual separation
    window.addEventListener("scroll", () => {
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.12)";
            } else {
                header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
            }
        }
    }, { passive: true });
}

// ============================================
// Mobile Menu Toggle
// ============================================
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ============================================
// Modal Functionality
// ============================================
function openModal() {
    if (modal) {
        modal.classList.add('active');
        // Hide scrollbars on body and html
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        // Add entrance animation
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.animation = 'slideDown 0.4s ease';
        }
        // Ensure modal is visible
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
    } else {
        console.error('Modal element not found');
    }
}

function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        // Restore scrollbars
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }
}

// Open modal buttons
if (consultationBtn) {
    consultationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

if (auditBtn) {
    auditBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

// Callback button functionality removed

// About page callback button
const callbackBtnAbout = document.getElementById('callback-btn-about');
if (callbackBtnAbout) {
    callbackBtnAbout.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

// Services page callback button
const callbackBtnServices = document.getElementById('callback-btn-services');
if (callbackBtnServices) {
    callbackBtnServices.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

if (footerAuditBtn) {
    footerAuditBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking outside
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});

// Form submission
if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(consultationForm);
        const data = Object.fromEntries(formData);
        
        // Show success message (you can replace this with actual form submission)
        alert('Thank you! We will contact you soon.');
        
        // Reset form
        consultationForm.reset();
        
        // Close modal
        closeModal();
    });
}

// ============================================
// Smooth Scroll for Anchor Links (only for same-page anchors)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or external link
        if (href === '#' || href === '' || this.hasAttribute('target')) {
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Active Navigation Link on Scroll
// ============================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ============================================
// Enhanced Intersection Observer for Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.classList.add('animated');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.stat-card, .service-card, .testimonial-card, .blog-card, .case-card, .client-logo').forEach(el => {
    if (!el.classList.contains('animated')) {
        observer.observe(el);
    }
});

// Parallax effect for hero section (removed - text no longer moves on scroll)
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         const heroContent = hero.querySelector('.hero-content');
//         if (heroContent && scrolled < window.innerHeight) {
//             heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
//             heroContent.style.opacity = 1;
//         }
//     }
//     
//     // Parallax for hero circles
//     const circles = document.querySelectorAll('.hero-circle');
//     circles.forEach((circle, index) => {
//         const speed = 0.3 + (index * 0.1);
//         circle.style.transform = `translateY(${scrolled * speed}px)`;
//     });
// });

// ============================================
// Testimonials Carousel (Disabled - Now using grid layout)
// ============================================
const testimonialsSlider = document.querySelector('#testimonials-slider');
const testimonialsPrev = document.querySelector('#testimonials-prev');
const testimonialsNext = document.querySelector('#testimonials-next');
const testimonialsDots = document.querySelector('#testimonials-dots');

// Carousel functionality disabled - testimonials now display in grid layout
if (false && testimonialsSlider) {
    let currentIndex = 0;
    const cards = testimonialsSlider.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    
    // Calculate cards per view based on screen size
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    
    let cardsPerView = getCardsPerView();
    let totalSlides = Math.ceil(totalCards / cardsPerView);
    
    // Create dots
    if (testimonialsDots && totalSlides > 1) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'testimonials-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            testimonialsDots.appendChild(dot);
        }
    }
    
    function updateCarousel() {
        cardsPerView = getCardsPerView();
        totalSlides = Math.ceil(totalCards / cardsPerView);
        const cardWidth = 100 / cardsPerView;
        const offset = -currentIndex * cardWidth;
        testimonialsSlider.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        if (testimonialsDots) {
            const dots = testimonialsDots.querySelectorAll('.testimonials-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Update button states
        if (testimonialsPrev) {
            testimonialsPrev.disabled = currentIndex === 0;
        }
        if (testimonialsNext) {
            testimonialsNext.disabled = currentIndex >= totalSlides - 1;
        }
    }
    
    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentIndex = index;
            updateCarousel();
        }
    }
    
    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    if (testimonialsNext) {
        testimonialsNext.addEventListener('click', nextSlide);
    }
    
    if (testimonialsPrev) {
        testimonialsPrev.addEventListener('click', prevSlide);
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                currentIndex = 0;
                updateCarousel();
            }
        }, 250);
    });
    
    // Initialize
    updateCarousel();
    
    // Auto-play (optional)
    let autoPlayInterval;
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentIndex < totalSlides - 1) {
                nextSlide();
            } else {
                currentIndex = 0;
                updateCarousel();
            }
        }, 5000);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Start auto-play
    if (totalSlides > 1) {
        startAutoPlay();
        
        // Pause on hover
        testimonialsSlider.addEventListener('mouseenter', stopAutoPlay);
        testimonialsSlider.addEventListener('mouseleave', startAutoPlay);
    }
}

// ============================================
// Enhanced Service Card Hover Effects
// ============================================
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02) rotateX(0deg)';
        const overlay = this.querySelector('.service-overlay');
        if (overlay) {
            overlay.style.opacity = '1';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        const overlay = this.querySelector('.service-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
        }
    });
    
    // Add tilt effect on mouse move
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `translateY(-12px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// ============================================
// Button Click Animations
// ============================================
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
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

// ============================================
// Form Validation (if forms are added later)
// ============================================
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log('Form submitted');
    });
});

// ============================================
// Lazy Loading Images
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// ============================================
// WhatsApp Button
// ============================================
const whatsappBtn = document.createElement('a');
whatsappBtn.href = 'https://wa.link/v4pl84';
whatsappBtn.target = '_blank';
whatsappBtn.rel = 'noopener noreferrer';
whatsappBtn.className = 'whatsapp-btn';
whatsappBtn.setAttribute('aria-label', 'Chat on WhatsApp');
whatsappBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
`;

// Append to documentElement (html) instead of body to avoid transform issues
document.documentElement.appendChild(whatsappBtn);

// ============================================
// Number Counter Animation for Stats
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isMoney = element.textContent.includes('$') || element.textContent.includes('Million');
    const isAboutPage = element.classList.contains('about-stat-number');
    const originalText = element.textContent;
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            if (isMoney) {
                element.textContent = '$' + target + ' Million';
            } else if (isAboutPage) {
                element.textContent = target + '+';
            } else {
                element.textContent = Math.floor(target) + '+';
            }
            clearInterval(timer);
        } else {
            if (isMoney) {
                element.textContent = '$' + Math.floor(start) + ' Million';
            } else if (isAboutPage) {
                element.textContent = Math.floor(start) + '+';
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }
    }, 16);
}

// Observe stat numbers (home page)
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            let target = parseInt(text.replace(/\D/g, ''));
            if (text.includes('Million')) {
                target = 60; // $60 Million
            }
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Observe About page stat numbers
const aboutStatNumbers = document.querySelectorAll('.about-stat-number');
const aboutStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const target = parseInt(text.replace(/\D/g, ''));
            animateCounter(entry.target, target);
            aboutStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

aboutStatNumbers.forEach(stat => {
    aboutStatsObserver.observe(stat);
});

// ============================================
// Stagger Animation for Cards
// ============================================
function staggerAnimation(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animationDelay = `${index * delay}ms`;
            el.classList.add('animate-in');
        }, index * delay);
    });
}

// ============================================
// Text Reveal Animation
// ============================================
function revealText() {
    const textElements = document.querySelectorAll('.section-title, .section-description');
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease forwards';
                textObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    textElements.forEach(el => {
        el.style.opacity = '0';
        textObserver.observe(el);
    });
}

revealText();

// ============================================
// Cursor Trail Effect (Optional - can be disabled)
// ============================================
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    // Create a subtle cursor trail effect
    if (Math.random() > 0.7) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            opacity: 0.5;
            animation: fadeOut 0.5s ease forwards;
        `;
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 500);
    }
});

// ============================================
// Console Welcome Message
// ============================================
console.log('%c Mangotrax Solutions ', 'background: #ff6900; color: #fff; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Igniting Ideas, Inspiring Solutions ', 'color: #0693e3; font-size: 14px; font-weight: bold;');

