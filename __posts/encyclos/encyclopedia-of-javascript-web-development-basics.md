---
title: 자바스크립트 웹 개발 기본기 백과사전
date: 2023-04-11
slug: 자바스크립트-웹-개발-기본기-백과사전
tags: JavaScript
category: 🏫백과사전
---

# 웹기초 다지기

<aside>
💡 ✋ **잠깐!**
개발자 도구의 Console 탭은 해당 코드에서 **최종적으로 리턴하는 값**을 출력한다. 만약 아무런 값도 리턴하지 않는 경우에는 undefined를 리턴한 것으로 간주한다.

</aside>

**웹** - World Wide Web의 줄임말로 가상의 연결망 세계이다.

**URL**

Uniform Resource Locator, 웹에 존재하는 특정 데이터를 나타내는 문자열

- ex) **https**://**[www.example.com](http://www.example.com/)**/men/shirts?color=blue$size=m
  - **Scheme** - 프로토콜의 이름
    - 프로토콜 : 통신을 하는 주체가 지켜야하는 규약
  - **Host** : 전세계의 서버 중 하나의 서버를 특정. 도메인네임으로 되어있다.(원래는 숫자로 된 IP주소)
  - Path : 서버에 있는 데이터 중 원하는 데이터를 특정
  - Query : 데이터에 관한 세부적인 요구사항 (옵션임)

### **Domain Name Resolution**

- 하나의 도메인 네임은 여러개의 도메인으로 구성된다.
- 더 상위의 도메인일수록 도메인 네임 중에서 오른쪽에 있다.
  - root domain은 빈 문자열로 나타내고, 보통은 표시하지 않는다.
    - 만약 나타내고 싶으면 도메인의 가장 오른쪽에 .을 찍으면 된다. ex) google.com`.` (이론적으로 더 완벽한 도메인 네임 😆ㅋㅋ)
  - root doamin 바로 하위에 Top-Level Domain(TLD) - kr, jp, net 등등
  - Second-Level Domain (SLD) - naver, codeit
  - Third-Level Domain(Third) - www

**HTTPS -** Hyper Text Transfer Protocol **Secure**

## Request - 요청

- \*[헤드][바디]\*\*로 이루어져있다.

### 헤드

- header : 헤드 안에 담긴 하나하나의 키와 값의 쌍

1. **메소드:** equest에 header에 담겨져있다.

   `GET` - 데이터 조회

   `POST` - 데이터 추가. body에 데이터 담아서 보내야한다.

   `PUT` - 데이터 수정. body에 데이터를 담아서 보낸다.

   `DELETE` - 데이터 삭제

2. **path 정보** - 웹브라우저가 무슨 데이터를 원하는 지 알 수 있다.
3. `user-agent` : request를 보낸 브라우저와 그것이 설치된 운영체제에 대한 정보가 담겨져있다.

## fetch 함수

- server에 request를 보내서 원하는 가져오는 함수.
- 파라미터로 전달한 주소로 request를 보낸 후 response를 받는다.
- fetch함수는 Promise 객체를 return한다.

**Callback** : 어떤 조건이 만족되었을 때 실행되는 함수

`.then` : promise 객체가 pending 상태에서 fulfilled 상태가 될 때 Callback을 등록해주는 메소드. fetch함수가 리턴하는 Promise 객체의 메소드이다.

1. GET

```jsx
fetch('<https://www.google.com>')
  .then((response) => response.text()) // 1
  .then((result) => {
    console.log(result);
  }); // 2

// 1.response객체가 넘어오고 response객체의 text메소드를 호출해
// 그 리턴값(promise객체)를 result라는 이름의 파라미터로 넘겨준다.
// 2. 받은 result 라는 이름의 promise 객체를 출력하는 함수
```

- `(response) => response.text()`는 response가 있어야만 실행되는 callback이다.
- fetch함수가 리턴한 Promise 객체의 `then`메소드로 response가 왔을 때 실행할 콜백을 등록할 수 있다.
- 등록된 콜백들은 `then`메소드로 등록한 순서대로 실행되고, 이전 콜백의 리턴값을 이후 콜백이 넘겨받아서 사용할 수 있다.

1. POST, PUT, DELETE

```jsx
fetch('<https://learn.codeit.kr/api/members>', {
  //옵션객체
  method: 'POST', //PUT, DELETE는 옵션객체에 적어서 보내야한다. 안적으면 기본 GET
  body: JSON.stringify(newMember), // js객체를 string타입의 JSON객체로 변환
})
  .then((response) => response.text()) // 1
  .then((result) => {
    console.log(result);
  }); // 2
```

## REST API

**REST architecture :** 웹이 갖추어야 할 이상적인 아키텍처(구조)

- REST : Representational State Transfer, 표현적인, 상태 이전
- REST architecture는 아래의 6가지 기준을 충족하면 인정이 된다.
  1. **_Client-Server_** 구조로 양측의 관심사를 분리해야한다
  2. **_Stateless_** : client가 보낸 각 request에 대해 server는 그 어떤 context도 저장하지 않는다. 즉, 매 request는 독립적인 것으로 취급된다. 따라서 request에는 항상 필요한 모든 정보가 담겨야한다.
  3. **_Cache_** : Cache를 활용해서 네트워크 비용을 절감해야한다. Servers는 response에 Client가 reponse를 재활용해도되는지 여부(Cacheable)을 담아서 보내야한다.
  4. **_Uniform Interface_** - UI는 다음과 같은 하위 조건 4가지를 준수해야한다.
     - _identification of resources_
       - resource는 URI로 식별 가능해야한다.
     - _manipulation of resources through representations_
       - Client와 Server는 둘 다 리소스를 직접적으로 다루는 게 아니라 리소스의 '표현(representations)'을 다뤄야한다. **리소스'**
         와 **'리소스의 표현'**이라는 개념 2개를 서로 엄격하게 구분
     - _self-descriptive messages_
       - 자기설명적인. 매 리퀘스트마다 필요한 모든 정보를 담아서 전송해야한다.
     - _hypermedia as the engine of application state_
  5. **_Layered System_**
     - Client와 Server 사이에는 프록시(proxy), 게이트웨이(gateway)와 같은 중간 매개 요소를 두고, 보안, 로드 밸런싱 등을 수행할 수 있어야한다. 이를 통해 Client와 Server 사이에 hierarchical layers가 형성된다.
  6. **_Code on Demand_**
     - Client는 받아서 바로 실행할 수 있는 applet이나 script 파일을 Server로부터 받을 수 있어야 한다.

<aside>
🙋‍♀️ **4번에 대한 추가적인 내용**

- URL은 리소스를 나타내기 위해서만 사용하고, 리소스에 대한 처리는 메소드로 표현해야 한다. 즉 URL에서 리소스에 대한 처리를 드러내면 안 된다
- **도큐먼트는 단수 명사로, 컬렉션은 복수 명사로 표시** - document : 하나의 객체로 표현할 수 있는 리소스 - collection : 여러 개의 document를 담을 수 있는 리소스
</aside>

---

**JSON 데이터 다루기**

Javascript Object Notation의 줄임말로, 자바스크립트의 Object Literal 문법 및 배열 표현법 등과 일정 부분 호환되는 데이터포맷

- `JSON.parse` : 역직렬화
- `JSON.stringify` : 직렬화
- `json` 메소드
  - response의 내용이 JSON 데이터에 해당하는 경우, 바로 Deserialization까지 수행한다. 단, response가 JSON데이터가 아닐 경우 error

## Response

### 상태코드

각 코드에 대응하는 상태 메시지를 가지고 있다

![https://velog.velcdn.com/images/shinyejin0212/post/afd9dcec-ab7f-4d78-9a2c-4c186fe556e5/image.png](https://velog.velcdn.com/images/shinyejin0212/post/afd9dcec-ab7f-4d78-9a2c-4c186fe556e5/image.png)

- **100 Continue** : 클라이언트가 서버에게 계속 리퀘스트를 보내도 괜찮은지 물어봤을 때, 계속 리퀘스트를 보내도 괜찮다고 알려주는 상태 코드
- **101 Switching Protocols** : 클라이언트가 프로토콜을 바꾸자는 리퀘스트를 보냈을 때, 서버가 '그래요, 그 프로토콜로 전환하겠습니다'라는 뜻을 나타낼 때 쓰이는 상태 코드
- **200 OK**
- **301 Moved Permanently** : 리소스의 위치가 바뀌었음
- **302 Found** : 리소스의 위치가 일시적으로 바뀌었음. response에 리소스에 접근할 수 있는 url을 담아서 보내고 그 url로 다시 request를 보내는 redirection을 수
- **304 Not Modified** : 웹에서 '캐시(cache)'를 활용한 상태코드
- **404 Not Found**
- **405 Method Not Allowed** : 해당 리소스에 대해서 요구한 처리는 허용되지 않는다는 뜻
- **413 Payload Too Large** : 현재 리퀘스트의 바디에 들어있는 데이터의 용량이 지나치게 커서 서버가 거부한다는 뜻
- **429 Too Many Requests** : 일정 시간 동안 클라이언트가 지나치게 많은 리퀘스트를 보냈다는 뜻
- **500 Internal Server Error** : 현재 알 수 없는 서버 내의 에러로 인해 리퀘스트를 처리할 수 없다는 뜻
- **503 Service Unavailable** : 현재 서버 점검 중이거나, 트래픽 폭주 등으로 인해 서비스를 제공할 수 없다는 뜻

### [Content-Type 헤더](https://www.iana.org/assignments/media-types/media-types.xhtml)

현재 request 또는 response의 바디에 들어있는 데이터가 어떤 타입인지 나타낸다. `main type/sub type` 형식이다.

- `text/html`: html 데이터
- `image/jpeg`: jpeg, jpg 이미지 데이터
- `audio/mpeg`: mp3, mpeg 오디오 데이터
- `application/json`: json 데이터
- `application/octet-stream` : 확인되지 않은 바이너리 파일 (텍스트 파일 이외의 파일을 binary file이라고 함. 즉 특정 확장자(mp4 등)에 해당하지 않는 바이너리 파일)
- `application/x-www-form-urlencoded`
  - html의 form태그가 리퀘스트를 보낼 때의 타입.
  - `id=6&name=Jason&age=34&department=engineering` 이런 식으로 “이름=값” 프로퍼티를 “&”으로 연결된 데이터타입이다.
  - URL encoding을 해 리퀘스트를 보낸다.
    - Percent encoding을 사용해서 URL을 인코딩함. UTF-8 인코딩 규칙을 적용해 1과 0의 조합으로 인코딩 후 한 바이트 당 그 앞에 %기호를 붙인다.
- `multipart/form-data`: 여러 종류의 데이터를 하나로 합친 데이터 ex) 텍스트 + 이미지 + 동영상 데이터

## Ajax

- Asynchronous JavaScript And XML

웹브라우저가 현재 페이지를 그대로 유지한 채로 서버에 리퀘스트를 보내는 response를 받아서 새로운 페이지를 로드하지 않고도 변화를 줄 수 있게 해주는 기술

- JavaScript에서는 XMLHttpRequest() 객체를 통해 Ajax 통신이 가능.(구버전)
  - 이를 기반으로 한 **axios**라는 외부 패키지 사용
- **fetch 함수를 사용해서 Ajax 통신 가능 (외부 패키지 axios를 설치 X고 싶은 경우 사용)**

## HTTP 메소드

- GET, POST, PUT, DELETE
- PATCH - 새 데이터로 기존의 데이터의 일부를 수정할 때 사용하는 메소드
  - PUT은 기존 데이터를 아예 새로운 데이터로 덮어씀으로써 수정하려고 할 때 쓰는 메소드
- HEAD - GET 메소드와 동일하지만 response에서 바디 부분은 제외하고, 헤드부분만 받는다.
  - 실제 데이터가 아니라 데이터에 관한 정보만 얻으려고 하는 상황에서 사용 (파일 용량정보 등)

## 웹통신이 아닌 다른 통신도 있다

컴퓨터끼리 통신하는 프로토콜에는 HTTP, HTTPS 이외에도, **FTP, SSH, TCP, UDP, IP, Ethernet** 등 정말 다양한 종류의 프로토콜이 있다.

- (고수준 프로토콜) HTTP / TCP / IP / Etherent (저수준 프로토콜)
- [네트워크 레이어와 매칭되는 프로토콜 알아두기](https://needjarvis.tistory.com/158)

# 비동기 실행

비동기 실행에서는 코드가 꼭 등장하는 순서대로 실행되는 것이 아니다.

```jsx
console.log('Start!');

fetch('<https://www.google.com>')
  .then((response) => response.text()) // 콜백 1
  .then((result) => {
    console.log(result);
  }); // 콜백 2

console.log('End');
```

fetch 함수가 리퀘스트를 보내고, 서버의 리스폰스를 받게 되면 콜백들이 순서대로 실행

1. `console.log('Start');`
2. fetch 함수(리퀘스트 보내기 및 콜백 등록)
3. `console.log('End');`
4. 리스폰스가 오면 2. 에서 `then` 메소드로 등록해뒀던 콜백 실행

**비동기 실행 함수들**

1. setTimeout 함수
2. setInterval 함수 - n초 간격으로 계속 실행
3. **addEventListener 메소드**
   - 특정 이벤트가 발생했을 때 실행할 콜백을 등록하는 DOM 객체의 메소드
   - . 파라미터로 전달된 콜백이 당장 실행되는 것이 아니라, 나중에 특정 조건(클릭 이벤트 발생)이 만족될 때(마다) 실행된다.

## promise 객체

작업에 관한 상태정보를 가지고 있는 객체

fetch함수는 Promise 객체를 리턴한다. 이때 promise객체는 pending 상태

- `then` 메소드로 작업이 성공하여 promise객체가 pending → fulfilled가 되면 실행할 콜백을 등록할 수 있다.
- 3가지의 상태 정보
  - pending : 진행 중
  - fulfilled : 성공.
    - fulfilled 상태가 되면 promise는 작업 성공 결과(response)를 가진다.
  - rejected : 실패
    - rejected 상태가 되면 promise는 작업 실패 결과(response)를 가진다.

### **promise chaining**

프로미스 객체에 then 메소드를 연속적으로 작성하는 것.

`then` 메소드는 새로운 프로미스 객체를 리턴한다.

- callback이 ① promise 객체를 리턴하는 경우, ② promise 객체가 아닌 일반 문자열 등의 값을 리턴하는 경우. ③ 아무 값도 리턴하지 않는 경우 **\*\*\*\***④ 실행된 콜백 내부에서 에러가 발생 **\*\*\*\***가 있다. ⑤ 아무런 콜백도 실행되지 않을 때
  - ① 의 경우 then 메소드가 return한 promise 객체는 callback이 return한 promise 객체와 동일한 상태와 결과를 가진다
  - ② 의 경우 then 메소드가 return한 promise 객체는 fulfilled 상태와 작업 성공 정보를 가진다.
  - ③ 의 경우는 ① 경우와 똑같이 then 메소드가 리턴했던 Promise 객체는 **fulfilled 상태**가 되고, **그 작업 성공 결과로 undefined**를 가진다.
  - ④ then 메소드가 리턴한 Promise 객체는 **rejected 상태**가 되고, 그 **작업 실패 정보로 해당 Error 객체를 갖게 된다**
  - ⑤의 경우 then 메소드가 리턴하는 promise 객체는 이전 promise 객체와 동일한 상태와 결과를 가진다.
    > 잠깐! text 메소드, json 메소드는 promise 객체를 반환한다.

**promise chaining이 필요한 경우**

- 비동기 작업을 순차적으로 진행해야 할 때 전체 코드를 깔끔하게 나타내기 위해 사용

`catch` **메소드**

- promise 객체가 rejected 상태가 되면 실행할 callback을 등록하는 method
- = `then(undefiend, 콜백)`
- 보통 마지막에 쓴다. 중간에 에러가 발생해서 어느 Promise 객체가 rejected 상태가 되더라도 항상 대처할 수 있도록 해야 한다
- **헷갈리는 개념 다잡기**

  ```jsx
  fetch('<https://jsonplaceholder.typicode.commmmm/users>')
    .then((response) => response.text()) //①
    .then((result) => {
      console.log(result);
      throw new Error('test'); // ②
    })
    .catch((error) => {
      console.log(error);
    });

  //결과 - TypeError: Failed to fetch
  ```

  유효하지 않은 url로 request를 보냈을 때 fetch가 return 한 promise는 rejected 상태와 error라는 작업 실패 정보를 가진다.
  ①의 callback은 실행되지 않고 then이 return한 promise는 fetch가 return 한 promise 와 똑같은 상태와 작업정보를 가진다.

  - 즉 ①의 then의 promise는 rejected 상태와 error라는 작업 실패 정보를 가진다.
    ②의 callback은 실행되지 않고 ②의 then의 promise는 직전 promise와 동일하게 rejected 상태와 error라는 작업 실패 정보를 가진다.
    따라서 catch문은 rejected 상태와 error라는 작업 실패 정보를 출력하는 것이다!

`finally` **메소드**

- promise 객체가 fulfilled 상태가 되든 rejected 상태가 되든 상관없이 항상 실행하고 싶은 콜백이 있는 경우 finally 메소드로 등록한다.
- finally 메소드 안의 콜백은 작업 성공 결과나 작업 실패 정보가 필요하지 X → 파라미터가 필요 X
- 보통 catch 메소드 바로 뒤에 쓴다

**callback hell에서 빠져나오기 위해 promise 객체가 생겼다.**

- 함수에 콜백을 직접 넣는 형식은 **콜백 헬**이 발생할 수 도 있다.
- 콜백 헬 : 순차적으로 비동기 실행함수들을 실행하려고 하면 콜백 안에 또 콜백이 있고, 그 안에 또 콜백이 있는…
- ES6에서 추가되었다.

### **promise 객체 만들기**

- executor 함수 : Promise 객체가 생성될 때 자동으로 실행되는 함수
  - resolve 파라미터 - promise 객체를 fulfilled 상태로 만들 수 있는 함수가 연결됨
  - reject 파라미터 - promise 객체를 rejected 상태로 만들 수 있는 함수가 연결됨

```jsx
const p = Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 2000);
});

p.catch((error) => {
  console.log(error);
});
```

- **Promisify** 작업을 할 때 사용한다.
  : 전통적인 형식의 비동기 실행 함수를 사용하는 코드(ex. setTimeout 함수)를 Promise 기반의 코드로 변환하기 위해 Promise 객체를 직접 만든다
  - 콜백 헬을 해결할 수 있다.
  - 그 콜백을 한번만 실행하는 함수들에서 사용가능하다
- Promisify를 하면 안되는 함수들
  - Promise 객체는 한번 pending 상태에서 fulfilled 또는 rejected 상태가 되고 나면 그 뒤로는 상태와 결과가 바뀌지 않기 때문에 콜백을 여러번 실행하는 함수에서는 하면 안된다.
    - setInterval, addEventListener 등
- 이미 상태가 결정된 Promise 객체 만들기
  ```jsx
  const p = Promise.resolve('success')
  	.then(//어쩌고~)
  const p = Promise.reject(new Error('fail'));
  ```

### 여러 개의 Promise 객체를 다뤄야할 때 사용되는 Promise 메소드

1. `all` 메소드 - `all([p1, p2, p3 ...])`
   - 아규먼트로는 **배열 하나**가 들어있다.
   - 아규먼트로 들어온 **배열 안에 있는 모든 Promise 객체가 pending 상태에서 fulfilled 상태가 될 때까지 기다린다.**
   - 모든 Promise 객체들이 fulfilled 상태가 되면, all 메소드가 리턴했던 Promise 객체는 fulfilled 상태가 되고, 각 Promise 객체의 작업 성공 결과들로 이루어진 배열을 작업 성공 결과로 가진다.
     - 작업 성공 결과 배열 예시
       ![https://velog.velcdn.com/images/shinyejin0212/post/7737f3d4-38d0-4e84-bfcb-4179b95bf5e0/image.png](https://velog.velcdn.com/images/shinyejin0212/post/7737f3d4-38d0-4e84-bfcb-4179b95bf5e0/image.png)
   - 아규먼트로 들어온 Promise 객체 중 하나라도 rejected 상태가 될 경우?
     - all 메소드가 리턴한 Promise 객체는 rejected 상태가 되고 동일한 작업 실패 정보를 갖게 된다.
     - 즉 하나라도 rejected 상태가 되면 전체 작업이 실패한 것으로 간주해야할 때 사용한다.
2. `race` 메소드 - `.race([p1, p2, p3 ... ])`
   - 마찬가지로 아규먼트로 **배열 하나**가 들어있다.
   - race 메소드가 리턴한 Promise 객체는 아규먼트로 들어온 배열의 여러 Promise 객체들 중에서 **가장 먼저 fulfilled 상태 또는 rejected 상태가 된 Promise 객체와 동일한 상태와 결과를 갖게**된다.
3. `allSettled` 메소드
   - 배열 내의 모든 Promise 객체가 fulfilled or rejected 상태가 되기까지 (즉, settled 상태가 되기까지) 기다리고 pending 상태의 Promise 객체가 하나도 없게 되면
     1. allSettled 메소드가 리턴한 promise 객체의 상태값은 fulfilled 상태가 되고
     2. 작업성공결과로 하나의 배열을 갖게된다.
     - 이 배열에는 아규먼트로 받았던 배열 내의 각 promise 객체의
       ① 최종 상태를 status 프로퍼티 ② 그 작업 성공 결과는 value 프로퍼티 ③ 그 작업 실패 정보는 reason 프로퍼티
       에 담은 객체들이 요소로 존재한다.
   - fulfilled 상태와 rejected 상태를 묶어서 settled 상태라고 함
4. `any`
   - Promise 객체들 중에서 가장 먼저 fulfilled 상태가 된 Promise 객체의 상태와 결과가 any 메소드가 return한 promise 객체에 반영된다.

### Axios

- Ajax 통신을 할 수 있는 [외부 패키지](https://github.com/axios/axios)
- axios 객체에서 리퀘스트를 보내는 많은 메소드들은 Promise 객체를 리턴한다.
- **fetch 함수에는 없는 장점**
  - 모든 requset, reponse에 대한 공통 설정 및 공통된 전처리 함수 삽입 가능
  - serialization, deserialization을 자동으로 수행
  - 특정 리퀘스트에 대해 얼마나 오랫동안 리스폰스가 오지 않으면 리퀘스트를 취소할지 설정 가능(request timeout)
  - 업로드 시 진행 상태 정보를 얻을 수 있음
  - 리퀘스트 취소 기능 지원

## async/await

기존의 Promise 객체를 사용하는 코드(Promise Chaining)를

(1) 개발자가 더 편하게 작성할 수 있도록 하고
(2) 코드의 가독성을 높이기 위해서

도입된 일종의 **Syntactic sugar**(기존 문법을 더 편하게 사용할 수 있도록 하는 문법적 장치)이다.

**async**

- 함수에 비동기 실행이 되는 부분이 있다는 뜻. 즉, 코드 중에서 promise 객체를 리턴하는 코드가 있다는 뜻이다.
- 항상 Promise 객체를 return한다!
  ```jsx
  async function fetchAndPring() {
    return 3; // promise 객체가 반환됨
  }
  ```

**await**

- 리턴되는 promise 객체가 settled 상태가 될 때까지 기다린다.
- async 함수 내에서만 사용 가능

**try…catch…finally** 문을 사용해서 rejected가 되었을 경우 catch로 캐치하거나 상태에 상관없이 finally로 항상 실행

### async 함수가 리턴하는 Promise 객체

1. 어떤 값을 리턴하는 경우

   async 함수 안에서

   ① Promise 객체를 리턴하는 경우, 동일한 상태와 작업 결과를 가진 Promise 객체를 리턴한다.

   ② Promise 객체 이외의 값을 리턴하는 경우, **fulfilled 상태이면서, 리턴된 값을 작업 성공 결과로 가진 Promise 객체**를 리턴

2. 아무것도 리턴하지 않는 경우, fulfilled 상태, undefined를 작업 성공 결과로 가진 Promise 객체를 리턴
3. async 함수 내부에서 에러가 발생했을 때, rejected 상태, 해당 에러 객체를 작업 실패 정보로 가진 Promise 객체가 리턴

async 함수는 promise 객체를 반환하기 때문에 await을 붙여 **async 함수 안의 async 함수 … 를 사용 가능하다!**

<aside>
💡 자바스크립트에서 함수를 표현하는 방법에는 여러 가지가 있는데요.

1. **Function Declaration(함수 선언식)**,
2. **Function Expression(함수 표현식)**,
3. **Arrow Function(화살표 함수)**

등이 있습니다. 그리고

Function Expression의 경우에는

2-1. 함수에 이름이 붙어있는 Named Function Expression과
2-2. 함수에 이름이 없는 Anonymous Function Expression으로 나눌 수 있고,

Arrow Function의 경우 함수 내부의 내용에 따라 더 축약(shorten)해서 나타낼 수도 있습니다.

</aside>

**async 함수를 작성할 때 생각해야하는 성능 문제**

- 만약 순차적인 처리가 필요한 경우가 아니라면 각 작업을 async 함수로 묶어주면 된다!

  - async 함수 안에서는 무언가를 반복 처리하는 코드를 쓸 때 유의해야한다. 의도치 않게 순차 처리를 수행하는 비효율적인 코드를 짜는 실수를 하게 되기 쉽기 때문

    ```
    async function fetchUrls(urls){
      for(const url of urls){
        (async () => { // 추가된 부분!
          const response = await fetch(url);
          console.log(await response.text());
        })(); // 추가된 부분!
      }
    }

    ```

    여기서 추가된 async가 없다면 urls에서 이전 url에 대해 await문이 붙은 promise 객체가 fulfilled 상태가 될 때까지는 그 다음 url에 대한 작업이 시작될 수 X

## 비동기 실행 관련 문법들은 서로 상호보완적이다.

왜냐하면 하나가 다른 하나를 완벽히 대체하지는 못하기 때문이다!

- 잠깐! 정리👌 3가지의 문법
  ① 파라미터로 바로 콜백을 전달하는 형태의 전통적인 비동기 실행 함수
  ② Promise
  ③ async/await

1. 콜백을 함수의 파라미터로 바로 전달하는 전통적인 방식의 비동기 실행 함수들 중에서도 setInterval, addEventListener처럼 그 콜백이 **단 한번이 아니라 여러 번 실행되어야 하는 것들은 Promisify해서 사용하면 안된다**.
   1. Promise 객체는 한번 fulfilled 또는 rejected 상태가 되고나면 그 상태와 결과가 다시는 바뀌지 않기 때문.
2. async/await 구문의 경우, await은 async 함수 안에서만 사용할 수 있고, **코드의 top-level**에서는 사용 X. 그래서 top-level에서 async 함수가 리턴한 Promise 객체의 작업 성공 결과를 가져오려면 await을 사용할 수는 없고, 여전히 then 메소드를 사용해야한다.

자바스크립트의 각 문법별 브라우저 지원 현황을 [이런 사이트](https://kangax.github.io/compat-table)에서 조사한 후 개발 할 것!

## 더 자세한 콜백

자바스크립트에서 콜백은 어떤 함수의 파라미터로 전달되는 모든 함수를 의미한다. 따라서 어떤 함수의 파라미터로 전달되기만 하면 콜백인 것!

**1. 동기 실행되는 콜백, 2. 비동기 실행되는 콜백** 이 있다.

지금까지는 2번의 비동기 실행되는 콜백의 관점에서만 봤다.

1번의 콜백에는 `filter 메소드`가 있다. 즉 동기 실행되는 콜백이 있다는 점에서 유의해야함!!!!
