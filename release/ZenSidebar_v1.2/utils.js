/**
 * utils.js
 */
export function flattenBookmarks(nodes, result = []) {
    nodes.forEach(node => {
        if (node.url) {
            result.push({ title: node.title, url: node.url });
        }
        if (node.children) {
            flattenBookmarks(node.children, result);
        }
    });
    return result;
}

/**
 * Determines if the ZenSidebar button should be shown.
 * @param {string} windowState - Browser window state ('normal', 'fullscreen', etc.)
 * @param {boolean} hasFullscreenElement - Whether an element is in fullscreen via API
 * @returns {boolean}
 */
export function shouldShowButton(windowState, hasFullscreenElement) {
    return windowState === 'fullscreen' || hasFullscreenElement;
}
