// script.js

// Initialize AOS library
AOS.init({
  duration: 1000,
  once: true,
});

// Example form handler
function handleForm(e) {
  e.preventDefault();
  alert("Thank you! Your message has been received.");
  e.target.reset(); // clear form fields
}


 // Initialize EmailJS with your public key
    (function() {
      emailjs.init("g0z7YHGQIYqjonVok");
    })();

    // Initialize AOS animations
    AOS.init({ 
      duration: 800,
      once: true // Animations only happen once
    });
    
    // Initialize Feather Icons
    feather.replace();
    
    // Theme toggle functionality
const themeToggleNav = document.getElementById('themeToggleNav');
const themeToggleNavMobile = document.getElementById('themeToggleNavMobile');
const html = document.documentElement;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the saved theme
if (savedTheme === 'dark') {
  html.classList.add('dark');
} else {
  html.classList.remove('dark');
}

// Function to toggle theme
const toggleTheme = () => {
  html.classList.toggle('dark');
  const isDark = html.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  feather.replace(); // Refresh icons to show correct sun/moon
};

// Add event listeners to navbar toggle buttons
themeToggleNav.addEventListener('click', toggleTheme);
themeToggleNavMobile.addEventListener('click', toggleTheme);
    
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      overlay.classList.toggle('active');
      
      // Change icon based on menu state
      const icon = mobileMenuButton.querySelector('i');
      if (mobileMenu.classList.contains('open')) {
        icon.setAttribute('data-feather', 'x');
      } else {
        icon.setAttribute('data-feather', 'menu');
      }
      feather.replace(); // Refresh icons
    });

    overlay.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      overlay.classList.remove('active');
      const icon = mobileMenuButton.querySelector('i');
      icon.setAttribute('data-feather', 'menu');
      feather.replace();
    });

    // Close menu when clicking on links
    document.querySelectorAll('#mobileMenu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        overlay.classList.remove('active');
        const icon = mobileMenuButton.querySelector('i');
        icon.setAttribute('data-feather', 'menu');
        feather.replace();
      });
    });
    
    // Text animation for "GrowwPark Technologies"
    const titleText = "";
    const animatedTitle = document.getElementById('animatedTitle');
    
    // Clear the element first
    animatedTitle.innerHTML = '';
    
    // Add each letter with a delay
    titleText.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.animationDelay = `${index * 0.1}s`;
      animatedTitle.appendChild(span);
      
      // Add space after "GrowwPark"
      if (index === 8) {
        const space = document.createElement('span');
        space.innerHTML = '&nbsp;';
        animatedTitle.appendChild(space);
      }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Counter animation for overlay
    function animateCounters() {
      const counters = document.querySelectorAll('.counter-number');
      const duration = 2000; // Animation duration in ms
      const startTime = Date.now();
      
      const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const current = Math.floor(progress * target);
          counter.textContent = current;
          
          // Add plus sign when animation completes
          if (progress === 1) {
            counter.textContent = target + '+';
          }
        });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }

    // Start counter animation when hero section is in view
    const heroSection = document.getElementById('home');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(heroSection);

    // Update year automatically
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="flex items-center justify-center">Sending... <i data-feather="loader" class="ml-2 w-4 h-4 animate-spin"></i></span>';
  feather.replace();
  
  // Get all form data automatically
  const formData = Object.fromEntries(new FormData(this).entries());
  
  emailjs.send('service_u4ztbx3', 'template_xf7noko', formData)
    .then(() => {
      alert('Message sent successfully!');
      this.reset();
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      alert(`Error: ${error.text || 'Please check console for details'}`);
    })
    .finally(() => {
      submitBtn.innerHTML = originalText;
      feather.replace();
    });
});