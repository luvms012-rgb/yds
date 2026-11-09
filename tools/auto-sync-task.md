# YDS 세 곳 자동 싱크 - 예약 작업 내용 (2026-11-08)

Claude 데스크톱 앱의 예약 작업(Scheduled tasks)으로 매일 한 번 돌린다. 앱이 켜져 있을 때 돌고, 꺼져 있으면 다음에 켤 때 돈다.
GitHub 쪽 자동 빌드(DS → 사이트)는 `.github/workflows/check.yml` 가 맡고, 이 작업은 Figma 가 들어가는 부분(Figma 쓰기는 Claude 세션에서만 된다)을 맡는다.

- 작업 이름: yds-three-way-sync, 시간: 매일 09:00 (`0 9 * * *`)

## 작업 지시문

YDS 디자인 시스템의 세 곳(DS 코드 = works/ybm-ds, 문서 사이트 = 같은 저장소 site/, Figma 파일 fileKey 1VCEsFU3xMWuXIntIrZz9i)을 자동으로 맞춘다. 보고는 한국어로만, 쉬운 말로 짧게.

0. 시작: works/ybm-ds 에서 `.cache/audit/LOCK` 이 20분 안에 고쳐졌으면 건너뜀. 아니면 `touch .cache/audit/LOCK`, `git pull`. 커밋 안 된 변경이 있으면 보고만 하고 끝.
1. Figma → DS: ds-sync 스킬 1~3 단계(`node sync.mjs figma` → use_figma 읽기 → tokens/.figma-result.json → `node sync.mjs pull`). 변수 변경은 자동 반영·배포. 부품 목록 차이는 고치지 말고 보고.
2. DS → 사이트: `node site/build.mjs`, `node sync.mjs check`. 바뀌면 `node sync.mjs deploy "자동: ..."`.
3. DS → Figma: `node tools/figma-changes.mjs` 로 바뀐 컴포넌트를 찾아 최대 8개까지 `.cache/audit/README.md` 방법으로 Figma 문서 그림을 다시 그리고 사이트 캡처와 견준다. `node sync.mjs links` 로 링크 맞춤. 끝나면 `node tools/figma-changes.mjs --save`.
4. 마무리: 바뀐 것이 있으면 `node sync.mjs deploy`, LOCK 지움, 한국어 3~6줄 보고(Figma → DS, DS → 사이트, Figma 다시 맞춘 것, 사용자가 정할 것).

## 방향별 정리

| 바뀐 곳 | 따라가는 곳 | 방법 |
|---|---|---|
| DS 원본(dist, tokens, components.json, site/src, 템플릿 생성기) | 사이트 | GitHub 자동 빌드가 다시 만들어 자동 커밋 |
| DS 원본(컴포넌트 CSS, 문서 자료) | Figma 문서 그림, 링크 | 예약 작업 3단계 |
| Figma 변수 | DS 토큰 → 사이트 | 예약 작업 1단계 → 자동 빌드 |
| Figma 부품 구조 | DS CSS | 자동 변경 안 함, 보고 후 사용자가 결정 |
| 사이트 생성물을 손으로 고침 | - | 검사가 막는다(원본을 고쳐야 함). 사이트 글은 site/src 와 DS 원본에서 고친다 |
