// Inicialização do AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Controle de Rolagem da Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        detectActiveSection();
    });

    // Menu Mobile Alternador (Toggle)
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Fechar menu mobile ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.getElementById('mobile-menu').querySelector('i').classList.add('fa-bars');
        });
    });

    // Efeito Accordion do FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(i => i.classList.remove('open'));
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // Animação Simples de Contador Digital para a Seção Sobre
    const counters = document.querySelectorAll('.counter');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 20;
            const updateCount = () => {
                if (count < target) {
                    count += Math.ceil(speed);
                    if (count > target) count = target;
                    counter.innerText = `+${count}`;
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = `+${target}`;
                }
            };
            updateCount();
        });
    };

    // Trigger do contador quando visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.sobre-stats');
    if(statsSection) observer.observe(statsSection);

    // Sistema de Destaque Dinâmico nos Links da Nav com base na Posição
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    function detectActiveSection() {
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop - 120 && scrollPosition < section.offsetTop + section.offsetHeight - 120) {
                let id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
});