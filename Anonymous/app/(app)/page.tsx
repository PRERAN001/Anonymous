"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
export default function Home() {
  const router=useRouter()

  const messages = [
    {
      content: "You inspire more people than you realize.",
      createdAt: "Feb 20, 2026 • 10:32 AM",
    },
    {
      content: "Your consistency is actually motivating.",
      createdAt: "Feb 18, 2026 • 4:15 PM",
    },
    {
      content: "Keep going. Big things are coming your way.",
      createdAt: "Feb 16, 2026 • 9:47 AM",
    },
    {
      content: "I admire your confidence. It’s rare.",
      createdAt: "Feb 14, 2026 • 7:21 PM",
    },
    {
      content: "You’ve improved so much lately. Respect.",
      createdAt: "Feb 12, 2026 • 1:08 PM",
    },
    {
      content: "Your mindset is elite. Don’t lose that.",
      createdAt: "Feb 10, 2026 • 6:54 PM",
    },
  ]
  

  return (
    <div className="min-h-screen bg-white text-black">

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">

        <h1 className="text-6xl font-semibold tracking-tight leading-tight">
          Receive Honest
          <br />
          Anonymous Messages
        </h1>

        <p className="text-black/60 mt-6 text-lg max-w-2xl mx-auto">
          Share your unique link and let people send you anonymous feedback.
          Clean. Simple. Powerful.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <Button  onClick={()=>{
            router.replace("/dashboard")
          }} className="bg-black text-white hover:bg-black/80 h-11 px-8 rounded-xl">
            Get Started
          </Button>

          <Button
            variant="outline"
            className="border-black/20 hover:bg-black hover:text-white h-11 px-8 rounded-xl"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/10 max-w-6xl mx-auto" />

      {/* Carousel Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">

        <h2 className="text-3xl font-semibold mb-4">
          What People Are Saying
        </h2>

        <p className="text-black/50 mb-16">
          Real anonymous messages shared through the platform.
        </p>

        <Carousel className="w-full">
          <CarouselContent>
            {messages.map((msg, index) => (
              <CarouselItem key={index} className="flex justify-center">

                <Card className="border border-black/10 bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl max-w-xl">
                  <CardContent className="p-10 space-y-6">

                    <p className="text-xl leading-relaxed font-medium">
                      “{msg.content}”
                    </p>

                    <p className="text-sm text-black/40">
                      {msg.createdAt}
                    </p>

                  </CardContent>
                </Card>

              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="border-black/20 hover:bg-black hover:text-white" />
          <CarouselNext className="border-black/20 hover:bg-black hover:text-white" />
        </Carousel>

      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-10 text-center text-black/50 text-sm">
        © 2026 Anonymous. All rights reserved.
      </footer>

    </div>
  )
}