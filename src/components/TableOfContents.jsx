
import React, { useState, useEffect } from 'react';

const TableOfContents = ({ file, onSelect }) => {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    fetch(file)
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n');
        const newToc = [];
        let currentPart = null;
        let currentChapter = null;

        lines.forEach(line => {
          const partMatch = line.match(/^Part (\w+): (.*)/);
          const chapterMatch = line.match(/^([IVXLCDM]+): (.*)/);
          const headingMatch = line.match(/^(#{1,6})\s+(.*)/);

          if (partMatch) {
            if (currentPart) {
              newToc.push(currentPart);
            }
            currentPart = { 
              title: `Part ${partMatch[1]}: ${partMatch[2]}`, 
              id: `part-${partMatch[1].toLowerCase()}-${partMatch[2].toLowerCase().replace(/\s+/g, '-')}`,
              chapters: [] 
            };
          } else if (chapterMatch && currentPart) {
            currentChapter = { 
              title: `${chapterMatch[1]}: ${chapterMatch[2]}`,
              id: `${chapterMatch[1].toLowerCase()}-${chapterMatch[2].toLowerCase().replace(/\s+/g, '-')}`,
              lines: [] 
            };
            currentPart.chapters.push(currentChapter);
          } else if (headingMatch && currentChapter) {
            currentChapter.lines.push({
              level: headingMatch[1].length,
              text: headingMatch[2],
              id: headingMatch[2].toLowerCase().replace(/\s+/g, '-')
            });
          }
        });

        if (currentPart) {
          newToc.push(currentPart);
        }
        setToc(newToc);
      });
  }, [file]);

  return (
    <ul className="list-disc list-inside space-y-2 text-shadow-lg">
      {toc.map((part, partIndex) => (
        <li key={partIndex}>
          <span className="font-bold">{part.title}</span>
          <ul className="list-disc list-inside ml-4 space-y-1">
            {part.chapters.map((chapter, chapterIndex) => (
              <li key={chapterIndex}>
                <a
                  href={`#${chapter.id}`}
                  className="text-blue-400 hover:underline"
                >
                  {chapter.title}
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default TableOfContents;
