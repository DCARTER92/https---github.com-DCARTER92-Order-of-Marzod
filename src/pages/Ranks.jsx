import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import ShaderBackground from '../components/ShaderBackground';

export default function Ranks() {
  const [markdown, setMarkdown] = useState('');
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    fetch('/pages/ranks.md')
      .then(response => response.text())
      .then(text => {
        setMarkdown(text);
        const lines = text.split('\n');
        const headings = lines
          .filter(line => line.startsWith('#'))
          .map(line => ({
            level: line.match(/^#+/)[0].length,
            text: line.replace(/^#+\s*/, ''),
            id: line.replace(/^#+\s*/, '').toLowerCase().replace(/\s+/g, '-'),
          }));
        setHeadings(headings);
      });
  }, []);

  const handleTocClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <ShaderBackground />
      <div className="text-white max-w-4xl mx-auto px-8 py-12 space-y-12 relative z-10">
        <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] -z-10"></div>
        <h1 className="text-4xl font-bold mb-8 text-center text-shadow-lg">Ranks and Roles</h1>
        <div className="flex flex-row gap-8">
          <nav className="w-64 shrink-0 bg-black/20 p-4 rounded-lg max-h-[80vh] overflow-auto sticky top-0">
            <h2 className="text-2xl font-semibold mb-4 text-shadow-lg">Table of Contents</h2>
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
          </nav>
          <main className="prose prose-invert max-w-none flex-1">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 id={props.children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}>{props.children}</h1>,
                h2: ({ node, ...props }) => <h2 id={props.children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}>{props.children}</h2>,
                h3: ({ node, ...props }) => <h3 id={props.children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}>{props.children}</h3>,
              }}
            >
              {markdown}
            </ReactMarkdown>
          </main>
        </div>
      </div>
    </>
  );
}
