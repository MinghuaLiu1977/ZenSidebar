# Chrome Web Store 上传检查清单

## ✅ 准备完成的文件

- [x] **发布包**: `release/ZenSidebar_v1.1.zip` (12KB)
- [x] **隐私政策**: `PRIVACY_POLICY.md`
- [x] **商店信息**: `STORE_LISTING.md`
- [x] **打包脚本**: `build_release.sh`

---

## 📋 上传前检查清单

### 1. 本地测试 ✓
- [ ] 在 Chrome 中加载 `release/ZenSidebar_v1.1` 目录
- [ ] 测试浮动球显示和拖动
- [ ] 测试侧边栏展开/收起
- [ ] 测试标签切换和关闭
- [ ] 测试书签导航
- [ ] 测试智能地址栏搜索
- [ ] 测试亮色/暗色模式切换

### 2. 必需素材准备
- [ ] 图标 128x128px (已有: `ZenSidebar_logo.png`)
- [ ] 小型宣传图 440x280px
- [ ] 截图 1-5 张 (1280x800px 或 640x400px)
- [ ] 隐私政策 URL (可用 GitHub 链接)

### 3. 商店信息准备
- [ ] 简短描述 (< 132 字符)
- [ ] 详细描述
- [ ] 权限说明
- [ ] 分类: Functionality & UI
- [ ] 支持 URL: GitHub Issues

---

## 🚀 上传步骤

### 步骤 1: 注册开发者账号
1. 访问: https://chrome.google.com/webstore/devconsole
2. 登录 Google 账号
3. 支付 $5 USD 注册费（一次性）

### 步骤 2: 上传扩展
1. 点击 "New Item"
2. 上传 `release/ZenSidebar_v1.1.zip`
3. 等待验证通过

### 步骤 3: 填写商店信息

#### 基本信息
```
名称: ZenSidebar
简短描述: Minimalist sidebar for tabs and bookmarks with glassmorphism UI and smart address bar
详细描述: [复制 STORE_LISTING.md 中的内容]
分类: Functionality & UI
语言: English
```

#### 图标和截图
- 上传 128x128 图标
- 上传截图（建议 3-5 张）
- 上传宣传图（440x280）

#### 隐私设置
```
隐私政策 URL: https://github.com/MinghuaLiu1977/ZenSidebar/blob/main/PRIVACY_POLICY.md
```

#### 权限说明
复制 `STORE_LISTING.md` 中的 "Permissions Justification" 部分

### 步骤 4: 提交审核
1. 检查所有信息
2. 点击 "Submit for Review"
3. 等待审核（1-3 工作日）

---

## 📝 权限说明快速参考

**tabs**: 列出和管理打开的标签页  
**bookmarks**: 显示和访问用户书签  
**storage**: 保存用户偏好设置（位置、主题）  
**history**: 提供智能地址栏建议  
**favicon**: 显示网站图标（favicons）  
**<all_urls>**: 在所有页面注入浮动球 UI

---

## ⚠️ 常见审核问题

1. **权限过度**: ✅ 已最小化权限
2. **描述不清**: ✅ 已提供详细说明
3. **缺少隐私政策**: ✅ 已创建 PRIVACY_POLICY.md
4. **图标质量**: ⚠️ 需确保清晰度
5. **功能不符**: ✅ 描述与实际功能一致

---

## 🎨 待准备素材

### 截图建议（1280x800px）

1. **主界面**: 浮动球 + 展开的侧边栏
2. **标签管理**: 多个标签的列表
3. **书签导航**: 书签文件夹结构
4. **智能搜索**: 地址栏建议
5. **暗色模式**: 暗色主题界面

### 宣传图（440x280px）

设计要点:
- 展示浮动球和侧边栏
- 使用 glassmorphism 风格
- 添加简短功能说明
- 保持简洁专业

---

## 📞 支持链接

- **开发者控制台**: https://chrome.google.com/webstore/devconsole
- **发布政策**: https://developer.chrome.com/docs/webstore/program-policies/
- **最佳实践**: https://developer.chrome.com/docs/webstore/best_practices/
- **GitHub 仓库**: https://github.com/MinghuaLiu1977/ZenSidebar

---

## 🔄 更新流程

当需要更新扩展时:

1. 修改 `extension/manifest.json` 中的版本号
2. 运行 `./build_release.sh` 重新打包
3. 在开发者控制台上传新版本
4. 填写更新日志
5. 提交审核

---

**准备就绪！** 现在可以开始上传到 Chrome Web Store 了 🚀
