import { getDBConnection } from '../db/db.js'

export async function getGenres(req, res) {
  // Retrieve the list of distinct genres from the products table.

  try {
    // Get the database connection.
    const db = await getDBConnection()

    // Retrieve the list of distinct genres.
    const genreRows = await db.all('SELECT DISTINCT genre FROM products')

    // Map the results to an array of genre strings.
    const genres = genreRows.map(row => row.genre)

    // Send the response with the list of genres.
    res.status(200).json(genres)

    // Close the database connection.
    await db.close()

  } catch (err) {
    // Send an error response if any errors occur.
    res.status(500).json({error: 'Failed to fetch genres', details: err.message})

  }
}

export async function getProducts() {

  console.log('products')

}