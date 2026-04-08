// ===== MENÚ MÓVIL =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Toggle del menú móvil
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== CARRUSEL DE IMÁGENES =====
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel__slide');
const dots = document.querySelectorAll('.carousel__dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Función para mostrar slide
function showSlide(n) {
    // Ajustar el índice si está fuera de rango
    if (n >= slides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = n;
    }

    // Remover clase active de todas las slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Remover clase active de todos los dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Agregar clase active a la slide actual
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Botón siguiente
nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Botón anterior
prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

// Click en los indicadores
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-play del carrusel (cada 5 segundos)
let autoplayInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Pausar autoplay cuando el usuario interactúa
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

// Reanudar autoplay cuando el mouse sale
carousel.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// Soporte para swipe en móviles
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - siguiente imagen
        showSlide(currentSlide + 1);
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - imagen anterior
        showSlide(currentSlide - 1);
    }
}

// ===== FORMULARIO DE CONTACTO - REDIRECCIÓN A EMAIL =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // IMPORTANTE: Cambia 'tucorreo@ejemplo.com' por tu correo real
    const mailtoLink = `mailto:santirmrm420@gmail.com?subject=Contacto de ${encodeURIComponent(name)}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`)}`;
    
    // Abrir cliente de correo
    window.location.href = mailtoLink;
    
    // Mensaje de confirmación
    alert('Abriendo tu cliente de correo...');
    
    // Limpiar formulario
    contactForm.reset();
});

// ===== ANIMACIÓN AL HACER SCROLL - INTERSECTION OBSERVER =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animaciones a tarjetas de proyectos y skills
document.querySelectorAll('.project__card, .skill__card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
    observer.observe(el);
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ===== SCROLL SUAVE PARA NAVEGACIÓN =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMACIÓN DE ESCRITURA EN EL HERO (OPCIONAL) =====
// Descomenta si quieres un efecto de texto escribiéndose
/*
const heroTitle = document.querySelector('.hero__title');
const text = heroTitle.textContent;
heroTitle.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Iniciar la animación cuando cargue la página
window.addEventListener('load', typeWriter);
*/

// ===== VALIDACIÓN EXTRA DEL FORMULARIO =====
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');

// Validar email en tiempo real
emailInput.addEventListener('blur', () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        emailInput.style.borderColor = '#ef4444';
    } else {
        emailInput.style.borderColor = '#6366f1';
    }
});

// Validar que el nombre tenga al menos 3 caracteres
nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim().length < 3) {
        nameInput.style.borderColor = '#ef4444';
    } else {
        nameInput.style.borderColor = '#6366f1';
    }
});

// Validar que el mensaje tenga al menos 10 caracteres
messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim().length < 10) {
        messageInput.style.borderColor = '#ef4444';
    } else {
        messageInput.style.borderColor = '#6366f1';
    }
});

// ===== ANIMACIÓN DEL LOGO AL HACER SCROLL =====
const logo = document.querySelector('.nav__logo');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll hacia abajo
        logo.style.transform = 'scale(0.9)';
    } else {
        // Scroll hacia arriba
        logo.style.transform = 'scale(1)';
    }
    
    lastScroll = currentScroll;
});

// ===== BOTÓN VOLVER ARRIBA (Opcional - para agregar después) =====
// Crear botón dinámicamente
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
`;

document.body.appendChild(scrollTopBtn);

// Mostrar/ocultar botón según scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Funcionalidad del botón
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Efecto hover en el botón
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
    scrollTopBtn.style.backgroundColor = '#8b5cf6';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
    scrollTopBtn.style.backgroundColor = '#6366f1';
});

// ===== PREVENIR ERRORES SI FALTAN ELEMENTOS =====
// Esto previene errores en la consola si algún elemento no existe
console.log('✅ Portafolio cargado correctamente');
console.log('📱 Carrusel inicializado con', slides.length, 'imágenes');
console.log('🎨 Animaciones activadas');

// ===== MENSAJE DE BIENVENIDA EN CONSOLA =====
console.log('%c¡Hola! 👋', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cGracias por visitar mi portafolio', 'font-size: 14px; color: #8b5cf6;');
console.log('%cSi encuentras algún bug, ¡déjame saber! 🐛', 'font-size: 12px; color: #94a3b8;');

