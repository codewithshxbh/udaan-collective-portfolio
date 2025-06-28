import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/dbSetup';

// This route initializes the database with direct MySQL connection
// It should be called once at application startup or manually to set up tables
export async function GET() {
  try {
    const result = await initializeDatabase();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Database initialized successfully with direct MySQL connection'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Database initialization failed',
        error: result.message,
        details: result.error
      }, { status: 500 });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({
      success: false,
      message: 'Error initializing database',
      error: errorMessage
    }, { status: 500 });
  }
}