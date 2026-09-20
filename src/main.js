document.querySelector('#year').textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = document.querySelectorAll('.reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

const copyButton = document.querySelector('[data-copy-note]');
const copyFeedback = document.querySelector('.copy-feedback');
const messageTemplate = 'Здравствуйте, Роман! Хочу обсудить подбор сотрудника. Сфера: … Позиция: … Срок: …';

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(messageTemplate);
    copyFeedback.textContent = 'Шаблон сообщения скопирован. Добавьте контакт — и блок готов к публикации.';
    copyButton.firstChild.textContent = 'Сообщение скопировано ';
  } catch {
    copyFeedback.textContent = messageTemplate;
  }
});

