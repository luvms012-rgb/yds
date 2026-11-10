<!-- https://luvms012-rgb.github.io/yds/site/components/field-label.html -->

# Field Label

입력 필드에 라벨, 안내 문구, 오류 메시지를 연결해 무엇을 입력할지 안내하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-field" [data-label-weight="bold"]>
  <div class="ds-field__header">
    <label class="ds-field__label" for="id">라벨</label>
    [<span class="ds-field__indicator">선택</span>] [<span class="ds-field__required" aria-hidden="true"></span>]
  </div>
  <div class="ds-input">…</div>
  <div class="ds-field__footer">
    <p class="ds-field__help">설명을 써주세요</p>
    [<p class="ds-field__error">오류 이유</p>]
    [<span class="ds-field__count">0/8</span>]
  </div>
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Header** `ds-field__header` | 제목과 닫기 버튼이 놓이는 상단 영역입니다. |
| **Label** `ds-field__label` | 이름이나 값을 표시하는 텍스트입니다. |
| **Indicator** `ds-field__indicator` | 현재 상태나 위치를 나타내는 표시입니다. |
| **Required** `ds-field__required` | 필수 입력 항목임을 나타내는 표시입니다. |
| **Footer** `ds-field__footer` | 버튼이나 보조 정보가 놓이는 하단 영역입니다. |
| **Help** `ds-field__help` | 입력을 돕는 안내 글입니다. |
| **Error** `ds-field__error` | 잘못된 입력을 알리는 오류 메시지입니다. |
| **Count** `ds-field__count` | 개수나 글자 수를 표시합니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `label-weight` | bold |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 모든 입력 필드에 라벨을 표시합니다. 플레이스홀더를 라벨 대신 사용하지 않습니다. |
| **Do** | 필수 표시는 꼭 입력해야 하는 필드에만 합니다. |

## 예시

### 필수 항목과 선택 항목 구분

필수 입력 필드에는 라벨 옆에 필수 점을, 비워도 되는 필드에는 '선택'을 표시합니다. 필수 점은 스크린 리더가 읽지 않으므로 입력 요소에 `required`를 함께 붙입니다.

```html
<form class="u-col u-gap-5 u-full" style="max-width: 360px">
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="field-label-ex1-name">이름</label>
      <span class="ds-field__required" aria-hidden="true"></span>
    </div>
    <div class="ds-input" data-variant="outline">
      <input class="ds-input__control" id="field-label-ex1-name" placeholder="이름을 입력해 주세요" required>
    </div>
  </div>
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="field-label-ex1-phone">휴대폰 번호</label>
      <span class="ds-field__required" aria-hidden="true"></span>
    </div>
    <div class="ds-input" data-variant="outline">
      <input class="ds-input__control" id="field-label-ex1-phone" type="tel" placeholder="010-0000-0000" required>
    </div>
  </div>
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="field-label-ex1-code">추천인 코드</label>
      <span class="ds-field__indicator">선택</span>
    </div>
    <div class="ds-input" data-variant="outline">
      <input class="ds-input__control" id="field-label-ex1-code" placeholder="코드를 입력해 주세요">
    </div>
    <div class="ds-field__footer">
      <p class="ds-field__help">친구에게 받은 코드가 있으면 넣어 주세요.</p>
    </div>
  </div>
</form>
```

### 오류는 해결 방법까지 안내

입력 요소에 `aria-invalid="true"`를 붙이면 안내 문구가 빨간색 오류 문구로 바뀝니다. 오류 문구에는 무엇이 틀렸는지와 해결 방법을 함께 적습니다.

```html
<div class="ds-field u-full" style="max-width: 360px">
  <div class="ds-field__header">
    <label class="ds-field__label" for="field-label-ex2-mail">이메일</label>
    <span class="ds-field__required" aria-hidden="true"></span>
  </div>
  <div class="ds-input" data-variant="outline">
    <input class="ds-input__control" id="field-label-ex2-mail" type="email" value="hana@example" aria-invalid="true" aria-describedby="field-label-ex2-error" required>
  </div>
  <div class="ds-field__footer">
    <p class="ds-field__help">로그인할 때 쓰는 이메일이에요.</p>
    <p class="ds-field__error" id="field-label-ex2-error">이메일 주소가 끝까지 들어가지 않았어요. 예: hana@example.com</p>
  </div>
</div>
```

### 글자 수 제한은 카운트로 표시

글자 수 제한이 있는 필드는 오른쪽 아래에 현재 글자 수와 최대 글자 수를 표시합니다. 안내 문구는 왼쪽에 배치해 두 정보를 한 줄에서 함께 읽을 수 있습니다.

```html
<div class="ds-field u-full" style="max-width: 420px">
  <div class="ds-field__header">
    <label class="ds-field__label" for="field-label-ex3-text">문의 내용</label>
    <span class="ds-field__required" aria-hidden="true"></span>
  </div>
  <textarea class="ds-textarea" id="field-label-ex3-text" rows="4" maxlength="500" placeholder="궁금한 점을 자세히 적어 주세요" required>주문한 책이 아직 오지 않았어요. 배송 상황을 알려 주세요.</textarea>
  <div class="ds-field__footer">
    <p class="ds-field__help">주민등록번호 같은 개인 정보는 적지 말아 주세요.</p>
    <span class="ds-field__count">33/500</span>
  </div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-field-gap` | `var(--ds-space-x2)` |
| `--ds-field-label-weight` | `var(--ds-font-weight-medium)` |

### 크기와 여백

```
Figma: 세로 gap x2 / label t05 Medium(bold 변형 t05 Bold) fg/neutral / indicator t04 fg/neutral-subtle(좌 4)
       required 점 4×4 fg/critical / footer 좌우 x0_5 / 안내 t04 fg/neutral-subtle / 오류 t04 fg/critical
오류: 입력 요소에 aria-invalid="true"를 붙이면 help 대신 error를 critical 색으로 표시합니다.
```
