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
    // Очищаем контейнер
    previewContainer.innerHTML = '';
    
    images.forEach((image, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.loading = 'lazy';
        img.onerror = function() {
            // Если изображение не загружается, показываем заглушку
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMUUyOTNCIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjM3NzhCIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
            this.alt = 'Изображение не найдено';
        };
        
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
    
    // Добавляем обработчик ошибок для полноэкранного просмотра
    fullscreenImage.onerror = function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMUUyOTNCIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjM3NzhCIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPHJlY3QgeD0iMzAwIiB5PSIyNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBzdHJva2U9IiM2Mzc3OEIiIHN0cm9rZS13aWR0aD0iMiIgcng9IjEwIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjM3NzhCIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkZhaWxlZCB0byBsb2FkOiAnICsgZmlsZW5hbWUgKyAnPC90ZXh0Pgo8L3N2Zz4=';
        this.alt = 'Изображение не загружено';
    };
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

// Управление видео в прайс-листе
function initVideoControls() {
    const video = document.querySelector('.demo-video');
    
    if (video) {
        // Убедимся, что видео автоматически воспроизводится
        video.setAttribute('autoplay', 'true');
        video.setAttribute('loop', 'true');
        video.setAttribute('muted', 'true');
        video.setAttribute('playsinline', 'true');
        
        // Принудительное воспроизведение
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Автовоспроизведение не сработало:', error);
                // Добавляем кнопку воспроизведения
                const videoContainer = video.parentElement;
                const playButton = document.createElement('button');
                playButton.className = 'video-play-button';
                playButton.innerHTML = '▶ Воспроизвести';
                playButton.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--tilda-blue);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    z-index: 3;
                `;
                videoContainer.style.position = 'relative';
                videoContainer.appendChild(playButton);
                
                playButton.addEventListener('click', () => {
                    video.play();
                    playButton.style.display = 'none';
                });
            });
        }
        
        // Добавляем hover эффект для видео
        video.addEventListener('mouseenter', () => {
            video.style.filter = 'brightness(1.1)';
        });
        
        video.addEventListener('mouseleave', () => {
            video.style.filter = 'brightness(1)';
        });
    }
}

// Проверка существования файлов
function checkImageFiles() {
    console.log('Проверка файлов изображений:');
    images.forEach(img => {
        console.log(`- ${img.src}: загружается...`);
    });
}

// Вызов функции инициализации видео в конце init()
function init() {
    // Проверяем файлы
    checkImageFiles();
    
    // Создаем галерею
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
    
    // Инициализация видео
    initVideoControls();
}

document.addEventListener('DOMContentLoaded', init);
