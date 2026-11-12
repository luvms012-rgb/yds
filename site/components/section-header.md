<!-- https://luvms012-rgb.github.io/yds/site/components/section-header.html -->

# Section Header

화면 안 묶음의 제목과 전체 보기, 정렬 같은 동작을 한 줄에 두는 머리글입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-sectionheader" [data-size="small"]>
  <h2 class="ds-sectionheader__title">공지</h2>
  [<div class="ds-sectionheader__end"><a class="ds-link" data-size="small" href="…">전체 보기</a></div>]
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Title** `ds-sectionheader__title` | 묶음의 제목입니다. |
| **End** `ds-sectionheader__end` | 전체 보기, 정렬처럼 묶음에 딸린 동작을 두는 자리입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `size` | medium small |
| 켜고 끄는 속성 | `Select` `Badge` |

그 밖에: title 안 아이콘과 Badge, end 에 Text Link, Action Button, Segmented Control, Chip Tabs

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 화면 안 묶음마다 제목을 하나 둡니다. |
| **Do** | 오른쪽에는 전체 보기, 정렬처럼 그 묶음에 딸린 동작을 하나만 둡니다. |
| **Do** | 카드 안이나 댓글처럼 작은 묶음은 small을 사용합니다. |
| **Don't** | 화면 맨 위 제목에는 사용하지 않습니다. |

## 예시

### 목록 묶음과 전체 보기

묶음 제목 오른쪽에 전체 보기 링크를 둡니다.

```html
<div style="display:flex;flex-direction:column;gap:12px">
  <div class="ds-sectionheader"><h2 class="ds-sectionheader__title">공지</h2><div class="ds-sectionheader__end"><a class="ds-link" data-size="small" href="#">전체 보기</a></div></div>
  <ul class="ds-list"><li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">12월 정기 시험 접수 안내</span></span></a></li><li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">고사장 변경 안내</span></span></a></li></ul>
</div>
```

### 카드 안 작은 묶음

카드 안이나 댓글처럼 작은 묶음은 small 을 사용합니다.

```html
<article class="ds-card"><div class="ds-card__content"><div style="display:flex;flex-direction:column;gap:12px"><div class="ds-sectionheader" data-size="small"><h2 class="ds-sectionheader__title">고사장</h2><div class="ds-sectionheader__end"><button class="ds-btn" data-variant="neutralWeak" data-size="small"><i class="ds-icon ds-icon--map-pin" aria-hidden="true"></i>길찾기</button></div></div><span>강남 시험장</span></div></div></article>
```

## 규격

### 크기와 여백

```
size: medium(기본) 제목 t07 SemiBold / small 제목 t05 Bold(카드 안, 댓글처럼 작은 묶음)
제목과 end 는 양 끝 정렬, 세로 가운데, 사이 x3 / 폭이 좁으면 end 가 다음 줄로 내려갑니다(줄 사이 x2)
title 안에 아이콘, Badge, 개수를 함께 둘 수 있습니다(사이 x1_5) / 제목 태그(h2, h3)는 화면 구조에 맞춰 고릅니다
end 에는 Text Link, Action Button(small), Segmented Control, Chip Tabs, Select, Badge 중 하나를 둡니다
머리글 아래 내용과의 사이는 감싸는 쪽이 정합니다
```
