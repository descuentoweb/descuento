// Contador regresivo
function updateCountdown() {
    // Configuramos la fecha de inicio del HotSale (12/05 a las 00:00)
    const hotsaleDate = new Date();
    hotsaleDate.setDate(11); // 11 de mayo (el mes en JS es 0-11, así que mayo es 4)
    hotsaleDate.setMonth(4); // Mayo (0-11)
    hotsaleDate.setHours(24, 0, 0, 0); // Medianoche del día siguiente
    
    const now = new Date();
    const distance = hotsaleDate - now;
    if (distance <= 0) {
        document.getElementById("countdown").innerHTML = "¡El HotSale ya comenzó!";
        return;
    }
    // Cálculo de días, horas, minutos y segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Mostramos el resultado
    document.getElementById("countdown").innerHTML = `El HotSale comienza en: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Iniciar contador
updateCountdown();
setInterval(updateCountdown, 1000);

// Filtrado de tiendas
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Quitar active de todos los botones
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Añadir active al botón clickeado
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        const storeCards = document.querySelectorAll('.store-card');
        
        storeCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Copiar cupones
document.querySelectorAll('.coupon-copy').forEach(button => {
    button.addEventListener('click', () => {
        const couponCode = button.parentElement.querySelector('.coupon-code').textContent;
        navigator.clipboard.writeText(couponCode).then(() => {
            const originalText = button.textContent;
            button.textContent = '¡Copiado!';
            button.style.backgroundColor = 'var(--success)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = 'var(--secondary)';
            }, 2000);
        });
    });
});

// Newsletter (simulado)
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('.newsletter-input').value;
    alert(`¡Gracias por suscribirte con ${email}! Te enviaremos las mejores ofertas.`);
    e.target.reset();
});