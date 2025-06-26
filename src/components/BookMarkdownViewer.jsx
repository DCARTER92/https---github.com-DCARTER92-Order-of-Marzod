import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

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
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeRaw,
            rehypeHighlight,
            rehypeSlug
          ]}
        >
          {markdown}
        </ReactMarkdown>
      }
    </div>
  );
}
