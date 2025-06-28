"use client"

import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image"

import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"

// Mission-related images from Unsplash
const MISSION_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    alt: "Children empowerment program"
  },
  {
    src: "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    alt: "Education empowerment initiative"
  },
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    alt: "Women empowerment and leadership"
  }
]

export function MissionCarousel() {
  const [api, setApi] = React.useState<any>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const scrollToNextSlide = useCallback(() => {
    if (api) {
      api.scrollNext()
    }
  }, [api])

  // Auto-rotate the carousel every 5 seconds
  useEffect(() => {
    if (!api) return
    
    const intervalId = setInterval(() => {
      scrollToNextSlide()
    }, 5000)
    
    // Update current slide when it changes
    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap())
    }
    api.on("select", onSelect)
    
    return () => {
      clearInterval(intervalId)
      api?.off("select", onSelect)
    }
  }, [api, scrollToNextSlide])

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-white/30 shadow-lg">
      <Carousel
        setApi={setApi}
        opts={{ 
          loop: true,
          align: "center",
        }}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {MISSION_IMAGES.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full">
                {/* Using a regular img tag for external images */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Carousel navigation arrows */}
        <div className="z-10">
          <CarouselPrevious className="left-4 bg-white/60 hover:bg-white/80" />
          <CarouselNext className="right-4 bg-white/60 hover:bg-white/80" />
        </div>
        
        {/* Dot indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {MISSION_IMAGES.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}