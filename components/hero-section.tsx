import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Banner at top with buttons */}
      <div className="relative z-20 bg-gradient-to-r from-primary to-secondary py-3 px-4 flex flex-wrap justify-center items-center gap-3">
        <Sparkles className="h-5 w-5 text-white" />
        <span className="text-white font-medium text-sm md:text-base">Join our volunteer drive on May 5, 2025!</span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="h-8 bg-white/20 border-white/40 text-white hover:bg-white/30">
            Register
          </Button>
          <Button size="sm" className="h-8 bg-white text-primary hover:bg-white/90">
            Learn More
          </Button>
        </div>
      </div>

      {/* Hero image with text directly on it */}
      <div className="w-full h-[80vh] min-h-[600px] relative">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Volunteers helping people in need"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="container mx-auto h-full flex flex-col justify-center items-center text-center text-white relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 drop-shadow-lg text-gray-200 hero-heading">
            Empowering Every Child<br />To Reach Their Potential
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-10 drop-shadow-md text-gray-300 hero-subheading">
            The Udaan Collective believes in unlocking potential, building futures, and creating a world where every smile matters. Join us in transforming lives, one community at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/initiatives">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Our Initiatives <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/donate">
              <Button size="lg" variant="outline" className="border-white hover:bg-white/20">
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

