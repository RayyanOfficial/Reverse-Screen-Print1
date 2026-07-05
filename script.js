/**
 * Reverse Screen Print - Main JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation & Scroll States ---
  const header = document.querySelector('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownToggle = document.querySelector('.dropdown > .nav-link');
  const dropdownParent = document.querySelector('.dropdown');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  // Sticky Navbar on Scroll
  const handleScroll = () => {
    const scrolled = window.scrollY > 0;

    if (header) {
      header.classList.toggle('scrolled', scrolled);
    }

    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // Mobile Hamburger Toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isActive = menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });
  }

  // Mobile Services Sub-menu Toggle
  if (dropdownToggle && dropdownParent) {
    dropdownToggle.addEventListener('click', (e) => {
      // Toggle dropdown on mobile only
      if (window.innerWidth <= 992) {
        e.preventDefault();
        dropdownParent.classList.toggle('active');
      }
    });
  }

  // Active Nav Link Highlighting
  const currentPath = window.location.pathname;
  const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename) {
      link.classList.add('active');
      // If it's a dropdown link, also highlight the parent Services menu item
      if (link.classList.contains('dropdown-link') && dropdownToggle) {
        dropdownToggle.classList.add('active');
      }
    }
  });


  // =============================================================
  // SCROLL-REVEAL ANIMATION SYSTEM
  // Assigns data-reveal + data-delay to every meaningful element
  // then triggers via IntersectionObserver on viewport entry.
  // =============================================================

  /** Helper: set reveal attrs only if not already set */
  const rv = (el, dir, delay, slow) => {
    if (!el || el.hasAttribute('data-reveal')) return;
    el.setAttribute('data-reveal', dir);
    if (delay) el.setAttribute('data-delay', String(delay));
    if (slow)  el.setAttribute('data-slow', '');
  };

  /** Helper: stagger a NodeList */
  const rvList = (els, dirFn, delayFn, slow) => {
    els.forEach((el, i) => {
      if (el.hasAttribute('data-reveal')) return;
      el.setAttribute('data-reveal', typeof dirFn === 'function' ? dirFn(i) : dirFn);
      const d = typeof delayFn === 'function' ? delayFn(i) : delayFn;
      if (d) el.setAttribute('data-delay', String(d));
      if (slow) el.setAttribute('data-slow', '');
    });
  };

  const autoReveal = () => {

    // ── HOME PAGE HERO ─────────────────────────────────────────
    const heroCopyTop    = document.querySelector('.hero-copy-top');
    const heroCopyBottom = document.querySelector('.hero-copy-bottom');
    const heroVisual     = document.querySelector('.hero-visual');

    if (heroCopyTop) {
      rv(heroCopyTop.querySelector('h1'), 'fade-up', 100);
    }
    if (heroCopyBottom) {
      rv(heroCopyBottom.querySelector('.hero-subheading'), 'fade-up', 200);
      rv(heroCopyBottom.querySelector('.hero-description'),  'fade-up', 300);
      rv(heroCopyBottom.querySelector('.btn-group'),         'fade-up', 400);
      rv(heroCopyBottom.querySelector('.hero-arrows'),       'fade-up', 500);
    }
    rv(heroVisual, 'fade-left', 250, true);

    // ── PAGE HERO BANNER (all inner pages) ─────────────────────
    const svcHeader = document.querySelector('.service-header');
    if (svcHeader) {
      rv(svcHeader.querySelector('.feature-badge'), 'fade-down', 100);
      rv(svcHeader.querySelector('h1'),             'fade-up',   200);
      rv(svcHeader.querySelector('p'),              'fade-up',   300);
      rv(svcHeader.querySelector('.btn-group'),     'fade-up',   400);
    }

    // ── SECTION HEADINGS & HEADERS ─────────────────────────────
    document.querySelectorAll('.section-heading, .section-header').forEach(el => {
      if (el.hasAttribute('data-reveal')) return;
      rv(el.querySelector('.feature-badge'), 'fade-down', 0);
      rv(el.querySelector('h2'),             'fade-up',   80);
      rv(el.querySelector('p'),              'fade-up',   160);
      // Fallback: animate the container itself if no children matched
      if (!el.querySelector('[data-reveal]')) rv(el, 'fade-up', 0);
    });

    // Standalone feature-badge elements outside section-headers
    document.querySelectorAll('.feature-badge').forEach(el => rv(el, 'fade-down', 0));

    // ── INDEX: SERVICES PREVIEW CARDS ──────────────────────────
    rvList(
      document.querySelectorAll('.services-grid .service-card'),
      i => ['fade-up', 'fade-up', 'fade-up'][i % 3],
      i => 80 + (i % 3) * 80
    );

    // ── INDEX: WHY CHOOSE US ────────────────────────────────────
    rv(document.querySelector('.image-stack'), 'fade-scale', 0, true);
    rvList(
      document.querySelectorAll('.feature-grid .info-card'),
      'fade-up',
      i => 80 + i * 100
    );

    // ── INDEX: PORTFOLIO PREVIEW GRID ──────────────────────────
    rvList(
      document.querySelectorAll('.portfolio-preview-grid .portfolio-preview-card'),
      i => (i % 2 === 0 ? 'fade-left' : 'fade-right'),
      i => (i % 3) * 100
    );

    // ── INDEX: TESTIMONIALS ─────────────────────────────────────
    rvList(
      document.querySelectorAll('.testimonial-card'),
      'fade-up',
      i => 100 + i * 120
    );

    // ── SERVICE DETAIL PAGES: content grid ─────────────────────
    document.querySelectorAll('.service-content-header').forEach(el => rv(el, 'fade-up', 0));
    document.querySelectorAll('.service-mock-graphic').forEach(el => rv(el, 'fade-scale', 0, true));
    document.querySelectorAll('.service-content-body > p').forEach((el, i) => rv(el, 'fade-up', 80 + i * 80));
    document.querySelectorAll('.service-content-body .service-options-list').forEach(el => rv(el, 'fade-up', 200));
    document.querySelectorAll('.service-content-body .price-tag').forEach(el => rv(el, 'fade-up', 280));
    document.querySelectorAll('.service-content-body .btn-group').forEach(el => rv(el, 'fade-up', 340));

    // Tech spec cards (grid-2 on service pages)
    document.querySelectorAll('.service-grid ~ section .grid-2 .card, .container > .grid-2 .card').forEach((el, i) => {
      rv(el, i % 2 === 0 ? 'fade-right' : 'fade-left', i * 120, false);
    });

    // ── SERVICES PAGE: service listing cards ───────────────────
    rvList(
      document.querySelectorAll('.grid-3 .card'),
      i => ['fade-up', 'fade-scale-up', 'fade-up'][i % 3],
      i => (i % 3) * 100
    );
    rv(document.querySelector('.compare-container'), 'fade-up', 0);

    // ── ABOUT PAGE ──────────────────────────────────────────────
    // Story grid: copy top/bottom and visual
    rv(document.querySelector('.about-copy-top'),    'fade-right', 0);
    rv(document.querySelector('.about-copy-bottom'), 'fade-right', 100);
    rv(document.querySelector('.about-visual-stack'), 'fade-left', 80, true);
    rv(document.querySelector('.about-stats-block'), 'fade-up', 200);

    // Stat numbers animate individually
    rvList(
      document.querySelectorAll('.stat-number'),
      'fade-scale-up',
      i => i * 150
    );

    // Timeline
    rvList(
      document.querySelectorAll('.timeline-item'),
      i => (i % 2 === 0 ? 'fade-right' : 'fade-left'),
      i => i * 80
    );

    // Equipment cards
    rvList(
      document.querySelectorAll('.equipment-card'),
      'fade-scale-up',
      i => i * 120
    );

    // ── PORTFOLIO PAGE ──────────────────────────────────────────
    // Filter tabs
    rvList(
      document.querySelectorAll('.filter-btn'),
      'fade-down',
      i => i * 60
    );

    // Portfolio grid cards — staggered by row (3-col grid)
    rvList(
      document.querySelectorAll('.portfolio-grid .portfolio-item'),
      'fade-scale-up',
      i => (i % 3) * 100
    );

    // ── FAQ PAGE ────────────────────────────────────────────────
    rv(document.querySelector('.faq-list .form-group'), 'fade-down', 0);
    rvList(
      document.querySelectorAll('.faq-item'),
      'fade-up',
      i => Math.min(i * 50, 300)   // cap stagger at 300ms so last items aren't delayed too long
    );

    // ── CONTACT PAGE ────────────────────────────────────────────
    rv(document.querySelector('.contact-copy-top'),    'fade-right', 0);
    rv(document.querySelector('.contact-copy-bottom'), 'fade-right', 80);
    rv(document.querySelector('.contact-form-col'),    'fade-left',  80, true);
    rv(document.querySelector('.contact-img-mobile'),  'fade-scale', 120, true);

    // Contact info cards
    rvList(
      document.querySelectorAll('.contact-copy-bottom .card'),
      'fade-right',
      i => i * 80
    );

    // Map section
    rv(document.querySelector('.map-canvas'), 'fade-scale', 0, true);

    // ── QUOTE PAGE ──────────────────────────────────────────────
    rv(document.querySelector('.quote-dashboard'),    'fade-up', 0);
    rv(document.querySelector('#quote-form'),         'fade-right', 80);
    rv(document.querySelector('.summary-card'),       'fade-left', 160, true);
    rv(document.querySelector('.file-dropzone'),      'fade-up', 0);
    rvList(
      document.querySelectorAll('.placement-grid .placement-card'),
      'fade-scale-up',
      i => i * 60
    );

    // ── GENERIC: any remaining h2, h3 in content not yet tagged ─
    document.querySelectorAll('main h2, main h3').forEach(el => rv(el, 'fade-up', 0));

    // ── GENERIC: standalone p tags in content areas ─────────────
    document.querySelectorAll('main .container > p, main section > p').forEach(el => rv(el, 'fade-up', 80));

    // ── GENERIC: buttons not inside already-revealed parents ────
    document.querySelectorAll('main .btn-group').forEach(el => rv(el, 'fade-up', 200));
    document.querySelectorAll('main .neon-cta-box').forEach(el => rv(el, 'fade-up', 0));
    document.querySelectorAll('main .neon-cta-box .btn').forEach((el, i) => rv(el, 'fade-up', 100 + i * 80));

    // ── GENERIC: spec / tech cards anywhere ─────────────────────
    document.querySelectorAll('.card:not([data-reveal])').forEach((el, i) => {
      rv(el, 'fade-scale-up', (i % 4) * 80);
    });

    // ── FOOTER ──────────────────────────────────────────────────
    rvList(
      document.querySelectorAll('.footer-grid > div'),
      'fade-up',
      i => i * 80
    );
    rv(document.querySelector('.footer-bottom'), 'fade-up', 200);
  };

  autoReveal();

  // ── HERO / PAGE-BANNER: fire immediately on load (no scroll needed) ──
  const heroRevealOnLoad = () => {
    const immediateEls = document.querySelectorAll([
      '.hero-copy-top [data-reveal]',
      '.hero-copy-bottom [data-reveal]',
      '.hero-visual[data-reveal]',
      '.service-header [data-reveal]'
    ].join(', '));

    immediateEls.forEach(el => {
      // Double rAF so CSS transition has a frame to recognise the initial hidden state
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.classList.add('revealed');
        });
      });
    });
  };
  heroRevealOnLoad();

  // ── INTERSECTION OBSERVER: reveal on scroll ───────────────────
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -32px 0px'
    });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
  } else {
    // No IO support — show everything
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
  }

  // Legacy .fade-in-section support
  document.querySelectorAll('.fade-in-section').forEach(section => section.classList.add('is-visible'));

  // --- Scroll to Top ---
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Home Page Typewriter Effect ---
  const typingTarget = document.querySelector('.typing-target');
  if (typingTarget) {
    const phrases = [
      'Bold Screen Printing',
      'Custom Embroidery',
      'Ultra-HD DTF Transfers',
      'High-Impact Decals',
      'Heavy-Duty Banners'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typingTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Delete faster
      } else {
        typingTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150; // Type standard speed
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end of phrase
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Brief pause before typing next
      }

      setTimeout(typeEffect, typingSpeed);
    };

    setTimeout(typeEffect, 1000); // Initial delay
  }


  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isCurrentlyActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });

        // Toggle current item
        if (!isCurrentlyActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        }
      });
    }
  });


  // --- FAQ Filtering Search ---
  const faqSearch = document.getElementById('faq-search');
  if (faqSearch) {
    faqSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      faqItems.forEach(item => {
        const questionText = item.querySelector('.faq-question').textContent.toLowerCase();
        const answerText = item.querySelector('.faq-answer-content').textContent.toLowerCase();
        
        if (questionText.includes(query) || answerText.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }


  // --- Portfolio Filtering ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active class on tabs
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'flex';
            // Subtle fade-in animation
            item.style.opacity = '0';
            setTimeout(() => {
              item.style.opacity = '1';
            }, 50);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }


  // --- Portfolio Lightbox Zoom ---
  const lightbox = document.querySelector('.lightbox-modal');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxImg = document.querySelector('.lightbox-img-pane img');
  const lightboxTag = document.querySelector('.lightbox-tag');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const lightboxDesc = document.querySelector('.lightbox-description p');
  const specGarment = document.getElementById('spec-garment');
  const specPrintType = document.getElementById('spec-printtype');
  const specColors = document.getElementById('spec-colors');
  const specTurnaround = document.getElementById('spec-turnaround');

  if (portfolioItems.length > 0 && lightbox) {
    const getPortfolioImageSource = (item) => {
      const imgEl = item.querySelector('img');
      if (imgEl && imgEl.src) return imgEl.src;

      const svgEl = item.querySelector('svg');
      if (svgEl) {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgEl);
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
      }

      return '';
    };

    portfolioItems.forEach(item => {
      // Find the clickable hover block or image overlay to open lightbox
      const clickTrigger = item.querySelector('.portfolio-image-wrapper') || item;
      
      clickTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Extract project specs from DOM elements of the card
        const img = getPortfolioImageSource(item);
        const tag = item.querySelector('.portfolio-item-tag')?.textContent || 'Project';
        const title = item.querySelector('.portfolio-item-title')?.textContent || 'Featured Project';
        
        // Custom dataset attributes stored on the card for detailed view
        const description = item.getAttribute('data-desc') || 'High-quality printing setup showing our standard detail options.';
        const garmentVal = item.getAttribute('data-garment') || 'Standard blanks';
        const printVal = item.getAttribute('data-print') || 'Screen Print';
        const colorsVal = item.getAttribute('data-colors') || 'Full Color';
        const turnaroundVal = item.getAttribute('data-turnaround') || '7-10 Business Days';

        // Load into Lightbox elements
        if (lightboxImg) lightboxImg.src = img;
        if (lightboxTag) lightboxTag.textContent = tag;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxDesc) lightboxDesc.textContent = description;
        
        if (specGarment) specGarment.textContent = garmentVal;
        if (specPrintType) specPrintType.textContent = printVal;
        if (specColors) specColors.textContent = colorsVal;
        if (specTurnaround) specTurnaround.textContent = turnaroundVal;

        // Open Lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close on button click
    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close on dark backdrop click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }


  // --- Interactive Placement Selector (Quote Form) ---
  const placementCards = document.querySelectorAll('.placement-card');
  placementCards.forEach(card => {
    const checkbox = card.querySelector('input[type="checkbox"]');
    if (checkbox) {
      card.addEventListener('click', (e) => {
        // Prevent toggle running twice if clicking the inner checkbox itself
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        card.classList.toggle('selected', checkbox.checked);
        
        // Trigger quote recalculation if calculator function exists
        if (typeof calculateQuotePrice === 'function') {
          calculateQuotePrice();
        }
      });
    }
  });


  // --- Interactive Custom Quote Price Estimator ---
  const productSelect = document.getElementById('calc-product');
  const quantityInput = document.getElementById('calc-qty');
  const colorsSelect = document.getElementById('calc-colors');
  const summaryProduct = document.getElementById('summary-product-val');
  const summaryQty = document.getElementById('summary-qty-val');
  const summaryPricePerUnit = document.getElementById('summary-unit-price');
  const summaryPlacements = document.getElementById('summary-placements');
  const summarySetupFee = document.getElementById('summary-setup-fee');
  const summaryTotal = document.getElementById('summary-total-price');

  window.calculateQuotePrice = () => {
    if (!productSelect || !quantityInput) return;

    const productType = productSelect.value;
    const quantity = parseInt(quantityInput.value) || 0;
    const colors = parseInt(colorsSelect ? colorsSelect.value : 1) || 1;

    // 1. Get base garments cost
    let baseUnitCost = 0;
    let setupFeePerPlacement = 20.00; // Screen setup fee
    
    switch (productType) {
      case 't-shirt':
        baseUnitCost = 6.50;
        break;
      case 'hoodie':
        baseUnitCost = 18.00;
        break;
      case 'cap':
        baseUnitCost = 8.00;
        setupFeePerPlacement = 25.00; // Embroidery digitizing fee
        break;
      case 'banner':
        baseUnitCost = 35.00;
        setupFeePerPlacement = 0.00; // Digital printing setup
        break;
      case 'card':
        baseUnitCost = 0.15;
        setupFeePerPlacement = 10.00;
        break;
      case 'sticker':
        baseUnitCost = 0.80;
        setupFeePerPlacement = 5.00;
        break;
      default:
        baseUnitCost = 5.00;
    }

    // 2. Count checked print placement locations
    const checkedPlacements = [];
    document.querySelectorAll('.placement-card input[type="checkbox"]:checked').forEach(chk => {
      checkedPlacements.push(chk.value);
    });

    const numPlacements = Math.max(1, checkedPlacements.length); // At least 1 print area
    
    // 3. Print decoration cost calculation (quantity scale discounts)
    let printCostPerUnit = 0;
    
    if (productType === 't-shirt' || productType === 'hoodie') {
      // Screen printing scaling
      if (quantity < 12) {
        printCostPerUnit = 5.00 * numPlacements + (colors * 1.50);
      } else if (quantity < 36) {
        printCostPerUnit = 3.50 * numPlacements + (colors * 1.00);
      } else if (quantity < 72) {
        printCostPerUnit = 2.50 * numPlacements + (colors * 0.70);
      } else if (quantity < 144) {
        printCostPerUnit = 1.80 * numPlacements + (colors * 0.50);
      } else {
        printCostPerUnit = 1.20 * numPlacements + (colors * 0.35);
      }
    } else if (productType === 'cap') {
      // Embroidery pricing (digitized stitches scale)
      printCostPerUnit = 4.50 * numPlacements;
      if (quantity >= 50) printCostPerUnit *= 0.85;
      if (quantity >= 100) printCostPerUnit *= 0.70;
    } else {
      // Banners, business cards, stickers (flat-rate offset/digital scale)
      if (quantity >= 500) printCostPerUnit = baseUnitCost * 0.2;
      else if (quantity >= 250) printCostPerUnit = baseUnitCost * 0.15;
      else if (quantity >= 100) printCostPerUnit = baseUnitCost * 0.1;
    }

    // Unit calculations
    const unitPrice = baseUnitCost + printCostPerUnit;
    const itemsTotal = unitPrice * quantity;
    
    // Setup calculations
    const setupFee = (checkedPlacements.length > 0 ? checkedPlacements.length : 1) * setupFeePerPlacement;
    
    const totalPrice = itemsTotal + setupFee;

    // --- Update UI Summary Card ---
    if (summaryProduct) {
      const capitalized = productType.charAt(0).toUpperCase() + productType.slice(1);
      summaryProduct.textContent = capitalized;
    }
    if (summaryQty) {
      summaryQty.textContent = quantity > 0 ? quantity : '0';
    }
    if (summaryPricePerUnit) {
      summaryPricePerUnit.textContent = quantity > 0 ? `$${unitPrice.toFixed(2)}` : '$0.00';
    }
    if (summaryPlacements) {
      summaryPlacements.textContent = checkedPlacements.length > 0 
        ? checkedPlacements.map(p => p.toUpperCase()).join(', ') 
        : 'FRONT';
    }
    if (summarySetupFee) {
      summarySetupFee.textContent = quantity > 0 ? `$${setupFee.toFixed(2)}` : '$0.00';
    }
    if (summaryTotal) {
      summaryTotal.textContent = quantity > 0 ? `$${totalPrice.toFixed(2)}` : '$0.00';
    }
  };

  // Bind live calculation listeners
  if (productSelect && quantityInput) {
    productSelect.addEventListener('change', calculateQuotePrice);
    quantityInput.addEventListener('input', calculateQuotePrice);
    if (colorsSelect) colorsSelect.addEventListener('change', calculateQuotePrice);
    
    // Initial cost run
    calculateQuotePrice();
  }


  // --- Mock File Drag & Drop Upload ---
  const dropzone = document.getElementById('file-dropzone');
  const fileInput = document.getElementById('calc-file');
  const dropzoneText = document.querySelector('.file-dropzone p');

  if (dropzone && fileInput) {
    // Click triggers hidden input
    dropzone.addEventListener('click', () => fileInput.click());
    
    // Highlight dropzone on drag states
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      }, false);
    });

    // Drop files
    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      handleFiles(files);
    });

    // Selection changes
    fileInput.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });

    function handleFiles(files) {
      if (files.length > 0) {
        const file = files[0];
        if (dropzoneText) {
          dropzoneText.innerHTML = `<strong>Selected File:</strong> ${file.name} (${(file.size / 1024).toFixed(1)} KB) <br><span style="color:var(--primary)">Click or drag again to change files.</span>`;
        }
      }
    }
  }


  // --- Newsletter Signup Form Validation ---
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      if (emailInput && emailInput.value) {
        const email = emailInput.value;
        emailInput.value = '';
        alert(`Awesome! You've subscribed to our mailing list: ${email}. Stay tuned for exclusive print drops and discounts!`);
      }
    });
  }


  // --- Shared Form Validation ---
  const validateField = (field, message) => {
    const value = field.value.trim();
    if (!value) {
      field.classList.add('is-invalid');
      const error = field.parentElement.querySelector('.field-error');
      if (error) error.textContent = message;
      return false;
    }
    field.classList.remove('is-invalid');
    const error = field.parentElement.querySelector('.field-error');
    if (error) error.textContent = '';
    return true;
  };

  // --- Contact Form Submission Simulation ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name');
      const email = document.getElementById('contact-email');
      const message = document.getElementById('contact-message');
      const formStatus = document.createElement('div');
      formStatus.className = 'form-status';

      const isNameValid = validateField(name, 'Please enter your name.');
      const isEmailValid = validateField(email, 'Please enter your email.');
      const isMessageValid = validateField(message, 'Please include a message.');

      if (contactForm.querySelector('.form-status')) {
        contactForm.querySelector('.form-status').remove();
      }

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        contactForm.prepend(formStatus);
        formStatus.textContent = 'Please complete all required fields before sending.';
        return;
      }

      const formParent = contactForm.parentElement;
      contactForm.style.display = 'none';

      const successDiv = document.createElement('div');
      successDiv.className = 'form-success';
      successDiv.innerHTML = `
        <svg style="width: 60px; height: 60px; stroke: var(--primary); margin: 0 auto 20px auto; fill: none;" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <h3 class="neon-cyan" style="margin-bottom:15px">Message Sent Successfully!</h3>
        <p style="margin-bottom:25px">Thank you for reaching out, <strong>${name.value.trim()}</strong>. One of our print experts will contact you at <strong>${email.value.trim()}</strong> within 24 hours.</p>
        <button class="btn btn-outline-cyan" onclick="window.location.reload()">Send Another Message</button>
      `;
      formParent.appendChild(successDiv);
    });
  }

  // --- Quote Form Submission ---
  const quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameField  = document.getElementById('calc-name');
      const emailField = document.getElementById('calc-email');
      const phoneField = document.getElementById('calc-phone');
      const product    = document.getElementById('calc-product') ? document.getElementById('calc-product').value : '';
      const quantity   = document.getElementById('calc-qty')     ? document.getElementById('calc-qty').value     : 0;

      if (quoteForm.querySelector('.form-status')) {
        quoteForm.querySelector('.form-status').remove();
      }

      const isNameValid  = validateField(nameField,  'Please enter your name.');
      const isEmailValid = validateField(emailField, 'Please enter your email.');
      const isPhoneValid = validateField(phoneField, 'Please enter a phone number.');

      if (!isNameValid || !isEmailValid || !isPhoneValid) {
        const status = document.createElement('div');
        status.className = 'form-status';
        status.textContent = 'Please complete the required contact details before submitting.';
        quoteForm.prepend(status);
        return;
      }

      // Show success UI
      const name  = nameField.value.trim();
      const email = emailField.value.trim();
      const dashboard = document.querySelector('.quote-dashboard');
      if (dashboard) {
        dashboard.style.display = 'none';
        const successDiv = document.createElement('div');
        successDiv.className = 'card magenta-hover';
        successDiv.style.cssText = 'padding:60px;text-align:center;border-color:var(--secondary);box-shadow:var(--glow-magenta);max-width:700px;margin:40px auto;';
        successDiv.innerHTML = `
          <svg style="width:70px;height:70px;stroke:var(--secondary);margin:0 auto 20px auto;fill:none;" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h2 class="neon-magenta" style="margin-bottom:20px">Quote Request Submitted!</h2>
          <p style="margin-bottom:30px">Thank you, <strong>${name}</strong>! We've received your specs for <strong>${quantity} x ${product.toUpperCase()}s</strong>. A custom digital mockup and finalized quote will be sent to <strong>${email}</strong> shortly.</p>
          <div style="display:flex;justify-content:center;gap:20px;">
            <a href="portfolio.html" class="btn btn-cyan">Explore Portfolio</a>
            <button class="btn btn-outline-magenta" onclick="window.location.reload()">Start New Estimate</button>
          </div>
        `;
        dashboard.parentElement.appendChild(successDiv);
      }
    });
  }
});
