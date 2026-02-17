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
