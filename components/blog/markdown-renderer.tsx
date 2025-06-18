"use client"

import React, { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  Quote, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  Link as LinkIcon
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// Import CSS for syntax highlighting and math
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  allowHtml?: boolean;
  enableMath?: boolean;
  customComponents?: Record<string, React.ComponentType<any>>;
}

interface CodeBlockProps {
  children: string;
  className?: string;
  inline?: boolean;
  [key: string]: any;
}

const CodeBlock: React.FC<CodeBlockProps> = memo(({ children, className, inline, ...props }) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'text';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  if (inline) {
    return (
      <code 
        className="bg-gray-800/50 text-cyan-300 px-2 py-1 rounded-md text-sm font-mono border border-gray-700/50" 
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="relative group my-6">
      <div className="flex items-center justify-between bg-gray-800/80 px-4 py-2 rounded-t-lg border border-gray-700/50">
        <Badge variant="outline" className="text-xs text-gray-300 border-gray-600">
          {language}
        </Badge>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        className="!mt-0 !rounded-t-none border-x border-b border-gray-700/50 !bg-gray-900/50"
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
        showLineNumbers={true}
        lineNumberStyle={{
          color: '#6b7280',
          fontSize: '0.75rem',
          paddingRight: '1rem',
        }}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
});

CodeBlock.displayName = 'CodeBlock';

const CustomImage: React.FC<any> = memo(({ src, alt, title, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-lg border border-gray-700/50">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800/50 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading image...</div>
          </div>
        )}
        {error ? (
          <div className="bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-gray-400">Failed to load image</p>
            <p className="text-sm text-gray-500">{alt}</p>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt || ''}
            width={800}
            height={600}
            className="w-full h-auto transition-opacity duration-300"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setError(true);
            }}
            {...props}
          />
        )}
      </div>
      {(alt || title) && (
        <figcaption className="text-center text-sm text-gray-400 mt-3 italic">
          {title || alt}
        </figcaption>
      )}
    </figure>
  );
});

CustomImage.displayName = 'CustomImage';

const CustomLink: React.FC<any> = memo(({ href, children, ...props }) => {
  const isInternal = href?.startsWith('/') || href?.startsWith('#');
  const isEmail = href?.startsWith('mailto:');
  
  if (isInternal) {
    return (
      <Link 
        href={href}
        className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 underline decoration-cyan-400/50 hover:decoration-cyan-300 underline-offset-2"
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 underline decoration-cyan-400/50 hover:decoration-cyan-300 underline-offset-2"
      {...props}
    >
      {children}
      {!isEmail && <ExternalLink className="h-3 w-3" />}
    </a>
  );
});

CustomLink.displayName = 'CustomLink';

const CustomBlockquote: React.FC<any> = memo(({ children, ...props }) => (
  <Card className="my-6 bg-gray-800/30 border-l-4 border-l-cyan-500 border-gray-700/50">
    <div className="p-6">
      <div className="flex items-start gap-3">
        <Quote className="h-5 w-5 text-cyan-400 mt-1 flex-shrink-0" />
        <blockquote className="text-gray-300 italic [&>*:first-child]:mt-0 [&>*:last-child]:mb-0" {...props}>
          {children}
        </blockquote>
      </div>
    </div>
  </Card>
));

CustomBlockquote.displayName = 'CustomBlockquote';

const CustomHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => 
  memo<any>(({ children, id, ...props }) => {
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
    const sizes = {
      1: 'text-4xl font-bold',
      2: 'text-3xl font-semibold',
      3: 'text-2xl font-semibold',
      4: 'text-xl font-medium',
      5: 'text-lg font-medium',
      6: 'text-base font-medium'
    };
    
    const margins = {
      1: 'mt-12 mb-6',
      2: 'mt-10 mb-5',
      3: 'mt-8 mb-4',
      4: 'mt-6 mb-3',
      5: 'mt-5 mb-3',
      6: 'mt-4 mb-2'
    };

    return (
      <HeadingTag
        id={id}
        className={`${sizes[level]} ${margins[level]} text-white group relative scroll-mt-20`}
        {...props}
      >
        {id && (
          <a
            href={`#${id}`}
            className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label={`Link to ${children}`}
          >
            <LinkIcon className="h-4 w-4 text-gray-400 hover:text-cyan-400" />
          </a>
        )}
        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          {children}
        </span>
      </HeadingTag>
    );
  });

const CustomTable: React.FC<any> = memo(({ children, ...props }) => (
  <div className="my-6 overflow-x-auto">
    <table className="w-full border-collapse bg-gray-800/30 rounded-lg overflow-hidden border border-gray-700/50" {...props}>
      {children}
    </table>
  </div>
));

CustomTable.displayName = 'CustomTable';

const CustomTableHead: React.FC<any> = memo(({ children, ...props }) => (
  <thead className="bg-gray-700/50" {...props}>
    {children}
  </thead>
));

CustomTableHead.displayName = 'CustomTableHead';

const CustomTableRow: React.FC<any> = memo(({ children, ...props }) => (
  <tr className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors duration-200" {...props}>
    {children}
  </tr>
));

CustomTableRow.displayName = 'CustomTableRow';

const CustomTableCell: React.FC<any> = memo(({ children, ...props }) => (
  <td className="px-4 py-3 text-gray-300" {...props}>
    {children}
  </td>
));

CustomTableCell.displayName = 'CustomTableCell';

const CustomTableHeaderCell: React.FC<any> = memo(({ children, ...props }) => (
  <th className="px-4 py-3 text-left font-semibold text-white" {...props}>
    {children}
  </th>
));

CustomTableHeaderCell.displayName = 'CustomTableHeaderCell';

const AlertBox: React.FC<{ type: 'info' | 'warning' | 'success'; children: React.ReactNode }> = memo(({ type, children }) => {
  const configs = {
    info: {
      icon: Info,
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      iconColor: 'text-yellow-400'
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      iconColor: 'text-green-400'
    }
  };

  const config = configs[type];
  const IconComponent = config.icon;

  return (
    <Card className={`my-6 ${config.bgColor} border ${config.borderColor}`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <IconComponent className={`h-5 w-5 ${config.iconColor} mt-0.5 flex-shrink-0`} />
          <div className="text-gray-300 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </Card>
  );
});

AlertBox.displayName = 'AlertBox';

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = memo(({
  content,
  className = '',
  allowHtml = true,
  enableMath = true,
  customComponents = {}
}) => {
  const components = useMemo(() => ({
    // Headings with gradient styling and anchor links
    h1: CustomHeading(1),
    h2: CustomHeading(2),
    h3: CustomHeading(3),
    h4: CustomHeading(4),
    h5: CustomHeading(5),
    h6: CustomHeading(6),
    
    // Enhanced code blocks with syntax highlighting
    code: CodeBlock,
    
    // Custom styled elements
    img: CustomImage,
    a: CustomLink,
    blockquote: CustomBlockquote,
    
    // Table components
    table: CustomTable,
    thead: CustomTableHead,
    tbody: ({ children, ...props }: any) => <tbody {...props}>{children}</tbody>,
    tr: CustomTableRow,
    td: CustomTableCell,
    th: CustomTableHeaderCell,
    
    // Lists with custom styling
    ul: ({ children, ...props }: any) => (
      <ul className="my-4 space-y-2 list-disc list-inside text-gray-300 [&>li]:ml-4" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="my-4 space-y-2 list-decimal list-inside text-gray-300 [&>li]:ml-4" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="text-gray-300 leading-relaxed" {...props}>
        {children}
      </li>
    ),
    
    // Paragraph styling
    p: ({ children, ...props }: any) => (
      <p className="my-4 text-gray-300 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    
    // Horizontal rule
    hr: ({ ...props }) => (
      <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-600 to-transparent" {...props} />
    ),
    
    // Strong and emphasis
    strong: ({ children, ...props }: any) => (
      <strong className="font-semibold text-white" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }: any) => (
      <em className="italic text-cyan-300" {...props}>
        {children}
      </em>
    ),
    
    // Merge custom components
    ...customComponents
  }), [customComponents]);

  const remarkPlugins = useMemo(() => [
    remarkGfm,
    ...(enableMath ? [remarkMath] : [])
  ], [enableMath]);

  const rehypePlugins = useMemo(() => [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ...(allowHtml ? [rehypeRaw] : []),
    ...(enableMath ? [rehypeKatex] : [])
  ], [allowHtml, enableMath]);

  return (
    <article className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
        skipHtml={!allowHtml}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
});

MarkdownRenderer.displayName = 'MarkdownRenderer';

export default MarkdownRenderer;
