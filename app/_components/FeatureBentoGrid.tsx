import { cn } from "@/lib/utils";
import React from "react";

import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export function FeatureBentoGrid() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "AI Medical Agents",
    description: "Intelligent agents trained to assist with real medical workflows.",
    header: (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <img
        src="/imageAIMedicalAgents.png"
        alt="Seamless Integration"
        className="w-full h-full object-cover"
      />
    </div>

  ),
    icon: <IconClipboardCopy className="h-6 w-6 text-green-500" />,
  },
  {
    title: "Voice-First Experience",
    description: "Hands-free consultations using natural voice conversations.",
    header: (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <img
        src="/imageVoice.jpg"
        alt="Seamless Integration"
        className="w-full h-full object-cover"
      />
    </div>

  ),
    icon: <IconFileBroken className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Faster Decisions",
    description: "Reduce diagnosis time with AI-powered insights.",
    header: (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <img
        src="/imageFaster Decisions.jpg"
        alt="Seamless Integration"
        className="w-full h-full object-cover"
      />
    </div>

  ),
    icon: <IconSignature className="h-6 w-6 text-purple-500" />,
  },
  {
    title: "Secure & Private",
    description: "Your data stays safe with industry-leading encryption.",
    header: (
    <div className="w-full h-90 rounded-lg overflow-hidden">
      <img
        src="/imageSecure.jpg"
        alt="Seamless Integration"
        className="w-full h-90 object-cover"
      />
    </div>

  ),
    icon: <IconTableColumn className="h-6 w-6 text-red-500" />,
  },
  {
    title: "24/7 Availability",
    description: "AI assistants are available around the clock for your needs.",
    header: (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <img
        src="/imageAvailability.jpg"
        alt="Seamless Integration"
        className="w-full h-full object-cover"
      />
    </div>

  ),
    icon: <IconArrowWaveRightUp className="h-6 w-6 text-yellow-500" />,
  },
  {
    title: "Smart Recommendations",
    description: "Get personalized suggestions based on your health data.",
    header: (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <img
        src="/imageRecommendations.jpg"
        alt="Seamless Integration"
        className="w-full h-full object-cover"
      />
    </div>

  ),
    icon: <IconBoxAlignTopLeft className="h-6 w-6 text-pink-500" />,
  },
 {
  title: "Seamless Integration",
  description: "Integrate smoothly with existing hospital systems and tools.",
  header: (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <img
        src="/imageSeamless.jpg"
        alt="Seamless Integration"
        className="w-full h-full object-cover"
      />
    </div>

  ),
  icon: <IconBoxAlignRightFilled className="h-6 w-6 text-indigo-500" />,
},
];