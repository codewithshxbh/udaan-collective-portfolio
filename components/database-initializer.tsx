'use client'

import { useEffect, useState } from 'react'

/**
 * A component that initializes the database when the application starts.
 * This is a client component that makes a request to the database initialization API.
 */
export default function DatabaseInitializer() {
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only run in the browser environment, not during build or SSR
    if (typeof window !== 'undefined') {
      // Only run once when the app loads
      const initDb = async () => {
        try {
          // Call the API route that initializes the database
          const response = await fetch('/api/init-db')
          const data = await response.json()
          
          if (data.success) {
            console.log('Database initialized successfully')
            setInitialized(true)
          } else {
            console.error('Database initialization failed:', data.message)
            setError(data.message)
          }
        } catch (error) {
          console.error('Error initializing database:', error)
          setError('Failed to initialize database')
        }
      }

      initDb()
    }
  }, [])

  // This component doesn't render anything visible
  return null
}