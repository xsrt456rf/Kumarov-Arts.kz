// Данные всех медиафайлов
const mediaData = {
    preview: [
        { type: 'image', src: 'Превью1.jpg', alt: 'Превью для YouTube 1' },
        { type: 'image', src: 'Превью2.jpg', alt: 'Превью для YouTube 2' }
    ],
    avatar: [
        { type: 'image', src: 'Аватарка.jpg', alt: 'Аватарка с участием клиента 1' },
        { type: 'image', src: 'Аватарка2.jpg', alt: 'Аватарка с участием клиента 2' }
    ],
    video: [
        { type: 'video', src: 'анимация.mp4', alt: 'Пример рекламной анимации' }
    ]
};

// Глобальные переменные
let currentMediaType = null; // 'preview', 'avatar', или 'video'
let currentMediaIndex = 0;
let currentMediaList = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен, инициализация...');
    
    // Получаем элементы модального окна
    const modal = document.getElementById('fullscreenModal');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const fullscreenVideo = document.getElementById('fullscreenVideo');
    const fullscreenVideoContainer = document.getElementById('fullscreenVideoContainer');
    const closeBtn = document.getElementById('fullscreenClose');
    const prevBtn = document.getElementById('fullscreenPrev');
    const nextBtn = document.getElementById('fullscreenNext');
    
    // Проверяем наличие элементов
    if (!modal || !fullscreenImage || !fullscreenVideo || !closeBtn) {
        console.error('Не найдены элементы модального окна!');
        return;
    }
    
    // Функция открытия медиа в полноэкранном режиме
    function openFullscreenMedia(mediaType, mediaIndex) {
        console.log('Открытие:', mediaType, 'индекс:', mediaIndex);
        
        // Устанавливаем текущие данные
        currentMediaType = mediaType;
        currentMediaIndex = mediaIndex;
        currentMediaList = mediaData[mediaType] || [];
        
        if (currentMediaList.length === 0) {
            console.error('Нет данных для', mediaType);
            return;
        }
        
        const mediaItem = currentMediaList[mediaIndex];
        if (!mediaItem) {
            console.error('Медиа не найдено по индексу:', mediaIndex);
            return;
        }
        
        // Скрываем все элементы
        fullscreenImage.style.display = 'none';
        fullscreenVideoContainer.style.display = 'none';
        
        // В зависимости от типа показываем нужный элемент
        if (mediaItem.type === 'image') {
            fullscreenImage.style.display = 'block';
            fullscreenImage.src = mediaItem.src;
            fullscreenImage.alt = mediaItem.alt;
            
            // Обработчик ошибки загрузки изображения
            fullscreenImage.onerror = function() {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMTI1MmQiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzg4OGE5MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPg==';
                this.alt = 'Изображение не найдено';
            };
        } 
        else if (mediaItem.type === 'video') {
            fullscreenVideoContainer.style.display = 'block';
            fullscreenVideo.src = mediaItem.src;
            fullscreenVideo.alt = mediaItem.alt;
            fullscreenVideo.controls = true;
            fullscreenVideo.autoplay = true;
            fullscreenVideo.muted = false;
            
            // Обработчик ошибки загрузки видео
            fullscreenVideo.onerror = function() {
                console.error('Ошибка загрузки видео:', mediaItem.src);
                alert('Видео не загружено. Проверьте наличие файла: ' + mediaItem.src);
            };
        }
        
        // Обновляем кнопки навигации
        updateNavigationButtons();
        
        // Показываем модальное окно
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Функция обновления кнопок навигации
    function updateNavigationButtons() {
        if (currentMediaList.length > 1) {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    }
    
    // Функция перехода к следующему медиа
    function nextMedia() {
        if (currentMediaList.length === 0) return;
        
        currentMediaIndex = (currentMediaIndex + 1) % currentMediaList.length;
        openFullscreenMedia(currentMediaType, currentMediaIndex);
    }
    
    // Функция перехода к предыдущему медиа
    function prevMedia() {
        if (currentMediaList.length === 0) return;
        
        currentMediaIndex = (currentMediaIndex - 1 + currentMediaList.length) % currentMediaList.length;
        openFullscreenMedia(currentMediaType, currentMediaIndex);
    }
    
    // Функция закрытия модального окна
    function closeFullscreen() {
        // Останавливаем видео
        if (fullscreenVideo) {
            fullscreenVideo.pause();
            fullscreenVideo.currentTime = 0;
        }
        
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Назначаем обработчики для всех изображений в слайдшоу
    const previewSlides = document.querySelectorAll('#previewSlideshow .slide');
    console.log('Найдено превью слайдов:', previewSlides.length);
    
    previewSlides.forEach((slide, index) => {
        slide.style.cursor = 'pointer';
        slide.addEventListener('click', function() {
            openFullscreenMedia('preview', index);
        });
    });
    
    const avatarSlides = document.querySelectorAll('#avatarSlideshow .slide');
    console.log('Найдено аватар слайдов:', avatarSlides.length);
    
    avatarSlides.forEach((slide, index) => {
        slide.style.cursor = 'pointer';
        slide.addEventListener('click', function() {
            openFullscreenMedia('avatar', index);
        });
    });
    
    // Назначаем обработчик для видео
    const videoDemo = document.querySelector('.demo-video');
    const videoContainer = document.querySelector('.video-demo');
    
    if (videoDemo && videoContainer) {
        videoDemo.style.cursor = 'pointer';
        videoContainer.style.cursor = 'pointer';
        
        videoContainer.addEventListener('click', function() {
            openFullscreenMedia('video', 0);
        });
        
        // Автовоспроизведение видео в превью
        videoDemo.play().catch(e => {
            console.log('Автовоспроизведение не сработало, пробуем с muted:', e);
            videoDemo.muted = true;
            videoDemo.play();
        });
    }
    
    // Кнопки модального окна
    closeBtn.addEventListener('click', closeFullscreen);
    prevBtn.addEventListener('click', prevMedia);
    nextBtn.addEventListener('click', nextMedia);
    
    // Закрытие по клику на фон
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeFullscreen();
        }
    });
    
    // Управление клавиатурой
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeFullscreen();
                break;
            case 'ArrowLeft':
                prevMedia();
                break;
            case 'ArrowRight':
                nextMedia();
                break;
            case ' ':
                // Пауза/плей для видео
                if (fullscreenVideoContainer.style.display === 'block') {
                    if (fullscreenVideo.paused) {
                        fullscreenVideo.play();
                    } else {
                        fullscreenVideo.pause();
                    }
                }
                break;
        }
    });
    
    // Инициализация автоматического слайдшоу
    function initAutoSlideshow() {
        const slideshows = [
            { id: 'previewSlideshow', interval: 3000 },
            { id: 'avatarSlideshow', interval: 3500 }
        ];
        
        slideshows.forEach(slideshow => {
            const container = document.getElementById(slideshow.id);
            if (!container) return;
            
            const slides = container.querySelectorAll('.slide');
            const dots = container.parentElement.querySelector('.slideshow-dots').querySelectorAll('.dot');
            let currentIndex = 0;
            
            if (slides.length === 0) return;
            
            function showSlide(index) {
                // Скрыть все слайды
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                // Показать нужный слайд
                slides[index].classList.add('active');
                if (dots[index]) dots[index].classList.add('active');
                currentIndex = index;
            }
            
            // Автопереключение
            let interval = setInterval(() => {
                let nextIndex = (currentIndex + 1) % slides.length;
                showSlide(nextIndex);
            }, slideshow.interval);
            
            // Остановка при наведении
            container.addEventListener('mouseenter', () => {
                clearInterval(interval);
            });
            
            container.addEventListener('mouseleave', () => {
                interval = setInterval(() => {
                    let nextIndex = (currentIndex + 1) % slides.length;
                    showSlide(nextIndex);
                }, slideshow.interval);
            });
            
            // Клик по точкам
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });
        });
    }
    
    // Запускаем слайдшоу
    initAutoSlideshow();
    
    console.log('Инициализация завершена');
});
