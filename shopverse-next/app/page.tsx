'use client'; // Ensure this is a Client Component for potential interactivity

import Link from 'next/link';
import { motion } from 'framer-motion'; // For animations

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-center px-4">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to TrendyKart
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Your one-stop e-commerce platform for seamless shopping and exclusive deals
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors duration-300 shadow-md"
          aria-label="Start shopping now"
        >
          Shop Now
        </Link>
      </motion.div>
    </section>
  );
}