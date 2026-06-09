/* ==========================================================================
   G. Sriteja Gujjari Portfolio - Dynamic Scripting (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- Preloader ---
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
        
        // Trigger hero animations after preloader closes
        const heroReveals = document.querySelectorAll('#hero .reveal, #hero .reveal-left, #hero .reveal-right');
        heroReveals.forEach(el => {
          el.classList.add('active');
        });
      }, 500);
    }
  });

  // Fallback in case load event takes too long
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && preloader.style.display !== 'none') {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
        document.querySelectorAll('#hero .reveal, #hero .reveal-left, #hero .reveal-right').forEach(el => {
          el.classList.add('active');
        });
      }, 500);
    }
  }, 3000);

  // --- Scroll Progress Bar & Navigation Effects ---
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const backToTop = document.getElementById('back-to-top');
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Update scroll progress bar
    if (scrollProgressBar && height > 0) {
      const scrolled = (winScroll / height) * 100;
      scrollProgressBar.style.width = `${scrolled}%`;
    }

    // Toggle Back to Top button visibility
    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }

    // Header styling shift on scroll
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // --- Scroll Top Operation ---
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Mobile Hamburger Menu Drawer ---
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Auto-close menu drawer when navigation elements are clicked
    const navItems = document.querySelectorAll('.nav-link, .nav-cta');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }


  // --- Scroll Entrance Reveal (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // --- Active Link Highlight on Scroll ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    root: null,
    threshold: 0.35,
    rootMargin: '-80px 0px 0px 0px'
  });

  sections.forEach(sec => {
    activeLinkObserver.observe(sec);
  });

  // --- Statistical Numerical Counter Increment Animation ---
  const achievementsSection = document.getElementById('achievements');
  const statNumbers = document.querySelectorAll('.stat-number');
  let countsInitiated = false;

  const countObserver = new IntersectionObserver((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !countsInitiated) {
      countsInitiated = true;
      statNumbers.forEach(numEl => {
        const target = parseInt(numEl.getAttribute('data-target'), 10);
        const duration = 2000; // total duration 2 seconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let currentCount = 0;
        
        const countTimer = setInterval(() => {
          // Increment calculation
          const increment = Math.ceil(target / 40);
          currentCount += increment;
          
          if (currentCount >= target) {
            currentCount = target;
            clearInterval(countTimer);
            
            // Format labels custom for certain indices
            if (target === 500) {
              numEl.innerText = '500+';
            } else if (target === 45) {
              numEl.innerText = '45nm';
            } else if (target === 4) {
              numEl.innerText = '4+';
            } else {
              numEl.innerText = `${target}+`;
            }
          } else {
            numEl.innerText = currentCount;
          }
        }, stepTime);
      });
    }
  }, {
    root: null,
    threshold: 0.15
  });

  if (achievementsSection) {
    countObserver.observe(achievementsSection);
  }

  // --- Contact Form Submission & Feedback Dialog ---
  const contactForm = document.getElementById('contact-form');
  const feedbackModal = document.getElementById('feedback-modal');
  const senderNameSpan = document.getElementById('sender-name');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if (contactForm && feedbackModal && senderNameSpan) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Read form data
      const nameVal = document.getElementById('name').value.trim();
      const emailVal = document.getElementById('email').value.trim();
      const msgVal = document.getElementById('message').value.trim();

      if (nameVal && emailVal && msgVal) {
        senderNameSpan.innerText = nameVal;
        
        // Reset inputs
        contactForm.reset();
        
        // Show success modal
        feedbackModal.classList.add('show');
      }
    });
  }

  // Close feedback dialog
  if (closeModalBtn && feedbackModal) {
    closeModalBtn.addEventListener('click', () => {
      feedbackModal.classList.remove('show');
    });

    feedbackModal.addEventListener('click', (e) => {
      if (e.target === feedbackModal) {
        feedbackModal.classList.remove('show');
      }
    });
  }

  // --- GitHub Heatmap Generation ---
  const heatmapContainer = document.getElementById('github-heatmap');
  const contribCountEl = document.getElementById('github-contrib-count');
  
  if (heatmapContainer) {
    const username = 'sriteja123gujjari';
    
    // Fetch real contributions from public API proxy
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        if (data && data.contributions && data.contributions.length > 0) {
          // Update contributions total badge
          if (contribCountEl) {
            const currentYear = new Date().getFullYear();
            const yearTotal = data.total && data.total[currentYear] ? data.total[currentYear] : 0;
            const overallTotal = Object.values(data.total || {}).reduce((a, b) => a + b, 0);
            
            if (yearTotal > 0) {
              contribCountEl.innerText = `${yearTotal} this year`;
            } else if (overallTotal > 0) {
              contribCountEl.innerText = `${overallTotal} total`;
            }
          }
          
          // Render actual contributions
          renderHeatmap(data.contributions);
        } else {
          renderSimulatedHeatmap();
        }
      })
      .catch(error => {
        console.warn('Could not fetch real GitHub contributions, falling back to simulation:', error);
        renderSimulatedHeatmap();
      });

    function renderHeatmap(contributionsList) {
      heatmapContainer.innerHTML = '';
      // Show the last 28 weeks (196 days)
      const daysToShow = 28 * 7;
      const recentContributions = contributionsList.slice(-daysToShow);
      
      recentContributions.forEach(day => {
        const cell = document.createElement('div');
        cell.classList.add('heatmap-cell');
        
        // Level ranges from 0 to 4
        cell.classList.add(`lvl-${day.level}`);
        
        // Formatted date string and count
        const dateObj = new Date(day.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const text = day.count === 0 ? `No contributions on ${formattedDate}` : `${day.count} contributions on ${formattedDate}`;
        cell.setAttribute('title', text);
        
        heatmapContainer.appendChild(cell);
      });
    }

    function renderSimulatedHeatmap() {
      heatmapContainer.innerHTML = '';
      const totalCells = 28 * 7;
      for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('heatmap-cell');
        
        const dayOfWeek = i % 7;
        let rand = Math.random();
        
        let lvl = 0;
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          if (rand > 0.85) lvl = 1;
          else if (rand > 0.95) lvl = 2;
        } else {
          if (rand > 0.85) lvl = 4;
          else if (rand > 0.70) lvl = 3;
          else if (rand > 0.50) lvl = 2;
          else if (rand > 0.25) lvl = 1;
        }
        
        cell.classList.add(`lvl-${lvl}`);
        
        const contributions = lvl === 0 ? 'No contributions' : `${lvl * 2 + Math.floor(Math.random() * 3)} contributions`;
        cell.setAttribute('title', contributions);
        
        heatmapContainer.appendChild(cell);
      }
    }
  }

  // --- Hero Interactive Parallax Circuit Core ---
  const heroDesign = document.getElementById('hero-interactive-design');
  const circuitContainer = document.getElementById('circuit-container');
  
  if (heroDesign && circuitContainer) {
    heroDesign.addEventListener('mousemove', (e) => {
      const rect = heroDesign.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate rotation angles based on mouse offset (limit to max 15 degrees)
      const rotateX = -(y / rect.height) * 30;
      const rotateY = (x / rect.width) * 30;
      
      circuitContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    heroDesign.addEventListener('mouseleave', () => {
      // Smoothly reset position
      circuitContainer.style.transform = 'rotateX(0deg) rotateY(0deg)';
      circuitContainer.style.transition = 'transform 0.5s ease';
    });
    
    heroDesign.addEventListener('mouseenter', () => {
      circuitContainer.style.transition = 'transform 0.1s ease-out';
    });
  }
});
