"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Instagram, Linkedin } from "lucide-react"

const routes = [
  { href: "/", label: "Home" },
  { href: "/our-work", label: "Our Work" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/members", label: "Members" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        scrolled ? "bg-background/95 shadow-md" : "bg-background border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-4 py-4">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <Image
                    src="/circle-logo.png"
                    alt="Dr. Interested Logo"
                    width={100}
                    height={100}
                    className="rounded-full"
                    priority
                  />
                </Link>
                <nav className="flex flex-col gap-4">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium transition-colors hover:text-[#405862] rounded-md",
                        pathname === route.href || pathname?.startsWith(`${route.href}/`)
                          ? "text-[#405862] font-bold bg-[#f5f1eb]"
                          : "text-muted-foreground",
                      )}
                    >
                      {(pathname === route.href || pathname?.startsWith(`${route.href}/`)) && (
                        <div className="w-1 h-4 bg-[#405862] mr-2 rounded-full"></div>
                      )}
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/circle-logo.png"
              alt="Dr. Interested Logo"
              width={40}
              height={40}
              className="hidden md:block rounded-full"
              priority
            />
            <div className="font-semibold text-lg">
              <span className="text-[#405862]">Dr.</span> Interested
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-base font-medium transition-colors hover:text-[#405862] relative py-1.5 px-2",
                pathname === route.href || pathname?.startsWith(`${route.href}/`)
                  ? "text-[#405862] font-bold"
                  : "text-muted-foreground hover:bg-[#f5f1eb]/50 rounded-md",
              )}
            >
              {route.label}
              {(pathname === route.href || pathname?.startsWith(`${route.href}/`)) && (
                <span className="absolute -bottom-[6px] left-0 w-full h-1 bg-[#405862] rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="https://forms.gle/i3Y6vazF5TErGBxG7"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex bg-[#405862] text-white hover:bg-[#334852] px-4 py-2 rounded-md text-sm font-medium transition-all hover:shadow-md btn-hover-effect"
          >
            Interested?
          </Link>
          <Link
            href="https://discord.gg/pzbGRgsGXY"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#405862] hover:text-[#334852] transition-colors"
            aria-label="Discord"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-discord"
            >
              <circle cx="9" cy="12" r="1" />
              <circle cx="15" cy="12" r="1" />
              <path d="M7.5 7.2c.3-.1.6-.2.8-.2h7.4c.2 0 .5.1.8.2M7.5 16.8c.3.1.6.2.8.2h7.4c.2 0 .5-.1.8-.2" />
              <path d="M16 3h-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2H4a2 2 0 0 0-2 2v3a8 8 0 0 0 4 7v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a8 8 0 0 0 4-7V5a2 2 0 0 0-2-2z" />
            </svg>
          </Link>
          <Link
            href="https://www.instagram.com/dr.interested/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#405862] hover:text-[#334852] transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6" />
          </Link>
          <Link
            href="https://www.linkedin.com/company/dr-interested"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#405862] hover:text-[#334852] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  )
}
