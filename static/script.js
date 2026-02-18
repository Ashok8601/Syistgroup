// Simple Scroll Animation for Navigation
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
    } else {
        header.style.boxShadow = "none";
    }
});

// Smooth anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const menu = document.querySelector('#mobile-menu');
const navMenu = document.querySelector('#nav-menu');

// Toggle Menu function
menu.addEventListener('click', () => {
    menu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll shadow
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
    } else {
        header.style.boxShadow = "none";
    }
});
