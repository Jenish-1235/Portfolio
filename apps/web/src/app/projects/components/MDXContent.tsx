"use client";

import React from "react";
import { SimpleMDXContent } from "@/utils/mdx";

interface MDXContentProps {
  code: string;
  className?: string;
}

/**
 * MDX Content wrapper component for projects
 */
const MDXContent: React.FC<MDXContentProps> = ({ code, className }) => {
  return <SimpleMDXContent code={code} className={className} />;
};

export default MDXContent;
