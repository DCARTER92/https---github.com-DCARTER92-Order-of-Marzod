
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

          if (partMatch) {
            if (currentPart) {
              newToc.push(currentPart);
            }
            currentPart = { title: `Part ${partMatch[1]}: ${partMatch[2]}`, chapters: [] };
          } else if (chapterMatch && currentPart) {
            currentChapter = { title: `${chapterMatch[1]}: ${chapterMatch[2]}`, lines: [] };
            currentPart.chapters.push(currentChapter);
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
                <button
                  className="text-blue-400 hover:underline"
                  onClick={() => onSelect(chapter.title)}
                >
                  {chapter.title}
                </button>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default TableOfContents;
