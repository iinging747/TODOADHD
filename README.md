# 정신차려 이 각박한 세상에서, 그렇게 안 살기 프로젝트

ADHD 사용자의 병렬적 사고와 감정 변동을 통제하지 않고, 흐름으로 보관하고 다시 이어가게 돕는 AI 세컨드 브레인 모바일 앱 프로토타입입니다.

## 포함된 것

- Next.js 앱 구조: `app/`, `components/`, `lib/`
- TailwindCSS 스타일 토큰과 모바일 앱 레이아웃
- Framer Motion 기반 카드/도장/캐릭터 애니메이션
- Zustand 상태 관리 설계
- Recharts 상환 흐름 차트
- Web Speech API 음성 입력 컴포넌트
- 매일 일기 작성과 다음날 AI 코멘트 공간
- 레퍼런스 이미지 감성의 상황별 캐릭터 스티커 팔레트
- 브라우저에서 바로 확인 가능한 `preview.html`

## 실행

Next 앱 실행:

```bash
npm install
npm run dev
```

현재 작업 환경처럼 패키지 매니저가 없을 때 정적 프리뷰 실행:

```bash
node serve-preview.mjs
```

그 다음 브라우저에서 `http://127.0.0.1:4173`을 열면 됩니다.

# TODOADHD

배포 패치 트리거: daily-v23
