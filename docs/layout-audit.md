# 같은 기능, 다른 모양 점검표 (2026-11-12)

README 6.1 "같은 기능, 다른 모양" 규칙으로 84개 컴포넌트의 `data-*` 속성을 훑은 결과다. 원본 목록은 components.css 각 컴포넌트 블록의 선택자에서 뽑았다. 고칠지는 사용자가 고른다. 화면이 바뀌는 것은 고치기 전에 전후 캡처를 보여 준다.

## A. 속성 이름이 뜻과 다른 곳 (2026-11-12 모두 바꿈, 예전 이름도 CSS 와 ybm-ds.js 가 계속 읽는다)

| # | 컴포넌트 | 지금 | 제안 | 까닭 |
|---|---|---|---|---|
| A1 | Snackbar | `data-variant="positive/critical"`, JS `{ variant }` | `data-tone`, JS `{ tone }` | 의미 색은 Badge, Callout, Banner 처럼 tone |
| A2 | Pagination | `data-type="simple"` | `data-layout="simple"` (쪽 항목의 `data-type="ellipsis"` 는 그대로) | 쪽 번호를 늘어놓는 구조 차이 |
| A3 | File Attach | `data-type="image"` | `data-layout="image"` | 같은 첨부를 사진 칸으로 보여 주는 구조 차이 |
| A4 | Toolbar | `data-position="floating"` | `data-layout="floating"` | 떠 있는 막대는 구조 차이 |
| A5 | Accordion | `data-variant="separated"` | `data-layout="separated"` | 붙은 목록과 떨어진 카드는 구조 차이 |
| A6 | List | `data-variant="inset"` | `data-inset` (켜기) | Tabs, Chip Tabs, Divider 는 이미 `data-inset` |
| A7 | Select Box | `data-layout="vertical"` | `data-orientation="vertical"` | 방향은 Stepper, Divider 처럼 orientation |
| A8 | Action Button | `data-width="fill"` | `data-layout="fill"` | Quantity Picker, Segmented 는 `data-layout="fill"` |
| A9 | Table | `data-density="compact"` | `data-size="small"` | List, Tree 는 `data-size="small"` |
| A10 | Progress Circle | `data-type="indeterminate"` | `data-indeterminate` (켜기) | Checkbox 와 같은 이름 |
| A11 | Chat | `data-variant="divider"` | `data-layout="divider"` | 같은 시스템 줄을 가운데 선으로 보여 주는 구조 차이 |

## B. 이름은 맞지만 값이 섞인 곳 (정리 후보, 화면 변화 없음)

| # | 컴포넌트 | 지금 | 메모 |
|---|---|---|---|
| B1 | Alert Dialog / Dialog | `data-action="pair/critical/nonpreferred/stacked"` | 버튼 배치(pair, stacked)와 색(critical)이 한 속성에 섞임 |
| B2 | Switch, Avatar, Progress Circle | `data-size` 가 숫자(16/32, 40/56) | 다른 컴포넌트는 small/medium/large |
| B3 | Tag Group | `data-size="t4"` | 글자 토큰 이름이 크기 값으로 쓰임 |
| B4 | Top App Bar | `data-platform="android"` | 플랫폼별 구조라 layout 후보이나 쓰임이 분명해 그대로 두어도 됨 |
| B5 | Chart, Citation | `data-type="bar"`, `data-type="number"` | 차트 종류와 출처 표기는 흔히 type 으로 부름, 예외로 둘지 결정 |

## C. 같은 일을 하는 다른 컴포넌트 (레퍼런스 가이드에서도 따로라 그대로 두고, 페이지마다 "고르는 법"으로 잇는다)

| 하는 일 | 컴포넌트 | 고르는 기준 |
|---|---|---|
| 보기 바꾸기 | Tabs, Chip Tabs, Segmented Control | 화면 전체 / 목록 거르기 / 2~4개 짧은 선택 |
| 하나 고르기 | Radio Group, Select Box, Select Trigger | 늘어놓기 / 큰 카드 / 접힌 목록 |
| 켜고 끄기 | Switch, Checkbox, Toggle Button | 바로 반영 / 저장 버튼 있음 / 도구 막대 |
| 알림 | Snackbar, Banner, Callout | 잠깐 / 화면 위 고정 / 내용 안 |
| 동작 목록 | Menu, Menu Sheet | PC / 모바일 |
| 덮는 창 | Dialog, Bottom Sheet, Side Panel | 짧은 확인 / 모바일 아래 / 옆 작업 |

## D. 이미 규칙대로인 곳

- Carousel: `data-layout="overlay/bar"`, 동작 `data-autoplay`, `data-loop`, 크기는 변수.
- Action Button, Chip, Floating Action Button: `data-layout="iconOnly"`.
- 입력 칸 모양: Text Field `variant=outline`, Textarea `variant=underline`, Search Field `variant=fill`, Segmented Text Input `variant=outline`.
