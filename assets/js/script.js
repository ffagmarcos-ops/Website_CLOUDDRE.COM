/**
 * CLOUDDRE - CONTABILIDADE INTELIGENTE
 * Main Interactive Application Script
 */

// --------------------------------------------------------------------------
// 1. CENTRALIZED CONFIGURATION (SINGLE SOURCE OF TRUTH)
// --------------------------------------------------------------------------
const SITE_CONFIG = {
  whatsapp: "5521996895570",
  telefoneExibicao: "(21) 99689-5570",
  email: "contato@clouddre.com.br",
  endereco: "Alameda São Boaventura, 540 - Fonseca, Niterói - RJ, 24120-191",
  instagram: "https://instagram.com/clouddrecontabilidade",
  linkedin: "https://linkedin.com/company/clouddre"
};

// --------------------------------------------------------------------------
// 2. CASES DATA ARRAY (EASILY EDITABLE)
// --------------------------------------------------------------------------
const CASES_DATA = [
  {
    categoria: "Tecnologia & SaaS",
    titulo: "Otimização Fiscal e Planejamento Tributário",
    descricao: "Implementação de modelo tributário estratégico para empresa de tecnologia, proporcionando conformidade fiscal contínua e maior eficiência operacional.",
    tag: "Planejamento Tributário"
  },
  {
    categoria: "Indústria & Distribuição",
    titulo: "Gestão Contábil Digital Integrada",
    descricao: "Digitalização e integração completa de processos fiscais e trabalhistas, resultando em relatórios financeiros precisos e agilidade na tomada de decisão.",
    tag: "Contabilidade Digital"
  },
  {
    categoria: "Comércio & Serviços",
    titulo: "Regularização e Adequação Societária",
    descricao: "Reorganização societária e regularização de obrigações perante os órgãos competentes, garantindo segurança jurídica e expansão de novos negócios.",
    tag: "Regularização Fiscal"
  }
];

// --------------------------------------------------------------------------
// 3. INITIALIZATION ON DOM LOADED
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  renderCases();
  initContactForm();
  initScrollAnimations();
  initBackToTop();
  updateDynamicYear();
  initWhatsAppLinks();
});

// --------------------------------------------------------------------------
// 4. HEADER SHADOW ON SCROLL
// --------------------------------------------------------------------------
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

// --------------------------------------------------------------------------
// 5. ACCESSIBLE MOBILE MENU DRAWER
// --------------------------------------------------------------------------
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  const toggleMenu = (open) => {
    const shouldOpen = open !== undefined ? open : !navMenu.classList.contains('is-active');
    toggleBtn.classList.toggle('is-active', shouldOpen);
    navMenu.classList.toggle('is-active', shouldOpen);
    document.body.classList.toggle('menu-open', shouldOpen);
    toggleBtn.setAttribute('aria-expanded', shouldOpen);
  };

  toggleBtn.addEventListener('click', () => toggleMenu());

  // Close menu on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });

  // Close when clicking outside menu
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('is-active') &&
        !navMenu.contains(e.target) &&
        !toggleBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

// --------------------------------------------------------------------------
// 6. SCROLLSPY ACTIVE LINK HIGHLIGHTING
// --------------------------------------------------------------------------
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

// --------------------------------------------------------------------------
// 7. DYNAMIC CASES RENDERING
// --------------------------------------------------------------------------
function renderCases() {
  const casesContainer = document.getElementById('cases-container');
  if (!casesContainer) return;

  casesContainer.innerHTML = CASES_DATA.map(item => `
    <article class="case-card animate-on-scroll">
      <div>
        <span class="case-category">${escapeHTML(item.categoria)}</span>
        <h3 class="case-title">${escapeHTML(item.titulo)}</h3>
        <p class="case-desc">${escapeHTML(item.descricao)}</p>
      </div>
      <span class="case-tag">${escapeHTML(item.tag)}</span>
    </article>
  `).join('');
}

// --------------------------------------------------------------------------
// 8. CONTACT FORM VALIDATION & WHATSAPP INTEGRATION
// --------------------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    const groups = form.querySelectorAll('.form-group');
    groups.forEach(g => g.classList.remove('has-error'));

    let isValid = true;
    const nome = form.querySelector('#nome');
    const empresa = form.querySelector('#empresa');
    const telefone = form.querySelector('#telefone');
    const email = form.querySelector('#email');
    const servico = form.querySelector('#servico');
    const mensagem = form.querySelector('#mensagem');
    const termos = form.querySelector('#termos');

    // Validation Rules
    if (!nome.value.trim()) {
      showFieldError(nome, 'Por favor, informe seu nome completo.');
      isValid = false;
    }
    if (!empresa.value.trim()) {
      showFieldError(empresa, 'Por favor, informe o nome da sua empresa.');
      isValid = false;
    }
    if (!telefone.value.trim() || telefone.value.trim().length < 8) {
      showFieldError(telefone, 'Informe um telefone ou WhatsApp válido.');
      isValid = false;
    }
    if (!email.value.trim() || !validateEmail(email.value.trim())) {
      showFieldError(email, 'Informe um endereço de e-mail válido.');
      isValid = false;
    }
    if (!servico.value) {
      showFieldError(servico, 'Selecione um serviço de interesse.');
      isValid = false;
    }
    if (!mensagem.value.trim()) {
      showFieldError(mensagem, 'Por favor, digite sua mensagem.');
      isValid = false;
    }
    if (!termos.checked) {
      showFieldError(termos, 'Você precisa concordar com os termos de contato.');
      isValid = false;
    }

    if (!isValid) return;

    // Prevent duplicate submits
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';

    // Format WhatsApp Message
    const textMsg = `*Contato via Site CLOUDDRE*%0A%0A` +
      `*Nome:* ${encodeURIComponent(nome.value.trim())}%0A` +
      `*Empresa:* ${encodeURIComponent(empresa.value.trim())}%0A` +
      `*Telefone:* ${encodeURIComponent(telefone.value.trim())}%0A` +
      `*E-mail:* ${encodeURIComponent(email.value.trim())}%0A` +
      `*Serviço:* ${encodeURIComponent(servico.options[servico.selectedIndex].text)}%0A` +
      `*Mensagem:* ${encodeURIComponent(mensagem.value.trim())}`;

    const waUrl = `https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsapp}&text=${textMsg}`;

    // Open WhatsApp after short delay
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      submitBtn.textContent = 'Mensagem Enviada!';
      form.reset();
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 4000);
    }, 600);
  });
}

function showFieldError(field, message) {
  const group = field.closest('.form-group');
  if (!group) return;
  group.classList.add('has-error');
  const errSpan = group.querySelector('.error-message');
  if (errSpan) errSpan.textContent = message;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// --------------------------------------------------------------------------
// 9. INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// --------------------------------------------------------------------------
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// --------------------------------------------------------------------------
// 10. BACK TO TOP BUTTON
// --------------------------------------------------------------------------
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --------------------------------------------------------------------------
// 11. DYNAMIC FOOTER YEAR & WHATSAPP BUTTONS
// --------------------------------------------------------------------------
function updateDynamicYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function initWhatsAppLinks() {
  const waButtons = document.querySelectorAll('.js-whatsapp-link');
  const waUrl = `https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsapp}&text=${encodeURIComponent('Olá! Vim através do site da CLOUDDRE e gostaria de falar com um especialista.')}`;

  waButtons.forEach(btn => {
    btn.setAttribute('href', waUrl);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });
}
