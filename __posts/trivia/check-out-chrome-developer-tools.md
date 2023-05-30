---
title: Chrome 개발자 도구 톺아보기
date: 2023년 5월 31일
slug: Chrome-개발자-도구-톺아보기
tags: 개발자도구
category: 🙏잡학사전
---

## 실행 단축키

- Windows: `F12` 또는 `Ctrl` + `Shift` + `i`
- Mac: `F12` 또는 `Cmd` + `Shift` + `i`

## Force Refresh

- 기본적으로 브라우저는 다운 받은 파일을 가능한 재사용한다. 즉 캐싱한 파일을 사용한다.

강력 새로고침은 해당 페이지의 모든 캐시를 지우고 전부 새로 다운 받고 싶을 때 사용한다.

- 개발자 도구가 켜진 상태 → 새로고침 오른쪽 버튼 클릭
  ![Untitled](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/08bf1e06-fdbb-4c6f-b560-de84433a1c75)

- 단축키
  - Windows: `Ctrl` + `Shift` + `R`
  - Mac: `Cmd` + `Shift` + `R`

## \***\*Elements(요소) 탭\*\***

HTML 요소나 CSS 속성을 확인할 때 활용하는 탭
![Untitled 1](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/38e09f96-2ba5-4ff4-8409-75b77a01f823)

### \***\*Force element state\*\***

요소의 상태를 hover나 active 등으로 강제 변경하기
![Untitled 2](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/07b7b709-7f7c-4e6c-856a-72ab589eb4ea)

- 우측 상단의 `:hov`로도 변경 가능
  ![Untitled 3](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/1e8962d3-41b5-4856-baf7-8bdd5b929df2)

### HTML 요소를 변수로 지정하기

![Untitled 4](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/8315dbb6-d804-44fa-a6b3-cbe2c309524d)

console 탭에서 지정한 변수를 사용할 수 있다.
![Untitled 5](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/1187fea2-c068-4472-9c7a-692bb2d8b708)

### 등록된 event handler 확인하기

요소 선택 → Event Listeners 세부 탭
![Untitled 6](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/c2fee0ef-8569-49d1-a3fa-3bd93f17a084)

## **Network 탭**

항목을 클릭 → 리스폰스 헤더, 리퀘스트 헤더를 확인 가능

### \***\*Preview, Response 세부 탭\*\***

리스폰스 바디를 확인. **Preview**에서는 파싱된 JSON이나 렌더링된 HTML 확인 가능
![Untitled 7](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/be5e7022-258a-4baf-adbd-061744252fdb)

- **Response**에서는 원본 데이터 확인 가능, 왼쪽 아래의 `{}` 아이콘을 누르면 포매팅된 코드를 확인 가능.

### **리퀘스트를 `fetch()` 코드로 복사하기**

항목 선택 → 오른쪽 클릭 → Copy → Copy as fetch
![Untitled 8](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/da46d934-ab74-4b64-8bba-f613f7ea6ec5)

### **리퀘스트 필터링해서 보기**

- 왼쪽 상단의 `Filter` 인풋에 원하는 검색어를 적을 수 있다
  - 세부 탭
    - **All(전체):** 전부 보기
    - **Fetch/XHR:** API 요청하는 경우
    - **JS, CSS, Img, Media:** 파일을 다운로드 받은 경우
    - **Doc**: 페이지를 요청하는 경우 (HTML)

### **네트워크 속도 조절하기**

느린 인터넷 환경을 테스트할 때 유용한 기능

우측 상단의 `No Throttling` → 원하는 속도 선택
![Untitled 9](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/ea936fac-5da0-47f3-8699-2437e03f9694)

## Console 탭

### 출력값을 전역 변수로 지정하기

자바스크립트를 실행하고나서 Console 탭에서 내가 원하는 대로 테스트해 보고 싶을 때 사용

`console.log()` 로 출력한 값 → 오른쪽 클릭 → Store as global variable
![Untitled 10](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/9bc9f874-d50b-4dc1-bfb4-80b7f9fa8e93)

## \***\*Lighthouse 확장 프로그램\*\***

![Untitled 11](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/c8b5be47-f710-4124-aecc-38580f95ddb5)

- **First Contentful Paint(FCP)**
  - 뷰포트(화면) 영역에서 의미있는 콘텐츠가 처음으로 보이는 시점
- **Largest Contentful Paint(LCP)**
  - 뷰포트(화면) 영역에서 가장 큰 영역을 차지하는 이미지나 텍스트 요소가 처음으로 보이는 시점
- **Time To Interactive (TTI)**
  - 페이지가 완전히 사용자와 상호작용(클릭이나 텍스트 입력 등) 할 수 있을때 까지 걸리는 시간

## 참고 자료

[NHN Forward 천천히 읽어보는 Chrome 개발자 도구 설명서 - 박정환](https://velog.io/@ansrjsdn/NHN-Forward-%EC%B2%9C%EC%B2%9C%ED%9E%88-%EC%9D%BD%EC%96%B4%EB%B3%B4%EB%8A%94-Chrome-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EB%8F%84%EA%B5%AC-%EC%84%A4%EB%AA%85%EC%84%9C-%EB%B0%95%EC%A0%95%ED%99%98)

[Chrome으로 디버깅하기](https://ko.javascript.info/debugging-chrome)

[Find invalid, overridden, inactive, and other CSS - Chrome Developers](https://developer.chrome.com/docs/devtools/css/issues/)

[Simulate mobile devices with Device Mode | DevTools Tips](https://youtu.be/f7kokNyRe7U)

[CSS Flexbox debugging tools | DevTools Tips](https://youtu.be/J5n2aS37rpE)

[CSS Grid debugging tools | DevTools Tips](https://youtu.be/M8SlBgul8ao)

[Chrome DevTools - Chrome Developers](https://developer.chrome.com/docs/devtools/)

[DevTools Tips](https://devtoolstips.org/)

[라이트하우스 성능 지표 살펴보기](https://medium.com/jung-han/%EB%9D%BC%EC%9D%B4%ED%8A%B8%ED%95%98%EC%9A%B0%EC%8A%A4-%EC%84%B1%EB%8A%A5-%EC%A7%80%ED%91%9C-%EC%82%B4%ED%8E%B4%EB%B3%B4%EA%B8%B0-83df3dc96fb9)
