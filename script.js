// script.js - SIMPLE & WORKING VERSION

// ======================
// 1. NAVIGASI MOBILE
// ======================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Tutup menu jika klik di luar
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ======================
// 2. SLIDESHOW - FIXED!
// ======================
document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah kita di halaman galeri
    if (document.querySelector('.slideshow')) {
        console.log('🎯 Slideshow ditemukan, memulai...');
        initSlideshow();
    }
    
    // Modal untuk gambar
    if (document.getElementById('imageModal')) {
        initImageModal();
    }
    
    // Map interaction
    if (document.getElementById('showDirectionBtn')) {
        initMapInteraction();
    }
    
    // Active navigation
    setActiveNav();
});

// Fungsi utama slideshow
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    if (slides.length === 0) {
        console.log('⚠️ Tidak ada slide ditemukan');
        return;
    }
    
    console.log(`✅ Ditemukan ${slides.length} slide`);
    
    let currentSlideIndex = 0;
    let isPlaying = true;
    let slideInterval;
    
    // Update slide counter
    function updateCounter() {
        const currentSlideEl = document.getElementById('currentSlide');
        const totalSlidesEl = document.getElementById('totalSlides');
        
        if (currentSlideEl) {
            currentSlideEl.textContent = currentSlideIndex + 1;
        }
        if (totalSlidesEl) {
            totalSlidesEl.textContent = slides.length;
        }
    }
    
    // Pindah ke slide tertentu
    function goToSlide(index) {
        // Validasi index
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Sembunyikan semua slide
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Nonaktifkan semua indikator
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Tampilkan slide baru
        slides[index].classList.add('active');
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        // Update index
        currentSlideIndex = index;
        
        // Update counter
        updateCounter();
    }
    
    // Slide berikutnya
    function nextSlide() {
        goToSlide(currentSlideIndex + 1);
    }
    
    // Slide sebelumnya
    function prevSlide() {
        goToSlide(currentSlideIndex - 1);
    }
    
    // Mulai slideshow otomatis
    function startSlideshow() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
        isPlaying = true;
        
        // Update tombol play/pause
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Jeda Slideshow';
            const icon = playPauseBtn.querySelector('i');
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        }
    }
    
    // Hentikan slideshow
    function stopSlideshow() {
        if (slideInterval) clearInterval(slideInterval);
        isPlaying = false;
        
        // Update tombol play/pause
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Mainkan Slideshow';
            const icon = playPauseBtn.querySelector('i');
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    }
    
    // Toggle play/pause
    function togglePlayPause() {
        if (isPlaying) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    }
    
    // Setup event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        console.log('✅ Next button terhubung');
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
        console.log('✅ Prev button terhubung');
    }
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
        console.log('✅ Play/Pause button terhubung');
    }
    
    // Indikator
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // Inisialisasi
    goToSlide(0);
    startSlideshow();
    
    console.log('✅ Slideshow siap digunakan!');
}

// ======================
// 3. MODAL GAMBAR
// ======================
function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.getElementById('closeModal');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    if (!modal) return;
    
    // Buka modal
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img');
            const caption = this.getAttribute('data-caption');
            
            modalImg.src = imgSrc;
            modalImg.alt = caption;
            modalCaption.textContent = caption;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Tutup modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Tutup jika klik di luar
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Tutup dengan ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// ======================
// 4. INTERAKSI PETA
// ======================
function initMapInteraction() {
    const showDirectionBtn = document.getElementById('showDirectionBtn');
    const directionSection = document.getElementById('directionSection');
    const mapPoints = document.querySelectorAll('.map-point');
    
    if (showDirectionBtn && directionSection) {
        showDirectionBtn.addEventListener('click', function() {
            directionSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                alert('📢 Tips Pendakian: Pastikan bawa perlengkapan cukup dan cek cuaca sebelum mendaki!');
            }, 300);
        });
    }
    
    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            alert(`📍 Anda mengklik: ${location}`);
        });
    });
}

// ======================
// 5. NAVIGASI AKTIF
// ======================
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ======================
// 6. DEBUG INFO
// ======================
console.log('🚀 Website Gunung Kembang berhasil dimuat!');
console.log('📁 Path JS:', window.location.pathname);