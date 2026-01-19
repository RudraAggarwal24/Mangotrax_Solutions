// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

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
        const checkboxes = form.querySelectorAll(`input[name="${name}"]`);
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

    // Validate services checkboxes
    const serviceCheckboxes = form.querySelectorAll('input[name="services"]');
    serviceCheckboxes.forEach(checkbox => {
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
        const servicesGroup = form.querySelector('.checkbox-group').closest('.form-group');
        const servicesValidation = validateCheckboxGroup('services');
        if (!servicesValidation.valid) {
            showError(servicesGroup, servicesValidation.message);
            isValid = false;
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
