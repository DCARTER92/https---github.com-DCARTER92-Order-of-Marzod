import React, { useState } from 'react';
import ShaderBackground from '../components/ShaderBackground';
import BookMarkdownViewer from '../components/BookMarkdownViewer';
import TableOfContents from '../components/TableOfContents';

const bookFiles = [
  { key: 'book1', file: '/books/the_book-of-water.md', title: 'The Book of Water' },
  { key: 'book2', file: '/books/the_book-of-metal.md', title: 'The Book of Metal' },
  { key: 'book3', file: '/books/the_book-of-earth.md', title: 'The Book of Earth' },
  { key: 'book4', file: '/books/the_book-of-fire.md', title: 'The Book of Fire' },
  { key: 'book5', file: '/books/the_book-of-air.md', title: 'The Book of Air' },
  { key: 'book6', file: '/books/the_book-of-wood.md', title: 'The Book of Wood' },
  { key: 'foundational', file: '/books/the_foundational-accords.md', title: 'Foundational Accords' },
  { key: 'bible', file: '/books/the_bible-analysis.md', title: 'The Bible - An Analysis' }
];

export default function Books() {
  const [selectedBookKey, setSelectedBookKey] = useState(bookFiles[0].key);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const selectedBook = bookFiles.find(b => b.key === selectedBookKey);


  return (
    <>
      <ShaderBackground />
      <div className="text-white max-w-4xl mx-auto px-8 py-12 space-y-12 relative z-10">
        <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] -z-10"></div>
        <h1 className="text-4xl font-bold mb-8 text-center text-shadow-lg">Books of The Order of Marzod</h1>
        <nav className="mb-8 sticky top-0 bg-gray-900/90 p-4 rounded shadow backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-shadow-lg">Table of Contents</h2>
          <select
            className="bg-gray-800 text-white p-2 rounded mb-4 w-full"
            onChange={(e) => {
              setSelectedBookKey(e.target.value);
              setSelectedChapter(null);
            }}
            value={selectedBookKey}
          >
            {bookFiles.map(({ key, title }) => (
              <option key={key} value={key}>
                {title}
              </option>
            ))}
          </select>
          <TableOfContents file={selectedBook.file} />
        </nav>
        <section className="mb-32 bg-black/30 backdrop-blur-sm rounded-lg p-8">
          <BookMarkdownViewer file={selectedBook.file} title={selectedBook.title} chapter={selectedChapter} />
        </section>
      </div>
    </>
  );
}
