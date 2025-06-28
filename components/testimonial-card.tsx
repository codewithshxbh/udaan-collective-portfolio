import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GlassCard } from "@/components/glass-card"

interface TestimonialCardProps {
  quote?: string
  author?: string
  role?: string
  imageSrc?: string
}

export function TestimonialCard(props: TestimonialCardProps) {
  // Extract props with defaults to prevent undefined
  const quote = props.quote || "";
  const author = props.author || "";
  const role = props.role || "";
  const imageSrc = props.imageSrc || "";
  
  // Create a single character for the avatar fallback
  // Using optional chaining and nullish coalescing to prevent accessing length on undefined
  const initial = author?.length > 0 ? author[0] : "U";
    
  return (
    <GlassCard className="p-6">
      <div className="flex flex-col gap-4">
        <div className="relative pt-5">
          <span className="absolute -top-3 -left-3 text-5xl text-primary/20 leading-none">"</span>
          <p className="relative z-10 text-foreground/80 pl-2">{quote}</p>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <Avatar className="border border-white/50">
            <AvatarImage src={imageSrc} alt={author || "User"} />
            <AvatarFallback className="bg-gradient-to-r from-primary/20 to-secondary/20">
              {initial}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm text-foreground/70">{role}</p>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

