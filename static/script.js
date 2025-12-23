// Particle effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navList = document.querySelector('.nav-list');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    navList.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Section switching
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navList = document.querySelector('.nav-list');
    const menuToggle = document.querySelector('.mobile-menu-toggle');

    sections.forEach(section => {
        section.classList.remove('active');
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId + '-section');
    const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);

    if (targetSection) {
        targetSection.classList.add('active');
    }

    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Close mobile menu when selecting a section
    if (navList.classList.contains('active')) {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
    }

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate in
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .stat, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 1000);
}

// Form submission
function initFormSubmission() {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I\'ll get back to you soon.');
        form.reset();
    });
}

// Detect device type
function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
    
    document.body.classList.add(isMobile ? 'mobile-device' : 'desktop-device');
    if (isTablet) document.body.classList.add('tablet-device');
    
    return { isMobile, isTablet };
}

// Adjust particles based on device
function createParticlesResponsive() {
    const { isMobile } = detectDevice();
    const particlesContainer = document.getElementById('particles');
    // Fewer particles on mobile for better performance
    const particleCount = isMobile ? 20 : 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Close mobile menu when clicking outside
function handleClickOutside(event) {
    const navList = document.querySelector('.nav-list');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (navList.classList.contains('active') && 
        !navbar.contains(event.target)) {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
    }
}

// Handle orientation change
function handleOrientationChange() {
    const navList = document.querySelector('.nav-list');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    // Close menu on orientation change
    if (navList.classList.contains('active')) {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticlesResponsive();
    initIntersectionObserver();
    initTypingEffect();
    initFormSubmission();
    showSection('home');
    
    // Add click outside listener
    document.addEventListener('click', handleClickOutside);
    
    // Add orientation change listener
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
});

// Add CSS for particles
const particleStyles = `
.particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: var(--primary-color);
    border-radius: 50%;
    opacity: 0.7;
    animation: float-particle linear infinite;
}

@keyframes float-particle {
    0% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}
`;

// Inject particle styles
const styleSheet = document.createElement('style');
styleSheet.textContent = particleStyles;
document.head.appendChild(styleSheet);