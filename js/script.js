document.addEventListener('DOMContentLoaded', function () {
    const navigationData = [
        { url: 'https://zkobserver.site/', icon: '🔍', text: 'Web3观察', label: '访问Web3观察网站' },
        { url: 'https://game.ok9981.com', icon: '🎮', text: '小游戏', label: '访问小游戏平台' },
        { url: 'https://name.ok9981.com', icon: '✨', text: '取名', label: '访问取名工具' },
        { url: 'https://thecodecraft.site/', icon: '🏗️', text: '小白建站', label: '访问小白建站' },
        { url: 'http://indiestarter.space/', icon: '🔧', text: '建站工具', label: '访问建站工具' },
        { url: 'https://iconcut.vercel.app/', icon: '🎨', text: '图标生成', label: '访问图标生成工具' },
        { url: 'https://www.meirizixun.site/', icon: '📰', text: '每日资讯简报', label: '访问每日资讯简报' },
        { url: 'https://ipassword-ochre.vercel.app/', icon: '🔑', text: 'iPassword', label: '访问 iPassword' },
        { url: 'https://www.pentaprompt.com/', icon: '🤖', text: 'PentaPrompt', label: '访问 PentaPrompt' },
        { url: 'https://huggingface.co/spaces/sinai2025/video-splitter', icon: '🎬', text: 'Video-splitter', label: '访问 Video-splitter' }
    ];

    function renderNavigation() {
        const gridContainer = document.getElementById('gridContainer');
        if (!gridContainer) return;

        gridContainer.innerHTML = navigationData.map(item => {
            // Add tracking parameter
            const separator = item.url.includes('?') ? '&' : '?';
            const trackedUrl = `${item.url}${separator}ref=ok9981.com`;
            
            return `
            <a href="${trackedUrl}" class="nav-item" aria-label="${item.label}" target="_blank" rel="noopener noreferrer">
                <div class="icon">${item.icon}</div>
                <span>${item.text}</span>
            </a>
            `;
        }).join('');
    }

    renderNavigation();

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
