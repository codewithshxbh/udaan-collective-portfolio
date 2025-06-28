"use client"

import { useEffect, useState } from "react"
import { Users, Building, Award, Heart } from "lucide-react"
import { GlassCard } from "@/components/glass-card"

export function ImpactCounter() {
  const [counts, setCounts] = useState({
    communities: 0,
    partners: 0,
    projects: 0,
    volunteers: 0,
  })

  const targets = {
    communities: 50,
    partners: 25,
    projects: 100,
    volunteers: 500,
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds animation
    const interval = 20 // update every 20ms
    const steps = duration / interval

    const incrementValues = {
      communities: targets.communities / steps,
      partners: targets.partners / steps,
      projects: targets.projects / steps,
      volunteers: targets.volunteers / steps,
    }

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++

      if (currentStep <= steps) {
        setCounts({
          communities: Math.min(Math.round(incrementValues.communities * currentStep), targets.communities),
          partners: Math.min(Math.round(incrementValues.partners * currentStep), targets.partners),
          projects: Math.min(Math.round(incrementValues.projects * currentStep), targets.projects),
          volunteers: Math.min(Math.round(incrementValues.volunteers * currentStep), targets.volunteers),
        })
      } else {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <GlassCard className="p-6">
        <div className="flex justify-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20">
            <Building className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="text-3xl font-bold gradient-text mt-2">{counts.communities}</div>
        <div className="text-sm text-foreground/70">Communities Served</div>
      </GlassCard>
      <GlassCard className="p-6">
        <div className="flex justify-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20">
            <Award className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="text-3xl font-bold gradient-text mt-2">{counts.partners}</div>
        <div className="text-sm text-foreground/70">NGO Partners</div>
      </GlassCard>
      <GlassCard className="p-6">
        <div className="flex justify-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20">
            <Heart className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="text-3xl font-bold gradient-text mt-2">{counts.projects}</div>
        <div className="text-sm text-foreground/70">Projects Completed</div>
      </GlassCard>
      <GlassCard className="p-6">
        <div className="flex justify-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20">
            <Users className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="text-3xl font-bold gradient-text mt-2">{counts.volunteers}</div>
        <div className="text-sm text-foreground/70">Active Volunteers</div>
      </GlassCard>
    </div>
  )
}

