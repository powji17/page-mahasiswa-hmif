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
        'MITRA': { id: 'MITRA', en: 'PARTNERS' },
        'Partner Industri': { id: 'Partner Industri', en: 'Industry Partners' },
        'Inklusivitas & Kolaborasi': { id: 'Inklusivitas &<br>Kolaborasi', en: 'Inclusivity &<br>Collaboration' },
        'Partner & Kolaborator': { id: 'Partner & Kolaborator', en: 'Partners & Collaborators' },
        'Partner dan Kolaborator': { id: 'Partner dan Kolaborator', en: 'Partners and Collaborators' },
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
        'Divisi ini menyelenggarakan kaderisasi terstruktur, mentoring berkala, dan pelatihan kepemimpinan serta soft-skill. Program kerja mencakup onboarding anggota baru, workshop kepemimpinan, proyek kolaboratif, dan kegiatan pengabdian yang melatih tanggung jawab sosial. Fokusnya adalah menyiapkan kader yang kompeten dan menjaga regenerasi organisasi.': {
            id: 'Divisi ini menyelenggarakan kaderisasi terstruktur, mentoring berkala, dan pelatihan kepemimpinan serta soft-skill. Program kerja mencakup onboarding anggota baru, workshop kepemimpinan, proyek kolaboratif, dan kegiatan pengabdian yang melatih tanggung jawab sosial. Fokusnya adalah menyiapkan kader yang kompeten dan menjaga regenerasi organisasi.',
            en: 'This division runs structured cadre development, regular mentoring, and leadership and soft-skill training. Its programs include new member onboarding, leadership workshops, collaborative projects, and community service activities that build social responsibility. The focus is preparing competent members and sustaining organizational regeneration.'
        },
        'Mendukung mahasiswa untuk terus berkembang, dengan pembinaan dan kaderisasi yang berkelanjutan.': {
            id: 'Mendukung mahasiswa untuk terus berkembang, dengan pembinaan dan kaderisasi yang berkelanjutan.',
            en: 'Supporting students to keep growing through continuous mentoring and cadre development.'
        },
        'Pengembangan Organisasi': { id: 'Pengembangan Organisasi', en: 'Organizational Development' },
        'Divisi ini memperkuat tata kelola dan kapabilitas internal melalui pelatihan pengurus, penyusunan SOP sederhana, dan evaluasi proses kerja. Program kerjanya mencakup pengembangan budaya organisasi, peningkatan efektivitas koordinasi, dan kegiatan peningkatan profesionalisme sehingga operasi HMIF menjadi lebih terstruktur dan efisien.': {
            id: 'Divisi ini memperkuat tata kelola dan kapabilitas internal melalui pelatihan pengurus, penyusunan SOP sederhana, dan evaluasi proses kerja. Program kerjanya mencakup pengembangan budaya organisasi, peningkatan efektivitas koordinasi, dan kegiatan peningkatan profesionalisme sehingga operasi HMIF menjadi lebih terstruktur dan efisien.',
            en: 'This division strengthens governance and internal capability through board training, simple SOP development, and workflow evaluation. Its programs include organizational culture development, coordination effectiveness improvement, and professionalism initiatives so HMIF operations become more structured and efficient.'
        },
        'Mendukung organisasi agar berjalan lebih rapi, terstruktur, dan semakin berkembang.': {
            id: 'Mendukung organisasi agar berjalan lebih rapi, terstruktur, dan semakin berkembang.',
            en: 'Helping the organization run in a more orderly, structured, and progressive way.'
        },
        'Media Komunikasi dan Konten Digital': {
            id: 'Media Komunikasi dan Konten Digital',
            en: 'Communication Media and Digital Content'
        },
        'Divisi ini mengelola strategi komunikasi dan produksi konten HMIF, termasuk perencanaan editorial, manajemen media sosial, serta dokumentasi acara. Program kerjanya meliputi pembuatan materi promosi, publikasi kegiatan, dan penguatan identitas digital agar informasi organisasi tersampaikan konsisten dan menarik.': {
            id: 'Divisi ini mengelola strategi komunikasi dan produksi konten HMIF, termasuk perencanaan editorial, manajemen media sosial, serta dokumentasi acara. Program kerjanya meliputi pembuatan materi promosi, publikasi kegiatan, dan penguatan identitas digital agar informasi organisasi tersampaikan konsisten dan menarik.',
            en: 'This division manages HMIF communication strategy and content production, including editorial planning, social media management, and event documentation. Its programs cover promotional materials, activity publications, and digital identity strengthening so organizational information is delivered consistently and attractively.'
        },
        'Mengelola media dan komunikasi digital untuk menyampaikan informasi dengan lebih menarik dan mudah diakses.': {
            id: 'Mengelola media dan komunikasi digital untuk menyampaikan informasi dengan lebih menarik dan mudah diakses.',
            en: 'Managing digital media and communication to deliver information in a more engaging and accessible way.'
        },
        'Sosial Masyarakat': { id: 'Sosial Masyarakat', en: 'Community Service' },
        'Divisi ini merancang dan melaksanakan program pengabdian serta aksi sosial yang berdampak, termasuk pendampingan komunitas dan bantuan kemanusiaan. Kegiatan meliputi identifikasi kebutuhan lapangan, pelaksanaan terstruktur, dan evaluasi dampak untuk memastikan keberlanjutan dan manfaat nyata bagi masyarakat.': {
            id: 'Divisi ini merancang dan melaksanakan program pengabdian serta aksi sosial yang berdampak, termasuk pendampingan komunitas dan bantuan kemanusiaan. Kegiatan meliputi identifikasi kebutuhan lapangan, pelaksanaan terstruktur, dan evaluasi dampak untuk memastikan keberlanjutan dan manfaat nyata bagi masyarakat.',
            en: 'This division designs and carries out impactful community service programs and social actions, including community assistance and humanitarian support. Activities include field needs assessment, structured implementation, and impact evaluation to ensure sustainability and real benefits for the community.'
        },
        'Berbagi dan berkontribusi melalui berbagai kegiatan sosial, sekaligus membawa dampak positif bagi masyarakat.': {
            id: 'Berbagi dan berkontribusi melalui berbagai kegiatan sosial, sekaligus membawa dampak positif bagi masyarakat.',
            en: 'Sharing and contributing through social activities while bringing positive impact to the community.'
        },
        'Inovasi dan Kompetisi Teknologi': {
            id: 'Inovasi dan Kompetisi Teknologi',
            en: 'Technology Innovation and Competition'
        },
        'Divisi ini memfasilitasi persiapan lomba dan pengembangan proyek teknis melalui coaching clinic, bootcamp berbasis proyek, serta study club untuk Competitive Programming, Software Development, dan Data/ML. Kegiatan termasuk seleksi internal, bimbingan kompetitif, dan inisiatif digitalisasi seperti pengembangan website dan dashboard untuk mendukung ekosistem inovasi HMIF.': {
            id: 'Divisi ini memfasilitasi persiapan lomba dan pengembangan proyek teknis melalui coaching clinic, bootcamp berbasis proyek, serta study club untuk Competitive Programming, Software Development, dan Data/ML. Kegiatan termasuk seleksi internal, bimbingan kompetitif, dan inisiatif digitalisasi seperti pengembangan website dan dashboard untuk mendukung ekosistem inovasi HMIF.',
            en: 'This division facilitates competition preparation and technical project development through coaching clinics, project-based bootcamps, and study clubs for Competitive Programming, Software Development, and Data/ML. Activities include internal selection, competitive mentoring, and digitalization initiatives such as website and dashboard development to support HMIF innovation.'
        },
        'Mengembangkan inovasi dan skill teknologi, sambil mendorong mahasiswa untuk berani mencoba dan ikut berbagai tantangan.': {
            id: 'Mengembangkan inovasi dan skill teknologi, sambil mendorong mahasiswa untuk berani mencoba dan ikut berbagai tantangan.',
            en: 'Developing innovation and technology skills while encouraging students to try new challenges.'
        },
        'Kewirausahaan dan Kemitraan': { id: 'Kewirausahaan dan Kemitraan', en: 'Entrepreneurship and Partnership' },
        'Divisi ini mengembangkan unit usaha organisasi, merancang skema pendanaan kreatif, dan menjalin kemitraan strategis untuk mendukung keberlanjutan program HMIF. Unit kerjanya meliputi riset peluang usaha, penyusunan proposal kemitraan, dan pengelolaan sponsor untuk meningkatkan kemandirian finansial dan akses jaringan profesional.': {
            id: 'Divisi ini mengembangkan unit usaha organisasi, merancang skema pendanaan kreatif, dan menjalin kemitraan strategis untuk mendukung keberlanjutan program HMIF. Unit kerjanya meliputi riset peluang usaha, penyusunan proposal kemitraan, dan pengelolaan sponsor untuk meningkatkan kemandirian finansial dan akses jaringan profesional.',
            en: 'This division develops organizational business units, designs creative funding schemes, and builds strategic partnerships to support HMIF program sustainability. Its work includes business opportunity research, partnership proposal development, and sponsor management to improve financial independence and professional network access.'
        },
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
        'Feb': { id: 'Feb', en: 'Feb' },
        'Jul': { id: 'Jul', en: 'Jul' },
        'Sep': { id: 'Sep', en: 'Sep' },
        'Kegiatan buka bersama seluruh keluarga Informatika Untan yang selalu diadakan setiap tahunnya.': {
            id: 'Kegiatan buka bersama seluruh keluarga Informatika Untan yang selalu diadakan setiap tahunnya.',
            en: 'An annual iftar gathering for the entire Informatics UNTAN family.'
        },
        'Program intensif GEMASTIK adalah kompetisi IT tahunan tingkat nasional yang mempertemukan mahasiswa se-Indonesia. Lomba ini fokus pada pemecahan masalah lewat teknologi, dengan cabang yang beragam seperti programming, cyber security, data mining, sampai pengembangan UI/UX.': {
            id: 'Program intensif GEMASTIK adalah kompetisi IT tahunan tingkat nasional yang mempertemukan mahasiswa se-Indonesia. Lomba ini fokus pada pemecahan masalah lewat teknologi, dengan cabang yang beragam seperti <em>programming</em>, <em>cyber security</em>, <em>data mining</em>, sampai pengembangan UI/UX.',
            en: 'GEMASTIK is an intensive annual national IT competition that brings together students from across Indonesia. It focuses on solving problems through technology, with categories ranging from <em>programming</em>, <em>cyber security</em>, and <em>data mining</em> to UI/UX development.'
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
        'Gali potensi tersembunyi dari tumpukan data! Di sini kita akan bereksplorasi dengan algoritma Machine Learning, membedah teknik klasifikasi, hingga melatih model prediktif untuk menghasilkan insight yang bermakna.': {
            id: 'Gali potensi tersembunyi dari tumpukan data! Di sini kita akan bereksplorasi dengan algoritma <em>Machine Learning</em>, membedah teknik klasifikasi, hingga melatih model prediktif untuk menghasilkan <em>insight</em> yang bermakna.',
            en: 'Explore hidden potential in piles of data! Here we experiment with <em>Machine Learning</em> algorithms, examine classification techniques, and train predictive models to produce meaningful <em>insights</em>.'
        },
        'Wujudkan idemu jadi produk digital yang nyata! Kita akan ngoding bareng dari merancang frontend yang interaktif, membangun backend yang tangguh, serta mengintegrasikan berbagai API untuk menciptakan aplikasi web masa kini.': {
            id: 'Wujudkan idemu jadi produk digital yang nyata! Kita akan ngoding bareng dari merancang <em>frontend</em> yang interaktif, membangun <em>backend</em> yang tangguh, serta mengintegrasikan berbagai API untuk menciptakan aplikasi web masa kini.',
            en: 'Turn your ideas into real digital products! We will code together, from designing interactive <em>frontends</em> and building robust <em>backends</em> to integrating APIs for modern web applications.'
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
        'Gedung Fakultas Teknik Lt. 2 Jl. Prof. Dr. H. Hadari Nawawi': {
            id: 'Gedung Fakultas Teknik Lt. 2<br>Jl. Prof. Dr. H. Hadari Nawawi',
            en: 'Faculty of Engineering Building, 2nd Floor<br>Jl. Prof. Dr. H. Hadari Nawawi'
        },
        'Jam Operasional': { id: 'Jam Operasional', en: 'Operating Hours' },
        'Senin - Jumat 08:00 - 17:00 WIB': {
            id: 'Senin - Jumat<br>08:00 - 17:00 WIB',
            en: 'Monday - Friday<br>08:00 - 17:00 WIB'
        },
        'Media Sosial': { id: 'Media Sosial', en: 'Social Media' },
        'Jl. Prof. Dr. H. Hadari Nawawi, Bansir Laut, Kec. Pontianak Tenggara,': {
            id: 'Jl. Prof. Dr. H. Hadari Nawawi, Bansir Laut, Kec. Pontianak Tenggara,',
            en: 'Prof. Dr. H. Hadari Nawawi St., Bansir Laut, Southeast Pontianak District,'
        },
        'Kota Pontianak, Kalimantan Barat 78124': {
            id: 'Kota Pontianak, Kalimantan Barat 78124',
            en: 'Pontianak City, West Kalimantan 78124'
        },
        'FOLLOW US': { id: 'IKUTI KAMI', en: 'FOLLOW US' }
    };

    function normalizeText(value) {
        return value.replace(/\s+/g, ' ').trim();
    }

    function getElementText(element) {
        function collectText(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.nodeValue;
            }

            if (node.nodeName === 'BR') {
                return ' ';
            }

            return Array.prototype.map.call(node.childNodes, collectText).join('');
        }

        return normalizeText(collectText(element));
    }

    const translationLookup = Object.keys(translationMap).reduce(function (lookup, key) {
        lookup[normalizeText(key)] = key;
        lookup[normalizeText(translationMap[key].id)] = key;
        lookup[normalizeText(translationMap[key].id.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]*>/g, ''))] = key;
        return lookup;
    }, {});

    function markTranslatableElements() {
        document.querySelectorAll('a, button, h1, h2, h3, p, span').forEach(function (element) {
            const key = translationLookup[getElementText(element)];
            if (key) {
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
