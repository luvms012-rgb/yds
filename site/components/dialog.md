<!-- https://luvms012-rgb.github.io/yds/site/components/dialog.html -->

# Dialog

화면 위에 창을 띄워 입력이나 확인을 받는 컴포넌트입니다. 반드시 확인이 필요한 메시지는 Alert Dialog를 사용하세요.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<dialog class="ds-dialog" id="dlg" aria-labelledby="dlg-title" [data-size="large"]>
  <div class="ds-dialog__header">
    <h2 class="ds-dialog__title" id="dlg-title">제목</h2>
    [<p class="ds-dialog__desc">설명</p>]
    [<button class="ds-dialog__close" data-ds-close aria-label="닫기"></button>]
  </div>
  <div class="ds-dialog__body">…</div>
  [<div class="ds-dialog__footer"><button class="ds-btn" data-variant="neutralSolid" data-size="large">확인</button></div>]
</dialog>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Header** `ds-dialog__header` | 제목과 닫기 버튼이 놓이는 상단 영역입니다. |
| **Title** `ds-dialog__title` | 제목입니다. |
| **Desc** `ds-dialog__desc` | 제목을 보충하는 설명입니다. |
| **Close** `ds-dialog__close` | 닫기 버튼입니다. |
| **Body** `ds-dialog__body` | 본문이 들어가는 영역입니다. |
| **Footer** `ds-dialog__footer` | 버튼이나 보조 정보가 놓이는 하단 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

그 밖에: size(480/800), `--ds-dialog-width`

## 동작

`ybm-ds.js`를 불러오면 자동으로 동작합니다.

- data-ds-open / data-ds-close 속성으로 열고 닫기, 바깥(dim) 클릭 닫기

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 하단 주요 버튼은 Action Button large(52)를 사용합니다. |
| **Do** | Popover는 버튼 옆에 뜨는 작은 창이고, 바깥을 누르면 닫힙니다. |
| **Do** | 화면을 막고 확인받아야 할 때는 Dialog를 사용합니다. |
| **Do** | 화면 폭이 768보다 좁으면 Bottom Sheet로 전환합니다. 헤더, 본문, 버튼 구조는 그대로 유지합니다. |
| **Do** | 제목만 보고 무엇을 묻는지 알 수 있게 작성합니다. |
| **Do** | 입력이 있는 창은 바깥을 눌러도 닫히지 않게 합니다. |
| **Do** | 짧은 알림에는 Snackbar나 Callout을 사용합니다. |
| **Don't** | 상단 닫기 버튼과 하단 취소 버튼을 함께 사용하지 않습니다. 정보만 표시할 때는 상단 닫기 버튼을 사용합니다. 폼이나 설정처럼 주요 동작이 있으면 하단 취소 버튼을 사용합니다. |
| **Don't** | 창 위에 다른 창을 겹쳐 열지 않습니다. 단계가 필요하면 한 창 안에서 나눕니다. |

## 예시

### 읽기 전용 내용은 상단 닫기 버튼으로

환불 규정처럼 읽기만 하는 내용은 상단 닫기 버튼 하나로 닫습니다. 하단에 확인이나 취소 버튼을 추가하지 않아 닫는 방법을 하나로 유지합니다.

```html
<div class="u-flex u-center u-between u-gap-3 u-full" style="max-width: 420px">
  <p class="ds-t04 ds-fg-muted">결제 전에 환불 규정을 확인해 주세요.</p>
  <button class="ds-btn" data-variant="neutralWeak" data-size="small" data-ds-open="dialog-ex1">환불 규정 보기</button>
</div>
<dialog class="ds-dialog" id="dialog-ex1" aria-labelledby="dialog-ex1-title">
  <div class="ds-dialog__header">
    <h2 class="ds-dialog__title" id="dialog-ex1-title">환불 규정</h2>
    <button class="ds-dialog__close" data-ds-close aria-label="닫기"></button>
  </div>
  <div class="ds-dialog__body">
    <ul class="u-col u-gap-2 ds-t05">
      <li>수강을 시작하기 전에는 모두 돌려받아요.</li>
      <li>수강을 시작한 뒤 7일 안에는 들은 강의만큼 빼고 돌려받아요.</li>
      <li>7일이 지나면 환불할 수 없어요.</li>
    </ul>
  </div>
</dialog>
```

### 입력 폼은 하단에 저장과 취소

새 배송지를 입력하고 저장하는 것처럼 주요 동작이 있으면 하단에 저장과 취소 버튼을 배치하고 상단 닫기 버튼은 뺍니다. 하단 버튼은 Action Button large를 사용합니다.

```html
<button class="ds-btn" data-variant="neutralOutline" data-ds-open="dialog-ex2">
  <i class="ds-icon ds-icon--plus" aria-hidden="true"></i>배송지 추가
</button>
<dialog class="ds-dialog" id="dialog-ex2" aria-labelledby="dialog-ex2-title">
  <div class="ds-dialog__header">
    <h2 class="ds-dialog__title" id="dialog-ex2-title">새 배송지</h2>
    <p class="ds-dialog__desc">주문할 때 바로 고를 수 있어요.</p>
  </div>
  <div class="ds-dialog__body">
    <div class="u-col u-gap-5">
      <div class="ds-field">
        <div class="ds-field__header">
          <label class="ds-field__label" for="dialog-ex2-name">배송지 이름</label>
          <span class="ds-field__required" aria-hidden="true"></span>
        </div>
        <div class="ds-input" data-variant="outline">
          <input class="ds-input__control" id="dialog-ex2-name" placeholder="예: 회사" required>
        </div>
      </div>
      <div class="ds-field">
        <div class="ds-field__header">
          <label class="ds-field__label" for="dialog-ex2-person">받는 분</label>
          <span class="ds-field__required" aria-hidden="true"></span>
        </div>
        <div class="ds-input" data-variant="outline">
          <input class="ds-input__control" id="dialog-ex2-person" placeholder="이름을 입력해 주세요" required>
        </div>
      </div>
    </div>
  </div>
  <div class="ds-dialog__footer">
    <button class="ds-btn" data-variant="neutralWeak" data-size="large" data-ds-close>취소</button>
    <button class="ds-btn" data-variant="brandSolid" data-size="large" data-ds-close>저장</button>
  </div>
</dialog>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-dialog-width` | `480px` |
| `--ds-dialog-radius` | `var(--ds-shape-2xl)` |
| `--ds-dialog-max-height` | `80vh` |

### 크기와 여백

```
Figma: 폭 480(large 800) / shape/2xl / bg/layer-floating / 그림자 없음(2026-10-01 결정)
  header 24/20/16/20 / gap x4 / title t07 Bold(Alert Dialog 와 같게, 2026-11-02) fg/neutral / desc t05 fg/neutral-muted
  body 12/20/16/20(아래쪽 버튼이 없으면 아래 24) / min-h64 / footer 24/20 / Action Button large
  버튼이 둘이면 가로로 2등분합니다(취소 왼쪽, 주요 동작 오른쪽). 글이 길어 한 줄에 들어가지 않으면 footer에 data-action="stacked"를 붙여 세로로 쌓습니다
  닫기 40×40 / 위 18 / 오른쪽 10 / Lucide/x 24 fg/neutral
```
