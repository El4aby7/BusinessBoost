// app.js - Main front-end functionality for Local Boost

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic (to be wired into HTML)
    initMobileMenu();

    // 2. Forms & Mock Supabase Integration points
    initContactForm();
    initNewsletterForms();
    initGetStartedFlow();

    // 3. Interactive Elements (Selectable cards, etc.)
    initSelectableCards();
});

// --- UI Logic ---

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

function initSelectableCards() {
    // Logic for step 1: Select industry
    const industryCards = document.querySelectorAll('#step-1 .group');
    industryCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selection from all
            industryCards.forEach(c => {
                c.classList.remove('ring-2', 'ring-primary', 'bg-surface-container-low', 'shadow-lg');
                c.classList.add('bg-surface-container-lowest');
                const checkIcon = c.querySelector('.absolute.top-6.right-6');
                if (checkIcon) checkIcon.remove();
            });

            // Add selection to clicked
            card.classList.remove('bg-surface-container-lowest');
            card.classList.add('ring-2', 'ring-primary', 'bg-surface-container-low', 'shadow-lg');

            // Add check icon if it doesn't exist
            if (!card.querySelector('.absolute.top-6.right-6')) {
                card.insertAdjacentHTML('beforeend', `
                    <div class="absolute top-6 right-6">
                        <span class="material-symbols-outlined text-primary text-3xl" data-icon="check_circle" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                    </div>
                `);
            }
        });
    });

    // Logic for step 2: Select visual style
    const styleCards = document.querySelectorAll('#step-2 .group');
    styleCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selection from all
            styleCards.forEach(c => {
                c.classList.remove('ring-2', 'ring-primary', 'shadow-2xl');
                c.classList.add('border', 'border-outline/10', 'shadow-sm');
                const radioBtn = c.querySelector('.material-symbols-outlined.text-3xl');
                if (radioBtn) {
                    radioBtn.textContent = 'radio_button_unchecked';
                    radioBtn.classList.remove('text-primary');
                    radioBtn.classList.add('text-outline');
                    radioBtn.style.fontVariationSettings = '';
                }
            });

            // Add selection to clicked
            card.classList.remove('border', 'border-outline/10', 'shadow-sm');
            card.classList.add('ring-2', 'ring-primary', 'shadow-2xl');
            const radioBtn = card.querySelector('.material-symbols-outlined.text-3xl');
            if (radioBtn) {
                radioBtn.textContent = 'check_circle';
                radioBtn.classList.remove('text-outline');
                radioBtn.classList.add('text-primary');
                radioBtn.style.fontVariationSettings = "'FILL' 1";
            }
        });
    });
}


// --- Data Submission Placeholders (Preparation for Supabase) ---

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Validate
            if (Object.values(data).some(val => !val.trim())) {
                alert("Please fill in all fields before submitting.");
                return;
            }

            // Mock submission
            submitForm(data, 'contact');

            // UI Feedback
            alert("Thank you! Your message has been sent. We'll be in touch soon.");
            contactForm.reset();
        });
    }
}

function initNewsletterForms() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // Mock submission
                submitForm({ email: emailInput.value }, 'newsletter');

                alert("Thanks for subscribing to our newsletter!");
                emailInput.value = '';
            }
        });
    });
}

function initGetStartedFlow() {
    const launchBtn = document.getElementById('launch-workspace-btn');
    const form = document.getElementById('get-started-form');

    if (launchBtn && form) {
        launchBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Gather details
            const inputs = form.querySelectorAll('input, textarea');
            const data = {};
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) isValid = false;
                data[input.name || input.placeholder] = input.value;
            });

            if (!isValid) {
                alert("Please complete your business identity, mission, and contact details.");
                return;
            }

            // Mock submission
            submitForm(data, 'workspace_launch');

            alert("Workspace launch initialized! Our concierge will review your setup.");
        });
    }
}


// --- Modular Data Functions for Future Backend ---

/**
 * Placeholder for future Supabase insert operations.
 * @param {Object} data - The data payload to submit.
 * @param {string} type - The type of submission (e.g., 'contact', 'newsletter').
 */
async function submitForm(data, type) {
    console.log(`[Supabase Mock] Inserting into table '${type}':`, data);
    // TODO: Replace with actual Supabase code:
    // const { data, error } = await supabase.from(type).insert([data])
}

/**
 * Placeholder for fetching data.
 * @param {string} resource - The resource to fetch.
 */
async function fetchData(resource) {
    console.log(`[Supabase Mock] Fetching data for '${resource}'`);
    // TODO: Replace with Supabase fetch logic
    return [];
}
