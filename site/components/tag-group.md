<!-- https://luvms012-rgb.github.io/yds/site/components/tag-group.html -->

# Tag Group

작성자, 날짜처럼 짧은 정보를 한 줄로 이어서 표시하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<span class="ds-tag-group" [data-size="t4"] [data-tone="neutral"]><span>홍길동</span><span>2026.10.02</span></span>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

그 밖에: 작성자, 날짜, 조회수

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | tone은 태그마다 달라도 되지만 size는 모두 같게 맞춥니다. |
| **Do** | 태그 글은 조사와 접속어를 빼고 6~10자 이내로 작성합니다. 한 줄에 들어가야 합니다. |
| **Do** | 기본은 한 줄입니다. 말줄임 때문에 뜻이 흐려질 때만 줄을 바꿉니다. |
| **Do** | 공간이 부족하면 덜 중요한 태그부터 말줄임합니다. |

## 예시

### 게시글 작성 정보 표시

게시글 제목 아래에 작성자, 날짜, 조회수를 Tag Group 하나로 표시합니다. 조사 없이 짧은 단어로 작성해 한 줄에 들어가게 합니다.

```html
<ul class="ds-list" data-divider style="width: 100%; max-width: 480px">
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">11월 정기 점검 안내</span>
        <span class="ds-tag-group"><span>운영팀</span><span>2026.11.02</span><span>조회 1,204</span></span>
      </span>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">겨울 방학 특강 신청을 받아요</span>
        <span class="ds-tag-group"><span>교육팀</span><span>2026.10.28</span><span>조회 862</span></span>
      </span>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">수강권 환불 기준이 바뀌어요</span>
        <span class="ds-tag-group"><span>운영팀</span><span>2026.10.15</span><span>조회 2,310</span></span>
      </span>
    </a>
  </li>
</ul>
```

## 규격

### 크기와 여백

```
size: t3(기본 13/20) / t4(14/21)   tone: neutralSubtle(기본) / neutral
Figma: 항목 사이 "/" 구분 / gap x1 / neutral fg/neutral-muted / neutralSubtle fg/neutral-subtle
```
