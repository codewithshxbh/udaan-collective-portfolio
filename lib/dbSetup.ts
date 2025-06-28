import { setupDatabase } from './db';

export async function initializeDatabase() {
  try {
    console.log('Setting up database with direct MySQL connection...');
    const result = await setupDatabase();
    
    if (result.success) {
      console.log('Database setup completed successfully');
      console.log('- Blog posts table initialized');
      console.log('- Users table initialized');
      console.log('- Default admin user created (if it didn\'t exist already)');
    } else {
      console.error('Database setup failed:', result.message);
      console.error('Error details:', result.error);
    }
    
    return result;
  } catch (error) {
    console.error('Database initialization error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, message: 'Database initialization error', error: errorMessage };
  }
}