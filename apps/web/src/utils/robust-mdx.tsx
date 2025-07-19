"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Props for MDX rendering components
 */
export interface MDXContentProps {
  code?: string;
  raw?: string;
  className?: string;
}

/**
 * Code Block Component with copy functionality
 */
const CodeBlock: React.FC<{
  children: string;
  className?: string;
  language?: string;
}> = ({ children, className, language: propLanguage }) => {
  const [copied, setCopied] = useState(false);
  
  // Extract language from className or use prop
  const match = /language-(\w+)/.exec(className || '');
  const language = propLanguage || (match ? match[1] : 'text');
  const codeString = String(children).replace(/\n$/, '');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getLanguageDisplayName = (lang: string) => {
    const languageMap: Record<string, string> = {
      js: 'JavaScript',
      ts: 'TypeScript',
      jsx: 'React JSX',
      tsx: 'React TSX',
      bash: 'Bash',
      sh: 'Shell',
      python: 'Python',
      py: 'Python',
      json: 'JSON',
      css: 'CSS',
      html: 'HTML',
      sql: 'SQL',
      yaml: 'YAML',
      yml: 'YAML',
      md: 'Markdown',
      mdx: 'MDX',
    };
    return languageMap[lang.toLowerCase()] || lang.toUpperCase();
  };

  return (
    <div style={{
      position: 'relative',
      marginBottom: '1.5rem',
      borderRadius: '0.75rem',
      overflow: 'hidden',
      border: '1px solid var(--border-color, #374151)',
      backgroundColor: '#1a1a1a',
      fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    }}>
      {/* Header with language and copy button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.3rem 0.5rem',
        backgroundColor: '#2d2d2d',
        borderBottom: '1px solid #374151',
        fontSize: '0.875rem'
      }}>
        <span style={{
          color: '#9ca3af',
          fontWeight: '500',
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {getLanguageDisplayName(language)}
        </span>
        
        <button
          onClick={copyToClipboard}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: copied ? '#10b981' : '#374151',
            color: copied ? '#ffffff' : '#d1d5db',
            border: 'none',
            borderRadius: '0.375rem',
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = '#4b5563';
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = '#374151';
            }
          }}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="m5,15 L5,5 A2,2 0 0,1 7,3 L17,3"></path>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      
      {/* Code content */}
      <pre style={{
        margin: 0,
        padding: '1rem',
        backgroundColor: '#1a1a1a',
        color: '#f8f8f2',
        fontSize: '0.875rem',
        lineHeight: '1.6',
        overflow: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
      }}>
        <code className={className}>
          {children}
        </code>
      </pre>
    </div>
  );
};

/**
 * Robust content renderer that uses react-markdown exclusively
 * This avoids all the JSX runtime issues with Contentlayer's compiled MDX
 */
export const RobustMDXContent: React.FC<MDXContentProps> = ({ 
  raw, 
  className 
}) => {
  if (!raw || typeof raw !== 'string') {
    return (
      <div className={className}>
        <p style={{ 
          color: 'var(--text-secondary, #6b7280)', 
          fontStyle: 'italic',
          textAlign: 'center',
          padding: '2rem'
        }}>
          No content available.
        </p>
      </div>
    );
  }

  return (
    <div className={className} style={{
      maxWidth: '100%',
      color: 'var(--text-primary, #000)'
    }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Enhanced headings with better typography
          h1: ({ children }) => (
            <h1 style={{ 
              fontSize: '2.75rem', 
              fontWeight: '800', 
              marginBottom: '2rem',
              marginTop: '3rem',
              color: 'var(--text-primary, #000)',
              lineHeight: '1.1',
              letterSpacing: '-0.025em'
            }}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ 
              fontSize: '2.25rem', 
              fontWeight: '700', 
              marginBottom: '1.5rem',
              marginTop: '2.5rem',
              color: 'var(--text-primary, #000)',
              lineHeight: '1.2',
              letterSpacing: '-0.025em',
              borderBottom: '2px solid var(--border-color, #e5e7eb)',
              paddingBottom: '0.5rem'
            }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ 
              fontSize: '1.875rem', 
              fontWeight: '600', 
              marginBottom: '1rem',
              marginTop: '2rem',
              color: 'var(--text-primary, #000)',
              lineHeight: '1.3'
            }}>
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              marginBottom: '0.75rem',
              marginTop: '1.5rem',
              color: 'var(--text-primary, #000)',
              lineHeight: '1.4'
            }}>
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              marginTop: '1.25rem',
              color: 'var(--text-primary, #000)',
              lineHeight: '1.5'
            }}>
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              marginTop: '1rem',
              color: 'var(--text-primary, #000)',
              lineHeight: '1.5'
            }}>
              {children}
            </h6>
          ),
          p: ({ children }) => (
            <p style={{ 
              marginBottom: '1.25rem', 
              lineHeight: '1.8',
              color: 'var(--text-secondary, #666)',
              fontSize: '1.125rem',
              fontWeight: '400'
            }}>
              {children}
            </p>
          ),
          code: ({ children, className, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            
            if (isInline) {
              return (
                <code 
                  style={{
                    backgroundColor: 'var(--bg-secondary, #f3f4f6)',
                    color: 'var(--accent-primary, #dc2626)',
                    padding: '0.2rem 0.4rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    border: '1px solid var(--border-color, #e5e7eb)'
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            
            return (
              <CodeBlock 
                className={className} 
                language={match?.[1]}
              >
                {String(children)}
              </CodeBlock>
            );
          },
          pre: ({ children }) => {
            // This will be handled by the CodeBlock component
            return <>{children}</>;
          },
          a: ({ href, children }) => (
            <a 
              href={href}
              style={{ 
                color: 'var(--accent-primary, #3b82f6)', 
                textDecoration: 'none',
                borderBottom: '1px solid var(--accent-primary, #3b82f6)',
                transition: 'all 0.2s ease',
                fontWeight: '500'
              }}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary-alpha, rgba(59, 130, 246, 0.1))';
                e.currentTarget.style.borderBottomWidth = '2px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderBottomWidth = '1px';
              }}
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul style={{ 
              marginBottom: '1.5rem', 
              paddingLeft: '1.75rem',
              color: 'var(--text-secondary, #666)',
              lineHeight: '1.8',
              listStyleType: 'disc'
            }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol style={{ 
              marginBottom: '1.5rem', 
              paddingLeft: '1.75rem',
              color: 'var(--text-secondary, #666)',
              lineHeight: '1.8',
              listStyleType: 'decimal'
            }}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li style={{ 
              marginBottom: '0.75rem',
              fontSize: '1.125rem'
            }}>
              {children}
            </li>
          ),
          blockquote: ({ children }) => {
            // Check if it's a special note type (info, warning, tip, etc.)
            const childText = React.Children.toArray(children).join('').toLowerCase();
            const isInfo = childText.includes('ℹ️') || childText.includes('info:') || childText.includes('note:');
            const isWarning = childText.includes('⚠️') || childText.includes('warning:') || childText.includes('caution:');
            const isTip = childText.includes('💡') || childText.includes('tip:') || childText.includes('pro tip:');
            const isError = childText.includes('❌') || childText.includes('error:') || childText.includes('danger:');
            const isSuccess = childText.includes('✅') || childText.includes('success:') || childText.includes('done:');

            let noteStyle = {
              borderColor: 'var(--accent-primary, #3b82f6)',
              backgroundColor: 'var(--bg-secondary, #f0f9ff)',
              iconColor: 'var(--accent-primary, #3b82f6)',
              icon: '' 
            };

            if (isInfo) {
              noteStyle = {
                borderColor: '#3b82f6',
                backgroundColor: '#eff6ff',
                iconColor: '#3b82f6',
                icon: 'ℹ️'
              };
            } else if (isWarning) {
              noteStyle = {
                borderColor: '#f59e0b',
                backgroundColor: '#fffbeb',
                iconColor: '#f59e0b',
                icon: '⚠️'
              };
            } else if (isTip) {
              noteStyle = {
                borderColor: '#10b981',
                backgroundColor: '#ecfdf5',
                iconColor: '#10b981',
                icon: '💡'
              };
            } else if (isError) {
              noteStyle = {
                borderColor: '#ef4444',
                backgroundColor: '#fef2f2',
                iconColor: '#ef4444',
                icon: '❌'
              };
            } else if (isSuccess) {
              noteStyle = {
                borderColor: '#22c55e',
                backgroundColor: '#f0fdf4',
                iconColor: '#22c55e',
                icon: '✅'
              };
            }

            return (
              <blockquote style={{
                borderLeft: `4px solid ${noteStyle.borderColor}`,
                margin: '2rem 0',
                backgroundColor: noteStyle.backgroundColor,
                borderRadius: '0.75rem',
                fontSize: '1.125rem',
                lineHeight: '1.8',
                position: 'relative',
                padding: '1.5rem 1.5rem 1.5rem 4rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                border: `1px solid ${noteStyle.borderColor}33`
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  fontSize: '1.5rem',
                  color: noteStyle.iconColor,
                  lineHeight: 1,
                  fontWeight: 'bold'
                }}>
                  {noteStyle.icon}
                </div>
                <div style={{ 
                  position: 'relative', 
                  zIndex: 1,
                  color: 'var(--text-primary, #1f2937)',
                  fontWeight: '500'
                }}>
                  {children}
                </div>
              </blockquote>
            );
          },
          hr: () => (
            <hr style={{
              border: 'none',
              borderTop: '2px solid var(--border-color, #e5e7eb)',
              margin: '3rem 0',
              borderRadius: '1px'
            }} />
          ),
          table: ({ children }) => (
            <div style={{ 
              overflowX: 'auto', 
              marginBottom: '2rem',
              border: '1px solid var(--border-color, #e5e7eb)',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '1rem'
              }}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead style={{
              backgroundColor: 'var(--bg-secondary, #f8fafc)'
            }}>
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th style={{
              border: '1px solid var(--border-color, #e5e7eb)',
              padding: '1rem',
              backgroundColor: 'var(--bg-secondary, #f8fafc)',
              fontWeight: '600',
              textAlign: 'left',
              color: 'var(--text-primary, #000)',
              fontSize: '0.95rem'
            }}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td style={{
              border: '1px solid var(--border-color, #e5e7eb)',
              padding: '1rem',
              color: 'var(--text-secondary, #666)',
              fontSize: '0.95rem',
              lineHeight: '1.6'
            }}>
              {children}
            </td>
          ),
          strong: ({ children }) => (
            <strong style={{
              fontWeight: '700',
              color: 'var(--text-primary, #000)'
            }}>
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em style={{
              fontStyle: 'italic',
              color: 'var(--text-secondary, #666)'
            }}>
              {children}
            </em>
          ),
        }}
      >
        {raw}
      </ReactMarkdown>
    </div>
  );
};

/**
 * Simple MDX content renderer (kept for backwards compatibility)
 */
export const SimpleMDXContent: React.FC<MDXContentProps> = (props) => {
  return <RobustMDXContent {...props} />;
};

/**
 * Default export
 */
export default RobustMDXContent;
