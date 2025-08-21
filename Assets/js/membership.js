// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function () {
    console.log("Membership.js loaded");

    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Stats counter animation
    initializeStatsCounter();

    // Scroll indicator functionality
    initializeScrollIndicator();

    // Initialize membership filter
    initializeMembershipFilter();

    // Initialize form submission
    initializeFormSubmission();

    // Initialize application process timeline animations
    initializeTimelineAnimations();
});

// Function to initialize stats counter
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute('data-value'));
        const duration = 2000; // 2 seconds
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentValue = Math.round(targetValue * progress);

            if (frame === totalFrames) {
                stat.textContent = targetValue;
                clearInterval(counter);
            } else {
                stat.textContent = currentValue;
            }
        }, frameDuration);
    });
}

// Function to initialize scroll indicator
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const membershipSection = document.getElementById('membership-plans');
            if (membershipSection) {
                membershipSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Hide scroll indicator when scrolled
        function debounce(func, wait) {
            let timeout;
            return function () {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, arguments), wait);
            };
        }

        window.addEventListener('scroll', debounce(() => {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }, 50));
    }
}

// Function to initialize membership filter
function initializeMembershipFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const membershipCards = document.querySelectorAll('.membership-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                // Get filter value
                const filterValue = button.getAttribute('data-filter');

                // Filter cards
                membershipCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        const cardCategory = card.getAttribute('data-category');

                        if (cardCategory === filterValue) {
                            card.style.display = 'flex';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 100);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
}

// Function to set membership type in modal
function setMembershipType(type) {
    console.log("Setting membership type to:", type);

    // Set the hidden input value
    const membershipTypeInput = document.getElementById('membershipType');
    if (membershipTypeInput) {
        membershipTypeInput.value = type;
    } else {
        console.error("membershipType input not found");
    }

    // Update modal title
    const modalLabel = document.getElementById('membershipModalLabel');
    if (modalLabel) {
        modalLabel.textContent = `Join AAMECC - ${type} Membership`;
    }
}

// Function to initialize form submission
function initializeFormSubmission() {
    const membershipForm = document.getElementById('membershipForm');

    if (membershipForm) {
        console.log("Form found, adding submit listener");
        membershipForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log("Form submitted");

            // Validate form
            if (!validateForm(this)) {
                console.log("Form validation failed");
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;

            // Get form data
            const formData = new FormData(this);
            
            // Add reCAPTCHA response to form data
            formData.append('g-recaptcha-response', grecaptcha.getResponse());
            
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });

            console.log("Submitting form data:", formDataObj);

            // Send data to Google Sheets
            fetch(membershipForm.action, {
                method: 'POST',
                body: new URLSearchParams(formData),
                mode: 'no-cors'
            })
                .then(() => {
                    console.log("Form submitted successfully");
                    // Close the membership modal
                    const membershipModal = bootstrap.Modal.getInstance(document.getElementById('membershipModal'));
                    membershipModal.hide();

                    // Show success modal
                    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                    successModal.show();

                    // Reset form and reCAPTCHA
                    membershipForm.reset();
                    grecaptcha.reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                    let errorMessage = 'There was an error submitting your application. ';

                    if (!navigator.onLine) {
                        errorMessage += 'Please check your internet connection and try again.';
                    } else if (error.name === 'TimeoutError') {
                        errorMessage += 'The server is taking too long to respond. Please try again later.';
                    } else {
                        errorMessage += 'Please try again or contact support if the issue persists.';
                    }

                    alert(errorMessage);
                })
                .finally(() => {
                    // Reset button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    } else {
        console.error("Membership form not found");
    }
}

// Form validation
function validateForm(form) {
    const fullName = form.querySelector('#fullName');
    const email = form.querySelector('#email');
    const phone = form.querySelector('#phone');
    const termsCheck = form.querySelector('#termsCheck');

    let isValid = true;

    // Reset previous validation
    form.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });

    // Validate full name
    if (!fullName.value.trim()) {
        fullName.classList.add('is-invalid');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    }

    // Validate phone (basic validation)
    if (!phone.value.trim() || phone.value.length < 10) {
        phone.classList.add('is-invalid');
        isValid = false;
    }

    // Validate terms checkbox
    if (termsCheck && !termsCheck.checked) {
        termsCheck.classList.add('is-invalid');
        isValid = false;
    }

    // Validate reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        // Find the reCAPTCHA element and add invalid class to its parent
        const recaptchaElement = form.querySelector('.g-recaptcha');
        if (recaptchaElement) {
            recaptchaElement.closest('.mb-3').querySelector('.invalid-feedback').style.display = 'block';
        }
        console.log("reCAPTCHA validation failed");
        isValid = false;
    }

    return isValid;
}

// Make functions globally available for inline event handlers
window.setMembershipType = setMembershipType;

// Add error handling
window.addEventListener('error', function (e) {
    console.error('JavaScript Error:', e.message, 'at', e.filename, 'line:', e.lineno);
});

// Check if Bootstrap is loaded
document.addEventListener('DOMContentLoaded', function () {
    if (typeof bootstrap === 'undefined') {
        console.error("Bootstrap JS is not loaded!");
        alert("Bootstrap JS is not loaded. This will prevent modals from working.");
    } else {
        console.log("Bootstrap JS is loaded correctly");
    }
});

// Function to initialize timeline animations
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timelineItems.length > 0) {
        // Create an intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a class to animate the timeline item
                    entry.target.classList.add('timeline-item-visible');
                    // Stop observing the element after it's animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of the item is visible
        });

        // Observe each timeline item
        timelineItems.forEach((item, index) => {
            // Add a delay based on the item's position
            item.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(item);
        });
    }
}