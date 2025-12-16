// ============================================
// Contact Page Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    const contactConsultationBtn = document.getElementById('contact-consultation-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const phone = document.getElementById('contact-phone').value.trim();
            const subject = document.getElementById('contact-subject').value.trim();
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

