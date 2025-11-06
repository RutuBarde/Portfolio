// ==================================
// 1. Fixed Navbar and Hamburger Toggle (Requirement 4, 7)
// ==================================
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times'); // Change icon to 'X' when open
    });

    // Close menu when a link is clicked (for single-page navigation)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('open');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Set Current Year in Footer (Requirement 11)
    document.getElementById('current-year').textContent = new Date().getFullYear();
});


// ==================================
// 2. Typewriter Effect (Animation - Requirement 6)
// ==================================
function typewriterEffect(elementId, text, speed) {
    const element = document.getElementById(elementId);
    let i = 0;
    
    // Add a blinking cursor effect using CSS
    element.style.borderRight = '2px solid var(--color-primary)';
    element.style.animation = 'blink-caret 0.75s step-end infinite';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Stop the cursor blink after typing is complete
            element.style.animation = 'none';
            element.style.borderRight = 'none';
        }
    }
    type();
}

// Execute the typewriter effect on the Hero section subtitle
window.onload = () => {
    const textToType = 'Database Engineer | PL/SQL | Performance Tuning Expert';
    typewriterEffect('typewriter', textToType, 75);
};


// ==================================
// 3. Testimonials Carousel (Requirement 12)
// ==================================
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("testimonial-slide");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.transform = `translateX(-${(slideIndex - 1) * 100}%)`; // Smooth horizontal transition
  }
  
  // Update active dot
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Apply active class to the current dot
  if(dots[slideIndex-1]) {
    dots[slideIndex-1].className += " active";
  }
}

// Auto-advance carousel for better UX (optional animation)
setInterval(() => {
    plusSlides(1);
}, 8000); // Change slide every 8 seconds

// ==================================
// 4. Scroll Animation/Reveal (Requirement 6 - Basic Animation/Transition)
// ==================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Stop observing after it has animated once
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1, // Trigger when 10% of the item is visible
});

// Add a class for elements to animate
document.querySelectorAll('.content-container').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Add basic CSS for the animation (must be in index.css, included here for context)
/* .animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.animate-on-scroll.in-view {
    opacity: 1;
    transform: translateY(0);
}
*/