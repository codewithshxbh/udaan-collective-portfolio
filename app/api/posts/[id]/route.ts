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

// GET - Fetch a specific post by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Await params to properly handle dynamic route parameters in Next.js App Router
    const { id } = await params;
    console.log(`API: Attempting to fetch post with ID/slug: ${id}`);
    
    const pool = await connectToMySQL();
    
    // First try to find by ID
    console.log(`API: Trying to find post by ID: ${id}`);
    let [rows] = await pool.query(blogPostsQueries.getPostById, [id]);
    
    // If not found by ID, try finding by slug
    if (!Array.isArray(rows) || rows.length === 0) {
      console.log(`API: Post not found by ID, trying by slug: ${id}`);
      [rows] = await pool.query(blogPostsQueries.getPostBySlug, [id]);
    }
    
    if (!Array.isArray(rows) || rows.length === 0) {
      console.log(`API: Post not found with ID/slug: ${id}`);
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }
    
    const post = rows[0];
    
    // Parse tags from JSON string if it exists and is a string
    // Use the safe JSON parse function to handle invalid JSON
    const formattedPost = {
      ...post,
      // Handle tags - if it's a string, safely parse it; if it's already an array, use it; default to empty array
      tags: post.tags 
        ? (typeof post.tags === 'string' ? safeJSONParse(post.tags) : post.tags) 
        : [],
      // Convert 1/0 to true/false for featured
      featured: post.featured === 1,
      // Ensure status is always set (default to draft if missing)
      status: post.status || "draft"
    };
    
    console.log(`API: Successfully fetched post: ${id}`, { 
      id: formattedPost.id, 
      title: formattedPost.title, 
      status: formattedPost.status 
    });
    
    return NextResponse.json({ 
      success: true, 
      post: formattedPost 
    });
  } catch (error) {
    console.error('API Error fetching post:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch post', 
        error: (error as Error).message 
      },
      { status: 500 }
    );
  }
}

// PUT - Update a post
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Await params to properly handle dynamic route parameters
    const { id } = await params;
    const body = await request.json();
    const {
      title, slug, excerpt, content, status,
      featured, category, tags, author, authorRole,
      publishedAt, imageUrl
    } = body;
    
    // Calculate read time (simplified version)
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / wordsPerMinute)} min read`;
    
    const pool = await connectToMySQL();
    
    // Convert tags array to JSON string for MySQL
    // Ensure tags is an array before stringifying
    const tagsArray = Array.isArray(tags) ? tags : 
                     (typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : []);
    const tagsJson = JSON.stringify(tagsArray);
    
    await pool.query(blogPostsQueries.updatePost, [
      title, slug, excerpt, content, status,
      featured ? 1 : 0, category, tagsJson, author, authorRole,
      publishedAt, imageUrl, readTime, id
    ]);
    
    return NextResponse.json({ success: true, message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update post', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a post
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Await params to properly handle dynamic route parameters
    const { id } = await params;
    const pool = await connectToMySQL();
    
    await pool.query(blogPostsQueries.deletePost, [id]);
    
    return NextResponse.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete post', error: (error as Error).message },
      { status: 500 }
    );
  }
}