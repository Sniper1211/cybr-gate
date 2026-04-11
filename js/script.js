document.addEventListener('DOMContentLoaded', function () {
    const navigationData = [
        { url: 'https://zkobserver.site/', icon: '🔍', text: 'Web3观察', desc: '区块链网空观察与研究。', size: 'card--l', label: '访问Web3观察网站' },
        { url: 'https://game.ok9981.com', icon: '🎮', text: '小游戏', desc: '致敬经典的小游乐场。', size: 'card--m', label: '访问小游戏平台' },
        { url: 'https://name.ok9981.com', icon: '✨', text: '取名', desc: '快速生成好名字。', size: 'card--s', label: '访问取名工具' },
        { url: 'https://www.ok9981.com/gua/', icon: '☯️', text: '变卦', desc: '六十四卦与变卦演算。', size: 'card--m', label: '访问 变卦（CyberGua）' },
        { url: 'https://thecodecraft.site/', icon: '🏗️', text: '小白建站', desc: '从 0 到 1 搭建网站。', size: 'card--m', label: '访问小白建站' },
        { url: 'http://indiestarter.space/', icon: '🔧', text: '建站工具', desc: '精选建站与运营工具集合。', size: 'card--l', label: '访问建站工具' },
        { url: 'https://iconcut.vercel.app/', icon: '🎨', text: '图标生成', desc: '一键生成 App / Web 图标。', size: 'card--m', label: '访问图标生成工具' },
        { url: 'https://www.meirizixun.site/', icon: '📰', text: '每日资讯简报', desc: '每天 3 分钟了解热点。', size: 'card--m', label: '访问每日资讯简报' },
        { url: 'https://ipassword-ochre.vercel.app/', icon: '🔑', text: 'iPassword', desc: '生成与管理高强度密码。', size: 'card--s', label: '访问 iPassword' },
        { url: 'https://www.pentaprompt.com/', icon: '🤖', text: 'PentaPrompt', desc: 'Prompt 灵感与模板库。', size: 'card--m', label: '访问 PentaPrompt' },
        { url: 'https://huggingface.co/spaces/sinai2025/video-splitter', icon: '🎬', text: 'Video-splitter', desc: '视频切分与处理（Hugging Face Space）。', size: 'card--l', label: '访问 Video-splitter' }
    ];

    function renderNavigation() {
        const gridContainer = document.getElementById('gridContainer');
        if (!gridContainer) return;

        gridContainer.innerHTML = navigationData.map(item => {
            const separator = item.url.includes('?') ? '&' : '?';
            const trackedUrl = `${item.url}${separator}ref=ok9981.com`;
            
            return `
            <a href="${trackedUrl}" class="nav-item ${item.size || ''}" aria-label="${item.label}" target="_blank" rel="noopener noreferrer">
                <div class="nav-item-content">
                    <div class="nav-item-header">
                        <div class="icon">${item.icon}</div>
                        <div class="nav-title">${item.text}</div>
                        <div class="nav-desc">${item.desc || ''}</div>
                    </div>
                </div>
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
                const title = (item.querySelector('.nav-title')?.textContent || '').toLowerCase();
                const desc = (item.querySelector('.nav-desc')?.textContent || '').toLowerCase();
                const shouldShow = (title + ' ' + desc).includes(searchTerm);

                if (shouldShow) {
                    item.style.display = 'block';
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
