import { flattenBookmarks, shouldShowButton } from './utils.js';

describe('flattenBookmarks', () => {
    test('should flatten a simple bookmark tree', () => {
        const tree = [
            {
                title: 'Folder',
                children: [
                    { title: 'Link 1', url: 'https://link1.com' },
                    { title: 'Link 2', url: 'https://link2.com' }
                ]
            }
        ];
        const result = flattenBookmarks(tree);
        expect(result).toHaveLength(2);
        expect(result[0].title).toBe('Link 1');
        expect(result[1].url).toBe('https://link2.com');
    });

    test('should handle deep nesting', () => {
        const tree = [
            {
                title: 'Level 1',
                children: [
                    {
                        title: 'Level 2',
                        children: [
                            { title: 'Sub Link', url: 'https://sub.com' }
                        ]
                    }
                ]
            }
        ];
        const result = flattenBookmarks(tree);
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('Sub Link');
    });
});

describe('shouldShowButton', () => {
    test('should return true when window is in fullscreen', () => {
        expect(shouldShowButton('fullscreen', false)).toBe(true);
    });

    test('should return true when an element is in fullscreen via API', () => {
        expect(shouldShowButton('normal', true)).toBe(true);
    });

    test('should return false when window is normal and no element is in fullscreen', () => {
        expect(shouldShowButton('normal', false)).toBe(false);
    });

    test('should return false for other window states', () => {
        expect(shouldShowButton('minimized', false)).toBe(false);
        expect(shouldShowButton('maximized', false)).toBe(false);
    });
});
