<!-- https://design.ybmnet.co.kr/yds/components/citation.html -->

# Citation

본문의 근거가 된 출처를 표시하는 컴포넌트입니다.

## 사용법

구조를 복사해 사용합니다. 대괄호 `[ ]` 부분은 선택 항목입니다.

```html
<a class="ds-citation" data-type="number" href="#ref-1" aria-label="출처 1">1</a>
<a class="ds-citation" href="https://…">[<span class="ds-citation__icon"><i class="ds-icon ds-icon--globe" aria-hidden="true"></i></span>]<span class="ds-citation__label">출처 이름</span></a>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Icon** `ds-citation__icon` | 출처 사이트 아이콘입니다. |
| **Label** `ds-citation__label` | 출처 이름입니다. |

## 속성

| 속성 | 값 |
| --- | --- |
| `type` | number label |
| 켜고 끄는 속성 | `icon` |

## 사용 지침

- Do: AI 답변처럼 서식 있는 글은 Markdown으로 감쌉니다.
- Do: 코드는 Code Block에 넣습니다.
- Do: 근거는 번호나 출처 칩(Citation)으로 표시합니다.
- Don't: 한 문단 안에서 번호형과 이름형 출처를 섞지 않습니다.

## 예시

### 문장 뒤 번호로 근거 표시

AI 답변은 Markdown으로 감싸고, 근거가 된 문장 끝에 번호 Citation을 붙입니다. 번호를 누르면 답변 아래 출처 목록으로 이동해 원문을 확인할 수 있습니다.

```html
<div class="u-col u-gap-4">
  <div class="ds-chat-bubble" data-sender="user">결제한 지 5일 된 강의도 환불돼요?</div>
  <div class="ds-markdown">
    <p>네, 결제한 날부터 7일 안이면 환불을 신청할 수 있어요.<a class="ds-citation" data-type="number" href="#citation-ex1-ref1" aria-label="출처 1">1</a> 강의를 듣지 않았다면 모두 돌려받아요.<a class="ds-citation" data-type="number" href="#citation-ex1-ref2" aria-label="출처 2">2</a></p>
    <h4>출처</h4>
    <ol>
      <li id="citation-ex1-ref1"><a href="#">수강료 환불 규정</a></li>
      <li id="citation-ex1-ref2"><a href="#">환불 자주 묻는 질문</a></li>
    </ol>
  </div>
</div>
```

### 출처가 적을 때 이름 칩 표시

출처가 한두 곳이면 번호 대신 출처 이름을 칩으로 표시해 어디서 온 내용인지 바로 알 수 있게 합니다. 이름이 길면 칩 안에서 말줄임표로 표시합니다.

```html
<div class="ds-markdown">
  <h3>시험 날 챙길 것</h3>
  <p>신분증과 수험표를 챙기고, 시작 30분 전까지 들어가요.<a class="ds-citation" href="#"><span class="ds-citation__icon"><i class="ds-icon ds-icon--globe" aria-hidden="true"></i></span><span class="ds-citation__label">응시 안내</span></a></p>
  <p>휴대폰은 시험 전에 꺼서 감독관에게 맡겨요.<a class="ds-citation" href="#"><span class="ds-citation__icon"><i class="ds-icon ds-icon--globe" aria-hidden="true"></i></span><span class="ds-citation__label">시험 날 꼭 알아야 할 응시 규칙 모음</span></a></p>
</div>
```

## 규격

### 크기와 여백

```text
type: 기본 label(출처 이름 칩) / data-type="number"(글 뒤 위첨자 번호)
Figma: 높이 x5, t02, fg/neutral-muted / number 최소 폭 x5, 좌우 x1, pill, bg/brand-weak, SemiBold
  label 좌우 x2(아이콘이 있으면 왼쪽 x0_5), gap x1, shape/sm, 1px stroke/neutral-weak, 최대 15em / 아이콘 칸 x4 원, 아이콘 12
```
