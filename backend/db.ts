import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import {Blog} from './types/blog'

export const intializeDatabase = async () => {
    const db = await open({
        filename: './blog.db',
        driver: sqlite3.Database,
    })
    await db.exec(`CREATE TABLE IF NOT EXIST blogs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`)

    return db
}

