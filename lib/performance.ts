// Performance optimization utilities

export const preloadCriticalResources = () => {
  if (typeof window !== "undefined") {
    // Preload critical images
    const criticalImages = [
      "/placeholder.svg?height=400&width=400", // Profile image
      "/placeholder.svg?height=300&width=500", // Project images
    ]

    criticalImages.forEach((src) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = src
      document.head.appendChild(link)
    })
  }
}

export const lazyLoadImages = () => {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ""
          img.classList.remove("lazy")
          observer.unobserve(img)
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }
}

export const optimizeScrollPerformance = () => {
  let ticking = false

  const updateScrollPosition = () => {
    // Update scroll-based animations or effects
    ticking = false
  }

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition)
      ticking = true
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true })
}

// Web Vitals tracking
export const trackWebVitals = () => {
  if (typeof window !== "undefined") {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log)
      getFID(console.log)
      getFCP(console.log)
      getLCP(console.log)
      getTTFB(console.log)
    })
  }
}
