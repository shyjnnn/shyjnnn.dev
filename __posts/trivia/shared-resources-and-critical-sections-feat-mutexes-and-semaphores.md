---
title: 공유 자원과 임계 영역 (feat. 뮤텍스와 세마포어 등)
date: 2023-06-26
slug: 공유-자원과-임계-영역-feat.뮤텍스와-세마포어-등
author: eva
tags: CS
summary: 경쟁상태, 교착상태의 조건과 임계구역의 조건, 해결 방법론인 뮤텍스, 스핀락, 세마포어, 모니터 등에 대해 톺아보자
category: 🙏잡학사전
---

## 공유 자원 (Shared Resource)

시스템 안에서 각 프로세스, 스레드가 함께 접근할 수 있는 자원이나 변수 등을 의미한다. 이 공유 자원을 두개 이상의 프로세스가 동시에 읽거나 쓰는 상황을 경쟁 상태(race condition)라고 한다.

**동시에 접근**을 시도할 때 접근 타이밍이나 순서 등이 **결괏값에 영향**을 줄 수 있는 상태인 것이다.

## 교착 상태

여러 프로세스 또는 스레드가 각자 필요로 하는 자원을 점유한 채로 다른 프로세스 또는 스레드가 점유한 자원을 대기하는 상태이다. 이때 모든 프로세스 또는 스레드가 대기 상태에 머물러 더 이상 진행하지 못하게 되며, 시스템이 블록될 수 있다.

**교착 상태가 발생하는 조건 4개**

1. 상호배제
2. 점유 대기
3. 비선점
4. 순환 대기

## 임계 영역 (Critical Section)

둘 이상의 프로세스, 스레드가 공유 자원에 접근 할 때 순서 등의 이유로 **결과가 달라지는 코드 영역**을 말한다. 따라서 동시 접근을 하려고 하는 자원에서 문제가 발생하지 않게 독점을 보장해줘야하는 영역이다.

교착 상태가 발생할 수 있는 영역이다. 즉, 임계영역을 해결하기 위해서는 상호배제와 비선점 조건을 만족시키면서 점유대기와 순환대기를 피해야 한다.

> 정리하자면, 임계영역은 프로세스나 스레드가 공유 데이터를 접근하고 변경하는 코드 영역을 의미한다. 임계영역은 상호배제(Mutual Exclusion)이 필요한 부분으로, 한 번에 하나의 프로세스 또는 스레드만이 접근할 수 있어야 한다. 임계영역의 동시 접근은 경쟁 상태나 교착 상태를 발생시킬 수 있다.

## 임계 영역을 해결하기 위한 방법론

<aside>
💡 임계 영역을 해결하기 위해선 상호 배제, 한정 대기, 융통성 3가지 조건을 만족해야한다.

- **상호 배제**
  - 한 프로세스가 임계 영역에 들어갔을 때 다른 프로세스는 들어갈 수 없다.
- **한정 대기**
  - 특정 프로세스가 영원히 임계 영역에 들어가지 못하면 안된다.
- 진행의 **융통성** - 한 프로세스가 다른 프로세스의 일을 방해해서는 안된다. - 임계구역에 프로세스가 없다면 어떠한 프로세스라도 들어가서 자원을 활용할 수 있다. 즉, 두 프로세스가 자원을 번갈아 쓴다고 가정할 때 한 쪽에서 자원을 안쓰고 있다고해서 다른 한 쪽 프로세스가 자원을 쓰고싶어도 자신의 turn이 아니라고 기다리는 것은 효율적이지 못하다는 것이다.
</aside>

임계 영역의 문제점을 해결하기 위한 상호배제 기법에는 다음과 같은 3가지 방법론이 있다.

### 1. 뮤텍스 (mutex)

![Untitled 1](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/5c7b0c64-f06a-4332-8389-21936f2d3627)

출처 : [hudi.blog](https://hudi.blog/race-condition-critical-section-mutual-exclusion/)

- 상호 배제라는 뜻이 있다!
- 잠금 메커니즘

프로세스나 스레드가 공유 자원을 `lock()`을 통해 잠금 설정하고 사용한 후에는 `unlock()`을 통해 잠금을 해제하는 객체이다. 잠금이 설정되면 다른 프로세스나 스레드는 담긴 영역에 점근할 수 없고 해제는 그 반대이다.

- `lock` 또는 `unlock`라는 상태만 가진다.
- 공유 자원을 사용 중인 스레드가 있을 때, 다른 스레드가 공유 자원에 접근한다면 Blocking 후 **대기 큐**로 보낸다. (스핀락을 사용하지 않을 경우)
  - 즉, sleep waiting
- Lock을 건 스레드만 Lock을 해제할 수 있다.

**스핀락 (Spin lock)**

임계영역이 `lock`이 걸려서 진입이 불가능할 때, **임계영역이** `unlock`**되어 진입이 가능해질 때까지 루프를 돌면서 재시도하여 스레드가 CPU를 점유하고 있는 상태**

- Mutex-nonblocking 모델
- **busy waiting**을 하며 대기 큐를 갖지 않는다.
- Context Swtich가 일어나지 않아 비용을 아껴준다.
  - 운영체제의 스케줄링 지원을 받지 않기 때문이다.
  - 임계영역이 짧은 시간 안에 언락되어 진입이 가능한 상태이면 context switch 비용이 들지 않아 효율적일 수 있다.
  - **임계영역이 오랜 시간동안 언락되지 않으면 그 시간동안 계속 CPU를 점유하고 있어 다른 스레드가 사용하지 못하기 때문에 오버헤드도 존재한다.**
- 스핀락이 유용할 경우
  - Lock-Unlock 과정이 짧아서 `lock`의 경우가 드문 경
  - 멀티 코어 프로세스일 경우

### 2. 세마포어 (semaphore)

![Untitled 2](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/293c58ab-9a24-4253-bea0-efc26454a465)

출처 : [hudi.blog](https://hudi.blog/race-condition-critical-section-mutual-exclusion/)

- 신호 메커니즘 (신호 기반의 상호배제 방법)

일반화된 뮤텍스이다. 간단한 정수값과 두가지 함수 `wait`(= P함수) 및 `signal`(= V함수)로 공유 자원에 대한 접근을 처리한다.

- `wiat()`: 자신의 차례가 올 때까지 기다리는 함수
- `signal()`: 다음 프로세스로 순서를 넘겨주는 함수

프로세스나 스레드가 공유 자원에 접근하면 세마포어에서 `wait()`작업을 수행하고 프로세스나 스레드가 공유 자원을 해제하면 세마포어에서 `signal()` 작업을 수행한다. 세마포어에는 조건 변수가 없고 프로세스나 스레드가 세마포어 값을 수정할 때 다른 프로세스나 스레드는 동시에 **세마포어 값(S)을 수정**할 수 없다.

- 바이너리 세마포어
  - 0과 1의 두가지 값만 가질 수 있는 세마포어이다.
- 카운팅 세마포어
  - 여러 개의 값을 가질 수 있는 세마포어

**대기 방식**

**뮤텍스와** 마찬가지로 sleep waiting과 busy waiting 두가지 방식으로 대기를 한다.

- sleep waiting
  - 대기 큐에서 기다리고 있다가 사용가능한 자원이 생기면 신호를 준다
- busy waiting
  - 사용 가능한 자원이 생길 때까지 검사를 한다. 세마포어 값(S)이 음수가 되면 busy waiting 중인 프로세스나 스레드가 있다는 뜻!

<aside>
💡 **뮤텍스와 세마포어의 차이점**

- 뮤텍스는 세마포어가 될수 없지만 세마포어는 뮤텍스가 될 수 있다.
- 뮤텍스는 자원을 소유할 수 있고 소유자가 이에 책임을 지는 반면, 세마포어는 소유할 수 없다.
- 뮤텍스는 상태가 0, 1 뿐이므로 Lock을 가질 수 있고, 소유하고 있는 스레드만이 이 뮤텍스는 를 해제할 수 있다. 반면 세마포어는 세마포어를 소유하지 않는 스레드가 세마포어를 해제할 수 있습니다.
- 뮤텍스는 프로세스의 범위를 가지며 종료될 때 자동으로 Clean up 된다. 세마포어는 시스템 범위에 걸쳐있고 파일 시스템 상의 파일로 존재한다.

두 기법 모두 완벽한 기법은 아니므로 데이터의 무결성을 보장할 수는 없으며 모든 교착상태를 해결하지는 못한다!

</aside>

### 3. 모니터

![Untitled](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/b0123fdf-9048-467d-bb7e-f6b96c43f363)

출처 : [hudi.blog](https://hudi.blog/race-condition-critical-section-mutual-exclusion/)

둘 이상의 스레드나 프로세스가 공유 자원에 안전하게 접근할 수 있도록 공유 자원을 숨기고 해당 접근에 대해 인터페이스만 제공한다. 공유 자원도 외부로부터 캡슐화하여 숨긴다. 모니터 큐에 접근이 쌓인다.

- 세마 포어에 비해 구현하기 쉽다.
  - 모니터는 상호 배제가 자동인 반면 세마포어에서는 상호배제를 명시적으로 구현해야하기 때문이다.