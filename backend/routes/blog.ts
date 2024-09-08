import {Router, Request, Response} from 'express'
import { intializeDatabase } from '../db'
import { Blog } from '../types/blog'

interface SQLiteRunResult{
    lastID?: number;
    changes?: number;
}

const router = Router()

router.post('/',async(req: Request,res: Response)=>{
    const {title,content}: Blog = req.body
    const db = await intializeDatabase()

    try {
        const result = await db.run('INSERT INTO blogs (title,content) VALUES (?, ?)',[title,content])
        res.json({id:result.lastID,title,content})
    } catch (error) {
        res.status(500).json({error: "Failed to create blog post"})
    }
})

router.get('/',async(req:Request,res:Response)=>{
    const db = await intializeDatabase()

    try {
        const blogs: Blog[] = await db.all('SELECT * FROM blogs')
        res.json(blogs)
    } catch (error) {
        res.status(500).json({error: 'Failed to retrieve blog post'})
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    const db = await intializeDatabase();
    const { id } = req.params; // Extract the id from request parameters

    try {
        // Query to select a blog post by its id
        const blog: Blog | undefined = await db.get('SELECT * FROM blogs WHERE id = ?', [id]);
        
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ error: 'Blog post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve blog post' });
    }
});


router.put('/:id',async(req:Request,res:Response)=>{
    const {id} = req.params
    const {title,content}: Blog = req.body
    const db = await intializeDatabase()

    try {
        const result: SQLiteRunResult = await db.run('UPDATE blogs SET title = ?, content = ? WHERE id = ?',[title,content,id])

        if(result.changes && result.changes > 0){
            res.json({title,content,id})
        } else {
            res.status(404).json({error:"Blog post not found"})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to update blog post'})
    }
})

router.delete('/:id',async(req:Request, res: Response)=> {
    const {id} = req.params
    const db = await intializeDatabase()

    try {
        const result: SQLiteRunResult = await db.run('DELETE FROM blogs WHERE id = ?',[id])

        if(result.changes && result.changes > 0){
            res.json({message:'Blog post deleted'})
        } else{
            res.status(404).json({error: 'Blog post not found'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to delete blog post'})
    }
})

export default router