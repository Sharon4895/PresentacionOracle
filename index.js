document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // Active Navigation Link Highlighting on Scroll
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if ('IntersectionObserver' in window) {
    const navObserverOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the sweet spot of screen
      threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');

          // Remove active class from all links
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, navObserverOptions);

    sections.forEach(section => {
      navObserver.observe(section);
    });
  }

  // ==========================================================================
  // Scroll Reveal Animations (Intersection Observer)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal-element');

  if ('IntersectionObserver' in window) {
    const revealObserverOptions = {
      root: null,
      rootMargin: '0px 0px 50px 0px', // Reveal elements slightly before they enter the viewport to avoid delay
      threshold: 0.05
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // If the revealed element contains skill-progress bars, animate them
          if (entry.target.id === 'quien-soy' || entry.target.querySelector('.skill-progress')) {
            animateSkills();
          }

          // Unobserve once revealed to keep performance high
          observer.unobserve(entry.target);
        }
      });
    }, revealObserverOptions);

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for browsers that do not support IntersectionObserver
    revealElements.forEach(el => {
      el.classList.add('visible');
    });
    animateSkills();
  }

  // ==========================================================================
  // Skills Tabs Component
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active to current
      btn.classList.add('active');
      const tabId = `tab-${btn.getAttribute('data-tab')}`;
      const activeTab = document.getElementById(tabId);
      if (activeTab) {
        activeTab.classList.add('active');
        if (btn.getAttribute('data-tab') === 'tech') {
          animateSkills();
        }
      }
    });
  });

  // Skill Bar Animations
  function animateSkills() {
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
      const targetWidth = bar.parentElement.previousElementSibling.lastElementChild.textContent;
      bar.style.width = targetWidth;
    });
  }
});
