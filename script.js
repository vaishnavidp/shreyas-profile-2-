// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    
    // Add magnetic effect on links
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        const rect = link.getBoundingClientRect();
        const linkCenterX = rect.left + rect.width / 2;
        const linkCenterY = rect.top + rect.height / 2;
        const distanceX = Math.abs(mouseX - linkCenterX);
        const distanceY = Math.abs(mouseY - linkCenterY);
        
        if (distanceX < rect.width / 2 + 30 && distanceY < rect.height / 2 + 30) {
            cursor.style.transform = `translate(${linkCenterX}px, ${linkCenterY}px) scale(1.5)`;
            cursorFollower.style.transform = `translate(${linkCenterX}px, ${linkCenterY}px) scale(2)`;
        }
    });
});

// Smooth follower animation
function animate() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(animate);
}
animate();

// Header scroll effect
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section-header, .project-card, .skill-category, .contact-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Parallax effect for geometric shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = (e.clientX - window.innerWidth / 2) / 50;
    const mouseY = (e.clientY - window.innerHeight / 2) / 50;
    
    shapes.forEach((shape, index) => {
        const depth = (index + 1) * 0.2;
        shape.style.transform = `translate(-50%, -50%) translate3d(${mouseX * depth}px, ${mouseY * depth}px, 0)`;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const text = "Creative Developer";
    const typingText = document.querySelector('.typing-text');
    
    // Reset the text content
    typingText.textContent = '';
    
    let currentIndex = 0;
    
    function typeText() {
        if (currentIndex < text.length) {
            typingText.textContent += text[currentIndex];
            currentIndex++;
            setTimeout(typeText, 100); // 100ms delay between each character
        }
    }
    
    // Start typing
    typeText();
});

// Timeline cursor reactive effect
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const dot = item.querySelector('.timeline-dot');
        
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on cursor position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Calculate mouse position for gradient effect
            const mouseX = ((x / rect.width) * 100);
            const mouseY = ((y / rect.height) * 100);
            
            // Apply 3D transform with perspective
            content.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(10px)
            `;
            
            // Update gradient position
            content.style.setProperty('--mouse-x', `${mouseX}%`);
            content.style.setProperty('--mouse-y', `${mouseY}%`);
            
            // Add glow effect to dot
            const dotRect = dot.getBoundingClientRect();
            const dotX = e.clientX - dotRect.left;
            const dotY = e.clientY - dotRect.top;
            
            const dotCenterX = dotRect.width / 2;
            const dotCenterY = dotRect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(dotX - dotCenterX, 2) + 
                Math.pow(dotY - dotCenterY, 2)
            );
            
            const maxDistance = Math.sqrt(
                Math.pow(dotCenterX, 2) + 
                Math.pow(dotCenterY, 2)
            );
            
            const glowIntensity = Math.max(0, 1 - distance / maxDistance);
            
            dot.style.boxShadow = `
                0 0 ${20 + glowIntensity * 30}px 
                rgba(231, 76, 60, ${0.3 + glowIntensity * 0.4})
            `;
        });
        
        // Reset transform when mouse leaves
        item.addEventListener('mouseleave', () => {
            content.style.transform = 'none';
            dot.style.boxShadow = '0 0 20px rgba(231, 76, 60, 0.2)';
        });
    });
});

// Timeline scroll reveal animation
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const educationCards = document.querySelectorAll('.education-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each timeline item and education card
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    educationCards.forEach(card => {
        observer.observe(card);
        });
    });

// GSAP 3D Card Stack Animations with Modern Reveal
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    const projectCards = document.querySelectorAll('.project-card');
    
    // Initial state for all cards
    gsap.set(projectCards, {
        opacity: 0,
        y: 50,
        rotationX: 10,
        rotationY: 5,
        transformPerspective: 1000
    });

    // Create a timeline for each card
    projectCards.forEach((card, index) => {
        const delay = index * 0.1;
        
        // Create reveal timeline
        const revealTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                end: "top center",
                toggleActions: "play none none reverse",
                markers: false
            }
        });

        // Add reveal animation
        revealTimeline
            .to(card, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            })
            .to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.8");

        // Create particles for reveal effect
        createParticles(card, delay);

        // Mouse move parallax effect for individual card
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        // Reset rotation on mouse leave for individual card
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
});

// Particle creation function
function createParticles(card, delay) {
    const particleCount = 5;
    const container = document.createElement('div');
    container.className = 'particle-container';
    card.appendChild(container);

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'reveal-particle';
        container.appendChild(particle);

        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 100;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        gsap.set(particle, {
            x: x,
            y: y,
            scale: 0,
            opacity: 0
        });

        gsap.to(particle, {
            x: x * 2,
            y: y * 2,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: delay + i * 0.1,
            ease: "power2.out"
        });
        
        gsap.to(particle, {
            scale: 0,
        opacity: 0,
            duration: 0.3,
            delay: delay + 0.5 + i * 0.1,
            ease: "power2.in"
        });
    }
} 