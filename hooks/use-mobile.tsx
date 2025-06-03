"use client"

import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== "undefined") {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }

      // Initial check
      checkIsMobile()

      // Add event listener for window resize
      window.addEventListener("resize", checkIsMobile)

      // Clean up event listener
      return () => window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  return isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== "undefined") {
      const checkIsTablet = () => {
        const width = window.innerWidth
        setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT)
      }

      // Initial check
      checkIsTablet()

      // Add event listener for window resize
      window.addEventListener("resize", checkIsTablet)

      // Clean up event listener
      return () => window.removeEventListener("resize", checkIsTablet)
    }
  }, [])

  return isTablet
}

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop")

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== "undefined") {
      const checkDeviceType = () => {
        const width = window.innerWidth
        if (width < MOBILE_BREAKPOINT) {
          setDeviceType("mobile")
        } else if (width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT) {
          setDeviceType("tablet")
        } else {
          setDeviceType("desktop")
        }
      }

      // Initial check
      checkDeviceType()

      // Add event listener for window resize
      window.addEventListener("resize", checkDeviceType)

      // Clean up event listener
      return () => window.removeEventListener("resize", checkDeviceType)
    }
  }, [])

  return deviceType
}
