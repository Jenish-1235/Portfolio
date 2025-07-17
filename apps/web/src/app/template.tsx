"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import TransitionLoader from "./common/TransitionLoader";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    // Handle initial load animation
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 2000); // Animation duration + a little buffer
      return () => clearTimeout(timer);
    }

    // Handle route changes
    if (pathname !== previousPathnameRef.current) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        previousPathnameRef.current = pathname;
        setIsLoading(false);
      }, 2000); // Animation duration + a little buffer
      return () => clearTimeout(timer);
    }
  }, [pathname, isInitialLoad]);

  return (
    <div>
      <AnimatePresence mode="wait">
        {(isLoading || isInitialLoad) && <TransitionLoader key="loader" />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isInitialLoad && !isLoading && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
