/**
 * Main Script - UI & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScroll();
});

/**
 * Navbar behavior - Hide on scroll down, show on scroll up
 */
function initNavbar() {
    const nav = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.style.transform = 'translateY(0)';
            nav.style.background = 'rgba(11, 15, 26, 0.7)';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling Down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling Up
            nav.style.transform = 'translateY(0)';
            nav.style.background = 'rgba(11, 15, 26, 0.95)';
        }
        lastScroll = currentScroll;
    });
}

/**
 * Intersection Observer for Reveal Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing after animation triggers
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to sections, cards, and headings
    const revealElements = document.querySelectorAll('.card, section h2, .hero-content, .grid > div');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // Custom class for active state
    const style = document.createElement('style');
    style.innerHTML = `
        .active { 
            opacity: 1 !important; 
            transform: translateY(0) !important; 
        }
    `;
    document.head.appendChild(style);
}

/**
 * Mobile Menu Toggle logic
 */
function initMobileMenu() {
    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create Burger Menu Button
    const burger = document.createElement('div');
    burger.className = 'mobile-burger';
    burger.innerHTML = `<span></span><span></span><span></span>`;
    nav.appendChild(burger);

    // Toggle Styles
    const style = document.createElement('style');
    style.innerHTML = `
        .mobile-burger { display: none; cursor: pointer; flex-direction: column; gap: 6px; z-index: 1001; }
        .mobile-burger span { width: 25px; height: 2px; background: #fff; transition: 0.3s; }
        @media (max-width: 768px) {
            .mobile-burger { display: flex; }
            .nav-links {
                position: fixed; top: 0; right: -100%; height: 100vh; width: 70%;
                background: rgba(11, 15, 26, 0.98); backdrop-filter: blur(20px);
                flex-direction: column; justify-content: center; align-items: center;
                transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .nav-links.open { right: 0; }
            .burger-active span:nth-child(1) { transform: rotate(45deg) translate(5px, 6px); }
            .burger-active span:nth-child(2) { opacity: 0; }
            .burger-active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -6px); }
        }
    `;
    document.head.appendChild(style);

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        burger.classList.toggle('burger-active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            burger.classList.remove('burger-active');
        });
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}
