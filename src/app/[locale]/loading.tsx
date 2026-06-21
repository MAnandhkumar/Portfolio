"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center p-4 overflow-hidden">
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
          src="/images/AKLogo.png"
          alt="Loading Logo"
          width={200}
          height={60}
          style={{ width: "200px", height: "auto" }}
          priority
        />
      </motion.div>
    </div>
  );
}
