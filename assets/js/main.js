// ============================================
// Galeri Keseruan — Bento Grid Slider
//
// Fitur:
// - Auto-slide setiap 4 detik (cukup untuk menikmati foto)
// - Navigasi manual dengan tombol kiri/kanan
// - Klik dot indicator untuk lompat ke slide tertentu
// - Loop otomatis: setelah slide terakhir kembali ke slide pertama
// - Pause saat kursor di atas galeri (hover)
// - Recalculate posisi slide saat browser di-resize
// ============================================

(function () {

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden', !isHidden);
            mobileMenuButton.setAttribute('aria-expanded', String(isHidden));
        });
    }

    // --- Konfigurasi ---
    const TOTAL_SLIDES = 3;
    const AUTO_DELAY_MS = 4000; // 4 detik per slide

    // --- Elemen DOM ---
    const track    = document.getElementById('galeri-track');
    const viewport = document.getElementById('galeri-viewport');
    const prevBtn  = document.getElementById('galeri-prev');
    const nextBtn  = document.getElementById('galeri-next');
    const dots     = document.querySelectorAll('.galeri-dot');

    // Guard: hentikan jika elemen tidak ditemukan di halaman
    if (!track || !viewport || !prevBtn || !nextBtn) return;

    // --- State ---
    let currentSlide = 0;
    let autoSlideTimer;

    // --- Fungsi ---

    /**
     * Pindah ke slide dengan index tertentu.
     * Menggunakan modulo agar loop kembali ke awal setelah slide terakhir,
     * dan ke akhir jika mundur dari slide pertama.
     *
     * @param {number} index - Index slide tujuan
     */
    function goToSlide(index) {
        currentSlide = ((index % TOTAL_SLIDES) + TOTAL_SLIDES) % TOTAL_SLIDES;

        const slideWidth = viewport.offsetWidth;
        track.style.transform = 'translateX(-' + (currentSlide * slideWidth) + 'px)';

        updateDotIndicators(currentSlide);
    }

    /**
     * Update tampilan dot indicator sesuai slide yang aktif.
     * Dot aktif: lebar (w-6) dan berwarna primary.
     * Dot tidak aktif: bulat kecil (w-2.5) dan berwarna abu.
     *
     * @param {number} activeIndex - Index slide yang sedang aktif
     */
    function updateDotIndicators(activeIndex) {
        dots.forEach(function (dot, i) {
            if (i === activeIndex) {
                dot.classList.remove('bg-gray-200', 'w-2.5');
                dot.classList.add('bg-hmif-primary', 'w-6');
            } else {
                dot.classList.remove('bg-hmif-primary', 'w-6');
                dot.classList.add('bg-gray-200', 'w-2.5');
            }
        });
    }

    /**
     * Mulai atau restart timer auto-slide.
     * clearInterval terlebih dahulu agar tidak ada timer ganda.
     */
    function startAutoSlide() {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(function () {
            goToSlide(currentSlide + 1);
        }, AUTO_DELAY_MS);
    }

    // --- Event Listeners ---

    // Tombol navigasi manual (kiri)
    prevBtn.addEventListener('click', function () {
        goToSlide(currentSlide - 1);
        startAutoSlide(); // Reset timer setelah navigasi manual
    });

    // Tombol navigasi manual (kanan)
    nextBtn.addEventListener('click', function () {
        goToSlide(currentSlide + 1);
        startAutoSlide();
    });

    // Klik dot indicator untuk lompat ke slide tertentu
    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            goToSlide(Number(dot.dataset.index));
            startAutoSlide();
        });
    });

    // Pause auto-slide saat kursor di atas galeri (user sedang menikmati foto)
    viewport.addEventListener('mouseenter', function () {
        clearInterval(autoSlideTimer);
    });
    viewport.addEventListener('mouseleave', startAutoSlide);

    // Recalculate posisi slide saat ukuran browser berubah
    window.addEventListener('resize', function () {
        goToSlide(currentSlide);
    });

    // --- Inisialisasi ---
    goToSlide(0);
    startAutoSlide();

})();
