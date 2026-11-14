<!-- https://luvms012-rgb.github.io/yds/site/components/snackbar.html -->

# Snackbar

작업 결과를 화면 아래에 잠시 표시하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-snackbar" role="status" data-tone="positive" data-state="open">
  <i class="ds-icon ds-icon--circle-check-solid" aria-hidden="true"></i>
  <span class="ds-snackbar__message">저장했어요</span>
  [<button type="button" class="ds-snackbar__action">확인</button>]
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Message** `ds-snackbar__message` | 전달할 내용을 담은 텍스트입니다. |
| **Action** `ds-snackbar__action` | 바로 실행하는 작은 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `tone` | positive critical |

## 동작

`ybm-ds.js`를 불러오면 자동으로 동작합니다.

- DS.snackbar("문구", { tone: "positive"|"critical", action: "확인", onAction, duration })

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 4초 동안 표시하고, 한 번에 하나만 띄웁니다. |
| **Do** | 요청이 실패하면 실패 이유를 짧게 적고 다시 시도 버튼을 함께 둡니다. |
| **Do** | 결과만 몇 단어로 알립니다. |
| **Do** | 되돌릴 수 있는 작업에는 "실행 취소" 버튼을 제공합니다. |
| **Do** | 입력 오류는 입력 필드 아래 안내 글로, 작업을 막는 오류는 Banner로 알립니다. 이때 Snackbar는 사용하지 않습니다. |

## 예시

### 저장 결과 안내

저장 버튼을 누르면 화면 아래에 결과를 한 줄로 안내합니다. 4초 뒤 자동으로 사라지므로 사용자가 닫지 않아도 되는 알림에 사용합니다.

```html
<div class="u-col u-gap-5" style="width: 100%; max-width: 360px">
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="snackbar-ex1-name">닉네임</label>
    </div>
    <div class="ds-input" data-variant="outline">
      <input class="ds-input__control" id="snackbar-ex1-name" value="하늘빛공부">
    </div>
    <div class="ds-field__footer">
      <p class="ds-field__help">게시판과 댓글에 보이는 이름이에요.</p>
    </div>
  </div>
  <button type="button" class="ds-btn" data-size="large" data-layout="fill" onclick="DS.snackbar('저장했어요', { tone: 'positive' })">저장</button>
</div>
```

### 삭제 직후 되돌리기 제공

알림을 삭제하면 되돌리기 버튼 하나와 함께 안내합니다. 확인 창으로 흐름을 막지 않으면서 실수를 바로잡을 방법을 제공할 때 사용합니다.

```html
<ul class="ds-list" data-inset data-divider style="width: 100%; max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">주문한 상품이 출발했어요</span>
        <span class="ds-list-item__desc">오늘 오전 9:12</span>
      </span>
      <span class="ds-list-item__suffix">
        <button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" aria-label="알림 지우기" onclick="DS.snackbar('알림을 지웠어요', { action: '되돌리기' })"><i class="ds-icon ds-icon--trash" aria-hidden="true"></i></button>
      </span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">할인 쿠폰이 3일 뒤 사라져요</span>
        <span class="ds-list-item__desc">어제 오후 6:30</span>
      </span>
      <span class="ds-list-item__suffix">
        <button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" aria-label="알림 지우기" onclick="DS.snackbar('알림을 지웠어요', { action: '되돌리기' })"><i class="ds-icon ds-icon--trash" aria-hidden="true"></i></button>
      </span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">1:1 문의에 답변이 달렸어요</span>
        <span class="ds-list-item__desc">11월 2일</span>
      </span>
      <span class="ds-list-item__suffix">
        <button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" aria-label="알림 지우기" onclick="DS.snackbar('알림을 지웠어요', { action: '되돌리기' })"><i class="ds-icon ds-icon--trash" aria-hidden="true"></i></button>
      </span>
    </div>
  </li>
</ul>
```

## 규격

### 크기와 여백

```
variant: default / positive / critical
Figma: padding x2_5(+본문 좌우 x1_5) / min-h44 / max-w560 / shape/sm / bg/neutral-solid / elevation overlay
       message t04 fg/on-neutral-solid / action t04 Bold / gap x2_5 / 아이콘 Solid 24
       positive 아이콘 bg/positive-solid / critical 아이콘 bg/critical-solid
```
