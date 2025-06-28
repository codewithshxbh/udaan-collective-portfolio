"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, MapPin, Target, Heart, Lightbulb, Users, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TeamMember } from "@/components/team-member"
import { GlassCard } from "@/components/glass-card"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Completely different from homepage */}
      <section className="relative py-20 md:py-24 overflow-hidden app-about-hero">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Volunteers working together on a community development project" 
            fill 
            className="object-cover opacity-100"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-0"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl hero-heading"> 
              Our Story & Vision
            </h1>
            <p className="mt-6 text-xl text-gray-300 hero-subheading">
              Founded with purpose, driven by compassion, and committed to creating lasting change in communities that need it most.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-white/90" onClick={() => {
                // Smooth scroll to the team section
                const teamSection = document.querySelector('.app-about-team');
                if (teamSection) {
                  teamSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}>
                Meet Our Team
              </Button>
              <Link href="/initiatives#impact">
                <Button variant="outline" className="border-white bg-transparent hover:bg-white/20 text-white">
                  Impact Report
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Subtle geometric pattern background" 
            fill 
            className="object-cover opacity-5"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-white/80 to-white/70 z-0"></div>
        <div className="container relative z-10">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-white/30 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Group of volunteers building and supporting a local community initiative"
                width={720}
                height={405}
                className="object-cover w-full h-full"
              />
            </div>
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">Our Story</h2>
              <p className="text-foreground/80 mt-4">
                The Udaan Collective was founded with a clear purpose: to bridge the gap between resources and vulnerable communities. We began our journey in 8 by connecting local NGOs with volunteers and donors, creating a network of support for those most in need.
              </p>
              <p className="text-foreground/80 mt-4">
                Our name "Udaan" means "flight" in Hindi, symbolizing our commitment to lifting individuals and communities out of poverty and hardship through sustainable support systems and partnerships.
              </p>
              <p className="text-foreground/80 mt-4">
                Today, we've grown to support over 50 grassroots NGOs across India, focusing on education for underprivileged children, healthcare access for marginalized communities, sustainable livelihood programs, and emergency relief efforts.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline - New Section */}
      <section className="py-12 md:py-16 relative overflow-hidden bg-slate-50">
        <div className="container relative z-10">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 sm:text-4xl gradient-text">Our Journey</h2>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/30 before:via-primary before:to-primary/30">
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <span className="text-slate-900 font-bold">1</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-lg shadow-lg bg-white">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h3 className="font-bold text-xl">The Beginning</h3>
                  <time className="font-semibold text-primary">2018</time>
                </div>
                <p className="text-foreground/80">
                  Started as a small volunteer group with just 5 members, focusing on weekend education programs in a single community in Mumbai.
                </p>
              </div>
            </div>
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <span className="text-slate-900 font-bold">2</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-lg shadow-lg bg-white">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h3 className="font-bold text-xl">First NGO Partnership</h3>
                  <time className="font-semibold text-primary">2020</time>
                </div>
                <p className="text-foreground/80">
                  Established our first formal NGO partnership with Shiksha Foundation, expanding our educational initiatives to 5 communities.
                </p>
              </div>
            </div>
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <span className="text-slate-900 font-bold">3</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-lg shadow-lg bg-white">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h3 className="font-bold text-xl">National Expansion</h3>
                  <time className="font-semibold text-primary">2023</time>
                </div>
                <p className="text-foreground/80">
                  Expanded operations to 15 states across India, with a network of over 50 NGO partners and impacting more than 25,000 lives.
                </p>
              </div>
            </div>
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <span className="text-slate-900 font-bold">4</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-lg shadow-lg bg-white">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h3 className="font-bold text-xl">Today</h3>
                  <time className="font-semibold text-primary">2025</time>
                </div>
                <p className="text-foreground/80">
                  Currently implementing over 120 community development projects with a focus on sustainable impact and community self-reliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 relative">
        <div className="container relative z-10">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 sm:text-4xl gradient-text">
            Our Core Values
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <GlassCard className="p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Compassionate Action</h3>
              <p className="text-foreground/80">
                We believe in translating empathy into meaningful action that addresses the root causes of suffering and inequality.
              </p>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainable Impact</h3>
              <p className="text-foreground/80">
                We focus on creating self-sustaining solutions that empower communities to overcome challenges independently over time.
              </p>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">NGO Collaboration</h3>
              <p className="text-foreground/80">
                We amplify the impact of grassroots organizations by providing resources, training, and networks to strengthen their work.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* NGO Partners */}
      <section className="py-12 md:py-16 relative overflow-hidden bg-slate-50">
        <div className="container relative z-10">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 sm:text-4xl gradient-text">Our NGO Partners</h2>
          <p className="text-foreground/80 text-center max-w-3xl mx-auto mb-12">
            We're proud to work alongside these dedicated organizations making a difference in their communities.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold mb-2">Shiksha Foundation</h3>
              <p className="text-foreground/80 mb-4">
                Providing quality education and learning materials to children from underserved communities.
              </p>
              <Image
                src="https://images.unsplash.com/photo-1522661067900-ab829854a57f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80"
                alt="Children in a classroom learning with dedicated teachers"
                width={400}
                height={225}
                className="rounded-md w-full h-40 object-cover"
              />
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold mb-2">Arogya Health Trust</h3>
              <p className="text-foreground/80 mb-4">
                Bringing essential healthcare services to remote villages and urban slums.
              </p>
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80"
                alt="Mobile healthcare clinic providing medical care in a rural village"
                width={400}
                height={225}
                className="rounded-md w-full h-40 object-cover"
              />
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold mb-2">Parivartan</h3>
              <p className="text-foreground/80 mb-4">
                Empowering women through livelihood skills training and microfinance opportunities.
              </p>
              <Image
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80"
                alt="Women entrepreneurs learning new skills for economic independence"
                width={400}
                height={225}
                className="rounded-md w-full h-40 object-cover"
              />
            </GlassCard>
          </div>
          <div className="mt-10 text-center">
            <Link href="/initiatives" passHref>
              <Button className="flex gap-1 mx-auto gradient-bg hover:opacity-90 transition-opacity">
                View All Our Initiatives <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-16 relative overflow-hidden app-about-team">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Subtle pattern background" 
            fill 
            className="object-cover opacity-5"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/80 z-0"></div>
        <div className="container relative z-10">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 sm:text-4xl gradient-text">Our Team</h2>
          <p className="text-foreground/80 text-center max-w-3xl mx-auto mb-12">
            Meet the dedicated individuals who work tirelessly to connect resources with communities in need.
          </p>
          <div className="grid gap-8 sm:grid-cols-2">
            <GlassCard className="p-6">
              <h3 className="font-bold text-xl">Aditya Garg</h3>
              <p className="text-primary font-medium mb-3">CEO and Founder</p>
              <p className="text-foreground/70">
                With a passion for social impact, Aditya founded The Udaan Collective to bridge the gap between resources and vulnerable communities, creating sustainable solutions for lasting change.
              </p>
              <div className="flex space-x-3 mt-4">
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="font-bold text-xl">Shubhendu Chakrabarti</h3>
              <p className="text-primary font-medium mb-3">CTO</p>
              <p className="text-foreground/70">
                Shubhendu leads our technology initiatives, developing innovative digital solutions that enhance our ability to connect NGOs with resources and maximize our impact across communities.
              </p>
              <div className="flex space-x-3 mt-4">
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </div>
            </GlassCard>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/contact?section=careers" passHref>
              <Button className="flex gap-1 mx-auto gradient-bg hover:opacity-90 transition-opacity">
                Join Our Team <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-12 md:py-16 gradient-bg text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-4 sm:text-4xl">Support Our Mission</h2>
            <p className="text-xl mb-8">
              Whether you're an NGO seeking partnership, a volunteer ready to contribute, or a donor wanting to make a difference, join us in creating meaningful change for those who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" passHref>
                <Button variant="secondary" size="lg">
                  Partner With Us
                </Button>
              </Link>
              <Link href="/donate" passHref>
                <Button variant="outline" size="lg" className="bg-transparent border-white hover:bg-white/20">
                  Support Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

