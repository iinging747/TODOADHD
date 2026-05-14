"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type FlowCardProps = {
  name: string;
  icon: LucideIcon;
  tone: string;
  progress: number;
  status: string;
  lastAction: string;
  nextAction: string;
  index: number;
};

export function FlowCard({ name, icon: Icon, tone, progress, status, lastAction, nextAction, index }: FlowCardProps) {
  return (
    <motion.article className="paper-card rounded-lg p-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>
      <div className="flex items-start gap-3">
        <div className={`${tone} grid h-11 w-11 place-items-center rounded-lg`}><Icon size={21} className="text-ink" /></div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2"><h3 className="truncate text-[15px] font-bold">{name}</h3><span className="shrink-0 text-xs font-semibold text-denim">{progress}%</span></div>
          <p className="mt-1 text-xs text-slate-500">{status}</p>
          <div className="mt-3 h-2 rounded-full bg-slate-100"><motion.div className="h-full rounded-full bg-denim" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: "easeOut" }} /></div>
        </div>
      </div>
      <div className="mt-4 grid gap-2 text-xs">
        <div className="rounded-lg bg-mist p-3 text-slate-500">마지막 행동: {lastAction}</div>
        <button className="flex items-center justify-between rounded-lg bg-ink px-3 py-3 text-left font-semibold text-white"><span>다음 제일 쉬운 행동: {nextAction}</span><ArrowRight size={16} /></button>
      </div>
    </motion.article>
  );
}
