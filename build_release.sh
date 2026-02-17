#!/bin/bash

# ZenSidebar Chrome Extension 发布打包脚本
# 用途: 自动创建干净的发布版本并打包成 ZIP

set -e  # 遇到错误立即退出

# 颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  ZenSidebar 发布打包工具${NC}"
echo -e "${BLUE}========================================${NC}"

# 读取版本号
VERSION=$(grep -o '"version": "[^"]*"' extension/manifest.json | cut -d'"' -f4)
echo -e "${GREEN}当前版本: ${VERSION}${NC}"

# 创建发布目录
RELEASE_DIR="release/ZenSidebar_v${VERSION}"
echo -e "${YELLOW}创建发布目录: ${RELEASE_DIR}${NC}"
mkdir -p "${RELEASE_DIR}"

# 复制必要文件
echo -e "${YELLOW}复制扩展文件...${NC}"
cp extension/manifest.json "${RELEASE_DIR}/"
cp extension/background.js "${RELEASE_DIR}/"
cp extension/content.js "${RELEASE_DIR}/"
cp extension/utils.js "${RELEASE_DIR}/"
cp extension/popup.html "${RELEASE_DIR}/"
cp extension/popup.js "${RELEASE_DIR}/"
cp extension/ZenSidebar_logo.png "${RELEASE_DIR}/"

# 检查是否有 _favicon 目录
if [ -d "extension/_favicon" ]; then
    echo -e "${YELLOW}复制 favicon 资源...${NC}"
    cp -r extension/_favicon "${RELEASE_DIR}/"
fi

# 创建 ZIP 包
ZIP_FILE="release/ZenSidebar_v${VERSION}.zip"
echo -e "${YELLOW}创建 ZIP 包: ${ZIP_FILE}${NC}"
cd release
rm -f "ZenSidebar_v${VERSION}.zip"
zip -r "ZenSidebar_v${VERSION}.zip" "ZenSidebar_v${VERSION}/"
cd ..

# 显示文件信息
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ 打包完成!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "发布目录: ${RELEASE_DIR}"
echo -e "ZIP 文件: ${ZIP_FILE}"
echo -e "文件大小: $(du -h "${ZIP_FILE}" | cut -f1)"
echo ""
echo -e "${BLUE}包含的文件:${NC}"
unzip -l "${ZIP_FILE}" | tail -n +4 | head -n -2

echo ""
echo -e "${YELLOW}下一步:${NC}"
echo "1. 在 Chrome 中测试: chrome://extensions/"
echo "2. 上传到 Chrome Web Store: https://chrome.google.com/webstore/devconsole"
echo ""
