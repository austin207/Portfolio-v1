import type React from "react"
import "./globals.css"
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { generateSEO, structuredData, websiteStructuredData } from "@/lib/seo"
import CustomCursor from "@/components/custom-cursor"
import LoadingScreen from "@/components/loading-screen"
import AvatarWrapper from "@/components/avatar-wrapper"

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([structuredData, websiteStructuredData]),
          }}
        />
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
        </ThemeProvider>
      </body>
    </html>
  )
}
