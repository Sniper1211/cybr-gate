document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');
    const errorMessage = document.getElementById('errorMessage');

    // Add click feedback
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // Add brief visual feedback (0.5s)
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 500);
        });
        
        // Removed redundant keydown listener for Enter/Space as <a> tags handle it natively
    });

    // Page load animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    document.body.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);

    // Dynamic preloading of critical pages
    // Removed to prevent cross-origin prefetch errors
    
    // Network status handling
    function updateOnlineStatus() {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.style.display = navigator.onLine ? 'none' : 'block';
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus(); // Check on load

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    // navItems is already defined at the top of the scope

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            navItems.forEach(item => {
                const text = item.querySelector('span').textContent.toLowerCase();
                const shouldShow = text.includes(searchTerm);
                
                if (shouldShow) {
                    item.style.display = 'flex';
                    // Reset animation for better UX
                    item.style.animation = 'fadeIn 0.3s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
        
        // Focus shortcut (/)
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && document.activeElement !== searchInput) {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }

    // Auto-update footer year
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});

// Add fade in animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Shortcut keys support
document.addEventListener('keydown', function (e) {
    if (e.altKey) {
        // Map keys 1-8 to index 0-7
        const key = parseInt(e.key);
        if (!isNaN(key) && key >= 1 && key <= 8) {
            const index = key - 1;
            const navItems = document.querySelectorAll('.nav-item');
            
            if (navItems[index]) {
                e.preventDefault();
                navItems[index].click();
            }
        }
    }
});

// Restore state on back navigation / page show
window.addEventListener('pageshow', function () {
    // Remove loading state
    document.querySelectorAll('.nav-item.loading').forEach(el => {
        el.classList.remove('loading');
    });
    
    // Hide error message
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) errorMessage.style.display = 'none';
});

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
