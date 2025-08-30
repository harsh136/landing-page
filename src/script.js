// Mobile Menu Functionality
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger2");
  const glassMenu = document.getElementById("glass-menu");
  const body = document.body;

  // Function to close the mobile menu
  function closeMenu() {
    hamburger.classList.remove("open");
    glassMenu.classList.remove("open");
    body.classList.remove("menu-open");
    hamburger.setAttribute("aria-expanded", "false");
    glassMenu.setAttribute("aria-hidden", "true");
  }

  // Toggle menu open/close when hamburger is clicked
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("open");
    glassMenu.classList.toggle("open");
    body.classList.toggle("menu-open");
    hamburger.setAttribute(
      "aria-expanded",
      hamburger.classList.contains("open")
    );
    glassMenu.setAttribute(
      "aria-hidden",
      !hamburger.classList.contains("open")
    );
  });

  // Close menu when any link inside the glass menu is clicked
  glassMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close menu if a click occurs outside the menu or hamburger button
  document.addEventListener("click", function (event) {
    const isClickInsideMenu = glassMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    if (
      !isClickInsideMenu &&
      !isClickOnHamburger &&
      glassMenu.classList.contains("open")
    ) {
      closeMenu();
    }
  });

  // About section animation
  const aboutSection = document.querySelector(".about");
  const statNumbers = document.querySelectorAll(".stat-number");

  // Function to animate numbers
  function animateNumbers() {
    statNumbers.forEach((statNumber) => {
      const target = +statNumber.getAttribute("data-target");
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
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumbers();
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3, // Trigger when 30% of the section is visible
    }
  );

  // Start observing the about section
  if (aboutSection) {
    observer.observe(aboutSection);
  }

  // Fallback: Trigger animation after 3 seconds if it hasn't happened yet
  setTimeout(() => {
    const hasAnimated = Array.from(statNumbers).some(
      (el) => parseInt(el.innerText) > 0
    );

    if (!hasAnimated) {
      animateNumbers();
    }
  }, 3000);
});

// Product Slider Functionality
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const leftArrow = document.querySelector(".slider-arrow.left");
  const rightArrow = document.querySelector(".slider-arrow.right");
  let currentSlide = 0;

  // Function to show a specific slide
  function showSlide(index) {
    // Remove active class from all slides and thumbnails
    slides.forEach((slide) => slide.classList.remove("active"));
    thumbnails.forEach((thumb) => thumb.classList.remove("active"));

    // Add active class to current slide and thumbnail
    slides[index].classList.add("active");
    thumbnails[index].classList.add("active");

    // Update current slide index
    currentSlide = index;
  }

  // Function to go to next slide
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  // Function to go to previous slide
  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  // Event listeners for arrows
  rightArrow.addEventListener("click", nextSlide);
  leftArrow.addEventListener("click", prevSlide);

  // Event listeners for thumbnails
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);
});

// Contact Form Handling
document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById('contactForm');
  const popup = document.getElementById('popup');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Simple validation
      if (!name || !email || !message) {
        showPopup('Please fill in all fields.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showPopup('Please enter a valid email address.');
        return;
      }
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'SENDING...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success popup
        showPopup('Thank you for your message! We will get back to you soon.');
      }, 2000);
    });
  }

  // Function to show popup
  function showPopup(message) {
    const popupContent = popup.querySelector('p');
    popupContent.textContent = message;
    popup.classList.add('show');
    
    // Hide popup after 3 seconds
    setTimeout(() => {
      popup.classList.remove('show');
    }, 3000);
  }

  // Close popup when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('show');
    }
  });
});