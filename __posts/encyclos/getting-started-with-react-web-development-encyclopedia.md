---
title: React 웹 개발 시작하기 백과사전
date: 2023-04-24
slug: Reqct-웹-개발-시작하기-백과사전
tags: React.js
category: 🏫백과사전
---

## 리액트 start!

- `create-react-app` 으로 리액트 프로젝트 생성하는 명령어
  - `npm init react-app 폴더이름` 혹은 폴더내에서 `npm init react-app .`
    - 명령어를 실행하면 create-react-app 라이브러리가 자동으로 설치되며, 필요한 파일과 종속성이 포함된 새로운 React 프로젝트가 생성된다.
  - [https://velog.io/@devsaza/cra](https://velog.io/@devsaza/cra)
  - npm과 npx의 차이
    `npx create-react-app`을 사용하여 새 React 프로젝트를 생성하면 npm 레지스트리에서 `create-react-app` 패키지의 최신 버전을 일시적으로 다운로드하고 이를 사용하여 프로젝트 파일을 생성한 다음 시스템에서 `create-react-app` 패키지를 삭제합니다. 즉, `create-react-app` 패키지는 시스템에 영구적으로 설치되지 않으며 프로젝트를 삭제하면 존재하지 않습니다.
    `npx` 명령은 시스템에 전체적으로 설치되지 않은 패키지를 실행하는 데 사용됩니다. 전역적으로 패키지를 설치하는 대신 `npx`는 npm 레지스트리에서 패키지를 다운로드하고 실행한 다음 시스템에서 제거합니다. 이렇게 하면 불필요한 파일로 시스템을 어지럽히지 않고 항상 최신 버전의 패키지를 사용할 수 있습니다.
    `npx create-react-app my-app`을 실행하면 `my-app`이라는 폴더에 새로운 React 프로젝트가 생성됩니다. `create-react-app` 패키지가 다운로드되어 프로젝트 파일을 생성하는 데 사용되지만 시스템에 전체적으로 설치되지는 않습니다. 프로젝트가 생성되면 프로젝트 폴더로 이동하여 `npm start` 명령을 사용하여 개발 서버를 시작할 수 있습니다. 프로젝트가 끝나면 폴더를 삭제할 수 있으며 `create-react-app` 패키지도 시스템에서 삭제됩니다.
    요약하면 `npx create-react-app`을 사용하면 `create-react-app` 패키지를 시스템에 전체적으로 설치하지 않고도 새 React 프로젝트를 빠르게 생성할 수 있습니다. 이렇게 하면 디스크 공간이 절약되고 항상 최신 버전의 패키지를 사용할 수 있습니다. 또한 프로젝트를 삭제하면 `create-react-app` 패키지도 시스템에서 삭제됩니다.
- `npm init react-app .`은 Node.js와 npm이 설치되어 있어야한다. `npx create-react-app`은 그렇지 않아도 자동으로 필요한 종속성 패키지를 함께 설치해준다.
- 개발 모드 실행
  - `npm run start`
  - 종료 : ctrl + C

### [리액트 개발자 도구](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

- 크롬 extension
  ![https://velog.velcdn.com/images/shinyejin0212/post/cec54c4f-1784-4f3b-aec0-2255881d04c0/image.png](https://velog.velcdn.com/images/shinyejin0212/post/cec54c4f-1784-4f3b-aec0-2255881d04c0/image.png)

### 인덱스 파일에서 하는 일

- index.html : 웹 브라우저에서 가장 먼저 실행되는 파일
- index.js : index.html이 실행되고 나서 실행되는 파일. 리액트 코드 중 가장 먼저 실행되는 파일

  ```
  import ReactDOM from "react-dom/client";

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<h1>안녕 리액트!</h1>);

  ```

  - render 메소드로 html 태그를 만듬

### JSX 문법

JS를 확장한 문법. 자바스크립트에서 HTML 문법을 편리하게 활용할 수 있는 문법

[React 공식 문서 - 어트리뷰트의 차이](https://ko.reactjs.org/docs/dom-elements.html#differences-in-attributes)

1. **자바스크립트 예약어와 같은 속성명은 사용할 수 없다**
   - html의 `class` 속성은 `className`으로 적어야한다.
     - js에서 class는 클래스 객체이기 때문이다.
   - html의 `for` 속성은 `htmlFor`로 적어야한다.
     - js에서 for는 반복문이기 때문이다.
2. html의 이벤트핸들러 등 **속성명은 camelCase로 작성**해야한다.
   - 예외적으로 비표준 속성 `data-*` 속성은 기존 그대로 사용한다.
3. jsx 문법으로 HTML 태그를 작성할 때는 **반드시 하나의 요소로 감싸서** 작성해야한다. 이때 사용될 수 있는 것 중 하나가 Fragment이다.
   - **Fragment**
     불필요한 div 태그를 줄일 수 있다.
     import 후 `<Fragment>`를 사용하거나 `<>`처럼 빈태그로 사용 가능하다.
4. JSX 코드에서 JS 표현식을 활용하려면 템플릿 문자열과 다르게 $기호 없이 `{}`로 감싸주면 된다.

   - 중괄호 안에서는 **JS 표현식**만 사용 가능하기 때문에 if문이나 for문, 함수 선언과 같은 자바스크립트의 문장은 **사용할 수 없다**!!!
     - 만약 조건문이 꼭 필요하다면 조건 연산자, 반복문이 꼭 필요하다면 배열의 반복 메소드를 활용해볼 수는 있다.

   > 잠깐! 템플릿 문자열이란?
   >
   > - **백틱으로 문장을 감싸고**, 변수가 들어갈 부분에 **${변수명}**과 같은 형태로 입력하는 형식

5. 리액트에서는 JSX 문법을 사용하기 때문에 이벤트 핸들러를 등록할 때 `addEventListner`보다는 `요소의 속성값`(`onClick` 등)으로 이벤트를 등록한다.

## 컴포넌트

### 리액트 엘리먼트

리액트로 화면을 그려내는데 가장 기본적인 요소이다. JSX 문법으로 작성한 요소는 결과적으로 자바스크립트 객체가 된다.

ReactDOM의 render 메소드로 전달하게 되면 리액트가 이 객체를 해석해서 HTML로 렌더링한다.

### 리액트 컴포넌트

리액트 엘리먼트를 조금 더 자유롭게 다루기 위한 하나의 문법이다.

1. 자바스크립트의 함수 활용

**Props (Properties)**

- 컴포넌트에 지정한 속성
  - 숫자를 전달하고 싶을 때는 {15086}처럼 **중괄호로 감싸야한다.**
- 컴포넌트 태그에 지정해 준 속성들은 하나의 객체 형태로 컴포넌트 함수의 첫번째 파라미터로 전달된다.
- 컴포넌트 함수 내에서 프로퍼티로 받을 때, **Destructuring 문법**을 활용할 수도 있다!

  ```
  function Dice(props){}
  // destructuring
  function Dice({color = "blue", num ="1"}){ // 기본값 지정해준 것
  }

  ```

**children props**

JSX 문법으로 컴포넌트를 작성할 때 컴포넌트를 단일 태그가 아니라 여는 태그와 닫는 태그의 형태로 작성하면, 그 안에 작성된 코드가 `children` 값에 담기게 된다.

```
<Button onClick={handleClearClick}>처음부터</Button>

function Button({ **children** , onClick }) {
  return <button onClick={onClick}>{**children**}</button>;
}

```

- 단순히 텍스트만 작성하는 걸 넘어서 컴포넌트 안에 컴포넌트를 작성할 수도 있고, 컴포넌트 안에 복잡한 태그들을 더 작성할 수도 있다.

**장점**

- 반복적인 개발이 줄어든다
- 오류를 고치기 쉽다
- 일을 쉽게 나눌 수 있다.

> vscode에서 변수명 드래그 후 F2를 눌러서 해당 문서 안의 모든 같은 변수를 다른 이름으로 자동으로 바꿀 수 있다.

## State

리액트의 변수 같은 것으로 State를 바꾸면 리액트가 알아서 화면을 새로 랜더링해준다.

- `useState`를 사용해 state를 만든다.
  - 이 함수는 state와 setter 함수를 배열 형태로 리턴한다.
    - `const [state, setState] = useState(1)`
    - Destructuring 문법을 활해 작성한 예시.
  - state는 처음에 useState 함수를 호출할 때 전달한 초기값을 가지고 있다.
  - state를 변경하려면 반드시 setter 함수를 사용해야하기 때문에 const 키워드로 State를 만든다.
    > 의문 ? setState를 통해 state값이 바뀌는데 어째서 count인가? https://dudghsx.tistory.com/18

**참조형 State**

배열 등의 참조형 객체를 state에 저장할 때는 객체가 가지는 주소값이 state에 저장되는 것이다.

따라서 리액트 입장에서는 state값이 바뀌어야 새롭게 화면을 렌더링하는데, 배열의 요소가 바뀌더라도 주소값은 그대로이기 때문에 **요소가 변경되기 전 배열과 변경된 이후의 배열의 주소값은 같다**.

따라서 state가 참조하는 주솟값은 여전히 똑같기 때문에 State가 변경되었다고 판단하지 않아 렌더링이 일어나지 않는다.

- 따라서 메소드나 할당 연산자로 값을 바꾸는 것이 아니라 배열이나 객체 등의 참조형 타입의 state를 변경할 때는 새로 만들어서 할당(setter사용)해줘야한다.
  - `setCount([...count, newCount])` 처럼 spread 문법을 활용하기

> 자식 state들을 부모 state로 이동(물리적인 코드 이동)시키는 것을 state lifting이라고 함

## 리액트가 렌더링하는 방식

state가 변경될 때마다 리렌더링을 한다.

### Virtual DOM

state의 변경으로 rendering이 일어나면 Virtual DOM이 생성된다.

이때 state 변경 전 Virtual DOM과 변경 후 Virtual DOM을 비교해 다른 노드만 각각 해당하는 실제 DOM 노드를 변경한다.

- 개발자가 DOM 노드를 신경 쓸 필요가 없어서 단순하고 깔끔한 개발이 가능하다.
- Virtual DOM의 변경 사항을 적당히 모아뒀다가 처리할 수 있다. React는 Virtual DOM이 바뀔 때마다 브라우저에 바로 전달하지 않고 모아뒀다가 적당히 나눠서 실제 DOM에 적용한다.
- 효율적으로 화면을 처리할 수 있다.

## 스타일 적용하기 + 팁

**CSS 인라인 스타일**

```
const style = {
  width: "166px",
  height: "166px",
  border: "none",
  outline: 'none',
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  backgroundImage: `url('${backgroundImg}')`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
}// 속성 : "값"

```

- camelCase로 작성하고, 객체 리터럴이기 때문에 `;`가 아닌 `,`로 연결한다.

**CSS 클래스 사용**

- `improt "파일 경로"`로 임포트 하게 되면, **html의 head태그 안에 style태그가 자동으로 작성**된다.

> CSS 파일을 불러오거나 이미지 파일을 불러오는 기능은 리액트 고유의 기능이 아니라 **Create React App**이 대신 설정해 준 기능이다!

### classnames 라이브러리

```
import classNames from 'classnames'; // import 해야 쓸 수 있다 (라이브러리니까)
// .... 코드들
<button
      className={classNames(
        'Button',
        isPending && 'pending',
        color,
        size,
        invert && 'invert',
      )}>
// ... 코드들

```

처럼 클래스네임을 편하게 사용할 수 있다. [npm으로 설치 가능](https://www.npmjs.com/package/classnames)하다

## **React 배포하기**

**빌드** : 브라우저가 해석할 수 있고 웹 서버가 사용하기 좋도록 만드는 과정

`npm run build`로 생성된 빌드 폴더 내의 파일들을 웹서버로 제공하면 배포가 된다.

- `npx serve build` - serve(라이브러리)을 활용해 로컬 환경에서 웹서버 실행하기

## 브라우저는 어떻게 리액트를 알아들을까?

**Transpiling**

- JSX 코드로 작성된 코드들은 Transpiler를 통해 순수 자바스크립트로 번역되고
  - 대표적인 Transpiler로는 `bable`이 있다. `create-react-app`은 bable을 사용함 (Next.js는 swc를 사용한다고 함. 커스텀 가능함)

**Bundling**

- 번역된 코드들은 번들링을 통해 웹브라우저가 다운받기 좋도록 묶음으로 만들어진다. `create-react-app`은 `Webpack` 이라는 모듈 번들러를 사용한다.
- build를 하면 알아서 번들링이 된다.
