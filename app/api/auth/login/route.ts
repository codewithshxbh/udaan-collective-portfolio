import { NextResponse } from 'next/server';
import { connectToMySQL } from '@/lib/db';
import { sign } from 'jsonwebtoken';

// In a production app, use proper password hashing
// and secure authentication with a library like NextAuth

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    const pool = await connectToMySQL();
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );
    
    const user = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid username or password' },
        { status: 401 }
      );
    }
    
    // Create a JWT token (in production use a proper .env secret)
    const token = sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    // Set HTTP-only cookie with the token
    // This is more secure than storing in localStorage
    const response = NextResponse.json({
      success: true,
      user: {
        username: user.username,
        role: user.role
      }
    });
    
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400 // 24 hours
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication failed', error: (error as Error).message },
      { status: 500 }
    );
  }
}