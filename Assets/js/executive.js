document.addEventListener("DOMContentLoaded", () => {
  // Enhanced Counter Animation with Intersection Observer
  const createCounterAnimation = () => {
    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const duration = 2000;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOutQuart);

        counter.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(updateCounter);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            animateCounter(counter);
            observer.unobserve(counter);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    counters.forEach((counter) => {
      observer.observe(counter);
    });
  };

  // Smooth scroll for CTA buttons
  const initSmoothScroll = () => {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  };

  // Enhanced parallax effect for floating orbs
  const initParallaxEffects = () => {
    const orbs = document.querySelectorAll(".floating-orb");
    const gradientMesh = document.querySelector(".gradient-mesh");

    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      orbs.forEach((orb, index) => {
        const speed = 0.2 + index * 0.1;
        const yPos = -(scrolled * speed);
        const xPos = Math.sin(scrolled * 0.001 + index) * 20;

        orb.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
      });

      if (gradientMesh) {
        gradientMesh.style.transform = `translate3d(0, ${rate}px, 0)`;
      }

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestTick, { passive: true });
  };

  // Magnetic effect for buttons
  const initMagneticButtons = () => {
    const buttons = document.querySelectorAll(
      ".btn-primary-modern, .btn-secondary-modern"
    );

    buttons.forEach((button) => {
      button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const moveX = x * 0.1;
        const moveY = y * 0.1;

        button.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0, 0)";
      });
    });
  };

  // Animated text reveal
  const initTextReveal = () => {
    const titleLines = document.querySelectorAll(
      ".title-line, .title-highlight"
    );

    titleLines.forEach((line, index) => {
      const text = line.textContent;
      line.innerHTML = "";

      [...text].forEach((char, charIndex) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.opacity = "0";
        span.style.transform = "translateY(50px)";
        span.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
          charIndex * 0.03 + index * 0.2
        }s`;
        line.appendChild(span);
      });

      // Trigger animation
      setTimeout(() => {
        line.querySelectorAll("span").forEach((span) => {
          span.style.opacity = "1";
          span.style.transform = "translateY(0)";
        });
      }, 500 + index * 200);
    });
  };

  // Stats card hover effects
  const initStatsEffects = () => {
    const statCards = document.querySelectorAll(".stat-card");

    statCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        // Add ripple effect
        const ripple = document.createElement("div");
        ripple.className = "stat-ripple";
        ripple.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: radial-gradient(circle, rgba(221, 188, 147, 0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: rippleEffect 0.6s ease-out;
                    pointer-events: none;
                    z-index: 0;
                `;

        card.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Add ripple animation
    const style = document.createElement("style");
    style.textContent = `
            @keyframes rippleEffect {
                to {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  };

  // Performance optimization for animations
  const initPerformanceOptimizations = () => {
    // Reduce animations on low-end devices
    const isLowEndDevice =
      navigator.hardwareConcurrency <= 2 ||
      navigator.deviceMemory <= 2 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isLowEndDevice) {
      document.documentElement.style.setProperty(
        "--animation-duration",
        "0.2s"
      );

      // Disable complex animations
      const orbs = document.querySelectorAll(".floating-orb");
      orbs.forEach((orb) => {
        orb.style.animation = "none";
      });
    }

    // Pause animations when tab is not visible
    document.addEventListener("visibilitychange", () => {
      const orbs = document.querySelectorAll(".floating-orb");
      const gradientMesh = document.querySelector(".gradient-mesh");

      if (document.hidden) {
        orbs.forEach((orb) => (orb.style.animationPlayState = "paused"));
        if (gradientMesh) gradientMesh.style.animationPlayState = "paused";
      } else {
        orbs.forEach((orb) => (orb.style.animationPlayState = "running"));
        if (gradientMesh) gradientMesh.style.animationPlayState = "running";
      }
    });
  };

  // Intersection Observer for fade-in animations
  const initFadeInAnimations = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    // Observe elements that should fade in
    const fadeElements = document.querySelectorAll(
      ".hero-badge, .hero-stats-grid, .hero-cta-container"
    );
    fadeElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      observer.observe(el);
    });
  };

  // Touch device optimizations
  const initTouchOptimizations = () => {
    if ("ontouchstart" in window) {
      // Add touch-specific styles
      const style = document.createElement("style");
      style.textContent = `
                .btn-primary-modern:active,
                .btn-secondary-modern:active {
                    transform: scale(0.95);
                }
                
                .stat-card:active {
                    transform: scale(0.98);
                }
                
                /* Disable hover effects on touch devices */
                @media (hover: none) {
                    .stat-card:hover,
                    .btn-primary-modern:hover,
                    .btn-secondary-modern:hover {
                        transform: none;
                    }
                }
            `;
      document.head.appendChild(style);
    }
  };

  // Initialize all functions
  createCounterAnimation();
  initSmoothScroll();
  initParallaxEffects();
  initMagneticButtons();
  initTextReveal();
  initStatsEffects();
  initPerformanceOptimizations();
  initFadeInAnimations();
  initTouchOptimizations();

  // Initialize AOS with custom settings
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
      delay: 0,
    });
  }

  // Add loading state management
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");

    // Trigger initial animations
    setTimeout(() => {
      const heroElements = document.querySelectorAll(
        ".hero-badge, .hero-title-container, .hero-stats-grid, .hero-cta-container"
      );
      heroElements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, index * 200);
      });
    }, 300);
  });
});

// Add CSS for loading states
const loadingStyles = document.createElement("style");
loadingStyles.textContent = `
    body:not(.loaded) .hero-badge,
    body:not(.loaded) .hero-title-container,
    body:not(.loaded) .hero-stats-grid,
    body:not(.loaded) .hero-cta-container {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .hero-badge,
    .hero-title-container,
    .hero-stats-grid,
    .hero-cta-container {
        transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(loadingStyles);


// Enhanced Executive Overview functionality
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize all overview features
    initOverviewAnimations();
    initInteractiveElements();
    initCounterAnimations();
    initScrollTriggers();
    initAccessibilityFeatures();
    
    // Overview animations
    function initOverviewAnimations() {
        // Staggered text reveal for philosophy items
        const philosophyItems = document.querySelectorAll('.philosophy-item');
        
        philosophyItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 200 + (index * 150));
        });
        
        // Floating geometric shapes enhanced animation
        const geometricShapes = document.querySelectorAll('.floating-geometric');
        
        geometricShapes.forEach((shape, index) => {
            // Add mouse interaction
            shape.addEventListener('mouseenter', () => {
                shape.style.transform = 'scale(1.1) rotate(15deg)';
                shape.style.opacity = '0.8';
            });
            
            shape.addEventListener('mouseleave', () => {
                shape.style.transform = 'scale(1) rotate(0deg)';
                shape.style.opacity = '0.6';
            });
        });
    }
    
    // Interactive elements
    function initInteractiveElements() {
        // Philosophy item hover effects
        const philosophyItems = document.querySelectorAll('.philosophy-item');
        
        philosophyItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                // Add ripple effect
                createRippleEffect(item);
                
                // Enhance icon animation
                const icon = item.querySelector('.philosophy-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.15) rotate(10deg)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('.philosophy-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
        
        // Stat items interactive effects
        const statItems = document.querySelectorAll('.stat-item');
        
        statItems.forEach(item => {
            item.addEventListener('click', () => {
                // Add click animation
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.style.transform = 'translateY(-5px)';
                }, 150);
            });
        });
        
        // Value items progressive reveal
        const valueItems = document.querySelectorAll('.value-item');
        
        valueItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 1000 + (index * 200));
        });
    }
    
    // Enhanced counter animations with intersection observer
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    
                    animateCounter(counter, target);
                    counterObserver.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Smooth counter animation function
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60; // 60 frames for smooth animation
        const duration = 2000; // 2 seconds
        const stepTime = duration / 60;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
                
                // Add completion effect
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }
    
    // Scroll-triggered animations
    function initScrollTriggers() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                                      // Special handling for timeline items
                    if (entry.target.classList.contains('timeline-item')) {
                        const timelineYear = entry.target.querySelector('.timeline-year');
                        if (timelineYear) {
                            setTimeout(() => {
                                timelineYear.style.transform = 'scale(1.2)';
                                setTimeout(() => {
                                    timelineYear.style.transform = 'scale(1)';
                                }, 300);
                            }, 200);
                        }
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll(`
            .leadership-stats-container,
            .core-values-showcase,
            .timeline-preview,
            .timeline-item,
            .mission-statement
        `);
        
        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });
    }
    
    // Accessibility features
    function initAccessibilityFeatures() {
        // Add keyboard navigation for interactive elements
        const interactiveElements = document.querySelectorAll(`
            .philosophy-item,
            .stat-item,
            .value-item
        `);
        
        interactiveElements.forEach(element => {
            // Make elements focusable
            element.setAttribute('tabindex', '0');
            
            // Add keyboard event listeners
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
            
            // Add focus indicators
            element.addEventListener('focus', () => {
                element.style.outline = '3px solid #DDBC93';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = 'none';
            });
        });
        
        // Add ARIA labels for better screen reader support
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const label = stat.closest('.stat-item').querySelector('.stat-label').textContent;
            const description = stat.closest('.stat-item').querySelector('.stat-description').textContent;
            stat.setAttribute('aria-label', `${stat.textContent} ${label}. ${description}`);
        });
        
        // Add live region for counter updates
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.overflow = 'hidden';
        document.body.appendChild(liveRegion);
    }
    
    // Utility function for ripple effect
    function createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Enhanced parallax effect for background elements
    function initParallaxEffects() {
        const geometricShapes = document.querySelectorAll('.floating-geometric');
        
        const handleParallax = throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            geometricShapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.2);
                const yPos = -(scrolled * speed);
                shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
            });
        }, 10);
        
        window.addEventListener('scroll', handleParallax, { passive: true });
    }
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Intersection Observer for fade-in animations
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Apply fade-in animation to all major sections
    const fadeElements = document.querySelectorAll(`
        .section-badge,
        .section-title,
        .section-subtitle,
        .philosophy-title,
        .mission-statement,
        .stats-header
    `);
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        fadeInObserver.observe(el);
    });
    
    // Add loading state management
    function showLoadingState() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-ring"></div>
                <p>Loading Executive Overview...</p>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
        
        // Remove loading state after content is ready
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 300);
        }, 1000);
    }
    
    // Error handling for failed animations
    function handleAnimationErrors() {
        try {
            // Test for animation support
            const testElement = document.createElement('div');
            testElement.style.animation = 'test 1s';
            
            if (!testElement.style.animation) {
                // Fallback for browsers without animation support
                document.body.classList.add('no-animations');
            }
        } catch (error) {
            console.warn('Animation support detection failed:', error);
            document.body.classList.add('no-animations');
        }
    }
    
    // Initialize error handling
    handleAnimationErrors();
    
    // Add resize handler for responsive adjustments
    const handleResize = throttle(() => {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth < 992;
        
        // Adjust animations based on screen size
        if (isMobile) {
            document.body.classList.add('mobile-view');
            document.body.classList.remove('tablet-view', 'desktop-view');
        } else if (isTablet) {
            document.body.classList.add('tablet-view');
            document.body.classList.remove('mobile-view', 'desktop-view');
        } else {
            document.body.classList.add('desktop-view');
            document.body.classList.remove('mobile-view', 'tablet-view');
        }
        
        // Recalculate positions for floating elements
        const geometricShapes = document.querySelectorAll('.floating-geometric');
        geometricShapes.forEach(shape => {
            if (isMobile) {
                shape.style.opacity = '0.3';
            } else {
                shape.style.opacity = '0.6';
            }
        });
    }, 250);
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    // Add smooth scroll behavior for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Additional CSS for ripple effect and loading states
const additionalStyles = `
<style>
.ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(221, 188, 147, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.3s ease;
}

.loading-spinner {
    text-align: center;
    color: #002233;
}

.spinner-ring {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(221, 188, 147, 0.3);
    border-top: 4px solid #DDBC93;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

.no-animations * {
    animation: none !important;
    transition: none !important;
}

.mobile-view .floating-geometric {
    animation-duration: 30s;
}

.tablet-view .floating-geometric {
    animation-duration: 25s;
}

.desktop-view .floating-geometric {
    animation-duration: 20s;
}

/* Focus indicators for accessibility */
.philosophy-item:focus,
.stat-item:focus,
.value-item:focus {
    outline: 3px solid #DDBC93;
    outline-offset: 2px;
}

/* High contrast mode adjustments */
@media (prefers-contrast: high) {
    .ripple-effect {
        background: rgba(0, 34, 51, 0.5);
    }
    
    .spinner-ring {
        border-color: #002233;
        border-top-color: #88602D;
    }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
    .ripple-effect {
        animation: none;
        opacity: 0;
    }
    
    .spinner-ring {
        animation: none;
        border-top-color: #DDBC93;
    }
    
    .floating-geometric {
        animation: none;
    }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);