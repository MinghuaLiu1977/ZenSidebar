/**
 * content.js
 * Vertical Tab Switcher Extension - Shadow DOM Version
 */

(function () {
    'use strict';

    // UI Configuration
    const STORAGE_KEY = 'antigravity_ball_position';
    const ROOT_ID = 'antigravity-extension-container';

    // Avoid multiple injections
    if (document.getElementById(ROOT_ID)) return;

    // Detect Electron apps and PWA, exit early
    // Electron apps expose specific properties in the window object
    const isElectronApp = () => {
        // Check for Electron-specific properties
        if (window.process && window.process.type) return true;
        if (window.require && window.module) return true;
        if (navigator.userAgent.includes('Electron')) return true;

        // Check for common Electron app indicators
        const electronIndicators = [
            window.electronAPI,
            window.electron,
            window.ipcRenderer,
            window.__TAURI__,  // Tauri apps (similar to Electron)
        ];

        return electronIndicators.some(indicator => indicator !== undefined);
    };

    // Detect PWA (Progressive Web App)
    const isPWA = () => {
        // Check if running in standalone mode (installed PWA)
        if (window.matchMedia('(display-mode: standalone)').matches) return true;
        if (window.navigator.standalone === true) return true; // iOS Safari

        // Check if launched from home screen
        if (document.referrer.includes('android-app://')) return true;

        return false;
    };

    // Exit if running in Electron app or PWA
    if (isElectronApp()) {
        console.log('[ZenSidebar] Electron app detected, extension disabled');
        return;
    }

    if (isPWA()) {
        console.log('[ZenSidebar] PWA detected, extension disabled');
        return;
    }

    // Create Host Element
    const host = document.createElement('div');
    host.id = ROOT_ID;
    host.style.position = 'fixed';
    host.style.zIndex = '2147483647';
    host.style.top = '0';
    host.style.left = '0';
    host.style.width = '0';
    host.style.height = '0';
    document.documentElement.appendChild(host);

    // Create Shadow Root
    const shadow = host.attachShadow({ mode: 'closed' });

    // Inject Styles
    const style = document.createElement('style');
    style.textContent = `
        :host {
            --glass-bg: rgba(255, 255, 255, 0.4);
            --glass-border: rgba(255, 255, 255, 0.2);
            --accent-color: #007AFF;
            --text-primary: #1d1d1f;
            --text-secondary: #86868b;
            --hover-bg: rgba(0, 122, 255, 0.1);
            --input-bg: rgba(255, 255, 255, 0.5);
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        *, *::before, *::after {
            box-sizing: border-box;
        }

        @media (prefers-color-scheme: dark) {
            :host {
                --glass-bg: rgba(30, 30, 30, 0.5);
                --glass-border: rgba(255, 255, 255, 0.1);
                --text-primary: #f5f5f7;
                --text-secondary: #a1a1a6;
                --hover-bg: rgba(255, 255, 255, 0.1);
                --input-bg: rgba(0, 0, 0, 0.3);
            }
        }

        /* Floating Ball */
        #float-ball {
            position: fixed;
            width: 44px;
            height: 44px;
            background: transparent;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            border: none;
            border-radius: 50%;
            box-shadow: none;
            cursor: grab;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            user-select: none;
            z-index: 2147483647;
            left: 15px; /* Slightly more inside */
            bottom: 80px;
        }

        #float-ball:hover { 
            background: var(--glass-bg);
            backdrop-filter: blur(12px) saturate(180%);
            -webkit-backdrop-filter: blur(12px) saturate(180%);
            border: 1px solid var(--glass-border);
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            transform: scale(1.1);
        }
        
        #float-ball:active { cursor: grabbing; transform: scale(0.95); }

        #float-ball img {
            width: 32px; /* Increased size */
            height: 32px;
            object-fit: contain;
            pointer-events: none;
            opacity: 0.9; /* Near full opacity for visibility */
            transition: all 0.3s;
            filter: drop-shadow(0 2px 6px rgba(0,0,0,0.2)); /* Stronger shadow for "float" effect */
        }
        #float-ball:hover img { 
            opacity: 1; 
            transform: scale(1.05);
            filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));
        }

        /* Sidebar Panel */
        #sidebar {
            position: fixed;
            top: 50%;
            left: -420px;
            transform: translateY(-50%);
            width: 320px;
            max-height: 85vh;
            background: var(--glass-bg);
            backdrop-filter: blur(30px) saturate(180%);
            -webkit-backdrop-filter: blur(30px) saturate(180%);
            border: 1px solid var(--glass-border);
            border-radius: 0 28px 28px 0;
            box-shadow: none;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
            padding: 24px 14px;
            overflow-y: auto;
            z-index: 2147483646;
            visibility: hidden;
            opacity: 0;
            pointer-events: none;
        }

        #sidebar.active { 
            left: 0; 
            visibility: visible;
            opacity: 1;
            pointer-events: auto;
            box-shadow: 20px 0 60px rgba(0,0,0,0.2);
        }

        /* Address Bar Section */
        #address-container {
            margin-bottom: 24px;
            padding: 0 8px;
        }
        #address-input {
            width: 100%;
            padding: 12px 16px;
            border-radius: 14px;
            border: 1px solid var(--glass-border);
            background: var(--input-bg);
            color: var(--text-primary);
            font-size: 14px;
            outline: none;
            box-sizing: border-box;
            transition: border-color 0.2s;
        }
        #address-input:focus {
            border-color: var(--accent-color);
        }

        .section { margin-bottom: 28px; }
        .title {
            font-size: 11px;
            font-weight: 700;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.2em;
            margin-bottom: 12px;
            padding-left: 14px;
            opacity: 0.8;
        }

        .list { display: flex; flex-direction: column; gap: 4px; }
        .item {
            padding: 10px 14px;
            border-radius: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 12px;
            color: var(--text-primary);
            font-size: 13.5px;
            position: relative;
            background: transparent;
        }

        .item:hover { background: var(--hover-bg); }
        .item.active { 
            background: rgba(0, 122, 255, 0.15); 
            font-weight: 600; 
            color: var(--accent-color); 
        }

        .item-text {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .close-btn {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            opacity: 0;
            transition: all 0.2s;
            font-size: 14px;
            color: var(--text-secondary);
            background: rgba(0,0,0,0.05);
        }

        .item:hover .close-btn { opacity: 1; }
        .close-btn:hover { background: #ff3b30; color: white; transform: scale(1.1); }

        .icon {
            width: 18px;
            height: 18px;
            border-radius: 4px;
            flex-shrink: 0;
            object-fit: contain;
        }

        .icon-placeholder {
            width: 18px;
            height: 18px;
            background: rgba(128, 128, 128, 0.2);
            border-radius: 4px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: white;
        }

        .folder-children {
            margin-left: 20px;
            display: none;
            flex-direction: column;
            gap: 2px;
            border-left: 1px solid var(--glass-border);
            padding-left: 4px;
        }
        .folder-children.expanded {
            display: flex;
        }

        .folder-toggle-icon {
            font-size: 10px;
            transition: transform 0.2s;
            opacity: 0.5;
        }
        .expanded > .folder-toggle-icon {
            transform: rotate(90deg);
        }

        /* Suggestions List */
        #suggestions-list {
            position: absolute;
            top: 100%;
            left: 8px;
            right: 8px;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: 14px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            margin-top: 4px;
            z-index: 1000;
            display: none;
            flex-direction: column;
            overflow: hidden;
        }
        #suggestions-list.active { display: flex; }

        .suggestion-item {
            padding: 10px 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 13px;
            transition: background 0.2s;
            color: var(--text-primary);
        }
        .suggestion-item:hover, .suggestion-item.selected {
            background: var(--hover-bg);
        }
        .suggestion-item .type-icon {
            font-size: 12px;
            opacity: 0.6;
            width: 16px;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(128, 128, 128, 0.2); border-radius: 10px; }
    `;
    shadow.appendChild(style);

    // Create UI Elements
    const floatBall = document.createElement('div');
    floatBall.id = 'float-ball';
    const iconImage = document.createElement('img');
    iconImage.src = chrome.runtime.getURL('ZenSidebar_logo.png');
    floatBall.appendChild(iconImage);
    shadow.appendChild(floatBall);

    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    shadow.appendChild(sidebar);

    // dragging state
    let isDragging = false;
    let dragStartTime = 0;

    // Load Position
    chrome.storage.local.get([STORAGE_KEY], (res) => {
        if (res[STORAGE_KEY]) {
            let x = parseFloat(res[STORAGE_KEY].x);
            let y = parseFloat(res[STORAGE_KEY].y);

            // Constrain to viewport to prevent "loss"
            const maxW = window.innerWidth - 60;
            const maxH = window.innerHeight - 60;

            // If it's completely off-screen or too far, reset to default
            if (x < 0 || x > maxW || y < 0 || y > maxH) {
                x = 15;
                y = window.innerHeight - 100;
            }

            floatBall.style.left = x + 'px';
            floatBall.style.top = y + 'px';
            floatBall.style.right = 'auto';
            floatBall.style.bottom = 'auto';
        }
    });

    // Drag Logic
    floatBall.addEventListener('mousedown', (e) => {
        isDragging = false;
        dragStartTime = Date.now();
        const startX = e.clientX - floatBall.offsetLeft;
        const startY = e.clientY - floatBall.offsetTop;

        const move = (me) => {
            const dx = Math.abs(me.clientX - (startX + floatBall.offsetLeft));
            const dy = Math.abs(me.clientY - (startY + floatBall.offsetTop));
            if (dx > 5 || dy > 5) {
                isDragging = true;

                // Clamp within viewport
                let nextX = me.clientX - startX;
                let nextY = me.clientY - startY;

                nextX = Math.max(0, Math.min(nextX, window.innerWidth - 44));
                nextY = Math.max(0, Math.min(nextY, window.innerHeight - 44));

                floatBall.style.left = nextX + 'px';
                floatBall.style.top = nextY + 'px';
                floatBall.style.right = 'auto';
                floatBall.style.bottom = 'auto';
            }
        };

        const up = () => {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
            if (isDragging) {
                chrome.storage.local.set({
                    [STORAGE_KEY]: { x: floatBall.style.left, y: floatBall.style.top }
                });
            }
        };

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    });

    // Toggle Sidebar
    floatBall.addEventListener('click', (e) => {
        const clickDuration = Date.now() - dragStartTime;
        if (!isDragging || clickDuration < 200) {
            const active = sidebar.classList.toggle('active');
            if (active) render();
        }
    });

    // Close on click outside
    document.addEventListener('mousedown', (e) => {
        if (!host.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Render Function
    async function render() {
        sidebar.innerHTML = '';

        // Address Bar
        const addrContainer = document.createElement('div');
        addrContainer.id = 'address-container';
        addrContainer.style.position = 'relative';

        const addrInput = document.createElement('input');
        addrInput.id = 'address-input';
        addrInput.type = 'text';
        addrInput.placeholder = 'Enter URL, bookmark, or search...';

        const suggestionsList = document.createElement('div');
        suggestionsList.id = 'suggestions-list';

        let selectedIndex = -1;
        let suggestionResults = [];

        let debounceTimer;
        const updateSuggestions = async () => {
            const query = addrInput.value.trim();
            if (query.length < 1) {
                suggestionsList.innerHTML = '';
                suggestionsList.classList.remove('active');
                return;
            }

            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(async () => {
                const res = await new Promise(r => chrome.runtime.sendMessage({ action: 'searchSuggestions', query }, r));
                suggestionResults = res.results || [];

                suggestionsList.innerHTML = '';
                selectedIndex = -1;

                if (suggestionResults.length > 0) {
                    suggestionResults.forEach((item, index) => {
                        const div = document.createElement('div');
                        div.className = 'suggestion-item';
                        const icon = item.type === 'bookmark' ? '⭐' : '🕒';
                        div.innerHTML = `<span class="type-icon">${icon}</span><span class="item-text">${item.title || item.url}</span>`;
                        div.onclick = () => {
                            chrome.runtime.sendMessage({ action: 'openBookmark', url: item.url });
                            sidebar.classList.remove('active');
                        };
                        suggestionsList.appendChild(div);
                    });
                    suggestionsList.classList.add('active');
                } else {
                    suggestionsList.classList.remove('active');
                }
            }, 200);
        };

        addrInput.addEventListener('input', updateSuggestions);

        addrInput.addEventListener('keydown', (e) => {
            const items = suggestionsList.querySelectorAll('.suggestion-item');

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, suggestionResults.length - 1);
                items.forEach((it, i) => it.classList.toggle('selected', i === selectedIndex));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, -1);
                items.forEach((it, i) => it.classList.toggle('selected', i === selectedIndex));
            } else if (e.key === 'Enter') {
                if (selectedIndex >= 0) {
                    chrome.runtime.sendMessage({ action: 'openBookmark', url: suggestionResults[selectedIndex].url });
                    sidebar.classList.remove('active');
                } else {
                    let url = addrInput.value.trim();
                    if (url) {
                        if (!url.startsWith('http://') && !url.startsWith('https://')) {
                            if (url.includes('.') && !url.includes(' ')) {
                                url = 'https://' + url;
                            } else {
                                url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
                            }
                        }
                        chrome.runtime.sendMessage({ action: 'openBookmark', url: url });
                        sidebar.classList.remove('active');
                    }
                }
            } else if (e.key === 'Escape') {
                suggestionsList.classList.remove('active');
            }
        });

        addrContainer.appendChild(addrInput);
        addrContainer.appendChild(suggestionsList);
        sidebar.appendChild(addrContainer);

        const loading = document.createElement('div');
        loading.style.padding = '20px';
        loading.style.fontSize = '12px';
        loading.style.color = 'var(--text-secondary)';
        loading.style.textAlign = 'center';
        loading.textContent = 'Loading...';
        sidebar.appendChild(loading);

        try {
            const [tabsRes, bookmarksRes] = await Promise.all([
                new Promise(r => chrome.runtime.sendMessage({ action: 'getTabs' }, r)),
                new Promise(r => chrome.runtime.sendMessage({ action: 'getBookmarks' }, r))
            ]);

            loading.remove();

            // 1. Tabs
            const tSec = createSec('Open Tabs');
            const tList = document.createElement('div');
            tList.className = 'list';
            if (tabsRes && tabsRes.tabs) {
                tabsRes.tabs.forEach(t => {
                    const item = createItem(t.title || t.url, t.favIconUrl, () => {
                        chrome.runtime.sendMessage({ action: 'switchTab', tabId: t.id });
                        sidebar.classList.remove('active');
                    }, () => {
                        chrome.runtime.sendMessage({ action: 'closeTab', tabId: t.id });
                        item.remove();
                    });
                    if (t.active) item.classList.add('active');
                    tList.appendChild(item);
                });
            }
            tSec.appendChild(tList);
            sidebar.appendChild(tSec);

            // 2. Bookmarks (Hierarchical, showing only Bookmark Bar)
            const bSec = createSec('Bookmarks Bar');
            const bContainer = document.createElement('div');
            bContainer.className = 'list';

            if (bookmarksRes && bookmarksRes.bookmarks && bookmarksRes.bookmarks[0] && bookmarksRes.bookmarks[0].children) {
                // Find "Bookmark Bar" (id is usually '1', but title check is safer across locales)
                const bar = bookmarksRes.bookmarks[0].children.find(c =>
                    c.id === '1' ||
                    c.title === 'Bookmarks Bar' ||
                    c.title === 'Bookmarks Bar' ||
                    c.title === 'Favorites Bar'
                );

                if (bar && bar.children) {
                    renderBookmarkTree(bar.children, bContainer, 0);
                } else {
                    // Fallback to full tree if bar not found
                    renderBookmarkTree(bookmarksRes.bookmarks, bContainer, 0);
                }
            }
            bSec.appendChild(bContainer);
            sidebar.appendChild(bSec);

            // Focus search bar
            setTimeout(() => addrInput.focus(), 100);

        } catch (err) {
            loading.textContent = 'Loading failed';
            console.error(err);
        }
    }

    function renderBookmarkTree(nodes, container, depth) {
        nodes.forEach(node => {
            if (node.url) {
                // Bookmark with Favicon
                const faviconUrl = `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(node.url)}&size=32`;
                const item = createItem(node.title, faviconUrl, () => {
                    chrome.runtime.sendMessage({ action: 'openBookmark', url: node.url });
                    sidebar.classList.remove('active');
                });
                container.appendChild(item);
            } else if (node.children) {
                // Folder
                if (node.children.length === 0 && !node.title) return;

                const folderItem = document.createElement('div');
                folderItem.className = 'item folder';

                const toggleIcon = document.createElement('span');
                toggleIcon.className = 'folder-toggle-icon';
                toggleIcon.innerHTML = '▶';
                folderItem.appendChild(toggleIcon);

                const icon = document.createElement('div');
                icon.className = 'icon-placeholder';
                icon.style.background = 'rgba(128, 128, 128, 0.1)';
                icon.innerHTML = '📁';
                folderItem.appendChild(icon);

                const text = document.createElement('span');
                text.className = 'item-text';
                text.textContent = node.title || 'Favorites';
                folderItem.appendChild(text);

                const childrenContainer = document.createElement('div');
                childrenContainer.className = 'folder-children';

                // Folders are collapsed by default now
                folderItem.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const isExpanded = childrenContainer.classList.toggle('expanded');
                    folderItem.classList.toggle('expanded');
                    toggleIcon.innerHTML = isExpanded ? '▼' : '▶';
                });

                container.appendChild(folderItem);
                container.appendChild(childrenContainer);

                // Recursively render children
                renderBookmarkTree(node.children, childrenContainer, depth + 1);
            }
        });
    }

    function createSec(t) {
        const s = document.createElement('div');
        s.className = 'section';
        const h = document.createElement('div');
        h.className = 'title';
        h.textContent = t;
        s.appendChild(h);
        return s;
    }

    function createItem(t, i, cb, onClose) {
        const d = document.createElement('div');
        d.className = 'item';

        // Icon Container (fixed width to prevent layout shift)
        const iconWrap = document.createElement('div');
        iconWrap.style.width = '18px';
        iconWrap.style.height = '18px';
        iconWrap.style.display = 'flex';
        iconWrap.style.alignItems = 'center';
        iconWrap.style.justifyContent = 'center';
        iconWrap.style.flexShrink = '0';
        d.appendChild(iconWrap);

        const showPlaceholder = () => {
            iconWrap.innerHTML = '';
            const p = document.createElement('div');
            p.className = 'icon-placeholder';
            p.style.width = '100%';
            p.style.height = '100%';
            p.innerHTML = t ? t.charAt(0).toUpperCase() : 'L';
            iconWrap.appendChild(p);
        };

        if (i) {
            const img = document.createElement('img');
            img.className = 'icon';
            img.src = i;
            img.onerror = () => {
                showPlaceholder();
            };
            iconWrap.appendChild(img);
        } else {
            showPlaceholder();
        }

        const s = document.createElement('span');
        s.className = 'item-text';
        s.textContent = t || '(No Title)';
        d.appendChild(s);

        d.addEventListener('click', (e) => {
            if (!e.target.closest('.close-btn')) cb();
        });

        if (onClose) {
            const c = document.createElement('div');
            c.className = 'close-btn';
            c.innerHTML = '×';
            c.onclick = (e) => {
                e.stopPropagation();
                onClose();
            };
            d.appendChild(c);
        }

        return d;
    }

})();
