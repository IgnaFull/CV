// JavaScript para funcionalidades interactivas
document.addEventListener('DOMContentLoaded', function() {
    // Botón de cambio de tema
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Comprobar si hay una preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });
    
    // Animación de aparición para las tarjetas
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Funcionalidad para la foto de perfil
    const uploadTrigger = document.getElementById('uploadTrigger');
    const uploadModal = document.getElementById('uploadModal');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const selectPhotoBtn = document.getElementById('selectPhotoBtn');
    const photoInput = document.getElementById('photoInput');
    const profileImg = document.getElementById('profileImg');
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    
    // Cargar foto guardada si existe
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        profileImg.src = savedPhoto;
        profileImg.style.display = 'block';
        photoPlaceholder.style.display = 'none';
    }
    
    uploadTrigger.addEventListener('click', function() {
        uploadModal.style.display = 'flex';
    });
    
    cancelUploadBtn.addEventListener('click', function() {
        uploadModal.style.display = 'none';
    });
    
    selectPhotoBtn.addEventListener('click', function() {
        photoInput.click();
    });
    
    photoInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                profileImg.src = e.target.result;
                profileImg.style.display = 'block';
                photoPlaceholder.style.display = 'none';
                
                // Guardar en localStorage
                localStorage.setItem('profilePhoto', e.target.result);
                
                // Cerrar modal
                uploadModal.style.display = 'none';
            }
            
            reader.readAsDataURL(e.target.files[0]);
        }
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    uploadModal.addEventListener('click', function(e) {
        if (e.target === uploadModal) {
            uploadModal.style.display = 'none';
        }
    });
});