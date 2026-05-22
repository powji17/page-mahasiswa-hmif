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

    const languageToggles = document.querySelectorAll('[data-language-toggle]');
    const translationMap = {
        'Kehidupan Mahasiswa & Himpunan (HMIF)': {
            id: 'Kehidupan Mahasiswa & Himpunan (HMIF)',
            en: 'Student Life & Association (HMIF)'
        },
        'ABOUT US': { id: 'TENTANG KAMI', en: 'ABOUT US' },
        'PROGRAMS': { id: 'PROGRAM', en: 'PROGRAMS' },
        'HUMAN RESOURCES': { id: 'SUMBER DAYA MANUSIA', en: 'HUMAN RESOURCES' },
        'FACILITIES': { id: 'FASILITAS', en: 'FACILITIES' },
        'WORKS & EVENTS': { id: 'KARYA & KEGIATAN', en: 'WORKS & EVENTS' },
        'CONTACT': { id: 'KONTAK', en: 'CONTACT' },
        'COMMUNITY & LEADERSHIP': { id: 'KOMUNITAS & KEPEMIMPINAN', en: 'COMMUNITY & LEADERSHIP' },
        'Membangun ekosistem kolaboratif di mana teknologi bertemu dengan kreativitas, membentuk calon pemimpin industri masa depan.': {
            id: 'Membangun ekosistem kolaboratif di mana teknologi bertemu dengan kreativitas, membentuk calon pemimpin industri masa depan.',
            en: 'Building a collaborative ecosystem where technology meets creativity, shaping future industry leaders.'
        },
        'Lihat Struktur Kepengurusan': { id: 'Lihat Struktur Kepengurusan', en: 'View Organization Structure' },
        'Ruang Tumbuh Bagi Mahasiswa Informatika': {
            id: 'Ruang Tumbuh Bagi<br class="hidden sm:block"> Mahasiswa Informatika',
            en: 'A Growth Space For<br class="hidden sm:block"> Informatics Students'
        },
        'Himpunan Mahasiswa Informatika (HMIF) Universitas Tanjungpura bukan sekadar organisasi, melainkan rumah bagi para pemimpin teknologi. Kami percaya bahwa pendidikan formal adalah fondasi, namun komunitas adalah akselerator.': {
            id: 'Himpunan Mahasiswa Informatika (HMIF) Universitas Tanjungpura bukan sekadar organisasi, melainkan rumah bagi para pemimpin teknologi. Kami percaya bahwa pendidikan formal adalah fondasi, namun komunitas adalah akselerator.',
            en: 'The Informatics Student Association (HMIF) of Universitas Tanjungpura is more than an organization; it is a home for future technology leaders. We believe formal education is the foundation, while community is the accelerator.'
        },
        'Melalui berbagai inisiatif, kami menjembatani kesenjangan antara kurikulum akademik dan kebutuhan industri, sambil tetap menjaga semangat kekeluargaan dan integritas ilmiah.': {
            id: 'Melalui berbagai inisiatif, kami menjembatani kesenjangan antara kurikulum akademik dan kebutuhan industri, sambil tetap menjaga semangat kekeluargaan dan integritas ilmiah.',
            en: 'Through various initiatives, we bridge the gap between academic curricula and industry needs while preserving a spirit of kinship and academic integrity.'
        },
        'Mahasiswa Aktif': { id: 'Mahasiswa Aktif', en: 'Active Students' },
        'Partner Industri': { id: 'Partner Industri', en: 'Industry Partners' },
        'Inklusivitas & Kolaborasi': { id: 'Inklusivitas &amp;<br>Kolaborasi', en: 'Inclusivity &amp;<br>Collaboration' },
        'Partner & Kolaborator': { id: 'Partner &amp; Kolaborator', en: 'Partners & Collaborators' },
        'Divisi Kepengurusan HMIF': { id: 'Divisi Kepengurusan HMIF', en: 'HMIF Management Divisions' },
        'Struktur organisasi yang dirancang untuk efisiensi dan pengembangan kapasitas anggota di berbagai bidang strategis.': {
            id: 'Struktur organisasi yang dirancang untuk efisiensi dan pengembangan kapasitas anggota di berbagai bidang strategis.',
            en: 'An organizational structure designed for efficiency and member capacity development across strategic areas.'
        },
        'Bidang 1': { id: 'Bidang 1', en: 'Division 1' },
        'Bidang 2': { id: 'Bidang 2', en: 'Division 2' },
        'Bidang 3': { id: 'Bidang 3', en: 'Division 3' },
        'Bidang 4': { id: 'Bidang 4', en: 'Division 4' },
        'Bidang 5': { id: 'Bidang 5', en: 'Division 5' },
        'Bidang 6': { id: 'Bidang 6', en: 'Division 6' },
        'Pengembangan Sumber Daya Mahasiswa dan Kaderisasi': {
            id: 'Pengembangan Sumber Daya Mahasiswa dan Kaderisasi',
            en: 'Student Resource Development and Cadre Formation'
        },
        'Mendukung mahasiswa untuk terus berkembang, dengan pembinaan dan kaderisasi yang berkelanjutan.': {
            id: 'Mendukung mahasiswa untuk terus berkembang, dengan pembinaan dan kaderisasi yang berkelanjutan.',
            en: 'Supporting students to keep growing through continuous mentoring and cadre development.'
        },
        'Pengembangan Organisasi': { id: 'Pengembangan Organisasi', en: 'Organizational Development' },
        'Mendukung organisasi agar berjalan lebih rapi, terstruktur, dan semakin berkembang.': {
            id: 'Mendukung organisasi agar berjalan lebih rapi, terstruktur, dan semakin berkembang.',
            en: 'Helping the organization run in a more orderly, structured, and progressive way.'
        },
        'Media Komunikasi dan Konten Digital': {
            id: 'Media Komunikasi dan Konten Digital',
            en: 'Communication Media and Digital Content'
        },
        'Mengelola media dan komunikasi digital untuk menyampaikan informasi dengan lebih menarik dan mudah diakses.': {
            id: 'Mengelola media dan komunikasi digital untuk menyampaikan informasi dengan lebih menarik dan mudah diakses.',
            en: 'Managing digital media and communication to deliver information in a more engaging and accessible way.'
        },
        'Sosial Masyarakat': { id: 'Sosial Masyarakat', en: 'Community Service' },
        'Berbagi dan berkontribusi melalui berbagai kegiatan sosial, sekaligus membawa dampak positif bagi masyarakat.': {
            id: 'Berbagi dan berkontribusi melalui berbagai kegiatan sosial, sekaligus membawa dampak positif bagi masyarakat.',
            en: 'Sharing and contributing through social activities while bringing positive impact to the community.'
        },
        'Inovasi dan Kompetisi Teknologi': {
            id: 'Inovasi dan Kompetisi Teknologi',
            en: 'Technology Innovation and Competition'
        },
        'Mengembangkan inovasi dan skill teknologi, sambil mendorong mahasiswa untuk berani mencoba dan ikut berbagai tantangan.': {
            id: 'Mengembangkan inovasi dan skill teknologi, sambil mendorong mahasiswa untuk berani mencoba dan ikut berbagai tantangan.',
            en: 'Developing innovation and technology skills while encouraging students to try new challenges.'
        },
        'Kewirausahaan dan Kemitraan': { id: 'Kewirausahaan dan Kemitraan', en: 'Entrepreneurship and Partnership' },
        'Mengembangkan jiwa kewirausahaan, sekaligus membangun kolaborasi dan membuka peluang bersama berbagai mitra.': {
            id: 'Mengembangkan jiwa kewirausahaan, sekaligus membangun kolaborasi dan membuka peluang bersama berbagai mitra.',
            en: 'Developing an entrepreneurial mindset while building collaboration and opportunities with partners.'
        },
        'Kegiatan Unggulan': { id: 'Kegiatan Unggulan', en: 'Featured Activities' },
        'Kegiatan tahunan yang menjadi ikon Informatika UNTAN.': {
            id: 'Kegiatan tahunan yang menjadi ikon Informatika UNTAN.',
            en: 'Annual activities that have become icons of Informatics UNTAN.'
        },
        'Kompetisi Coding untuk mengasah skill coding mahasiswa Informatika.': {
            id: 'Kompetisi Coding untuk mengasah skill coding mahasiswa Informatika.',
            en: 'A coding competition to sharpen Informatics students coding skills.'
        },
        'Silaturahmi Keluarga Besar Informatika': {
            id: 'Silaturahmi Keluarga Besar Informatika',
            en: 'Informatics Family Gathering'
        },
        'Kegiatan buka bersama seluruh keluarga Informatika Untan yang selalu diadakan setiap tahunnya.': {
            id: 'Kegiatan buka bersama seluruh keluarga Informatika Untan yang selalu diadakan setiap tahunnya.',
            en: 'An annual iftar gathering for the entire Informatics UNTAN family.'
        },
        'Okt': { id: 'Okt', en: 'Oct' },
        'Ultah Informatika': { id: 'Ultah Informatika', en: 'Informatics Anniversary' },
        'Perayaan ulang tahun Informatika UNTAN, momen kebersamaan dan kebanggaan seluruh keluarga besar Informatika.': {
            id: 'Perayaan ulang tahun Informatika UNTAN, momen kebersamaan dan kebanggaan seluruh keluarga besar Informatika.',
            en: 'The Informatics UNTAN anniversary celebration, a moment of togetherness and pride for the whole Informatics family.'
        },
        'Agu': { id: 'Agu', en: 'Aug' },
        'Program intensif pengembangan skill teknis mahasiswa Informatika bersama mentor profesional dari industri.': {
            id: 'Program intensif pengembangan skill teknis mahasiswa Informatika bersama mentor profesional dari industri.',
            en: 'An intensive program for developing Informatics students technical skills with professional mentors from industry.'
        },
        'STUDY CLUB': { id: 'STUDY CLUB', en: 'STUDY CLUB' },
        'Belajar logika dan algoritma bersama, di mana kalian bisa berkembang dan membuka peluang mengikuti kompetisi pemrograman di berbagai level.': {
            id: 'Belajar logika dan algoritma bersama, di mana kalian bisa berkembang dan membuka peluang mengikuti kompetisi pemrograman di berbagai level.',
            en: 'Learn logic and algorithms together, grow your abilities, and open opportunities to join programming competitions at various levels.'
        },
        'Di sini, kalian bisa belajar membuat website dan aplikasi web, sekaligus mengembangkan ide menjadi sesuatu yang nyata.': {
            id: 'Di sini, kalian bisa belajar membuat website dan aplikasi web, sekaligus mengembangkan ide menjadi sesuatu yang nyata.',
            en: 'Here, you can learn to build websites and web applications while turning ideas into something real.'
        },
        'Belajar memahami sistem dan cara menjaganya, supaya lebih siap menghadapi berbagai ancaman digital.': {
            id: 'Belajar memahami sistem dan cara menjaganya, supaya lebih siap menghadapi berbagai ancaman digital.',
            en: 'Learn to understand systems and how to protect them, so you are better prepared for digital threats.'
        },
        'Galeri Keseruan': { id: 'Galeri Keseruan', en: 'Activity Gallery' },
        'Ada yang Ingin Ditanyakan Seputar HMIF?': {
            id: 'Ada yang Ingin Ditanyakan Seputar HMIF?',
            en: 'Have Questions About HMIF?'
        },
        'Bergabunglah dengan HMIF untuk memperluas jaringan, mengasah skill, dan menciptakan dampak nyata.': {
            id: 'Bergabunglah dengan HMIF untuk memperluas jaringan, mengasah skill, dan menciptakan dampak nyata.',
            en: 'Join HMIF to expand your network, sharpen your skills, and create real impact.'
        },
        'Hubungi Kami': { id: 'Hubungi Kami', en: 'Contact Us' },
        'Sekretariat': { id: 'Sekretariat', en: 'Secretariat' },
        'Jam Operasional': { id: 'Jam Operasional', en: 'Operating Hours' },
        'Senin - Jumat 08:00 - 17:00 WIB': {
            id: 'Senin - Jumat<br>08:00 - 17:00 WIB',
            en: 'Monday - Friday<br>08:00 - 17:00 WIB'
        },
        'Media Sosial': { id: 'Media Sosial', en: 'Social Media' },
        'FOLLOW US': { id: 'IKUTI KAMI', en: 'FOLLOW US' }
    };

    function normalizeText(value) {
        return value.replace(/\s+/g, ' ').trim();
    }

    function markTranslatableElements() {
        document.querySelectorAll('a, button, h1, h2, h3, p, span').forEach(function (element) {
            const key = normalizeText(element.textContent || '');
            if (translationMap[key]) {
                element.dataset.i18nKey = key;
            }
        });
    }

    function renderTranslatedText(element, value) {
        if (value.indexOf('<') !== -1) {
            element.innerHTML = value;
            return;
        }

        element.textContent = value;
    }

    function updateLanguageToggle(language) {
        languageToggles.forEach(function (toggle) {
            toggle.innerHTML = language === 'id'
                ? '<span class="text-hmif-secondary">ID</span> | <span>EN</span>'
                : '<span>ID</span> | <span class="text-hmif-secondary">EN</span>';
            toggle.setAttribute('aria-pressed', String(language === 'en'));
            toggle.setAttribute('aria-label', language === 'id' ? 'Ganti bahasa ke Inggris' : 'Switch language to Indonesian');
        });
    }

    function applyLanguage(language) {
        const safeLanguage = language === 'en' ? 'en' : 'id';

        document.documentElement.lang = safeLanguage;
        document.title = translationMap['Kehidupan Mahasiswa & Himpunan (HMIF)'][safeLanguage];

        document.querySelectorAll('[data-i18n-key]').forEach(function (element) {
            const key = element.dataset.i18nKey;
            renderTranslatedText(element, translationMap[key][safeLanguage]);
        });

        updateLanguageToggle(safeLanguage);

        try {
            localStorage.setItem('hmif-language', safeLanguage);
        } catch (error) {
            // Browser may block localStorage in private contexts.
        }
    }

    if (languageToggles.length) {
        markTranslatableElements();

        let savedLanguage = 'id';
        try {
            savedLanguage = localStorage.getItem('hmif-language') || 'id';
        } catch (error) {
            savedLanguage = 'id';
        }

        applyLanguage(savedLanguage);
        languageToggles.forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                applyLanguage(document.documentElement.lang === 'en' ? 'id' : 'en');
            });
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
