import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// This endpoint tests the MySQL connection directly
export async function GET() {
  try {
    // Direct MySQL connection details
    const host = 'localhost';
    const user = 'root';
    const password = 'Shubhendu@0205';  // Add your password if needed
    const database = 'udaan_db';
    
    console.log(`Testing direct MySQL connection to ${host} as ${user}, database: ${database}`);
    
    // Try to create a direct connection
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database
    });
    
    // Test the connection with a simple query
    const [result] = await connection.query('SELECT 1 + 1 AS solution');
    await connection.end();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      details: {
        host,
        user,
        database,
        connectionTest: 'Passed',
        result
      }
    });
  } catch (error) {
    console.error('Database test connection error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: (error as Error).message,
      details: {
        host: 'localhost',
        user: 'root',
        database: 'udaan_db',
        passwordProvided: true,
        errorCode: (error as any).code,
        errorNumber: (error as any).errno,
        sqlState: (error as any).sqlState
      }
    }, { status: 500 });
  }
}