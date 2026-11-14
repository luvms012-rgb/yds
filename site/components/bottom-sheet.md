<!-- https://luvms012-rgb.github.io/yds/site/components/bottom-sheet.html -->

# Bottom Sheet

화면 아래에서 올라오는 창입니다. 현재 화면을 유지하면서 추가 정보나 동작을 제공할 때 사용합니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<dialog class="ds-bottomsheet" aria-labelledby="bs-t" [data-header-align="center"] [data-handle]>
  <div class="ds-bottomsheet__header">
    <h2 class="ds-bottomsheet__title" id="bs-t">제목</h2>
    [<p class="ds-bottomsheet__desc">설명</p>]
    [<button class="ds-bottomsheet__close" data-ds-close aria-label="닫기"></button>]
  </div>
  <div class="ds-bottomsheet__body">…</div>
  [<div class="ds-bottomsheet__footer"><button class="ds-btn" data-variant="neutralSolid" data-size="large">확인</button></div>]
</dialog>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Header** `ds-bottomsheet__header` | 제목과 닫기 버튼이 놓이는 상단 영역입니다. |
| **Title** `ds-bottomsheet__title` | 제목입니다. |
| **Desc** `ds-bottomsheet__desc` | 제목을 보충하는 설명입니다. |
| **Close** `ds-bottomsheet__close` | 닫기 버튼입니다. |
| **Body** `ds-bottomsheet__body` | 본문이 들어가는 영역입니다. |
| **Footer** `ds-bottomsheet__footer` | 버튼이나 보조 정보가 놓이는 하단 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `header-align` | center |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 몇 가지 동작 중 하나를 선택할 때는 Menu Sheet를 사용합니다. |
| **Do** | 입력이나 긴 내용은 Bottom Sheet에 담습니다. |
| **Do** | 되돌릴 수 없는 동작은 critical로 따로 묶습니다. |
| **Do** | PC 화면 옆에 보조 내용이나 필터를 둘 때 Side Panel을 사용합니다. |
| **Do** | 화면이 좁으면 Bottom Sheet로 전환합니다. |
| **Do** | 안내 한 줄과 버튼만 있는 시트는 `data-header-align="center"`로 제목을 가운데 정렬합니다. |
| **Do** | 내용이 길면 단계별 시트로 나누고, 겹치는 시트는 2개까지 둡니다. |

## 예시

### 목록 정렬 선택

값을 선택한 뒤 적용 버튼을 눌러 반영하는 경우 Bottom Sheet를 사용합니다. 상단에 닫기 버튼이 있으므로 하단에는 적용 버튼 하나만 배치합니다.

```html
<div class="u-flex u-center u-between" style="width: 100%; max-width: 375px">
  <span class="ds-t04 ds-fg-muted">상품 128개</span>
  <button type="button" class="ds-chip" data-variant="outlineWeak" data-size="small" aria-haspopup="dialog" data-ds-open="bottom-sheet-ex1">최신순<i class="ds-icon ds-icon--chevron-down" aria-hidden="true"></i></button>
</div>
<dialog class="ds-bottomsheet" id="bottom-sheet-ex1" aria-labelledby="bottom-sheet-ex1-title" data-handle>
  <div class="ds-bottomsheet__header">
    <h2 class="ds-bottomsheet__title" id="bottom-sheet-ex1-title">정렬</h2>
    <button class="ds-bottomsheet__close" data-ds-close aria-label="닫기"></button>
  </div>
  <div class="ds-bottomsheet__body">
    <div class="ds-radio-group" role="radiogroup" aria-labelledby="bottom-sheet-ex1-title">
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="bottom-sheet-ex1-sort" checked><span>최신순</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="bottom-sheet-ex1-sort"><span>인기순</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="bottom-sheet-ex1-sort"><span>낮은 가격순</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="bottom-sheet-ex1-sort"><span>높은 가격순</span></label>
    </div>
  </div>
  <div class="ds-bottomsheet__footer">
    <button class="ds-btn" data-variant="neutralSolid" data-size="large" data-ds-close>적용</button>
  </div>
</dialog>
```

### 직접 입력도 가능한 선택

선택지 외에 직접 입력할 수도 있는 값은 Field Button으로 Bottom Sheet를 열어 입력받습니다. Menu Sheet는 몇 가지 동작 중 하나를 선택할 때만 사용하고, 입력이 있으면 Bottom Sheet를 사용합니다.

```html
<div class="ds-field" style="width: 100%; max-width: 375px">
  <div class="ds-field__header"><span class="ds-field__label" id="bottom-sheet-ex2-label">배송 요청 사항</span></div>
  <button type="button" class="ds-fieldbutton" data-size="large" aria-labelledby="bottom-sheet-ex2-label bottom-sheet-ex2-value" aria-haspopup="dialog" data-ds-open="bottom-sheet-ex2">
    <span class="ds-fieldbutton__value" id="bottom-sheet-ex2-value">문 앞에 놓아 주세요</span>
    <i class="ds-icon ds-icon--chevron-down" aria-hidden="true"></i>
  </button>
</div>
<dialog class="ds-bottomsheet" id="bottom-sheet-ex2" aria-labelledby="bottom-sheet-ex2-title" data-handle>
  <div class="ds-bottomsheet__header">
    <h2 class="ds-bottomsheet__title" id="bottom-sheet-ex2-title">배송 요청 사항</h2>
    <button class="ds-bottomsheet__close" data-ds-close aria-label="닫기"></button>
  </div>
  <div class="ds-bottomsheet__body">
    <div class="u-col u-gap-3">
      <div class="ds-radio-group" role="radiogroup" aria-labelledby="bottom-sheet-ex2-title">
        <label class="ds-radio"><input type="radio" class="ds-radio__control" name="bottom-sheet-ex2-request" checked><span>문 앞에 놓아 주세요</span></label>
        <label class="ds-radio"><input type="radio" class="ds-radio__control" name="bottom-sheet-ex2-request"><span>경비실에 맡겨 주세요</span></label>
        <label class="ds-radio"><input type="radio" class="ds-radio__control" name="bottom-sheet-ex2-request"><span>직접 받을게요</span></label>
        <label class="ds-radio"><input type="radio" class="ds-radio__control" name="bottom-sheet-ex2-request"><span>직접 적을게요</span></label>
      </div>
      <textarea class="ds-textarea" data-size="medium" rows="2" placeholder="예: 벨을 누르지 말아 주세요" aria-label="배송 요청 사항 직접 적기"></textarea>
    </div>
  </div>
  <div class="ds-bottomsheet__footer">
    <button class="ds-btn" data-variant="neutralSolid" data-size="large" data-ds-close>저장</button>
  </div>
</dialog>
```

## 규격

### 크기와 여백

```
headerAlign: left(기본) / center   handle: data-handle
Figma: 폭 채움 / 위쪽 shape/3xl / bg/layer-floating
  header 24/20/16/20 / gap x2 / title t07 SemiBold / desc t05 fg/neutral-muted
  body 12/20/16/20 / min-h64 / footer 16/20/24/20 / 닫기 40×40(위 18 / 오른쪽 10) / handle 36×4 palette/gray-400 (위 6)
```
