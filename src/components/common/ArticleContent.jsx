import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

/**
 * Parses and formats inline markdown tokens: **bold**, *italic*, `code`, [link](url)
 */
export function renderFormattedText(text, isDark = false) {
  if (!text) return null;
  const tokenRegex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong
          key={i}
          className="font-extrabold"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          {renderFormattedText(part.slice(2, -2), isDark)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em
          key={i}
          className="italic"
          style={{ color: isDark ? '#f3f4f6' : '#1e293b' }}
        >
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono font-semibold"
          style={{
            backgroundColor: isDark ? '#262626' : '#f1f5f9',
            color: isDark ? '#fb923c' : '#c2410c',
            border: `1px solid ${isDark ? '#404040' : '#e2e8f0'}`,
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <a
            key={i}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline underline-offset-2 hover:opacity-80 transition-opacity"
            style={{ color: '#ea580c' }}
          >
            {match[1]}
          </a>
        );
      }
    }
    return part;
  });
}

/**
 * ArticleContent Component:
 * Parses multi-line article content containing markdown-style blocks
 * (headings, paragraphs, lists, quotes, tables) into semantically styled React elements.
 * Guaranteed 100% visible high-contrast colors in both Light Mode and Dark Mode.
 */
export function ArticleContent({ content, className = '' }) {
  const { darkMode } = useTheme();

  if (!content) return null;

  // Ultra-clear contrast color tokens
  const textHeading = darkMode ? '#ffffff' : '#0f172a';
  const textBody = darkMode ? '#d1d5db' : '#1e293b'; // Slate 800 for crystal-clear readability
  const quoteBg = darkMode ? 'rgba(234, 88, 12, 0.12)' : '#fff7ed';
  const quoteText = darkMode ? '#f3f4f6' : '#1e293b';
  const tableHeaderBg = darkMode ? '#1e1e1e' : '#f8fafc';
  const tableBorder = darkMode ? '#2e2e2e' : '#e2e8f0';

  const lines = content.split('\n');
  const blocks = [];
  let currentList = null; // { type: 'ul' | 'ol', items: [] }
  let currentTable = null; // { headers: [], rows: [] }
  let currentQuote = null; // { lines: [] }
  let currentParagraph = null; // { lines: [] }

  const flushCurrent = () => {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
    if (currentTable) {
      blocks.push(currentTable);
      currentTable = null;
    }
    if (currentQuote) {
      blocks.push(currentQuote);
      currentQuote = null;
    }
    if (currentParagraph) {
      blocks.push(currentParagraph);
      currentParagraph = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushCurrent();
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      flushCurrent();
      blocks.push({ type: 'h3', text: line.replace(/^###\s+/, '') });
      continue;
    }
    if (line.startsWith('## ')) {
      flushCurrent();
      blocks.push({ type: 'h2', text: line.replace(/^##\s+/, '') });
      continue;
    }
    if (line.startsWith('# ')) {
      flushCurrent();
      blocks.push({ type: 'h1', text: line.replace(/^#\s+/, '') });
      continue;
    }

    // Blockquote (> ...)
    if (line.startsWith('>')) {
      if (currentList || currentTable || currentParagraph) flushCurrent();
      const quoteText = line.replace(/^>\s?/, '');
      if (!currentQuote) currentQuote = { type: 'quote', lines: [] };
      currentQuote.lines.push(quoteText);
      continue;
    }

    // Table rows (| ... |)
    if (line.startsWith('|') && line.endsWith('|')) {
      if (currentList || currentQuote || currentParagraph) flushCurrent();
      // Separator line: | :--- | --- |
      if (/^\|[\s\-:]+(\|[\s\-:]+)+\|$/.test(line)) {
        continue;
      }
      const cells = line.slice(1, -1).split('|').map((c) => c.trim());
      if (!currentTable) {
        currentTable = { type: 'table', headers: cells, rows: [] };
      } else {
        currentTable.rows.push(cells);
      }
      continue;
    }

    // Unordered List (- ... or * ...)
    if (/^[-*]\s+/.test(line)) {
      if (currentTable || currentQuote || currentParagraph || (currentList && currentList.type !== 'ul')) {
        flushCurrent();
      }
      if (!currentList) currentList = { type: 'ul', items: [] };
      currentList.items.push(line.replace(/^[-*]\s+/, ''));
      continue;
    }

    // Ordered List (1. ... or 2. ...)
    if (/^\d+\.\s+/.test(line)) {
      if (currentTable || currentQuote || currentParagraph || (currentList && currentList.type !== 'ol')) {
        flushCurrent();
      }
      if (!currentList) currentList = { type: 'ol', items: [] };
      currentList.items.push(line.replace(/^\d+\.\s+/, ''));
      continue;
    }

    // Paragraph
    if (currentList || currentTable || currentQuote) {
      flushCurrent();
    }
    if (!currentParagraph) currentParagraph = { type: 'p', lines: [] };
    currentParagraph.lines.push(line);
  }

  flushCurrent();

  return (
    <div className={`article-content space-y-5 ${className}`}>
      {blocks.map((block, idx) => {
        if (block.type === 'h1' || block.type === 'h2') {
          return (
            <h2
              key={idx}
              className="text-2xl sm:text-3xl font-extrabold mt-9 mb-3 pt-2 tracking-tight"
              style={{ color: textHeading }}
            >
              {renderFormattedText(block.text, darkMode)}
            </h2>
          );
        }

        if (block.type === 'h3') {
          return (
            <h3
              key={idx}
              className="text-lg sm:text-2xl font-bold mt-8 mb-3 tracking-tight flex items-center gap-2.5"
              style={{ color: textHeading }}
            >
              <span className="w-1.5 h-5 sm:h-6 bg-orange-500 rounded-full inline-block shrink-0" />
              <span>{renderFormattedText(block.text, darkMode)}</span>
            </h3>
          );
        }

        if (block.type === 'p') {
          return (
            <p
              key={idx}
              className="leading-relaxed sm:leading-loose text-base sm:text-lg md:text-xl font-normal"
              style={{ color: textBody }}
            >
              {renderFormattedText(block.lines.join(' '), darkMode)}
            </p>
          );
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              key={idx}
              className="p-5 sm:p-6 my-6 border-l-4 border-orange-500 rounded-r-2xl italic leading-relaxed text-base sm:text-lg"
              style={{ backgroundColor: quoteBg, color: quoteText }}
            >
              {block.lines.map((qLine, qIdx) => (
                <p key={qIdx} className={qIdx > 0 ? 'mt-2' : ''}>
                  {renderFormattedText(qLine, darkMode)}
                </p>
              ))}
            </blockquote>
          );
        }

        if (block.type === 'ul') {
          return (
            <ul key={idx} className="space-y-3 my-4 pl-1 sm:pl-2 list-none">
              {block.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="flex items-start gap-3 text-base sm:text-lg leading-relaxed"
                  style={{ color: textBody }}
                >
                  <span className="w-2 h-2 rounded-full bg-orange-500 mt-2.5 shrink-0 shadow-sm" />
                  <span className="flex-1">{renderFormattedText(item, darkMode)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol key={idx} className="space-y-3 my-4 pl-1 sm:pl-2 list-none">
              {block.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="flex items-start gap-3 text-base sm:text-lg leading-relaxed"
                  style={{ color: textBody }}
                >
                  <span
                    className="w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center mt-0.5 shrink-0"
                    style={{
                      backgroundColor: darkMode ? 'rgba(234, 88, 12, 0.2)' : '#ffedd5',
                      color: darkMode ? '#fb923c' : '#c2410c',
                    }}
                  >
                    {itemIdx + 1}
                  </span>
                  <span className="flex-1">{renderFormattedText(item, darkMode)}</span>
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === 'table') {
          return (
            <div
              key={idx}
              className="my-8 overflow-x-auto rounded-xl border shadow-sm"
              style={{ borderColor: tableBorder }}
            >
              <table className="w-full text-left text-sm sm:text-base border-collapse">
                <thead>
                  <tr
                    className="border-b"
                    style={{ backgroundColor: tableHeaderBg, borderColor: tableBorder, color: textHeading }}
                  >
                    {block.headers.map((h, hIdx) => (
                      <th key={hIdx} className="p-3.5 sm:p-4 font-bold tracking-tight">
                        {renderFormattedText(h, darkMode)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody style={{ borderColor: tableBorder }}>
                  {block.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="border-b last:border-b-0 hover:opacity-90 transition-opacity"
                      style={{ borderColor: tableBorder }}
                    >
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3.5 sm:p-4" style={{ color: textBody }}>
                          {renderFormattedText(cell, darkMode)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
