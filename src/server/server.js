import express from 'express';
import postsRouter from './routes/posts';

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Use the posts routes
app.use('/api/posts', postsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
