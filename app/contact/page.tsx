"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "general",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log(formData)
    toast({
      title: "Form submitted",
      description: "Thank you for reaching out. We'll get back to you soon!",
    })
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiryType: "general",
      subject: "",
      message: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }))
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Volunteers helping people in need" 
            fill 
            className="object-cover"
            priority={true}
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white drop-shadow-lg hero-heading">
              Contact Us
            </h1>
            <p className="mt-4 text-xl text-gray-300 drop-shadow-md hero-subheading">
              Have questions or want to get involved? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/placeholder.svg?height=1080&width=1920&text=wave-pattern" 
            alt="Wave pattern" 
            fill 
            className="object-cover opacity-5"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/70 z-0"></div>
        <div className="container relative z-10">
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Our Location</h3>
                <p className="text-foreground/80">
                  123 Social Impact Avenue
                  <br />
                  New Delhi, 110001
                  <br />
                  India
                </p>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-foreground/80 mb-2">General Inquiries:</p>
                <a href="mailto:info@udaancollective.org" className="text-primary hover:underline">
                  info@udaancollective.org
                </a>
                <p className="text-foreground/80 mt-2 mb-2">Partnerships:</p>
                <a href="mailto:partnerships@udaancollective.org" className="text-primary hover:underline">
                  partnerships@udaancollective.org
                </a>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-foreground/80 mb-2">Office Hours: 9 AM - 6 PM (IST)</p>
                <a href="tel:+911234567890" className="text-primary hover:underline">
                  +91 123 456 7890
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-xl border border-white/30 shadow-lg">
              <h2 className="text-3xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Get in Touch
              </h2>
              <p className="text-foreground/80 mb-6">
                Whether you're interested in volunteering, partnering with us, or simply have a question, we're here to
                help. Fill out the form and we'll get back to you as soon as possible.
              </p>
              <div className="aspect-video overflow-hidden rounded-xl border border-white/30">
                <img
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                  alt="Dedicated team members at Udaan Collective discussing community initiatives"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-xl border border-white/30 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="backdrop-blur-sm bg-white/50 border-white/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="backdrop-blur-sm bg-white/50 border-white/30"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="backdrop-blur-sm bg-white/50 border-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Inquiry Type</Label>
                  <RadioGroup defaultValue="general" value={formData.inquiryType} onValueChange={handleRadioChange}>
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general">General Inquiry</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="volunteer" id="volunteer" />
                        <Label htmlFor="volunteer">Volunteering</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="partnership" id="partnership" />
                        <Label htmlFor="partnership">Partnership</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="donation" id="donation" />
                        <Label htmlFor="donation">Donation</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Subject of your message"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="backdrop-blur-sm bg-white/50 border-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="backdrop-blur-sm bg-white/50 border-white/30"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/placeholder.svg?height=1080&width=1920&text=map-pattern" 
            alt="Map pattern" 
            fill 
            className="object-cover opacity-5"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/70 z-0"></div>
        <div className="container relative z-10">
          <div className="backdrop-blur-md bg-white/30 p-8 rounded-xl border border-white/30 shadow-lg">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Find Us</h2>
            <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl border border-white/30 glass-card">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112203.29446000918!2d77.4036581232823!3d28.47437184265686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1e055d207d9%3A0x537d786f1d43d1ce!2sGreater%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1713850809670!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Udaan Collective Greater Noida Location"
                className="w-full h-full"
              ></iframe>
            </div>
            
            {/* Example blockquote with styled quotes */}
            <blockquote className="mt-8">
              <p>We believe in working directly with communities to create lasting change. Visit our office to learn more about our initiatives and how you can get involved.</p>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  )
}

