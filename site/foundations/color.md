<!-- https://luvms012-rgb.github.io/yds/site/foundations/color.html -->

# Color

색은 정보의 위계와 상태, 브랜드를 구분해 전달합니다.

## 개요

YDS의 색상은 역할 색과 팔레트 색 두 가지로 구성됩니다. 화면에는 역할 색을 사용하고, 팔레트 색은 역할 색의 기본 값으로 둡니다. 어느 화면에서나 충분한 대비와 일관된 의미를 유지할 수 있습니다.

## 역할 색

역할 색은 색의 모양이 아니라 역할을 기준으로 이름을 정합니다. 오류는 `critical`, 성공은 `positive`처럼 이름만 보고 용도를 알 수 있습니다. 자세한 규칙과 전체 목록은 [Roles](https://luvms012-rgb.github.io/yds/site/foundations/color-roles.md)에 있습니다.

## 팔레트 색

팔레트 색은 회색과 일곱 가지 색을 100 ~ 1000 단계로 나눈 기본 값입니다. 역할 색으로 표현하기 어려울 때만 화면에 사용합니다. 다크 모드에서도 같은 단계 번호를 그대로 사용합니다. 전체 목록은 [Palette](https://luvms012-rgb.github.io/yds/site/foundations/color-palette.md)에 있습니다.

## 관련 문서

- [역할 색](https://luvms012-rgb.github.io/yds/site/foundations/color-roles.md): 역할 색의 규칙과 전체 토큰을 확인합니다.

- [팔레트 색](https://luvms012-rgb.github.io/yds/site/foundations/color-palette.md): 팔레트 색의 단계와 전체 토큰을 확인합니다.

## 코드에서 쓰기

```css
.my-card {
  background: var(--ds-color-bg-layer-default);
  color: var(--ds-color-fg-neutral);
  border: 1px solid var(--ds-color-stroke-neutral-muted);
}
```

### 브랜드 컬러 바꾸기

브랜드 컬러는 서비스 CSS가 아니라 브랜드 파일에 적습니다. 대표색 하나면 나머지 단계와 다크 모드 값이 만들어집니다. [브랜드 만들기](https://luvms012-rgb.github.io/yds/site/index.md#ai)

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 역할에 맞는 색을 선택합니다. 오류는 critical, 성공은 positive입니다. |
| **Do** | 진한 면 위 글자는 fg-on-[역할]-solid를 사용합니다. |
| **Do** | 브랜드 색은 주 버튼처럼 꼭 눈에 띄어야 할 곳에만 사용합니다. |
| **Don't** | hex나 팔레트 색을 화면에 직접 쓰지 않습니다. |
| **Don't** | 색만으로 뜻을 전하지 않습니다. 아이콘이나 글자를 함께 사용합니다. |
