// Enhanced Webinar Alert Interaction
document.addEventListener('DOMContentLoaded', function () {
  const webinarAlert = document.querySelector('.upcoming-webinar-alert');
  const registerBtn = document.querySelector('.btn-webinar-register');

  if (webinarAlert && registerBtn) {
    // Add pulse effect on load
    setTimeout(() => {
      webinarAlert.classList.add('pulse-attention');
      setTimeout(() => {
        webinarAlert.classList.remove('pulse-attention');
      }, 1500);
    }, 2000);

    // Add hover effects
    webinarAlert.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px)';
    });

    webinarAlert.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });

    // Add click effect to register button
    registerBtn.addEventListener('mousedown', function () {
      this.style.transform = 'scale(0.95) translateX(5px)';
    });

    registerBtn.addEventListener('mouseup', function () {
      this.style.transform = 'scale(1) translateX(5px)';
    });

    registerBtn.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1) translateX(0)';
    });
  }

  // Calculate days until event for each event item
  const eventItems = document.querySelectorAll('.event-preview-item');
  eventItems.forEach(item => {
    const monthEl = item.querySelector('.month');
    const dayEl = item.querySelector('.day');

    if (monthEl && dayEl) {
      const month = monthEl.textContent;
      const day = dayEl.textContent;
      const year = '2025'; // Assuming all events are in 2025

      // Convert month abbreviation to number
      const monthMap = {
        'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
        'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
      };

      const eventDate = new Date(year, monthMap[month], parseInt(day));
      const today = new Date();

      // Calculate days difference
      const diffTime = eventDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Add "soon" badge if event is within 7 days
      if (diffDays >= 0 && diffDays <= 7) {
        const contentEl = item.querySelector('.event-preview-content');
        if (contentEl && !contentEl.querySelector('.soon-badge')) {
          const soonBadge = document.createElement('span');
          soonBadge.className = 'soon-badge';
          soonBadge.textContent = diffDays === 0 ? 'Today!' : (diffDays === 1 ? 'Tomorrow!' : `${diffDays} days`);
          contentEl.appendChild(soonBadge);
        }
      }
    }
  });

  // Add responsive behavior for very tall screens
  function adjustHeroHeight() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && window.innerHeight > 800 && window.innerWidth < 768) {
      heroSection.style.height = 'auto';
      heroSection.style.minHeight = '100vh';
    }
  }

  // Run on load and resize
  adjustHeroHeight();
  window.addEventListener('resize', adjustHeroHeight);
});

// Initialize Tilt.js for 3D card effect
VanillaTilt.init(document.querySelectorAll(".partner-card"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.5,
});

document.addEventListener("DOMContentLoaded", function () {
  // Lazy load videos when tab is clicked
  const videoTabs = document.querySelectorAll('[data-bs-toggle="pill"]');

  videoTabs.forEach((tab) => {
    tab.addEventListener("shown.bs.tab", function (event) {
      const targetPane = document.querySelector(
        event.target.getAttribute("data-bs-target")
      );
      const videos = targetPane.querySelectorAll("iframe[data-src]");

      videos.forEach((video) => {
        if (video.getAttribute("data-src")) {
          video.setAttribute("src", video.getAttribute("data-src"));
          video.removeAttribute("data-src");
        }
      });
    });
  });
});

// CTA Banner Tier Selection
document.addEventListener('DOMContentLoaded', function () {
  const tierOptions = document.querySelectorAll('.tier-option');

  if (tierOptions.length) {
    tierOptions.forEach(option => {
      option.addEventListener('click', function () {
        // Remove active class from all options
        tierOptions.forEach(opt => opt.classList.remove('active'));

        // Add active class to clicked option
        this.classList.add('active');

        // Check the radio button
        const radio = this.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        // Update CTA button text based on selection
        const selectedTier = this.dataset.tier;
        const ctaButton = document.querySelector('.action-buttons .btn-primary');

        if (ctaButton) {
          if (selectedTier === 'business') {
            ctaButton.innerHTML = 'Become a Business Member <i class="fas fa-arrow-right ms-2"></i>';
          } else if (selectedTier === 'individual') {
            ctaButton.innerHTML = 'Join as Individual Member <i class="fas fa-arrow-right ms-2"></i>';
          }
        }
      });
    });
  }

  // Add subtle animation to CTA banner
  const ctaBanner = document.querySelector('.cta-banner');
  if (ctaBanner) {
    window.addEventListener('scroll', function () {
      const bannerPosition = ctaBanner.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (bannerPosition < screenPosition) {
        ctaBanner.classList.add('animate-banner');
      }
    });
  }
});

// Initialize tilt effect on cards
VanillaTilt.init(document.querySelectorAll(".mission-card, .vision-card"), {
  max: 5,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
});

// Animate stats numbers
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
  const finalValue = stat.textContent;
  if (finalValue !== '∞') {
    let startValue = 0;
    const duration = 2000;
    const increment = parseInt(finalValue) / (duration / 16);

    const counter = setInterval(() => {
      startValue += increment;
      stat.textContent = Math.floor(startValue);

      if (startValue >= parseInt(finalValue)) {
        stat.textContent = finalValue;
        clearInterval(counter);
      }
    }, 16);
  }
});

// Team Section Interactions
document.addEventListener('DOMContentLoaded', function () {
  // Initialize vanilla-tilt for team cards if the library is loaded
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".team-card"), {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
    });
  }

  // Executive spotlight image parallax effect
  const executiveImage = document.querySelector('.executive-image');
  if (executiveImage) {
    window.addEventListener('scroll', function () {
      const scrollPosition = window.scrollY;
      const executivePosition = executiveImage.getBoundingClientRect().top + window.scrollY;
      const offset = (scrollPosition - executivePosition) * 0.1;

      if (offset > -100 && offset < 100) {
        executiveImage.style.transform = `translateY(${offset}px)`;
      }
    });
  }

  // Animate stats when in viewport
  const statValues = document.querySelectorAll('.stat-value');
  if (statValues.length) {
    const animateStats = function () {
      statValues.forEach(stat => {
        const statPosition = stat.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (statPosition < screenPosition) {
          if (!stat.classList.contains('animated')) {
            const targetValue = parseInt(stat.textContent);
            let currentValue = 0;
            const duration = 2000; // 2 seconds
            const increment = targetValue / (duration / 16); // 60fps

            const updateValue = function () {
              currentValue += increment;
              if (currentValue < targetValue) {
                stat.textContent = Math.ceil(currentValue) + (stat.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateValue);
              } else {
                stat.textContent = targetValue + (stat.textContent.includes('+') ? '+' : '');
              }
            };

            requestAnimationFrame(updateValue);
            stat.classList.add('animated');
          }
        }
      });
    };

    window.addEventListener('scroll', animateStats);
    // Initial check
    animateStats();
  }
});

// VIDEO GALLERY SECTION
document.addEventListener("DOMContentLoaded", () => {
  // Create floating particles
  const particles = document.querySelector(".floating-particles");
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particles.appendChild(particle);
  }

  // Lazy load videos when tab is clicked
  const videoTabs = document.querySelectorAll('[data-bs-toggle="pill"]');
  videoTabs.forEach((tab) => {
    tab.addEventListener("shown.bs.tab", (event) => {
      const target = document.querySelector(
        event.target.getAttribute("data-bs-target")
      );
      const videos = target.querySelectorAll("iframe[data-src]");
      videos.forEach((video) => {
        if (video.getAttribute("data-src")) {
          video.setAttribute("src", video.getAttribute("data-src"));
          video.removeAttribute("data-src");
        }
      });
    });
  });

  // Video click handler
  const videoCards = document.querySelectorAll(".video-card");
  const videoModal = document.getElementById("videoModal");
  const videoFrame = document.getElementById("videoFrame");

  videoCards.forEach((card) => {
    card.addEventListener("click", () => {
      const videoSrc = card.querySelector("iframe").src;
      // Add autoplay parameter to URL
      videoFrame.src = videoSrc + "&autoplay=1";
      const modal = new bootstrap.Modal(videoModal);
      modal.show();
    });
  });

  // Reset video when modal is closed
  videoModal.addEventListener("hidden.bs.modal", () => {
    videoFrame.src = "";
  });
});

// Logo Showcase Interactive Controls
document.addEventListener('DOMContentLoaded', function () {
  // Get all the logo tracks
  const logoTracks = document.querySelectorAll('.logo-track');
  const pauseBtn = document.querySelector('.pause-btn');
  const playBtn = document.querySelector('.play-btn');
  const speedSlider = document.querySelector('.speed-slider');

  // Store original animation durations
  const originalDurations = [];
  logoTracks.forEach(track => {
    const style = window.getComputedStyle(track);
    originalDurations.push(parseFloat(style.animationDuration));
  });

  // Pause button functionality
  if (pauseBtn) {
    pauseBtn.addEventListener('click', function () {
      logoTracks.forEach(track => {
        track.style.animationPlayState = 'paused';
      });
      pauseBtn.style.display = 'none';
      playBtn.style.display = 'flex';
    });
  }

  // Play button functionality
  if (playBtn) {
    playBtn.addEventListener('click', function () {
      logoTracks.forEach(track => {
        track.style.animationPlayState = 'running';
      });
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'flex';
    });
  }

  // Speed slider functionality
  if (speedSlider) {
    speedSlider.addEventListener('input', function () {
      const speedFactor = parseFloat(this.value);

      logoTracks.forEach((track, index) => {
        const newDuration = originalDurations[index] / speedFactor;
        track.style.animationDuration = `${newDuration}s`;
      });
    });
  }

  // Add interactive hover effects
  const logoCards = document.querySelectorAll('.logo-card');
  logoCards.forEach(card => {
    // Random rotation on hover
    card.addEventListener('mouseenter', function () {
      const randomRotation = Math.random() * 10 - 5; // Random value between -5 and 5
      this.style.transform = `translateY(-10px) rotate(${randomRotation}deg)`;
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  // Add intersection observer for animation optimization
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const marquee = entry.target.closest('.logo-marquee');
      if (marquee) {
        const track = marquee.querySelector('.logo-track');
        if (entry.isIntersecting) {
          track.style.animationPlayState = 'running';
        } else {
          track.style.animationPlayState = 'paused';
        }
      }
    });
  }, { threshold: 0.1 });

  // Observe all logo items
  logoCards.forEach(card => {
    observer.observe(card);
  });

  // Add a subtle parallax effect on mouse move
  const logoShowcase = document.querySelector('.logo-showcase');
  if (logoShowcase) {
    logoShowcase.addEventListener('mousemove', function (e) {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 20;

      logoTracks.forEach((track, index) => {
        const depth = index + 1;
        const translateX = moveX / depth;
        const translateY = moveY / depth;

        track.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    });

    logoShowcase.addEventListener('mouseleave', function () {
      logoTracks.forEach(track => {
        track.style.transform = '';
      });
    });
  }

  // Add random appearance animations on page load
  logoCards.forEach((card, index) => {
    const delay = 0.1 + (index * 0.05);
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8)';
    card.style.transition = `all 0.6s ease ${delay}s`;

    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
    }, 100);
  });
});