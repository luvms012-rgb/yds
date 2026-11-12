<!-- https://luvms012-rgb.github.io/yds/site/components/carousel.html -->

# Carousel

여러 콘텐츠를 옆으로 넘겨 보는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-carousel" role="region" aria-roledescription="carousel" aria-label="추천">
  <div class="ds-carousel__scroller">
    <div class="ds-carousel__item">…</div>
  </div>
  <button type="button" class="ds-carousel__button" data-direction="previous" aria-label="이전"><i class="ds-icon ds-icon--chevron-left ds-icon--sm" aria-hidden="true"></i></button>
  <button type="button" class="ds-carousel__button" data-direction="next" aria-label="다음"><i class="ds-icon ds-icon--chevron-right ds-icon--sm" aria-hidden="true"></i></button>
</div>
<div class="ds-carousel" role="region" aria-roledescription="carousel" aria-label="이벤트" data-autoplay="5000">
  <div class="ds-carousel__scroller">…</div>
  <button type="button" class="ds-carousel__button" data-direction="previous" data-shape="square" aria-label="이전"><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button>
  <button type="button" class="ds-carousel__button" data-direction="next" data-shape="square" aria-label="다음"><i class="ds-icon ds-icon--chevron-right" aria-hidden="true"></i></button>
  <div class="ds-carousel__controls">
    <button type="button" class="ds-carousel__play" aria-label="멈춤"><i class="ds-icon ds-icon--pause-solid" aria-hidden="true"></i></button>
    <button type="button" class="ds-carousel__count" data-ds-open="banner-all" aria-label="전체 배너 보기">1/12<i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
  </div>
</div>
<dialog class="ds-dialog" id="banner-all" data-size="large" aria-labelledby="banner-all-title">
  <div class="ds-dialog__header"><h2 class="ds-dialog__title" id="banner-all-title">전체 보기</h2><button class="ds-dialog__close" data-ds-close aria-label="닫기"></button></div>
  <div class="ds-dialog__body"><div class="ds-carousel__all"></div></div>
</dialog>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Scroller** `ds-carousel__scroller` | 가로로 넘기는 영역입니다. |
| **Item** `ds-carousel__item` | 목록의 항목 하나입니다. |
| **Button** `ds-carousel__button` | 이전 장, 다음 장으로 넘기는 버튼입니다. |
| **Controls** `ds-carousel__controls` | 멈춤 버튼과 번호를 함께 두는 자리입니다. |
| **Play** `ds-carousel__play` | 자동 넘김을 멈추고 다시 재생하는 버튼입니다. |
| **Count** `ds-carousel__count` | 개수나 글자 수를 표시합니다. |
| **Header** `ds-dialog__header` | 제목과 닫기 버튼이 놓이는 상단 영역입니다. |
| **Title** `ds-dialog__title` | 제목입니다. |
| **Close** `ds-dialog__close` | 닫기 버튼입니다. |
| **Body** `ds-dialog__body` | 본문이 들어가는 영역입니다. |
| **All** `ds-carousel__all` | 모든 항목을 한 번에 보여 주는 칸입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `autoplay` |

그 밖에: 항목 사이 x2, 끝 흐림 x1, 버튼 32, square 48

## 동작

`ybm-ds.js`를 불러오면 자동으로 동작합니다.

- 처음/끝이면 data-at-start / data-at-end, 버튼으로 한 화면씩 넘기기, data-autoplay 면 자동 넘김(멈춤 버튼, 마우스 올림, 포커스에 멈춤), 번호 버튼으로 연 전체 보기 칸 채우기

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 사진은 Image Frame의 비율에 맞춰 꽉 채웁니다. |
| **Do** | 여러 장을 넘겨 볼 때는 Carousel 항목으로 넣습니다. |
| **Do** | 터치 화면에서는 이전, 다음 버튼 없이 스와이프로 넘깁니다. |
| **Do** | 자동 넘김은 큰 배너에만 사용하고, 멈춤 버튼을 함께 둡니다. |
| **Do** | 묶음에는 aria-label을 붙입니다. |
| **Don't** | 모두가 봐야 하는 내용은 넣지 않습니다. |
| **Don't** | 멈춤 버튼 없이 자동으로 넘기지 않습니다. |
| **Don't** | Carousel 안에 Carousel을 넣지 않습니다. |

## 예시

### 추천 상품을 옆으로 넘겨 보기

같은 모양의 상품 카드를 한 줄로 배치하고 옆으로 넘겨 봅니다. PC에서는 양 끝 버튼으로 한 화면씩 넘기고, 끝에 닿으면 그쪽 버튼이 사라집니다.

```html
<div class="u-col u-gap-3" style="width: 100%; max-width: 420px">
  <div class="u-flex u-center u-between">
    <h3 class="ds-t06 ds-fw-bold">함께 보면 좋은 상품</h3>
    <a class="ds-link" data-size="small" href="#">전체 보기</a>
  </div>
  <div class="ds-carousel" role="region" aria-roledescription="carousel" aria-label="함께 보면 좋은 상품">
    <div class="ds-carousel__scroller">
      <div class="ds-carousel__item">
        <a class="ds-card" data-size="small" href="#" style="width: 160px">
          <div class="ds-imageframe" data-radius="md"><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=320&q=70" alt=""></div>
          <div class="u-col u-gap-0_5">
            <span class="ds-t04">클래식 손목시계</span>
            <span class="ds-t04 ds-fw-bold">89,000원</span>
          </div>
        </a>
      </div>
      <div class="ds-carousel__item">
        <a class="ds-card" data-size="small" href="#" style="width: 160px">
          <div class="ds-imageframe" data-radius="md"><img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=320&q=70" alt=""></div>
          <div class="u-col u-gap-0_5">
            <span class="ds-t04">무선 헤드폰</span>
            <span class="ds-t04 ds-fw-bold">129,000원</span>
          </div>
        </a>
      </div>
      <div class="ds-carousel__item">
        <a class="ds-card" data-size="small" href="#" style="width: 160px">
          <div class="ds-imageframe" data-radius="md"><img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=320&q=70" alt=""></div>
          <div class="u-col u-gap-0_5">
            <span class="ds-t04">즉석 카메라</span>
            <span class="ds-t04 ds-fw-bold">98,000원</span>
          </div>
        </a>
      </div>
      <div class="ds-carousel__item">
        <a class="ds-card" data-size="small" href="#" style="width: 160px">
          <div class="ds-imageframe" data-radius="md"><img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=320&q=70" alt=""></div>
          <div class="u-col u-gap-0_5">
            <span class="ds-t04">선글라스</span>
            <span class="ds-t04 ds-fw-bold">45,000원</span>
          </div>
        </a>
      </div>
    </div>
    <button type="button" class="ds-carousel__button" data-direction="previous" aria-label="이전"><i class="ds-icon ds-icon--chevron-left ds-icon--sm" aria-hidden="true"></i></button>
    <button type="button" class="ds-carousel__button" data-direction="next" aria-label="다음"><i class="ds-icon ds-icon--chevron-right ds-icon--sm" aria-hidden="true"></i></button>
  </div>
</div>
```

### 사진 여러 장을 한 장씩 넘기기

사진은 Image Frame의 비율에 맞춰 꽉 채우고, 한 장을 한 항목으로 넣어 넘깁니다. 사진마다 순서를 표시해 몇 번째 사진인지 알립니다.

```html
<div class="ds-carousel" role="region" aria-roledescription="carousel" aria-label="숙소 사진" style="width: 100%; max-width: 420px">
  <div class="ds-carousel__scroller">
    <div class="ds-carousel__item" style="width: 100%">
      <div class="ds-imageframe" data-ratio="4:3" data-radius="lg" style="width: 100%">
        <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=840&q=70" alt="산으로 둘러싸인 호수">
      </div>
    </div>
    <div class="ds-carousel__item" style="width: 100%">
      <div class="ds-imageframe" data-ratio="4:3" data-radius="lg" style="width: 100%">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=840&q=70" alt="구름 위로 솟은 산">
      </div>
    </div>
    <div class="ds-carousel__item" style="width: 100%">
      <div class="ds-imageframe" data-ratio="4:3" data-radius="lg" style="width: 100%">
        <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=840&q=70" alt="안개 낀 산자락">
      </div>
    </div>
    <div class="ds-carousel__item" style="width: 100%">
      <div class="ds-imageframe" data-ratio="4:3" data-radius="lg" style="width: 100%">
        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=840&q=70" alt="햇살이 드는 숲">
      </div>
    </div>
  </div>
  <span class="ds-carousel__count" aria-hidden="true">1/4</span>
  <button type="button" class="ds-carousel__button" data-direction="previous" aria-label="이전"><i class="ds-icon ds-icon--chevron-left ds-icon--sm" aria-hidden="true"></i></button>
  <button type="button" class="ds-carousel__button" data-direction="next" aria-label="다음"><i class="ds-icon ds-icon--chevron-right ds-icon--sm" aria-hidden="true"></i></button>
</div>
```

### 터치 화면에서는 스와이프로 넘기기

터치 화면에서는 넘기기 버튼을 빼고 스와이프로 넘깁니다. 다음 항목이 조금 보이게 해 옆에 더 있다는 것을 알립니다.

```html
<div class="u-col u-gap-3" style="width: 100%; max-width: 375px">
  <h3 class="ds-t06 ds-fw-bold">진행 중인 이벤트</h3>
  <div class="ds-carousel" role="region" aria-roledescription="carousel" aria-label="진행 중인 이벤트">
    <div class="ds-carousel__scroller">
      <div class="ds-carousel__item">
        <a class="ds-card" data-size="small" href="#" style="width: 260px">
          <div class="ds-imageframe" data-ratio="16:9" data-radius="md"><img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=520&q=70" alt=""></div>
          <header class="ds-card__header">
            <h4 class="ds-card__title">주말 장보기 할인</h4>
            <p class="ds-card__desc">11월 30일까지</p>
          </header>
        </a>
      </div>
      <div class="ds-carousel__item">
        <a class="ds-card" data-size="small" href="#" style="width: 260px">
          <div class="ds-imageframe" data-ratio="16:9" data-radius="md"><img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=520&q=70" alt=""></div>
          <header class="ds-card__header">
            <h4 class="ds-card__title">커피 원두 1+1</h4>
            <p class="ds-card__desc">12월 7일까지</p>
          </header>
        </a>
      </div>
      <div class="ds-carousel__item">
        <a class="ds-card" data-size="small" href="#" style="width: 260px">
          <div class="ds-imageframe" data-ratio="16:9" data-radius="md"><img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=520&q=70" alt=""></div>
          <header class="ds-card__header">
            <h4 class="ds-card__title">겨울 독서 챌린지</h4>
            <p class="ds-card__desc">12월 31일까지</p>
          </header>
        </a>
      </div>
    </div>
  </div>
</div>
```

### 큰 배너를 자동으로 넘기기

큰 배너만 자동으로 넘기고, 멈춤 버튼을 번호 옆에 함께 둡니다. 번호를 누르면 모든 배너를 한 번에 봅니다.

```html
<div class="ds-carousel" role="region" aria-roledescription="carousel" aria-label="이벤트" data-autoplay="5000" style="width: 100%; max-width: 560px">
  <div class="ds-carousel__scroller">
    <div class="ds-carousel__item" style="width: 100%">
      <a class="ds-imageframe" href="#" data-ratio="16:9" data-radius="lg" style="width: 100%">
        <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=960&q=70" alt="산으로 둘러싸인 호수">
      </a>
    </div>
    <div class="ds-carousel__item" style="width: 100%">
      <a class="ds-imageframe" href="#" data-ratio="16:9" data-radius="lg" style="width: 100%">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=960&q=70" alt="구름 위로 솟은 산">
      </a>
    </div>
    <div class="ds-carousel__item" style="width: 100%">
      <a class="ds-imageframe" href="#" data-ratio="16:9" data-radius="lg" style="width: 100%">
        <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=960&q=70" alt="안개 낀 산자락">
      </a>
    </div>
    <div class="ds-carousel__item" style="width: 100%">
      <a class="ds-imageframe" href="#" data-ratio="16:9" data-radius="lg" style="width: 100%">
        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=960&q=70" alt="햇살이 드는 숲">
      </a>
    </div>
  </div>
  <button type="button" class="ds-carousel__button" data-direction="previous" data-shape="square" aria-label="이전"><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button>
  <button type="button" class="ds-carousel__button" data-direction="next" data-shape="square" aria-label="다음"><i class="ds-icon ds-icon--chevron-right" aria-hidden="true"></i></button>
  <div class="ds-carousel__controls">
    <button type="button" class="ds-carousel__play" aria-label="멈춤"><i class="ds-icon ds-icon--pause-solid" aria-hidden="true"></i></button>
    <button type="button" class="ds-carousel__count" data-ds-open="carousel-all" aria-label="전체 배너 보기">1/4<i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
  </div>
</div>
<dialog class="ds-dialog" id="carousel-all" data-size="large" aria-labelledby="carousel-all-title">
  <div class="ds-dialog__header">
    <h2 class="ds-dialog__title" id="carousel-all-title">전체 보기</h2>
    <button class="ds-dialog__close" data-ds-close aria-label="닫기"></button>
  </div>
  <div class="ds-dialog__body"><div class="ds-carousel__all"></div></div>
</dialog>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-carousel-gap` | `var(--ds-space-x2)` |
| `--ds-carousel-padding` | `0px` |
| `--ds-carousel-fade` | `var(--ds-space-x1)` |
| `--ds-carousel-button-size` | `var(--ds-space-x8)` |
| `--ds-carousel-button-radius` | `var(--ds-shape-pill)` |
| `--ds-carousel-button-shadow` | `var(--ds-elevation-overlay)` |
| `--ds-carousel-button-inset` | `var(--ds-space-x2)` |
| `--ds-carousel-control-size` | `var(--ds-space-x6)` |
| `--ds-carousel-play-icon-size` | `14px` |
| `--ds-carousel-count-font-size` | `var(--ds-font-size-t02)` |
| `--ds-carousel-count-padding` | `0 var(--ds-space-x2)` |
| `--ds-carousel-controls-x` | `var(--ds-space-x2)` |
| `--ds-carousel-controls-y` | `var(--ds-space-x2)` |
| `--ds-carousel-fade-start` | `var(--ds-carousel-fade)` |
| `--ds-carousel-fade-end` | `var(--ds-carousel-fade)` |

### 크기와 여백

```
항목은 넘길 때 시작 위치에 맞춰 멈춥니다. 넘겨 보는 이미지 배너는 Image Frame을 항목으로 넣어 만듭니다.
번호(1/4)는 항목 안이 아니라 캐러셀 바로 안에 [<span class="ds-carousel__count" aria-hidden="true">1/4</span>]로 배치합니다. 넘겨도 위치가 고정되고 숫자는 ybm-ds.js가 바꿉니다.
처음이나 끝에 닿으면 ybm-ds.js가 data-at-start / data-at-end를 붙여 그쪽 흐림과 버튼을 숨기고, 버튼을 누르면 한 화면씩 넘깁니다.
큰 배너 (2026-11-12): 자동 넘김은 큰 배너에만 쓰고, 멈춤 버튼을 늘 함께 둡니다. 마우스를 올리거나 포커스가 들어오면 멈추고, 움직임 줄이기 설정이면 처음부터 멈춰 있습니다.
번호를 버튼으로 두면 누를 때 모든 항목을 Dialog 에 모아 보여 줍니다. 모음 칸이 비어 있으면 ybm-ds.js 가 항목을 복사해 채웁니다.
서비스 크기 맞춤은 변수로: --ds-carousel-button-size / -button-radius / -button-shadow / -button-inset, --ds-carousel-control-size(멈춤 버튼, 번호 높이) / -play-icon-size / -count-font-size / -count-padding, --ds-carousel-controls-x / -controls-y
Figma: 항목 사이 x2 / 양 끝 흐림 x1 / Carousel Button 32 pill, bg/layer-floating, elevation overlay, 아이콘 16, 가장자리에서 x2 / square 48, 둥글기 12, 아이콘 24
```
