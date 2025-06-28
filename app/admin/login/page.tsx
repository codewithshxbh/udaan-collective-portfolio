"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Call the authentication API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }
      
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard!",
      })
      
      // Redirect to the admin dashboard
      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      toast({
        title: "Login failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 overflow-hidden app-admin-hero">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Admin workspace with laptop and analytics dashboard" 
            className="object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-0"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">
              Admin Login
            </h1>
            <p className="mt-6 text-xl" style={{ color: 'white !important' }}>
              Access the Udaan Collective admin dashboard
            </p>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <section className="py-12 container">
        <Card className="max-w-md mx-auto backdrop-blur-md bg-white/30 border border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle>Administrator Login</CardTitle>
            <CardDescription>
              Please enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="backdrop-blur-sm bg-white/50 border-white/30"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="backdrop-blur-sm bg-white/50 border-white/30 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/" className="text-sm text-primary hover:underline">
              Back to Website
            </Link>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot Password?
            </Link>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}