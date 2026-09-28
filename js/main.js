/**
 * شركة نقل عفش بجدة ومكة — Main JavaScript
 * Handles: Navigation, FAQ accordion, Form validation, Scroll effects, Event tracking
 */

(function () {
  'use strict';

  // --- Mobile Navigation ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll('.mobile-nav__link') : [];

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav on link click
    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Header scroll effect ---
  const header = document.querySelector('.site-header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  // --- FAQ Accordion ---
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var button = item.querySelector('.faq-item__question');
    if (button) {
      button.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all other FAQ items
        faqItems.forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('open');
            var otherBtn = otherItem.querySelector('.faq-item__question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        item.classList.toggle('open');
        button.setAttribute('aria-expanded', !isOpen);
      });
    }
  });

  // --- Contact Form ---
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      var name = contactForm.querySelector('#form-name');
      var phone = contactForm.querySelector('#form-phone');
      var city = contactForm.querySelector('#form-city');
      var valid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.form-error').forEach(function (el) {
        el.remove();
      });
      contactForm.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (el) {
        el.style.borderColor = '';
      });

      // Validate name
      if (name && name.value.trim().length < 2) {
        showError(name, 'يرجى إدخال الاسم');
        valid = false;
      }

      // Validate phone
      if (phone && !isValidSaudiPhone(phone.value.trim())) {
        showError(phone, 'يرجى إدخال رقم جوال صحيح');
        valid = false;
      }

      // Validate city selection
      if (city && !city.value) {
        showError(city, 'يرجى اختيار المدينة');
        valid = false;
      }

      if (valid) {
        // Track the form submit event
        trackEvent('contact_form_submit', {
          city: city ? city.value : '',
          service: contactForm.querySelector('#form-service') ? contactForm.querySelector('#form-service').value : ''
        });

        // Show success message (no backend to submit to)
        var successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.setAttribute('role', 'alert');
        successMsg.style.cssText = 'background:#e8f5e9;color:#2e7d32;padding:1rem;border-radius:6px;margin-top:1rem;font-weight:600;text-align:center;';
        successMsg.textContent = 'شكراً لتواصلك معنا. للحصول على رد أسرع، تواصل معنا مباشرة عبر الهاتف أو WhatsApp.';

        // Remove existing success messages
        var existing = contactForm.querySelector('.form-success');
        if (existing) existing.remove();

        contactForm.appendChild(successMsg);

        // Reset form
        contactForm.reset();
      }
    });
  }

  function showError(input, message) {
    input.style.borderColor = '#d32f2f';
    var errorEl = document.createElement('span');
    errorEl.className = 'form-error';
    errorEl.style.cssText = 'color:#d32f2f;font-size:0.8rem;display:block;margin-top:0.25rem;';
    errorEl.textContent = message;
    input.parentNode.appendChild(errorEl);
  }

  function isValidSaudiPhone(phone) {
    // Accept Saudi phone formats: 05xxxxxxxx, +9665xxxxxxxx, 9665xxxxxxxx
    var cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^(05\d{8}|9665\d{8}|\+9665\d{8})$/.test(cleaned);
  }

  // Sanitize form inputs on blur
  var formInputs = document.querySelectorAll('.form-input, .form-textarea');
  formInputs.forEach(function (input) {
    input.addEventListener('blur', function () {
      input.value = sanitizeInput(input.value);
    });
  });

  function sanitizeInput(value) {
    // Remove potentially harmful characters but keep Arabic text
    return value.replace(/[<>]/g, '');
  }

  // --- Google Ads Conversion Tracking Fallback ---
  if (typeof window.gtag_report_conversion !== 'function') {
    window.gtag_report_conversion = function (url) {
      var callback = function () {
        if (typeof url !== 'undefined' && url) {
          window.location = url;
        }
      };
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          'send_to': 'AW-18475236309/doPhCIW14IYdENX31ulE',
          'value': 1.0,
          'currency': 'EGP',
          'event_callback': callback
        });
      } else {
        callback();
      }
      return false;
    };
  }

  // --- Conversion Tracking Helpers ---
  // These functions fire events that can be picked up by GTM / GA4 / Google Ads
  window.trackEvent = function (eventName, params) {
    params = params || {};

    // Google Analytics 4 (gtag)
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }

    // Google Tag Manager (dataLayer)
    if (typeof dataLayer !== 'undefined' && Array.isArray(dataLayer)) {
      dataLayer.push(Object.assign({ event: eventName }, params));
    }

    // Console log in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('[Track]', eventName, params);
    }
  };

  // Track phone clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      trackEvent('phone_click', {
        link_text: link.textContent.trim(),
        link_url: link.href
      });
    });
  });

  // Track WhatsApp clicks
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
    link.addEventListener('click', function () {
      trackEvent('whatsapp_click', {
        link_text: link.textContent.trim(),
        link_url: link.href
      });
    });
  });

})();
