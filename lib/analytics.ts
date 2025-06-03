// Analytics and performance tracking

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track specific portfolio interactions
export const trackProjectView = (projectId: string) => {
  event({
    action: "view_project",
    category: "engagement",
    label: projectId,
  })
}

export const trackBlogRead = (postId: string, readingTime: number) => {
  event({
    action: "read_blog_post",
    category: "engagement",
    label: postId,
    value: readingTime,
  })
}

export const trackContactForm = (success: boolean) => {
  event({
    action: success ? "contact_form_success" : "contact_form_error",
    category: "conversion",
  })
}

export const trackDownload = (type: "resume" | "project_files") => {
  event({
    action: "download",
    category: "engagement",
    label: type,
  })
}
