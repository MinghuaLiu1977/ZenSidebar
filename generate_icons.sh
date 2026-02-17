#!/bin/bash

# 图标尺寸生成脚本
# 需要安装 ImageMagick: brew install imagemagick

set -e

SOURCE_ICON="extension/ZenSidebar_logo.png"
OUTPUT_DIR="release/icons"

echo "🎨 生成不同尺寸的图标..."

# 创建输出目录
mkdir -p "${OUTPUT_DIR}"

# 检查 ImageMagick 是否安装
if ! command -v convert &> /dev/null; then
    echo "❌ 错误: 需要安装 ImageMagick"
    echo "请运行: brew install imagemagick"
    exit 1
fi

# 生成不同尺寸
convert "${SOURCE_ICON}" -resize 16x16 "${OUTPUT_DIR}/icon_16.png"
convert "${SOURCE_ICON}" -resize 48x48 "${OUTPUT_DIR}/icon_48.png"
convert "${SOURCE_ICON}" -resize 128x128 "${OUTPUT_DIR}/icon_128.png"

echo "✅ 图标生成完成:"
ls -lh "${OUTPUT_DIR}"

echo ""
echo "📝 注意: 你还需要准备以下素材:"
echo "  - 小型宣传图: 440x280px"
echo "  - 大型宣传图: 920x680px (可选)"
echo "  - 截图: 1280x800px (至少 1 张)"
