"use client";

import { motion } from "motion/react";
import { FeatureBentoGrid } from "./_components/FeatureBentoGrid";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSectionOne() {
  return (
    <div className="relative my-10 flex flex-col items-center justify-center overflow-hidden">
      <Navbar />

      {/* Decorative lines */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80" />
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80" />
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80" />

      <div className="px-4 py-10 md:py-20">
        {/* Heading */}
        <h1 className="relative z-10 mx-auto max-w-5xl text-center text-3xl font-bold text-slate-700 md:text-5xl lg:text-7xl dark:text-slate-300">
          {"🩺 Revolutionize Patient Care With AI-Powered Medical Agents"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(6px)", y: 15 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-2xl py-6 text-center text-lg text-neutral-600 dark:text-neutral-400"
        >
          Smarter diagnosis, faster decisions, and voice-powered AI assistants
          built to support modern healthcare.
        </motion.p>

        {/* Trust badges */}
        <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
          <span>⚡ AI-Powered</span>
          <span>🔒 Secure & Private</span>
          <span>🧠 Smart Medical Agents</span>
          <span>🌍 24/7 Availability</span>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/sign-in">
            <button className="cursor-pointer w-60 rounded-lg bg-black px-6 py-3 font-medium text-white transition-all hover:-translate-y-1 hover:bg-gray-800 dark:bg-white dark:text-black">
              Get Started
            </button>
          </Link>

          <Link href="/dashboard">
            <button className="cursor-pointer w-60 rounded-lg border border-neutral-300 px-6 py-3 font-medium text-neutral-700 transition-all hover:-translate-y-1 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
              Go to Dashboard
            </button>
          </Link>
        </motion.div>

        {/* Preview image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.3 }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* First Image */}
              <div className="overflow-hidden rounded-xl border border-gray-300 dark:border-neutral-700 shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src="image1.png"
                  alt="Medical AI Dashboard Preview 1"
                  className="w-full h-auto aspect-[16/9] object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Second Image */}
              <div className="overflow-hidden rounded-xl border border-gray-300 dark:border-neutral-700 shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src="image2.png"
                  alt="Medical AI Dashboard Preview 2"
                  className="w-full h-auto aspect-[16/9] object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
        </motion.div>
      </div>

      {/* Feature cards */}
      <section className="relative z-10 mt-2 grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
        {[
          {
            title: "AI Medical Agents",
            desc: "Intelligent agents trained to assist with real medical workflows."
          },
          {
            title: "Voice-First Experience",
            desc: "Hands-free consultations using natural voice conversations."
          },
          {
            title: "Faster Decisions",
            desc: "Reduce diagnosis time with AI-powered insights."
          }
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {item.desc}
            </p>
          </div>
        ))}
      </section>
        <br /><br />
      <FeatureBentoGrid />
    </div>
  );
}

/* NAVBAR  */

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
          <span className="text-green-500">Medi</span>
          <span className="text-black">Voice AI</span>
        </h1>
      </div>

      {!user ? (
        <Link href="/sign-in">
          <button className="cursor-pointer w-28 rounded-lg bg-black px-6 py-2 font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black">
            Login
          </button>
        </Link>
      ) : (
        <div className="flex items-center gap-4">
          <UserButton />
          <Link href="/dashboard">
            <Button className="cursor-pointer">Dashboard</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};
