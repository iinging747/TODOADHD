"use client";

import { motion } from "framer-motion";

type StampProps = { label: string; color: string; emoji: string; index: number };

export function Stamp({ label, color, emoji, index }: StampProps) {
  return (
    <motion.div className="flex w-24 shrink-0 flex-col items-center gap-2" initial={{ scale: 0.78, rotate: -9, opacity: 0 }} animate={{ scale: 1, rotate: index % 2 ? 4 : -3, opacity: 1 }} transition={{ delay: 0.15 + index * 0.07, type: "spring", stiffness: 260, damping: 14 }}>
      <div className={`${color} grid h-16 w-16 place-items-center rounded-full border-2 border-dashed border-white shadow-soft ring-2 ring-slate-200`}><span className="text-lg font-black text-ink">{emoji}</span></div>
      <p className="text-center text-[11px] font-semibold leading-tight text-slate-600">{label}</p>
    </motion.div>
  );
}
