"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_1 = __importDefault(require("./routes/blog"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000'
}));
app.get('/', (req, res) => {
    res.send('Welcome to the Express Backend!');
});
// Use the blog routes for handling API requests related to blogs
app.use('/posts', blog_1.default);
// Start the server and handle any potential errors
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Failed to start server:', err.message);
});
