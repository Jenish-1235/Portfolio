"use client";

import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";

/**
 * Props for MDX rendering components
 */
export interface MDXContentProps {
  code: string;
  className?: string;
}

/**
 * Error boundary component for MDX rendering failures
 */
interface MDXErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
}

const MDXErrorBoundary = ({ children, fallback, onError }: MDXErrorBoundaryProps) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    setHasError(false);
    setError(null);
  }, [children]);

  React.useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  if (hasError) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div style={{
        padding: '20px',
        border: '2px solid #ff6b6b',
        borderRadius: '8px',
        backgroundColor: '#fff5f5',
        color: '#c92a2a',
        margin: '16px 0'
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px' }}>
          ⚠️ Content Rendering Error
        </h3>
        <p style={{ margin: '0 0 12px 0' }}>
          Failed to render MDX content. This might be due to:
        </p>
        <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px' }}>
          <li>MDX compilation issues</li>
          <li>Missing React components</li>
          <li>JSX runtime problems</li>
        </ul>
        <details style={{ marginTop: '12px' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            Technical Details
          </summary>
          <pre style={{
            marginTop: '8px',
            padding: '12px',
            backgroundColor: '#f8f8f8',
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto',
            whiteSpace: 'pre-wrap'
          }}>
            {error?.message || 'Unknown error occurred'}
          </pre>
        </details>
      </div>
    );
  }

  return <>{children}</>;
};

/**
 * Simple MDX content renderer using next-contentlayer hooks
 */
export const SimpleMDXContent = ({ code, className }: MDXContentProps) => {
  // Always call the hook at the top level
  const Component = useMDXComponent(code || '');

  if (!code || typeof code !== 'string') {
    return (
      <div className={className}>
        <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
          No content available.
        </p>
      </div>
    );
  }

  return (
    <MDXErrorBoundary>
      <div className={className}>
        <Component />
      </div>
    </MDXErrorBoundary>
  );
};

/**
 * Advanced MDX content renderer with custom components and error handling
 */
interface AdvancedMDXContentProps extends MDXContentProps {
  components?: Record<string, React.ComponentType<any>>;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
}

export const AdvancedMDXContent = ({ 
  code, 
  className, 
  components = {},
  fallback,
  onError 
}: AdvancedMDXContentProps) => {
  // Always call the hook at the top level
  const Component = useMDXComponent(code || '');

  if (!code || typeof code !== 'string') {
    return (
      <div className={className}>
        <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
          No content available.
        </p>
      </div>
    );
  }

  return (
    <MDXErrorBoundary fallback={fallback} onError={onError}>
      <div className={className}>
        <Component components={components} />
      </div>
    </MDXErrorBoundary>
  );
};

/**
 * Utility function to validate MDX code
 */
export const validateMDXCode = (code: string): { isValid: boolean; error?: string } => {
  if (!code || typeof code !== 'string') {
    return { isValid: false, error: 'Code is empty or not a string' };
  }

  if (code.trim().length === 0) {
    return { isValid: false, error: 'Code is empty' };
  }

  // Basic validation - check if it looks like compiled MDX
  if (!code.includes('function') && !code.includes('=>')) {
    return { isValid: false, error: 'Code does not appear to be compiled MDX' };
  }

  return { isValid: true };
};

/**
 * Custom hook for MDX content with error handling
 */
export const useMDXContent = (code: string) => {
  const [error, setError] = React.useState<Error | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  
  // Always call the hook at the top level
  const component = useMDXComponent(code || '');

  React.useEffect(() => {
    setIsLoading(true);
    setError(null);

    try {
      const validation = validateMDXCode(code);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  return { component, error, isLoading };
};

/**
 * Default export for simple use cases
 */
const MDXContent = SimpleMDXContent;
export default MDXContent;
