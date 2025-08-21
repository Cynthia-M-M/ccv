// LOADER
document.addEventListener('DOMContentLoaded', () => {
    // Add animation delay to text characters
    const textSpans = document.querySelectorAll('.loader-text span');
    textSpans.forEach((span, index) => {
        span.style.setProperty('--i', index);
    });

    // Hide loader after content loads
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader-wrapper');
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 2000);
    });
});

// Enhanced Navbar Functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('mainNavbar');
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    
    // Function to handle navbar transformation on scroll
    function handleNavbarTransform() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Update scroll progress bar
        const scrollPosition = window.scrollY;
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / totalHeight) * 100;
        
        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${scrollPercentage}%`;
        }
    }
    
    // Initial call to set correct state
    handleNavbarTransform();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleNavbarTransform);
    
    // Handle active nav links
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    const sections = document.querySelectorAll('section');
    
    function setActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href && href.includes(current)) {
                link.classList.add('active');
            } else if (current === '' && href === 'index.html') {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    window.addEventListener('load', setActiveNavLink);
    
    // Mobile menu handling
    const navbarToggler = document.querySelector('.navbar-toggler');
    const offcanvasMenu = document.getElementById('mainNav');
    const offcanvasLinks = offcanvasMenu.querySelectorAll('.nav-link');
    
    offcanvasLinks.forEach(link => {
        link.addEventListener('click', () => {
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasMenu);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        });
    });
});

// AOS ANIMATION LIBRARY
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000, // Global default duration for animations
  });

  // NAVBAR STICKY ON-SCROLL
  const navbar = document.getElementById("mainNavbar");
  const sticky = navbar.offsetTop;

  function stickyNavbar() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("navbar-sticky");
    } else {
      navbar.classList.remove("navbar-sticky");
    }
  }

  window.onscroll = function () {
    stickyNavbar();
  };
});
// Mouse Follow Animation
// document.addEventListener("DOMContentLoaded", () => {
//   const circle = document.querySelector(".mouse-follow-circle");
//   const dot = document.querySelector(".mouse-follow-dot");

//   document.addEventListener("mousemove", (e) => {
//     requestAnimationFrame(() => {
//       circle.style.left = e.clientX + "px";
//       circle.style.top = e.clientY + "px";

//       dot.style.left = e.clientX + "px";
//       dot.style.top = e.clientY + "px";
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  // Active Link Highlighting
  const navLinks = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname;

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});

// FREQUENTLY ASKED QUESTIONS (FAQ)
document.addEventListener('DOMContentLoaded', () => {
  // FAQ Toggle Functionality
  const faqCards = document.querySelectorAll('.faq-card');

  faqCards.forEach(card => {
    const question = card.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = card.classList.contains('active');

      // Close all cards
      faqCards.forEach(c => c.classList.remove('active'));

      // Open clicked card if it wasn't active
      if (!isActive) {
        card.classList.add('active');
      }
    });
  });

  // Create floating particles
  const particles = document.querySelector('.faq-particles');

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 15 + 5;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;

    particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(221, 188, 147, ${Math.random() * 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${duration}s ${delay}s infinite;
        `;

    particles.appendChild(particle);
  }
});

// BACK TO TOP SCRIPT
document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
