    // Nav scroll effect
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // Mobile menu
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    function closeMobileMenu() {
      mobileMenu.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Scroll-triggered reveals
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Menu tabs
    document.querySelectorAll('.menu-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
      });
    });

    // Set minimum reservation date to today
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    // ─── FORMSPREE SETUP ─────────────────────────────────────
    // 1. Go to https://formspree.io and create a free account
    // 2. Create two forms and paste your form IDs below
    const RESERVATION_FORM_ID = 'YOUR_RESERVATION_FORM_ID';
    const NEWSLETTER_FORM_ID  = 'YOUR_NEWSLETTER_FORM_ID';

    async function postToFormspree(formId, data) {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.ok;
    }

    async function handleReservation(e) {
      e.preventDefault();
      const form = e.target;
      const btn  = form.querySelector('.form-submit');
      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;

      const data = {
        nom:          form.querySelector('#res-name').value,
        email:        form.querySelector('#res-email').value,
        date:         form.querySelector('#res-date').value,
        heure:        form.querySelector('#res-time').value,
        couverts:     form.querySelector('#res-guests').value,
        telephone:    form.querySelector('#res-phone').value,
        commentaires: form.querySelector('#res-notes').value,
      };

      const ok = await postToFormspree(RESERVATION_FORM_ID, data);
      if (ok) {
        btn.textContent = 'Demande envoyée — nous vous recontacterons !';
        btn.style.background = 'oklch(52% 0.14 145)';
      } else {
        btn.textContent = 'Une erreur est survenue — appelez-nous';
        btn.style.background = 'oklch(50% 0.18 25)';
        btn.disabled = false;
      }
    }

    async function handleNewsletter(e) {
      e.preventDefault();
      const form  = e.target;
      const btn   = form.querySelector('.nl-btn');
      const email = form.querySelector('.nl-input').value;
      btn.textContent = 'Inscription…';
      btn.disabled = true;

      const ok = await postToFormspree(NEWSLETTER_FORM_ID, { email });
      if (ok) {
        btn.textContent = 'Inscrit(e) !';
        btn.style.background = 'oklch(52% 0.14 145)';
      } else {
        btn.textContent = 'Erreur — réessayez';
        btn.style.background = 'oklch(50% 0.18 25)';
        btn.disabled = false;
      }
    }
