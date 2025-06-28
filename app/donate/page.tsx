"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CreditCard, Gift, HeartHandshake, IndianRupee, Lightbulb, School, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlassCard } from "@/components/glass-card"
import { toast } from "@/components/ui/use-toast"

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState<string>("1000")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    panNumber: "",
    isAnonymous: false,
  })

  const handleDonationAmountChange = (value: string) => {
    setDonationAmount(value)
    if (value !== "custom") {
      setCustomAmount("")
    }
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
  }

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
  }

  const handleDonorInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setDonorInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would process the payment
    const finalAmount = donationAmount === "custom" ? customAmount : donationAmount
    
    console.log({
      donationType: "one-time", // From the selected tab
      amount: finalAmount,
      paymentMethod,
      donorInfo,
    })
    
    toast({
      title: "Thank you for your donation!",
      description: `Your ${finalAmount} INR donation will help create lasting change in communities.`,
    })
    
    // Reset form
    setDonationAmount("1000")
    setCustomAmount("")
    setPaymentMethod("card")
    setDonorInfo({
      name: "",
      email: "",
      phone: "",
      address: "",
      panNumber: "",
      isAnonymous: false,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 overflow-hidden app-donate-hero">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="People joining hands in solidarity for a charitable cause" 
            fill 
            className="object-cover opacity-100"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-0"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white hero-heading">
              Make a Difference
            </h1>
            <p className="mt-6 text-xl text-gray-300 hero-subheading">
              Your donation powers our mission to create sustainable change in communities across India
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-white/90" onClick={() => {
                // Smooth scroll to the donation form section
                const donationSection = document.querySelector('.donation-form-section');
                if (donationSection) {
                  donationSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}>
                Donate Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="secondary" 
                className="bg-black/20 backdrop-blur-sm text-white border border-white/50 hover:bg-black/30" 
                onClick={() => {
                // Smooth scroll to the impact section
                const impactSection = document.querySelector('.impact-section');
                if (impactSection) {
                  impactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}>
                Learn About Impact
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Community support background" 
            fill 
            className="object-cover opacity-10"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/70 z-0"></div>
        <div className="container relative z-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Support Our Mission
              </h2>
              <p className="text-foreground/80">
                The Udaan Collective relies on the generosity of donors like you to continue our work empowering communities 
                and creating sustainable change. Your contribution, no matter the size, makes a real difference.
              </p>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <GlassCard className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <School className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="mb-2">Education</CardTitle>
                  <p className="text-foreground/70">
                    Your donation helps establish digital learning centers in underserved communities.
                  </p>
                </GlassCard>
                
                <GlassCard className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <HeartHandshake className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="mb-2">Healthcare</CardTitle>
                  <p className="text-foreground/70">
                    Support our mobile health clinics bringing essential services to remote areas.
                  </p>
                </GlassCard>
                
                <GlassCard className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="mb-2">Livelihood</CardTitle>
                  <p className="text-foreground/70">
                    Help women entrepreneurs build sustainable businesses through training and microfinance.
                  </p>
                </GlassCard>
                
                <GlassCard className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="mb-2">Innovation</CardTitle>
                  <p className="text-foreground/70">
                    Fund innovative solutions to community challenges through our social innovation labs.
                  </p>
                </GlassCard>
              </div>

              <div className="mt-8 backdrop-blur-md bg-white/30 p-6 rounded-xl border border-white/30 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Your Impact</h3>
                <div className="grid gap-4 sm:grid-cols-3 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">₹1,000</p>
                    <p className="text-sm text-foreground/70">Provides educational materials for 5 children</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">₹5,000</p>
                    <p className="text-sm text-foreground/70">Funds a micro-enterprise for a woman entrepreneur</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">₹10,000</p>
                    <p className="text-sm text-foreground/70">Supports a mobile health camp for an entire village</p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-md bg-white/30 p-6 rounded-xl border border-white/30 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Tax Benefits</h3>
                <p className="text-foreground/80 mb-2">
                  Donations to The Udaan Collective are eligible for tax benefits under Section 80G of the Income Tax Act.
                </p>
                <p className="text-foreground/80">
                  An official receipt will be emailed to you for tax purposes after your donation is processed.
                </p>
              </div>
            </div>
            
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-xl border border-white/30 shadow-lg donation-form-section">
              <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Make Your Contribution
              </h2>
              
              <Tabs defaultValue="one-time" className="w-full mb-6">
                <TabsList className="w-full backdrop-blur-md bg-white/30 border border-white/30">
                  <TabsTrigger value="one-time" className="flex-1">One-time Donation</TabsTrigger>
                  <TabsTrigger value="monthly" className="flex-1">Monthly Support</TabsTrigger>
                  <TabsTrigger value="sponsor" className="flex-1">Sponsorship</TabsTrigger>
                </TabsList>
                
                <TabsContent value="one-time" className="mt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <Label>Select Amount (INR)</Label>
                      <RadioGroup value={donationAmount} onValueChange={handleDonationAmountChange} className="grid grid-cols-3 gap-4">
                        <div className="relative">
                          <RadioGroupItem value="500" id="amount-500" className="sr-only peer" />
                          <Label
                            htmlFor="amount-500"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-white/30 backdrop-blur-sm bg-white/20 p-4 hover:bg-white/30 hover:text-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                          >
                            <IndianRupee className="mb-2 h-5 w-5" />
                            <span className="text-xl font-bold">500</span>
                          </Label>
                        </div>
                        
                        <div className="relative">
                          <RadioGroupItem value="1000" id="amount-1000" className="sr-only peer" />
                          <Label
                            htmlFor="amount-1000"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-white/30 backdrop-blur-sm bg-white/20 p-4 hover:bg-white/30 hover:text-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                          >
                            <IndianRupee className="mb-2 h-5 w-5" />
                            <span className="text-xl font-bold">1,000</span>
                          </Label>
                        </div>
                        
                        <div className="relative">
                          <RadioGroupItem value="2500" id="amount-2500" className="sr-only peer" />
                          <Label
                            htmlFor="amount-2500"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-white/30 backdrop-blur-sm bg-white/20 p-4 hover:bg-white/30 hover:text-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                          >
                            <IndianRupee className="mb-2 h-5 w-5" />
                            <span className="text-xl font-bold">2,500</span>
                          </Label>
                        </div>
                        
                        <div className="relative">
                          <RadioGroupItem value="5000" id="amount-5000" className="sr-only peer" />
                          <Label
                            htmlFor="amount-5000"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-white/30 backdrop-blur-sm bg-white/20 p-4 hover:bg-white/30 hover:text-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                          >
                            <IndianRupee className="mb-2 h-5 w-5" />
                            <span className="text-xl font-bold">5,000</span>
                          </Label>
                        </div>
                        
                        <div className="relative">
                          <RadioGroupItem value="10000" id="amount-10000" className="sr-only peer" />
                          <Label
                            htmlFor="amount-10000"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-white/30 backdrop-blur-sm bg-white/20 p-4 hover:bg-white/30 hover:text-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                          >
                            <IndianRupee className="mb-2 h-5 w-5" />
                            <span className="text-xl font-bold">10,000</span>
                          </Label>
                        </div>
                        
                        <div className="relative">
                          <RadioGroupItem value="custom" id="amount-custom" className="sr-only peer" />
                          <Label
                            htmlFor="amount-custom"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-white/30 backdrop-blur-sm bg-white/20 p-4 hover:bg-white/30 hover:text-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                          >
                            <Gift className="mb-2 h-5 w-5" />
                            <span className="text-xl font-bold">Custom</span>
                          </Label>
                        </div>
                      </RadioGroup>
                      
                      {donationAmount === "custom" && (
                        <div className="space-y-2">
                          <Label htmlFor="custom-amount">Enter Custom Amount (INR)</Label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-3 flex items-center text-foreground/70">₹</span>
                            <Input
                              id="custom-amount"
                              type="number"
                              placeholder="Enter amount"
                              min="100"
                              value={customAmount}
                              onChange={handleCustomAmountChange}
                              className="pl-8 backdrop-blur-sm bg-white/50 border-white/30"
                              required={donationAmount === "custom"}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange}>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative">
                            <RadioGroupItem value="card" id="payment-card" className="sr-only peer" />
                            <Label
                              htmlFor="payment-card"
                              className="flex items-center gap-2 rounded-md border-2 border-white/30 backdrop-blur-sm bg-white/20 p-4 hover:bg-white/30 hover:text-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                            >
                              <CreditCard className="h-5 w-5" />
                              <span>Credit/Debit Card</span>
                            </Label>
                          </div>
                          
                          <div className="relative">
                            <RadioGroupItem value="upi" id="payment-upi" className="sr-only peer" />
                            <Label
                              htmlFor="payment-upi"
                              className="flex items-center gap-2 rounded-md border-2 border-white/30 backdrop-blur-sm bg-white/20 p-4 hover:bg-white/30 hover:text-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                            >
                              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L4 8L12 14L20 8L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4 14L12 20L20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span>UPI</span>
                            </Label>
                          </div>
                          
                          <div className="relative">
                            <RadioGroupItem value="netbanking" id="payment-netbanking" className="sr-only peer" />
                            <Label
                              htmlFor="payment-netbanking"
                              className="flex items-center gap-2 rounded-md border-2 border-white/30 backdrop-blur-sm bg-white/20 p-4 hover:bg-white/30 hover:text-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                            >
                              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                                <path d="M7 15H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                              <span>Net Banking</span>
                            </Label>
                          </div>
                          
                          <div className="relative">
                            <RadioGroupItem value="wallet" id="payment-wallet" className="sr-only peer" />
                            <Label
                              htmlFor="payment-wallet"
                              className="flex items-center gap-2 rounded-md border-2 border-white/30 backdrop-blur-sm bg-white/20 p-4 hover:bg-white/30 hover:text-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                            >
                              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M15 12C15 11.4477 15.4477 11 16 11H18C18.5523 11 19 11.4477 19 12V12C19 12.5523 18.5523 13 18 13H16C15.4477 13 15 12.5523 15 12V12Z" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                              <span>E-Wallet</span>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Donor Information</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={donorInfo.name}
                            onChange={handleDonorInfoChange}
                            className="backdrop-blur-sm bg-white/50 border-white/30"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Your email"
                            value={donorInfo.email}
                            onChange={handleDonorInfoChange}
                            className="backdrop-blur-sm bg-white/50 border-white/30"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="Your phone number"
                            value={donorInfo.phone}
                            onChange={handleDonorInfoChange}
                            className="backdrop-blur-sm bg-white/50 border-white/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="panNumber">PAN Number (for tax receipt)</Label>
                          <Input
                            id="panNumber"
                            name="panNumber"
                            placeholder="Your PAN number"
                            value={donorInfo.panNumber}
                            onChange={handleDonorInfoChange}
                            className="backdrop-blur-sm bg-white/50 border-white/30"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          placeholder="Your address"
                          value={donorInfo.address}
                          onChange={handleDonorInfoChange}
                          className="backdrop-blur-sm bg-white/50 border-white/30"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isAnonymous"
                          name="isAnonymous"
                          checked={donorInfo.isAnonymous}
                          onChange={handleDonorInfoChange}
                          className="rounded border-white/30"
                        />
                        <Label htmlFor="isAnonymous">Make my donation anonymous</Label>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    >
                      Proceed to Payment
                    </Button>
                    
                    <p className="text-xs text-center text-foreground/70 mt-4">
                      By proceeding, you agree to our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>.
                    </p>
                  </form>
                </TabsContent>
                
                <TabsContent value="monthly" className="mt-6">
                  <div className="text-center p-4 backdrop-blur-sm bg-white/30 rounded-lg border border-white/30">
                    <p className="text-foreground/80 mb-4">
                      Become a monthly supporter and help us plan sustainable, long-term initiatives.
                    </p>
                    <p className="mb-6">
                      Our monthly donation form is similar to the one-time donation, with options for recurring contributions.
                    </p>
                    <Button
                      onClick={() => document.getElementById("one-time")?.click()}
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    >
                      Set Up Monthly Donation
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="sponsor" className="mt-6">
                  <div className="text-center p-4 backdrop-blur-sm bg-white/30 rounded-lg border border-white/30">
                    <p className="text-foreground/80 mb-4">
                      Sponsor a specific initiative or project and follow its progress.
                    </p>
                    <p className="mb-6">
                      For sponsorship opportunities, please contact our partnerships team directly.
                    </p>
                    <Link href="/contact">
                      <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                        Contact for Sponsorship
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-12 md:py-16 relative">
        <div className="absolute inset-0 gradient-bg-light z-0"></div>
        <div className="container relative z-10">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 sm:text-4xl gradient-text">
            Where Your Money Goes
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Program Expenses</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-5xl font-bold text-primary mb-4">75%</div>
                <CardDescription>
                  Directly funds our community initiatives, including education, healthcare, and livelihood programs.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Administrative Costs</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-5xl font-bold text-primary mb-4">15%</div>
                <CardDescription>
                  Covers essential operational expenses, allowing us to manage programs effectively and efficiently.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-md bg-white/30 border border-white/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Outreach & Growth</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-5xl font-bold text-primary mb-4">10%</div>
                <CardDescription>
                  Helps us reach more communities and expand our impact through sustainable growth strategies.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 max-w-3xl mx-auto text-center">
            <Link href="/annual-report">
              <Button variant="outline" className="backdrop-blur-sm bg-white/20 border-white/30 hover:bg-white/30">
                View Our Annual Impact Report
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/5 to-secondary/5 relative overflow-hidden impact-section">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Children in a classroom" 
            fill 
            className="object-cover opacity-10"
            priority={false}
          />
        </div>
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              The Impact of Your Donation
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              See how your contribution creates real, measurable change in communities across India
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="backdrop-blur-md bg-white/60 p-8 rounded-xl border border-white/30 shadow-lg text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <School className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">6,500+</h3>
              <p className="text-lg text-gray-700">Students educated through our digital learning centers</p>
            </div>
            
            <div className="backdrop-blur-md bg-white/60 p-8 rounded-xl border border-white/30 shadow-lg text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">12,000+</h3>
              <p className="text-lg text-gray-700">Patients treated through our mobile healthcare initiatives</p>
            </div>
            
            <div className="backdrop-blur-md bg-white/60 p-8 rounded-xl border border-white/30 shadow-lg text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">850+</h3>
              <p className="text-lg text-gray-700">Women entrepreneurs supported through our livelihood programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Giving CTA */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/placeholder.svg?height=1080&width=1920&text=grid-pattern" 
            alt="Grid pattern" 
            fill 
            className="object-cover opacity-5"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-white/80 to-white/70 z-0"></div>
        <div className="container relative z-10">
          <div className="backdrop-blur-md bg-white/30 p-8 rounded-xl border border-white/30 shadow-lg text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-4 sm:text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Corporate Partnership
            </h2>
            <p className="text-xl text-foreground/80 mb-6 max-w-3xl mx-auto">
              Looking to make a larger impact through your CSR initiatives? Partner with The Udaan Collective.
            </p>
            <Link href="/corporate-giving">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                Explore Corporate Giving
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}