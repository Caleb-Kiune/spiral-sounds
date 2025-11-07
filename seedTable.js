import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';
import { vinyl } from './data.js';

async function seedTable() {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });

  console.log('Connected to database. Ready to seed!');

  await db.exec('BEGIN TRANSACTION');

  try {
    for (const album of vinyl) {
      await db.run(`
        INSERT INTO products (title, artist, price, image, year, genre, stock)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        album.title,
        album.artist,
        album.price,
        album.image,
        album.year,
        album.genre,
        album.stock
      ]);
    }

    await db.exec('COMMIT');
    console.log('All 10 records inserted successfully!');

  } catch (err) {
    await db.exec('ROLLBACK');
    console.error('Error inserting data:', err.message);
    console.log('No changes were saved. Database is clean!');

  } finally {
    await db.close();
    console.log('Database connection closed.');
  }
}

seedTable();