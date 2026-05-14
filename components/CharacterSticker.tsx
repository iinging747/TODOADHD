"use client";

import { motion } from "framer-motion";

type CharacterStickerProps = {
  mood?: "calm" | "focus" | "proud" | "stress";
  scene?: "none" | "laptop" | "memo" | "book" | "monitor" | "phone" | "payment" | "diary" | "sleep" | "quokka";
  size?: "sm" | "md" | "lg";
};

const sceneLabels = { none: "", laptop: "💻", memo: "📝", book: "📚", monitor: "🖥", phone: "📱", payment: "₩", diary: "✎", sleep: "☾", quokka: "♡" };

export function CharacterSticker({ mood = "calm", scene = "none", size = "lg" }: CharacterStickerProps) {
  const mouth = { calm: "M88 126 Q100 132 112 126", focus: "M92 126 L108 126", proud: "M86 124 Q100 140 114 124", stress: "M91 130 Q100 122 109 130" }[mood];
  const boxSize = { sm: "h-24 w-24", md: "h-32 w-32", lg: "h-40 w-40" }[size];

  return (
    <motion.div className={`sticker-outline relative shrink-0 ${boxSize}`} animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} aria-label="검은 장발 ADHD 생존자 캐릭터">
      <svg viewBox="0 0 200 200" className="h-full w-full" role="img">
        <path d="M52 84 C48 43 75 20 102 24 C139 20 160 51 150 91 C165 116 158 160 126 171 C99 185 61 174 48 149 C34 125 36 101 52 84Z" fill="#222636" />
        <path d="M57 91 C54 55 77 33 103 35 C132 33 148 56 145 91 C150 124 132 151 101 153 C70 151 52 123 57 91Z" fill="#fff2e9" />
        <path d="M55 87 C61 48 84 33 112 36 C93 43 77 58 70 89Z" fill="#171a27" />
        <path d="M96 36 C132 37 149 58 146 99 C134 72 117 55 96 36Z" fill="#171a27" />
        <path d="M56 89 C75 85 101 74 121 50 C115 78 101 94 72 102Z" fill="#222636" />
        <circle cx="83" cy="106" r="8" fill="#26324c" />
        <circle cx="121" cy="106" r="8" fill="#26324c" />
        <circle cx="86" cy="103" r="2.5" fill="#ffffff" />
        <circle cx="124" cy="103" r="2.5" fill="#ffffff" />
        <path d={mouth} stroke="#5c4a4c" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M65 156 C76 143 126 143 137 156 L145 184 L56 184Z" fill="#293044" />
        <path d="M73 163 L128 163" stroke="#6f7898" strokeWidth="4" strokeLinecap="round" />
        {scene !== "none" && <text x="142" y="166" textAnchor="middle" fontSize="30" fontWeight="800">{sceneLabels[scene]}</text>}
      </svg>
    </motion.div>
  );
}

type SituationStickerProps = { title: string; speech: string; note: string; tone: string; scene: CharacterStickerProps["scene"]; index: number };

export function SituationSticker({ title, speech, note, tone, scene, index }: SituationStickerProps) {
  const mood = scene === "payment" ? "focus" : scene === "quokka" ? "proud" : "calm";
  return (
    <motion.article className="paper-card relative w-40 shrink-0 overflow-hidden rounded-lg p-3" initial={{ opacity: 0, y: 12, rotate: index % 2 ? 1.5 : -1.5 }} animate={{ opacity: 1, y: 0, rotate: index % 2 ? 1 : -1 }} transition={{ delay: index * 0.04 }}>
      <div className={`absolute right-2 top-2 rounded-full px-2 py-1 text-[10px] font-black text-ink ${tone}`}>{speech}</div>
      <div className="mt-4 flex justify-center"><CharacterSticker mood={mood} scene={scene} size="md" /></div>
      <h3 className="mt-2 text-center text-sm font-black leading-tight">{title}</h3>
      <p className="mt-2 text-center text-[11px] leading-4 text-slate-500">{note}</p>
    </motion.article>
  );
}

export function QuokkaMascot({ happy = true }: { happy?: boolean }) {
  return (
    <motion.div className="sticker-outline relative h-24 w-24 shrink-0" animate={happy ? { rotate: [0, -3, 3, 0], y: [0, -3, 0] } : { y: [0, 2, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }} aria-label="쿼카 마스코트">
      <svg viewBox="0 0 120 120" className="h-full w-full" role="img">
        <path d="M25 54 C20 32 35 18 50 30 C59 24 68 24 77 30 C94 17 108 35 95 55 C104 84 86 105 60 105 C34 105 16 83 25 54Z" fill="#c98f65" />
        <circle cx="41" cy="55" r="5" fill="#2d2730" /><circle cx="78" cy="55" r="5" fill="#2d2730" />
        <ellipse cx="60" cy="70" rx="18" ry="15" fill="#e5b38b" />
        <path d="M55 64 Q60 68 65 64" stroke="#2d2730" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d={happy ? "M48 74 Q60 86 73 74" : "M50 79 Q60 73 70 79"} stroke="#2d2730" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    </motion.div>
  );
}
