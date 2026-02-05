import React from "react";
import { useMemo } from "react";
import type { ReactNode } from "react";

interface MarkdownRendererProps {
  content: string;
}

type Block =
  | { type: "heading"; level: 1 | 2 | 3; content: string }
  | { type: "paragraph"; content: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "blockquote"; content: string }
  | { type: "hr" }
  | { type: "image"; src: string; alt: string };

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderInline(text: string): ReactNode[] {
  const tokens: ReactNode[] = [];
  const pattern = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(\[(.+?)\]\((.+?)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      tokens.push(
        <strong className="text-slate-900" key={`strong-${key++}`}>
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      tokens.push(
        <em className="text-slate-800" key={`em-${key++}`}>
          {match[4]}
        </em>
      );
    } else if (match[5]) {
      tokens.push(
        <a
          key={`link-${key++}`}
          href={match[7]}
          className="text-slate-900 underline decoration-slate-300 hover:decoration-secondary transition"
          target="_blank"
          rel="noreferrer"
        >
          {match[6]}
        </a>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }

  return tokens;
}

function parseSimpleMarkdown(markdown: string): Block[] {
  const cleaned = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "")
    .replace(/`([^`]+)`/g, "$1");

  const lines = cleaned.split(/\r?\n/);
  const blocks: Block[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;
  let quoteBuffer: string[] = [];

  const flushList = () => {
    if (list) {
      blocks.push({ type: list.type, items: list.items });
      list = null;
    }
  };

  const flushQuote = () => {
    if (quoteBuffer.length) {
      blocks.push({ type: "blockquote", content: quoteBuffer.join(" ") });
      quoteBuffer = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      flushQuote();
      continue;
    }

    const headingMatch = /^(#{1,3})\s+(.*)/.exec(line);
    if (headingMatch) {
      flushList();
      flushQuote();
      const level = headingMatch[1].length as 1 | 2 | 3;
      blocks.push({ type: "heading", level, content: headingMatch[2] });
      continue;
    }

    if (line === "---" || line === "***") {
      flushList();
      flushQuote();
      blocks.push({ type: "hr" });
      continue;
    }

    const imgMatch = /^!\[(.*?)\]\((.*?)\)$/.exec(line);
    if (imgMatch) {
      flushList();
      flushQuote();
      blocks.push({
        type: "image",
        src: imgMatch[2],
        alt: imgMatch[1] || "",
      });
      continue;
    }

    if (line.startsWith(">")) {
      flushList();
      const text = line.replace(/^>\s?/, "");
      quoteBuffer.push(text);
      continue;
    }

    const olMatch = /^(\d+)\.\s+(.*)/.exec(line);
    if (olMatch) {
      flushQuote();
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", items: [] };
      }
      list.items.push(olMatch[2]);
      continue;
    }

    const ulMatch = /^[-*+]\s+(.*)/.exec(line);
    if (ulMatch) {
      flushQuote();
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(ulMatch[1]);
      continue;
    }

    flushList();
    flushQuote();
    blocks.push({ type: "paragraph", content: line });
  }

  flushList();
  flushQuote();
  return blocks;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = useMemo(() => parseSimpleMarkdown(content), [content]);

  return (
    <div className="mx-auto max-w-3xl text-slate-800 font-reading">
      <div className="space-y-6 text-[17px] sm:text-[18px] leading-[1.8] tracking-[0.005em]">
        {blocks.map((block, index) => {
          if (block.type === "heading") {
            const sizes = {
              1: "text-2xl sm:text-[28px] font-bold mt-10 mb-4",
              2: "text-xl sm:text-2xl font-semibold mt-8 mb-3",
              3: "text-lg sm:text-xl font-semibold mt-6 mb-3",
            };
            return (
              <div
                key={`h-${index}`}
                className={`${sizes[block.level]} font-display text-slate-900`}
              >
                {renderInline(block.content)}
              </div>
            );
          }

          if (block.type === "paragraph") {
            return (
              <p key={`p-${index}`} className="text-slate-800">
                {renderInline(block.content)}
              </p>
            );
          }

          if (block.type === "ul" || block.type === "ol") {
            const ListTag = block.type === "ul" ? "ul" : "ol";
            return (
              <ListTag
                key={`list-${index}`}
                className={`pl-5 space-y-2 ${
                  block.type === "ul" ? "list-disc" : "list-decimal"
                }`}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={`li-${index}-${itemIndex}`}>
                    <span className="text-slate-800">{renderInline(item)}</span>
                  </li>
                ))}
              </ListTag>
            );
          }

          if (block.type === "blockquote") {
            return (
              <blockquote
                key={`quote-${index}`}
                className="border-l-2 border-slate-200 pl-4 italic text-slate-700"
              >
                {renderInline(block.content)}
              </blockquote>
            );
          }

          if (block.type === "hr") {
            return <hr key={`hr-${index}`} className="border-slate-200 my-8" />;
          }

          if (block.type === "image") {
            return (
              <div key={`img-${index}`} className="flex justify-center my-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.src}
                  alt={escapeHtml(block.alt)}
                  className="rounded-xl shadow-sm max-h-[520px] w-auto object-contain"
                  loading="lazy"
                />
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
