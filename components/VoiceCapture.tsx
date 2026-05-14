"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";

type SpeechRecognitionConstructor = new () => SpeechRecognition;
type SpeechRecognition = EventTarget & { lang: string; interimResults: boolean; continuous: boolean; start: () => void; stop: () => void; onresult: ((event: SpeechRecognitionEvent) => void) | null; onend: (() => void) | null };
type SpeechRecognitionEvent = { results: { [index: number]: { [index: number]: { transcript: string } }; length: number } };

declare global { interface Window { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor } }

export function VoiceCapture() {
  const { setBrainDump, setMood } = useAppStore();
  const [listening, setListening] = useState(false);
  const [fallback, setFallback] = useState(false);
  const support = useMemo(() => typeof window !== "undefined" && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition), []);

  const startListening = () => {
    if (!support) { setFallback(true); return; }
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;
    const recognition = new Recognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = Array.from({ length: event.results.length }).map((_, index) => event.results[index][0].transcript).join(" ");
      setBrainDump(transcript);
      setMood(transcript.includes("싫") || transcript.includes("불안") ? "과부하 감지, 오늘은 작게 가기" : "말로 꺼냈으니 정리 가능");
    };
    recognition.onend = () => setListening(false);
    setListening(true);
    recognition.start();
  };

  return <><motion.button className="fixed bottom-24 right-[calc(50%-196px)] z-30 grid h-16 w-16 place-items-center rounded-full bg-coral text-white shadow-sticker max-[430px]:right-5" whileTap={{ scale: 0.92 }} onClick={startListening} aria-label="음성으로 머릿속 내용 입력">{listening ? <Sparkles size={27} /> : <Mic size={27} />}</motion.button>{fallback && <div className="fixed inset-x-4 bottom-44 z-40 mx-auto max-w-sm rounded-lg bg-ink p-4 text-sm text-white shadow-sticker">이 브라우저에서는 음성 입력이 잠깐 쉬고 있어요. 감정 탭에서 문장으로 털어놓으면 같은 방식으로 정리할게요.</div>}</>;
}
