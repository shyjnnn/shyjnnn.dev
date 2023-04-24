---
title: 리액트에서 배열을 렌더링할 때 key를 써야 하는 이유가 뭘까?
date: 2023년 4월 25일
slug: 리액트에서-배열을-렌더링할-때-key를-써야-하는-이유가-뭘까
tags: React.js
category: 🙏잡학사전
---

배열을 렌더링할 때 key를 지정하지 않으면 다음과 같은 오류가 뜨는 것을 볼 수 있다.

![https://velog.velcdn.com/images/shinyejin0212/post/80a2da29-19ca-4cc1-a1c7-dc837398f078/image.png](https://velog.velcdn.com/images/shinyejin0212/post/80a2da29-19ca-4cc1-a1c7-dc837398f078/image.png)

Key를 지정하더라도 배열의 인덱스 같이 데이터를 구분할 수 없는 고유하지 않은 값으로 Key를 지정하면 렌더링이 잘못될 수 있다.

## 공식문서에 따르면..

Key는

1. React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕고,
2. 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야한다.

즉, 그 값이 변하지 않는 유일한 식별자의 역할을 가진다.

## 배열 렌더링에서 key의 역할

```jsx
const items = [
  { id: 1, name: "apple" },
  { id: 2, name: "banana" },
  { id: 3, name: "orange" },
];

function FruitList() {
  return (
    <ul>
      {items.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
}
```

key를 지정하지 않았을 때의 예시이다.

리액트는 각 아이템을 구분할 수 있는 고유의 값을 알지 못하기 때문에 배열이 업데이트 될 때 문제가 발생한다.

key가 없으면 리액트는 배열의 인덱스를 사용하여 업데이트를 수행한다. 그러나 배열의 인덱스는 항상 일정하지 않기 때문에 예측이 불가능하다.

예를 들어 배열에서 아이템을 삭제하면 인덱스가 변경됩니다. 그 결과, 리액트는 아이템이 삭제된 것으로 판단하지 않고, 단순히 인덱스가 변경된 것으로 판단하여 불필요한 렌더링을 발생시키게 된다..

즉, 나는 apple을 삭제하고자 했는데, banana가 삭제될 수도 있다는 것이다.

## Key는 엘리먼트의 변화를 감지한다.

React에서는 컴포넌트가 상태(state) 변경, 이벤트 처리 등으로 인해 렌더링될 때, Virtual DOM을 통해 이전 렌더링 결과와 새로운 렌더링 결과를 비교하고 변경된 부분만 실제 DOM에 반영한다. 이때 배열도 마찬가지로 각 원소를 하나씩 비교하고 변경된 부분만 갱신한다.

### **리액트의 재조정(reconciliation) 과정**

단계별로 보자면

![https://velog.velcdn.com/images/shinyejin0212/post/c7fc8a90-3aed-4438-aeba-eadd801dde71/image.png](https://velog.velcdn.com/images/shinyejin0212/post/c7fc8a90-3aed-4438-aeba-eadd801dde71/image.png)

1. virtualDOM에서 변화를 감지한다. 연두색 부분이 변경된 Node이다.

![https://velog.velcdn.com/images/shinyejin0212/post/113bddf2-65e8-4368-b3aa-06e22c682a2d/image.png](https://velog.velcdn.com/images/shinyejin0212/post/113bddf2-65e8-4368-b3aa-06e22c682a2d/image.png)

2. 변화가 일어난 virtualDOM과 realDOM을 비고해 새로운 DOM을 연산한다.

![https://velog.velcdn.com/images/shinyejin0212/post/42fd84ca-f7b2-49f8-9608-ed057c0d24c4/image.png](https://velog.velcdn.com/images/shinyejin0212/post/42fd84ca-f7b2-49f8-9608-ed057c0d24c4/image.png)

3.  비교 이후, realDOM은 virtualDOM과 동일하게 업데이트된다.

> 즉 realDOM은 모든 부분을 업데이트 하는 것이 아닌 변화가 감지된 부분만 업데이트한다.

만약 `key`를 지정하지 않는다면, 어떤 요소가 변화된 것인지 명확하게 알 수 없기 때문에 모든 부분을 변경해야한다.

따라서 리액트는 `key` 속성을 지원한다. `key`를 사용한다면 React는 각 아이템의 고유한 식별자를 알 수 있기 때문에, 변경되 부분만 업데이트하고 나머지는 그대로 둘 수 있다.

- 자식들이 `key`를 가지고 있다면, 리액트는 `**key`를 통해 기존 트리와 이후 트리의 자식들이 일치하는지 확인\*\*한다.
  - `key`는 배열의 항목들 사이(형제 사이)에서 고유하면 되고, 전역에서 고유할 필요는 없다.

## `map`의 인덱스를 `key`로 사용할 때 발생하는 문제점

배열이 재배열되면 배열 내부의 엘리먼트에 해당하는 `key` 값 또한 바뀐다.

컴포넌트는 `key`를 기반으로 갱신되고 재사용되기 때문에 컴포넌트의 `key` 값이 바뀌면서 컴포넌트의 state가 꼬이거나 의도하지 않은 방식으로 바뀌는 문제가 발생할 수 있다.

- 인덱스를 `key`로 사용하여 문제가 발생하는 [예시](https://legacy.reactjs.org/redirect-to-codepen/reconciliation/index-used-as-key)
- 인덱스를 `key`로 사용하지 않고 재배열, 정렬할 때 발생하는 문제들을 해결하는 [예시](https://legacy.reactjs.org/redirect-to-codepen/reconciliation/no-index-used-as-key)

## 인덱스를 `key`로 설정해도 괜찮은 경우?

1. 배열의 항목들이 계산을 거쳐 만들어지지 않아 정적이고, 변경되지 않을 것
2. 렌더링할 항목에 안정적인 id가 없을 것
3. 배열을 재배열하거나 필터하지 않을 것

위 **세 가지 요건을 모두 만족**할 때, 최후의 수단으로 항목의 인덱스를 `key`로 사용할 수 있다.

[uuid](https://github.com/uuidjs/uuid) 또는 [nanoid](https://github.com/ai/nanoid) 같은 고유 id를 생성해주는 패키지를 사용하는 방식도 있다.

## 정리하자면?

요소마다 Key로 고유한 값을 지정해주면, 요소를 삭제, 추가하는 등 배열이 변경될 때, 정확히 어떤 요소가 변화한 것인지 알 수 있어서 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕는다.

### reference

- [https://junior-datalist.tistory.com/184](https://junior-datalist.tistory.com/184)[https://ko.legacy.reactjs.org/docs/reconciliation.html#recursing-on-children](https://ko.legacy.reactjs.org/docs/reconciliation.html#recursing-on-children)

- [https://ko.legacy.reactjs.org/docs/lists-and-keys.html#keys](https://ko.legacy.reactjs.org/docs/lists-and-keys.html#keys)

- [https://ko.legacy.reactjs.org/docs/reconciliation.html#recursing-on-children](https://ko.legacy.reactjs.org/docs/reconciliation.html#recursing-on-children)

- [https://ko.legacy.reactjs.org/docs/reconciliation.html#keys](https://ko.legacy.reactjs.org/docs/reconciliation.html#keys)

- [https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318](https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318)

- [https://betterprogramming.pub/why-react-keys-matter-an-introduction-136b7447cefc](https://betterprogramming.pub/why-react-keys-matter-an-introduction-136b7447cefc)
