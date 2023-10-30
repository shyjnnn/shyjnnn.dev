---
title: Next.js에서의 SSR과 hydration
date: 2023-06-01
slug: Next.js에서의-SSR과-hydration
tags: Next.js
category: 🙏잡학사전
---

안녕하세요!🫡 오늘은 Next.js의 hydration에 대해 살펴보려고 합니다.

Next.js를 사용하는 가장 큰 이유 중 하나는 Pre-rendering입니다.

Pre-rendering을 하는 방법에는 SSG와 SSR이 있는데요! SSR은 hydration이라는 개념과 아주 밀접한 관계가 있습니다.

> Next.js 공식 홈페이지에서 가장 강조하고 있는 것 바로 **hybrid static & server rendering**입니다.

## Next.js에서의 SSR

> Next.js는 모든 페이지를 미리 Pre-render합니다. 이는 Next.js가 모든 일을 클라이언트 측에서 모든 작업을 수행하는 것이 아니라, 각 페이지의 HTML을 미리 생성하는 것이죠.
> ![Untitled](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/1d130115-f2b5-44b6-925b-6bc50d7e7e4b)

출처 : Next.js 공식문서

1. 클라이언트 요청이 서버에 도달합니다.
2. 서버는 요청된 페이지의 데이터를 가져옵니다. 이 데이터는 API 호출, 데이터베이스 쿼리 등을 통해 얻을 수 있습니다.
3. 서버는 가져온 데이터를 사용하여 페이지의 HTML을 생성합니다. 이 HTML은 요청된 페이지의 모든 콘텐츠를 포함합니다.
4. 생성된 HTML은 클라이언트로 전송됩니다.
   - 이때 HTML에는 필요한 최소한의 자바스크립트 코드가 포함될 수 있습니다.
5. 클라이언트는 받은 HTML을 해석하고 렌더링합니다.
   - 이때 브라우저에서 자바스크립트 코드가 실행되어 페이지와 사용자 인터랙션을 가능하게 합니다. 이 과정을 **hydration**라고 합니다.
6. 페이지가 interactive 상태로 전환되고 사용자는 페이지와 상호작용할 수 있게 됩니다.

## Hydration

서버에서 렌더링된 HTML 페이지가 클라이언트에서 로드되고, 클라이언트 측 JavaScript 코드가 실행되어 상호 작용할 수 있는 상태로 전환되는 과정을 말합니다.

> Next.js의 중요한 기능 중 하나로, 서버 측 렌더링(SSR)과 클라이언트 측 렌더링(CSR)의 혼합된 접근을 가능하게 합니다.
>
> **hydration**은 실제로 서버 측에서 렌더링된 HTML과 클라이언트 측에서 생성된 React 컴포넌트 트리 간의 일치를 위해 사용됩니다.

코드에 기반해서 말하자면, Next.js는 서버에서 HTML을 문자열로 가져온 후에, 클라이언트에서 서버에서 보내준 HTML을 `hydrateRoot()` 혹은 `render()`하여 브라우저에 렌더링됩니다.

Next.js는 서버에서 보여줄 HTML 컨텐츠를 가져오기 때문에 재차 `render()` 함수로 HTML을 생성하여 DOM을 그리는 일은 비효율적입니다. 따라서 `hydrateRoot()` 함수로 서버에서 받아온 HTML에 유저가 상호작용할 수 있는 이벤트 리스너만 연결하는 것입니다.

### hydrateRoot() 메소드

- 참고 : [Next.js hydration 구현 코드 정리](https://www.howdy-mj.me/next/hydrate)

`hydrateRoot()` 함수는 React DOM에서 제공되는 함수로, 클라이언트 측에서 서버로부터 받은 HTML을 가져와 해당 HTML의 React Component Tree를 생성합니다.

이때, 컴포넌트의 event handler, state value 및 동적인 부분들에 연결해 Initial SSR과 일치하는 동적인 상태를 제공합니다.

`hydrateRoot()`는 다음과 같은 일을 합니다.

1. 서버에서 받아온 DOM tree와 자체적으로 렌더링한 tree를 비교합니다.
   - 이때, HTML파일을 렌더링 된 트리가 아닌, 버츄얼 돔과 비교합니다. 즉, Hook을 사용한다면 useEffect가 실행되기 전의 상태와 비교하는 것이죠!
   - 또한, text나 attribute 값은 비교하지 않습니다. 결국 렌더링된 element의 type과 순서만 비교하는 것입니다. ~~(따라서 스타일 불일치가 발생)~~
2. 두 tree 사이의 diff를 얻어낸 뒤, 자체적으로(클라이언트사이드) 렌더링 한 tree에 비교하면서 어떤 DOM이 어떻게 매칭되는지 이해합니다.
3. 이해한 내용에 따라, CSR 동작을 실행합니다.

즉, hydration을 사용하면 클라이언트 측에서 새로운 렌더링을 수행하는 대신, 서버에서 이미 렌더링된 HTML과 일치하는 상태를 클라이언트에서 유지할 수 있습니다.

### Hydration Error

반적으로 서버에서 생성된 HTML과 클라이언트에서 렌더링된 React 컴포넌트 트리 간의 불일치가 발생한 것을 의미합니다. 즉, 컴포넌트의 Mount나 Data Loading 등의 부분에서 차이가 발생했을 수 있는 것이죠.

리액트는 클라이언트 측에서 hydration을 수행할 때, 서버와 클라이언트 간에 렌더링된 Content가 동일하다고 가정합니다. 그러나 hydration로 인해 불일치가 발생하더라도, 개발자 모드에서 경고를 표시하긴 하지만, 차이를 자동으로 수정하진 않습니다.

![Untitled 1](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/5296d50c-3312-4c7c-9fd9-9427afe12e79)

그 이유는 불일치가 발생하는 경우가 드물고 모든 MarkUp을 검증하는 작업은 비싼 작업이기 때문입니다.

이와 동일하게 React의 `hydrateRoot()` 메소드르 사용하는 [Next.js](https://nextjs.org/docs/messages/react-hydration-error)에서도 브라우저 콘솔에 경고를 표시합니다.

**[스타일 이슈](https://fourwingsy.medium.com/next-js-hydration-%EC%8A%A4%ED%83%80%EC%9D%BC-%EC%9D%B4%EC%8A%88-%ED%94%BC%ED%95%B4%EA%B0%80%EA%B8%B0-988ce0d939e7)**

앞에서 언급했듯, hydration으로 인해 스타일 이슈가 발생할 수도 있습니다. 그 *이유는 diff를 비교할 때, text나 attribute까지 살펴보지는 않기 때문*입니다.

예를 들어, 서버 측에서 스타일이 적용된 컴포넌트를 렌더링한 후 클라이언트 측에서 hydration이 발생하면 스타일이 중복 적용되거나 초기 스타일과 충돌할 수 있습니다.

해결법

- 클라이언트 사이드에서만, 혹은 서버 사이드에서만 렌더링되는 로직을 제거합니다.
- CSS 규칙의 우선 순위나 클래스 이름 충돌 등을 확인합니다.
  - 조건부 렌더링, CSS 모듈, CSS-in-JS 을 사용해 해결 가능합니다.

## 출처

1. [Next.js hydration 스타일 이슈 파악하기](https://fourwingsy.medium.com/next-js-hydration-%EC%8A%A4%ED%83%80%EC%9D%BC-%EC%9D%B4%EC%8A%88-%ED%94%BC%ED%95%B4%EA%B0%80%EA%B8%B0-988ce0d939e7)
2. [Next.js의 렌더링 과정(Hydrate) 알아보기](https://www.howdy-mj.me/next/hydrate)
3. [Text content does not match server-rendered HTML](https://nextjs.org/docs/messages/react-hydration-error)
4. [How Next.js Works](https://nextjs.org/learn/foundations/how-nextjs-works/rendering)
5. [Streaming with Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense)
