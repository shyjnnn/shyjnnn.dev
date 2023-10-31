---
title: 'CSS 레이아웃 백과사전'
date: 2023-03-22
slug: CSS-레이아웃-백과사전
tags: CSS
category: 🏫백과사전
---

## [1] Position

normal flow에서 벗어나서 위치를 직접 정하는 방식

`position` 속성은 `top`, `left`, `bottom`, `right` 속성과 함께 사용된다.

- `instet :` `top`, `left`, `bottom`, `right` 한꺼번에 설정.

### `static`

- 기본값. 적용을 안한 것과 같다. 따라서 top, left …의 속성은 무시된다.

### `absolute`

- 가장 가까운 positioning된 **상위 요소의 위치**를 기준으로 상대적으로 배치해준다.
- 만약에 해당 요소 상위에 `position` 속성이 `static`이 아닌 요소가 없다면, 최상위에 있는 `<body>` 요소가 배치 기준이 된다.
- 원래 배치에서는 자리를 차지하지 않는다. (기존의 배치에서 완전히 벗어나서 배치됨)
- width가 설정되지 않은 경우에, block display 처럼 부모 너비만큼 늘어나지 **않는다**.

### `relative`

- 요소를 **원래 위치**를 기준으로 상대적으로 배치해준다.
  - 원래 배치에서는 영역만큼 비워둔다.

### `fixed`

- 스크롤을 내려도 그 자리에 고정되게 하는 기능다. (nav바나, 라이브 채팅 버튼 등..)
  - 속성값의 배치 기준이 자신이나 부모 요소가 아닌 뷰포트, 즉 브라우저 전체 화면이다.
  - 일반적인 문서 흐름을 무시한다.

### `sticky`

- 스크롤을 하다가 미리 지정한 위치(top, left 등)를 만나면 fixed 됨.
- 부모 요소 안에 갖혀있다
  - 부모 요소가 화면에서 사라지면 같이 사라진다.
- `fixed` 와 마찬가지로 속성값의 배치 기준이 자신이나 부모 요소가 아닌 뷰포트, 즉 브라우저 전체 화면이다.

### `z-index` 속성

- `z-index`를 정하지 않으면 기본값은 `auto` 인데, 이 값은 0이랑 마찬가지이다.
- `z-index`의 값이 같다면 코드 상에서 아래 줄에 있을수록 앞쪽에 보인다.

### **쌓임 맥락 (Stacking Context)**

- `z-index`를 묶어서 생각하는 범위
- 쌓임 맥락이 만들어지는 조건
  - 문서의 루트 요소(`<html>`)
  - `position`이 `absolute`이거나 `relative`이고, `z-index`가 `auto`가 아닌 경우
  - `position`이 `fixed`이거나 `sticky`인 경우
  - 플렉스박스나 그리드의 자식 중 `z-index`가 `auto`가 아닌 경우
  - `opacity`가 1보다 작은 요소
  - etc..
- `z-index`의 기본 값인 `auto`와 `0` 의 차이는 쌓임 맥락을 만드느냐 아니냐의 차이

## [2] Flexbox

박스를 만들고 방향을 정해서 요소를 배치하는 방식

### 배치할 방향

- `flex-direction`
  - 기본값 : row (기본 축 왼 → 오른쪽) / column (기본축 위→아래)
  - 기본축 Main Axis / 교차축 Cross Axis
    - 기본축 방향으로 순서대로 배치, 교차축 방향으로 꽉채워서 배치

### 정렬하기

- `justify-content` - 기본축 방향의 정렬
- `align-items` - 교차축 방향의 정

### 요소가 넘칠 때

- `flex-wrap : wrap;`

### 요소들 사이 간격

- `gap` : 세로 가

### 크기 늘이거나 줄이기

- `flex: grow, shrink, basis`
- `flex-grow` - 플랙스 박스 안의 요소를 꽉 채우고 싶을 때. 1으로 둘 경우 꽉채워짐
- `flex-shrink` - 요소를 얼마나 줄일지 정할 때. 내가 지정한 크기로 고정하고 싶을 경우 0으로 두면 된다.
  - 기본 값은 1. 기본적으로 요소가 넘치면 크기를 줄여주기 때문이
- `flex-basis` - 요소의 시작 크기. 기본값 auto
  - auto일 경우 `width`나 `height`를 참고해서 시작 크기를 정한다.
  - flex-direction이 row일 때는 너비, column일 때는 높이 - 즉 axis 방향으로의 크기를 설정

<aside>
💡  `relative`, `sticky`는 요소의 원래 자리를 차지하기 때문에 플렉스박스의 영향 O

`absolute`랑 `fixed`는 요소의 원래 자리에서 쏙 빠져버리기 때문에 글의 흐름에서 빠지는 거랑 마찬가지로, 플렉스박스랑 상관없이 배치된다.

</aside>

## Grid

칸을 나눈 뒤 요소를 배치하는 방식

그리드 라인, 그리드

### 격자 나누기

`grid-template-rows(columns)`= `grid-template` : rows(세로) / columns(가로)

px 대신 fr 사용! → 그리드 공간 안에서 부분을 상대적으로 나타내는 단위

- 함수들
  - `minmax(min,max)` - min에는 fr XX, max에만 fr 사용 가능
  - `repeat(개수, 크기)`

### 간격

`gap` : 세로 가

### 크기 미리 정하기

`grid-auto-rows(columns)`

그리드 템플릿에서 row 혹은 column 크기를 명시적으로 정하지 않았을 때, 이것을 사용/

### 원하는 위치에, 여러 칸 걸쳐서 배치

`grid-row(column)` : 시작line / 끝line

- line은 1부터 시작
- span을 사용하면 크기를 정할 수 있음
  - ex) grid-row : 1 / span 3 = row 방향으로 라인 1부터 3칸 차지

### 이름으로 배치

`grid-area` - 이름을 지정하는 속성

`grid-template-areas` : “rows” “cloumns”

- 비워두고 싶을 때는 `“.”`
