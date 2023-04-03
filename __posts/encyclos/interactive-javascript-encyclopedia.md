---
title: 인터렉티브 JavaScript 백과사전
date: 2023-04-04
slug: 인터렉티브-JavaScript-백과사전
tags: JavaScript
category: 🏫백과사전
---

**id로 태그 선택하기**

`document.getElementById('id');`

- 존재하지 않는 id를 선택할 경우 `null`이 반환된다.

**class로 태그 선택하기**

`document.getElementsByClassName('태그이름')`

HTMLCollection이라는 **유사 배열**이 만들어진다.

- 존재하지 않는 class를 선택할 경우 빈 HTMLCollection이 생성된다.
- HTMLCollection 요소들의 순서는 HTML에서의 깊이와는 상관없이 코드의 순서(위에서부터 차례대로)이다.

**유사배열(Array-Like Object)란?**

다양한 형태의 유사배열이 있지만 아래의 4가지 특징은 모두 가진다.

1. 숫자 형태의 indexing 가능
2. length 프로퍼티가 있다.
3. 배열의 기본 메소드를 사용할 수 없다.
   - push(), pop() X
   - indexing을 통해 유사배열의 요소에 접근하는 것은 쉽지만 수정과 삭제는 까다롭다.
     - 내부의 요소들은 배열처럼 다룰 수 있게 하면서 배열의 메소드 사용을 막고싶고나, 일반배열에 없는 특별한 메소드를 제고앟고 싶을 때 유사 배열을 만들어 활용한다.
4. Array.isArray(유사배열)은 false

**css 선택자로 태그 선택하기**

`document.querySelector('선택자')`

- #id, .class 등 하나의 태그를 선택할 때 사용한다.
  - 즉 class를 넣어도 가장 앞에 있는 class 한 요소(첫번째 태그)만 반환한다.
- 존재하지 않는 요소 선택 시 null값 리턴

`document.querySelectorAll('선택자')`

- 여러개의 태그를 선택할 때 사용 (class 처럼)
- NodeList() 유사 배열이 반환된다. 존재하지 않는 요소 선택 시 비어있는 NodeList가 리턴된다.

**이벤트 핸들러 등록**

- 자바스크립트로 해당 DOM 객체의 onclick 프로퍼티에 등록

```
const btn = document.querySelector('#myBtn');

btn.onclick = function() {
	console.log('Hello Codeit!');
};

```

### 브라우저와 자바스크립트

**[윈도우 객체](https://developer.mozilla.org/ko/docs/Web/API/Window)**

`console.log` vs `console.dir`

- dir 메소드는 모든 값을 문자열로 콘솔에 출력한다.
- **log는 값 자체에, dir은 객체의 속성을 좀더 자세하게 출력한다.**
  - function의 경우 dir은 함수가 가진 속성들을 더 보여준다. log는 안펼쳐짐
- `log`는 여러 값을 쉼표로 구분해서 전달하면 전달받은 **모든 값을 출력,** `dir`는 여러 값을 전달하더라도 **첫 번째 값만 출력**
- DOM 객체를 다룰 때 log는 **대상을 HTML 형태로 출력**, dir은 객체 속성에 중점을 뒀기 때문에 **대상을 객체 형태로 출력**

### DOM (Document Object Model)

문서 객체 모델

- HTML문서에 존재하는 요소들을 전부 객체화 하여 다루는 모델
- HTML문서 내의 모든 요소들은 객체로서 존재하고, 태그들 간의 부모 자식 관계를 **DOM트리**라고 하는 Tree 자료구조로 나타내기도 한다.

### DOM Tree

- HTML요소들이 전부 요소 노드
- 최상위 노드에는 **document** 객체가 있다.
  - html, body, head 태그 모두 document 객체의 자식 노드
- html 태그가 아닌 단순 텍스트도 그것을 감싸는 html 태그(요소 노드)의 자식 노드 = TextNode라고 한다.
  - 태그와 태그 사이에 줄바꿈과 들여쓰기로 인한 띄어쓰기도 텍스트 노드로 생성된다. (~~신기하군~~)
- 주석도 주석노드로 돔트리에 반영된다!!

**DOM이 있어 좋은 점**

요소를 객체로 다루게 되면서 정적으로 존재했던 html 문서를 자바스크립트로 동적으로 다룰 수 있다는 점이다. 각 노드에 프로퍼티나 메서드들이 있어 요소를 생성하기도 하고, 이동, 삭제도 할 수 있으며 클래스명을 추가하거나 바꾸는 등 속성을 조작할 수도 있다.

**DOM Tree 부모 자식 형제 요소 접근하는 프로퍼티들..**

1. 요소노드에 대한 이동 프로퍼티

   `.children` , `.firstElementChild`, `.lastElementChild`, `parentElement`, `.previousElementSibling`, `.nextElementSibling`

2. 모든 노드에 대한 이동 프로퍼티(요소 + 텍스트 노드)

`.childNodes`, `.firstChild`, `.lastChild`, `.parentNode`, `.previousSibling`, `.nextSibling`

### 요소 노드 프로퍼티

1. `.innerHTML` : 요소 노드 내부의 HTML 코드를 문자열로 리턴
   - 내부에 있는 줄 바꿈이나 들여쓰기 모두 포함
   - 내부의 HTML 자체를 수정할 때 활용
     - 내부에 있던 값을 완전히 새로운 값으로 교체하는 것! 즉 모든 요소를 다 새로 파싱
2. `.outerHTML` : 요소 노드 자체의 전체적인 HTML 코드를 문자열로 리턴
   - 새로운 값을 할당할 경우 요소 자체가 교체된다. ~~즉 태그도 바뀜~~
3. `.textContent` : HTML 태그 부분은 제외하고 텍스트만 가져온다.
   - 새로운 값을 할당하면 `innerHTML`과 마찬가지로 내부의 값을 완전히 새로운 값으로 교체
     - 텍!스!트!로 처리. 즉 특수문자도 그냥 string 취급!!

**요소 노드 다루기**

1. 요소 노드 만들기: `document.createElement('태그이름')`
2. 요소 노드 꾸미기: `.textContent` , `.innerHTML, ...`
3. 요소 노드 추가 혹은 이동하기
   - `.prepend` , `.append`, `.after`, `.before`
4. 요소 노드 삭제하기: `.remove()`

**HTML 속성 다루기**

- HTML 표준 속성이 아닌 속성 까지 다룰 수 있다. (href 등)
  - 참고로, class 속성은 프로퍼티이름으로 접근할 때는 className으로 이름이 바뀜!

1. 속성에 접근하기: `.getAttribute('속성')`
2. 속성 추가(수정)하기: `.setAttribute('속성', '값')`
3. 속성 제거하기: `.removeAttribute('속성')`

**스타일 다루기**

1. style 프로퍼티 활용하기: `element.style.styleName = 'value';`
2. class 변경을 통해 간접적으로 스타일 적용하기 : `element.className`, `element.classList`
   - `.classList`
     - `.add()`, `.remove()`
     - `.toggle(class, boolean)`
       - 있으면 삭제, 없으면 추가 하는 메소드
       - true (= add), false (= remove) 로 강제할 수 있다.

**CSS tip!**

> [속성이름] - 대괄호 안에 있는 속성이름
> 을 가진 태그들을 선택

> [속성이름="값"]- 속성이름에 해당 값을 가진 태그들을 선택

**비표준 속성 활용하기**

- 개발자가 임의로 작성하는 속성이다.
- `data-*` 속성을 사용해서 속성 활용!
  - data- 로 시작하는 속성은 모두 dataset 프로퍼티에 저장된다.
    - 따라서 `data-status`라는 속성이 있으면 `element.dataset.status`로 접근 가능

1. 선택자로 활용
2. 값을 표시할 태그를 구분할 때 활용

```
const fields = document.querySelectorAll('[data-field]');
const task = {
  ---
---
title: '코드 에디터 개발',
  manager: 'CastleRing, Raccoon Lee',
  };

for (let tag of fields) {
  const field = tag.dataset.field;
  tag.textContent = task[field];
}

```

1. 스타일이나 데이터 변경에 활용

```
const btns = document.querySelectorAll('.btn');
for (let btn of btns) {
  const status = btn.dataset.status;
  btn.onclick = function () {
    fields[2].textContent = status;
    fields[2].dataset.status = status;
  };
}

```

### 이벤트

**이벤트 등록하기**

`elem.addEventListener(event, handler)`

`elem.removeEventListener(event, handler)`

→ 주의할 점! handler를 적을 때 () 쓰지 XX return값이 반환되어 이벤트가 등록 안됨

**이벤트들..**

- 마우스 이벤트
  - `mousedown` 마우스 버튼을 누르는 순간
  - `mouseup` 마우스 버튼을 눌렀다 떼는 순간
  - `click` 왼쪽 버튼을 클릭한 순간
  - `dblclick` 왼쪽 버튼을 빠르게 두 번 클릭한 순간
  - `contextmenu` 오른쪽 버튼을 클릭한 순간
  - `mousemove` 마우스를 움직이는 순간
  - `mouseover` 마우스 포인터가 요소 위로 올라온 순간
  - `mouseout` 마우스 포인터가 요소에서 벗어나는 순간
  - `mouseenter` 마우스 포인터가 요소 위로 올라온 순간 (버블링이 일어나지 않음)
  - `mouseleave` 마우스 포인터가 요소에서 벗어나는 순간 (버블링이 일어나지 않음)
- 키보드 이벤트
  - `keydown` 키보드의 버튼을 누르는 순간
  - `keypress` 키보드의 버튼을 누르는 순간 ('a', '5' 등 출력이 가능한 키에서만 동작하며, Shift, Esc 등의 키에는 반응하지 않음)
  - `keyup` 키보드의 버튼을 눌렀다 떼는 순간
- 포커스 이벤트
  - `focusin` 요소에 포커스가 되는 순간
  - `focusout` 요소로부터 포커스가 빠져나가는 순간
  - `focus` 요소에 포커스가 되는 순간 (버블링이 일어나지 않음)
  - `blur`요소로부터 포커스가 빠져나가는 순간 (버블링이 일어나지 않음)
- 입력 이벤트
  - `change` 입력된 값이 바뀌는 순간
  - `input` 값이 입력되는 순간
  - `select` 입력 양식의 하나가 선택되는 순간
    `submit` 폼을 전송하는 순간
- 스크롤 이벤트
  - `scroll` 스크롤 바가 움직일 때
- 윈도우 창 이벤트
  - `resize` 윈도우 사이즈를 움직일 때 발생

**이벤트 객체**

웹페이지에서 이벤트가 발생하면 이벤트 객체가 생성되고, 이벤트 핸들러의 첫번째 파라미터로 전달된다!

**이벤트 객체의 프로퍼티들 (자주 사용되는..)**

- 공통 프로퍼티
  | type | 이벤트 이름 ('click', 'mouseup', 'keydown' 등) |
  | ------------- | -------------------------------------------------------- |
  | target | 이벤트가 발생한 요소 |
  | currentTarget | 이벤트 핸들러가 등록된 요소 |
  | timeStamp | 이벤트 발생 시각(페이지가 로드된 이후부터 경과한 밀리초) |
  | bubbles | 버블링 단계인지를 판단하는 값 |
- 마우스 이벤트
  | button | 누른 마우스의 버튼 (0: 왼쪽, 1: 가운데(휠), 2: 오른쪽) |
  | ---------------- | --------------------------------------------------------------------- |
  | clientX, clientY | 마우스 커서의 브라우저 표시 영역에서의 위치 |
  | pageX, pageY | 마우스 커서의 문서 영역에서의 위치 |
  | offsetX, offsetY | 마우스 커서의 이벤트 발생한 요소에서의 위치 |
  | screenX, screenY | 마우스 커서의 모니터 화면 영역에서의 위치 |
  | altKey | 이벤트가 발생할 때 alt키를 눌렀는지 |
  | ctrlKey | 이벤트가 발생할 때 ctrl키를 눌렀는지 |
  | shiftKey | 이벤트가 발생할 때 shift키를 눌렀는지 |
  | metaKey | 이벤트가 발생할 때 meta키를 눌렀는지 (window는 window키, mac은 cmd키) |
- 키보드 이벤트
  | key | 누른 키가 가지고 있는 값 |
  | -------- | --------------------------------------------------------------------- |
  | code | 누른 키의 물리적인 위치 |
  | altKey | 이벤트가 발생할 때 alt키를 눌렀는지 |
  | ctrlKey | 이벤트가 발생할 때 ctrl키를 눌렀는지 |
  | shiftKey | 이벤트가 발생할 때 shift키를 눌렀는지 |
  | metaKey | 이벤트가 발생할 때 meta키를 눌렀는지 (window는 window키, mac은 cmd키) |

**표준 [DOM 이벤트](https://www.w3.org/TR/DOM-Level-3-Events/)에서 정의한 이벤트 흐름**

1. 캡처링 단계: 이벤트가 하위 요소로 전파되는 단계
2. 타깃 단계: 이벤트가 실제 타깃 요소에 전달되는 단계
   - 가장 처음 이벤트 핸들러가 동작하게 되는 순간
3. 버블링 단계: 이벤트가 상위 요소로 전파되는 단계

**이벤트 버블링**

`e.stopPropagation()`을 사용해서 버블링을 막을 수 있다.

- 대부분 안막는게 좋음

**이벤트 캡쳐링**

캡쳐링 단계에서 이벤트 핸들러를 동작시키기

- `addEventListener`에 세번째 프로퍼티에 `true` 또는 `{ capture:true }`
  를 전달

**이벤트 위임 (Event Delegation) - 버블링을 사용한 방법**

자식 요소에서 일어날 이벤트를 부모에 위임한다. → 문제점! 부모에도 이벤트가 등록됨. 따라서 등록할 때 부모에 등록 안되도록 따로 예외처리 해야한다.

- 버블링을 이용한 방법이기 때문에 버블링이 막혀있으면 적용 안됨!!!

```
const list = document.querySelector('#list');
list.addEventListener('click', function(e) {
	// if (e.target.tagName === 'LI')
	if (e.target.classList.contains('item')) {
		e.target.classList.toggle('done');
	}
});

```

**브라우저 기본 동작 막기** : `e.preventDefault()`

- 꼭 필요한 경우에만 주의해서 사용해야 한다

### 다양한 이벤트 활용

**마우스**

- 버튼 이벤트
  - button 0 (왼쪽 마우스), 1 (휠), 2(오른쪽 클릭)
- 이동 이벤트
  - MouseEvent.type
    - `mousemove`
    - `mouseover`/`mouseout`
    - `mouseenter`/ `mouseleave` : 버블링 X, 자식요소 영역 계산 X
  - MouseEvent property
    - `.clientX`, `.clientY` : 화면에 표시되는 창 기준 마우스 포인터 위치
      - 화면의 좌측 상단의 모서리 위치를 (0, 0)으로 계산
    - `.pageX`, `.pageY`: 웹 문서 전체 기준 마우스 포인터 위치
    - `.offsetX`, `.offsetY`: 이벤트가 발생한 **target** 기준 마우스 포인터 위치
    - `.relatedTarget` : 이동 직전에 있던 요소 (mouseover, mouseout에만 있다)

**키보드**

KeyboardEvent.type

- `keydown`: 키보드 버튼을 누른 순간
- `keypress`: 키보드 버튼을 누른 순간, 출력값이 바뀌는 키에만 이벤트가 발생
- `keyup`: 키보드 버튼을 눌렀다 뗀 순간

KeyboardEvent property

- `.key` : 이벤트가 발생한 버튼의 값
- `KeyboardEvent.code`: 이벤트가 발생한 버튼의 키보드에서 물리적인 위치

**input 태그 다루기**

포커스 이벤트

- `focusin`: 요소에 포커스가 되었을 때
- `focusout`: 요소에 포커스가 빠져나갈 때
- `focus`: 요소에 포커스가 되었을 때 (버블링 x)
- `blur`: 요소에 포커스가 빠져나갈 때 (버블링 x)

입력 이벤트

- `input`: 사용자가 입력을 할 때
- `change`: 요소의 값이 변했을 때
