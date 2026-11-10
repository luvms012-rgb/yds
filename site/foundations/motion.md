<!-- https://luvms012-rgb.github.io/yds/site/foundations/motion.html -->

# Motion

움직임은 화면의 변화를 자연스럽게 이어 줍니다.

## 개요

버튼 색처럼 작은 반응은 짧게, 시트처럼 화면이 크게 바뀌는 움직임은 조금 길게 설정합니다. 들어오는 요소는 `enter`, 나가는 요소는 `exit` 곡선을 사용합니다.

## 길이

| 토큰 | 값 |
| --- | --- |
| `--ds-duration-fast` | `150ms` |
| `--ds-duration-normal` | `200ms` |
| `--ds-duration-slow` | `300ms` |

## 속도 곡선

| 토큰 | 값 |
| --- | --- |
| `--ds-easing-standard` | `cubic-bezier(0.35, 0, 0.35, 1)` |
| `--ds-easing-emphasized` | `cubic-bezier(0.03, 0.4, 0.1, 1)` |
| `--ds-easing-enter` | `cubic-bezier(0, 0, 0.15, 1)` |
| `--ds-easing-exit` | `cubic-bezier(0.35, 0, 1, 1)` |

## 코드에서 쓰기

움직임 줄이기 설정을 켠 사용자에게는 움직임을 제거합니다.

```css
.my-sheet {
  transition: transform var(--ds-duration-slow) var(--ds-easing-emphasized);
}
@media (prefers-reduced-motion: reduce) {
  .my-sheet { transition: none; }
}
```

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 화면의 변화를 자연스럽게 이어 줄 때만 움직임을 사용합니다. |
| **Do** | 움직임 줄이기 설정을 따릅니다. |
| **Don't** | 시선을 끌기 위한 장식용 움직임은 넣지 않습니다. |
