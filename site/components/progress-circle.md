<!-- https://luvms012-rgb.github.io/yds/site/components/progress-circle.html -->

# Progress Circle

작업이 진행 중임을 회전하는 원으로 표시하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<span class="ds-progress-circle" data-size="40" data-tone="brand" role="progressbar" aria-valuenow="40" style="--ds-progress-value: 40">
  <svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg>
</span>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Track** `ds-progress-circle__track` | 막대의 바탕입니다. |
| **Range** `ds-progress-circle__range` | 진행률을 표시하는 호입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `tone` | neutral brand staticWhite |
| 켜고 끄는 속성 | `size` `indeterminate` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 로딩은 Progress Circle의 indeterminate로 표시합니다. |
| **Do** | Spinner 컴포넌트는 따로 없습니다. |
| **Do** | staticWhite는 어두운 배경이나 사진 위에서만 사용합니다. |
| **Do** | determinate는 진행률을 실제로 알 수 있을 때만 사용합니다. 모를 때는 indeterminate를 사용합니다. |

## 예시

### 완료 시점을 모를 때는 indeterminate

목록 끝에서 다음 내용을 불러올 때처럼 언제 끝날지 모르면 `data-indeterminate`를 사용합니다. 알 수 없는 진행률을 임의로 채우면 멈춘 것처럼 보입니다.

```html
<div class="u-col u-gap-3 u-full" style="max-width: 420px">
  <ul class="ds-list" data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">겨울 방학 특강 안내</span>
          <span class="ds-list-item__desc">12월 2일</span>
        </span>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">시스템 점검으로 잠시 쉬어요</span>
          <span class="ds-list-item__desc">11월 28일</span>
        </span>
      </a>
    </li>
  </ul>
  <div class="u-flex u-center">
    <span class="ds-progress-circle" data-indeterminate role="progressbar" aria-label="공지를 더 불러오는 중"><svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span>
  </div>
</div>
```

### 진행률을 알 때만 determinate

파일을 내려받을 때처럼 진행 정도를 알 수 있으면 determinate를 사용합니다. 옆에 "72%"처럼 값을 함께 표시해 남은 양을 알려 줍니다.

```html
<ul class="ds-list u-full" data-inset data-divider style="max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__prefix">
        <span class="ds-progress-circle" data-size="40" data-tone="brand" role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" aria-label="3주차 강의 자료 내려받기" style="--ds-progress-value: 72"><svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span>
      </span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">3주차 강의 자료.pdf</span>
        <span class="ds-list-item__desc">24MB 중 17MB, 72%</span>
      </span>
      <span class="ds-list-item__suffix">
        <button type="button" class="ds-btn" data-variant="ghost" data-size="small">취소</button>
      </span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--circle-check-solid" aria-hidden="true"></i></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">2주차 강의 자료.pdf</span>
        <span class="ds-list-item__desc">18MB, 내려받았어요</span>
      </span>
      <span class="ds-list-item__suffix">
        <button type="button" class="ds-btn" data-variant="ghost" data-size="small">열기</button>
      </span>
    </div>
  </li>
</ul>
```

### 사진 위에서는 staticWhite 사용

사진처럼 어두운 바탕 위에서는 `data-tone="staticWhite"`를 사용합니다. 다크 모드에서도 흰색을 유지하므로 사진 위에서 늘 잘 보입니다.

```html
<div class="u-col u-gap-2 u-full" style="max-width: 420px">
  <span class="ds-t05 ds-fw-medium">사진 첨부</span>
  <div class="u-flex u-gap-2">
    <div class="ds-imageframe" data-radius="md" style="width: 96px">
      <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=70" alt="첨부한 사진 1">
    </div>
    <div class="ds-imageframe" data-radius="md" style="width: 96px">
      <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=200&q=70" alt="올리는 중인 사진 2">
      <div class="ds-imageframe__floater" data-position="bottom-end">
        <span class="ds-progress-circle" data-tone="staticWhite" data-indeterminate role="progressbar" aria-label="사진 올리는 중"><svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span>
      </div>
    </div>
  </div>
  <p class="ds-t03 ds-fg-subtle">사진 2장 중 1장을 올리고 있어요</p>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-progress-value` | `40` |

### 크기와 여백

```
tone: neutral(기본) / brand / staticWhite   size: 24(기본) / 40 / 56   type: determinate / indeterminate
  indeterminate: data-indeterminate (회전하는 25% 호, 예전 data-type="indeterminate" 도 읽음)
Figma: 두께 24→3 / 40→5 / 56→7 / 둥근 끝 / 12시 시작
  트랙 bg/neutral-weak-alpha(2026-11-11 모든 색 같음) / neutral 호 palette/gray-500 / brand 호 bg/brand-solid
  staticWhite palette/static-white-alpha-300 + palette/static-white (팔레트를 직접 참조하는 것은 의도된 예외)
```
