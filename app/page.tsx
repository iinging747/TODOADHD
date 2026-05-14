"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Check, Home, Layers3, MessageCircleHeart, NotebookPen, PiggyBank, Play, Sparkles, TimerReset, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CharacterSticker, QuokkaMascot, SituationSticker } from "@/components/CharacterSticker";
import { FlowCard } from "@/components/FlowCard";
import { Stamp } from "@/components/Stamp";
import { VoiceCapture } from "@/components/VoiceCapture";
import { flows, focusMissions, researchCards, situationStickers, stamps, timeline } from "@/lib/data";
import { Tab, useAppStore } from "@/lib/store";

const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "홈", icon: Home },
  { id: "flows", label: "흐름", icon: Layers3 },
  { id: "focus", label: "집중", icon: TimerReset },
  { id: "mood", label: "감정", icon: MessageCircleHeart },
  { id: "diary", label: "일기", icon: NotebookPen },
  { id: "money", label: "가계부", icon: Wallet }
];

function analyzeDump(text: string) {
  const overload = /싫|귀찮|불안|복잡|스트레스|망함|트위터/.test(text);
  const debt = /빚|돈|상환|카드/.test(text);
  return {
    state: overload ? "과부하 신호가 있어요" : "정리 가능한 상태예요",
    schedule: "오늘 핵심은 일정 축소와 첫 행동 분리",
    money: debt ? "돈 걱정은 숫자 확인 1개만" : "가계부는 오늘 건드리지 않아도 괜찮음",
    next: overload ? "물 한 모금 마시고, 가장 쉬운 카드 하나만 열기" : "지금 떠오른 걸 흐름 하나에 붙이기"
  };
}

function createDiaryComment(text: string) {
  const tired = /힘들|지침|피곤|울|불안|무기력|싫|망함|스트레스|버거/.test(text);
  const avoiding = /미룸|도망|트위터|쇼츠|누워|회피|안 했|못 했/.test(text);
  if (!text.trim()) return "오늘은 빈칸이어도 괜찮아요. 무슨 일이 있었는지 한 줄만 다시 시작하면 됩니다.";
  if (tired && avoiding) return "어제는 의지가 약했던 날이라기보다 에너지가 바닥난 상태에서 버틴 날에 가까워요. 다만 회피가 길어지면 불안이 이자를 붙이니까, 오늘은 제일 작은 현실 확인 하나만 하자.";
  if (tired) return "힘든 와중에도 기록을 남긴 건 중요한 신호예요. 감정은 진짜였고, 오늘은 계획을 줄이고 흐름 하나만 살려두자.";
  return "다정하게 말하면, 너는 꽤 많이 느끼고 있었고. 냉철하게 말하면, 오늘 필요한 건 해석보다 다음 행동 하나예요.";
}

export default function App() {
  const store = useAppStore();
  const analysis = analyzeDump(store.brainDump);

  return (
    <main className="mx-auto flex min-h-dvh phone-shell flex-col bg-white/70">
      <section className="flex-1 px-5 pb-28 pt-5">
        <header className="flex items-center justify-between gap-4">
          <div><p className="text-xs font-bold text-denim">AI 세컨드 브레인</p><h1 className="mt-1 text-[22px] font-black leading-tight text-ink">그렇게 안 살기<br />생존 체크메이트</h1></div>
          <div className="rounded-full border border-slate-100 bg-white px-3 py-2 text-xs font-bold shadow-soft">오늘 {store.energy}%</div>
        </header>

        <AnimatePresence mode="wait">
          {store.activeTab === "home" && <Screen><Hero mood={store.mood} /><TodayCore /><DiaryPreview comment={store.diaryComment} onOpen={() => store.setActiveTab("diary")} /><StickerShelf /><FlowPreview /><StampShelf /><Timeline /></Screen>}
          {store.activeTab === "flows" && <Screen><SectionTitle eyebrow="멀티 흐름 시스템" title="끝내는 목록이 아니라 살아있는 흐름" />{flows.map((flow, index) => <FlowCard key={flow.id} {...flow} index={index} />)}<StickerShelf compact /><ResearchFlow /></Screen>}
          {store.activeTab === "focus" && <Screen><SectionTitle eyebrow="집중모드 ON" title="생각 말고 진입만" /><div className="paper-card rounded-lg p-4"><div className="flex items-center justify-between"><div><p className="text-xs font-bold text-coral">지금 추천</p><h2 className="mt-1 text-lg font-black">5분만 하기</h2></div><QuokkaMascot /></div><button onClick={() => store.setMood("작게 해냈음. 오늘은 이걸로도 흐름 유지")} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-4 text-sm font-black text-white"><Play size={18} fill="currentColor" />첫 5분 시작</button></div>{focusMissions.map((m) => <button key={m.title} className="paper-card flex w-full items-center justify-between rounded-lg p-4 text-left"><div><p className="text-xs font-bold text-denim">{m.tag}</p><h3 className="mt-1 text-sm font-black">{m.title}</h3></div><span className="rounded-full bg-mist px-3 py-1 text-xs font-bold">{m.minutes}분</span></button>)}</Screen>}
          {store.activeTab === "mood" && <Screen><SectionTitle eyebrow="감정 기반 일정 정리" title="하소연해도 계획이 됩니다" /><div className="paper-card rounded-lg p-4"><textarea className="min-h-32 w-full resize-none rounded-lg border border-slate-100 bg-mist p-4 text-sm leading-6 outline-none focus:border-denim" placeholder="내일 병원 가야 하고 영상 편집도 해야 하는데 솔직히 너무 귀찮고 빚 때문에 스트레스 받음" value={store.brainDump} onChange={(e) => store.setBrainDump(e.target.value)} /><button onClick={() => store.setMood(analysis.state)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-denim px-4 py-3 text-sm font-black text-white"><Sparkles size={17} />AI처럼 정리하기</button></div><Insight title="감정 상태" body={analysis.state} /><Insight title="일정 축소" body={analysis.schedule} /><Insight title="돈 걱정 처리" body={analysis.money} /><Insight title="다음 행동" body={analysis.next} accent /></Screen>}
          {store.activeTab === "diary" && <Screen><SectionTitle eyebrow="나만 보는 매일 일기" title="잘 쓴 글 말고, 살아있던 흔적" /><div className="paper-card rounded-lg p-4"><div className="flex items-start justify-between"><div><p className="text-xs font-bold text-denim">오늘의 기록</p><h2 className="mt-1 text-lg font-black">내 편인 공간</h2></div><span className="rounded-full bg-leaf px-3 py-2 text-[11px] font-black">비공개</span></div><textarea className="mt-4 min-h-44 w-full resize-none rounded-lg border border-slate-100 bg-mist p-4 text-sm leading-6 outline-none focus:border-denim" placeholder="오늘 있었던 일, 도망친 일, 의외로 해낸 일까지. 문장 아니어도 괜찮아요." value={store.diaryEntry} onChange={(e) => store.setDiaryEntry(e.target.value)} /><button onClick={() => store.setDiaryComment(createDiaryComment(store.diaryEntry))} className="mt-3 w-full rounded-lg bg-ink px-4 py-3 text-sm font-black text-white">내일 아침 코멘트 남기기</button></div><Insight title="다음날 AI 코멘트" body={store.diaryComment} accent /><Insight title="코멘트 원칙" body="혼내지 않기. 감정은 인정하기. 그래도 오늘 해야 할 현실 행동은 하나로 줄여서 말하기." /></Screen>}
          {store.activeTab === "money" && <Screen><SectionTitle eyebrow="빚 청산 시스템" title="하나씩 줄여나가는 중" /><div className="paper-card rounded-lg p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold text-denim">상환 흐름</p><h2 className="mt-1 text-2xl font-black">39% 줄어듦</h2><p className="mt-2 text-sm leading-6 text-slate-500">오늘은 전체를 보지 말고 자동이체 날짜만 확인하면 충분해요.</p></div><div className="grid h-12 w-12 place-items-center rounded-lg bg-cloud"><PiggyBank /></div></div><div className="mt-5 flex h-28 items-end gap-2">{[100,92,86,77,69,61].map((v) => <div key={v} className="flex-1 rounded-t-lg bg-denim/40" style={{ height: `${v}%` }} />)}</div></div><Insight title="충동 소비 감지" body="밤 11시 이후 결제 전에는 10분 보류 버튼을 먼저 띄웁니다." /><Insight title="작은 성공" body="이번 주 상환 체크 1회 완료. 압박 없이 다음 날짜만 남겨둘게요." accent /></Screen>}
        </AnimatePresence>
      </section>
      <VoiceCapture />
      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-[430px] border-t border-slate-100 bg-white/92 px-3 pb-4 pt-2 shadow-[0_-10px_28px_rgba(40,45,70,0.08)] backdrop-blur"><div className="grid grid-cols-6 gap-1">{tabs.map((tab) => { const Icon = tab.icon; const active = store.activeTab === tab.id; return <button key={tab.id} onClick={() => store.setActiveTab(tab.id)} className={`flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-bold ${active ? "bg-ink text-white" : "text-slate-500"}`}><Icon size={18} />{tab.label}</button>; })}</div></nav>
    </main>
  );
}

function Screen({ children }: { children: React.ReactNode }) { return <motion.div className="mt-5 space-y-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{children}</motion.div>; }
function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) { return <div><p className="text-xs font-black text-denim">{eyebrow}</p><h2 className="mt-1 text-base font-black text-ink">{title}</h2></div>; }
function Hero({ mood }: { mood: string }) { return <section className="paper-card overflow-hidden rounded-lg p-4"><div className="flex items-center justify-between gap-2"><div className="min-w-0"><p className="text-xs font-bold text-denim">현재 감정</p><h2 className="mt-1 text-xl font-black leading-tight">{mood}</h2><p className="mt-3 text-sm leading-6 text-slate-500">하루가 밀려도 흐름은 죽지 않아요. 다시 이어서 하면 돼요.</p></div><CharacterSticker mood="calm" scene="laptop" /></div></section>; }
function TodayCore() { return <section><SectionTitle eyebrow="오늘 핵심 3개" title="완벽 말고 생존 단위" /><div className="mt-3 grid gap-2">{["병원 시간 확인", "영상 파일 열기", "상환 날짜 체크"].map((item, index) => <div key={item} className="paper-card flex items-center gap-3 rounded-lg p-3"><div className="grid h-8 w-8 place-items-center rounded-lg bg-leaf text-sm font-black">{index + 1}</div><span className="flex-1 text-sm font-bold">{item}</span><Check size={18} className="text-slate-300" /></div>)}</div></section>; }
function DiaryPreview({ comment, onOpen }: { comment: string; onOpen: () => void }) { return <section className="paper-card rounded-lg bg-lilac/70 p-4"><p className="text-xs font-black text-denim">매일 일기</p><h2 className="mt-1 text-base font-black">내일의 AI가 남기는 한마디</h2><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{comment}</p><button onClick={onOpen} className="mt-3 w-full rounded-lg bg-white px-4 py-3 text-sm font-black text-ink shadow-soft">오늘 일기 쓰러 가기</button></section>; }
function StickerShelf() { return <section><SectionTitle eyebrow="상황별 스티커 짤" title="내 하루를 장면으로 저장하기" /><div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-3">{situationStickers.map((s, index) => <SituationSticker key={s.id} {...s} index={index} />)}</div></section>; }
function FlowPreview() { return <section><SectionTitle eyebrow="현재 굴러가는 흐름들" title="동시에 살아있어도 괜찮음" /><div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-2">{flows.slice(0, 4).map((flow) => { const Icon = flow.icon; return <article key={flow.id} className="paper-card w-44 shrink-0 rounded-lg p-3"><div className={`${flow.tone} grid h-10 w-10 place-items-center rounded-lg`}><Icon size={19} /></div><h3 className="mt-3 text-sm font-black">{flow.name.replace(" 흐름", "")}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{flow.nextAction}</p></article>; })}</div></section>; }
function StampShelf() { return <section><SectionTitle eyebrow="도장 컬렉션" title="작은 완료도 남겨두기" /><div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto rounded-lg bg-white/70 p-3">{stamps.map((stamp, index) => <Stamp key={stamp.label} {...stamp} index={index} />)}</div></section>; }
function Timeline() { return <section><SectionTitle eyebrow="오늘 타임라인" title="밀리면 자동으로 줄이기" /><div className="mt-3 space-y-2">{timeline.map((item) => <div key={item.time} className="paper-card flex items-center gap-3 rounded-lg p-3"><span className="w-12 text-xs font-black text-denim">{item.time}</span><div><p className="text-sm font-bold">{item.label}</p><p className="text-xs text-slate-500">{item.mood}</p></div></div>)}</div></section>; }
function ResearchFlow() { return <section className="paper-card rounded-lg p-4"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-lg bg-lilac"><BookOpen size={21} /></div><div><p className="text-xs font-bold text-denim">정보 탐색 흐름</p><h2 className="text-base font-black">수집력을 자산으로 바꾸기</h2></div></div><div className="mt-4 grid gap-2">{researchCards.map((card) => { const Icon = card.icon; return <button key={card.title} className="flex items-center gap-3 rounded-lg bg-mist p-3 text-left"><Icon size={18} /><div><p className="text-sm font-bold">{card.title}</p><p className="text-xs text-slate-500">{card.note}</p></div></button>; })}</div></section>; }
function Insight({ title, body, accent = false }: { title: string; body: string; accent?: boolean }) { return <div className={`paper-card rounded-lg p-4 ${accent ? "border-denim/30 bg-cloud/80" : ""}`}><p className="text-xs font-black text-denim">{title}</p><p className="mt-1 text-sm leading-6 text-slate-600">{body}</p></div>; }
