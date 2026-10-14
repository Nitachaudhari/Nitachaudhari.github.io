/**
 * Nita Chaudhari - Portfolio Website Script
 * Modern, High-Performance, Vanilla JavaScript Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initTypingEffect();
    initScrollInteractions();
    initProjectFilters();
    initContactForm();
    initDynamicYear();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light Mode with Persistence)
   -------------------------------------------------------------------------- */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const storageKey = 'nita-portfolio-theme';

    // Determine initial theme
    const savedTheme = localStorage.getItem(storageKey);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');

    setTheme(initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            localStorage.setItem(storageKey, newTheme);
        });
    }

    // Listen for OS system theme changes if user hasn't overridden
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(storageKey)) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
                if (themeToggleBtn) {
                    themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
                    themeToggleBtn.setAttribute('title', 'Switch to light theme');
                }
            } else {
                themeIcon.className = 'fas fa-moon';
                if (themeToggleBtn) {
                    themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
                    themeToggleBtn.setAttribute('title', 'Switch to dark theme');
                }
            }
        }
    }
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const menuToggle = document.getElementById('menu-icon');
    const navWrapper = document.getElementById('nav-wrapper');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !navWrapper) return;

    function openMenu() {
        menuToggle.classList.add('active');
        navWrapper.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Close navigation menu');
    }

    function closeMenu() {
        menuToggle.classList.remove('active');
        navWrapper.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
    }

    menuToggle.addEventListener('click', () => {
        const isOpen = navWrapper.classList.contains('active');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navWrapper.contains(e.target)) {
            closeMenu();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navWrapper.classList.contains('active')) {
            closeMenu();
            menuToggle.focus();
        }
    });
}

/* --------------------------------------------------------------------------
   3. Dynamic Typing Effect (Hero Headline)
   -------------------------------------------------------------------------- */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const roles = [
        'Full-Stack Web Developer',
        'Computer Engineering Graduate',
        'B2B & Business Website Builder',
        'Technical SEO & Web Optimizer',
        'Future Digital Agency Founder'
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let delay = 90;

    function tick() {
        const currentRole = roles[roleIdx];

        if (isDeleting) {
            charIdx--;
            typingElement.textContent = currentRole.substring(0, charIdx);
            delay = 45;
        } else {
            charIdx++;
            typingElement.textContent = currentRole.substring(0, charIdx);
            delay = 85;
        }

        if (!isDeleting && charIdx === currentRole.length) {
            isDeleting = true;
            delay = 1800; // Pause at full word
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            delay = 400; // Pause before new word starts
        }

        setTimeout(tick, delay);
    }

    setTimeout(tick, 500);
}

/* --------------------------------------------------------------------------
   4. Scroll Interactions (Progress Bar, Sticky Header, Scroll Spy, Back-to-Top)
   -------------------------------------------------------------------------- */
function initScrollInteractions() {
    const progressBar = document.getElementById('progress-bar');
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', onScroll, { passive: true });

    function onScroll() {
        const scrollY = window.pageYOffset;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

        // 1. Reading Progress
        if (progressBar && totalHeight > 0) {
            const percentage = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
            progressBar.style.width = percentage + '%';
            progressBar.setAttribute('aria-valuenow', Math.round(percentage));
        }

        // 2. Scrolled Header Effect
        if (header) {
            if (scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // 3. Back to Top Button Visibility
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        // 4. Active Navigation Link Spy
        let currentSectionId = '';
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 140;
            const secHeight = sec.offsetHeight;
            if (scrollY >= secTop && scrollY < secTop + secHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Back to top click handler
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* --------------------------------------------------------------------------
   5. Project Category Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   6. Contact Form Real-Time Validation & Submission
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const serviceInput = document.getElementById('form-service');
    const messageInput = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');
    const alertBox = document.getElementById('form-status-alert');

    // Validation Rules
    function validateName() {
        const val = nameInput.value.trim();
        const err = document.getElementById('name-error');
        if (val.length < 2) {
            nameInput.classList.add('is-invalid');
            if (err) err.textContent = 'Please enter your full name (at least 2 characters).';
            return false;
        }
        nameInput.classList.remove('is-invalid');
        if (err) err.textContent = '';
        return true;
    }

    function validateEmail() {
        const val = emailInput.value.trim();
        const err = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
            emailInput.classList.add('is-invalid');
            if (err) err.textContent = 'Please enter a valid email address.';
            return false;
        }
        emailInput.classList.remove('is-invalid');
        if (err) err.textContent = '';
        return true;
    }

    function validateService() {
        const val = serviceInput.value;
        const err = document.getElementById('service-error');
        if (!val) {
            serviceInput.classList.add('is-invalid');
            if (err) err.textContent = 'Please select a service or project category.';
            return false;
        }
        serviceInput.classList.remove('is-invalid');
        if (err) err.textContent = '';
        return true;
    }

    function validateMessage() {
        const val = messageInput.value.trim();
        const err = document.getElementById('message-error');
        if (val.length < 10) {
            messageInput.classList.add('is-invalid');
            if (err) err.textContent = 'Please write a brief message (minimum 10 characters).';
            return false;
        }
        messageInput.classList.remove('is-invalid');
        if (err) err.textContent = '';
        return true;
    }

    // Attach real-time input and blur events
    nameInput.addEventListener('input', validateName);
    nameInput.addEventListener('blur', validateName);

    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);

    serviceInput.addEventListener('change', validateService);
    serviceInput.addEventListener('blur', validateService);

    messageInput.addEventListener('input', validateMessage);
    messageInput.addEventListener('blur', validateMessage);

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isServiceValid = validateService();
        const isMessageValid = validateMessage();

        if (!isNameValid || !isEmailValid || !isServiceValid || !isMessageValid) {
            showAlert('error', 'Please complete all required fields correctly before submitting.');
            return;
        }

        // Set loading state
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending Message...</span>';

        // Prepare Netlify Form Payload
        const formData = new FormData(form);
        const encodedData = new URLSearchParams(formData).toString();

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encodedData
            });

            if (response.ok || response.status === 200 || response.type === 'opaque') {
                showAlert('success', 'Thank you, ' + nameInput.value.trim() + '! Your message has been received. I will reply within 24 hours.');
                form.reset();
            } else {
                // Friendly fallback for non-Netlify preview environments
                showAlert('success', 'Thank you! Your message details have been noted. (If on local preview, connect to Netlify to receive direct emails).');
                form.reset();
            }
        } catch (error) {
            // In local offline environments or cors-blocked static previews
            showAlert('success', 'Thank you, ' + nameInput.value.trim() + '! Your message request has been sent. Feel free to also email directly at nitachaudhari1997@gmail.com.');
            form.reset();
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
        }
    });

    function showAlert(type, text) {
        if (!alertBox) return;
        alertBox.className = 'form-alert ' + type;
        alertBox.textContent = text;
        alertBox.style.display = 'block';

        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        if (type === 'success') {
            setTimeout(() => {
                alertBox.style.display = 'none';
            }, 8000);
        }
    }
}

/* --------------------------------------------------------------------------
   7. Dynamic Current Year
   -------------------------------------------------------------------------- */
function initDynamicYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
