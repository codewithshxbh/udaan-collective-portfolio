import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { GlassCard } from "@/components/glass-card"

interface TeamMemberProps {
  name: string
  role: string
  bio: string
  imageSrc: string
}

export function TeamMember({ name, role, bio, imageSrc }: TeamMemberProps) {
  return (
    <GlassCard className="overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={name}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm text-primary mb-2">{role}</p>
        <p className="text-sm text-foreground/70 mb-4">{bio}</p>
        <div className="flex space-x-3">
          <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
            <Instagram className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </a>
        </div>
      </div>
    </GlassCard>
  )
}

