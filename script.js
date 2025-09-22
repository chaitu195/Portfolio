document.addEventListener('DOMContentLoaded', () => {
   
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        modeToggle.textContent = '🌙'; 
    }

    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            modeToggle.textContent = '🌙';
        } else {
            localStorage.setItem('theme', 'light');
            modeToggle.textContent = '☀️';
        }
    });

    const revealElements = document.querySelectorAll('.reveal');

    
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.15
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
               
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });

    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
