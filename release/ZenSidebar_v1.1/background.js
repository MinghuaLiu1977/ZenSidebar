// background.js

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTabs') {
    try {
      chrome.tabs.query({}, (tabs) => {
        if (chrome.runtime.lastError) {
          console.error('getTabs error:', chrome.runtime.lastError);
          sendResponse({ tabs: [] });
        } else {
          // Filter out system pages where extensions cannot run
          const filteredTabs = tabs.filter(tab => {
            const url = tab.url || '';
            return !url.startsWith('chrome://') &&
              !url.startsWith('edge://') &&
              !url.startsWith('about:') &&
              !url.startsWith('chrome-extension://');
          });
          sendResponse({ tabs: filteredTabs });
        }
      });
    } catch (e) {
      console.error('getTabs catch:', e);
      sendResponse({ tabs: [] });
    }
    return true;
  }

  if (request.action === 'searchSuggestions') {
    const query = request.query;
    if (!query || query.length < 1) {
      sendResponse({ results: [] });
      return true;
    }

    Promise.all([
      new Promise(r => chrome.history.search({ text: query, maxResults: 5 }, r)),
      new Promise(r => chrome.bookmarks.search({ query: query }, r))
    ]).then(([historyItems, bookmarkItems]) => {
      const results = [];
      const urls = new Set();

      // Prioritize bookmarks
      bookmarkItems.slice(0, 5).forEach(item => {
        if (item.url && !urls.has(item.url)) {
          results.push({ title: item.title, url: item.url, type: 'bookmark' });
          urls.add(item.url);
        }
      });

      // Add history
      historyItems.forEach(item => {
        if (item.url && !urls.has(item.url)) {
          results.push({ title: item.title, url: item.url, type: 'history' });
          urls.add(item.url);
        }
      });

      sendResponse({ results: results.slice(0, 10) });
    }).catch(err => {
      console.error('searchSuggestions error:', err);
      sendResponse({ results: [] });
    });
    return true;
  }

  if (request.action === 'getBookmarks') {
    try {
      chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        if (chrome.runtime.lastError) {
          console.error('getBookmarks error:', chrome.runtime.lastError);
          sendResponse({ bookmarks: [] });
        } else {
          sendResponse({ bookmarks: bookmarkTreeNodes });
        }
      });
    } catch (e) {
      console.error('getBookmarks catch:', e);
      sendResponse({ bookmarks: [] });
    }
    return true;
  }

  if (request.action === 'closeTab') {
    chrome.tabs.remove(request.tabId);
  }

  if (request.action === 'switchTab') {
    chrome.tabs.update(request.tabId, { active: true });
    // Also focus the window the tab belongs to
    chrome.tabs.get(request.tabId, (tab) => {
      chrome.windows.update(tab.windowId, { focused: true });
    });
  }

  if (request.action === 'openBookmark') {
    // Check if URL is already open
    chrome.tabs.query({ url: request.url }, (tabs) => {
      if (tabs && tabs.length > 0) {
        chrome.tabs.update(tabs[0].id, { active: true });
        chrome.windows.update(tabs[0].windowId, { focused: true });
      } else {
        chrome.tabs.create({ url: request.url });
      }
    });
  }
});

// Action click (extension icon) logic
chrome.action.onClicked.addListener((tab) => {
  const githubUrl = 'https://github.com/MinghuaLiu1977/ZenSidebar';
  chrome.tabs.query({ url: githubUrl }, (tabs) => {
    if (tabs && tabs.length > 0) {
      chrome.tabs.update(tabs[0].id, { active: true });
      chrome.windows.update(tabs[0].windowId, { focused: true });
    } else {
      chrome.tabs.create({ url: githubUrl });
    }
  });
});