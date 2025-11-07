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


//Filter products by genre or return all products 
//search functionality
//if genre is specified Get all products from the database 
export async function getProducts(req, res) {

 try {
    const db = await getDBConnection();

    let query = 'SELECT * FROM products';
    let params = [];

    const { genre, search } = req.query;

    // WHERE clause will go here
    let whereConditions = [];

    // 1. Genre filter
    if (genre) {
      whereConditions.push('genre = ?');
      params.push(genre);
    }

    // 2. Search filter (title, artist, OR genre)
    if (search) {
      // LIKE with %wildcards% = partial match
      whereConditions.push(`(
        title LIKE ? OR
        artist LIKE ? OR
        genre LIKE ?
      )`);
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    // 3. Combine all WHERE conditions
    if (whereConditions.length > 0) {
      query += ' WHERE ' + whereConditions.join(' AND ');
    }

    console.log('Final SQL:', query);
    console.log('Params:', params);

    // 4. Run the magic query
    const products = await db.all(query, params);

    res.json(products);
    await db.close();

  } catch (err) {

    res.status(500).json({error: 'Failed to fetch products', details: err.message})

  }

}