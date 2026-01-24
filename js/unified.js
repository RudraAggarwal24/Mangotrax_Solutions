// ============================================
// CONSOLIDATED JAVASCRIPT FILE
// Mangotrax Solutions - All Pages
// ============================================
// This file contains all JavaScript for the entire website.
// Each section is clearly marked with page-specific comments.
// ============================================

// ============================================
// MAIN JAVASCRIPT - Global functionality: Navigation, Modal, Animations, WhatsApp Button
// File: js/main.js
// ============================================

// ============================================
// Main JavaScript for Mangotrax Solutions
// ============================================

// DOM Elements - Initialize after DOM is ready
let loader, header, navToggle, navMenu, navLinks, consultationBtn, auditBtn, modal, modalClose, consultationForm;

function initDOMElements() {
    loader = document.getElementById('loader');
    header = document.getElementById('header');
    navToggle = document.getElementById('nav-toggle');
    navMenu = document.getElementById('nav-menu');
    navLinks = document.querySelectorAll('.nav-link');
    consultationBtn = document.getElementById('consultation-btn');
    auditBtn = document.getElementById('audit-btn');
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
// Mobile Menu Toggle (robust, locks scroll)
// ============================================
const openNav = () => {
    if (!navMenu || !navToggle) return;
    navMenu.classList.add('active');
    navToggle.classList.add('active');
    document.body.classList.add('nav-open');
    navToggle.setAttribute('aria-expanded', 'true');
};

const closeNav = () => {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
};

if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navMenu.classList.contains('active')) {
            closeNav();
        } else {
            openNav();
        }
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            closeNav();
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
        if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeNav();
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
document.querySelectorAll('.stat-card, .service-card, .testimonial-card, .blog-card, .case-card, .client-logo, .intelligence-block, .industry-card, .kpi-card, .why-card, .who-point, .mission-card, .vision-card, .process-step, .engagement-step, .capability-item, .use-case-card, .engagement-step-services, .why-services-card, .case-study-item, .structure-item, .industry-badge, .why-case-card, .engagement-option, .detail-item, .next-step, .category-item, .featured-item, .insight-card, .usage-point, .pillar-item, .applied-item, .practice-item, .benefit-item, .industry-item, .adapt-principle, .capability-industry').forEach(el => {
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
// Button Click Animations - REMOVED
// ============================================
// Button animations removed per user request

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
whatsappBtn.href = 'https://wa.link/o1cjpc';
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

(function () {
  const tab = document.getElementById("coffeeTab");
  const dialog = document.getElementById("coffeeDialog");
  const close = document.getElementById("cdClose");
  const quoteForm = document.getElementById("quote-form");

  if (tab && dialog) {
    /* 🔥 MOVE TO <html> TO BYPASS BODY TRANSFORMS */
    if (tab.parentNode !== document.documentElement) {
      document.documentElement.appendChild(tab);
    }
    if (dialog.parentNode !== document.documentElement) {
      document.documentElement.appendChild(dialog);
    }

    // Open modal
    tab.onclick = () => {
      dialog.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    // Close modal
    if (close) {
      close.onclick = () => {
        dialog.classList.remove("active");
        document.body.style.overflow = "";
      };
    }

    // Close on backdrop click (removed - no backdrop)

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && dialog.classList.contains("active")) {
        dialog.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Form submission
    if (quoteForm) {
      quoteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(quoteForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        alert("Thank you! We will contact you soon.");
        
        // Reset form
        quoteForm.reset();
        
        // Close modal
        dialog.classList.remove("active");
        document.body.style.overflow = "";
      });
    }
  }
})();


// ============================================
// CONTACT FORM PAGE - Form validation, multi-select dropdown, form submission
// File: js/contact-form.js
// ============================================

// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    // ============================================
    // Multi-Select Dropdown Functionality
    // ============================================
    const servicesDropdown = document.getElementById('servicesDropdown');
    const servicesTrigger = document.getElementById('servicesTrigger');
    const servicesPanel = document.getElementById('servicesPanel');
    const serviceCheckboxes = form.querySelectorAll('.service-checkbox');
    const placeholder = servicesTrigger.querySelector('.multi-select-placeholder');
    const valueDisplay = servicesTrigger.querySelector('.multi-select-value');

    if (servicesDropdown && servicesTrigger && servicesPanel) {
        // Toggle dropdown
        servicesTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = servicesPanel.classList.contains('open');
            
            if (isOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        });

        // Handle checkbox changes
        serviceCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateDropdownDisplay();
                updateDropdownValidation();
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!servicesDropdown.contains(e.target)) {
                closeDropdown();
            }
        });

        // Keyboard accessibility
        servicesTrigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isOpen = servicesPanel.classList.contains('open');
                if (isOpen) {
                    closeDropdown();
                } else {
                    openDropdown();
                }
            } else if (e.key === 'Escape') {
                closeDropdown();
            }
        });

        // Handle keyboard navigation in dropdown
        serviceCheckboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % serviceCheckboxes.length;
                    serviceCheckboxes[nextIndex].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = (index - 1 + serviceCheckboxes.length) % serviceCheckboxes.length;
                    serviceCheckboxes[prevIndex].focus();
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    closeDropdown();
                    servicesTrigger.focus();
                }
            });
        });

        function openDropdown() {
            servicesPanel.classList.add('open');
            servicesTrigger.setAttribute('aria-expanded', 'true');
        }

        function closeDropdown() {
            servicesPanel.classList.remove('open');
            servicesTrigger.setAttribute('aria-expanded', 'false');
        }

        function updateDropdownDisplay() {
            const selected = Array.from(serviceCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => {
                    const label = cb.closest('.multi-select-option').querySelector('span').textContent;
                    return label;
                });

            if (selected.length === 0) {
                placeholder.style.display = 'block';
                valueDisplay.style.display = 'none';
            } else if (selected.length === 1) {
                placeholder.style.display = 'none';
                valueDisplay.textContent = selected[0];
                valueDisplay.style.display = 'block';
            } else {
                placeholder.style.display = 'none';
                // Show count or truncated list
                const totalLength = selected.join(', ').length;
                if (totalLength > 50) {
                    valueDisplay.textContent = `${selected.length} services selected`;
                } else {
                    valueDisplay.textContent = selected.join(', ');
                }
                valueDisplay.style.display = 'block';
            }
        }

        function updateDropdownValidation() {
            const formGroup = servicesDropdown.closest('.form-group');
            const validation = validateCheckboxGroup('services');
            
            if (validation.valid) {
                clearError(formGroup);
            } else {
                // Don't show error immediately, wait for form submission or blur
            }
        }

        // Initialize display
        updateDropdownDisplay();
    }

    // Form validation functions
    function validateName(input) {
        const value = input.value.trim();
        const nameRegex = /^[a-zA-Z\s'-]+$/;
        
        if (!value) {
            return { valid: false, message: input.dataset.errorRequired };
        }
        if (!nameRegex.test(value)) {
            return { valid: false, message: input.dataset.errorInvalid };
        }
        return { valid: true };
    }

    function validateEmail(input) {
        const value = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const freeEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
        
        if (!value) {
            return { valid: false, message: input.dataset.errorRequired };
        }
        if (!emailRegex.test(value)) {
            return { valid: false, message: input.dataset.errorInvalid };
        }
        
        // Optional: Check for business email
        const domain = value.split('@')[1];
        if (freeEmailDomains.includes(domain)) {
            return { valid: true, warning: input.dataset.errorBusiness };
        }
        
        return { valid: true };
    }

    function validatePhone(input) {
        const value = input.value.trim();
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        
        if (!value) {
            return { valid: false, message: input.dataset.errorRequired };
        }
        
        // Remove all non-digit characters for length check
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length < 10 || digitsOnly.length > 15) {
            return { valid: false, message: input.dataset.errorInvalid };
        }
        
        return { valid: true };
    }

    function validateRequired(input) {
        const value = input.value.trim();
        
        if (!value) {
            return { valid: false, message: input.dataset.errorRequired };
        }
        return { valid: true };
    }

    function validateMinLength(input) {
        const value = input.value.trim();
        const minLength = input.getAttribute('minlength');
        
        if (!value) {
            return { valid: false, message: input.dataset.errorRequired };
        }
        if (minLength && value.length < parseInt(minLength)) {
            return { valid: false, message: input.dataset.errorMinlength };
        }
        return { valid: true };
    }

    function validateCheckboxGroup(name) {
        const checkboxes = form.querySelectorAll(`input[name="${name}"].service-checkbox, input[name="${name}"]`);
        const checked = Array.from(checkboxes).some(cb => cb.checked);
        
        if (!checked) {
            return { valid: false, message: 'Please select at least one service.' };
        }
        return { valid: true };
    }

    function showError(formGroup, message) {
        formGroup.classList.add('error');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearError(formGroup) {
        formGroup.classList.remove('error');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    // Real-time validation on blur
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const formGroup = this.closest('.form-group');
            if (!formGroup) return;

            let validation;
            
            switch(this.id) {
                case 'fullName':
                    validation = validateName(this);
                    break;
                case 'email':
                    validation = validateEmail(this);
                    break;
                case 'phone':
                    validation = validatePhone(this);
                    break;
                case 'projectBrief':
                    validation = validateMinLength(this);
                    break;
                default:
                    validation = validateRequired(this);
            }

            if (validation.valid) {
                clearError(formGroup);
            } else {
                showError(formGroup, validation.message);
            }
        });

        // Clear error on input
        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            if (formGroup && formGroup.classList.contains('error')) {
                clearError(formGroup);
            }
        });
    });

    // Validate services checkboxes (if not already handled by dropdown)
    const existingServiceCheckboxes = form.querySelectorAll('input[name="services"]:not(.service-checkbox)');
    existingServiceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const formGroup = this.closest('.form-group');
            const validation = validateCheckboxGroup('services');
            
            if (validation.valid) {
                clearError(formGroup);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;

        // Validate all required fields
        const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        requiredInputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            if (!formGroup) return;

            let validation;
            
            switch(input.id) {
                case 'fullName':
                    validation = validateName(input);
                    break;
                case 'email':
                    validation = validateEmail(input);
                    break;
                case 'phone':
                    validation = validatePhone(input);
                    break;
                case 'projectBrief':
                    validation = validateMinLength(input);
                    break;
                default:
                    validation = validateRequired(input);
            }

            if (!validation.valid) {
                showError(formGroup, validation.message);
                isValid = false;
            } else {
                clearError(formGroup);
            }
        });

        // Validate services checkboxes
        const servicesGroup = form.querySelector('.multi-select-dropdown')?.closest('.form-group') || 
                             form.querySelector('.checkbox-group')?.closest('.form-group');
        if (servicesGroup) {
            const servicesValidation = validateCheckboxGroup('services');
            if (!servicesValidation.valid) {
                showError(servicesGroup, servicesValidation.message);
                isValid = false;
            }
        }

        // Validate consent checkbox
        const consentCheckbox = form.querySelector('input[name="consent"]');
        const consentGroup = consentCheckbox.closest('.form-group');
        if (!consentCheckbox.checked) {
            showError(consentGroup, consentCheckbox.dataset.errorRequired);
            isValid = false;
        }

        if (isValid) {
            // Show success message
            const successMessage = form.querySelector('.success-message');
            const errorMessage = form.querySelector('.error-message-box');
            
            errorMessage.style.display = 'none';
            successMessage.style.display = 'flex';
            
            // Reset form
            form.reset();
            
            // Reset multi-select dropdown display
            if (servicesDropdown && placeholder && valueDisplay) {
                placeholder.style.display = 'block';
                valueDisplay.style.display = 'none';
                servicesPanel.classList.remove('open');
                servicesTrigger.setAttribute('aria-expanded', 'false');
            }
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // In a real implementation, you would send the form data to your server here
            // Example:
            // const formData = new FormData(form);
            // fetch('/api/contact', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     // Handle success
            // })
            // .catch(error => {
            //     // Handle error
            //     errorMessage.style.display = 'flex';
            //     successMessage.style.display = 'none';
            // });
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});


// ============================================
// CONTACT PAGE - Contact form enhancements, service selector
// File: js/contact.js
// ============================================

// ============================================
// Contact Page Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    const contactConsultationBtn = document.getElementById('contact-consultation-btn');
    const subjectSelect = document.getElementById('contact-subject');
    const selectIconDisplay = document.getElementById('select-icon-display');
    const serviceOptions = document.querySelectorAll('.service-option');
    
    // Update select icon based on selected option
    function updateSelectIcon() {
        const selectedOption = subjectSelect.options[subjectSelect.selectedIndex];
        const iconClass = selectedOption.getAttribute('data-icon');
        if (iconClass) {
            selectIconDisplay.className = `fas fa-${iconClass}`;
            selectIconDisplay.style.display = 'block';
        } else {
            selectIconDisplay.style.display = 'none';
        }
    }
    
    // Handle service option clicks
    serviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            subjectSelect.value = value;
            
            // Update visual state
            serviceOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            updateSelectIcon();
            subjectSelect.dispatchEvent(new Event('change'));
        });
    });
    
    // Update service options when select changes
    subjectSelect.addEventListener('change', function() {
        const value = this.value;
        serviceOptions.forEach(opt => {
            if (opt.getAttribute('data-value') === value) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
        updateSelectIcon();
    });
    
    // Initialize icon display
    updateSelectIcon();
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const phone = document.getElementById('contact-phone').value.trim();
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value.trim();
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show success message
            showFormMessage('Thank you! Your message has been sent. We\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset service options visual state
            serviceOptions.forEach(opt => opt.classList.remove('active'));
            updateSelectIcon();
            
            // In a real application, you would send the form data to a server here
            // Example:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, email, phone, subject, message })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     showFormMessage('Thank you! Your message has been sent.', 'success');
            //     contactForm.reset();
            // })
            // .catch(error => {
            //     showFormMessage('Something went wrong. Please try again.', 'error');
            // });
        });
    }
    
    // Contact consultation button
    if (contactConsultationBtn) {
        contactConsultationBtn.addEventListener('click', function() {
            const consultationModal = document.getElementById('consultation-modal');
            if (consultationModal) {
                consultationModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Form message display function
    function showFormMessage(message, type) {
        // Remove existing message if any
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            padding: var(--spacing-md);
            margin-top: var(--spacing-md);
            border-radius: var(--radius-md);
            font-weight: 500;
            animation: slideUpFade 0.3s ease;
        `;
        
        if (type === 'success') {
            messageEl.style.background = 'rgba(6, 147, 227, 0.1)';
            messageEl.style.color = 'var(--secondary-color)';
            messageEl.style.border = '2px solid var(--secondary-color)';
        } else {
            messageEl.style.background = 'rgba(255, 105, 0, 0.1)';
            messageEl.style.color = 'var(--primary-color)';
            messageEl.style.border = '2px solid var(--primary-color)';
        }
        
        // Insert message after form
        contactForm.appendChild(messageEl);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                messageEl.remove();
            }, 300);
        }, 5000);
    }
    
    // Add input validation feedback
    const formInputs = contactForm?.querySelectorAll('input, textarea');
    if (formInputs) {
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        
        // Remove previous error styling
        field.classList.remove('error', 'valid');
        
        if (isRequired && !value) {
            field.classList.add('error');
            field.style.borderColor = 'var(--primary-color)';
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('error');
                field.style.borderColor = 'var(--primary-color)';
                return false;
            }
        }
        
        // Phone validation (optional but if provided, should be valid)
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                field.classList.add('error');
                field.style.borderColor = 'var(--primary-color)';
                return false;
            }
        }
        
        if (value) {
            field.classList.add('valid');
            field.style.borderColor = 'var(--secondary-color)';
        } else {
            field.style.borderColor = 'var(--border-color)';
        }
        
        return true;
    }
});



// ============================================
// BLOGS PAGE - Filter functionality, search functionality
// File: js/blogs.js
// ============================================

// ============================================
// Blogs Page Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.blog-filter-btn');
    const blogItems = document.querySelectorAll('.blog-card-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            blogItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue.replace('.', ''))) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px) scale(0.95)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.6s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-30px) scale(0.95)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('blog-search');
    const searchBtn = document.querySelector('.search-btn-blog');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Show all items if search is empty
            blogItems.forEach(item => {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            });
            return;
        }
        
        blogItems.forEach(item => {
            const title = item.querySelector('.blog-card-title').textContent.toLowerCase();
            const excerpt = item.querySelector('.blog-card-excerpt').textContent.toLowerCase();
            const category = item.querySelector('.blog-card-category').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px) scale(0.95)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.6s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0) scale(1)';
                }, 50);
            } else {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '0';
                item.style.transform = 'translateY(-30px) scale(0.95)';
                
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
        
        // Real-time search as user types (with debounce)
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(performSearch, 300);
        });
    }
    
    // Load more functionality
    const loadMoreBtn = document.getElementById('load-more-blogs-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // This would typically load more items via AJAX
            // For now, we'll just show a message
            this.textContent = 'All articles loaded';
            this.disabled = true;
            this.style.opacity = '0.5';
        });
    }
    
    // Smooth scroll for blog cards
    blogItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only navigate if clicking on the card itself, not on links
            if (!e.target.closest('.blog-card-link')) {
                const link = item.querySelector('.blog-card-link');
                if (link) {
                    link.click();
                }
            }
        });
    });
});



// ============================================
// SHOWCASE PAGE - Filter functionality, load more
// File: js/showcase.js
// ============================================

// ============================================
// Showcase Page Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const showcaseItems = document.querySelectorAll('.showcase-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            showcaseItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue.replace('.', ''))) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px) scale(0.95)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.6s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-30px) scale(0.95)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Load more functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // This would typically load more items via AJAX
            // For now, we'll just show a message
            this.textContent = 'All items loaded';
            this.disabled = true;
            this.style.opacity = '0.5';
        });
    }
    
    // Smooth scroll for showcase items
    showcaseItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click functionality if needed
            // Could open a modal or navigate to project detail page
        });
    });
});




