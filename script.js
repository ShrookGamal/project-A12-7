document.addEventListener('DOMContentLoaded', () => {
    const masterLoader = document.getElementById('master-loader');
    if (masterLoader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                masterLoader.style.opacity = '0';
                setTimeout(() => {
                    masterLoader.style.display = 'none'; 
                }, 800);
            }, 1500); 
        });
    }
    const menuTrigger = document.getElementById('menuTrigger');
    const mobileNav = document.getElementById('mobileNav');
    const closeMenu = document.getElementById('closeMenu');

    if (menuTrigger && mobileNav) {
        menuTrigger.addEventListener('click', () => {
            mobileNav.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        const closeMobileMenu = () => {
            mobileNav.style.display = 'none';
            document.body.style.overflow = 'auto'; 
        };

        if (closeMenu) closeMenu.addEventListener('click', closeMobileMenu);
        document.querySelectorAll('.mobile-links-list a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
    const dynamicScroll = document.getElementById('dynamicScroll');
    const navbar = document.querySelector('.glass-navbar');
    const sections = document.querySelectorAll('section, main');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (dynamicScroll) {
            if (currentScroll > 400) {
                dynamicScroll.classList.add('up-mode'); 
            } else {
                dynamicScroll.classList.remove('up-mode'); 
            }
        }
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (currentScroll >= (sectionTop - 250)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-section');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active-section');
            }
        });
        if (navbar) {
            if (currentScroll > 50) {
                navbar.style.top = '10px';
                navbar.style.padding = '8px 30px';
                navbar.style.background = 'rgba(26, 11, 18, 0.9)'; 
                navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            } else {
                navbar.style.top = '25px';
                navbar.style.padding = '12px 30px';
                navbar.style.background = 'rgba(255, 255, 255, 0.08)'; 
                navbar.style.boxShadow = 'none';
            }
        }
    });
    if (dynamicScroll) {
        dynamicScroll.addEventListener('click', () => {
            if (dynamicScroll.classList.contains('up-mode')) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const nextSection = document.getElementById('experience');
                if (nextSection) {
                    nextSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
});
const stats = document.querySelectorAll('.stat-num');
let started = false;

function startCount() {
    stats.forEach((num) => {
        let goal = num.dataset.val;
        let count = setInterval(() => {
            num.textContent++;
            if (num.textContent == goal) {
                clearInterval(count);
            }
        }, 2000 / goal);
    });
}
window.addEventListener('scroll', () => {
    const expSection = document.getElementById('experience');
    const sectionPos = expSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.5;

    if (sectionPos < screenPos && !started) {
        startCount();
        started = true;
    }
});
