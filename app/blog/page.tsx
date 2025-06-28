"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CalendarIcon, Clock, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription } from "@/components/ui/card"

// Empty default array instead of sample posts
const defaultBlogPosts = [];

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState(defaultBlogPosts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePostCount, setVisiblePostCount] = useState(6);
  const [error, setError] = useState(null);
  
  // In a real app, this would fetch from your API
  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get posts from the API
        const response = await fetch('/api/posts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        
        if (data.success && Array.isArray(data.posts)) {
          setBlogPosts(data.posts);
        } else {
          // Set empty array if API returns no data
          setBlogPosts([]);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError(error.message);
        setBlogPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  // Filter posts by category if selected
  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category?.toLowerCase().replace(/\s+/g, '-') === selectedCategory);
  
  // Separate featured posts
  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleLoadMore = () => {
    setVisiblePostCount((prevCount) => prevCount + 6);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Light-toned image of volunteers in a circle with hands together showing unity" 
            fill 
            className="object-cover"
            priority={true}
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-slate-800 drop-shadow-sm hero-heading">
              Our Blog
            </h1>
            <p className="mt-4 text-xl drop-shadow-sm hero-subheading">
              Updates, stories, and insights from The Udaan Collective
            </p>
          </div>
        </div>
      </section>

      {/* API Error Message (if any) */}
      {error && (
        <div className="container py-4">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p className="font-bold">Error</p>
            <p>Unable to load blog posts at this time. Please try again later.</p>
          </div>
        </div>
      )}

      {/* Featured Posts */}
      {featuredPosts?.length > 0 && (
        <section className="py-12 md:py-16 container">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 gradient-text">Featured Stories</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <h3 className="text-2xl font-bold hover:text-primary transition-colors mb-2">{post.title}</h3>
                  </Link>
                  <CardDescription className="text-foreground/70 mb-4">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                      <span>•</span>
                      <CalendarIcon className="h-4 w-4" />
                      <span>{post.date}</span>
                      <span>•</span>
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <Link href={`/blog/${post.id}`} passHref>
                      <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                        Read more <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section className="py-12 md:py-16 container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter gradient-text">Latest Updates</h2>
          
          {blogPosts.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  className="appearance-none rounded-lg border border-slate-600/50 bg-slate-800/40 backdrop-blur-sm py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="all">All Categories</option>
                  <option value="success-stories">Success Stories</option>
                  <option value="initiatives">Initiatives</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="livelihood">Livelihood</option>
                  <option value="announcements">Announcements</option>
                  <option value="community">Community</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground/70">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading blog posts...</p>
          </div>
        ) : regularPosts?.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {regularPosts.slice(0, visiblePostCount).map((post) => (
              <Card key={post.id} className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg overflow-hidden flex flex-col">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <h3 className="text-xl font-bold hover:text-primary transition-colors mb-2">{post.title}</h3>
                  </Link>
                  <CardDescription className="text-foreground/70 mb-4 flex-1">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1 text-xs text-foreground/60">
                      <CalendarIcon className="h-3 w-3" />
                      <span>{post.date}</span>
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                    <Link href={`/blog/${post.id}`} passHref>
                      <Button variant="link" className="p-0 h-auto font-semibold text-primary text-sm">
                        Read more <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPosts?.length === 0 && selectedCategory !== "all" && !error ? (
          <div className="text-center py-12 backdrop-blur-md bg-white/30 p-8 rounded-xl border border-white/30 shadow-lg">
            <p className="text-foreground/70 mb-4">No posts found in this category.</p>
            <Button 
              onClick={() => setSelectedCategory("all")}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              View All Posts
            </Button>
          </div>
        ) : !error ? (
          <div className="text-center py-12 backdrop-blur-md bg-white/30 p-8 rounded-xl border border-white/30 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">No Blog Posts Yet</h3>
            <p className="text-foreground/70 mb-6">
              There are currently no blog posts available. Check back soon for updates.
            </p>
          </div>
        ) : (
          <div className="text-center py-12 backdrop-blur-md bg-white/30 p-8 rounded-xl border border-white/30 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Unable to Load Blog</h3>
            <p className="text-foreground/70 mb-6">
              We're experiencing technical difficulties. Please try again later.
            </p>
          </div>
        )}
        
        {(regularPosts?.length || 0) > visiblePostCount && (
          <div className="mt-12 flex justify-center">
            <Button variant="glass" onClick={handleLoadMore}>
              Load More
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}