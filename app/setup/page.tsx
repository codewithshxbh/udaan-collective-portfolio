'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { clientEnv } from '@/lib/client-env'

/**
 * A simple page to manually initialize the database
 * This is a safer approach than auto-initialization at startup
 */
export default function SetupPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const initializeDatabase = async () => {
    try {
      setStatus('loading')
      setMessage('Initializing database...')
      
      const response = await fetch('/api/init-db', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStatus('success')
        setMessage('Database initialized successfully!')
      } else {
        setStatus('error')
        setMessage(`Error: ${data.message || 'Unknown error'}`)
        console.error('Database initialization error:', data)
      }
    } catch (error) {
      setStatus('error')
      setMessage(`Failed to initialize database: ${error instanceof Error ? error.message : String(error)}`)
      console.error('Error:', error)
    }
  }

  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Udaan Collective Database Setup</h1>
        
        <div className="space-y-6">
          <div className="text-center">
            {status === 'idle' && (
              <p className="mb-4 text-gray-600">
                Click the button below to initialize the database for the Udaan Collective website.
              </p>
            )}
            
            {status === 'loading' && (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">{message}</p>
              </div>
            )}
            
            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                <p className="text-green-700">{message}</p>
              </div>
            )}
            
            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <p className="text-red-700">{message}</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-4">
            <Button
              onClick={initializeDatabase}
              disabled={status === 'loading'}
              className="w-full"
            >
              {status === 'loading' ? 'Initializing...' : 'Initialize Database'}
            </Button>
            
            <div className="text-center pt-4">
              <Link href="/" className="text-primary hover:underline">
                Return to Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}