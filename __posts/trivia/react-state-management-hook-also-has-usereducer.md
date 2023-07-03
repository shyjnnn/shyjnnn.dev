---
title: React 상태 관리 hook에는 useReducer도 있다.
date: 2023년 7월 4일
slug: React-상태-관리-hook에는-useReducer도-있다
tags: React.js
category: 🙏잡학사전
---

## useReducer

React에서 컴포넌트 상태 관리에 가장 많이 쓰이는 hook은 `useState`이다. 좀 더 복잡한 상태 관리가 필요한 React 컴포넌트에서는 `useReducer`를 사용할 수 있다.

### Redux 패턴

```jsx
const [state, dispatch] = useReducer(reducer함수, initial상태, init함수);
```

현재 state **객체**와 action **객체**를 인자로 받아 새로운 state **객체**를 반환하는 함수이다.

- dispatch 함수: 컴포넌트 내에서 상태 변경을 일으키기 위해서 사용됨
  - 인자로 reducer 함수에 넘길 action을 받는다.
- init 함수 : 초기 state는 init 함수에 의해 설정될 것
  ![Untitled](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/cf7008e4-0529-44ce-bf8f-7551661268c4)

React는 현재 상태와 액션을 리듀서 함수에 전달한다. 리듀서는 다음 상태를 계산하여 반환한다. React는 다음 상태를 저장하고, 컴포넌트를 렌더링하고, UI를 업데이트한다.

정리하자면, 컴포넌트에서 dispatch 함수에 action을 던지면, reducer 함수가 이 action에 따라서 state를 변경해준다.

<aside>
🥴 이 패턴을 바로 Redux 패턴이라고 한다. Redux 라이브러리에서 사용하는 패턴

- ContextAPIdhk `useReducer`를 함께 사용해서 Redux처럼 중앙집중형 store로 구현이 가능하다. - 그러나 사이트가 복잡할 수록 비동기작업 때 더 불편하기 느껴질 수 있기 때문에 Redux 라이브러리로 돌아가기도 한다.
</aside>

**간단한 상태 관리**

```jsx
import { useReducer } from "react";

function init(initialState) {
  return { age: initialState };
}

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + action.step;
    case "decrement":
      return state - action.step;
    case "reset":
      return init(action.payload); // 초기화
    default:
      throw new Error();
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, 0, init);

  return (
    <>
      <button
        onClick={() => {
          dispatch({ type: "increment", step: 1 });
        }}
      >
        Increment age
      </button>
      <button
        onClick={() => dispatch({ type: "reset", payload: initialState })}
      >
        Reset
      </button>
      <p>Hello! You are {state.age}.</p>
    </>
  );
}
```

## 알아야할 중요사항

### \***\*1. Local 'Store'\*\***

Redux를 알고 있다면 앱이 모든 컴포넌트의 변수에 접근할 수 있는 중앙 집중식 '스토어'가 있다는 것을 알고 있을 것입니다.

하지만 useReducer는 컴포넌트 내에서 로컬로만 데이터를 저장한다는 점을 명심하세요.

### 2. Reducer는 순수(pure)하다.

Reducer 함수는 **순수 함수**여야 한다. 즉, 동일한 매개변수가 전달되고 side effect가 없는 경우 함수가 동일한 값을 반환한다.

다음의 카운터 앱 예제 reducer 함수를 변경하여 새 값으로 반환하는 대신 상태 값을 직접 변경하도록 하면 작동하지 않는다.

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return state++; //directly increasing state
    case "decrement":
      return state--; //directly decreasing state
    case "reset":
      return 0;
    default:
      throw new Error();
  }
}
```

### 3. \***\*Lazy Initialization\*\***

useReducer Hook은 option으로 세번째 매개변수인 init함수를 받는다. init함수는 init(initialArg)로 initialState를 설정하는 함수이다.

이 함수는 초기 상태를 return 한다. payload 속성에 초기 값인 initialState를 넣어 "reset" 액션을 디스패치할 때 사용할 수 있다. 즉, init 함수를 사용하여 초기 상태를 설정하고, reset 액션을 통해 초기 값으로 상태를 재설정할 수 있다.

## 장점

“상태 변화 코드의 분리”가 가능하다. 즉, `useReducer`는 `useState`와 매우 유사하지만 이벤트 핸들러의 상태 업데이트 로직을 컴포넌트 외부의 단일 함수로 옮길 수 있다.

## reference

- [A Look At React Hooks: useReducer](https://lo-victoria.com/a-look-at-react-hooks-usereducer)
- [useReducer](https://react.dev/reference/react/useReducer)
- [[React] 7. React hooks[3] - useReducer란?](https://goddaehee.tistory.com/311)
- [How to Use React useReducer() Hook](https://dmitripavlutin.com/react-usereducer/)
