// =============================================
// FEATURE 1: Contact Form Validation
// =============================================
function validateForm() {
  let isValid = true;

  const name = document.getElementById('fullName');
  const email = document.getElementById('emailAddr');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');

  // Reset
  [name, email, subject, message].forEach(el => {
    if (el) el.classList.remove('is-invalid');
  });

  if (name && name.value.trim().length < 2) {
    name.classList.add('is-invalid');
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email.value.trim())) {
    email.classList.add('is-invalid');
    isValid = false;
  }

  if (subject && subject.value === '') {
    subject.classList.add('is-invalid');
    isValid = false;
  }

  if (message && message.value.trim().length < 20) {
    message.classList.add('is-invalid');
    isValid = false;
  }

  if (isValid) {
    document.getElementById('contactForm').classList.add('d-none');
    document.getElementById('formSuccess').classList.remove('d-none');
  }
}

// =============================================
// FEATURE 2: Dark / Light Mode Toggle
// =============================================
function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);

  // Add toggle button to navbar
  const nav = document.querySelector('.navbar-nav');
  if (nav) {
    const li = document.createElement('li');
    li.className = 'nav-item ms-2';
    li.innerHTML = `<button id="themeToggle" class="btn btn-sm btn-outline-warning mt-1" onclick="applyTheme(document.body.getAttribute('data-theme')==='dark'?'light':'dark')">🌙 Dark Mode</button>`;
    nav.appendChild(li);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = saved === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
});

// =============================================
// FEATURE 3: Course Filter (Courses page)
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseItems = document.querySelectorAll('.course-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'btn-primary');
        b.classList.add('btn-outline-primary');
      });
      btn.classList.add('active', 'btn-primary');
      btn.classList.remove('btn-outline-primary');

      const filter = btn.getAttribute('data-filter');
      courseItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
// =============================================
// FEATURE 4: Blog Live Search
// =============================================
function searchBlog() {
  const query = document.getElementById('blogSearch').value.toLowerCase();
  const items = document.querySelectorAll('.blog-item');
  let visibleCount = 0;

  items.forEach(item => {
    const title = item.querySelector('.blog-title').textContent.toLowerCase();
    const excerpt = item.querySelector('.blog-excerpt').textContent.toLowerCase();
    if (title.includes(query) || excerpt.includes(query)) {
      item.style.display = 'block';
      visibleCount++;
    } else {
      item.style.display = 'none';
    }
  });

  const noResults = document.getElementById('noResults');
  if (noResults) {
    noResults.classList.toggle('d-none', visibleCount > 0);
  }
}
// =============================================
// FEATURE 5: Dynamic Active Nav Link Highlight
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
// =============================================
// FEATURE 6: Back to Top Button
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});