// Мобильное меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Закрыть мобильное меню после клика
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Фильтрация товаров - ИСПРАВЛЕНО!
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('#plants-grid .product-card[data-category]');

console.log('Найдено кнопок фильтра:', filterButtons.length);
console.log('Найдено карточек товаров:', productCards.length);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        console.log('Выбран фильтр:', filter);

        // Активная кнопка
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Фильтрация
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            console.log('Карточка категория:', cardCategory);

            if (filter === 'all') {
                // Показываем все
                card.classList.remove('hidden');
                card.style.display = '';
                // Анимация появления
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = 'fadeIn 0.5s ease';
                }, 10);
            } else {
                // Проверяем совпадение категории
                if (cardCategory === filter) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'fadeIn 0.5s ease';
                    }, 10);
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Анимация появления при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за категориями и продуктами
document.querySelectorAll('.category-card, .product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Клик по категории - переход к соответствующему разделу
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        let targetSection;

        if (category === 'plants') {
            targetSection = document.getElementById('plants');
        } else if (category === 'tools') {
            targetSection = document.getElementById('tools');
        } else if (category === 'fertilizers') {
            targetSection = document.getElementById('fertilizers');
        } else if (category === 'seeds') {
            targetSection = document.getElementById('plants');
        }

        if (targetSection) {
            const headerOffset = 80;
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Показать/скрыть навигацию при прокрутке
let lastScroll = 0;
const header = document.querySelector('header');

if (header) {
    header.style.transition = 'transform 0.3s ease';

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
        } else if (currentScroll > lastScroll && currentScroll > 100) {
            // Прокрутка вниз
            header.style.transform = 'translateY(-100%)';
        } else {
            // Прокрутка вверх
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// Обработка ошибок загрузки изображений
document.querySelectorAll('.product-image img').forEach(img => {
    img.addEventListener('error', function() {
        // Если картинка не загрузилась, показываем эмодзи
        this.style.display = 'none';
        const emoji = this.nextElementSibling;
        if (emoji && emoji.classList.contains('emoji-fallback')) {
            emoji.style.display = 'block';
        }
    });

    img.addEventListener('load', function() {
        // Если картинка загрузилась, скрываем эмодзи
        const emoji = this.nextElementSibling;
        if (emoji && emoji.classList.contains('emoji-fallback')) {
            emoji.style.display = 'none';
        }
    });
});

console.log('🌱 Магазин для дачи загружен успешно!');