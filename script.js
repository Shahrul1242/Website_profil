// Data struktur JSON untuk konten website
const websiteData = {
    "schoolInfo": {
        "name": "MAN 1 Rembang",
        "address": "Jl. Pemuda KM 2.5, Rembang",
        "phone": "(0295) 691326",
        "email": "man1rembang@kemenag.go.id",
        "socialMedia": {
            "facebook": "https://facebook.com/man1rembang",
            "instagram": "https://instagram.com/man1rembang",
            "youtube": "https://youtube.com/man1rembang"
        }
    },
    
    "headlines": [
        {
            "id": 1,
            "title": "Penerimaan Siswa Baru Tahun 2025/2026",
            "date": "2025-02-01",
            "image": "ppdb2025.jpg",
            "excerpt": "MAN 1 Rembang membuka pendaftaran siswa baru tahun ajaran 2025/2026..."
        },
        {
            "id": 2,
            "title": "Prestasi Olimpiade Sains",
            "date": "2025-01-15",
            "image": "olimpiade.jpg",
            "excerpt": "Siswa MAN 1 Rembang meraih medali emas dalam Olimpiade Sains Nasional..."
        }
    ],

    "facilities": [
        {
            "name": "Ruang Kelas",
            "total": 24,
            "description": "Ruang kelas ber-AC dilengkapi LCD Projector",
            "image": "kelas.jpg"
        },
        {
            "name": "Laboratorium",
            "total": 4,
            "description": "Lab. Fisika, Kimia, Biologi, dan Komputer",
            "image": "lab.jpg"
        },
        {
            "name": "Perpustakaan",
            "total": 1,
            "description": "Perpustakaan digital dengan koleksi lengkap",
            "image": "perpustakaan.jpg"
        }
    ]
};

// Script untuk navbar sticky dan smooth scroll
document.addEventListener('DOMContentLoaded', function() {
    // Sticky Navbar
    const navbar = document.querySelector('header');
    const sticky = navbar.offsetTop;

    function handleScroll() {
        if (window.pageYOffset > sticky) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    }

    window.onscroll = handleScroll;

    // Smooth Scroll untuk navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});

// Fungsi untuk loading berita terbaru
function loadLatestNews() {
    const newsContainer = document.querySelector('.berita-terbaru');
    if (!newsContainer) return;

    websiteData.headlines.forEach(news => {
        const article = document.createElement('article');
        article.className = 'berita-item fade-in';
        
        article.innerHTML = `
            <img src="images/${news.image}" alt="${news.title}">
            <h3>${news.title}</h3>
            <p class="tanggal">${formatDate(news.date)}</p>
            <p class="excerpt">${news.excerpt}</p>
            <a href="#" class="read-more">Baca selengkapnya</a>
        `;
        
        newsContainer.appendChild(article);
    });
}

// Fungsi format tanggal
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Fungsi untuk image slider di hero section
class ImageSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        this.slides = this.slider.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        this.init();
    }

    init() {
        this.createNavigationDots();
        this.showSlide(0);
        this.startAutoSlide();
    }

    createNavigationDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';

        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.addEventListener('click', () => this.showSlide(index));
            dotsContainer.appendChild(dot);
        });

        this.slider.appendChild(dotsContainer);
    }

    showSlide(index) {
        this.slides.forEach(slide => slide.style.display = 'none');
        document.querySelectorAll('.slider-dots button')
            .forEach(dot => dot.classList.remove('active'));

        this.slides[index].style.display = 'block';
        document.querySelectorAll('.slider-dots button')[index]
            .classList.add('active');
        
        this.currentSlide = index;
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
    }
}

// Fungsi untuk galeri foto
function initializeGallery() {
    const gallery = document.querySelector('.galeri-foto');
    if (!gallery) return;

    gallery.addEventListener('click', e => {
        const img = e.target.closest('.foto-item img');
        if (!img) return;

        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${img.src}" alt="${img.alt}">
                <button class="close-modal">&times;</button>
            </div>
        `;

        document.body.appendChild(modal);
        modal.addEventListener('click', e => {
            if (e.target.classList.contains('gallery-modal') || 
                e.target.classList.contains('close-modal')) {
                modal.remove();
            }
        });
    });
}

// Form validasi untuk PPDB
function validatePPDBForm(form) {
    const required = ['nama', 'nisn', 'tanggalLahir', 'asalSekolah'];
    const errors = [];

    required.forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        if (!input.value.trim()) {
            errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} harus diisi`);
        }
    });

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return false;
    }
    return true;
}

// Fungsi untuk loading data fasilitas
function loadFacilities() {
    const facilityContainer = document.querySelector('.fasilitas-items');
    if (!facilityContainer) return;

    websiteData.facilities.forEach(facility => {
        const facilityElement = document.createElement('div');
        facilityElement.className = 'fasilitas-item fade-in';
        
        facilityElement.innerHTML = `
            <img src="images/${facility.image}" alt="${facility.name}">
            <h3>${facility.name}</h3>
            <p>${facility.description}</p>
            <p>Jumlah: ${facility.total}</p>
        `;
        
        facilityContainer.appendChild(facilityElement);
    });
}

// Inisialisasi semua fungsi saat dokumen dimuat
document.addEventListener('DOMContentLoaded', function() {
    loadLatestNews();
    initializeGallery();
    loadFacilities();
    
    // Inisialisasi image slider jika ada
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        new ImageSlider('.hero-slider');
    }

    // Event listener untuk form PPDB
    const ppdbForm = document.querySelector('#ppdb-form');
    if (ppdbForm) {
        ppdbForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validatePPDBForm(this)) {
                // Proses pengiriman form
                console.log('Form valid, siap dikirim');
            }
        });
    }

    // Animasi scroll reveal
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    fadeElements.forEach(element => observer.observe(element));
});

// Fungsi untuk loading maps
function initMap() {
    const mapContainer = document.querySelector('#map');
    if (!mapContainer) return;

    const schoolLocation = {
        lat: -6.7123, // Ganti dengan koordinat sebenarnya
        lng: 111.3456 // Ganti dengan koordinat sebenarnya
    };

    const map = new google.maps.Map(mapContainer, {
        zoom: 15,
        center: schoolLocation
    });

    new google.maps.Marker({
        position: schoolLocation,
        map: map,
        title: 'MAN 1 Rembang'
    });
}

// Fungsi untuk menghitung mundur PPDB
function initCountdown(endDate) {
    const countdownElement = document.querySelector('#ppdb-countdown');
    if (!countdownElement) return;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = new Date(endDate).getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="number">${days}</span>
                <span class="label">Hari</span>
            </div>
            <div class="countdown-item">
                <span class="number">${hours}</span>
                <span class="label">Jam</span>
            </div>
            <div class="countdown-item">
                <span class="number">${minutes}</span>
                <span class="label">Menit</span>
            </div>
            <div class="countdown-item">
                <span class="number">${seconds}</span>
                <span class="label">Detik</span>
            </div>
        `;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "Pendaftaran telah ditutup";
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

document.addEventListener("DOMContentLoaded", function () {
    const birdsContainer = document.querySelector(".birds");

    function createBird() {
        const bird = document.createElement("div");
        bird.classList.add("bird");

        let topPosition = Math.random() * window.innerHeight * 0.4;
        let delay = Math.random() * 5;

        bird.style.top = `${topPosition}px`;
        bird.style.animationDelay = `-${delay}s`;

        birdsContainer.appendChild(bird);

        setTimeout(() => bird.remove(), 10000);
    }

    setInterval(createBird, 3000);
});
