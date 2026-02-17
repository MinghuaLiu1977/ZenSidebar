# ZenSidebar - Minimalist Sidebar Tab & Bookmark Manager

`ZenSidebar` is a Chrome extension designed for full-screen browsing and a premium user experience. It features a sleek floating ball that summons a powerful sidebar, integrating tab switching, bookmark management, and a smart address bar.

## ✨ Key Features

- **💎 Glassmorphism UI**: A modern, translucent frosted-glass theme that automatically adapts to system Light/Dark modes.
- **🚀 Smart Address Bar**: A Chrome-like experience with real-time suggestions from your **History** and **Bookmarks**. Supports direct URL navigation and keyword search.
- **📂 Focused Bookmarks**: Specifically targets the "Bookmarks Bar" for quick access. Features hierarchical folder support with effortless toggle interactions and native website icons (favicons).
- **🧭 Dynamic Floating Ball**:
  - **Incognito Mode**: Shows only the icon by default to minimize visual distraction; expands into a full button on hover.
  - **Free Dragging**: Move the ball anywhere on your screen. It includes smart viewport clamping to ensure it never gets lost off-screen.
- **🛡️ Clean Isolation**: Built with **Shadow DOM** technology to ensure extension styles never conflict with the websites you visit.
- **🏷️ Tab Management**: Vertically lists all open tabs. Switch or close tabs instantly with a filtered list that excludes restricted system pages.


## 📸 Preview

![Logo](ZenSidebar_logo.png)
*(Recommended for use in Full-Screen mode for the best experience)*

## 🛠️ Installation

1. **Download**: Clone or download this repository to your local machine.
2. **Open Extensions**: Navigate to `chrome://extensions/` in your Chrome browser.
3. **Enable Developer Mode**: Toggle the "Developer mode" switch in the top right corner.
4. **Load Extension**: Click "Load unpacked" and select the project directory.
5. **Enjoy**: Find the floating icon on the left side of your web pages.

## ⌨️ Keyboard & Interactions

- **Click Ball**: Toggle the sidebar.
- **Drag Ball**: Reposition the floating icon.
- **Address Bar**:
  - `Enter`: Navigate to URL or perform a search.
  - `↑ / ↓`: Cycle through search suggestions.
  - `Esc`: Close the suggestion list.

## 📦 Project Structure

- `content.js`: Core logic for Shadow DOM injection, UI rendering, and interactions.
- `background.js`: Service worker handling tab queries, bookmark searches, and history suggestions.
- `manifest.json`: Extension configuration and permissions.
- `ZenSidebar_logo.png`: Assets for the floating ball.

---

*Designed for Full-Screen - Making your web browsing more focused and efficient.*
