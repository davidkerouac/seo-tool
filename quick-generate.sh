#!/bin/bash

# 快速生成 SEO 内容

echo "🚀 SEO 工具 - 快速生成"
echo "======================================"
echo ""

# 读取用户输入
echo "请选择功能："
echo "1) 生成文章"
echo "2) 分析关键词"
echo "3) SEO 审计"
echo "4) 生成站点地图"
echo ""
read -p "请输入选项 (1-4): " choice

case $choice in
  1)
    echo ""
    read -p "文章主题: " topic
    read -p "关键词（用逗号分隔）: " keywords_input
    read -p "目标字数 (默认1500): " words
    words=${words:-1500}

    # 转换关键词为 JSON 数组
    IFS=',' read -ra keywords <<< "$keywords_input"
    keyword_json="["
    for i in "${!keywords[@]}"; do
      keyword=$(echo "${keywords[$i]}" | xargs) # 去除空格
      if [ $i -gt 0 ]; then keyword_json+=","; fi
      keyword_json+="\"$keyword\""
    done
    keyword_json+="]"

    echo ""
    echo "⏳ 正在生成文章..."

    result=$(curl -s -X POST http://localhost:3000/api/generate-article \
      -H "Content-Type: application/json" \
      -d "{\"topic\":\"$topic\",\"keywords\":$keyword_json,\"targetWordCount\":$words,\"sections\":5}")

    filepath=$(echo $result | jq -r '.data.filepath')
    title=$(echo $result | jq -r '.data.title')

    echo "✅ 文章生成成功！"
    echo "标题: $title"
    echo "保存位置: $filepath"
    echo ""
    echo "💡 查看文件："
    echo "   cat $filepath"
    ;;

  2)
    echo ""
    read -p "输入要分析的文本: " text
    read -p "目标关键词: " keyword

    echo ""
    echo "⏳ 正在分析关键词..."

    result=$(curl -s -X POST http://localhost:3000/api/analyze-keywords \
      -H "Content-Type: application/json" \
      -d "{\"text\":\"$text\",\"keyword\":\"$keyword\"}")

    density=$(echo $result | jq -r '.data.density.density')
    count=$(echo $result | jq -r '.data.density.keywordCount')
    total=$(echo $result | jq -r '.data.density.totalWords')
    recommendation=$(echo $result | jq -r '.data.density.recommendation')

    echo "✅ 分析完成！"
    echo "关键词密度: $density%"
    echo "出现次数: $count"
    echo "总词数: $total"
    echo "建议: $recommendation"
    ;;

  3)
    echo ""
    read -p "HTML 文件路径 (或直接粘贴 HTML): " html_input
    read -p "主要关键词: " keyword

    # 检查是否是文件路径
    if [ -f "$html_input" ]; then
      html_content=$(cat "$html_input")
    else
      html_content="$html_input"
    fi

    echo ""
    echo "⏳ 正在执行 SEO 审计..."

    result=$(curl -s -X POST http://localhost:3000/api/seo-audit \
      -H "Content-Type: application/json" \
      -d "{\"html\":$(echo "$html_content" | jq -Rs .),\"keyword\":\"$keyword\",\"name\":\"audit\"}")

    score=$(echo $result | jq -r '.data.score')
    grade=$(echo $result | jq -r '.data.grade')
    htmlPath=$(echo $result | jq -r '.data.htmlPath')

    echo "✅ 审计完成！"
    echo "评分: $score/100"
    echo "等级: $grade"
    echo "HTML 报告: $htmlPath"
    echo ""
    echo "💡 查看报告："
    echo "   cat $htmlPath"
    ;;

  4)
    echo ""
    read -p "网站域名: " baseurl
    echo "输入页面路径（每行一个，输入空行结束）:"

    urls="["
    first=true
    while IFS= read -r line; do
      [ -z "$line" ] && break
      if [ "$first" = true ]; then
        first=false
      else
        urls+=","
      fi
      urls+="{\"loc\":\"$line\",\"changefreq\":\"weekly\",\"priority\":0.8}"
    done
    urls+="]"

    echo ""
    echo "⏳ 正在生成站点地图..."

    result=$(curl -s -X POST http://localhost:3000/api/generate-sitemap \
      -H "Content-Type: application/json" \
      -d "{\"urls\":$urls,\"baseUrl\":\"$baseurl\"}")

    filepath=$(echo $result | jq -r '.data.filepath')

    echo "✅ 站点地图生成成功！"
    echo "保存位置: $filepath"
    echo ""
    echo "💡 查看文件："
    echo "   cat $filepath"
    ;;

  *)
    echo "无效选项"
    ;;
esac

echo ""
