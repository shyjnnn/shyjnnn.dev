---
title: react의 생명주기
date: 2023-05-02
slug: react의-생명주기
tags: React.js
category: 🙏잡학사전
---

## Lifecycle

소프트웨어 개발에서 Lifecycle은 어떤 프로그램이 실행되고 종료되는 과정을 의미합니다. React에서는 React 웹 어플리케이션이 실행되고(Mount) 종료되기(Unmount)까지의 과정을 말하며 세세하게 나누어서 컨트롤 할 수 있습니다.

> _Mount(탄생) > Update, Re-render(변화) > Unmount(죽음)_

# \***\*Class 기반 React의 Lifecycle\*\***

간단히 설명하자면

`constructor` ➡ `componentWillMount` ➡ `componentDidMount` ➡ `componentWillUnmount`

그리고 컴포넌트의 갱신은 `componentWillUpdate`와 `componentDidUpdate`로 관리합니다.
![Untitled](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/63011924-5bf8-4f8e-ace7-3595c9ab969b)

### Mount

**1. constructor()**

- 컴포넌트를 새로 만들때마다 호출되는 클래스 생성자 메서드
- 컴포넌트가 마운트되기 전에 호출

**2. getDerivedStateFromProps(nextProps, prevState)**

- props로 받아 온 값을 state에 동기화시키는 용도로 사용하며, 컴포넌트가 마운트될 때와 업데이트 될 때 호출

**3. render()**

- UI를 렌더링하는 메서드
- 컴포넌트를 DOM에 마운트하기 위해 호출

**4. componentDidMount**

- 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드
- 즉 트리에 삽입된 직후에 호출

### Update & Re-render

Virtual DOM에서 변경된 혹은 업데이트된 내용을 이전 값과 비교해서 변경된 값을 다시 렌더링 해주는 (DOM 트리를 업데이트 해주는) 것을 의미합니다.

- **컴포넌트 상태가 변하는 경우는 다음과 같은 상황에서 발생합니다**
  1. props가 바뀔 때
  2. state가 바뀔 때
  3. 부모 컴포넌트가 리렌더링 될 때
  4. this.forceUpdate로 강제로 렌더링을 트리거할 때

이렇게 업데이트와 리렌더링이 발생하면,

1. `getDerivedStateFromProps`: 마운트에서도 호출되는 메서드. props의 변화에 따라 state에도 변화를 주고 싶을 때 사용한다.
2. `shouldComponentUpdate` : 컴포넌트가 리렌더링을 해야할지 말아야 할지 결정한다. true, false값을 반환해야하며, false를 반환하면 작업을 중지하고 컴포넌트가 리렌더링 되지 않는다.
3. `render` : 컴포넌트를 리렌더링한다. this.forceUpdate함수를 호출하면 앞의 과정을 생략하고 render함수를 호출한다. 함수형 컴포넌트에서는 render를 안쓰고 컴포넌트를 렌더링할 수 있다.
4. `getSnapshotBeforeUpdate` : 컴포넌트 변화를 DOM에 반영하기 직전에 호출한다.
5. `componentDidUpdate`: 컴포넌트의 업데이트 작업이 끝난 후 호출된다.
   1. 세번째 파라미터로 `getSnapshotBeforeUpdate` 에서 반환한 값을 조회할 수 있다.

### Unmount

DOM에서 제거되어 화면에서 사라지는 시점입니다.

`componentWillUnmount`: 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드.

- `setTimeout` , `setInterval` 등을 사용한 것이 있다면 해당 메소드에서 `clearTimeout` , `clearInterval` 등으로 제거할 때 사용.

---

# **Hooks의 Lifecycle**

Hooks에서는 useEffect를 통해 Lifecycle을 관리합니다. useEffect는 클래스 기반 Lifecycle 메소드에서 `componentDidMount`와 `componentDidUpdate`, `componentWillUnmont` 세 가지 역할을 할 수 있습니다.
![Untitled 1](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/36e29526-3586-460a-ad26-95dcbb403d57)

## Mount

컴포넌트 함수를 실행해 jsx를 리턴합니다.

```jsx
const useConstructor = (callback) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callback();
  hasBeenCalled.current = true;
};
```

`useRef` 또는 `useState` 를 활용해 생성할 때 한 번만 동작하는 hook을 만들어 사용할 수 있습니다.

- 이때, `useMemo()`를 사용해서 기억해둔 컴포넌트의 값을 재사용할 수도 있습니다.
- 이때, `useEffect()`와 `useLayoutEffect()`로 렌더링 후, 전에 할 행동을 지정할 수 있습니다.

### Updating & Re-Rendering

`useState()`와 `useReducer()`, `useContext()`를 사용해서 update와 re-rendering을 제어할 수 있습니다. 또한 `re-rendering`이 발생하면 `useEffect()`와 `useLayoutEffect()`도 동작합니다.

- `props`, `state` 를 `useEffect` deps로 설정하여 사용 (=`getSnapshotBeforeUpdate`, `componentDidUpdate`)
- `useCallback()`을 사용해서 함수를 재사용하면 리랜더링을 방지할 수도 있습니다.
- `React.memo` 를 사용해 `shouldComponentUpdate`와 같은 기능을 구현할 수 있습니다.

### UnMount

`useEffect`의 cleanup함수를 사용해서 unmount 시 할 행동을 지정할 수 있습니다. (=`componentWillUnmount`)

### 즉, 핵심은 useEffect!

```jsx
useEffect(<function return>, <Array>);
```

- `function`은 컴포넌트가 render 또는 re-render 되었을 때 실행하고 싶은 함수
  - return으로 `clean-up`을 반환해서 컴포넌트가 수명을 다하고 사라질 때 실행하고 싶은 함수를 정할 수 있습니다. (class형 컴포넌트의 `componentWillUnmount`와 동일한 역할)
    - 일반적으로 eventListner의 역할을 다하면 다시 remove할때 이 useEffect의 return값을 이용합니다.
- `Array`에는 **어떤 state가 변화되었을 때 컴포넌트를 re-render할지** 그 state를 담는 Array형태의 파라미터입니다. 즉 dependency array

### reference

[https://krpeppermint100.medium.com/js-useeffect를-통한-react-hooks의-lifecycle-관리-3a65844bcaf8](https://krpeppermint100.medium.com/js-useeffect%EB%A5%BC-%ED%86%B5%ED%95%9C-react-hooks%EC%9D%98-lifecycle-%EA%B4%80%EB%A6%AC-3a65844bcaf8)
