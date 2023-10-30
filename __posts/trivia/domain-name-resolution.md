---
title: Domain Name Resolution
date: 2023년 5월 1일
slug: Domain-Name-Resolution
tags: CS, Network
category: 🙏잡학사전
---

**Domain Name Resolution**

브라우저는 인터넷에서 데이터를 주고 받기 위한 TCP/IP모델을 사용합니다. 따라서 브라우저는 리소스를 요청하기 위해 대상 서버의 IP 주소가 필요합니다.

- 브라우저가 도메인에서 IP 주소를 받는 과정을 Domain Name Resolution이라고 합니다.
  ![Untitled](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/eb1906e9-0a09-4adf-bf5a-5962c1adec24)

우리가 브라우저에 naver.com을 입력하면 먼저 브라우저는

1. 브라우저 DNS 캐시:

   브라우저는 먼저 자신의 DNS 캐시를 확인합니다. 이 캐시는 이전에 방문한 사이트의 IP 주소를 저장하여 빠르게 접속할 수 있도록 도와줍니다.

   - 개발자 도구에서 Network 탭을 선택하면 DNS Lookup 항목에서 DNS 조회 과정과 결과를 확인할 수 있습니다.

2. OS DNS 캐시

   브라우저 DNS 캐시에 없는 경우, 운영체제는 자신의 DNS 캐시를 확인합니다. 이전에 방문한 사이트의 IP 주소가 운영체제에 저장되어 있는 경우, 운영체제는 해당 IP 주소를 사용하여 브라우저에 전달합니다.

   - 운영체제 메모리에 저장됩니다. 보통 `C:\Windows\System32\dns\cache` \*\*\*\*에서 확인 가능
   - 대부분의 운영체제에서는 터미널을 통해 `ipconfig`나 `nslookup` 등의 명령어를 사용하여 DNS 캐시를 확인할 수 있다고 합니다.

3. 호스트 파일

   브라우저 DNS 캐시와 OS DNS 캐시에 해당 정보가 없는 경우, OS는 호스트 파일을 확인합니다. 호스트 파일에는 로컬 IP 주소와 도메인 이름이 매핑되어 있습니다.

   - 로컬 컴퓨터의 파일 시스템에 저장되어있습니다. `C:\Windows\System32\drivers\etc\hosts` 있다고 합니다.

   ***

   여기까지가 client에서 확인

4. Public DNS 서버

   브라우저 DNS 캐시, 운영체제 DNS 캐시, 호스트 파일에서 해당 정보가 없는 경우, 운영체제는 Public DNS 서버에 요청합니다. Public DNS 서버는 Root DNS 서버와는 다르게 인터넷에서 누구나 접속할 수 있는 DNS 서버입니다.

   - 대표적인 공개 DNS 서버로는 Google의 8.8.8.8, Cloudflare의 1.1.1.1 등이 있습니다.
   - 매일 수십억 명의 사람들이 웹을 방문하는 상황에서 13개의 루트 서버로는 모든 사용자에게 서비스를 제공하기에 한계가 있습니다. 따라서 Root DNS 서버에 가기 전에 Public DNS 서버에서 도메인을 찾습니다.

5. Root DNS 서버

   Public DNS 서버에서도 해당 정보가 없는 경우, 운영체제는 Root DNS 서버에 요청합니다. 현재는 [13개의 Root 서버(A~M)](https://ko.wikipedia.org/wiki/%EB%A3%A8%ED%8A%B8_%EB%84%A4%EC%9E%84_%EC%84%9C%EB%B2%84)가 있다고 합니다. 각 Root DNS 서버는 top-level DNS server의 IP 주소 목록을 유지 관리합니다.

6. TLD DNS 서버

   top-level DNS server를 방문하면 시스템은 대상 authoritative DNS server의 IP 주소를 받습니다.

   - "[naver.com](http://naver.com/)"의 경우, Root DNS 서버는 ".com"의 TLD DNS 서버의 IP 주소를 알려줍니다.

7. authoritative DNS server

   마지막으로 authoritative DNS server는 찾고자 하는 도메인의 IP 주소를 반환합니다.

   - TLD DNS 서버인 ".com"의 authoritative DNS 서버가 "[naver.com](http://naver.com/)"의 IP 주소를 브라우저에게 알려줍니다.
     <img width="733" alt="Untitled 1" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/ad7aa7d6-7a60-40cf-89a0-e3f72e4052df">
