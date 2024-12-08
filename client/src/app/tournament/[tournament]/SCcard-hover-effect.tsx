"use client"
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    team_name: string;
    name: string;
    team_logo: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-5  py-10 ",
        className
      )}
    >
      {items.map((item, idx) => (
        <div className="relative group  block p-2 h-full w-full">
        <AnimatePresence>
          {hoveredIndex === idx && (
            <motion.span
              className="absolute inset-0 h-auto w-auto bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.15 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15, delay: 0.2 },
              }}
            />
          )}
        </AnimatePresence>
        <Card>
          <div className='h-36 overflow-hidden rounded-lg flex justify-center w-full'>
            <img className='object-cover h-full w-full' src={item.team_logo} alt="" />
          </div>
          <div className='flex flex-col justify-center items-start'>
            <p className='font-mono text-white font-bold text-2xl'>{item.team_name}</p>
            <p className='font-mono text-white text-lg'>{item.name}</p>
          </div>
        </Card>
      </div>

      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-black bg-opacity-75 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
