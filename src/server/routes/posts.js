import express from 'express';
import db from '../db';

const router = express.Router();

// CREATE a new blog post
router.post('/', (req, res) => {
  const { title, content } = req.body;
  db.run(
    `INSERT INTO blog_posts (title, content) VALUES (?, ?)`,
    [title, content],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// READ all blog posts
router.get('/', (req, res) => {
  db.all('SELECT * FROM blog_posts', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

// READ a single blog post by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM blog_posts WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(row);
  });
});

// UPDATE a blog post
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  db.run(
    `UPDATE blog_posts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [title, content, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post updated' });
    }
  );
});

// DELETE a blog post
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run(
    `DELETE FROM blog_posts WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted' });
    }
  );
});

export default router;
