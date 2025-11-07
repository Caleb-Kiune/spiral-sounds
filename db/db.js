import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

// This is a helper function that gives us a fresh DB connection every time.
// Because we dont want to keep one connection always open — bad for performance!
// It is being used by the function in controllers/productsControllers.js

export async function getDBConnection() {

const dbPath = path.join('database.db')

 return open({
   filename: dbPath,
   driver: sqlite3.Database
 }) 

} 
