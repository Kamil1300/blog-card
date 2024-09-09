"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const db = yield (0, db_1.intializeDatabase)();
    try {
        const result = yield db.run('INSERT INTO blogs (title,content) VALUES (?, ?)', [title, content]);
        res.json({ id: result.lastID, title, content });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create blog post" });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.intializeDatabase)();
    try {
        const blogs = yield db.all('SELECT * FROM blogs');
        res.json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve blog post' });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.intializeDatabase)();
    const { id } = req.params; // Extract the id from request parameters
    try {
        // Query to select a blog post by its id
        const blog = yield db.get('SELECT * FROM blogs WHERE id = ?', [id]);
        if (blog) {
            res.json(blog);
        }
        else {
            res.status(404).json({ error: 'Blog post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve blog post' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content } = req.body;
    const db = yield (0, db_1.intializeDatabase)();
    try {
        const result = yield db.run('UPDATE blogs SET title = ?, content = ? WHERE id = ?', [title, content, id]);
        if (result.changes && result.changes > 0) {
            res.json({ title, content, id });
        }
        else {
            res.status(404).json({ error: "Blog post not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update blog post' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const db = yield (0, db_1.intializeDatabase)();
    try {
        const result = yield db.run('DELETE FROM blogs WHERE id = ?', [id]);
        if (result.changes && result.changes > 0) {
            res.json({ message: 'Blog post deleted' });
        }
        else {
            res.status(404).json({ error: 'Blog post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
}));
exports.default = router;
