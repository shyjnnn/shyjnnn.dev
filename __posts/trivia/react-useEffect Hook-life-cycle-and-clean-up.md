---
title: React useEffect Hook의 Life Cycle와 Clean-up
date: 2023-04-27
slug: React-useEffect-Hook의-Life-Cycle와-Clean-up
tags: React.js
category: 🙏잡학사전
---

> useEffect Hook은 React에서 제공하는 기능 중 하나로, 컴포넌트의 상태 변화나 생명주기에 따라 콜백 함수를 실행할 수 있도록 해줍니다.

## useEffect Hook 사용법

```
useEffect(<function>, <array>);

```

`<function>`은 useEffect가 실행할 콜백 함수이며, `<array>`는 콜백 함수를 실행시킬 조건으로, dependency 배열이라고도 부릅니다.

```
useEffect(() => {
    console.log('Effect function is called.');

    return () => { //이게 cleanup 함수
      console.log('Cleanup function is called.');
    };
  }, [count]);

```

useEffect Hook은 컴포넌트가 렌더링된 후 DOM에 적용된 후 실행되며, 컴포넌트가 다시 렌더링될 때마다 실행됩니다. useEffect dependency에 따라 실행 여부가 달라집니다.

또한 콜백 내에서 함수를 반환할 수 있는데 이것을 clean-up 함수라고 합니다.

## useEffect의 생명주기

useEffect는 ① 컴포넌트가 마운트 된 후, ② 컴포넌트가 업데이트되고 난 후 ③ 컴포넌트가 언마운트 되기 전 모두 실행되는데, 이때 조건에 따라 실행 여부가 달라진다.

1. Mounting (컴포넌트 생성 단계)
   - useEffect 함수가 컴포넌트가 최초로 마운트될 때 한 번 실행됩니다.
   - dependency에 빈배열을 전달하면 컴포넌트 마운트시에만 실행됩니다.
   - cleanup 함수는 실행되지 않습니다.
2. Updating (컴포넌트 업데이트 단계)
   - useEffect 함수는 컴포넌트가 state나 props가 변경될때마다 업데이트됩니다. 즉, 두 번째 파라미터로 전달하는 dependency 배열에 의해 useEffect가 실행됩니다.
   - 즉, 컴포넌트가 업데이트 되면 dependency가 업데이트되고, 그러면 **이전에 등록**된 cleanup 함수가 실행될 수 있습니다.
3. Unmounting (컴포넌트 삭제 단계)
   - 컴포넌트가 언마운트되기 전에 useEffect 함수에서 등록한 cleanup 함수가 실행됩니다.

### clean-up 함수

위에서 언급했듯, useEffect에서 첫번째 parameter로 넣어준 함수(=콜백)의 return 함수입니다.

컴포넌트의 unmount 이전 or update 직전에 어떤 작업을 수행하고 싶으면 cleanup 함수를 반환해주어야합니다.

useEffect 콜백 함수는 dependency 배열이 업데이트될 때마다 실행됩니다. 그리고 이전에 등록된 clean up 함수는 다음과 같은 순서로 실행됩니다.

컴포넌트가 재렌더링됩니다.
이전에 등록된 clean up 함수가 실행됩니다.
useEffect 콜백 함수가 실행됩니다.

이때, cleanup함수는 이전에 등록된 cleanup함수가 실행되는 것입니다.

```
import { useState, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect !");
    return () => {
      console.log(count);
    };
  }, [count]);

  return (
    <div className="App">
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

```

이 코드를 실제로 실행해보면

![https://velog.velcdn.com/images/shinyejin0212/post/482ce032-f1fd-431d-a584-f599bfa2b033/image.gif](https://velog.velcdn.com/images/shinyejin0212/post/482ce032-f1fd-431d-a584-f599bfa2b033/image.gif)

이와 같이 클릭 시 (즉, 업데이트 시) 실행되는 clean-up 함수는 이전에 등록된 clean-up 함수임을 알 수 있습니다.
즉, clean-up함수는 이전의 값을 바라보고 있기 때문에(클로저) 해당 코드는 위와 같이 count가 이전 값으로 console에 출력되게 됩니다.

즉, clean up 함수를 사용하면 이전에 등록된 작업을 취소하고 새로운 작업을 수행할 수 있습니다. 이것은 예를 들어 타이머나 setInterval 함수와 같은 것을 사용할 때 유용합니다. clean up 함수를 사용하면 이전에 등록된 타이머나 setInterval 함수를 취소하고, 새로운 함수를 등록할 수 있습니다.

```
useEffect(() => {
  const intervalId = setInterval(() => {
    // some task
  }, 1000);
  return () => clearInterval(intervalId);
}, []);

```

위 코드에서 setInterval 함수는 1초마다 실행되는 작업을 수행합니다. 그리고 clean up 함수에서는 clearInterval 함수를 사용하여 이전에 등록된 작업을 취소합니다. 이렇게 하면, 컴포넌트가 언마운트되기 전에 등록된 작업을 취소할 수 있습니다.

### reference

[React - Effect Hook ( Clean-up )](https://velog.io/@enjoywater/React-Effect-Hook-Clean-up)
