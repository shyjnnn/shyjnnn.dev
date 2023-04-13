---
title: local & session Strorage 차이
date: 2023-05-30
slug: local-session-strorage-차이
tags: CS
category: 🙏잡학사전
---

### 웹 스토리지란?

- key와 value 쌍의 형태로 데이터 저장합니다.
- key와 value 쌍의 형태로 데이터 저장하며 window 객체의 프로퍼티로 존재합니다. (Storage 객체를 상속)
- 로컬 스토리지와 세션 스토리지가 존재합니다
- 문자열 외에도 자바스크립트의 모든 원시형 데이터와 객체 저장 가능합니다.
  - 객체를 저장할 때는 JSON.stringify() 함수를 사용하여 객체를 문자열로 변환해야합니다.
  - 즉 모든 타입이 문자열로 저장됩니다.
- 쿠키와 달리 자동 전송의 위험성이 없습니다.
- 오리진(Origin)(도메인,프로토콜,포트) 단위로 접근이 제한되는 특성 덕분에 **CSRF로 부터 안전**합니다.
- HTML5를 지원하는 브라우저만 사용가능하며 XSS로부터 위험합니다.
- • 서버가 HTTP 헤더를 통해 스토리지 객체를 조작할 수 없습니다 (웹 스토리지 객체 조작은 JavaScript 내에서만 수행)

두 스토리지 모두 데이터를 웹 브라우저의 클라이언트 측에 임시로 저장하는 용도로 사용됩니다.

가장 큰 차이점은 **데이터의 영구성**입니다.

### 세션스토리지

웹 페이지 세션(웹 사이트를 방문하는 동안 유지되는 시간)동안 데이터를 저장하는 역할. 브라우저가 종료되면 사라집니다.

- 즉, 다른 브라우저 탭이나 창에서는 세션 스토리지에 접근할 수 없습니다.
- PC에서 보통 5MB의 용량을 가지며 로컬 스토리지 보다 작습니다.
- 장바구니 등 일회성 저장에 사용

### 로컬 스토리지

브라우저를 종료하더라도 데이터를 영구적으로 저장합니다.

- PC에서 보통 5-10MB 정도의 용량을 가집니다.
- 자동 로그인에 사용