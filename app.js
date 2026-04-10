
// --- Theme & Language State ---
let currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
let currentLang = localStorage.getItem('lang') || 'en';

// --- i18n Dictionary ---

const i18n = {
    en: {
        nav_services: "Services",
        nav_about: "About",
        nav_contact: "Contact",
        nav_get_started: "Get Started",
        hero_title_1: "We Build Websites & Apps That",
        hero_title_2: "Grow",
        hero_title_3: "Local Businesses",
        hero_desc: "Our digital agency specializes in bespoke digital experiences that bridge the gap between your local storefront and the global digital marketplace. We transform browsers into loyal customers.",
        free_consultation: "Get a Free Consultation",
        view_work: "View Our Work",
        trusted_by: "Trusted by 200+ local owners"
    },
    ar: {
        nav_services: "الخدمات",
        nav_about: "معلومات عنا",
        nav_contact: "اتصل بنا",
        nav_get_started: "البدء",
        hero_title_1: "نحن نبني مواقع وتطبيقات",
        hero_title_2: "تنمي",
        hero_title_3: "الأعمال المحلية",
        hero_desc: "وكالتنا الرقمية متخصصة في التجارب الرقمية المخصصة التي تسد الفجوة بين واجهة متجرك المحلي والسوق الرقمي العالمي. نحن نحول المتصفحين إلى عملاء مخلصين.",
        free_consultation: "احصل على استشارة مجانية",
        view_work: "شاهد أعمالنا",
        trusted_by: "موثوق به من قبل أكثر من 200 صاحب عمل محلي"
    }
};


document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic (to be wired into HTML)
    initMobileMenu();

    // 2. Forms & Mock Supabase Integration points
    initContactForm();
    initNewsletterForms();
    initGetStartedFlow();

    // 3. Interactive Elements (Selectable cards, etc.)
    initSelectableCards();

    // 4. Theme and Language
    initTheme();
    initLang();
});

// --- UI Logic ---

function initMobileMenu() {
    const mobileMenuBtns = document.querySelectorAll('#mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtns.length > 0 && mobileMenu) {
        mobileMenuBtns.forEach(btn => btn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            // small delay for transition
            setTimeout(() => {
                mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
                mobileMenu.classList.add('opacity-100');
            }, 10);
            document.body.style.overflow = 'hidden'; // Prevent body scroll
        }));
    }

    if (closeMenuBtn && mobileMenu) {
        closeMenuBtn.addEventListener('click', () => {
            closeMobileMenu(mobileMenu);
        });
    }

    // Tap outside or on a link to close
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu || e.target.tagName === 'A') {
                closeMobileMenu(mobileMenu);
            }
        });
    }
}

function closeMobileMenu(mobileMenu) {
    mobileMenu.classList.remove('opacity-100');
    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
}

function initTheme() {
    applyTheme(currentTheme);

    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
            applyTheme(currentTheme);
        });
    });
}

function applyTheme(theme) {
    const icons = document.querySelectorAll('.theme-icon');
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        icons.forEach(i => i.textContent = 'light_mode');
    } else {
        document.documentElement.classList.remove('dark');
        icons.forEach(i => i.textContent = 'dark_mode');
    }
}

function initLang() {
    applyLang(currentLang);

    const langToggles = document.querySelectorAll('.lang-toggle');
    langToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ar' : 'en';
            localStorage.setItem('lang', currentLang);
            applyLang(currentLang);
        });
    });
}

function applyLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update toggle buttons text
    const langToggles = document.querySelectorAll('.lang-toggle');
    langToggles.forEach(toggle => {
        toggle.textContent = lang === 'en' ? 'AR' : 'EN';
    });

    // Update texts
    const textNodes = document.querySelectorAll('[data-i18n]');
    textNodes.forEach(node => {
        const key = node.getAttribute('data-i18n');
        if (i18n[lang] && i18n[lang][key]) {
            node.textContent = i18n[lang][key];
        }
    });
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

// --- Additional Supabase Placeholders ---

/**
 * Placeholder for future Supabase fetch and UI render logic.
 */
function renderCards(data) {
    console.log('[Supabase Mock] Rendering cards with data:', data);
}

/**
 * Placeholder for fetching and applying admin settings.
 */
async function loadAdminSettings() {
    console.log('[Supabase Mock] Loading admin settings');
    // const settings = await fetchData('settings');
    // applySettings(settings);
}
