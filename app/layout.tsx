import type React from "react"
import "./globals.css"
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { generateSEO, rootGraph } from "@/lib/seo"
import JsonLd from "@/components/json-ld"
import CustomCursor from "@/components/custom-cursor"
import LoadingScreen from "@/components/loading-screen"
import AvatarWrapper from "@/components/avatar-wrapper"
import Analytics from "@/components/analytics"

const sans = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata = generateSEO()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head>
        {/* Marks JS as available before first paint, which is what gates the
            scroll-reveal animations in globals.css. Without JS (or if this
            never runs) content stays visible instead of stuck at opacity:0. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        {/* Sitewide entity backbone: Person, RSET, VirtusCo, Noviq, WebSite —
            all @id-linked so answer engines resolve one entity, not several. */}
        <JsonLd data={rootGraph} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${sans.className} antialiased noise`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LoadingScreen />
          <CustomCursor />
          <AvatarWrapper />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
