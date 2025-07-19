"use client";

import React from "react";
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
        <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
          No content available.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom components to match your design
          h1: ({ children }) => (
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem',
              marginTop: '2rem',
              color: 'var(--text-primary, #000)',
              lineHeight: '1.2'
            }}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              marginTop: '1.5rem',
              color: 'var(--text-primary, #000)',
              lineHeight: '1.3'
            }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '0.75rem',
              marginTop: '1.25rem',
              color: 'var(--text-primary, #000)',
              lineHeight: '1.4'
            }}>
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '0.5rem',
              marginTop: '1rem',
              color: 'var(--text-primary, #000)'
            }}>
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 style={{ 
              fontSize: '1.125rem', 
              fontWeight: 'bold', 
              marginBottom: '0.5rem',
              marginTop: '1rem',
              color: 'var(--text-primary, #000)'
            }}>
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 style={{ 
              fontSize: '1rem', 
              fontWeight: 'bold', 
              marginBottom: '0.5rem',
              marginTop: '1rem',
              color: 'var(--text-primary, #000)'
            }}>
              {children}
            </h6>
          ),
          p: ({ children }) => (
            <p style={{ 
              marginBottom: '1rem', 
              lineHeight: '1.7',
              color: 'var(--text-secondary, #666)',
              fontSize: '1rem'
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
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            
            return (
              <pre style={{
                backgroundColor: '#1f2937',
                color: '#f9fafb',
                padding: '1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                overflow: 'auto',
                marginBottom: '1rem',
                lineHeight: '1.7'
              }}>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          a: ({ href, children }) => (
            <a 
              href={href}
              style={{ 
                color: 'var(--accent-primary, #3b82f6)', 
                textDecoration: 'underline',
                transition: 'color 0.2s ease'
              }}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul style={{ 
              marginBottom: '1rem', 
              paddingLeft: '1.5rem',
              color: 'var(--text-secondary, #666)',
              lineHeight: '1.7'
            }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol style={{ 
              marginBottom: '1rem', 
              paddingLeft: '1.5rem',
              color: 'var(--text-secondary, #666)',
              lineHeight: '1.7'
            }}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li style={{ marginBottom: '0.5rem' }}>
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote style={{
              borderLeft: '4px solid var(--accent-primary, #3b82f6)',
              paddingLeft: '1rem',
              margin: '1.5rem 0',
              fontStyle: 'italic',
              color: 'var(--text-secondary, #666)',
              backgroundColor: 'var(--bg-secondary, #f9fafb)',
              padding: '1rem',
              borderRadius: '0.5rem'
            }}>
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr style={{
              border: 'none',
              borderTop: '1px solid var(--border-color, #e5e7eb)',
              margin: '2rem 0'
            }} />
          ),
          table: ({ children }) => (
            <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                border: '1px solid var(--border-color, #e5e7eb)'
              }}>
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th style={{
              border: '1px solid var(--border-color, #e5e7eb)',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-secondary, #f9fafb)',
              fontWeight: 'bold',
              textAlign: 'left'
            }}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td style={{
              border: '1px solid var(--border-color, #e5e7eb)',
              padding: '0.75rem'
            }}>
              {children}
            </td>
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
