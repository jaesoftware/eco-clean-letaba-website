const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Gallery filters
const filters = document.querySelectorAll('.filter');
const galleryItems = document.querySelectorAll('.gallery-item');

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'));
    filter.classList.add('active');
    const category = filter.dataset.filter;

    galleryItems.forEach(item => {
      item.classList.toggle('hide', category !== 'all' && item.dataset.category !== category);
    });
  });
});

// Gallery modal
const modal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    modalImage.src = item.dataset.image;
    modalImage.alt = item.dataset.title;
    modalTitle.textContent = item.dataset.title;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalImage.src = '';
}
document.querySelector('.modal-close')?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Service links pre-select the contact form
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const service = link.dataset.service;
    setTimeout(() => {
      const select = document.getElementById('service');
      if (select) select.value = service;
    }, 350);
  });
});

// Quote form -> WhatsApp
document.getElementById('quoteForm')?.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const location = document.getElementById('location').value.trim();
  const message = document.getElementById('message').value.trim();

  const text =
`Hi Eco Clean Letaba!%0A%0A` +
`I'd like to request a cleaning quote.%0A%0A` +
`Name: ${encodeURIComponent(name)}%0A` +
`Phone: ${encodeURIComponent(phone)}%0A` +
`Service: ${encodeURIComponent(service)}%0A` +
`Location: ${encodeURIComponent(location)}%0A` +
`Message: ${encodeURIComponent(message || 'No additional message.')}`;

  window.open(`https://wa.me/27833342003?text=${text}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
