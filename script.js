// ================================
// NAVIGATION SCROLL EFFECT
// ================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ================================
// MOBILE MENU
// ================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// ================================
// HERO CAROUSEL
// ================================
class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        // Button event listeners
        /*this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());*/
        
        // Indicator event listeners
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Pause on hover
        const carousel = document.querySelector('.hero-carousel');
        carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
        carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Touch swipe support
        this.addTouchSupport();
        
        // Start autoplay
        this.startAutoPlay();
    }
    
    goToSlide(index) {
        // Remove active class from current slide and indicator
        this.slides[this.currentIndex].classList.remove('active');
        this.indicators[this.currentIndex].classList.remove('active');
        
        // Update index
        this.currentIndex = index;
        
        // Add active class to new slide and indicator
        this.slides[this.currentIndex].classList.add('active');
        this.indicators[this.currentIndex].classList.add('active');
    }
    
    nextSlide() {
        let nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    previousSlide() {
        let prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    addTouchSupport() {
        const carousel = document.querySelector('.hero-carousel');
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
        
        this.handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        };
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
});

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});



// ================================
// LANGUAGES
// ================================



const langSelector = document.querySelector(".lang-selector");
const langCurrentFlag = document.querySelector(".lang-current img");

// Toggle dropdown
langSelector.querySelector(".lang-current").addEventListener("click", () => {
    langSelector.classList.toggle("open");
});

// Change language
langSelector.querySelectorAll(".lang-dropdown li").forEach(item => {
    item.addEventListener("click", () => {
        const lang = item.dataset.lang;

        loadLanguage(lang);
        updateLangUI(lang);

        langSelector.classList.remove("open");
    });
});

// Update flag icon
function updateLangUI(lang) {
    langCurrentFlag.src = `img/flag/${lang}.png`;
    langCurrentFlag.alt = lang.toUpperCase();
}

// Load saved language flag
const savedLang = localStorage.getItem("lang") || "es";
updateLangUI(savedLang);

// Close dropdown when clicking outside
document.addEventListener("click", e => {
    if (!langSelector.contains(e.target)) {
        langSelector.classList.remove("open");
    }
});


// ================================
// ACTIVE NAV LINK ON SCROLL
// ================================
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in animation
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ================================
// PERFORMANCE: LAZY LOAD IMAGES
// ================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ================================
// PRELOAD HERO IMAGES FOR CAROUSEL
// ================================
window.addEventListener('load', () => {
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    carouselSlides.forEach(slide => {
        const bgImage = slide.style.backgroundImage;
        if (bgImage) {
            const imageUrl = bgImage.slice(5, -2);
            const img = new Image();
            img.src = imageUrl;
        }
    });
});





// ================================
// TIMELINE
// ================================




  const section = document.querySelector('.timeline-section');
  const items = document.querySelectorAll('.timeline-item');
  const line = document.querySelector('.timeline-line');

  const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        line.style.width = '100%';

        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('show');
          }, index * 200);
        });

        observer2.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer2.observe(section);

console.log('🌊 blueEnergy Landing Page loaded successfully!');
