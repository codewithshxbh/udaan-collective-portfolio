import { NextResponse } from 'next/server';

export async function GET() {
  // Create a response
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  });
  
  // Clear the authentication cookie
  response.cookies.set({
    name: 'auth_token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0 // Immediately expires the cookie
  });
  
  return response;
}