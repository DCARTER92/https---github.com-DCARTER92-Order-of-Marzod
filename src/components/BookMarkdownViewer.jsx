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

export default function BookMarkdownViewer({ file, title }) {
  const [markdown, setMarkdown] = useState('');
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(file)
      .then(res => res.text())
      .then(md => {
        setMarkdown(md);
        setHeadings(extractHeadings(md));
        setLoading(false);
      });
  }, [file]);

  const handleTocClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-row gap-8">
      <aside className="w-64 shrink-0 bg-black/20 p-4 rounded-lg max-h-[80vh] overflow-auto">
        <h3 className="font-bold mb-2 text-lg">{title} TOC</h3>
        <ul className="space-y-1">
          {headings.map(h => (
            <li key={h.id} style={{ marginLeft: (h.level - 1) * 16 }}>
              <button
                className="text-blue-400 hover:underline text-left"
                onClick={() => handleTocClick(h.id)}
              >
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="prose prose-invert max-w-none flex-1">
        {loading ? <div>Loading...</div> :
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 id={props.children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}>{props.children}</h1>,
              h2: ({ node, ...props }) => <h2 id={props.children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}>{props.children}</h2>,
              h3: ({ node, ...props }) => <h3 id={props.children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}>{props.children}</h3>,
              h4: ({ node, ...props }) => <h4 id={props.children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}>{props.children}</h4>,
              h5: ({ node, ...props }) => <h5 id={props.children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}>{props.children}</h5>,
              h6: ({ node, ...props }) => <h6 id={props.children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}>{props.children}</h6>,
            }}
          >
            {markdown}
          </ReactMarkdown>
        }
      </main>
    </div>
  );
}
