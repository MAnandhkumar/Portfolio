import { ReactNode, Suspense, useState, useEffect } from "react";

interface DelayedSuspenseProps {
  fallback: ReactNode;
  delay?: number;
  children: ReactNode;
}

export default function DelayedSuspense({
  fallback,
  delay = 2000,
  children,
}: DelayedSuspenseProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return <Suspense fallback={fallback}>{ready ? children : fallback}</Suspense>;
}
