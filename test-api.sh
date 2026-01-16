#!/bin/bash

# SEO Tool 命令行测试脚本

echo "🚀 SEO 工具测试"
echo "================================"
echo ""

# 测试 1: 生成文章
echo "📝 测试 1: 生成文章"
curl -s -X POST http://localhost:3000/api/generate-article \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "人工智能的发展",
    "keywords": ["AI", "机器学习"],
    "targetWordCount": 1000,
    "sections": 3
  }' | jq '.data.title, .data.filepath'

echo ""

# 测试 2: 关键词分析
echo "🎯 测试 2: 关键词分析"
curl -s -X POST http://localhost:3000/api/analyze-keywords \
  -H "Content-Type: application/json" \
  -d '{
    "text": "编程是一项重要技能。学习编程需要时间和实践。编程可以帮助解决问题。",
    "keyword": "编程"
  }' | jq '.data.density'

echo ""

# 测试 3: SEO 审计
echo "🔍 测试 3: SEO 审计"
curl -s -X POST http://localhost:3000/api/seo-audit \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<html><head><title>测试页面</title><meta name=\"description\" content=\"这是一个测试页面的描述内容，用于SEO优化分析。\"></head><body><h1>主标题</h1><p>内容段落</p></body></html>",
    "keyword": "测试",
    "name": "test-audit"
  }' | jq '{score: .data.score, grade: .data.grade, htmlPath: .data.htmlPath}'

echo ""
echo "✅ 测试完成！"
echo ""
echo "💡 查看生成的文件："
echo "   ls -lh output/articles/"
echo "   ls -lh output/reports/"
