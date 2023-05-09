---
title: React로 웹 사이트 만들기 백과사전
date: 2023-05-10
slug: react-router-dom-react-helmet
tags: React.js
summary: react-router-dom & react-helmet
category: 🏫백과사전
---

> 라우팅이란?
>
> - 간단하게 생각 하자면 사용자가 요청한 URL에 따라 해당 URL에 맞는 페이지를 보여주는 것이라고 생각할 수 있다.
> - 리액트에서는 라우팅 관련 라이브러리가 많이 있는데, 이중 가장 많이 쓰이는 리액트 라우터(React Router)를 사용해보려 한다.

## [리액트 라우터](https://reactrouter.com/en/6.11.1/start/overview)

리액트 컴포넌트로 페이지를 나누는 라이브러리.

내부적으로 props를 거치지 않고 데이터를 자식 컴포넌트에게 넘겨줄 때 사용하는 Context를 사용한다.

- `package.json`이 있는 폴더에서 터미널을 열고
  ```bash
  npm install react-router-dom@6
  # @latest 처럼 version
  ```
- \***\*`react-router-dom` 패키지를 사용할 때 주의할 점!**
  가끔 `react-router-dom` 이 아닌 `react-router` 라는 패키지에서 임포트할 때가 있으니 주의! `react-router`는 `react-router-dom`에서 내부적으로 사용하는 것임

### Router

리액트 라우터에서 사용하는 데이터들을 모두 갖고있다. 현재 주소, 페이지 기록 등의 데이터를 가지고 있다.

- 내부적으로 Context Provider이다
- `<BrowserRoter>` 가 Context Provider 역할. 따라서 감싸준 컴포넌트들에서 리액트 라우터를 쓸 수 있게 한다.

1. BrowserRouter

   보통 대부분 `BrowserRouter`를 쓴다. HTML5를 지원하는 브라우저의 주소를 감지 한다. 최상위 컴포넌트에서 `BrowserRouter`로 컴포넌트 전체를 감싸야 사용 가능하다

2. HashRouter

   해시 주소([http://goddaehee.tistory.com/#test](http://goddaehee.tistory.com/#test) )를 감지 한다.

### Routes & Route

- v6 버전부터는 기존의 Route 컴포넌트가 Routes로 변경되었다. Routes는 여러개의 Route를 한번에 관리할 수 있도록 개선되었으며, 보다 세밀한 경로 지정이 가능해졌다.
- 리액트 라우터에서는 routes 안에 있는 route 컴포넌트들을 하나씩 검사하면서 그려줄 컴포넌트를 결정한다.
- `React.Fragment`처럼 리액트 상에서만 존재하는 컴포넌트. 실제 div 태그 등을 렌더링하지 않는다.
- `Route` 컴포넌트는 `Routes` 컴포넌트 내부에서 사용되어야 한다.
- `<Route path="주소규칙" element={보여 줄 컴포넌트 JSX} />`

```bash
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};
```

- 중첩 라우팅
  ```jsx
  function App() {
    return (
      <UserProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<DefaultLayout />}>
              {' '}
              /*layout 설정*/
              <Route exact path='/' element={<HomePage />} />
              <Route exact path='/shared' element={<SharedPage />} />
            </Route>
            /*layout 미설정*/
            <Route path='/login' element={<LoginPage />}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    );
  }
  ```
  ```jsx
  // Main.jsx
  <MainWrapper>
    <MainMenu />
    <Outlet /> // children과 같은 효과 ! ✨
  </MainWrapper>
  ```
- `index` props 지정하게되면
  ```jsx
  <Route path='course'>
    <Route index component={<CoursePage />} />
  </Route>
  ```
  이런 경우에 "course/" 라는 주소를 입력하면 CoursePage가 나온다. HTML에서 폴더 안에 있는 index.html 같은 역할!
  - path 프롭으로 coursepage를 넣어주면 URL이 “course/coursepage”가 된다.

### Link

- Link 컴포넌트를 사용하여 페이지 이동을 처리한다.
- 클릭 시 해당 페이지로 이동하며, 브라우저의 주소가 변경된다.

```bash
import { Link } from 'react-router-dom';
<Link to="경로">로그인버튼입니다.</Link>
```

`<a>` **태그 대신에 Link를 사용하는 이유**

react는 **SPA** 이기 때문이다.

### useNavigate

뒤로가기, url 이동 등에 사용하는 Hook

- Link와 달리 클릭 이벤트가 발생하지 않으므로, 이를 사용하여 스크립트로 페이지 이동을 처리할 수 있다.

```jsx
const navigate = useNavigate();
// ...
<button onClick={() => navigate(-2)}>2페이지 전으로 이동</button>
<button onClick={() => navigate('/home')}>Home으로 이동</button>
```

- `navigate("../success", { replace: true, state : any});`

  - 2번째 파라미터

    - replace
      - **true**는 \*\*\*\*navigate에 적힌 주소로 넘어간 후 뒤로가기를 하더라도 방금의 페이지로 돌아오지 않는다. 이 때는 자신의 메인 페이지 ("/")로 돌아오게 된다.
      - **false**는 뒤로가기가 가능(history 스택 쌓임), 기본 값
    - state
      브라우저의 History API에 상태 정보를 추가할 때 사용된다. `***state`\*\*\* 속성을 사용하여 객체를 전달하면, 해당 객체가 브라우저의 History API에 저장되어 이전/다음 페이지로 이동할 때 상태 정보가 함께 전달 된다고 한다.

      - **`state`** 속성은 페이지 이동이 발생할 때 **`location`** 객체의 **`state`** 속성에 저장된다.

      ```jsx
      import { useLocation } from 'react-router-dom';

      function MyComponent() {
        const location = useLocation();
        const state = location.state;
        //...
      }
      ```

### Navigate

to props을 사용해 redirect 할 수 있다.

- 렌더링될 때, 현재 위치를 변경
- **to, replace, state** 를 모두 사용할 수 있음
- `useNavigate` 훅을 사용하는 컴포넌트를 감싸는, 상위 컴포넌트라고 함

```jsx
if (!course) {
  return <Navigate to='/courses' />;
}
```

> \***\*Link, Navigate, useNavigate는 언제 쓰는게 좋을까?\*\***
>
> - **Link** : **사용자가 클릭해서 페이지를 이동하도록 할 때** 사용
> - **Navigate** : 특정 경로에서 **렌더링 시점에 다른 페이지로 이동시키고 싶을 때** 사용. 렌더링될 때 현재 위치를 변경한다.
> - **useNavigate** : **특정한 코드의 실행이 끝나고 나서 페이지를 이동시키고 싶을 때**

### useParams

- custom Hooks
- 동적인 경로를 처리할 때 사용한다.
- Route 컴포넌트에서 path에 `:파라미터명`을 사용하여 해당 위치에 동적인 값을 받아올 수 있다.
- useParamas가 리턴하는 객체에는 현재 경로의 파라미터들이 저장되어 있다.

```jsx
//Main.js 최상위 컴포넌트
<Route path=":evaLink" element={<CoursePage />} />

// CousePage 컴포넌트
...
const { evaLink } = useParams();
```

### useSearchParams - query params 조작하기

쿼리 파라미터를 가지고 오고싶을 때 사용한다.

```jsx
const [searchParam, setSearchParam] = useSearchParams();
// ...
setSearchParam(keyword ? { keyword: '에바' } : {}); // 주소창의 쿼리 값이 ?keyword=eva로 변경

const initKeyword = searchParams.get('keyword');
```

- setSearchParam은 객체를 argument로 가짐
- get 메소드를 사용해서 값을 가져올 수 있다.

**기본 동작 대신에 리액트 라우터를 통해서 쿼리파라미터를 변경하는 이유**

## **존재하지 않는 경로 처리하기 with Route exact**

```jsx
<Route path='*' element={<NotFoundPage />} />
```

- 와일드 카드 \*가 의미하는 것은 이 곳에 어떤 텍스트가 들어가도 상관없다는 뜻

### **Route exact**

Route는 **경로가 부분적으로 일치하는 컴포넌트도 렌더링하는 특성**을 가지고 있다.

```jsx
<Route path="/" exact component= { Main } />
<Route path="/water" component= { Water } />
<Route path="/juice" component= { Juice } />
```

exact이 없을 경우, 경로를 / 로 이동하면 Main, Water, Juice 컴포넌트 3개가 전부 렌더링된다. 의도치 않은 렌더링을 위해 **exact**를 사용한다.

exact을 사용하면 **경로가 완벽히 일치하는 컴포넌트만 렌더링 하게된다.**

- switch라는 컴포넌트가 있었는데 v6 부터 지원 XX

## react-helmet 라이브러리

- react-helmet 라이브러리를 사용하여 페이지의 메타 데이터를 설정할 수 있다.
- 예를 들어, 페이지 제목, 메타 설명 등을 동적으로 변경할 수 있다.

```jsx
import { Helmet } from 'react-helmet';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Codethat - 코딩이 처음이라면, 코드댓</title> // HTML의 <title> 태그를 덮어쓸 수 O
      </Helmet>
				...
    </>
  );
}

export default HomePage;
```

## 싱글 페이지 애플리케이션(SPA)

- 전통적인 방식과 달리, 모든 페이지를 처음에 불러와서 사용자의 상호작용에 따라 필요한 부분만 동적으로 변경하는 방식을 말한다.
- 리액트는 SPA 방식으로 구현할 수 있는 대표적인 프레임워크 중 하나이다.

## 리액트가 렌더링하는 방식

\***\*클라이언트사이드 렌더링(Client-side Rendering)\*\***

- 웹 브라우저에서 자바스크립트로 HTML을 만드는 것

**서버사이드 렌더링(Server-side Rendering)**

- 서버에서 HTML을 만들고 리스폰스로 보내주는 것
- Next.js - 리액트로 서버사이드 렌더링을 구현.리액트 공식 사이트에서도 Next.js를 추천함

**정적 사이트 생성(Static Site Generation)**

- 미리 HTML 파일을 만들어서 서버를 배포하는 것
- Gatsby - 리액트로 정적 사이트 만들기
  - 리액트 코드를 미리 렌더링 해서 프로젝트를 빌드할 때 HTML 파일로 만든다.
