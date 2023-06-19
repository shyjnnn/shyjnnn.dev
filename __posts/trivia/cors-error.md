---
title: CORS 에러란?
date: 2023년 6월 20일
slug: CORS-에러란
tags: CS, Network
category: 🙏잡학사전
---

웹 개발을 하다보면 CORS 정책 위반으로 인해 에러가 발생하는 상황이 굉장히 흔합니다. 프론트엔드, 백엔드 모든게 정상인데, request를 보내면 시뻘건 CORS 에러 콘솔 창으로 대답하죠... 🤣🤣

```jsx
Access to fetch at ‘http~~’ from **origin** ‘http://localhost:3000’ has been blocked by CORS policy: No ‘Access-Control-Allow-Origin’ header is present on the requested resource. If an opaque response serves your needs, set the request’s mode to ‘no-cors’ to fetch the resource with CORS disabled.

출처 ****'http://localhost:3000'에서 'http~~'로의 가져오기에 대한 액세스가 CORS 정책에 의해 차단되었습니다: 요청된 리소스에 'Access-Control-Allow-Origin' 헤더가 없습니다. 불투명한 응답이 필요한 경우 요청 모드를 'no-c ors'로 설정하여 CORS를 비활성화한 상태에서 리소스를 가져오세요.
```

우리를 힘들게 하는 CORS란 도대체 뭘까요?

## CORS란?

> Cross-Origin Resource Sharing (교차 출처 리소스 공유)

여기서 “**교차 출처**”란 “**다른 출처**”의 의미입니다. 의미 그대로 서로 다른 출처에서 리소스를 공유하는 것을 CORS라고 하는 것이죠.

그렇다면 ‘출처’라는 것이 도대체 뭘까요?

### 출처(Origin)이 뭔데?

URL에는 프로토콜, 호스트, 포트, 패스가 존재합니다.

![Untitled](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/6dd49f77-1126-4612-b037-695d05c296c5)

여기서 **출처**는 Protocol과 Host, :8000, :443과 같은 포트 번호까지 합친 것을 의미합니다. 즉, 서버의 위치를 찾아가기 위해 필요한 가장 기본적인 것들을 합쳐놓은 것입니다.

- 참고로 간단히 JavaScript로도 Location 객체가 가지고 있는 origin 프로퍼티에 접근하여 현재 사이트의 Origin을 알아낼 수 있습니다.
  ```jsx
  console.log(loaction.origin); // ex) "https://www.domain.com" 80 port는 생략
  ```
- 만약 출처에 Port 번호가 생략되어있다면 기본적으로 port 80를 의미합니다.
    <aside>
    💡 3.3.2 http URL ([HTTP가 정의된 RFC 2616 문서](https://datatracker.ietf.org/doc/html/rfc2616#section-3.2.2))
    
    …
    
    If the port is empty or not given, port 80 is assumed. The semantics are that the identified resource is located at the server listening for TCP connections on that port of that host, and the Request-URI for the resource is abs_path (section 5.1.2).
    
    </aside>
    
    - 그러나 만약 port 번호가 명시되어있다면 port 번호까지 모두 일치해야 같은 출처라고 인정됩니다. (but 명확한 정의가 표준으로 정해진 것은 X. CaseByCase)

## 동일 출처 정책 SOP(Same-Origin Policy)

다른 출처로의 리소스 요청을 제한하는 것과 관련된 정책에는 CORS 뿐만아니라 SOP이 있습니다.

말 그대로 동일한 **출처에서만 리소스를 공유할 수 있다**라는 규칙을 가진 정책입니다.

**SOP이 필요한 이유?**

출처가 다른 두 애플리케이션이 자유롭게 상호 작용할 수 있는 환경은 위험할 수 있습니다.

만약 출처 제한이 없다면, 해커는 `CSRF`(Cross-Site Request Forgery)나 `XSS`(Cross-Site Scripting)와 같은 기법을 이용하여 사용자의 브라우저에서 악의적인 코드를 실행시킬 수 있습니다.

SOP이 없는 상태에서 악의적인 웹 페이지에 접속하는 상황을 가정해보면,
![Untitled 1](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/fbe1b42f-2765-4b8c-908f-e2447af923dc)

출처: [Inpa Dev](https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-CORS-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-%F0%9F%91%8F)

1. 사용자가 악성 웹 페이지에 접속합니다.
2. 해커가 몰래 심어놓은 악의적인 자바스크립트가 실행되어, 사용자가 모르는 사이에 어느 포털 사이트에 요청을 보냅니다.
3. 요청은 사용자가 로그인 중인 포털 웹 사이트의 쿠키를 이용하거나 사용자의 상호작용에 따라 개인 정보를 가져오고, 악성 웹 페이지는 훔친 정보를 해커 서버(hacker.example.com)로 전송합니다.
4. 이외에도 해커는 사용자가 접속 중인 내부 네트워크의 IP 주소와 포트 등을 알아내거나 사용자가 접속 중인 사용자의 브라우저를 프록시처럼 악용할 수도 있습니다.

위와 같은 경우를 방지하기 위해, SOP 정책으로 동일하지 않은 다른 출처의 스크립트가 실행되지 않도록 브라우저에서 사전에 방지하는 것입니다.

### 같은 출처와 다른 출처 구분의 기준

출처(Origin)의 동일함은 두 URL의 구성 요소 중 `Protocol`(`Scheme`), `Host`, `Port` 이 **3가지만 동일**하다면 동일 출처로 판단합니다.

따라서 프로토콜, 호스트, 포트 중 하나라도 자신의 출처와 다를 경우 브라우저는 정책상 차단을 합니다.

- 참고로 출처 비교 시 포트 번호를 완전 무시하는 브라우저는 Internet Explorer 밖에 없다.

중요한 사실은, 출처를 비교하는 로직은 **서버가 아닌 브라우저가 수행**한다는 것입니다.
![Untitled 2](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/f837d2cb-6425-40a5-acd5-6d6d699cbbbf)

출처 : [Inpa Dev](https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-CORS-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-%F0%9F%91%8F)

만약 CORS 정책을 위반하는 리소스를 요청하더라도 해당 서버가 같은 출처에서 보낸 요청만 받겠다는 로직을 가지고 있는 경우가 아니라면, 서버는 정상적으로 응답을 하고, 이후 브라우저가 이 응답을 분석해서 CORS 정책 위반이라 판단되면 그 응답을 사용하지 않고 버리는 것입니다.

즉, 서버는 리소스 요청에 의한 응답을 명확히 했으나, 브라우저에서 차단하는 것! (사실 서버가 Header 정보를 덜 줘서 그런거긴 해요🤣)

## 다시 CORS로 돌아와서..

다른 출처에서 온 리소스 응답이라고 해서 (즉, SOP 정책 위반 무조건 차단하는 것은 아닙니니다. 인터넷은 여러 사람들에게 매우 오픈된 환경이고, 이런 환경에서 웹 페이지에서 다른 출처에 있는 리소스를 가져와 사용하는 일은 매우 흔한 일이기 때문이.

이때, 몇 가지 예외 조항을 두고 다른 출처의 리소스 요청이라도 이 조항에 해당할 경우에는 허용하기로 했는데, 그 중 하나가 바로 CORS 정책을 지킨 리소스 요청입니다.

이처럼 교차 출처 리소스 공유(Cross-Origin Resource Sharing, CORS)는 **다른 출처의 리소스 공유에 대한 허용/비허용 정책**입니다. CORS 정책을 허용하는 리소스에 한해 다른 출처라도 받아들인다는 것이죠!

정리하자면, 사실 브라우저에 빨간 error는 SOP를 위반했을 때 발생하는 에러인 것이고, CORS는 사실 다른 출처의 리소스를 얻기 위한 해결방안인 것입니다😲

### 요청 방식에 따라 다른 CORS 발생 여부

클라이언트(브라우저)에서 CORS가 발생하는 상황은 매우 다양합니다. 특히, 웹 브라우저가 HTTP 요청에 대해 어떤 요청을 하느냐에 따라 각기 다른 특징을 가지고있습니다.

1.  **`<img>`, `<video>`, `<script>`, `<link>` 태그 등**

    →  기본적으로 **Cross-Origin** 정책을 지원함

    - `<link>` 태그의 href 에서 다른 사이트의 .css 리소스에 접근하는 것이 가능
    - `<img>` 태그의 src 에서 다른 사이트의 .png, .jpg 등의 리소스에 접근하는 것이 가능
    - `<script>` 태그의 src 에서 다른 사이트의 .js 리소스에 접근하는 것이 가능 (`type="module"` 속성은 제외)

**2. `XMLHttpRequest`, `Fetch API` 스크립트**

→ 기본적으로 **Same-Origin** 정책을 따름

- 다른 도메인의 소스에 대해 자바스크립트 ajax 요청 API 호출시
- 웹 폰트 CSS 파일 내 @font-face에서 다른 도메인의 폰트 사용 시

### CORS의 동작 과정

서로 다른 출처를 가진 리소스를 안전하게 사용하는 방법은 구체적으로 다음과 같습니다.

1. 웹 클라이언트가 다른 출처의 리소스를 요청합니다.
   - HTTP 프로토콜을 사용해 서버에 요청을 보내게 됩니다.
   - 이때, 요청 헤더에는 `Origin` 필드에 요청을 보내는 출처가 포함됩니다.
2. 서버는 요청을 받고, 응답을 반환할 때 `Access-Control-Allow-Origin` 응답 헤더에 *이 리소스를 접근하는 것이 허용된 출처*를 포함하여 응답합니다.
3. 브라우저는 응답을 받은 후, 보낸 요청의 `Origin`과 서버가 보내준 응답의 `Access-Control-Allow-Origin`을 비교합니다.
4. 비교 결과, 응답이 유효한 경우 (출처가 허용된 경우) 브라우저는 응답을 처리하고 클라이언트 애플리케이션에 전달합니다.
5. 비교 결과, 응답이 유효하지 않은 경우 (출처가 허용되지 않은 경우) 브라우저는 CORS 에러를 발생시킵니다. 이는 JavaScript 에러로 처리되거나, 요청이 차단되어 리소스에 접근할 수 없음을 나타냅니다.

결룩, CORS 해결책은 서버의 허용이 필요한 것입니다. 서버에서 `Access-Control-Allow-Origin` 헤더에 허용할 출처를 기재해 클라이언트에 응답하면 되는것이죠.

## CORS 작동 방식 3가지시나리오

기본저긴 흐름은 간단하지만, 사실 CORS가 동작하는 방식은 세 가지의 시나리오에 따라 변경됩니다.

### 예비 요청 Preflight Requst

프리플라이트(Preflight) 방식은 일반적으로 웹 애플리케이션을 개발할 때 가장 자주 마주치는 시나리오입니다.

사실 브라우저는 요청을 보낼 때 한번에 보내지 않고, 먼저 **예비 요청**을 보내 서버와 잘 통신되는지 확인한 후 **본 요청**을 보냅니다.

즉, 예비 요청의 역할은 본 요청을 보내기 전 브라우저 스스로 안전한 요청인지 미리 확인하는 것인데요, 이때 브라우저가 예비 요청을 보내는 것을 **Preflight**라고 부릅니다.

이 예비요청의 HTTP 메소드는 `OPTIONS` 요청이 사용된다는 것이 특징입니다.
![Untitled 3](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/f29d3727-8309-4cd7-a588-0ae84dbb6903)

출처 : [Inpa Dev](https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-CORS-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-%F0%9F%91%8F)

1. 브라우저는 서버로 HTTP `OPTIONS` 메소드로 예비 요청(Preflight)을 먼저 보냅니다.
   1. `Origin 헤더`: 자신의 출처
   - `Access-Control-Request-Method` 헤더 : 실제 요청에 사용할 메소드 설정
   - `Access-Control-Request-Headers` 헤더 : 실제 요청에 사용할 헤더 설정
2. 서버는 예비 요청에 대한 응답으로 허용 비허용에 대한 헤더 정보를 담아서 브라우저로 보내줍니다.
   - `Access-Control-Allow-Origin` 헤더 : 허용되는 Origin들의 목록 설정
   - `Access-Control-Allow-Methods` 헤더 : 허용되는 메소드들의 목록 설정
   - `Access-Control-Allow-Headers` 헤더: 허용되는 헤더들의 목록 설정
   - `Access-Control-Max-Age` 헤더: 해당 예비 요청이 브라우저에 캐시 될 수 있는 시간을 초 단위로 설정
3. 이후 브라우저는 보낸 요청과 서버가 응답해준 정책을 비교하여, 해당 요청이 안전한지 확인하고 본 요청을 냅니다.
4. 서버가 본 요청에 대한 응답을 하면 최종적으로 이 응답 데이터를 자바스립트로 넘겨줍니다.

예비 요청에 대한 응답이 정상적으로 200 상태 코드를 반환하더라도, 브라우저 콘솔 창에 빨간색으로 에러가 표시되는 것을 주의깊게 살펴보아야합니다.

이는 *CORS 정책 위반으로 인한 에러*이며, **예비 요청의 성공 여부와는 별개로 발생**합니다. 브라우저는 예비 요청에 대한 응답을 받은 이후에 CORS 정책 위반 여부를 판단합니다.

**예비 요청의 문제점과 캐싱**

OPTIONS 메서드로 예비 요청을 보내는 것은 보안을 강화하는 목적으로는 좋지만, 실제 요청에 걸리는 시간을 늘리고 성능에 영향을 줄 수 있습니다. 특히 API 호출 수가 많을 경우 서버 요청이 배로 증가하여 비용 측면에서도 부담이 될 수 있습니다.

이러한 상황에서 브라우저 캐시를 이용하여 `Access-Control-Max-Age` 헤더에 캐시될 시간을 명시해 Preflight 요청을 캐싱하여 최적화할 수 있습니다. 브라우저는 캐시된 Preflight 요청을 사용하여 실제 요청을 보내기 전에 서버에 다시 요청하지 않고, 저장된 정보를 사용하여 보다 효율적으로 처리할 수 있습니다.

이를 통해 서버 요청 횟수를 줄이고 응답 시간을 단축시킬 수 있으며, 비용 측면에서도 효율적인 방법입니다.

캐시 설정은 `Access-Control-Max-Age` 헤더를 사용하여 캐시될 시간을 설정하면 됩니다. 이렇게 하면 브라우저가 일정 기간 동안 Preflight 요청을 캐시하고 재사용할 수 있습니다.

### 단순 요청 Simple Request

> 예비 요청 없이 바로 서버에 본 요청을 보내는 방식입니다. 서버는 해당 요청에 대한 응답의 헤더에 `Access-Control-Allow-Origin` 헤더를 포함하여 브라우저에게 CORS 정책을 검사하도록 합니다.
> ![Untitled 4](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/b06b2349-17e1-44ee-93d1-35d1de037337)

출처 : [Inpa Dev](https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-CORS-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-%F0%9F%91%8F)

단순 요청은 특정 조건을 만족하는 경우에만 가능합니다.

1. 요청의 메소드는 GET, HEAD, POST 중 하나여야 합니다.
2. `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`, `DPR`, `Downlink`, `Save-Data`, `Viewport-Width`, `Width` 헤더를 사용할 경우에만 적용됩니다.
3. 만약 `Content-Type`를 사용하는 경우에는 `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`만 허용된다.

위 3가지 조건을 모두 충족하지 않으면 예비요청으로 동작하게 됩니다.

보시다시피 이 조건이 조금 까다롭기 때문에, 일반적인 방법으로 웹 애플리케이션 아키텍처를 설계하게 되면 거의 충족하기 어려운 조건들입니다.

대부분 HTTP API 요청은 `text/xml` 이나 `application/json` 으로 통신하기 때문에 3번째 Content-Type이 위반되기 때문입니다.

### 인증된 요청 Credentialed Request

인증된 요청은 클라리언트에서 서버에게 자격 인증 정보(Credential)을 실어 요청할 때 사용되는 요청입니다. CORS의 기본적인 방식과는 다른 형태이 다른 출처 간 통신에서 보안을 강화하고 싶을 때 사용합니다.

<aside>
💡 **자격 인증 정보 (Credential)**

세션 ID가 저장되어있는 쿠키(Cookie) 혹은 Authorization 헤더에 설정하는 토큰 값등을 말합니다.

</aside>

즉, 클라이언트에서 일반적인 JSON 데이터 외에도 쿠키 같은 인증 정보를 포함해 다른 출처의 서버로 전달할 때는 **Credentialed Request**를 사용합니다.

브라우저는 기본적으로 `XMLHttpRequest` 객체나 `fetch API`를 통해 비동기 리소스를 요청할 때, 별도의 옵션없이 쿠키 정보나 인증과 관련된 헤더를 요청에 포함시키지 않습니다.

하지만 경우에 따라 서버에서 인증 정보를 필요로 하는 API 요청을 보내야 할 수도 있습니다. 이런 경우를 위해 브라우저는 `credentials` 옵션을 제공합니다. 이 옵션을 설정하면 브라우저는 요청에 인증과 관련된 정보를 담을 수 있게 됩니다.

`**credentials` 옵션\*\*

| 옵션                  | 설명                                                                                      |
| --------------------- | ----------------------------------------------------------------------------------------- |
| same-origin (default) | 현재 페이지와 요청을 보내는 서버가 같은 출처(origin)일 경우에만 인증 정보를 포함시킵니다. |
| include               | 항상 인증 정보를 포함시킵니다. 이 옵션을 사용하면 쿠키 정보 등을 함께 전송할 수 있습니다. |
| omit                  | 인증 정보를 요청에 포함시키지 않습니다.                                                   |

`same-origin`이나 `include` 옵션을 사용해 리소스 요청에 인증 정보가 포함된다면, 브라우저는 다른 출처의 리소스를 요청할 대 단순히 `Access-Control-Allow-Origin`만 확인하는 것이 아니라, 아래의 두 조건을 만족하는지까지 확인합니다.

1. `Access-Control-Allow-Origin`에는 **\***를 사용할 수 없으며, **명시적인 URL** 이어야 합니다.
2. 응답 헤더에는 반드시 `Access-Control-Allow-Credentials: **true**`가 존재해야 합니다.
3. 응답 헤더의 `Access-Control-Allow-Methods` 의 값에 **\***는 사용할 수 없습니다.
4. 응답 헤더의 `Access-Control-Allow-Headers` 의 값에 **\***는 사용할 수 없습니다.

인증된 요청 역시 예비 요청처럼 preflight가 먼저 발생합니다!

## CORS 해결법

### 1. Chrome 확장 프로그램 이용

Chrome에서는 CORS 문제를 해결하기 위한 [확장 프로그램](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)을 제공합니다. 로컬(localhost)환경에서 API 테스트시 CORS 문제를 해결할 수 있ㅅ브니다.

### 2. 프록시(Proxy) 활용하기

**프록시(Proxy)란?**

클라이언트와 서버 간의 중간에 위치하여 클라이언트의 요청을 서버로 전달하고, 서버의 응답을 클라이언트에게 전달하는 중계 역할을 수행하는 서버입니다.

클라이언트는 프록시 서버에 요청을 보내면, 프록시 서버가 대신 해당 요청을 서버로 전달하고, 서버로부터 받은 응답을 클라이언트에게 전달합니다.

따라서 동일한 출처의 프록시 서버를 구출하게 될 경우, 브라우저가 동일한 출처에서 온 request라고 판단하기 때문에 CORS에러가 나지 않습니다.

프록시를 사용하여 CORS 에러를 해결하는 방법은 다음과 같습니다.

1. **프록시 서버 설정**

   프록시 서버를 설정하여 클라이언트의 요청을 받고, 서버로 요청을 전달합니다. 이때 프록시 서버는 서버로 요청을 전달할 때 추가적인 헤더를 포함시켜 CORS 에러를 우회할 수 있습니다. 프록시 서버는 클라이언트와 서버 간의 중개자 역할을 수행하므로, 클라이언트는 프록시 서버를 통해 요청을 보내는 것으로 인식됩니다.

2. **프록시 서버 설정 변경**

   클라이언트에서 요청을 보낼 때, **요청의 목적지를 프록시 서버로 변경**하여 보냅니다. 이는 클라이언트의 동일 출처 정책 제약을 우회하여 프록시 서버와의 통신이 가능하게 합니다. 프록시 서버는 클라이언트의 요청을 받아 원래의 목적지 서버로 전달하고, 서버의 응답을 클라이언트에게 전달합니다.

**단점?**

프록시를 설정하고 관리하는 것은 추가적인 작업을 요구하는 것이기 때문에 번거로울 수 있습니다. 또한 프록시 서버를 사용하면 클라이언트와 프록시 서버 사이에 추가적인 네트워크 오버헤드가 발생할 수 있습니다.

### 3. 서버에서 Access-Control-Allow-Origin 세팅하기

이 방법이야말로 근본적인, 가장 대표적인 방법이라고 할 수 있습니다. 그냥 정석대로 서버에서 `Access-Control-Allow-Origin` 헤더에 알맞은 값을 세팅해주는 것이죠!

이때 와일드 카드 \*를 사용한다면, 모든 요청을 받겠다는 뜻이기 때문에 보안에 좋지 않습니다.

이 헤더는 Nginx나 Apache와 같은 서버 엔진의 설정에서 추가할 수도 있지만, 간단히 소스 코드 내에서 응답 미들웨어 등을 사용하여 세팅하는 것이 편하다고합니다.

Spring, Express, Django와 같이 이름 있는 백엔드 프레임워크의 경우에는 모두 CORS 관련 설정을 위한 세팅이나 미들웨어 라이브러리를 제공하고 있습니다.

또 다른 방법으로 AWS의 S3 호스팅을 활용하는 방법도 있습니다. S3에 저장된 자원에 대한 CORS 정책을 구성할 수 있습니다.

## 결론

CORS는 생각보다 쉽다!

## 출처

- [악명 높은 CORS 개념 & 해결법 - 정리 끝판왕](https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-CORS-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-%F0%9F%91%8F)
- [CORS는 왜 이렇게 우리를 힘들게 하는 걸까?](https://yozm.wishket.com/magazine/detail/1225/)
