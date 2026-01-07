const images = [
    { src: '1.jpg', alt: 'Цифровая иллюстрация Работа 1 от Kumarov-Arts', caption: 'Работа 1' },
    { src: '2.jpg', alt: 'Цифровая иллюстрация Работа 2 от Kumarov-Arts', caption: 'Работа 2' },
    { src: '3.jpg', alt: 'Цифровая иллюстрация Работа 3 от Kumarov-Arts', caption: 'Работа 3' },
    { src: '4.jpg', alt: 'Цифровая иллюстрация Работа 4 от Kumarov-Arts', caption: 'Работа 4' },
    { src: '6.jpg', alt: 'Цифровая иллюстрация Работа 5 от Kumarov-Arts', caption: 'Работа 5' },
    { src: '7.jpg', alt: 'Цифровая иллюстрация Работа 6 от Kumarov-Arts', caption: 'Работа 6' },
    { src: '8.jpg', alt: 'Цифровая иллюстрация Работа 7 от Kumarov-Arts', caption: 'Работа 7' }
];

let currentIndex = 0;
let autoScrollInterval;
let touchStartX = 0;
let touchEndX = 0;

const previewContainer = document.getElementById('previewContainer');
const fullscreenViewer = document.getElementById('fullscreenViewer');
const fullscreenImage = document.getElementById('fullscreenImage');
const fullscreenCaption = document.getElementById('fullscreenCaption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Создание превью
function createPreviewGallery() {
    images.forEach((image, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.loading = 'lazy';
        
        const caption = document.createElement('div');
        caption.className = 'preview-caption';
        caption.textContent = image.caption;
        
        previewItem.appendChild(img);
        previewItem.appendChild(caption);
        previewContainer.appendChild(previewItem);
        
        // Клик по превью
        previewItem.addEventListener('click', () => {
            openFullscreen(index);
        });
    });
}

// Открыть полноэкранный просмотр
function openFullscreen(index) {
    currentIndex = index;
    updateFullscreen();
    fullscreenViewer.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Пометка активного превью
    updateActivePreview();
}

// Обновить полноэкранное изображение
function updateFullscreen() {
    const image = images[currentIndex];
    fullscreenImage.src = image.src;
    fullscreenImage.alt = image.alt;
    fullscreenCaption.textContent = image.caption;
}

// Обновить активное превью
function updateActivePreview() {
    document.querySelectorAll('.preview-item').forEach((item, i) => {
        item.classList.toggle('active', i === currentIndex);
    });
    
    // Прокрутить превью к активному элементу
    const activePreview = document.querySelector(`.preview-item[data-index="${currentIndex}"]`);
    if (activePreview) {
        activePreview.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

// Закрыть просмотр
function closeFullscreen() {
    fullscreenViewer.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Навигация
function showPreviousImage(e) {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateFullscreen();
    updateActivePreview();
}

function showNextImage(e) {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    updateFullscreen();
    updateActivePreview();
}

// Обработка свайпов
function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            showNextImage();
        } else {
            showPreviousImage();
        }
    }
}

// Автоскролл превью
function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        previewContainer.scrollBy({ left: 200, behavior: 'smooth' });
        if (previewContainer.scrollLeft + previewContainer.clientWidth >= previewContainer.scrollWidth - 10) {
            previewContainer.scrollLeft = 0;
        }
    }, 3000);
}

function stopAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
}

// Управление клавиатурой
function handleKeyDown(e) {
    if (!fullscreenViewer.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeFullscreen();
            break;
        case 'ArrowLeft':
            showPreviousImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
}

// Инициализация
function init() {
    createPreviewGallery();
    
    // Обработчики событий
    closeBtn.addEventListener('click', closeFullscreen);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Закрытие по клику на фон
    fullscreenViewer.addEventListener('click', (e) => {
        if (e.target === fullscreenViewer) {
            closeFullscreen();
        }
    });
    
    // Управление клавиатурой
    document.addEventListener('keydown', handleKeyDown);
    
    // Свайпы на мобильных устройствах
    fullscreenViewer.addEventListener('touchstart', handleTouchStart);
    fullscreenViewer.addEventListener('touchend', handleTouchEnd);
    
    // Автоскролл превью
    previewContainer.addEventListener('mouseenter', stopAutoScroll);
    previewContainer.addEventListener('mouseleave', startAutoScroll);
    
    // Запустить автоскролл через 3 секунды после загрузки
    setTimeout(startAutoScroll, 3000);
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', init);