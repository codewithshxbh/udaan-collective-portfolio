import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Heart, Lightbulb, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CardTitle } from "@/components/ui/card"
import { HeroSection } from "@/components/hero-section"
import { ImpactCounter } from "@/components/impact-counter"
import { TestimonialCard } from "@/components/testimonial-card"
import { GlassCard } from "@/components/glass-card"
import { MissionCarousel } from "@/components/mission-carousel"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Mission Section */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/placeholder.svg?height=1080&width=1920" 
            alt="Background pattern" 
            fill 
            className="object-cover opacity-10"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-white/60 z-0"></div>
        <div className="container relative z-10">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Mission</h2>
              <p className="text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                The Udaan Collective is dedicated to bridging the gap between resources and needs, connecting NGOs with
                volunteers, and creating sustainable solutions for communities in need.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-6">
                <Link href="/about" passHref>
                  <Button className="flex gap-1 gradient-bg hover:opacity-90 transition-opacity">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact" passHref>
                  <Button variant="outline" className="glass hover:bg-white/30">
                    Get Involved
                  </Button>
                </Link>
              </div>
            </GlassCard>
            
            {/* Replacing static image with carousel */}
            <MissionCarousel />
          </div>
        </div>
      </section>

      {/* Impact Counter Section */}
      <section className="py-12 relative">
        <div className="absolute inset-0 gradient-bg-light z-0"></div>
        <div className="container relative z-10">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 sm:text-4xl gradient-text">Our Impact</h2>
          <ImpactCounter />
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/placeholder.svg?height=1080&width=1920&text=geometric-pattern" 
            alt="Geometric pattern" 
            fill 
            className="object-cover opacity-5"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/70 z-0"></div>
        <div className="container relative z-10">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 sm:text-4xl gradient-text">
            Key Initiatives
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <GlassCard className="p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mb-2">Community Support</CardTitle>
              <p className="min-h-[100px] text-foreground/70">
                Providing essential resources, education, and healthcare support to underserved communities across the
                region.
              </p>
              <Link href="/initiatives/community" passHref>
                <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mb-2">NGO Partnerships</CardTitle>
              <p className="min-h-[100px] text-foreground/70">
                Creating strategic partnerships with NGOs to amplify impact and reach more people in need through
                collaborative efforts.
              </p>
              <Link href="/initiatives/partnerships" passHref>
                <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mb-2">Innovation Hub</CardTitle>
              <p className="min-h-[100px] text-foreground/70">
                Developing sustainable solutions to social challenges through technology, research, and community-driven
                innovation.
              </p>
              <Link href="/initiatives/innovation" passHref>
                <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 relative">
        <div className="absolute inset-0 gradient-bg-light z-0"></div>
        <div className="container relative z-10">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 sm:text-4xl gradient-text">
            Voices of Impact
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="The Udaan Collective transformed our small community initiative into a sustainable program that now serves hundreds of families."
              author="Priya Sharma"
              role="Community Leader"
              imageSrc="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
            />
            <TestimonialCard
              quote="As an NGO partner, we've been able to extend our reach and improve our programs thanks to Udaan's strategic support and resources."
              author="Rajiv Mehta"
              role="NGO Director"
              imageSrc="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
            />
            <TestimonialCard
              quote="The innovation workshops hosted by Udaan helped us develop a solution that addresses water scarcity in our village."
              author="Ananya Patel"
              role="Village Representative"
              imageSrc="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

