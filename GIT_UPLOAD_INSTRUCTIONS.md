# How to Upload Books via Git

1. First, prepare your markdown files following the format:
```
Part 1: Example Part
I: First Chapter
Content here...

II: Second Chapter
More content...

Part 2: Another Part
III: Third Chapter
```

2. Open Git Bash or terminal in your local repository.

3. Copy your markdown files to the `public/books/` directory.

4. Run these commands:

```bash
# Navigate to your local repo
cd C:\Users\danan\Desktop\Order-of-Marzod-last\https---github.com-DCARTER92-Order-of-Marzod-master

# Check file status
git status

# Add the new book files
git add public/books/your-new-file.md

# Commit the changes
git commit -m "Add new book files to public/books directory"

# Push to GitHub
git push origin master
```

5. After pushing, you can add the book to the TOC by editing `src/pages/Books.jsx`:

```javascript
// Add to bookFiles array:
{ 
  key: 'unique-key', 
  file: '/books/your-new-file.md', 
  title: 'Your Book Title' 
}
```

Note: Replace `your-new-file.md` and placeholders with your actual filenames and titles.

Warning: Ensure your markdown files follow the Part/Chapter format for automatic TOC generation.
