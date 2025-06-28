import Link from "next/link"
import { ArrowLeft, CalendarIcon, Clock, Share2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GlassCard } from "@/components/glass-card"

// This would come from your CMS or database in a real application
const blogPosts = {
  "water-conservation-success": {
    title: "Water Conservation Project Transforms Rural Village",
    excerpt: "Our water conservation initiative in Rajpur has increased groundwater levels by 40% and transformed agricultural output.",
    content: `
      <p>The Udaan Collective's water conservation project in Rajpur village has shown remarkable results just 18 months after implementation. The initiative, which combined traditional water harvesting techniques with modern sustainable practices, has led to a 40% increase in groundwater levels and dramatically improved agricultural productivity in the region.</p>
      
      <h2>The Challenge</h2>
      <p>Rajpur, a village of 1,200 residents located in a drought-prone region, had been facing increasingly severe water scarcity. Declining rainfall patterns and over-extraction had depleted the water table significantly over the past decade. Most farmers could only grow a single crop annually, and drinking water had to be transported from neighboring areas during summer months.</p>
      
      <p>When we first assessed the situation in December 2023, we found:</p>
      <ul>
        <li>80% of traditional water bodies had fallen into disrepair</li>
        <li>Groundwater levels had dropped by nearly 100 feet in a decade</li>
        <li>Annual crop yields were down by 60% compared to 15 years ago</li>
        <li>More than 30% of the working population had migrated to cities for livelihood</li>
      </ul>
      
      <h2>Our Approach</h2>
      <p>The Udaan team worked closely with village leadership and water conservation experts to design a comprehensive solution:</p>
      
      <h3>1. Reviving Traditional Water Bodies</h3>
      <p>We rehabilitated five traditional ponds and water storage structures that had fallen into disrepair. These structures were deepened, desilted, and reinforced using both traditional knowledge and modern engineering techniques.</p>
      
      <h3>2. Implementing Rainwater Harvesting</h3>
      <p>With community participation, we constructed over 200 rainwater harvesting structures across the village, including rooftop systems for homes and public buildings. These systems now capture an estimated 15 million liters of rainwater annually.</p>
      
      <h3>3. Building Check Dams and Contour Trenches</h3>
      <p>Strategic placement of 12 check dams and extensive contour trenching has slowed water runoff, increased soil moisture, and enhanced groundwater recharge.</p>
      
      <h3>4. Community Training and Maintenance</h3>
      <p>Perhaps most importantly, we trained a team of 20 local "water champions" who now manage and maintain these systems. Regular community workshops ensure knowledge transfer and sustained commitment to water conservation.</p>
      
      <h2>The Results</h2>
      <p>The impact of these interventions has exceeded our expectations:</p>
      
      <ul>
        <li>Groundwater levels have risen by 40% compared to pre-project measurements</li>
        <li>85% of wells that had run dry now contain water year-round</li>
        <li>Farmers have been able to grow two crops annually instead of one</li>
        <li>Agricultural output has increased by approximately 65%</li>
        <li>15 families who had migrated have returned to the village</li>
        <li>The village has not required external water supply for the last 8 months</li>
      </ul>
      
      <p>Ramesh Patel, the village headman, shared: "We had almost given up hope as we watched our land turn barren and our children leave to find work in cities. The change we've seen is remarkable - not just in our wells and fields, but in the spirit of our community. People have hope again."</p>
      
      <h2>Looking Ahead</h2>
      <p>The success in Rajpur has created a replicable model for water conservation that integrates traditional wisdom with sustainable technology. Based on these results, The Udaan Collective has received funding to expand this approach to five more villages in the region, potentially impacting over 8,000 people.</p>
      
      <p>We're also developing a comprehensive guide and training program to share this approach with other NGOs and government agencies working in water-stressed regions.</p>
      
      <p>This project demonstrates that with community involvement, traditional knowledge, and strategic interventions, we can reverse environmental degradation and create sustainable livelihoods for rural communities.</p>
      
      <p>The Rajpur water conservation project was made possible through the generous support of the Asha Foundation and hundreds of individual donors who contributed to our water security initiative.</p>
    `,
    date: "April 2, 2025",
    author: "Arjun Kapoor",
    authorRole: "Founder & Executive Director",
    authorImageUrl: "/placeholder.svg?height=400&width=400",
    readTime: "5 min read",
    category: "Success Stories",
    imageUrl: "/placeholder.svg?height=720&width=1280",
    tags: ["Water Conservation", "Rural Development", "Sustainable Agriculture", "Community Engagement"],
    related: ["education-center-launch", "women-entrepreneurship", "volunteer-spotlight"]
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const post = blogPosts[slug as keyof typeof blogPosts]
  
  // If the post doesn't exist, you would normally redirect or show a 404 page
  // In a real app, you'd implement proper error handling
  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link href="/blog">
          <Button>Return to Blog</Button>
        </Link>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-bg-light z-0"></div>
        <div className="container relative z-10">
          <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img
                    src={post.authorImageUrl}
                    alt={post.author}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-foreground/60">{post.authorRole}</p>
                </div>
              </div>
              
              <Separator orientation="vertical" className="h-8" />
              
              <div className="flex items-center gap-2 text-foreground/60">
                <CalendarIcon className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              
              <Separator orientation="vertical" className="h-8" />
              
              <div className="flex items-center gap-2 text-foreground/60">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Image */}
      <section className="container -mt-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[21/9] rounded-xl overflow-hidden border border-white/30 shadow-lg">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Content */}
      <section className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-8">
            <div className="prose prose-lg max-w-none backdrop-blur-md bg-white/30 p-8 rounded-xl border border-white/30 shadow-lg">
              {/* Post content */}
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} key={tag}>
                  <Button variant="glass" size="sm">
                    #{tag}
                  </Button>
                </Link>
              ))}
            </div>
            
            {/* Share */}
            <div className="mt-8 flex items-center gap-4">
              <span className="font-medium">Share this post:</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Author Bio */}
            <GlassCard className="mt-12 p-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="h-20 w-20 rounded-full overflow-hidden shrink-0">
                  <img
                    src={post.authorImageUrl}
                    alt={post.author}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">About {post.author}</h3>
                  <p className="text-foreground/80 mb-4">
                    {post.authorRole} at The Udaan Collective with a passion for sustainable development and community empowerment. 
                    Has led numerous successful initiatives across rural India.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="glass" size="sm">
                      View Profile
                    </Button>
                    <Button variant="glass" size="sm">
                      All Posts
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-20">
              <GlassCard className="p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Related Posts</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-16 w-16 rounded overflow-hidden shrink-0">
                      <img
                        src="/placeholder.svg?height=400&width=400"
                        alt="Related post"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium line-clamp-2 hover:text-primary transition-colors">
                        <Link href="/blog/education-center-launch">
                          New Digital Learning Center Opens in Eastern Region
                        </Link>
                      </h4>
                      <p className="text-xs text-foreground/60 mt-1">March 25, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="h-16 w-16 rounded overflow-hidden shrink-0">
                      <img
                        src="/placeholder.svg?height=400&width=400"
                        alt="Related post"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium line-clamp-2 hover:text-primary transition-colors">
                        <Link href="/blog/women-entrepreneurship">
                          Women Entrepreneurs Network Celebrates First Anniversary
                        </Link>
                      </h4>
                      <p className="text-xs text-foreground/60 mt-1">March 8, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="h-16 w-16 rounded overflow-hidden shrink-0">
                      <img
                        src="/placeholder.svg?height=400&width=400"
                        alt="Related post"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium line-clamp-2 hover:text-primary transition-colors">
                        <Link href="/blog/volunteer-spotlight">
                          Volunteer Spotlight: Meet the Changemakers
                        </Link>
                      </h4>
                      <p className="text-xs text-foreground/60 mt-1">February 15, 2025</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  <Link href="/blog/category/success-stories" className="block hover:text-primary transition-colors">
                    Success Stories
                  </Link>
                  <Link href="/blog/category/initiatives" className="block hover:text-primary transition-colors">
                    Initiatives
                  </Link>
                  <Link href="/blog/category/healthcare" className="block hover:text-primary transition-colors">
                    Healthcare
                  </Link>
                  <Link href="/blog/category/livelihood" className="block hover:text-primary transition-colors">
                    Livelihood
                  </Link>
                  <Link href="/blog/category/announcements" className="block hover:text-primary transition-colors">
                    Announcements
                  </Link>
                  <Link href="/blog/category/community" className="block hover:text-primary transition-colors">
                    Community
                  </Link>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
      
      {/* More Posts */}
      <section className="py-12 md:py-16 container">
        <h2 className="text-2xl font-bold tracking-tighter mb-8 gradient-text">More Posts You Might Like</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img
                src="/placeholder.svg?height=720&width=1280"
                alt="Education center launch"
                className="object-cover w-full h-full transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                  Initiatives
                </span>
              </div>
              <Link href="/blog/education-center-launch">
                <h3 className="text-xl font-bold hover:text-primary transition-colors mb-2">
                  New Digital Learning Center Opens in Eastern Region
                </h3>
              </Link>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1 text-xs text-foreground/60">
                  <CalendarIcon className="h-3 w-3" />
                  <span>March 25, 2025</span>
                </div>
                <Link href="/blog/education-center-launch" passHref>
                  <Button variant="link" className="p-0 h-auto font-semibold text-primary text-sm">
                    Read more <ArrowLeft className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img
                src="/placeholder.svg?height=720&width=1280"
                alt="Women entrepreneurs network"
                className="object-cover w-full h-full transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                  Livelihood
                </span>
              </div>
              <Link href="/blog/women-entrepreneurship">
                <h3 className="text-xl font-bold hover:text-primary transition-colors mb-2">
                  Women Entrepreneurs Network Celebrates First Anniversary
                </h3>
              </Link>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1 text-xs text-foreground/60">
                  <CalendarIcon className="h-3 w-3" />
                  <span>March 8, 2025</span>
                </div>
                <Link href="/blog/women-entrepreneurship" passHref>
                  <Button variant="link" className="p-0 h-auto font-semibold text-primary text-sm">
                    Read more <ArrowLeft className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img
                src="/placeholder.svg?height=720&width=1280"
                alt="Volunteer spotlight"
                className="object-cover w-full h-full transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                  Community
                </span>
              </div>
              <Link href="/blog/volunteer-spotlight">
                <h3 className="text-xl font-bold hover:text-primary transition-colors mb-2">
                  Volunteer Spotlight: Meet the Changemakers
                </h3>
              </Link>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1 text-xs text-foreground/60">
                  <CalendarIcon className="h-3 w-3" />
                  <span>February 15, 2025</span>
                </div>
                <Link href="/blog/volunteer-spotlight" passHref>
                  <Button variant="link" className="p-0 h-auto font-semibold text-primary text-sm">
                    Read more <ArrowLeft className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}