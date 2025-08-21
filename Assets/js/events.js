// ENHANCED FEATURED EVENTS SECTION
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }

  // Event filtering functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const eventCards = document.querySelectorAll(".event-card");
  const searchInput = document.getElementById("eventSearch");
  const eventsContainer = document.getElementById("eventsContainer");

  // Filter by category
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Filter events
      filterEvents(filterValue, searchInput.value.toLowerCase());
    });
  });

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const activeFilter = document
        .querySelector(".filter-btn.active")
        .getAttribute("data-filter");
      filterEvents(activeFilter, this.value.toLowerCase());
    });
  }

  // Combined filter function
  function filterEvents(category, searchTerm) {
    let visibleCount = 0;

    eventCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      const cardTitle = card.querySelector("h3").textContent.toLowerCase();
      const cardDescription = card.querySelector("p").textContent.toLowerCase();

      // Check if card matches both category and search term
      const matchesCategory = category === "all" || cardCategory === category;
      const matchesSearch =
        cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
        visibleCount++;

        // Add animation
        card.style.animation = "fadeIn 0.5s forwards";
      } else {
        card.style.display = "none";
      }
    });

    // Show empty state if no results
    checkEmptyState(visibleCount);
  }

  // Check if we need to show empty state
  function checkEmptyState(visibleCount) {
    // Remove existing empty state if it exists
    const existingEmptyState = document.querySelector(".empty-state");
    if (existingEmptyState) {
      existingEmptyState.remove();
    }

    // Add empty state if no visible events
    if (visibleCount === 0) {
      const emptyState = document.createElement("div");
      emptyState.className = "empty-state";
      emptyState.innerHTML = `
        <i class="far fa-calendar-times"></i>
        <h3>No events found</h3>
        <p>Try adjusting your filters or search criteria</p>
        <button class="btn-reset-filters">Reset Filters</button>
      `;

      eventsContainer.after(emptyState);

      // Add reset functionality
      document
        .querySelector(".btn-reset-filters")
        .addEventListener("click", function () {
          // Reset filter buttons
          document.querySelector('[data-filter="all"]').click();

          // Clear search
          if (searchInput) {
            searchInput.value = "";
            searchInput.dispatchEvent(new Event("input"));
          }
        });
    }
  }

  // Toggle view (grid/list)
  const viewButtons = document.querySelectorAll(".view-btn");

  viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active button
      viewButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const viewType = this.getAttribute("data-view");

      // Toggle container class
      if (viewType === "grid") {
        eventsContainer.classList.remove("list-view");
        eventsContainer.classList.add("grid-view");
      } else {
        eventsContainer.classList.remove("grid-view");
        eventsContainer.classList.add("list-view");
      }

      // Save preference to localStorage
      localStorage.setItem("eventsViewPreference", viewType);
    });
  });

  // Load saved view preference
  const savedViewPreference = localStorage.getItem("eventsViewPreference");
  if (savedViewPreference) {
    document.querySelector(`[data-view="${savedViewPreference}"]`).click();
  }

  // Reminder Button Functionality
  const reminderButtons = document.querySelectorAll(".btn-reminder");

  reminderButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const eventName = this.dataset.event;
      const eventCard = this.closest(".event-card");
      const eventTitle = eventCard.querySelector("h3").textContent;
      const eventDate = eventCard
        .querySelector(".event-date")
        .textContent.trim();
      const eventLocation = eventCard
        .querySelector(".event-meta span:first-child")
        .textContent.trim();

      // Toggle active state
      this.classList.toggle("active");

      // Add notification animation
      const icon = this.querySelector("i");
      icon.classList.remove("fa-bell");
      icon.classList.add("fa-check");

      setTimeout(() => {
        icon.classList.remove("fa-check");
        icon.classList.add("fa-bell");
      }, 2000);

      // Show notification
      showNotification(`Reminder set for: ${eventTitle}`);

      // Add to calendar functionality could be implemented here
      // For example, opening a modal with calendar options
    });
  });

  // Load More Button
  const loadMoreBtn = document.querySelector(".btn-load-more");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      // This would typically load more events from an API
      // For demo purposes, we'll just show a notification
      this.classList.add("loading");
      this.innerHTML = "<span>Loading...</span>";

      setTimeout(() => {
        this.classList.remove("loading");
        this.innerHTML =
          '<span>Load More Events</span><i class="fas fa-arrow-down"></i>';
        showNotification("All events loaded");
      }, 1500);
    });
  }

  // Share functionality
  document.querySelectorAll(".share-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const dropdown = this.nextElementSibling;

      // Close all other dropdowns
      document.querySelectorAll(".share-dropdown").forEach((d) => {
        if (d !== dropdown) {
          d.classList.remove("active");
        }
      });

      // Toggle current dropdown
      dropdown.classList.toggle("active");
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function () {
    document.querySelectorAll(".share-dropdown").forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  });

  // Prevent dropdown from closing when clicking inside it
  document.querySelectorAll(".share-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });

  // Social share links
  document.querySelectorAll(".share-dropdown a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const eventCard = this.closest(".event-card");
      const eventTitle = eventCard.querySelector("h3").textContent;
      const shareUrl = window.location.href;

      let shareLink = "";
      const platform = this.querySelector("i").className;

      if (platform.includes("linkedin")) {
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`;
      } else if (platform.includes("twitter")) {
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          eventTitle
        )}&url=${encodeURIComponent(shareUrl)}`;
      } else if (platform.includes("facebook")) {
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
      } else if (platform.includes("envelope")) {
        shareLink = `mailto:?subject=${encodeURIComponent(
          eventTitle
        )}&body=${encodeURIComponent(`Check out this event: ${shareUrl}`)}`;
      }

      if (shareLink) {
        window.open(shareLink, "_blank");
      }
    });
  });

  // Show notification function
  function showNotification(message) {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => {
      notification.remove();
    });

    // Create notification element
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;

    // Add to document
    document.body.appendChild(notification);

    // Remove after animation completes
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Add animation class for new elements
  function addFadeInAnimation() {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Call once on load
  addFadeInAnimation();

  // Calendar teaser button
  const calendarButton = document.querySelector(".btn-view-calendar");
  if (calendarButton) {
    calendarButton.addEventListener("click", function (e) {
      e.preventDefault();

      const targetSection = document.querySelector(this.getAttribute("href"));
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  }

  // Lazy load images for better performance
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");

          if (src) {
            img.src = src;
            img.removeAttribute("data-src");
          }

          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll(".event-image img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    document.querySelectorAll(".event-image img[data-src]").forEach((img) => {
      img.src = img.getAttribute("data-src");
    });
  }

  // Add hover effects for cards
  document.querySelectorAll(".event-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });

  // Add to calendar functionality
  document.querySelectorAll(".btn-reminder").forEach((button) => {
    button.addEventListener("click", function () {
      const eventCard = this.closest(".event-card");
      const eventTitle = eventCard.querySelector("h3").textContent;
      const dateText = eventCard
        .querySelector(".event-date")
        .textContent.trim();
      const locationText = eventCard
        .querySelector(".event-meta span:first-child")
        .textContent.trim();

      // Parse date from text (this is simplified - would need proper date parsing in production)
      const dateMatch = dateText.match(/(\d+)\s*([A-Za-z]+)\s*(\d+)?/);
      if (dateMatch) {
        const day = dateMatch[1];
        const month = getMonthNumber(dateMatch[2]);
        const year = dateMatch[3] || new Date().getFullYear();

        // Create date object (assuming event is at noon)
        const eventDate = new Date(year, month, day, 12, 0, 0);

        // Create calendar links
        createCalendarOptions(eventTitle, eventDate, locationText);
      }
    });
  });

  function getMonthNumber(monthName) {
    const months = {
      JAN: 0,
      FEB: 1,
      MAR: 2,
      APR: 3,
      MAY: 4,
      JUN: 5,
      JUL: 6,
      AUG: 7,
      SEP: 8,
      OCT: 9,
      NOV: 10,
      DEC: 11,
    };

    return months[monthName.substring(0, 3).toUpperCase()] || 0;
  }

  function createCalendarOptions(title, date, location) {
    // Create modal for calendar options
    const modal = document.createElement("div");
    modal.className = "calendar-modal";
    modal.innerHTML = `
      <div class="calendar-modal-content">
        <span class="close-modal">&times;</span>
        <h3>Add to Calendar</h3>
        <p>Event: ${title}</p>
        <div class="calendar-options">
          <a href="#" class="calendar-option" data-calendar="google">
            <i class="fab fa-google"></i>
            <span>Google Calendar</span>
          </a>
          <a href="#" class="calendar-option" data-calendar="outlook">
            <i class="fab fa-microsoft"></i>
            <span>Outlook</span>
          </a>
          <a href="#" class="calendar-option" data-calendar="apple">
            <i class="fab fa-apple"></i>
            <span>Apple Calendar</span>
          </a>
          <a href="#" class="calendar-option" data-calendar="ics">
            <i class="far fa-calendar-alt"></i>
            <span>Download .ics</span>
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles
    const style = document.createElement("style");
    style.textContent = `
      .calendar-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
      }
      
      .calendar-modal-content {
        background: white;
        border-radius: 15px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        position: relative;
      }
      
      .close-modal {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 24px;
        cursor: pointer;
        color: #888;
      }
      
      .calendar-options {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-top: 20px;
      }
      
      .calendar-option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 15px;
        border-radius: 10px;
        background: #f5f5f5;
        text-decoration: none;
        color: #333;
        transition: all 0.3s ease;
      }
      
      .calendar-option:hover {
        background: #DDBC93;
        color: #002233;
        transform: translateY(-3px);
      }
      
      .calendar-option i {
        font-size: 1.5rem;
      }
      
      @media (max-width: 576px) {
        .calendar-options {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(style);

    // Close modal functionality
    const closeBtn = modal.querySelector(".close-modal");
    closeBtn.addEventListener("click", function () {
      modal.remove();
    });

    // Close when clicking outside
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.remove();
      }
    });

    // Calendar option functionality
    const calendarOptions = modal.querySelectorAll(".calendar-option");
    calendarOptions.forEach((option) => {
      option.addEventListener("click", function (e) {
        e.preventDefault();

        const calendarType = this.getAttribute("data-calendar");
        const endDate = new Date(date);
        endDate.setHours(date.getHours() + 2); // Assume 2 hour event

        let calendarUrl = "";

        switch (calendarType) {
          case "google":
            calendarUrl = createGoogleCalendarUrl(
              title,
              date,
              endDate,
              location
            );
            window.open(calendarUrl, "_blank");
            break;

          case "outlook":
            calendarUrl = createOutlookCalendarUrl(
              title,
              date,
              endDate,
              location
            );
            window.open(calendarUrl, "_blank");
            break;

          case "apple":
            // For Apple Calendar, we'll use the .ics file
            downloadIcsFile(title, date, endDate, location);
            break;

          case "ics":
            downloadIcsFile(title, date, endDate, location);
            break;
        }

        modal.remove();
      });
    });
  }

  function createGoogleCalendarUrl(title, start, end, location) {
    const formatDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, "");
    };

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${formatDate(start)}/${formatDate(end)}&location=${encodeURIComponent(location)}&details=${encodeURIComponent("Event organized by AAMECC")}`;
  }

  function createOutlookCalendarUrl(title, start, end, location) {
    return `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
      title
    )}&location=${encodeURIComponent(location)}&startdt=${start.toISOString()}&enddt=${end.toISOString()}`;
  }

  function downloadIcsFile(title, start, end, location) {
    // This is a simplified version - in production you'd want to use a library like ics.js
    const formatDate = (date) => {
      return (
        date
          .toISOString()
          .replace(/-|:|\.\d+/g, "")
          .slice(0, -1) + "Z"
      );
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AAMECC//Events Calendar//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${title}
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
LOCATION:${location}
DESCRIPTION:Event organized by AAMECC
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});

// SPONSOR THE EVENT
document.addEventListener("DOMContentLoaded", function () {
  // Tier cards hover effect
  const tierCards = document.querySelectorAll(".tier-card");

  tierCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const glow = card.querySelector(".tier-glow");
      glow.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Sponsor logos animation
  const sponsorLogos = document.querySelectorAll(".sponsor-logo");

  sponsorLogos.forEach((logo) => {
    logo.addEventListener("mouseenter", () => {
      logo.style.animation = "pulse 1s ease";
    });

    logo.addEventListener("animationend", () => {
      logo.style.animation = "";
    });
  });

  // CTA buttons click handler
  const ctaButtons = document.querySelectorAll(".tier-cta");

  ctaButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tier = button.closest(".tier-card").querySelector("h3").textContent;
      openSponsorshipForm(tier);
    });
  });

  function openSponsorshipForm(tier) {
    // Implementation for sponsorship form modal
    console.log(`Opening sponsorship form for ${tier} tier`);
  }

  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
  });
});

// SPONSOR MODAL
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("sponsorModal");
  const sponsorForm = document.getElementById("sponsorForm");
  const closeBtn = document.querySelector(".close");
  const sponsorPackageSelect = document.getElementById("sponsorPackage");

  // Replace with your Apps Script Web App URL
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbw1ZLrFjtkpoQ59VbnBzPs5oA1deFtUPqOeoa1knrAkz8-YklrO2LgSJRC2WOFmJDhe/exec";

  // Add click handlers to all sponsor buttons
  document.querySelectorAll(".tier-cta").forEach((button) => {
    button.addEventListener("click", function () {
      const tierCard = this.closest(".tier-card");
      const tierType = tierCard.classList.contains("platinum")
        ? "Platinum"
        : tierCard.classList.contains("gold")
        ? "Gold"
        : "Silver";
      sponsorPackageSelect.value = tierType;
      modal.style.display = "block";
    });
  });

  // Close modal handlers
  closeBtn.onclick = () => (modal.style.display = "none");
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };

  // Handle form submission
  sponsorForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    // Add loading state
    submitBtn.classList.add("loading");
    submitBtn.innerHTML = ""; // Clear original text when loading starts

    const formData = {
      sponsorPackage: sponsorPackageSelect.value,
      companyName: document.getElementById("companyName").value,
      contactName: document.getElementById("contactName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
    };

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === "success") {
        // Show success message
        const successMsg = document.createElement("div");
        successMsg.className = "success-message";
        successMsg.textContent = "Registration submitted successfully!";
        document.body.appendChild(successMsg);

        // Trigger animation
        setTimeout(() => successMsg.classList.add("show"), 100);

        // Reset form and close modal
        sponsorForm.reset();
        modal.style.display = "none";

        // Remove success message after 3 seconds
        setTimeout(() => {
          successMsg.classList.remove("show");
          setTimeout(() => successMsg.remove(), 500);
        }, 3000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
      const successMsg = document.createElement("div");
      successMsg.className = "success-message";
      successMsg.style.background = "#e74c3c";
      successMsg.textContent =
        "Error processing registration. Please try again.";
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.classList.add("show"), 100);
      setTimeout(() => {
        successMsg.classList.remove("show");
        setTimeout(() => successMsg.remove(), 500);
      }, 3000);
    } finally {
      // Reset button state
      submitBtn.classList.remove("loading");
      submitBtn.textContent = originalText;
    }
  });
});

// FAQ'S
document.addEventListener("DOMContentLoaded", function () {
  const categoryBtns = document.querySelectorAll(".category-btn");
  const faqItems = document.querySelectorAll(".faq-item");
  const searchInput = document.getElementById("faqSearch");

  // Category filter
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;

      categoryBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (category === "all" || item.dataset.category === category) {
          item.style.display = "block";
          item.style.animation = "fadeIn 0.5s ease forwards";
        } else {
          item.style.display = "none";
        }

        // Reset answer height
        answer.style.height = "0";
        item.classList.remove("active");
      });
    });
  });

  // FAQ accordion with specific height animation
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-answer").style.height = "0";
        }
      });

      // Toggle current item
      item.classList.toggle("active");

      // Set specific height for animation
      if (!isActive) {
        answer.style.height = answer.scrollHeight + "px";
      } else {
        answer.style.height = "0";
      }
    });
  });

  // Search functionality with height reset
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();

    faqItems.forEach((item) => {
      const question = item.querySelector("h3").textContent.toLowerCase();
      const answer = item.querySelector(".faq-answer");

      if (question.includes(searchTerm)) {
        item.style.display = "block";
        item.style.animation = "fadeIn 0.5s ease forwards";
      } else {
        item.style.display = "none";
        // Reset answer height when hiding
        answer.style.height = "0";
        item.classList.remove("active");
      }
    });
  });

  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
  });
});
