import express, { Application } from 'express';
import blogRoutes from './routes/blog';
import cors from 'cors'

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3001;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.get('/',(req,res) => {
    res.send('Welcome to the Express Backend!')
})

// Use the blog routes for handling API requests related to blogs
app.use('/api/blogs', blogRoutes);

// Start the server and handle any potential errors
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Failed to start server:', err.message);
});
