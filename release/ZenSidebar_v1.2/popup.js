document.addEventListener('DOMContentLoaded', () => {
    // 获取菜单元素
    const menu = document.getElementById('menu');

    // 假设你的菜单项数据如下
    const menuItems = [
        { title: '百度', url: 'https://www.baidu.com' },
        { title: '谷歌', url: 'https://www.google.com' }
    ];

    // 动态创建菜单项
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.title;
        li.addEventListener('click', () => {
            chrome.tabs.query({ url: item.url }, tabs => {
                if (tabs.length > 0) {
                    chrome.tabs.update(tabs[0].id, { active: true });
                } else {
                    chrome.tabs.create({ url: item.url });
                }
            });
        });
        menu.appendChild(li);
    });
});