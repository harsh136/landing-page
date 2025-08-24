document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger2');
  const glassMenu = document.getElementById('glass-menu');
  const body = document.body;

  // Function to close the mobile menu
  function closeMenu() {
    hamburger.classList.remove('open');
    glassMenu.classList.remove('open');
    body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
    glassMenu.setAttribute('aria-hidden', 'true');
  }

  // Toggle menu open/close when hamburger is clicked
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('open');
    glassMenu.classList.toggle('open');
    body.classList.toggle('menu-open');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('open'));
    glassMenu.setAttribute('aria-hidden', !hamburger.classList.contains('open'));
  });

  // Close menu when any link inside the glass menu is clicked
  glassMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu(); // Use the function to ensure consistent closing
    });
  });

  // Close menu if a click occurs outside the menu or hamburger button
  document.addEventListener('click', function(event) {
    const isClickInsideMenu = glassMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    if (!isClickInsideMenu && !isClickOnHamburger && glassMenu.classList.contains('open')) {
      closeMenu(); // Use the function to ensure consistent closing
    }
  });

  // About section animation
  const aboutSection = document.querySelector('.about');
  const statNumbers = document.querySelectorAll('.stat-number');
  
  // Debug: Check if elements are found
  console.log('About section found:', aboutSection);
  console.log('Stat numbers found:', statNumbers.length);
  
  // Function to animate numbers
  function animateNumbers() {
    console.log('Animating numbers');
    statNumbers.forEach(statNumber => {
      const target = +statNumber.getAttribute('data-target');
      console.log('Target value:', target);
      const increment = target / 150;
      let current = 0;
      
      const updateNumber = () => {
        current += increment;
        if (current < target) {
          statNumber.innerText = Math.ceil(current);
          requestAnimationFrame(updateNumber);
        } else {
          statNumber.innerText = target;
        }
      };
      
      updateNumber();
    });
  }

  // Create an Intersection Observer to detect when the about section is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('About section is visible');
        animateNumbers();
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3 // Trigger when 30% of the section is visible
  });

  // Start observing the about section
  if (aboutSection) {
    observer.observe(aboutSection);
    console.log('Started observing about section');
  }

  // Fallback: Trigger animation after 3 seconds if it hasn't happened yet
  setTimeout(() => {
    const hasAnimated = Array.from(statNumbers).some(el => 
      parseInt(el.innerText) > 0
    );
    
    if (!hasAnimated) {
      console.log('Fallback: Triggering animation manually');
      animateNumbers();
    }
  }, 3000);
});