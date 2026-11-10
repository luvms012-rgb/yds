<!-- https://luvms012-rgb.github.io/yds/site/components/lightbox.html -->

# Lightbox

사진을 화면 가득 크게 보고 옆 사진으로 넘기는 창입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않으면 해당 부분을 모두 지웁니다.

```html
<dialog class="ds-lightbox" id="lb" aria-label="사진 크게 보기">
  <div class="ds-lightbox__bar"><span class="ds-lightbox__count">1 / 3</span>
    <button type="button" class="ds-lightbox__close" data-ds-close aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div>
  <figure class="ds-lightbox__slide" aria-current="true"><img class="ds-lightbox__img" src="…" alt="…">[<figcaption class="ds-lightbox__caption">…</figcaption>]</figure>
  <figure class="ds-lightbox__slide">…</figure>
  <button type="button" class="ds-lightbox__nav" data-direction="previous" aria-label="이전 사진"><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button>
  <button type="button" class="ds-lightbox__nav" data-direction="next" aria-label="다음 사진"><i class="ds-icon ds-icon--chevron-right" aria-hidden="true"></i></button>
</dialog>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Bar** `ds-lightbox__bar` | 값만큼 높아지는 막대입니다. |
| **Count** `ds-lightbox__count` | 개수나 글자 수를 보여 줍니다. |
| **Close** `ds-lightbox__close` | 닫기 버튼입니다. |
| **Slide** `ds-lightbox__slide` | 사진 한 장과 설명을 담은 영역입니다. |
| **Img** `ds-lightbox__img` | 크게 보여 주는 사진입니다. |
| **Caption** `ds-lightbox__caption` | 사진 설명입니다. |
| **Nav** `ds-lightbox__nav` | 이전 달, 다음 달로 넘기는 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

그 밖에: `data-ds-open` + `data-ds-index`, 좌우 화살표 키, 사진 개수 표시

## 동작

`ybm-ds.js`를 불러오면 자동으로 동작합니다.

- Dialog 와 같이 열고 닫기, data-ds-index 로 시작 사진, 이전/다음 버튼과 좌우 화살표 키로 넘기기

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 사진을 크게 볼 필요가 있을 때만 사용합니다. 작은 그림 확대에는 사용하지 않습니다. |
| **Do** | 모든 사진에 alt를 넣습니다. |
| **Do** | 사진 개수와 지금 위치를 표시합니다. |
| **Don't** | Lightbox 안에서 다른 창을 열지 않습니다. |

## 예시

### 사진 크게 보기

작은 사진을 누르면 그 사진부터 크게 보여 줍니다. 좌우 화살표 키로 넘깁니다.

```html
<div style="display:flex;flex-wrap:wrap;gap:var(--ds-space-x2)"><button type="button" class="ds-imageframe" data-radius="md" data-ds-open="ex-lb" data-ds-index="0" aria-label="1번째 사진 크게 보기" style="width:96px;padding:0;border:0;cursor:zoom-in"><img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=240&q=70" alt=""></button><button type="button" class="ds-imageframe" data-radius="md" data-ds-open="ex-lb" data-ds-index="1" aria-label="2번째 사진 크게 보기" style="width:96px;padding:0;border:0;cursor:zoom-in"><img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=240&q=70" alt=""></button><button type="button" class="ds-imageframe" data-radius="md" data-ds-open="ex-lb" data-ds-index="2" aria-label="3번째 사진 크게 보기" style="width:96px;padding:0;border:0;cursor:zoom-in"><img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=240&q=70" alt=""></button><button type="button" class="ds-imageframe" data-radius="md" data-ds-open="ex-lb" data-ds-index="3" aria-label="4번째 사진 크게 보기" style="width:96px;padding:0;border:0;cursor:zoom-in"><img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=240&q=70" alt=""></button></div><dialog class="ds-lightbox" id="ex-lb" aria-label="사진 크게 보기"><div class="ds-lightbox__bar"><span class="ds-lightbox__count">1 / 4</span><button type="button" class="ds-lightbox__close" data-ds-close aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div><figure class="ds-lightbox__slide" aria-current="true"><img class="ds-lightbox__img" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=70" alt="풍경 사진 1"><figcaption class="ds-lightbox__caption">풍경 1</figcaption></figure><figure class="ds-lightbox__slide"><img class="ds-lightbox__img" src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=70" alt="풍경 사진 2"><figcaption class="ds-lightbox__caption">풍경 2</figcaption></figure><figure class="ds-lightbox__slide"><img class="ds-lightbox__img" src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=70" alt="풍경 사진 3"><figcaption class="ds-lightbox__caption">풍경 3</figcaption></figure><figure class="ds-lightbox__slide"><img class="ds-lightbox__img" src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=70" alt="풍경 사진 4"><figcaption class="ds-lightbox__caption">풍경 4</figcaption></figure><button type="button" class="ds-lightbox__nav" data-direction="previous" aria-label="이전 사진" disabled><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button><button type="button" class="ds-lightbox__nav" data-direction="next" aria-label="다음 사진"><i class="ds-icon ds-icon--chevron-right" aria-hidden="true"></i></button></dialog>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-lightbox-bg` | `var(--ds-color-palette-static-black-alpha-900)` |
| `--ds-lightbox-fg` | `var(--ds-color-palette-static-white)` |
| `--ds-lightbox-button-bg` | `var(--ds-color-palette-static-white-alpha-200)` |

### 크기와 여백

```
여는 버튼: data-ds-open="lb" [data-ds-index="2"](몇 번째 사진부터) / 버튼과 좌우 화살표 키로 넘기고 Esc, 빈 곳 누름으로 닫는다
바탕은 늘 어둡다(사진이 잘 보이게, 라이트와 다크가 같다)
```
