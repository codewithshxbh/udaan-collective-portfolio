"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Image, Loader2, Save, Upload } from "lucide-react"
import { use } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { useAdminAuth } from "@/hooks/use-admin-auth"

// Sample categories for the dropdown
const categoryOptions = [
  "Success Stories",
  "Initiatives",
  "Healthcare",
  "Livelihood",
  "Announcements",
  "Community"
]

export default function PostEditorPage({ params }: { params?: { slug: string } }) {
  // Unwrap params using React.use()
  const unwrappedParams = params ? use(params) : { slug: undefined }
  const slug = unwrappedParams?.slug

  const router = useRouter()
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  // Initialize an empty form or load a post if editing
  const initialFormState = {
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    status: "draft",
    featured: false,
    category: categoryOptions[0],
    tags: "",
    author: "",
    authorRole: "",
    imageUrl: "/placeholder.svg?height=720&width=1280"
  }
  
  const [formData, setFormData] = useState(initialFormState)
  
  // If we have a slug in the URL params, load the post data for editing
  useEffect(() => {
    if (authLoading) return
    
    const fetchPost = async () => {
      if (slug && slug !== "new") {
        try {
          console.log(`Attempting to fetch post with ID/slug: ${slug}`);
          const response = await fetch(`/api/posts/${slug}`, {
            credentials: 'include'
          });
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error(`Failed to fetch post: ${response.status} ${response.statusText}`, errorData);
            throw new Error(`Failed to fetch post: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          console.log("Response data:", data);
          
          if (data.success && data.post) {
            // Format the post data
            setFormData({
              ...initialFormState, // Start with all default fields
              ...data.post, // Overwrite with post data from server
              // Ensure tags is a string for the form
              tags: Array.isArray(data.post.tags) ? data.post.tags.join(", ") : 
                    typeof data.post.tags === 'string' ? data.post.tags : "",
              // Ensure boolean values are properly set
              featured: Boolean(data.post.featured),
              // Preserve the post status whether it's draft or published
              status: data.post.status || "draft"
            });
            
            // Debug log for troubleshooting
            console.log("Loaded post data:", data.post);
          } else {
            console.error("Post data missing in response:", data);
            throw new Error('Post not found in response data');
          }
        } catch (error) {
          console.error("Error fetching post:", error);
          toast({
            title: "Post not found",
            description: "The post you are trying to edit does not exist.",
            variant: "destructive"
          });
          router.push("/admin/dashboard");
        }
      }
      
      setIsLoading(false);
    };
    
    fetchPost();
  }, [slug, authLoading, router, initialFormState])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }
  
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
    
    setFormData(prev => ({ ...prev, slug }))
  }
  
  const handleSubmit = async (e: React.FormEvent, saveAsDraft = false) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      // Generate ID from slug if this is a new post
      const postId = formData.id || formData.slug;
      
      if (!postId) {
        throw new Error('Post must have a valid slug');
      }
      
      // Format tags as array
      const tagsArray = typeof formData.tags === 'string' 
        ? formData.tags.split(',').map(t => t.trim()).filter(t => t)
        : formData.tags || [];
      
      // Prepare the post data
      const postData = {
        ...formData,
        id: postId,
        status: saveAsDraft ? "draft" : "published",
        tags: tagsArray,
        featured: Boolean(formData.featured),
        publishedAt: saveAsDraft 
          ? null 
          : formData.publishedAt || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      
      // Determine if this is a create or update operation
      const isNewPost = !slug || slug === "new";
      
      // Make API request
      const endpoint = isNewPost ? '/api/posts' : `/api/posts/${postId}`;
      const method = isNewPost ? 'POST' : 'PUT';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(postData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${isNewPost ? 'create' : 'update'} post`);
      }
      
      toast({
        title: saveAsDraft ? "Draft saved" : "Post published",
        description: saveAsDraft
          ? "Your post has been saved as a draft."
          : "Your post has been published successfully."
      });
      
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error",
        description: `There was an error saving your post: ${(error as Error).message}`,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  }
  
  // If loading or not authenticated, show loading state
  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading editor...</p>
        </div>
      </div>
    )
  }
  
  if (!isAuthenticated) {
    return null // useEffect will redirect
  }
  
  const isNewPost = !slug || slug === "new"
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Admin Header */}
      <header className="border-b border-white/30 bg-white/10 py-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="flex items-center text-primary hover:text-primary/80">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={(e) => handleSubmit(e, true)}
              disabled={isSaving}
              className="backdrop-blur-sm bg-white/20 border-white/30 hover:bg-white/30"
            >
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save as Draft
            </Button>
            <Button 
              onClick={(e) => handleSubmit(e, false)}
              disabled={isSaving}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              Publish
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold tracking-tighter mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {isNewPost ? "Create New Post" : "Edit Post"}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg p-6">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter post title"
                    className="backdrop-blur-sm bg-white/50 border-white/30"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={generateSlug}
                      className="text-xs"
                    >
                      Generate from title
                    </Button>
                  </div>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="post-url-slug"
                    className="backdrop-blur-sm bg-white/50 border-white/30"
                    required
                  />
                  <p className="text-xs text-foreground/60">
                    This will be used in the URL: https://udaancollective.org/blog/<span className="font-semibold">{formData.slug || "post-slug"}</span>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Post Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Brief summary of the post (displayed in listings)"
                    className="backdrop-blur-sm bg-white/50 border-white/30 h-24"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Post Content</Label>
                  <div className="border border-white/30 rounded-md overflow-hidden">
                    <div className="bg-white/20 backdrop-blur-sm p-2 border-b border-white/30 flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="font-bold">B</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="italic">I</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="underline">U</span>
                      </Button>
                      <span className="h-6 w-px bg-white/30 mx-1"></span>
                      <Button variant="ghost" size="sm" className="h-8 p-0 px-2">
                        H1
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 p-0 px-2">
                        H2
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 p-0 px-2">
                        H3
                      </Button>
                      <span className="h-6 w-px bg-white/30 mx-1"></span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                      </Button>
                      <span className="h-6 w-px bg-white/30 mx-1"></span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Image className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Write your post content here... HTML is supported."
                      className="backdrop-blur-sm bg-white/50 border-none rounded-none h-96"
                      required
                    />
                  </div>
                  <p className="text-xs text-foreground/60">
                    You can use HTML tags for formatting. For example: &lt;h2&gt;Heading&lt;/h2&gt;, &lt;p&gt;Paragraph&lt;/p&gt;, &lt;ul&gt;&lt;li&gt;List item&lt;/li&gt;&lt;/ul&gt;
                  </p>
                </div>
              </form>
            </Card>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Post Settings</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger className="backdrop-blur-sm bg-white/50 border-white/30">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="tag1, tag2, tag3"
                    className="backdrop-blur-sm bg-white/50 border-white/30"
                  />
                  <p className="text-xs text-foreground/60">
                    Separate tags with commas
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="featured">Featured Post</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                    />
                    <Label htmlFor="featured" className="cursor-pointer">
                      Show in featured section
                    </Label>
                  </div>
                  <p className="text-xs text-foreground/60">
                    Featured posts are displayed prominently on the blog homepage
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Post Status</Label>
                  <div className="flex items-center justify-between p-3 rounded-md bg-white/20 backdrop-blur-sm border border-white/30">
                    <div>
                      <div className="font-medium mb-1">
                        {formData.status === "published" ? "Published" : "Draft"}
                      </div>
                      <div className="text-xs text-foreground/60">
                        {formData.status === "published" 
                          ? "This post is visible to all users"
                          : "This post is only visible to admins"}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-foreground/60">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Author Information</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author Name</Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Enter author name"
                    className="backdrop-blur-sm bg-white/50 border-white/30"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="authorRole">Author Role</Label>
                  <Input
                    id="authorRole"
                    name="authorRole"
                    value={formData.authorRole}
                    onChange={handleInputChange}
                    placeholder="e.g. Founder & Executive Director"
                    className="backdrop-blur-sm bg-white/50 border-white/30"
                  />
                </div>
              </div>
            </Card>
            
            <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Featured Image</h2>
              
              <div className="space-y-4">
                <div className="aspect-video rounded-md overflow-hidden border border-white/30">
                  <img
                    src={formData.imageUrl || "/placeholder.svg"}
                    alt="Featured image"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <Button variant="outline" className="w-full backdrop-blur-sm bg-white/20 border-white/30 hover:bg-white/30">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="backdrop-blur-sm bg-white/50 border-white/30"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}