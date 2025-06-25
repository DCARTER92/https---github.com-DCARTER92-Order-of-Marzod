import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Helper to extract headings for TOC
function extractHeadings(markdown) {
  const lines = markdown.split('\n');
  const headings = [];
  lines.forEach((line, idx) => {
    const match = line.match(/^(#{1,6})\s+(.*)/);
    if (match) {
      headings.push({
        level: match[1].length,
        text: match[2],
        line: idx + 1,
        id: match[2].toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
    }
  });
  return headings;
}

export default function BookMarkdownViewer({ file, title, chapter }) {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(file)
      .then(res => res.text())
      .then(md => {
        if (chapter) {
          const lines = md.split('\n');
          const chapterStart = lines.findIndex(line => line.includes(chapter));
          if (chapterStart !== -1) {
            let chapterEnd = lines.findIndex((line, index) => index > chapterStart && /^([IVXLCDM]+):|Part \w+:/.test(line));
            if (chapterEnd === -1) {
              chapterEnd = lines.length;
            }
            setMarkdown(lines.slice(chapterStart, chapterEnd).join('\n'));
          } else {
            setMarkdown('Chapter not found.');
          }
        } else {
          setMarkdown(md);
        }
        setLoading(false);
      });
  }, [file, chapter]);

  return (
    <div className="prose prose-invert max-w-none flex-1">
      {loading ? <div>Loading...</div> :
        <ReactMarkdown>
          {markdown}
        </ReactMarkdown>
      }
    </div>
  );
}
