<!-- https://luvms012-rgb.github.io/yds/site/components/result-section.html -->

# Result Section

작업을 마친 뒤 결과를 알리고 다음 행동을 안내하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<section class="ds-result" [data-size="medium"]>
  [<div class="ds-result__asset" [data-size="48"]><i class="ds-icon ds-icon--circle-check-solid" aria-hidden="true"></i></div>]
  <div class="ds-result__texts">
    <h2 class="ds-result__title">신청을 마쳤어요</h2>
    [<p class="ds-result__desc">처리 결과는 알림으로 알려 드릴게요</p>]
  </div>
  <div class="ds-result__actions">
    <button type="button" class="ds-btn" data-variant="neutralWeak" data-size="medium">확인</button>
    [<button type="button" class="ds-btn" data-variant="ghost" data-size="small">신청 내역 보기</button>]
  </div>
</section>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Asset** `ds-result__asset` | 결과를 나타내는 일러스트입니다. |
| **Texts** `ds-result__texts` | 제목과 설명을 묶는 텍스트 영역입니다. |
| **Title** `ds-result__title` | 제목입니다. |
| **Desc** `ds-result__desc` | 제목을 보충하는 설명입니다. |
| **Actions** `ds-result__actions` | 버튼을 묶는 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `size` | large medium |
| `asset size` | 32 40 48 64 |
| 켜고 끄는 속성 | `asset` `description` |

그 밖에: primary/secondary action

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 신청 완료, 오류, 빈 결과처럼 결과가 화면의 중심일 때 사용합니다. |
| **Do** | 다음 동작을 안내하는 주요 버튼은 하나만 위에 배치합니다. |
| **Do** | 보조 동작은 ghost 버튼으로 아래에 배치합니다. |
| **Do** | 목록이 비어 있다는 짧은 안내에는 Empty를 사용합니다. |

## 예시

### 완료 후 다음 동작 안내

신청 완료처럼 결과가 화면의 중심일 때 Result Section을 가운데에 배치합니다. 다음 동작은 주요 버튼 하나로 표시하고, 나머지는 ghost 버튼으로 아래에 배치합니다.

```html
<div class="u-col u-full" style="max-width: 375px">
  <header class="ds-appbar">
    <div class="ds-appbar__left"></div>
    <div class="ds-appbar__main">
      <h1 class="ds-appbar__title">수강 신청</h1>
    </div>
    <div class="ds-appbar__right">
      <button type="button" class="ds-appbar__button" aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    </div>
  </header>
  <section class="ds-result">
    <div class="ds-result__asset" style="color: var(--ds-color-fg-positive)"><i class="ds-icon ds-icon--circle-check-solid" aria-hidden="true"></i></div>
    <div class="ds-result__texts">
      <h2 class="ds-result__title">수강 신청을 마쳤어요</h2>
      <p class="ds-result__desc">지금 바로 첫 강의를 들을 수 있어요</p>
    </div>
    <div class="ds-result__actions">
      <button type="button" class="ds-btn" data-variant="neutralWeak" data-size="medium">강의 들으러 가기</button>
      <button type="button" class="ds-btn" data-variant="ghost" data-size="small">신청 내역 보기</button>
    </div>
  </section>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-result-icon` | `var(--ds-space-x12)` |
| `--ds-result-text-bottom` | `var(--ds-space-x5)` |

### 크기와 여백

```
size: 기본 large(화면 전체) / data-size="medium"(화면 일부)
위쪽 그림은 아이콘(완료 fg/positive, 오류 fg/critical)이나 Progress Circle 로 바꿔 사용합니다.
아이콘 크기: 기본은 large 48, medium 40 / 바꿀 때 ds-result__asset 에 data-size="32|40|48|64"
Figma: 가운데 정렬, padding x4 x12 / 그림 아래 x4, 글자 사이 x1
  large 아이콘 48, 글자 아래 x5, 제목 t09 Bold, 설명 t05 fg/neutral-muted / medium 아이콘 40, 글자 아래 x4, 제목 t05 Bold, 설명 t04
  버튼 사이 x3, 주요 버튼(위) Action Button neutralWeak medium, 보조 버튼(아래) ghost small
```
