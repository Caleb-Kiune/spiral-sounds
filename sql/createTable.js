import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

async function createTable() {
   
    const db = await open({
        filename: path.join('./database.db'),
        driver: sqlite3.Database
    })

    console.log('Connected to database')

  
    await db.exec(`
        CREATE TABLE IF NOT EXISTS products(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            artist TEXT NOT NULL,
            price REAL NOT NULL,
            image TEXT NOT NULL,
            year INTEGER,
            genre TEXT,
            stock INTEGER
        )
    `)
    console.log('Products table created')

   
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE NOT NULL,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `)
    console.log('Users table created')

   
    await db.close()
    console.log('Database connection closed')
}

createTable()
