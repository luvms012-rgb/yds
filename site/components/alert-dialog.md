<!-- https://luvms012-rgb.github.io/yds/site/components/alert-dialog.html -->

# Alert Dialog

진행 중인 작업을 멈추고 중요한 확인을 받는 창입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<dialog class="ds-dialog ds-alertdialog" role="alertdialog" aria-labelledby="a-t" aria-describedby="a-d">
  <div class="ds-alertdialog__header"><h2 id="a-t" class="ds-alertdialog__title">제목</h2><p id="a-d" class="ds-alertdialog__desc">이 작업은 되돌릴 수 없습니다.</p></div>
  <div class="ds-alertdialog__footer" data-action="pair">
    <button class="ds-btn" data-variant="neutralWeak" data-ds-close>취소</button>
    <button class="ds-btn" data-variant="neutralSolid">확인</button>
  </div>
</dialog>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Header** `ds-alertdialog__header` | 제목과 닫기 버튼이 놓이는 상단 영역입니다. |
| **Title** `ds-alertdialog__title` | 제목입니다. |
| **Desc** `ds-alertdialog__desc` | 제목을 보충하는 설명입니다. |
| **Footer** `ds-alertdialog__footer` | 버튼이나 보조 정보가 놓이는 하단 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `action` | pair critical nonpreferred |

그 밖에: 272 폭

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 되돌릴 수 없는 작업을 확인받을 때 사용합니다. |
| **Do** | 바깥을 눌러도 닫히지 않고 버튼으로만 닫힙니다. |
| **Do** | 설명에는 버튼을 누르면 일어나는 결과를 적습니다. |
| **Do** | 처음 포커스는 취소 버튼에 둡니다. |
| **Don't** | 작업이 끝날 때까지 창을 닫지 않습니다. |

## 예시

### 삭제 전 확인

되돌릴 수 없는 삭제는 Alert Dialog로 확인받고, 실행 버튼은 criticalSolid를 사용합니다. 바깥을 눌러도 닫히지 않아 버튼을 눌러야만 다음으로 진행됩니다.

```html
<ul class="ds-list" data-inset style="width: 100%; max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">회사</span>
        <span class="ds-list-item__desc">서울시 중구 한빛로 12, 3층</span>
      </span>
      <span class="ds-list-item__suffix"><button class="ds-btn" data-variant="ghost" data-size="small" data-ds-open="alert-dialog-ex1">삭제</button></span>
    </div>
  </li>
</ul>
<dialog class="ds-dialog ds-alertdialog" id="alert-dialog-ex1" role="alertdialog" aria-labelledby="alert-dialog-ex1-title" aria-describedby="alert-dialog-ex1-desc">
  <div class="ds-alertdialog__header">
    <h2 id="alert-dialog-ex1-title" class="ds-alertdialog__title">배송지를 삭제할까요?</h2>
    <p id="alert-dialog-ex1-desc" class="ds-alertdialog__desc">삭제한 배송지는 되돌릴 수 없어요.</p>
  </div>
  <div class="ds-alertdialog__footer" data-action="critical">
    <button class="ds-btn" data-variant="neutralWeak" data-ds-close>취소</button>
    <button class="ds-btn" data-variant="criticalSolid" data-ds-close>삭제</button>
  </div>
</dialog>
```

### 작성 중 나가기 확인

작성 중인 내용이 사라지는 동작 전에 한 번 더 확인하고, 두 버튼은 가로(`pair`)로 나란히 배치합니다. 확인 버튼에는 "나가기"처럼 실제로 일어나는 동작을 적습니다.

```html
<div style="width: 100%; max-width: 375px">
  <header class="ds-appbar" data-platform="android">
    <div class="ds-appbar__left"></div>
    <div class="ds-appbar__main"><h1 class="ds-appbar__title">후기 쓰기</h1></div>
    <div class="ds-appbar__right">
      <button type="button" class="ds-appbar__button" aria-label="닫기" data-ds-open="alert-dialog-ex2"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    </div>
  </header>
  <textarea class="ds-textarea" rows="4" aria-label="후기">배송이 빠르고 포장도 꼼꼼했어요.</textarea>
</div>
<dialog class="ds-dialog ds-alertdialog" id="alert-dialog-ex2" role="alertdialog" aria-labelledby="alert-dialog-ex2-title" aria-describedby="alert-dialog-ex2-desc">
  <div class="ds-alertdialog__header">
    <h2 id="alert-dialog-ex2-title" class="ds-alertdialog__title">후기 쓰기를 그만둘까요?</h2>
    <p id="alert-dialog-ex2-desc" class="ds-alertdialog__desc">지금 나가면 쓴 내용이 사라져요.</p>
  </div>
  <div class="ds-alertdialog__footer" data-action="pair">
    <button class="ds-btn" data-variant="neutralWeak" data-ds-close>계속 쓰기</button>
    <button class="ds-btn" data-variant="neutralSolid" data-ds-close>나가기</button>
  </div>
</dialog>
```

### 긴 버튼 문구는 세로 배치

버튼 문구가 길어 가로 두 칸에 들어가지 않으면 `stacked`로 세로로 쌓습니다. 해지처럼 잃는 것이 있는 동작은 무엇이 사라지는지 설명에 적습니다.

```html
<ul class="ds-list" data-inset data-divider style="width: 100%; max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">멤버십</span>
        <span class="ds-list-item__desc">다음 결제일 12월 1일</span>
      </span>
      <span class="ds-list-item__suffix">월 4,900원</span>
    </div>
  </li>
  <li>
    <button type="button" class="ds-list-item" data-ds-open="alert-dialog-ex3">
      <span class="ds-list-item__content"><span class="ds-list-item__title ds-fg-critical">멤버십 해지</span></span>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </button>
  </li>
</ul>
<dialog class="ds-dialog ds-alertdialog" id="alert-dialog-ex3" role="alertdialog" aria-labelledby="alert-dialog-ex3-title" aria-describedby="alert-dialog-ex3-desc">
  <div class="ds-alertdialog__header">
    <h2 id="alert-dialog-ex3-title" class="ds-alertdialog__title">멤버십을 해지할까요?</h2>
    <p id="alert-dialog-ex3-desc" class="ds-alertdialog__desc">해지하면 남은 쿠폰 2장과 무료 배송 혜택이 사라져요.</p>
  </div>
  <div class="ds-alertdialog__footer" data-action="stacked">
    <button class="ds-btn" data-variant="neutralSolid" data-ds-close>혜택 계속 받기</button>
    <button class="ds-btn" data-variant="neutralWeak" data-ds-close>해지하고 혜택 끝내기</button>
  </div>
</dialog>
```

## 규격

### 크기와 여백

```
action(data-action): single(기본) / pair / critical / stacked / nonpreferred
Figma: 폭 272 / gap x2 / header 20/20/0/20 / gap x1_5 / title t07 Bold / desc t05 fg/neutral-muted
       footer 16/20/20/20 / 버튼 medium / single/stacked 세로 gap x2 / pair/critical 가로 2등분 gap x2 / nonpreferred 세로 gap x4
```
