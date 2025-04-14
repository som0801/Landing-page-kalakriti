// Add to script.js

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
  
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('open');
      mobileNav.classList.toggle('open');
      
      // Add or remove body scroll lock
      if (mobileNav.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (mobileNav.classList.contains('open') && 
          !mobileNav.contains(e.target) && 
          !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
});
