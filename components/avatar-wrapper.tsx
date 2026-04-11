"use client"

import dynamic from "next/dynamic"

// next/dynamic with ssr:false must live inside a Client Component.
// This wrapper satisfies that constraint so layout.tsx (a Server Component)
// can import it as a regular component.
const AvatarAgent = dynamic(() => import("@/components/avatar-agent"), { ssr: false })

export default function AvatarWrapper() {
  return <AvatarAgent />
}
