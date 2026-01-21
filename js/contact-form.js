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
