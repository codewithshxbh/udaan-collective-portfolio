import { NextResponse } from 'next/server';
import { connectToMySQL, blogPostsQueries } from '@/lib/db';

// Safe JSON parse function to handle invalid JSON
function safeJSONParse(str: string | null | undefined) {
  try {
    // Check if string is empty, null, or undefined
    if (!str) {
      return []; // Return empty array for empty/null values
    }
    
    // Make sure str is a string before using string methods
    if (typeof str !== 'string') {
      return []; // Return empty array for non-string values
    }
    
    if (str.trim() === '') {
      return []; // Return empty array for empty strings
    }
    
    return JSON.parse(str);
  } catch (e) {
    console.error(`Error parsing JSON: "${str}"`, e);
    return []; // Return empty array as fallback
  }
}

// GET - Fetch all posts
export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const featured = url.searchParams.get('featured');
  
  let pool;
  try {
    pool = await connectToMySQL();
    let posts;
    let query;
    
    // Log which query we're executing for debugging
    if (category && category !== 'all') {
      console.log(`Fetching posts by category: ${category}`);
      query = blogPostsQueries.getPostsByCategory;
      const [rows] = await pool.query(query, [category]);
      posts = rows;
    } else if (featured === 'true') {
      console.log('Fetching featured posts');
      query = blogPostsQueries.getFeaturedPosts;
      const [rows] = await pool.query(query);
      posts = rows;
    } else {
      console.log('Fetching all posts');
      query = blogPostsQueries.getAllPosts;
      const [rows] = await pool.query(query);
      posts = rows;
    }
    
    console.log(`Found ${Array.isArray(posts) ? posts.length : 0} posts`);
    
    // Parse tags from JSON string to array with safe parsing
    const formattedPosts = Array.isArray(posts) ? posts.map((post: any) => {
      // Use safe JSON parse function
      const parsedTags = post.tags ? safeJSONParse(post.tags) : [];
      
      return {
        ...post,
        tags: Array.isArray(parsedTags) ? parsedTags : [], // Ensure tags is always an array
        featured: post.featured === 1 // Convert 1/0 to true/false
      };
    }) : [];
    
    return NextResponse.json({ success: true, posts: formattedPosts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch posts', error: (error as Error).message },
      { status: 500 }
    );
  } finally {
    if (pool) {
      try {
        await pool.end();
      } catch (err) {
        console.error('Error closing database connection:', err);
      }
    }
  }
}

// POST - Create a new post
export async function POST(request: Request) {
  let pool;
  try {
    const body = await request.json();
    const {
      id, title, slug, excerpt, content, status,
      featured, category, tags, author, authorRole,
      publishedAt, imageUrl
    } = body;
    
    // Calculate read time (simplified version)
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / wordsPerMinute)} min read`;
    
    pool = await connectToMySQL();
    
    // Convert tags array to JSON string for MySQL
    // Ensure tags is an array before stringifying
    const tagsArray = Array.isArray(tags) ? tags : 
                     (typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : []);
    const tagsJson = JSON.stringify(tagsArray);
    
    await pool.query(blogPostsQueries.createPost, [
      id, title, slug, excerpt, content, status,
      featured ? 1 : 0, category, tagsJson, author, authorRole,
      publishedAt, imageUrl, readTime
    ]);
    
    return NextResponse.json({ success: true, message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create post', error: (error as Error).message },
      { status: 500 }
    );
  } finally {
    if (pool) {
      try {
        await pool.end();
      } catch (err) {
        console.error('Error closing database connection:', err);
      }
    }
  }
}