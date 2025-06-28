"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Edit, FileText, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { useAdminAuth } from "@/hooks/use-admin-auth"

export default function AdminDashboardPage() {
  const { isAuthenticated, isLoading, logout } = useAdminAuth();
  const [blogPosts, setBlogPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [fetchLoading, setFetchLoading] = useState(true);
  
  // Load blog posts from API
  useEffect(() => {
    if (isAuthenticated) {
      const fetchPosts = async () => {
        try {
          const response = await fetch('/api/posts', {
            credentials: 'include' // Add credentials to the request
          });
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("API error details:", errorData);
            throw new Error(`Failed to fetch posts: ${errorData.message || response.statusText}`);
          }
          
          const data = await response.json();
          setBlogPosts(data.posts || []);
        } catch (error) {
          console.error("Error loading blog posts:", error);
          toast({
            title: "Error",
            description: "Failed to load blog posts. Please try again.",
            variant: "destructive"
          });
        } finally {
          setFetchLoading(false);
        }
      };
      
      fetchPosts();
    }
  }, [isAuthenticated]);
  
  const filteredPosts = activeTab === "all" 
    ? blogPosts 
    : blogPosts.filter((post: any) => post.status === activeTab);
  
  const handleDeletePost = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete post');
        }
        
        // Update state after successful deletion
        setBlogPosts(prevPosts => prevPosts.filter((post: any) => post.id !== id));
        
        toast({
          title: "Post deleted",
          description: "The blog post has been successfully deleted.",
        });
      } catch (error) {
        console.error("Error deleting post:", error);
        toast({
          title: "Error",
          description: "Failed to delete the post. Please try again.",
          variant: "destructive"
        });
      }
    }
  }
  
  // If loading or not authenticated, show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }
  
  if (!isAuthenticated) {
    return null // useEffect will redirect
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Admin Header */}
      <header className="admin-specific-header border-b border-white/30 bg-white/10 py-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Udaan Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="backdrop-blur-sm bg-white/20 border-white/30 hover:bg-white/30">
                View Website
              </Button>
            </Link>
            <Link href="/admin/posts/new">
              <Button variant="outline" size="sm" className="backdrop-blur-sm bg-white/20 border-white/30 hover:bg-white/30">
                New Post
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={logout} className="backdrop-blur-sm bg-white/20 border-white/30 hover:bg-white/30">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden app-admin-dashboard-hero">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Admin dashboard background showing analytics and management tools" 
            className="object-cover w-full h-full opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-0"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white hero-heading">
              Welcome to your Admin Panel
            </h1>
            <p className="mt-6 text-xl text-gray-300 hero-subheading">
              Manage your website content, blog posts, and impact data from this centralized dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter gradient-text">Blog Management</h2>
          <Link href="/admin/posts/new">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Button>
          </Link>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Button 
            variant={activeTab === "all" ? "default" : "outline"} 
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90" : "backdrop-blur-sm bg-white/20 border-white/30 hover:bg-white/30"}
          >
            All Posts
          </Button>
          <Button 
            variant={activeTab === "published" ? "default" : "outline"} 
            onClick={() => setActiveTab("published")}
            className={activeTab === "published" ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90" : "backdrop-blur-sm bg-white/20 border-white/30 hover:bg-white/30"}
          >
            Published
          </Button>
          <Button 
            variant={activeTab === "draft" ? "default" : "outline"} 
            onClick={() => setActiveTab("draft")}
            className={activeTab === "draft" ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90" : "backdrop-blur-sm bg-white/20 border-white/30 hover:bg-white/30"}
          >
            Drafts
          </Button>
        </div>
        
        {/* Blog Posts Table */}
        <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>Manage your blog content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Author</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="border-b border-white/10 hover:bg-white/10">
                      <td className="py-3 px-4">
                        <div className="font-medium">{post.title}</div>
                        <div className="text-xs text-foreground/60">ID: {post.id}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.status === "published" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{post.category}</td>
                      <td className="py-3 px-4">{post.publishedAt}</td>
                      <td className="py-3 px-4">{post.author}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/blog/${post.id}`} target="_blank">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </Link>
                          <Link href={`/admin/posts/${post.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeletePost(post.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredPosts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-foreground/60">
                        No posts found. Create your first post by clicking the "New Post" button.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}