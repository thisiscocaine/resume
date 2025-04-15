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
                // Scrolling down
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

    // Download PDF button
    document.getElementById('download-pdf').addEventListener('click', function() {
        const btn = this;
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        
        try {
            const pdfUrl = 'aryanaryal__resume.pdf';
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'Aryan_Aryal_Resume.pdf';
            
            fetch(pdfUrl, { method: 'GET', mode: 'no-cors' })
                .then(() => {
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    btn.innerHTML = '<i class="fas fa-check"></i> Download started!';
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }, 1500);
                })
                .catch(error => {
                    console.error('Error initiating PDF download:', error);
                    btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Download failed!';
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }, 2000);
                });
        } catch (error) {
            console.error('Error setting up PDF download:', error);
            btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Download failed!';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
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