import { Brain, Camera, CircleDollarSign, Dumbbell, Film, HeartPulse, Search, WalletCards } from "lucide-react";

export const flows = [
  { id: "video", name: "영상 작업 흐름", icon: Film, tone: "bg-peach", progress: 62, status: "편집은 살아있음", lastAction: "인트로 컷 3개 정리", nextAction: "자막 파일만 열기" },
  { id: "invest", name: "투자 흐름", icon: CircleDollarSign, tone: "bg-butter", progress: 38, status: "정보 모으는 중", lastAction: "BTC / KOSPI 메모 저장", nextAction: "차트 하나만 캡처" },
  { id: "ai", name: "AI 공부 흐름", icon: Brain, tone: "bg-lilac", progress: 47, status: "과몰입 직전", lastAction: "Agents SDK 글 읽음", nextAction: "한 문장으로 요약" },
  { id: "debt", name: "빚 청산 흐름", icon: WalletCards, tone: "bg-cloud", progress: 54, status: "하나씩 줄이는 중", lastAction: "이번 달 상환 체크", nextAction: "자동이체 날짜 확인" },
  { id: "health", name: "건강 흐름", icon: Dumbbell, tone: "bg-leaf", progress: 24, status: "몸만 일으키면 됨", lastAction: "물 한 컵 마심", nextAction: "목 스트레칭 30초" }
];

export const focusMissions = [
  { title: "5분만 영상 타임라인 보기", tag: "생각 금지 시작", minutes: 5 },
  { title: "병원 예약 시간만 확인", tag: "몸만 움직이기", minutes: 3 },
  { title: "AI 글 하나 저장하고 닫기", tag: "탐색을 자산으로", minutes: 8 }
];

export const stamps = [
  { label: "오늘도 살아남음", color: "bg-cloud", emoji: "☁" },
  { label: "AI 공부 완료", color: "bg-lilac", emoji: "AI" },
  { label: "빚 갚기 진행중", color: "bg-butter", emoji: "₩" },
  { label: "영상 업로드 성공", color: "bg-peach", emoji: "▶" },
  { label: "생각 정리 완료", color: "bg-leaf", emoji: "✓" }
];

export const timeline = [
  { time: "09:30", label: "병원 가방 챙기기", mood: "가볍게" },
  { time: "13:00", label: "영상 편집 5분 진입", mood: "작게" },
  { time: "17:20", label: "상환 현황 확인", mood: "압박 없이" },
  { time: "22:10", label: "머릿속 메모 털기", mood: "정리" }
];

export const researchCards = [
  { icon: Search, title: "트위터 정보 탐색", note: "흥미 주제는 저장 후 요약" },
  { icon: Camera, title: "영상 아이디어", note: "번뜩임을 바로 흐름에 연결" },
  { icon: HeartPulse, title: "감정 패턴", note: "불안할 때의 회피 루프 기록" }
];

export const situationStickers = [
  { id: "plan", title: "오늘 계획 세우기", speech: "오늘도 화이팅!", scene: "laptop", tone: "bg-cloud", note: "아침에 흐름을 3개만 꺼내기" },
  { id: "todo", title: "투두리스트 작성", speech: "할 일 체크!", scene: "memo", tone: "bg-butter", note: "완료보다 다음 행동을 작게 쓰기" },
  { id: "ai-study", title: "AI 공부 / 프롬프트 공부", speech: "AI 공부 진입!", scene: "book", tone: "bg-lilac", note: "읽은 글은 한 문장만 남기기" },
  { id: "edit", title: "영상 편집하기", speech: "영상 편집중!", scene: "monitor", tone: "bg-peach", note: "타임라인을 여는 것만으로 시작" },
  { id: "research", title: "트위터 정보 탐색", speech: "끝장 탐색중", scene: "phone", tone: "bg-cloud", note: "수집은 저장 후 흐름에 연결" },
  { id: "debt", title: "빚 현황 정리하기", speech: "빚, 꼭 갚는다!", scene: "payment", tone: "bg-leaf", note: "숫자 확인 하나면 오늘은 충분" },
  { id: "diary", title: "일기 / 감사일기 쓰기", speech: "오늘도 나에게 솔직하게", scene: "diary", tone: "bg-lilac", note: "문장이 아니어도 감정 하나 남기기" },
  { id: "rest", title: "꿀잠 자기", speech: "폭 자고 내일 화이팅!", scene: "sleep", tone: "bg-cloud", note: "회복도 흐름 유지의 일부" },
  { id: "praise", title: "스스로 칭찬해주기", speech: "나 잘하고 있어!", scene: "quokka", tone: "bg-peach", note: "작은 완료를 도장으로 남기기" }
] as const;
