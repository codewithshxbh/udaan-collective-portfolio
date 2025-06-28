import mysql from 'mysql2/promise';

// Create a connection pool to MySQL with validation
export async function connectToMySQL() {
  try {
    // Direct MySQL credentials
    const host = 'localhost';
    const user = 'root';
    const password = 'Shubhendu@0205';  // Using your specific password
    const database = 'udaan_db';
    
    // Log the connection attempt with partial credentials for debugging
    console.log(`Attempting to connect to MySQL at ${host} with user ${user}`);
    console.log(`Using password: ${password ? 'YES' : 'NO'}`);
    
    const pool = mysql.createPool({
      host,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    
    // Test the connection
    const connection = await pool.getConnection();
    console.log('MySQL connection established successfully');
    connection.release();
    
    return pool;
  } catch (error) {
    console.error('MySQL connection error:', error);
    throw new Error(`Failed to connect to MySQL: ${(error as Error).message}`);
  }
}

// SQL queries for blog posts
export const blogPostsQueries = {
  getAllPosts: `
    SELECT * FROM blog_posts 
    ORDER BY publishedAt DESC
  `,
  
  getFeaturedPosts: `
    SELECT * FROM blog_posts 
    WHERE featured = 1 AND status = 'published'
    ORDER BY publishedAt DESC
  `,
  
  getPostsByCategory: `
    SELECT * FROM blog_posts 
    WHERE category = ? AND status = 'published'
    ORDER BY publishedAt DESC
  `,
  
  getPostById: `
    SELECT * FROM blog_posts 
    WHERE id = ?
  `,

  getPostBySlug: `
    SELECT * FROM blog_posts 
    WHERE slug = ?
  `,
  
  createPost: `
    INSERT INTO blog_posts (
      id, title, slug, excerpt, content, status, 
      featured, category, tags, author, authorRole, 
      publishedAt, imageUrl, readTime
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  
  updatePost: `
    UPDATE blog_posts 
    SET title = ?, slug = ?, excerpt = ?, content = ?, 
        status = ?, featured = ?, category = ?, tags = ?, 
        author = ?, authorRole = ?, publishedAt = ?, imageUrl = ?, 
        readTime = ?
    WHERE id = ?
  `,
  
  deletePost: `
    DELETE FROM blog_posts WHERE id = ?
  `
}

// MySQL setup script to initialize the database
export const setupDatabase = async () => {
  let pool;
  try {
    pool = await connectToMySQL();
    
    console.log('Creating blog_posts table if not exists');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        excerpt TEXT,
        content LONGTEXT,
        status ENUM('published', 'draft') DEFAULT 'draft',
        featured BOOLEAN DEFAULT FALSE,
        category VARCHAR(100),
        tags JSON,
        author VARCHAR(100),
        authorRole VARCHAR(100),
        publishedAt VARCHAR(100),
        imageUrl VARCHAR(255),
        readTime VARCHAR(50),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Blog posts table created or verified');
    
    console.log('Creating users table if not exists');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created or verified');
    
    // Check if admin user exists, if not create default admin
    console.log('Checking for default admin user');
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', ['admin']);
    if (Array.isArray(users) && users.length === 0) {
      console.log('Creating default admin user');
      // In production, use a proper password hashing library like bcrypt
      // This is simplified for demonstration
      await pool.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        ['admin', 'udaan@2025', 'admin']
      );
      console.log('Default admin user created');
    } else {
      console.log('Default admin user already exists');
    }
    
    return { success: true, message: 'Database setup complete' };
  } catch (error) {
    console.error('Database setup error:', error);
    return { 
      success: false, 
      message: `Database setup failed: ${(error as Error).message}`,
      error
    };
  } finally {
    if (pool) {
      try {
        await pool.end();
        console.log('Database connection closed');
      } catch (err) {
        console.error('Error closing database connection:', err);
      }
    }
  }
};