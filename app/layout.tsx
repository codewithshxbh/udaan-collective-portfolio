import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, Menu, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeProvider } from "@/components/theme-provider"
import DatabaseInitializer from "@/components/database-initializer"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Udaan Collective - NGO Connecting Resources with Communities",
  description: "The Udaan Collective bridges the gap between resources and vulnerable communities, focusing on education, healthcare, and sustainable development across India.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Database initializer component */}
          <DatabaseInitializer />
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full glass border-b border-white/30 backdrop-blur-md shadow-sm">
              <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link href="/" className="flex items-center space-x-2 group">
                    <span className="text-xl font-bold gradient-text transition-all duration-300 group-hover:scale-105">
                      The Udaan Collective
                    </span>
                  </Link>
                </div>
                <nav className="hidden md:flex gap-8">
                  <Link href="/" className="text-sm font-medium text-black relative group py-1">
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Home</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link href="/about" className="text-sm font-medium text-black relative group py-1">
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">About</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link href="/initiatives" className="text-sm font-medium text-black relative group py-1">
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Initiatives</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link href="/blog" className="text-sm font-medium text-black relative group py-1">
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Blog</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link href="/contact" className="text-sm font-medium text-black relative group py-1">
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Contact</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </nav>
                <div className="flex items-center gap-4">
                  <Link href="/donate" className="hidden md:block">
                    <Button className="gradient-bg hover:opacity-90 transition-all duration-300 text-white shadow-md hover:shadow-lg hover:scale-105">Donate</Button>
                  </Link>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="md:hidden glass text-black hover:bg-white/30 transition-colors duration-300">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="glass backdrop-blur-md border-l border-white/30">
                      <div className="flex flex-col h-full">
                        <div className="py-6">
                          <h2 className="text-xl font-bold gradient-text mb-6">The Udaan Collective</h2>
                          <nav className="grid gap-6 text-lg font-medium">
                            <Link href="/" className="text-black hover:text-primary transition-colors duration-300 flex items-center">
                              <span>Home</span>
                            </Link>
                            <Link href="/about" className="text-black hover:text-primary transition-colors duration-300 flex items-center">
                              <span>About</span>
                            </Link>
                            <Link href="/initiatives" className="text-black hover:text-primary transition-colors duration-300 flex items-center">
                              <span>Initiatives</span>
                            </Link>
                            <Link href="/blog" className="text-black hover:text-primary transition-colors duration-300 flex items-center">
                              <span>Blog</span>
                            </Link>
                            <Link href="/contact" className="text-black hover:text-primary transition-colors duration-300 flex items-center">
                              <span>Contact</span>
                            </Link>
                            <div className="pt-4 mt-2 border-t border-white/20">
                              <Link href="/donate">
                                <Button className="w-full gradient-bg hover:opacity-90 transition-all duration-300 text-white shadow-md">Donate</Button>
                              </Link>
                            </div>
                          </nav>
                        </div>
                        <div className="mt-auto pb-8">
                          <div className="flex justify-center space-x-4">
                            <Link href="#" className="text-black hover:text-primary transition-colors duration-300">
                              <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-black hover:text-primary transition-colors duration-300">
                              <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-black hover:text-primary transition-colors duration-300">
                              <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-black hover:text-primary transition-colors duration-300">
                              <Linkedin className="h-5 w-5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t border-white/30 bg-black">
              <div className="container py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold gradient-text">The Udaan Collective</h3>
                    <p className="text-sm text-white">
                      Empowering communities and creating sustainable change since 2018.
                    </p>
                    <div className="flex space-x-4">
                      <Link href="#" className="text-white hover:text-primary">
                        <Facebook className="h-5 w-5" />
                        <span className="sr-only">Facebook</span>
                      </Link>
                      <Link href="#" className="text-white hover:text-primary">
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                      </Link>
                      <Link href="#" className="text-black hover:text-primary">
                        <Instagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                      </Link>
                      <Link href="#" className="text-black hover:text-primary">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-black">Quick Links</h3>
                    <nav className="grid gap-2 text-sm">
                      <Link href="/about" className="text-black hover:text-primary">
                        About Us
                      </Link>
                      <Link href="/initiatives" className="text-black hover:text-primary">
                        Our Initiatives
                      </Link>
                      <Link href="/team" className="text-black hover:text-primary">
                        Our Team
                      </Link>
                      <Link href="/blog" className="text-black hover:text-primary">
                        Blog
                      </Link>
                      <Link href="/contact" className="text-black hover:text-primary">
                        Contact
                      </Link>
                    </nav>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-black">Get Involved</h3>
                    <nav className="grid gap-2 text-sm">
                      <Link href="/volunteer" className="text-black hover:text-primary">
                        Volunteer
                      </Link>
                      <Link href="/partner" className="text-black hover:text-primary">
                        Partner With Us
                      </Link>
                      <Link href="/donate" className="text-black hover:text-primary">
                        Donate
                      </Link>
                      <Link href="/careers" className="text-black hover:text-primary">
                        Careers
                      </Link>
                    </nav>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-black">Contact Us</h3>
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 mt-1 text-black" />
                        <a href="mailto:info@udaancollective.org" className="text-black hover:text-primary">
                          info@udaancollective.org
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-black">
                  <p>© 2024 The Udaan Collective. All rights reserved.</p>
                  <span className="inline-block mt-2">
                    <Link href="/admin/login" className="text-black/30 hover:text-black/70 text-[10px]">Admin</Link>
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

