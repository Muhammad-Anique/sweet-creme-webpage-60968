'use strict';

/**
 * Sweet Creme Webpage - User Interface Logic
 * Handles smooth scrolling, navigation effects, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Sticky Header & Scroll Effects ---
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // --- 2. Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. Flavor Gallery Interaction ---
    // Simple hover effect enhancement for mobile touch devices
    const flavorCards = document.querySelectorAll('.flavor-card');
    
    flavorCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.toggle('card-active');
        }, { passive: true });
    });

    // --- 4. Reveal Animations on Scroll ---
    // Using Intersection Observer to trigger animations when sections come into view
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once it's visible, no need to observe anymore
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to main sections and cards
    document.querySelectorAll('section, .flavor-card').forEach(el => {
        el.classList.add('reveal-element');
        observer.observe(el);
    });

    // --- 5. Contact Section Placeholder Logic ---
    // Log a message when social icons are clicked (since they are placeholders)
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Follow us on social media! Links coming soon.');
        });
    });
});

/**
 * Additional CSS needed for the JS reveal animations mentioned above:
 * (These should be added to styles.css)
 * 
 * .reveal-element {
 *    opacity: 0;
 *    transform: translateY(30px);
 *    transition: all 0.8s ease-out;
 * }
 * 
 * .reveal-element.visible {
 *    opacity: 1;
 *    transform: translateY(0);
 * }
 */