# Chrome Web Store 商店信息

## 基本信息

**扩展名称**: ZenSidebar

**简短描述** (最多 132 字符):
```
Minimalist sidebar for tabs and bookmarks with glassmorphism UI and smart address bar
```

**分类**: Functionality & UI

**语言**: English

---

## 详细描述

```
ZenSidebar - Your Minimalist Tab & Bookmark Manager

Transform your browsing experience with ZenSidebar, a sleek Chrome extension designed for full-screen enthusiasts and productivity lovers.

✨ KEY FEATURES

💎 Glassmorphism UI
Modern, translucent frosted-glass design that automatically adapts to your system's Light/Dark mode.

🚀 Smart Address Bar
Chrome-like experience with real-time suggestions from your History and Bookmarks. Supports direct URL navigation and keyword search.

📂 Focused Bookmarks
Quick access to your "Bookmarks Bar" with hierarchical folder support and native website favicons.

🧭 Dynamic Floating Ball
• Incognito Mode: Minimalist icon that expands on hover
• Free Dragging: Position it anywhere on your screen
• Smart Viewport Clamping: Never loses position off-screen

🏷️ Tab Management
Vertically lists all open tabs with instant switching and closing capabilities.

🛡️ Clean Isolation
Built with Shadow DOM technology to ensure zero conflicts with websites you visit.

PERFECT FOR:
• Full-screen browsing
• Minimalist workflows
• Quick tab and bookmark access
• Distraction-free productivity

PRIVACY FIRST:
All data is stored locally on your device. No external servers, no tracking, no analytics.

Get started in seconds - just install and look for the floating icon on the left side of any webpage!
```

---

## 权限说明

**Single Purpose Description**:
```
ZenSidebar provides a minimalist sidebar interface for managing browser tabs and bookmarks, featuring a floating ball UI that can be summoned on any webpage for quick access to tab switching, bookmark navigation, and smart address bar functionality.
```

**Permissions Justification**:

### tabs
```
Required to list all open browser tabs in the sidebar and enable users to switch between tabs or close them directly from the extension interface.
```

### bookmarks
```
Required to display the user's bookmark structure in the sidebar, allowing quick access to saved websites and folder navigation.
```

### storage
```
Required to save user preferences locally, including the floating ball position, theme preference (light/dark mode), and sidebar state (open/closed).
```

### history
```
Required to provide smart address bar suggestions by searching through the user's browsing history for quick navigation.
```

### favicon
```
Required to display website icons (favicons) next to tabs and bookmarks in the sidebar, providing visual recognition for quick navigation.
```

### <all_urls> (Host Permissions)
```
Required to inject the floating ball UI component on all web pages, allowing users to access the sidebar from any website they visit.
```

---

## 隐私政策

**Privacy Policy URL**: 
```
https://github.com/MinghuaLiu1977/ZenSidebar/blob/main/PRIVACY_POLICY.md
```

**Privacy Practices**:
- ✅ Does NOT collect user data
- ✅ Does NOT sell user data
- ✅ Does NOT use data for purposes unrelated to the extension's functionality
- ✅ All data stored locally only

---

## 支持信息

**Support URL**: 
```
https://github.com/MinghuaLiu1977/ZenSidebar/issues
```

**Homepage URL**:
```
https://github.com/MinghuaLiu1977/ZenSidebar
```

---

## 截图建议

建议准备以下 5 张截图（1280x800px）：

1. **主界面展示**: 浮动球和展开的侧边栏
2. **标签管理**: 显示多个标签的列表视图
3. **书签导航**: 展示书签文件夹结构
4. **智能地址栏**: 显示搜索建议功能
5. **暗色模式**: 展示暗色主题下的界面

---

## 宣传图尺寸

需要准备：
- **Small Promo Tile**: 440x280px (必需)
- **Large Promo Tile**: 920x680px (推荐)
- **Marquee Promo Tile**: 1400x560px (可选)

---

## 版本信息

**当前版本**: 1.2
**最小 Chrome 版本**: 88 (Manifest V3 支持)

---

## 更新日志模板

```
Version 1.2 - "Smart & Focused" Update

Features:
• Zen Mode: Floating ball visibility now tied to Full-screen mode (Window/Element).
• Smart Isolation: Tab list now only shows tabs from the current Chrome window.
• Ergonomic Layout: Search bar moved to the bottom with upward-opening suggestions.
• Enhanced UI: Improved opacity for search result popups for better readability.
• Refinements: Better theme consistency and internal performance optimizations.

Version 1.1 - Initial Release

Features:
• Glassmorphism UI with auto light/dark mode
• Smart address bar with history and bookmark suggestions
• Floating ball with drag-and-drop positioning
• Tab management with quick switching
• Bookmark navigation with folder support
• Shadow DOM isolation for zero conflicts
• Privacy-focused: all data stored locally
```
