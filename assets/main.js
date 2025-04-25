document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navUl.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navUl.classList.remove('active');
        });
    });

    // Auto-hide menu on scroll (mobile only)
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScrollTop && navUl.classList.contains('active')) {
                hamburger.classList.remove('active');
                navUl.classList.remove('active');
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }
    });

    // Highlight active section
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Pin code modal logic
    const pinModal = document.getElementById('pin-modal');
    const pinInput = document.getElementById('pin-input');
    const pinSubmit = document.getElementById('pin-submit');
    const pinError = document.getElementById('pin-error');
    const pinClose = document.querySelector('.pin-close');
    const downloadBtn = document.getElementById('download-pdf');

    // Plain text pin
    const correctPin = '57573939';
    const pdfUrl = 'https://resume.aaryan.com.np/assets/cv/aryanaryal__resume.pdf';

    downloadBtn.addEventListener('click', () => {
        pinModal.classList.add('active');
        pinInput.value = '';
        pinError.style.display = 'none';
        pinInput.focus();
    });

    pinClose.addEventListener('click', () => {
        pinModal.classList.remove('active');
    });

    // Allow Enter key to submit
    pinInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            pinSubmit.click();
        }
    });

    pinSubmit.addEventListener('click', () => {
        const enteredPin = pinInput.value.trim();
        if (!/^\d{8}$/.test(enteredPin)) {
            pinError.textContent = 'Please enter an 8-digit pin.';
            pinError.style.display = 'block';
            pinInput.value = '';
            pinInput.focus();
            return;
        }

        if (enteredPin === correctPin) {
            pinModal.classList.remove('active');
            window.location.href = pdfUrl;
        } else {
            pinError.textContent = 'Incorrect pin. Please try again.';
            pinError.style.display = 'block';
            pinInput.value = '';
            pinInput.focus();
        }
    });

    // Smooth scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});
