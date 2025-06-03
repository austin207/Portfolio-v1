"use client"

import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from "remark-gfm"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  return (
    <div className="prose prose-invert prose-cyan max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom heading renderer
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-semibold mt-12 mb-6 text-cyan-400 border-b border-gray-700 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => <h3 className="text-2xl font-semibold mt-8 mb-4 text-purple-400">{children}</h3>,
          h4: ({ children }) => <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-200">{children}</h4>,

          // Custom paragraph renderer
          p: ({ children }) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,

          // Custom list renderers
          ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300">{children}</ol>,
          li: ({ children }) => <li className="text-gray-300">{children}</li>,

          // Custom link renderer
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-cyan-400 hover:text-cyan-300 transition-colors underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),

          // Custom blockquote renderer
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-cyan-500 pl-4 py-2 my-6 bg-gray-800/50 rounded-r-lg">
              <div className="text-gray-300 italic">{children}</div>
            </blockquote>
          ),

          // Custom table renderers
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-gray-800">{children}</thead>,
          tbody: ({ children }) => <tbody className="bg-gray-900/50">{children}</tbody>,
          tr: ({ children }) => <tr className="border-b border-gray-700">{children}</tr>,
          th: ({ children }) => <th className="px-4 py-3 text-left text-cyan-400 font-semibold">{children}</th>,
          td: ({ children }) => <td className="px-4 py-3 text-gray-300">{children}</td>,

          // Custom code renderer
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            const codeString = String(children).replace(/\n$/, "")

            if (!inline && match) {
              return (
                <div className="relative group my-6">
                  <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-700">
                    <span className="text-sm font-medium text-gray-400">{match[1].toUpperCase()}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(codeString)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiedCode === codeString ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    className="!mt-0 !rounded-t-none"
                    customStyle={{
                      margin: 0,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                    }}
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              )
            }

            return (
              <code className="bg-gray-800 text-cyan-400 px-2 py-1 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            )
          },

          // Custom image renderer
          img: ({ src, alt }) => (
            <div className="my-8">
              <img src={src || "/placeholder.svg"} alt={alt} className="w-full rounded-lg border border-gray-700" />
              {alt && <p className="text-center text-gray-400 text-sm mt-2 italic">{alt}</p>}
            </div>
          ),

          // Custom horizontal rule
          hr: () => <hr className="border-gray-700 my-8" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
