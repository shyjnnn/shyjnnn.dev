---
title: 리액트의 Strict 모드
date: 2023년 5월 3일
slug: 리액트의-strict-모드
tags: React.js
category: 🙏잡학사전
---

```jsx
<StrictMode>
  <App />
</StrictMode>
```

- 코드의 잠재적인 문제가 실제 버그로 발전하기 전에 잡아내는 데 도움이 되는 개발 도구입니다.
- Strict mode는 개발 모드에서만 활성화되며, 제품 모드에서는 동작하지 않습니다.
- CRA나 vite 등으로 웹앱을 설정하면 자동으로 StrictMode가 추가됩니다.
- porps가 없고, 부모에서 Strict Mode가 선언되었다면 모든 자식에 대해서 Strict 모드가 실행됩니다.

### Strict 모드를 사용하면

1. 컴포넌트가 불완전한 렌더링으로 인한 버그를 찾기 위해 **재렌더링** 합니다. (항상 렌더링 기능을 두번 호출합니다)
   - 순수함수(동일한 props, state 및 context 가 주어지면 항상 동일한 JSX를 반환해주는 함수)여야 하는 것들을 두번 호출합니다.
     - 순수함수여야 하는 것들
       - 컴포넌트 함수 본문(최상위 로직만 있으므로 이벤트 핸들러 내부의 코드는 포함되지 않음)
       - `useState`, `set` functions, `useMemo`, or `useReducer`에 전달하는 함수(콜백)
       - constructor, render, shouldComponentUpdate와 같은 일부 클래스 컴포넌트 메소드
     - 예를 들어
2. 컴포넌트가 Effects cleanup가 누락되어 발생한 버그를 찾기 위해 한 번 더 Effects를 다시 실행합니다.
   - 즉 setup+cleanup 사이클을 한번 더 실행!
   - 참고 : [https://ui.toast.com/posts/ko_20210611](https://ui.toast.com/posts/ko_20210611)
3. 컴포넌트에서 **더 이상 사용되지 않는 API의 사용 여부**를 확인합니다.

   > 구식 context API는 오류가 발생하기 쉬워 이후 릴리즈에서 삭제될 예정이라합니다. 따라서 지금은 모든 16.X 버전에서 여전히 돌아가지만 strictMode 에서는 경고 메시지를 호출한다고 합니다.

- 주로 이전 클래스 컴포넌트에서 사용했던 것들
  1. findDOMNode 사용(권장되지 않음)에 대한 경고
     - React v16 이전 버전에서 사용되었던 메서드
     - 현재는 ref를 사용해서 dom요소를 참조함
  2. UNSAFE*componentWillMount와 같이 권장되지 않는UNSAFE* class lifecycle methods 사용에 대한 경고
  3. Legacy context (childContextTypes, contextTypes, and getChildContext).
  4. Legacy string ref 사용에 대한 경고 (this.refs)
     - 대신 우리가 배운 `React.createRef();`와 `current 프로퍼티`를 사용할 것!
