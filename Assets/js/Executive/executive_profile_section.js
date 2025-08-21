// Enhanced Executive Profile Interactions
document.addEventListener("DOMContentLoaded", function () {
  initializeExecutiveProfiles();
});

function initializeExecutiveProfiles() {
  // Initialize card hover effects
  initializeCardHoverEffects();

  // Initialize profile buttons
  initializeProfileButtons();

  // Initialize load more functionality
  initializeLoadMore();

  // Initialize stagger animations
  initializeStaggerAnimations();

  // Initialize accessibility features
  initializeAccessibility();
}

// Card Hover Effects
function initializeCardHoverEffects() {
  const executiveCards = document.querySelectorAll(".executive-card");

  executiveCards.forEach((card, index) => {
    // Mouse enter effect
    card.addEventListener("mouseenter", function (e) {
      // Pause floating animation
      this.style.animationPlayState = "paused";

      // Add magnetic effect
      addMagneticEffect(this, e);

      // Trigger other cards to slightly fade
      executiveCards.forEach((otherCard, otherIndex) => {
        if (otherIndex !== index) {
          otherCard.style.opacity = "0.7";
          otherCard.style.transform = "scale(0.98)";
        }
      });
    });

    // Mouse leave effect
    card.addEventListener("mouseleave", function () {
      // Resume floating animation
      this.style.animationPlayState = "running";

      // Reset magnetic effect
      this.style.transform = "";

      // Reset other cards
      executiveCards.forEach((otherCard) => {
        otherCard.style.opacity = "1";
        otherCard.style.transform = "";
      });
    });

    // Mouse move effect for subtle tilt
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
    });
  });
}

// Magnetic Effect
function addMagneticEffect(element, event) {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;

  const moveX = x * 0.1;
  const moveY = y * 0.1;

  element.style.transform += ` translate(${moveX}px, ${moveY}px)`;
}

// Profile Button Interactions
function initializeProfileButtons() {
  const profileButtons = document.querySelectorAll(".view-profile-btn");

  profileButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const executiveId = this.getAttribute("data-executive");
      const card = this.closest(".executive-card");

      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      // Open executive modal or navigate to profile
      openExecutiveProfile(executiveId, card);
    });

    // Button hover effect
    button.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".btn-icon");
      if (icon) {
        icon.style.transform = "translateX(5px)";
      }
    });

    button.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".btn-icon");
      if (icon) {
        icon.style.transform = "translateX(0)";
      }
    });
  });
}

// Executive Profile Modal/Navigation
function openExecutiveProfile(executiveId, cardElement) {
  // Add loading state
  const button = cardElement.querySelector(".view-profile-btn");
  const originalText = button.querySelector(".btn-text").textContent;

  button.querySelector(".btn-text").textContent = "Loading...";
  button.disabled = true;

  // Simulate loading (replace with actual profile loading logic)
  setTimeout(() => {
    button.querySelector(".btn-text").textContent = originalText;
    button.disabled = false;

    // Here you can implement:
    // 1. Modal popup with detailed profile
    // 2. Navigation to dedicated profile page
    // 3. Expand card with more information

    console.log(`Opening profile for: ${executiveId}`);

    // Example: Show detailed modal
    showExecutiveModal(executiveId, cardElement);
  }, 800);
}

// Executive Modal (Basic Implementation)
function showExecutiveModal(executiveId, cardElement) {
  // Create modal backdrop
  const modalBackdrop = document.createElement("div");
  modalBackdrop.className = "executive-modal-backdrop";
  modalBackdrop.innerHTML = `
        <div class="executive-modal">
            <div class="modal-header">
                <h2>Executive Profile</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-content">
                <p>Detailed profile for ${executiveId} will be loaded here.</p>
                <p>This can include:</p>
                <ul>
                    <li>Full biography</li>
                    <li>Career history</li>
                    <li>Achievements and awards</li>
                    <li>Contact information</li>
                    <li>Recent activities</li>
                </ul>
            </div>
        </div>
    `;

  // Add modal styles
  modalBackdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

  const modal = modalBackdrop.querySelector(".executive-modal");
  modal.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

  // Add to DOM
  document.body.appendChild(modalBackdrop);

  // Animate in
  setTimeout(() => {
    modalBackdrop.style.opacity = "1";
    modal.style.transform = "scale(1)";
  }, 10);

  // Close functionality
  const closeBtn = modalBackdrop.querySelector(".modal-close");
  closeBtn.addEventListener("click", () => {
    modalBackdrop.style.opacity = "0";
    modal.style.transform = "scale(0.8)";
    setTimeout(() => {
      document.body.removeChild(modalBackdrop);
    }, 300);
  });

  // Close on backdrop click
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      closeBtn.click();
    }
  });
}

// Load More Functionality
function initializeLoadMore() {
  const loadMoreBtn = document.getElementById("loadMoreExecutives");
  const placeholderCards = document.querySelectorAll(".new-member-placeholder");

  if (loadMoreBtn && placeholderCards.length > 0) {
    loadMoreBtn.style.display = "flex";

    loadMoreBtn.addEventListener("click", function () {
      // Show placeholder cards (simulate loading new members)
      placeholderCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.display = "block";
          card.classList.add("show");
        }, index * 200);
      });

      // Hide load more button
      this.style.display = "none";
    });
  }
}

// Stagger Animations
function initializeStaggerAnimations() {
  const cards = document.querySelectorAll(
    ".executive-card:not(.new-member-placeholder)"
  );

  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;

    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(card);
  });
}

// Accessibility Features
function initializeAccessibility() {
  const cards = document.querySelectorAll(".executive-card");

  cards.forEach((card) => {
    // Add keyboard navigation
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute(
      "aria-label",
      `View profile for ${card.querySelector(".executive-name").textContent}`
    );

    // Keyboard event handlers
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const profileBtn = this.querySelector(".view-profile-btn");
        if (profileBtn) {
          profileBtn.click();
        }
      }
    });

    // Focus management
    card.addEventListener("focus", function () {
      this.style.outline = "2px solid var(--primary-color)";
      this.style.outlineOffset = "4px";
    });

    card.addEventListener("blur", function () {
      this.style.outline = "none";
    });
  });

  // Add skip link for screen readers
  addSkipLink();
}

// Skip Link for Accessibility
function addSkipLink() {
  const skipLink = document.createElement("a");
  skipLink.href = "#executive-profiles";
  skipLink.textContent = "Skip to Executive Profiles";
  skipLink.className = "skip-link";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s ease;
    `;

  skipLink.addEventListener("focus", function () {
    this.style.top = "6px";
  });

  skipLink.addEventListener("blur", function () {
    this.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Utility function to add new executive (for future use)
function addNewExecutive(executiveData) {
  const grid = document.querySelector(".executives-grid");
  const newCard = createExecutiveCard(executiveData);

  // Insert before placeholder cards
  const firstPlaceholder = grid.querySelector(".new-member-placeholder");
  if (firstPlaceholder) {
    grid.insertBefore(newCard, firstPlaceholder);
  } else {
    grid.appendChild(newCard);
  }

  // Animate in
  newCard.style.opacity = "0";
  newCard.style.transform = "translateY(30px) scale(0.8)";

  setTimeout(() => {
    newCard.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    newCard.style.opacity = "1";
    newCard.style.transform = "translateY(0) scale(1)";
  }, 100);

  // Re-initialize interactions for new card
  initializeCardInteractions(newCard);
}

// Create Executive Card (Template Function)
function createExecutiveCard(data) {
  const card = document.createElement("div");
  card.className = "executive-card";
  card.setAttribute("data-aos", "fade-up");

  card.innerHTML = `
        <div class="card-image-container">
            <img src="${data.image}" alt="${data.name}" class="executive-image">
            <div class="image-overlay">
                <div class="social-links">
                    ${
                      data.linkedin
                        ? `<a href="${data.linkedin}" class="social-link" aria-label="LinkedIn Profile"><i class="fab fa-linkedin-in"></i></a>`
                        : ""
                    }
                    ${
                      data.twitter
                        ? `<a href="${data.twitter}" class="social-link" aria-label="Twitter Profile"><i class="fab fa-twitter"></i></a>`
                        : ""
                    }
                    ${
                      data.email
                        ? `<a href="mailto:${data.email}" class="social-link" aria-label="Email Contact"><i class="fas fa-envelope"></i></a>`
                        : ""
                    }
                </div>
            </div>
            <div class="position-badge">${data.badgeTitle}</div>
        </div>
        
        <div class="card-content">
            <div class="executive-info">
                <h3 class="executive-name">${data.name}</h3>
                <span class="executive-title">${data.title}</span>
                <div class="position-indicator"></div>
            </div>
            
            <p class="executive-bio">${data.bio}</p>
            
            <div class="expertise-tags">
                ${data.expertise
                  .map((skill) => `<span class="tag">${skill}</span>`)
                  .join("")}
            </div>
            
            <div class="card-footer">
                <button class="view-profile-btn" data-executive="${data.id}">
                    <span class="btn-text">View Full Profile</span>
                    <span class="btn-icon">
                        <i class="fas fa-arrow-right"></i>
                    </span>
                </button>
            </div>
        </div>
    `;

  return card;
}

// Initialize interactions for a specific card
function initializeCardInteractions(card) {
  // Add hover effects
  const profileBtn = card.querySelector(".view-profile-btn");
  if (profileBtn) {
    profileBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const executiveId = this.getAttribute("data-executive");
      openExecutiveProfile(executiveId, card);
    });
  }

  // Add accessibility features
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute(
    "aria-label",
    `View profile for ${card.querySelector(".executive-name").textContent}`
  );
}

// Performance optimization: Lazy load images
function initializeLazyLoading() {
  const images = document.querySelectorAll(".executive-image");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });
}

// Search and Filter Functionality (for future enhancement)
function initializeSearchFilter() {
  const searchInput = document.getElementById("executiveSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      filterExecutives(searchTerm);
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filterType = this.getAttribute("data-filter");
      filterByType(filterType);
    });
  });
}

function filterExecutives(searchTerm) {
  const cards = document.querySelectorAll(
    ".executive-card:not(.new-member-placeholder)"
  );

  cards.forEach((card) => {
    const name = card
      .querySelector(".executive-name")
      .textContent.toLowerCase();
    const title = card
      .querySelector(".executive-title")
      .textContent.toLowerCase();
    const bio = card.querySelector(".executive-bio").textContent.toLowerCase();

    const matches =
      name.includes(searchTerm) ||
      title.includes(searchTerm) ||
      bio.includes(searchTerm);

    if (matches) {
      card.style.display = "block";
      card.style.opacity = "1";
    } else {
      card.style.opacity = "0.3";
      setTimeout(() => {
        if (
          !card
            .querySelector(".executive-name")
            .textContent.toLowerCase()
            .includes(searchTerm)
        ) {
          card.style.display = "none";
        }
      }, 300);
    }
  });
}

// Export functions for external use
window.ExecutiveProfiles = {
  addNewExecutive,
  createExecutiveCard,
  openExecutiveProfile,
  filterExecutives,
};

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  initializeExecutiveProfiles();
  initializeLazyLoading();

  // Optional: Initialize search/filter if elements exist
  if (document.getElementById("executiveSearch")) {
    initializeSearchFilter();
  }
});
