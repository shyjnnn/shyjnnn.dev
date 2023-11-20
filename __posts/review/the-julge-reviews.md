---
title: '아르바이트 구인 구직 플랫폼, 더줄게 회고'
date: 2023-07-26
slug: the-julge-reviews
tags: 👩‍🍳더줄게
summary: 더줄게 프로젝트 회고
category: 🌱회고
thumbnail: 'https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/071aab93-3c91-449e-b426-ef579750853e'
---

> [GitHub](https://github.com/codeit-bootcamp-frontend/0-the-julge-young-developers) | [사이트](https://0-the-julge-young-developers.vercel.app/)

Next.js를 처음 도입한 프로젝트이다.

## 급전이 필요해? 급하게 일손이 필요해? 그렇다면 “더줄게”

더줄게는 어쩌면 흔해보일 수 있는 구인구직 사이트이다. 사장님은 내 가게와 모집 공고를 등록할 수 있고, 아르바이트 생은 내 프로필과 공고에 신청을 할 수 있다.

다른 점이 있다면 사장님이 가게 기본 시급을 등록하고, 공고별 시급을 다르게 등록할 수 있어 일손이 급하게 필요할 때, 시급을 올릴 수 있다는 점이다. 기존 시급에서 몇 퍼센트 올랐는지 한눈에 볼 수 있고, 아르바이트 생은 더 좋은 시급에 일을 구할 수 있다는 특징이 있다.

나는 아래와 같은 부분을 맡아 구현하게 되었다.

### 1. ESLint & Prettier 등 FE 컨벤션 환경 설정

크립토미터 프로젝트 당시에는 airbnb lint 규칙을 무조건적으로 사용했다.

<img width="635" alt="image" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/91f0646a-2021-4d71-b3df-9bb09675b23e">_컨벤션 docs 일부_

하지만 이번 프로젝트에서는 팀 회의를 통해 직접 정한 컨벤션을 설정했다. 특히 변수, 함수 등의 네이밍 컨벤션을 정했기 때문에 eslint rules에도 포함시켜줬다.

| 자세한 설정 방식은 [이 글](/trivia/frontend-setting-eslint-prettier)에 있다!

### 2. Input, Button 등 Form 관련 컴포넌트

![form-component](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/d2f90e5b-6d70-472d-be9f-05f5445d2b9b)

더줄게는 재사용되는 컴포넌트가 상당히 많은 편이다. 따라서 공통 컴포넌트의 역할이 중요했고, 입력 Form과 관련된 컴포넌트 대다수를 맡아서 제작했다.

```tsx
/**
 * @param variant ("input"| "input-underline"|"explain")
 * @param title (string)
 * @param isRequired (boolean)
 * @param ref input 태그에 붙는 ref
 * @param onChange input value가 변경되면 실행할 함수(option)
 * @param defaultValue (string(option))
 * @param valid (string(option))
 * @param isValid (boolean(option))
 * @param suffix (string(option))
 */
export default forwardRef(function Input(
  {
    onChange,
    variant = 'input',
    title,
    isPassowrd,
    isRequired,
    defaultValue,
    valid,
    isValid,
    suffix,
  }: FeatureInputProps,
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>,
) {
  if (variant === 'input' || variant === 'input-underline') {
    return (
      <UiInput
      // ... 생략
```

최대한 Polymorphic한 컴포넌트로 만들어 재사용성을 극대화하려고 노력했다. 특히 ForwardRef와 props로 조건(색상, 크기, 유형 등)을 전달하고 조건에 따라 렌더링 되도록 구현했다.

![polymorphic](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/7fb60b0c-49d1-4fcd-8e7b-3107229187a1)

아쉽게도, <u>재사용성인 높아진다는 장점</u>은 분명했지만, **확장성에서 문제**가 생겼다. 한 컴포넌트가 수행해야하는 일이 많아질 수록 점점 props가 많이지면서, 해당 컴포넌트를 사용하는 상위 컴포넌트와 **종속성이 강해진**다는 점이었다. 약간의 스타일만 변경하려 해도 props를 수정해야했기 때문에 불편했다. 또한 각 props가 어떤 조건을 **의미하는 지 점점 파악하기 힘들어진다**는 단점이 있었다.

![component-docs](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/61f72d0f-1104-4b10-a5f4-cef3eb748366)

컴포넌트 문서화는 jsdoc과 notion을 조합해서 사용했다. jsdocs로 이해가 되지 않는 것은 노션에 더 상세히 적어서 공유해 협업에 용이하도록 노력했다. 사실, 스토리북을 사용하면 더 수월하지만 사용해보지 않은 현재로써는 최선의 선택이었던 것 같다. ~~(스토리북을 사용하지 않은 점이 많이 아쉽다)~~

### 2. 사장 가게 상세 페이지

더줄게는 아르바이트생과 사장, 두 개의 유저타입을 갖는다. 따라서 유저별로 접근할 수 있는 페이지가 다른데, 그 중 사장님 가게 상세페이지를 담당했다.

사장님 페이지의 상태는 총 3가지이다.
![사장님 가게 상세페이지 유형](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/2b78be74-d537-4649-81e0-782fd199f024)

1. 가게 등록을 하지 않았을 때, 2. 등록한 공고가 없을 때, 3. 가게 등록 및 공고 등록을 완료했을 때

각 유형 별 컴포넌트를 제작했고, 등록하기 입력은 modal로 제작했다. 따라서 등록을 하고 나면 해당 페이지를 `refresh`해 페이지를 새로 불러왔다.

이때 헨리의 제안으로 가게 등록 및 공고 등록하기 모달은 Funnel Pattern을 적용해줬다.

![funnlePattern](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/05b335ec-6066-487a-8949-9ca9681ede65)
_마케팅 용어 퍼널_

퍼널 패턴이란 토스에서 최초로 이름을 붙인 패턴이다. 마케팅 분야에서 유저가 구매 고객이 될 때까지의 과정을 한번에 처리하지 않고 단계를 나눠 유저 이탈을 막는 마케팅 전략인 퍼널을 재해석한 것이다. 유저가 모든 정보를 하나의 페이지에서 입력하지 않고 하나의 페이지에서는 하나의 정보만 처리할 수 있게 사용자 경험 개선을 위해 페이지를 여러 개로 분리하되, 페이지를 **한방에 쉽게 관리하기 위해 로컬 상태로 페이지 관리**하는 것이다.
| [토스ㅣSLASH 23 - 퍼널: 쏟아지는 페이지 한 방에 관리하기](https://www.youtube.com/watch?v=NwLWX2RNVcw)에서 자세히 살펴볼 수 있다.

![등록하기 퍼널](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/acb32546-770d-445d-852f-59bc0830fae8)

퍼널 패턴을 등록한 이유는 모바일 사이즈에서 입력 시, 하나의 페이지에서 등록해야 할 정보가 많고, 모바일은 특히나, 모달 내 스크롤이 생기는 문제점이 있었기 때문이다. 사용자 경험 개선을 위해 입력 흐름 관리가 필요함을 느껴 도입하게 되었다.

#### Next app router의 서버 컴포넌트 생태계에서 퍼널 녹여내기

하지만 한가지 <u>우려</u>가 있었다면, funnel 패턴을 도입하기 위해선 <u>단계별 렌더링을 조율하는 state</u>가 필요한 데 **페이지 단위에서 상태를 만들면 모든 페이지가 클라이언트 컴포넌트가 된다**는 점이었다. 이렇게 되면 이미 만들어 둔 <u>사장 가게 상세 페이지의 서버 컴포넌트들이 클라이언트 컴포넌트화</u> 된다는 문제점이 생겼다. 즉, 사장 가게 페이지에서 본 프로젝트에서 사용한 Next App router의 서버 컴포넌트 이점을 누리지 못했다.

하지만 다행이 우리의 등록하기 폼은 모달에 있고, 따라서 **모달에서 퍼널 패턴을 사용**한다. 모달은 react potal을 사용해서 구현했기 때문에 기존 페이지 로직과 분리할 수 있다.

따라서 모달을 가장 **leaves 컴포넌트**로 만들어 클라이언트 컴포넌트화 되는 것을 방지했다. 즉, 사장 가게 상세 페이지는 서버 컴포넌트로 유지한 채 모달 내부만 클라이언트 컴포넌트로 구현할 수 있었다.

#### 리액트 포탈로 모달의 스타일 종속 피하기

react potal을 사용하면 좋은 장점은 **스타일링 종속성을 피할 수 있다는 점**도 있다. 페이지에서 state를 관리할 수 없는 상황에서 클라이언트에 페이지 역할을 하는 모달 컴포넌트가 종속되면, 스타일이 부모 클라이언트 컴포넌트에 종속된다. 따라서 원하는 곳에 모달을 위치시키고 싶어도 안되는 문제가 발생한다. react potal은 컴포넌트가 종속되어 있는 <u>돔 트리를 벗어나 외부의 다른 돔으로 렌더</u>하는 기능이다. 따라서 **부모의 style을 종속 받지 않으면서** index.html에 새로운 계층을 만들고 portal을 사용하여 그 새로운 계층에 모달을 렌더링할 수 있었다.

### 3. API 핸들러 추상화

![api-handler](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/3a4b022d-7f8d-4400-b6a4-39e95782347f)

API 핸들러를 추상화해 쉽게 가져다 쓰기 위해 미리 핸들러를 제작했다. 이 과정에서 사용법, params, error 예시, 성공 예시 등을 jsdoc으로 문서화해 가져다 쓸 때 미리볼 수 있도록 했다. 덕분에 api를 쉽게 씌울 수 있었다.

또한 `axios instance`도 미리 만들어둬 핸들러 추상화 당시 편리하게 사용할 수 있었다.

## Keep

### 1. NX Framework의 Library Types 구조에서 착안한 폴더 구조

<img width="245" alt="image" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/40b2513d-7cdf-426d-8dc2-aa5682eea7ae">

컴포넌트가 응집력 높은 단일 책임으로 유지보수에 용이하도록 관심사 분리를 하고자 했다. 많은 고민 끝애 찾은 레퍼런스는 현재 많은 기업에서 사용 중인 NX Framework의 Library Types 구조이다. 사실 NX는 모노레포를 위헤 주로 사용되긴 하지만, 폴더구조 컨벤션이 관심사 분리에 특화되어있다고 느꼈다.

따라서 다음의 4가지 타입으로 컴포넌트를 나눠 진행했다.

| Feature                                                                                                          | UI                                                                   | Data-access                                                                | Utill                                                             |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| - 일명 Smart UI<br>- 데이터 소스에 대한 액세스 권한을 포함<br>- 기능 라이브러리<br>- 다른 타입이 조합되는 곳이다 | - 일명 Dumb UI <br> - 프레젠테이션 포함<br>- feature를 가질 수 없다. | - 백엔드 시스템과 상호작용하기 위한 코드<br>- 상태 관리와 관련된 모든 코드 | - 다른 타입 or 라이브러리에서 사용되는<br> 저수준 유틸리티가 포함 |

도메인은 `user-type`, `common`, `shared` 3가지의 기준으로 나눴고, 각 도메인 별 위의 4가지 라이브러리 폴더를 가진다. 이렇게 폴더구조를 확정해놓으면 UI와 api 로직을 확실히 나눌 수 있었고, 만약 오류가 난다면 ui 문제인지, data 문제인지 원인을 빠르게 파악할 수 있었다.

<br>

**단점**

다만 단점이 존재했다. **폴더가 너무나도 많아진다는 것**이다. 버튼과 같이 아주 작은 컴포넌트를 구현할 때도 UI와 feature로 나눠야했고, 각 폴더별로 한가지의 파일만 존재해도 폴더 하위에 들어가야했기 때문에 부득이하게 폴더가 많아질 수 밖에 없었다. 소규모 프로젝트라면 이정도로 폴더가 많아지는 일은 흔치 않은데..

사용하다보니 <u>왜 해당 패턴을 모노레포에서 사용하는 지</u> 알 수 있었다. 모노레포로 구성하게 되면 레포가 커지게 되고, 그러다보면 이렇게 폴더를 나누는 것이 에러시 원인 파악에 훨씬 도움이 되기 때문이다. 하지만 본 프로젝트처럼 작은 프로젝트에 도입하면 좋다?는 많은 고민을 해봐야할 것 같다..🥹

### 2. 서버 컴포넌트 활용, 번들 사이즈 최적화

Next App router의 가장 큰 특징 중 하나는 **서버 컴포넌트의 도입**이라고 생각한다. 서버 컴포넌트를 사용하면 번들 크기를 압도적으로 줄일 수 있다. (사실 소규모 프로젝트에선 차이가 미미한 것 같기도 하다)

![테이블](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/e6ff4977-4c33-453d-811c-7985844f3f26)

따라서 서버 컴포넌트로 구현 가능한 부분은 최대한 서버 컴포넌트로 만들려고 노력했다. **인터랙션이 필요한 버튼 칸은 클라이언트 컴포넌트**로, 나머지 **정적 데이터는 서버 컴포넌트로 분리**한 것이다.

처음에는 테이블의 Button이 들어가는 cell에 handler를 넘겨줘야해서 테이블 전체를 클라이언트 컴포넌트로 만들었다. 그러나 고민 끝에 이 컴포넌트 내부엔 `Composite Component pattern`으로 cell별로 분리하고 버튼 cell를 가장 leaves에 둬 테이블은 서버컴포넌트로, 버튼만 클라이언트 컴포넌트로 만들 수 있었다.

```tsx
<UiTableBodyRow key={item.id}>
  <UiTableBodyCell>{item.first}</UiTableBodyCell>
  <UiTableBodyCell>{item.second}</UiTableBodyCell>
  <UiTableBodyCell>{item.third}</UiTableBodyCell>
  <UiTableBodyCell>
    {item.status === 'pending' ? (
      //btn component
      <TableStatusButton shopId={shopId} noticeId={noticeId} applicationId={item.id} />
    ) : (
      <UiTableBodyStatusChip status={item.status} />
    )}
  </UiTableBodyCell>
</UiTableBodyRow>
```

다만, 서버 컴포넌트를 활용하는 트릭에 아직 낯설었다. 더 많은 레퍼런스를 찾아보며 best practice를 찾고 싶다.

<img width="345" alt="image" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/bb474bd5-15b7-4e65-9b9c-f77a038ed52c">_Before_

<img width="350" alt="image" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/d6218b9a-49b9-420b-8c3c-c5fb5ea69cb0">_After_

**결론적**으로 서버 컴포넌트로 분리했을 때 총 **번들 사이즈가 5KB 감**소했다.

<img width="347" alt="image" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/672f1889-a7ff-4c45-874f-64518ea6fa02">

더불어서 <u>FCP와 LCP도 약 2ms 감소했다</u>. 이것이 <u>서버 컴포넌트의 영향</u>인지, 또한 <u>유의미한 수치</u>인지는 고민이 필요하지만, 확실히 **서버 컴포넌트로 마이그레이션을 하면 번들 사이즈가 감소하는 것을 확인**할 수 있었다.

## Problem

### 1. 다른 타입의 유저의 접근 권한 관리

더줄게는 비회원, 알바, 사장가 접근할 수 있는 페이지 권한이 다르다.

<img width="864" alt="image" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/e7fec8ed-27f1-4361-8179-83b6cfa690eb">
비회원의 경우 `/`의 공고 전체보기 페이지만 볼 수 있고, 공고 상세는 접근할 수 없다. 
반면 알바는 내 프로필 상세, 공고 상세 및 신청을 할 수 있다. 
사장은 내 가게 상세, 공고 상세 등을 볼 수 있다. 또한 사장의 경우 내 가게의 공고 상세 페이지로 들어가면 신청자 목록을 볼 수 있지만, 당연하게도 내 가게 아닌 공고 상세 페이지에서는 볼 수 없다.

<br>

이를 위해 Next.js의 m**iddleware**와 **쿠키**를 적극적으로 활용했다.

```tsx
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookie = req.cookies.get('token');

  let token;
  if (cookie) {
    token = cookie.value;
  }

  // 로그인된 유저만 접근 O (내 가게, 내 프로필)
  if (pathname.startsWith('/my-shop') && !token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
  if (pathname.startsWith('/my-profile') && !token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // 로그인된 유저는 로그인, 회원가입 페이지에 접근 X
  if (pathname.startsWith('/signin') && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (pathname.startsWith('/signup') && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
```

미들웨어를 사용하면 접근 전 권한을 확인해 redirect를 시킬 수 있다. 이를 활용해 페이지 간 이동 시 쿠키에 있는 토큰을 확인해 접근 권한을 제어했다.

로그인 페이지에서 로그인을 성공할 경우 쿠키에 토큰과 더불어 uid(userId) 따로 저장한다. 또한 사장님이 가게를 등록한 경우, 쿠키에 sid(shopId) 저장한다.

```tsx
// 축약
const handleClickToDetail = (isClosed: boolean, shopId: string, noticeId: string) => {
  if (isClosed) return;
  const userShopId = getCookie('sid') as string;

  if (userShopId === shopId) {
    router.push(`/my-shop/${noticeId}`);
  } else {
    router.push(`/detail/${shopId}/${noticeId}`);
  }
};
// 생략
```

코드와 같이 userId, shopId는 페이지 내부에서 클릭으로 인한 페이지 이동 시 내 프로필과 내 가게 페이지 여부를 판단하기 위해 사용된다. 예를 들어 만약 쿠키의 sid와 해당 공고 카드의 shopId가 다르다면 내 가게가 아닌 것으로 판단하는 것이다.

> 참고로 서버컴포넌트에서 쿠키를 볼 때는 `next/headers`를 사용했다.

<aside>
잠깐..🤔

회고를 하다가 한가지 떠올랐는데 <u>클라이언트 컴포넌트로 만들어 handleClickToDetail라는 핸들러를 사용해서 페이지 이동을 하는 것이 아닌</u> **서버 컴포넌트**에서 **Link 컴포넌트**를 사용해 동적 경로를 부여했으면 <u>번들 사이즈를 줄일 수 있었을 것 같다</u>. 리팩토링이 필요하다! 🥹

</aside>

```tsx
/* request interceptors */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    /**
     * request 직전 공통으로 진행할 작업
     */

    if (config && config.headers) {
      const token = getCookie('token')

      // 인증할 때 받은 토큰을 쿠키에 저장했다면 가져옵니다.
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
        config.headers['Content-Type'] = 'application/json'
      }
    }

    if (process.env.NODE_ENV === 'development') {
      const { method, url } = config
      logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`)
    }

    return config
  },
```

추가적으로 <u>클라이언트에서 권한이 필요한 요청</u>을 보낼 경우, axios로 인스턴스의 interceptor에 토큰을 주입해 편리하게 사용했다.

<aside>
문제점!

하지만 userId와 shopId를 클라이언트에서 볼 수 있어 보안에 좋지 않다는 문제점이 있었다.

</aside>

### 공고 리스트 무한 스크롤링

![공고-리스트](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/ecfbaf31-252f-4256-a93c-ddaddfe8fbaa)

사장님 가게 상세 페이지에는 무한 스크롤링으로 이루어진 등록한 공고 리스트가 있다. 무한 스크롤링은 보통 view와 상호작용하며 사용자가 스크롤을 내릴 때마다 새로운 공고가 자동으로 로드되어 페이지의 끝이 없는 것처럼 보이게 된다.

리액트 쿼리를 쓰는 경우 `useInfiniteQuery`를 사용해 구현할 수 있고, 일반적으로 `Intersection Observer`를 사용해 구현할 수 있다.

이번 프로젝트에서도 `Intersection Observer`를 사용해 무한 스크롤링을 구현했다.

`Intersection Observer`는 브라우저 내에서 뷰포트와 대상 요소(Element) 간 교차점(Intersection)에 대한 변화를 비동기적으로 감지할 수 있는 API이다. addEventListener()의 scroll 이벤트를 이용해서 무한 스크롤을 구현할 수 있지만, reflow 등의 성능 문제가 발생한다. 반면 `Intersection observer`r를 사용하면 `IntersectionObserverEntry`의 속성을 활용하여 요소들의 위치를 알 수 있기 때문에, **리플로우 현상을 방지**할 수 있다.

화면 하단 스크롤 감지에 적용하려면, 브라우저 뷰포트와 교차하는 요소를 하단에 배치하고 이 요소가 뷰포트에 들어오는 시점을 감지하면 된다.

하지만 문제점이 있었는데 모든 공고 카드 데이터를 처음부터 client에서 받아오다 보니 F**CP가 느리다는 점**이었다. 이에 대한 방안으로 서버 컴포넌트 혹은 SSR을 도입하려 했지만, **무한 스크롤링이라는 기능은 클라이언트 view에 종속되는 기능**이라 고민이 필요했다.

또, `Intersection observer`의 특성으로 인한 우여곡절도 있었다.

## Try

### 1. 접근 권한 관리를 Hateoas로?

기존에 방식은 userId와 shopId를 클라이언트에서 볼 수 있어 보안이 좋지 않았다. 사실 http only 설정을 한다고 해도 마음만 먹으면, 쿠키에 Id를 넣어 접근할 수 있기 때문이다. 유저를 식별할 수 있는 정보는 최대한 가리는 것이 좋다는 것도 알고 있었다.

고민 끝에 내린 결론은 <u>API를 잘 활용해보자였</u>다. 비록 시간이 촉박해 도입하진 못했지만 여러 가설을 세웠기 때문에 리팩토링 하며 도입해보고 싶다.

![heateoas](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/b26b3354-08e1-4cd4-84f3-ae8ac6eae769)
API는 Hateoas로 이루어져있었다. 클라이언트에서 서버와 동적인 상호작용이 가능한 것이다.

response에 해당 유저가 할 수 있는 액션 목록이 온다. 즉, 사장님으로 요청을 보내면 사장님이 현재 요청 이후 할 수 있는 요청 목록이 오는 것이다. 따라서 ref를 key로 사용해, userId나 shopId를 따로 저장할 필요없이 토큰만으로도 유저별 권한을 제어할 수 있게 된다.

프로젝트 기간 마지막에서야 Haetoase 알아 바로 도입하지 못해 아쉬움이 남는다. 하지만 접근 권한 제어를 다양한 방식으로 시도해봤다는 점에서 의미가 있었다고 생각한다.

### 공고 리스트 무한 스크롤링 - 초기 6개 SSR

![무한스크롤링](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/f8c1cbcc-eceb-4b42-96c6-0a96b2b08537)

고민 끝에 초기 6개 공고 카드 데이터는 서버 컴포넌트에서 미리 받아와 넘겨주고, 이후의 데이터는 클라이언트 컴포넌트에서 뷰에 따라 받아오기로 했다.

> [관련 전체 코드](https://github.com/codeit-bootcamp-frontend/0-the-julge-young-developers/blob/main/libs/my-shop/feature/my-notice/my-notice-list.tsx)

```tsx
// 리스트 서버 컴포넌트
const INITIAL_CARDS = 6; // 6개
export default async function MyNoticeList({ shopId }: { shopId: string }) {
  const response = await getShopNotices({
    shopId,
    offset: 0,
    limit: INITIAL_CARDS,
  });
  if (response instanceof Error) {
    throw new Error();
  }
  if (typeof response === 'string') {
    throw new Error(response);
  }

  return response.items.length > 0 ? (
    //클라이언트 컴포넌트로 받아온 초기 6개 데이터 넘겨줌
    <MyNoticeListClient shopId={shopId} initialNoticeData={response} />
  ) : (
    <UnregisteredMyNotice />
  );
}
```

무한 스크롤은 카드 리스트 제일 하단에 달아둔 관찰자 ref와 view의 하단이 맞닿을 때 발생한다. 여기서 <u>문제점</u>이 생겼는데, 만약 6개의 공고 리스트가 생성되었다고 해도, 그 **높카드가 차지하는 영역이 view의 높이보다 작다**면 스크롤이 생기지 않고, 카드 리스트 제일 하단에 달아둔 관찰자 ref와 view의 하단이 **닿을 수 없다는 점**이었다.

<aside>
Intersection Observer는 뷰포트와 관찰 대상 요소 간의 교차점에 변화가 발생했을 때 콜백 함수를 실행하게 된다. 따라서, 처음에 관찰 대상 요소가 화면에 이미 나타나 있는 상태에서, 그 요소가 화면에서 벗어나는 변화를 감지해야 콜백 함수가 실행될 수 있다.
</aside>

따라서 초기 최대 6개 데이터 서버 fetch는 유지하되, 6개 데이터가 화면을 채우지 않았다면, 화면을 채우기 위한 카드 (라인) 수를 계산하여 추가 fetch를 하는 로직을 추가해 문제를 해결할 수 있었다.

> [관련 전체 코드](https://github.com/codeit-bootcamp-frontend/0-the-julge-young-developers/blob/main/libs/my-shop/feature/my-notice/my-notice-list-client.tsx)

두 방법을 선택하고 얻은 **이점**은 다음과 같다.

1. **첫 화면 로드 속도 개선**
   클라이언트에서만 전체 공고를 가지고 올 경우, 렌더링이 느릴 수 밖에 없어 사용자 경험이 좋지 않다 판단했다. 첫 화면에 영향을 미치는 최소한의 데이터(6개)를 미리 서버에서 fetch해 넘겨줌으로서 속도를 개션할 수 있었다.
2. **view에 따른 자동 fetc**h
   Intersection Observer가 제기능을 할 수 있을 때까지 (즉, view에 카드가 꽉 찰때까지) 스크롤 없이도 계속 데이터를 가지고 온다. 이를 통해 큰 화면으로 보는 사용자는 페이지 첫 로드 직후 화면 전체에서 가능한 많은 공고 카드를 한번에 볼 수 있다.

페이지 이동 시, **사용자가 처음 보는 화면을 개선하는 것은 사용자 경험에 많은 영향**을 미친다. 이번 시도를 통해 다양한 시나리오로 접근해보는 좋은 경험을 할 수 있었다.

## 소감

2주동안 몰입있는 개발을 하면서 많은 기술적인 고민을 할 수 있었던 프로젝트이다. 특히 Next.js를 잘 쓰고, 관심사 분리를 하고, 특히 사용자 경험을 개선하기 위해 많은 노력을 기울였다.

아쉬운 점이 있다면, 당시에는 좋은 방법이라고 생각했던 **Polymorphic 컴포넌트 구조**가 사용하다보니 구조가 복잡해질 수록 **종속성이 강해진 것**이다. 아쉽게도 이번 프로젝트에서는 시간상, 해당 패턴을 유지했지만, 다음 프로젝트에서는 다른 방법을 찾아봐야할 것 같다. <u>이번 경험을 통해 장점이 있으면 단점이 있음</u>을 깨달을 수 있었다.

또한, **Funnel Pattern에서도 hook을 사용하지 않아 아쉬움**이 남는다. Toss slash library의 useFunnel hook이 내부적으로 next page router에 의존해 app router를 사용한 본 프로젝트에서는 사용할 수 없었다. 따라서 직접 구현해야했고, 마지막에 도입한 패턴이다 보니 시간 관계상 컴포넌트에서 직접 로직을 추가했는데, 추후 리팩토링을 통해 커스텀 훅을 만들어보고싶다.

마지막으로, **서버 컴포넌트의 개념을 처음 접하다보니 잘 사용한 것**인지 의문이 든다. 사실, 무한 스크롤링에서도 데이터만 서버에서 prefetch하는 것이 아닌 렌더링 자체를 서버에서 해도 무방했을 것 같다. 공부를 통해 더 잘 사용해보고 싶다는 욕구가 강해진 프로젝트였다 :)

전반적으로 2주라는 시간동안 아쉬움도 많았지만, 그래도 만족스럽다! 이렇게 짧은 시간 내에도 <u>다양한 시나리오를 시도하면서 개선시켜나가고자 한 점</u>이 의미있었다. 앞으로도 **현재에 안주하지 않고 항상 개선점을 모색해 발전하는 개발자**가 되어야겠다고 다짐한다.
