"use client";

import { create } from "zustand";

export type Tab = "home" | "flows" | "focus" | "mood" | "diary" | "money";

type AppState = {
  activeTab: Tab;
  energy: number;
  mood: string;
  brainDump: string;
  diaryEntry: string;
  diaryComment: string;
  setActiveTab: (tab: Tab) => void;
  setEnergy: (energy: number) => void;
  setMood: (mood: string) => void;
  setBrainDump: (value: string) => void;
  setDiaryEntry: (value: string) => void;
  setDiaryComment: (value: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  activeTab: "home",
  energy: 42,
  mood: "머릿속이 시끄럽지만 아직 가능",
  brainDump: "",
  diaryEntry: "",
  diaryComment: "아직 오늘의 일기가 없어요. 잘 쓸 필요 없이, 있었던 일 하나랑 기분 하나만 남겨도 충분해요.",
  setActiveTab: (activeTab) => set({ activeTab }),
  setEnergy: (energy) => set({ energy }),
  setMood: (mood) => set({ mood }),
  setBrainDump: (brainDump) => set({ brainDump }),
  setDiaryEntry: (diaryEntry) => set({ diaryEntry }),
  setDiaryComment: (diaryComment) => set({ diaryComment })
}));
