import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface LoaderProps {
  fallback?: boolean;
}

const Loader = memo(({ fallback }: LoaderProps) => {
  const imagePath = "/images/AKLogo.png";

  if (!fallback) return null;

  return (
    <div className="h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="relative flex items-center justify-center"
      >
        <Image
          src={imagePath}
          alt="Loader"
          width={200}
          height={60}
          style={{ width: "200px", height: "auto" }}
          priority
        />
      </motion.div>
    </div>
  );
});

export { Loader };
