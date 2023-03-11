(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function (e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function () {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function () {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Blog isotope and filter
   */

  window.addEventListener('load', () => {
    let blogContainer = select('.blog-container');
    if (blogContainer) {
      let blogIsotope = new Isotope(blogContainer, {
        itemSelector: '.blog-item',
        layoutMode: 'fitRows'
      });

      let blogFilters = select('#blog-flters li', true);

      on('click', '#blog-flters li', function (e) {
        e.preventDefault();
        blogFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        blogIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate blog lightbox 
   */
  const blogLightbox = GLightbox({
    selector: '.blog-lightbox'
  });

  /**
   * Initiate blog details lightbox 
   */
  const blogDetailsLightbox = GLightbox({
    selector: '.blog-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Blog details slider
   */
  new Swiper('.blog-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Dark, Light, Psycodelic Mode switcher
   */

  const body = document.querySelector('body');

  document.getElementById('toggle-button2').addEventListener('click', () => {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
    body.setAttribute('class', 'dark-theme');
  })

  document.getElementById('toggle-button').addEventListener('click', () => {
    document.documentElement.setAttribute('data-bs-theme', 'light')
    body.setAttribute('class', 'light-theme');
  })

  document.getElementById('toggle-button3').addEventListener('click', () => {
    document.documentElement.setAttribute('data-bs-theme', 'light')
    body.setAttribute('class', 'psycodelic-theme');
  })

  /**
   * Form checker
   */
  
  const fields = [
    { id: 'subject', regex: null, errorMsg: "This field can't be empty" },
    { id: 'cc', regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, errorMsg: 'A valid mail must be set in this field.' },
    { id: 'message', regex: null, errorMsg: 'This field can be emptied' }
  ];
  
  function addFieldListener(field) {
    const element = document.querySelector(`#${field.id}`);
    element.addEventListener('blur', () => {
      const value = element.value.trim();
      if (value === '' || (field.regex && !field.regex.test(value))) {
        element.style.border = '2px solid red';
  
        let errorText = element.parentNode.querySelector('span');
        if (!errorText) {
          errorText = document.createElement('span');
          errorText.style.color = 'red';
          element.parentNode.appendChild(errorText);
        }
        errorText.innerText = field.errorMsg;
      } else {
        element.style.border = '2px solid green';
        const errorText = element.parentNode.querySelector('span');
        if (errorText) {
          errorText.remove();
        }
      }
    });
  }
  
  fields.forEach(addFieldListener);
})()