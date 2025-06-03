"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { getAllSocialLinks, getPrimarySocialLinks } from "@/lib/data/social-links"
import { trackSocialClick } from "@/lib/analytics"

interface SocialLinksGridProps {
  showAll?: boolean
  variant?: "grid" | "list" | "compact"
}

export default function SocialLinksGrid({ showAll = false, variant = "grid" }: SocialLinksGridProps) {
  const socialLinks = showAll ? getAllSocialLinks() : getPrimarySocialLinks()

  const handleSocialClick = (platform: string) => {
    trackSocialClick(platform)
  }

  if (variant === "compact") {
    return (
      <div className="flex gap-4">
        {socialLinks.map((social) => {
          const IconComponent = social.icon
          return (
            <Link
              key={social.id}
              href={social.url}
              className={`${social.color} ${social.hoverColor} transition-all duration-300 transform hover:scale-110`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              onClick={() => handleSocialClick(social.name)}
            >
              <IconComponent className="h-6 w-6" />
            </Link>
          )
        })}
      </div>
    )
  }

  if (variant === "list") {
    return (
      <div className="space-y-3">
        {socialLinks.map((social) => {
          const IconComponent = social.icon
          return (
            <Link
              key={social.id}
              href={social.url}
              className={`flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700 ${social.hoverColor} hover:border-gray-600 transition-all duration-300 group`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick(social.name)}
            >
              <IconComponent className={`h-5 w-5 ${social.color} group-hover:scale-110 transition-transform`} />
              <div className="flex-1">
                <p className="font-medium text-gray-200">{social.name}</p>
                {social.username && <p className="text-sm text-gray-400">{social.username}</p>}
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {socialLinks.map((social) => {
        const IconComponent = social.icon
        return (
          <Card
            key={social.id}
            className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 group cursor-pointer"
          >
            <Link
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick(social.name)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg bg-gray-700/50 ${social.color} group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-200">{social.name}</h3>
                      {social.primary && (
                        <Badge variant="outline" className="bg-cyan-950/30 text-cyan-400 border-cyan-800 text-xs">
                          Primary
                        </Badge>
                      )}
                    </div>
                    {social.username && <p className="text-sm text-gray-400 mb-2">{social.username}</p>}
                    {social.description && <p className="text-sm text-gray-500">{social.description}</p>}
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardContent>
            </Link>
          </Card>
        )
      })}
    </div>
  )
}
