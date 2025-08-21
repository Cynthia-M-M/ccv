// Gallery Slider functionality
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide-item");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const progressBar = document.querySelector(".progress-bar");

  let currentIndex = 0;
  const slideWidth = slides[0].offsetWidth + 32; // Including gap

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentIndex);
    });

    // Update progress bar
    const progress = ((currentIndex + 1) / slides.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  });

  // Auto slide every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }, 5000);

  // Initial setup
  updateSlider();
});

// Collection Gallery functionality
document.addEventListener("DOMContentLoaded", () => {
  const collections = {
    "ceo-conclave-2025": {
      title: "CEO CONCLAVE & INVESTORS DINNER 2025",
      description: "Theme: Global Business Synergies, Pioneering Innovation and Sustainable Investments for a Resilient Future",
      images: [
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-09-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-061-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-062-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-067-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-074-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-079-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-08-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-084-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-091-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-106-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-115-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-116-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-119-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-137-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-14-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-18-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-20-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-228-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-232-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-233-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-332-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-36-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-376-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
        {
          src: "/Assets/images/Events/2025/CONCLAVE/CEO CONCLAVE-407-min.jpg",
          caption: "CEO CONCLAVE 2025",
        },
      ],
    },
    "asf": {
      title: "Asia Smart Farming",
      description: "Pesticide-Free Farming for a Healthier Nation ",
      images: [
        {
          src: "/Assets/images/Events/2024/ASF.jpg",
          caption: "ASF 2024",
        },
        {
          src: "/Assets/images/Events/2024/lastminute2.jpg",
          caption: "ASF 2024",
        },
        {
          src: "/Assets/images/Events/2024/lastminute8.jpg",
          caption: "ASF 2024",
        },
      ],
    },
    "annual-summit": {
      title: "Annual Summit 2023",
      description: "CEO Conclave & Investors Dinner in Nairobi",
      images: [
        {
          src: "/Assets/images/carousel/conclave1.jpg",
          caption: "Opening Ceremony - CEO Conclave 2023",
        },
        {
          src: "/Assets/images/carousel/IMG-20230316-WA0000.jpg",
          caption: "Keynote Address",
        },
        {
          src: "/Assets/images/carousel/IMG-20230316-WA0011.jpg",
          caption: "Networking Session",
        },
      ],
    },
    "asian-forum": {
      title: "Asian Business Forum",
      description: "Smart Farming Initiative in Malaysia",
      images: [
        {
          src: "/Assets/images/carousel/asia.jpg",
          caption: "Smart Farming Presentation",
        },
        {
          src: "/Assets/images/carousel/asia1.jpg",
          caption: "Technology Exhibition",
        },
      ],
    },
    partnerships: {
      title: "Partnership Signing",
      description: "Strategic Alliances Across Continents",
      images: [
        {
          src: "/Assets/images/carousel/hillary.jpg",
          caption: "MOU Signing Ceremony",
        },
        {
          src: "/Assets/images/carousel/planting.jpg",
          caption: "Joint Initiative Launch",
        },
      ],
    },
  };

  function createGalleryHTML(collectionId) {
    const collection = collections[collectionId];
    return collection.images
      .map(
        (img) =>
          `<a href="${img.src}" 
                data-fancybox="${collectionId}" 
                data-caption="${img.caption}">
                <img src="${img.src}" alt="${img.caption}">
            </a>`
      )
      .join("");
  }

  // Initialize collection click handlers
  document.querySelectorAll(".view-collection").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const collectionId = button.getAttribute("data-collection");
      Fancybox.show(
        collections[collectionId].images.map((img) => ({
          src: img.src,
          caption: img.caption,
          thumb: img.src,
        })),
        {
          Carousel: {
            infinite: false,
          },
          Thumbs: {
            autoStart: true,
          },
        }
      );
    });
  });
});

// Timeline Animation
document.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector(".timeline-progress");

  function updateProgress() {
    const windowHeight = window.innerHeight;
    const timelineTop = document.querySelector(".timeline-wrapper").offsetTop;
    const scrollPosition = window.scrollY;

    const progressHeight = Math.min(
      Math.max(
        ((scrollPosition + windowHeight - timelineTop) /
          document.querySelector(".timeline-wrapper").offsetHeight) *
        100,
        0
      ),
      100
    );

    progress.style.height = `${progressHeight}%`;
  }

  window.addEventListener("scroll", updateProgress);
  updateProgress();
});
