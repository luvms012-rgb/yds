<!-- https://luvms012-rgb.github.io/yds/site/components/skeleton.html -->

# Skeleton

콘텐츠를 불러오는 동안 나타날 요소의 윤곽을 미리 표시하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<span class="ds-skeleton" style="width:220px;height:16px"></span>
<span class="ds-skeleton" data-shape="circle" style="--ds-skeleton-size:48px"></span>
<span class="ds-skeleton" data-shape="text"></span>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `shape` | rect circle text |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 목록이나 카드처럼 곧 나타날 모양을 미리 표시할 수 있는 곳에 사용합니다. |
| **Do** | 모서리는 나중에 들어올 콘텐츠와 똑같이 맞춥니다. |
| **Do** | 로딩이 1~10초 걸리고 모양을 미리 표시할 수 있으면 Skeleton을 사용합니다. 1~4초 동안 기다림만 알리면 될 때는 Progress Circle을 사용합니다. |
| **Do** | 로딩이 길어지면 Skeleton을 오류 안내나 Empty로 바꿉니다. |
| **Don't** | Progress Circle과 함께 사용하지 않습니다. 같은 로딩을 두 번 알리게 됩니다. |

## 예시

### 목록 모양에 맞춘 Skeleton

목록을 불러오는 동안 줄마다 사진, 제목, 설명 자리를 Skeleton으로 미리 표시합니다. 곧 나타날 모양을 알 수 있고, 내용이 들어와도 줄 높이가 같아 화면이 흔들리지 않습니다.

```html
<ul class="ds-list u-full" data-inset data-divider aria-busy="true" aria-label="강의 목록 불러오는 중" style="max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__prefix"><span class="ds-skeleton" style="width: 48px; height: 48px"></span></span>
      <span class="ds-list-item__content u-gap-2">
        <span class="ds-skeleton" style="width: 60%; height: 16px"></span>
        <span class="ds-skeleton" style="width: 35%; height: 12px"></span>
      </span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__prefix"><span class="ds-skeleton" style="width: 48px; height: 48px"></span></span>
      <span class="ds-list-item__content u-gap-2">
        <span class="ds-skeleton" style="width: 72%; height: 16px"></span>
        <span class="ds-skeleton" style="width: 40%; height: 12px"></span>
      </span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__prefix"><span class="ds-skeleton" style="width: 48px; height: 48px"></span></span>
      <span class="ds-list-item__content u-gap-2">
        <span class="ds-skeleton" style="width: 52%; height: 16px"></span>
        <span class="ds-skeleton" style="width: 30%; height: 12px"></span>
      </span>
    </div>
  </li>
</ul>
```

### 긴 글은 줄 모양으로 표시

공지 본문처럼 여러 줄 글이 들어올 자리는 `data-shape="text"`로 줄 모양을 표시합니다. 같은 자리에 Progress Circle을 함께 표시하면 로딩을 두 번 알리게 되므로 Skeleton만 사용합니다.

```html
<article class="u-col u-gap-4 u-full" aria-busy="true" aria-label="공지 불러오는 중" style="max-width: 420px">
  <div class="u-col u-gap-2">
    <span class="ds-skeleton" style="width: 75%; height: 24px"></span>
    <span class="ds-skeleton" style="width: 35%; height: 14px"></span>
  </div>
  <hr class="ds-divider">
  <span class="ds-skeleton" data-shape="text"></span>
  <span class="ds-skeleton" data-shape="text"></span>
</article>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-skeleton-color` | `var(--ds-color-bg-neutral-weak-alpha)` |
| `--ds-skeleton-radius` | `var(--ds-shape-sm)` |
| `--ds-skeleton-size` | `48px` |

### 크기와 여백

```
shape: rectangle(기본) / circle / text
Figma: bg/neutral-weak-alpha(2026-11-11 반투명) / rectangle shape/sm / circle pill / text 늘 3줄, 줄 높이 14 / 줄 사이 x2 / 마지막 줄 64%
모서리(2026-11-03): --ds-skeleton-radius로 나중에 표시될 콘텐츠와 모서리를 맞춥니다
움직임 줄이기(2026-11-03): 설정을 켠 사용자에게는 깜빡임을 표시하지 않습니다
```
