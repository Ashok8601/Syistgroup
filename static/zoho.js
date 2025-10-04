document.addEventListener('DOMContentLoaded', () => {
    // 1. Feature: Smooth Scrolling (UX Enhancement)
    // Allows internal links (e.g., table of contents, not included in HTML for brevity, 
    // but a common blog feature) to scroll smoothly.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. Feature: Simple Image Lazy Loading (Performance/UX)
    // Improves load time by only loading images when they enter the viewport.
    const lazyImages = document.querySelectorAll('img.lazy');

    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for older browsers (not ideal, but functional)
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // To use this feature, any image in your HTML should look like this:
    // <img class="lazy" data-src="actual-image-url.jpg" alt="Description" src="placeholder.jpg">
    
    
    // 3. Feature: Highlight Key Section on Scroll (Modern UX)
    // Add an 'active' class to the main header when scrolling past a certain point 
    // to give a subtle visual cue or fix a navigation bar (if one existed).
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // You would add the following CSS for this feature:
    /*
    .main-header.scrolled { 
        position: sticky; 
        top: 0; 
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
        z-index: 1000;
    }
    */
});
