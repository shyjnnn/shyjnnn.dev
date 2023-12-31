---
title: 브라우저가 어떻게 동작할까?
date: 2023-04-03
slug: 브라우저가-어떻게-동작할까
tags: CS
category: 🙏잡학사전
---

> 출처 : [https://yozm.wishket.com/magazine/detail/1338/](https://yozm.wishket.com/magazine/detail/1338/)

## 브라우저 컴포넌트

1. HTML로부터 DOM 트리를, CSS로부터 CSSOM 트리를 빌드합니다.
2. DOM 및 CSSOM을 결합하여 렌더 트리를 형성합니다.
3. 렌더 트리에서 레이아웃을 실행하여 각 노드의 기하학적 형태를 계산합니다.
4. 개별 노드를 화면에 페인트합니다.
   ![Untitled 1](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/95cce7ab-7184-428d-91ac-91a0442f4946)

- **사용자 인터페이스(UI)**
- **브라우저 엔진**
  - 사용자 인터페이스와 렌더링 엔진 사이에서 중개자 역할을 합니다.
  - 만약 사용자 인터페이스 레이어에 있는 새로고침 버튼을 눌렀다면, 브라우저 엔진은 이를 이해하고 새로고침 명령을 수행합니다.
- **렌더링 엔진**
  - HTML과 CSS, JavaScript를 파싱하고 그 결과물을 바탕으로 페이지를 그려내는 역할을 합니다.
    - 각 브라우저는 다양한 엔진을 사용하는데, Chrome과 Opera, Edge는 Blink를, Firefox는 Gecko를, Internet Explorer는 Trident를, Safari는 WebKit을 사용합니다.
- **네트워크 레이어**
  - HTTP나 HTTPS 같은 프로토콜을 이용해 외부의 리소스를 얻어오고, 서버에 요청을 보낼 때 사용되는 레이어입니다.
- **JavaScript** 인터프리터
  - JavaScript를 해석하고 실행하는 역할을 합니다. 가장 유명한 엔진으로 Chrome에 탑재된 구글의 V8이 있습니다.
- **UI 백엔드**
  - 브라우저가 동작하고 있는 운영체제의 인터페이스를 따르는 UI들을 처리합니다.
    - Alert이나 셀렉트 박스(Select)가 운영체제 별로 다르게 동작
- **자료 저장소**
  - 브라우저 자체에서 하드디스크와 같이 데이터를 로컬에 저장하기 위한 레이어
  - 쿠키나 로컬 스토리지, 세션 스토리지, IndexedDB, 웹 SQL, 파일시스템 등에 접근하고 데이터를 저장하는 데 사용됩니다.

## 렌더링 엔진 동작 과정

![Untitled](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/cb422f03-ceab-4a1f-884d-d647d08b06c5)

Critical Rendering Path는 아래의 4단계를 거칩니다.

- Parsing
- Render Tree 구축
- Layout 또는 Reflow
- Paint

이 과정의 최적화를 통해 렌더링에 걸리는 시간을 개선시키고 UX를 방해하지 않게 하는 것!

### 파싱(Parsing)

토큰화(Tokenize)된 코드를 구조화하는 과정입니다. 입력받은 문자열이 정해진 문법을 모두 따르는지 확인하는 과정입니다.

브라우저는 HTML, CSS, JavaScript 세 종류의 언어를 해석할 수 있습니다. 그러나 JavaScript는 렌더링 엔진 레이어가 아니기 때문에 JavaScript 해석기라는 별도의 레이어에서 언어를 해석합니다. 렌더링 엔진은 HTML과 CSS를 파싱합니다.

1. HTML 파싱
   - 브라우저는 토큰화된 HTML 문자열을 이용해 파스트리(Parse Tree)를 생성합니다.
   - 파스트리를 이용해 DOM 트리를 새로 만듭니다.
     - 실제로 상호작용할 수 있는 HTML 엘리먼트로 이루어진 트리로 실제 JavaScript로 상호작용할 수 있는 부분입니다.
2. CSS 파싱
   - CSS 파싱 과정이 끝난 후 코드에서 명세한 내용과 순서를 바탕으로 CSSOM(CSS Object Model) 트리를 생성합니다.

### 렌더 트리

DOM트리가 구성되는 동안 브라우저는 렌더트리(Render Tree) (= Frame 트리)를 구성합니다.

- 렌더트리는 DOM + CSSOM인 트리입니다.

### 레이아웃 or 리플로우

렌더트리에서 계산되지 않았던 노드들의 크기와 위치, 레이어 간 순서와 같은 정보를 계산해 좌표에 나타냅니다.

### 페인트

레이아웃 단계를 통해 배치된 엘리먼트들에게 색을 입히고 레이어의 위치를 결정하는 단계입니다.

> 가상DOM에 대해 찾아보기!
