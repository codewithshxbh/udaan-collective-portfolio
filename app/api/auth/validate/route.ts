import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    // Get the auth token from the cookies
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map(cookie => {
        const [name, value] = cookie.split('=');
        return [name, value];
      })
    );

    const token = cookies.auth_token;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    return NextResponse.json({
      success: true,
      user: {
        username: (decoded as any).username,
        role: (decoded as any).role
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid or expired token' },
      { status: 401 }
    );
  }
}