import Script from "next/script"

/**
 * Google Analytics loader.
 *
 * lib/analytics.ts already defined `gtag` helpers but was imported by nothing,
 * so GA never actually loaded and no traffic was measured at all. AI referral
 * traffic is one of the four headline AEO metrics, and it cannot be observed
 * without this. Renders nothing when NEXT_PUBLIC_GA_ID is unset.
 *
 * To see answer-engine traffic in GA4, segment by session source containing
 * chatgpt.com, perplexity.ai, claude.ai, copilot.microsoft.com, or gemini.google.com.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  if (!gaId || gaId.startsWith("G-XXXX")) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
