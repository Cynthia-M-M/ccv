// Magnetic Button Effect
document.querySelectorAll('.magnetic-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.setProperty('--x', `${x * 0.1}px`);
        button.style.setProperty('--y', `${y * 0.1}px`);
    });
});

// Particle Generator
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.backgroundColor = `rgba(221, 188, 147, ${Math.random() * 0.3})`;
    particle.style.width = Math.random() * 5 + 'px';
    particle.style.height = particle.style.width;
    
    document.querySelector('.footer-modern').appendChild(particle);
    
    setTimeout(() => particle.remove(), 10000);
}

setInterval(createParticle, 1000);

// 3D Tilt Effect
document.querySelectorAll('.footer-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0)';
    });
});