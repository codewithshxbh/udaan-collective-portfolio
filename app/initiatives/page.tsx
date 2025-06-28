import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InitiativesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Community service volunteers working with underprivileged" 
            fill 
            className="object-cover"
            priority={true}
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white drop-shadow-lg hero-heading">
              Our Initiatives
            </h1>
            <p className="mt-4 text-xl text-gray-300 drop-shadow-md hero-subheading">
              Discover the programs and projects that are creating lasting change in communities
            </p>
          </div>
        </div>
      </section>

      {/* Initiatives Tabs */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/placeholder.svg?height=1080&width=1920&text=hexagon-pattern" 
            alt="Hexagon pattern" 
            fill 
            className="object-cover opacity-5"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-white/70 z-0"></div>
        <div className="container relative z-10">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="backdrop-blur-md bg-white/30 border border-white/30">
                <TabsTrigger value="all">All Initiatives</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                <TabsTrigger value="livelihood">Livelihood</TabsTrigger>
                <TabsTrigger value="emergency">Emergency Relief</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Education Initiative */}
                <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                        alt="Education initiative - students using computers at a digital learning center"
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                        Education
                      </span>
                    </div>
                    <CardTitle className="mb-2">Digital Learning Centers</CardTitle>
                    <CardDescription className="text-foreground/70">
                      Establishing technology-enabled learning centers in underserved communities to provide quality
                      education and digital literacy.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href="/initiatives/digital-learning" passHref>
                      <Button 
                        variant="glass"
                        className="w-full"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* Healthcare Initiative */}
                <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                        alt="Healthcare initiative - mobile health clinic providing medical care"
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                        Healthcare
                      </span>
                    </div>
                    <CardTitle className="mb-2">Mobile Health Clinics</CardTitle>
                    <CardDescription className="text-foreground/70">
                      Bringing essential healthcare services to remote and underserved areas through fully equipped mobile
                      clinics.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href="/initiatives/mobile-clinics" passHref>
                      <Button 
                        variant="glass"
                        className="w-full"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* Livelihood Initiative */}
                <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                        alt="Livelihood initiative - women entrepreneurs working on textile products"
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                        Livelihood
                      </span>
                    </div>
                    <CardTitle className="mb-2">Women Entrepreneur Network</CardTitle>
                    <CardDescription className="text-foreground/70">
                      Supporting women entrepreneurs with training, mentorship, and microfinance to build sustainable
                      businesses.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href="/initiatives/women-entrepreneurs" passHref>
                      <Button 
                        variant="glass"
                        className="w-full"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* Emergency Relief Initiative */}
                <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src="https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                        alt="Emergency relief initiative - disaster response team delivering aid supplies"
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                        Emergency Relief
                      </span>
                    </div>
                    <CardTitle className="mb-2">Disaster Response Team</CardTitle>
                    <CardDescription className="text-foreground/70">
                      Providing immediate assistance and long-term recovery support to communities affected by natural
                      disasters.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href="/initiatives/disaster-response" passHref>
                      <Button 
                        variant="glass"
                        className="w-full"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* NGO Partnership Initiative */}
                <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                        alt="NGO partnership initiative - collaboration workshop with local organizations"
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                        Partnerships
                      </span>
                    </div>
                    <CardTitle className="mb-2">NGO Capacity Building</CardTitle>
                    <CardDescription className="text-foreground/70">
                      Strengthening local NGOs through training, resource sharing, and collaborative projects to enhance
                      their impact.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href="/initiatives/ngo-capacity" passHref>
                      <Button 
                        variant="glass"
                        className="w-full"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* Innovation Initiative */}
                <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src="https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                        alt="Innovation initiative - social innovation lab with community ideation session"
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                        Innovation
                      </span>
                    </div>
                    <CardTitle className="mb-2">Social Innovation Lab</CardTitle>
                    <CardDescription className="text-foreground/70">
                      Creating a space for communities to develop and implement innovative solutions to local challenges.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href="/initiatives/innovation-lab" passHref>
                      <Button 
                        variant="glass"
                        className="w-full"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Other tab contents would be similar but filtered by category */}
            <TabsContent value="education" className="space-y-8">
              {/* Education initiatives only */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                        alt="Education initiative - students using computers at a digital learning center"
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                        Education
                      </span>
                    </div>
                    <CardTitle className="mb-2">Digital Learning Centers</CardTitle>
                    <CardDescription className="text-foreground/70">
                      Establishing technology-enabled learning centers in underserved communities to provide quality
                      education and digital literacy.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href="/initiatives/digital-learning" passHref>
                      <Button 
                        variant="glass"
                        className="w-full"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                {/* Additional Education Initiative */}
                <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                        alt="Education initiative - children learning in outdoor classroom"
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                        Education
                      </span>
                    </div>
                    <CardTitle className="mb-2">Rural School Support</CardTitle>
                    <CardDescription className="text-foreground/70">
                      Providing learning materials, teacher training, and infrastructure support to schools in rural areas.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href="/initiatives/rural-schools" passHref>
                      <Button 
                        variant="glass"
                        className="w-full"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                {/* Another Education Initiative */}
                <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                        alt="Education initiative - scholarship student studying"
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                        Education
                      </span>
                    </div>
                    <CardTitle className="mb-2">Scholarship Program</CardTitle>
                    <CardDescription className="text-foreground/70">
                      Providing financial support to talented students from underprivileged backgrounds to pursue higher education.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href="/initiatives/scholarships" passHref>
                      <Button 
                        variant="glass"
                        className="w-full"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Similar structure for other tabs */}
          </Tabs>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-12 md:py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0"></div>
        <div className="container relative z-10">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 sm:text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Impact Stories
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="overflow-hidden backdrop-blur-md bg-white/30 border border-white/30 shadow-lg">
              <div className="aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1519817914152-22d216bb9170?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                  alt="Village transformation story - rural community with sustainable agriculture development"
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Village Transformation
                </h3>
                <p className="text-foreground/80 mb-4">
                  How our water conservation project transformed Rajpur village from water scarcity to agricultural
                  prosperity.
                </p>
                <Link href="/stories/village-transformation" passHref>
                  <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                    Read the full story <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="overflow-hidden backdrop-blur-md bg-white/30 border border-white/30 shadow-lg">
              <div className="aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                  alt="Education success story - teacher working with students in rural community school"
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  From Student to Teacher
                </h3>
                <p className="text-foreground/80 mb-4">
                  Meena's journey from a student in our education program to becoming a teacher and community leader.
                </p>
                <Link href="/stories/student-to-teacher" passHref>
                  <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                    Read the full story <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <Link href="/stories" passHref>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                View All Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/placeholder.svg?height=1080&width=1920&text=circle-pattern" 
            alt="Circle pattern" 
            fill 
            className="object-cover opacity-5"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-white/80 z-0"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center backdrop-blur-md bg-white/30 p-8 rounded-xl border border-white/30 shadow-lg">
            <h2 className="text-3xl font-bold tracking-tighter mb-4 sm:text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Support Our Initiatives
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              There are many ways to contribute to our mission and help create lasting change in communities.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <Link href="/volunteer" passHref>
                <Button
                  variant="glass"
                  className="w-full"
                >
                  Volunteer
                </Button>
              </Link>
              <Link href="/partner" passHref>
                <Button
                  variant="glass"
                  className="w-full"
                >
                  Partner With Us
                </Button>
              </Link>
              <Link href="/donate" passHref>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                  Donate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

