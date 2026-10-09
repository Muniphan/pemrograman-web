/**
 * ==========================================================================
 * PORTOFOLIO RESUME DIGITAL - HAIDAR HANIF WAHYUDI
 * JAVASCRIPT MURNI (VANILLA JS)
 * Fitur:
 * 1. Mobile Hamburger Menu & Keyboard Accessibility
 * 2. Sticky Header & Active Nav on Scroll (IntersectionObserver)
 * 3. Mode Gelap / Terang (Dark / Light Theme) dengan LocalStorage
 * 4. Modal Rincian Spesifikasi Proyek TukarIlmu
 * 5. Validasi Formulir Kontak Real-Time & Feedback Interaktif
 * 6. Tombol Kembali ke Atas (Back to Top)
 * 7. Tahun Dinamis Hak Cipta
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. TAHUN DINAMIS PADA FOOTER
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. TOGGLE TEMA GELAP / TERANG (DARK / LIGHT THEME)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;

  // Baca tema dari localStorage atau gunakan dark sebagai default modern
  const savedTheme = localStorage.getItem('haidar_theme') || 'dark';
  rootElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      rootElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('haidar_theme', newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 3. NAVIGASI MOBILE (HAMBURGER MENU)
  // --------------------------------------------------------------------------
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileMenu = () => {
    const isOpen = siteNav.classList.toggle('open');
    mobileToggleBtn.classList.toggle('active', isOpen);
    mobileToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileToggleBtn.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka navigasi menu');
  };

  const closeMobileMenu = () => {
    siteNav.classList.remove('open');
    mobileToggleBtn.classList.remove('active');
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
    mobileToggleBtn.setAttribute('aria-label', 'Buka navigasi menu');
  };

  if (mobileToggleBtn && siteNav) {
    mobileToggleBtn.addEventListener('click', toggleMobileMenu);

    // Tutup menu saat tautan navigasi diklik
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Tutup menu jika klik di luar header
    document.addEventListener('click', (e) => {
      if (!siteNav.contains(e.target) && !mobileToggleBtn.contains(e.target) && siteNav.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. HEADER STICKY & ACTIVE NAVIGATION STATE (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header shadow styling
    if (header) {
      if (scrollPos > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Tombol Back to Top
    if (backToTopBtn) {
      if (scrollPos > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Highlight menu aktif sesuai section di layar
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // --------------------------------------------------------------------------
  // 5. MODAL DETAIL SPESIFIKASI PROYEK TUKARILMU
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTriggers = document.querySelectorAll('.project-modal-trigger');

  const openProjectModal = () => {
    if (!projectModal || !modalContent) return;

    modalContent.innerHTML = `
      <img src="assets/images/projects/tukarilmu.png" alt="Tangkapan layar website TukarIlmu" class="modal-preview-img">
      <span class="tech-badge" style="display:inline-block; margin-bottom:12px;">Edukasi &amp; Peer-to-Peer Learning</span>
      <h3 class="modal-title">TukarIlmu - Platform Belajar Mahasiswa</h3>
      <p class="modal-desc">
        <strong>TukarIlmu</strong> adalah platform web inovatif yang menghubungkan mahasiswa untuk saling belajar materi perkuliahan secara peer-to-peer. Mahasiswa dapat menonton video penjelasan topik kuliah yang dibuat oleh rekan mahasiswa lain, melakukan request materi yang belum dipahami di kelas, serta memanfaatkan asisten pintar Radya AI.
      </p>
      
      <div class="modal-features">
        <h4>Arsitektur &amp; Fitur Unggulan:</h4>
        <ul>
          <li><strong>Video Penjelasan Konsep:</strong> Pembahasan materi kuliah mulai dari Kalkulus, Struktur Data, Kimia Organik, hingga Makroekonomi dengan gaya penyampaian yang lebih mudah dicerna.</li>
          <li><strong>Request Materi:</strong> Sistem permintaan materi terbuka yang memungkinkan pengguna lain menjawab dan membagikan video solusi.</li>
          <li><strong>Radya AI Assistant:</strong> Fitur chatbot interaktif pintar yang disematkan langsung untuk mendampingi pengguna bernavigasi dan mencari solusi.</li>
          <li><strong>Performa Cepat &amp; Responsif:</strong> Memanfaatkan arsitektur web modern yang ringan dan kompatibel di layar seluler maupun desktop.</li>
        </ul>
      </div>

      <div class="tech-stack" style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">
        <span class="tech-badge">Next.js</span>
        <span class="tech-badge">React</span>
        <span class="tech-badge">TypeScript</span>
        <span class="tech-badge">Modern UI/UX</span>
        <span class="tech-badge">AI Integration</span>
      </div>

      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="https://tukarilmu.radya.my.id/" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          Buka Website Live (tukarilmu.radya.my.id)
        </a>
        <a href="#kontak" class="btn btn-outline btn-sm" onclick="document.getElementById('project-modal').classList.remove('open')">
          Hubungi Pengembang
        </a>
      </div>
    `;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', openProjectModal);
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('open')) {
        closeProjectModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. VALIDASI FORMULIR KONTAK REAL-TIME & FEEDBACK INTERAKTIF
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    const clearError = (input, errorEl) => {
      input.classList.remove('invalid');
      if (errorEl) errorEl.textContent = '';
    };

    const setError = (input, errorEl, message) => {
      input.classList.add('invalid');
      if (errorEl) errorEl.textContent = message;
    };

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    nameInput.addEventListener('input', () => clearError(nameInput, nameError));
    emailInput.addEventListener('input', () => clearError(emailInput, emailError));
    subjectInput.addEventListener('input', () => clearError(subjectInput, subjectError));
    messageInput.addEventListener('input', () => clearError(messageInput, messageError));

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      if (!nameInput.value.trim()) {
        setError(nameInput, nameError, 'Nama lengkap wajib diisi.');
        isValid = false;
      } else if (nameInput.value.trim().length < 3) {
        setError(nameInput, nameError, 'Nama minimal terdiri dari 3 karakter.');
        isValid = false;
      } else {
        clearError(nameInput, nameError);
      }

      if (!emailInput.value.trim()) {
        setError(emailInput, emailError, 'Alamat email wajib diisi.');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        setError(emailInput, emailError, 'Format email tidak valid (contoh: nama@domain.com).');
        isValid = false;
      } else {
        clearError(emailInput, emailError);
      }

      if (!subjectInput.value.trim()) {
        setError(subjectInput, subjectError, 'Subjek pesan wajib diisi.');
        isValid = false;
      } else if (subjectInput.value.trim().length < 3) {
        setError(subjectInput, subjectError, 'Subjek minimal terdiri dari 3 karakter.');
        isValid = false;
      } else {
        clearError(subjectInput, subjectError);
      }

      if (!messageInput.value.trim()) {
        setError(messageInput, messageError, 'Isi pesan tidak boleh kosong.');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        setError(messageInput, messageError, 'Pesan terlalu singkat, minimal 10 karakter.');
        isValid = false;
      } else {
        clearError(messageInput, messageError);
      }

      if (isValid) {
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Mengirim Pesan...</span>`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;

          if (formFeedback) {
            formFeedback.className = 'form-feedback success';
            formFeedback.textContent = `Terima kasih, ${nameInput.value.trim()}! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda melalui email.`;
          }

          contactForm.reset();

          setTimeout(() => {
            if (formFeedback) {
              formFeedback.className = 'form-feedback';
              formFeedback.textContent = '';
            }
          }, 6000);
        }, 1200);
      } else {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Harap periksa kembali isian formulir yang ditandai merah.';
        }
      }
    });
  }

});
