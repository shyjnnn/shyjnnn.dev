---
title: TypeScript를 왜 사용할까?
date: 2023-06-06
slug: TypeScript를-왜-사용할까
tags: JavaScript, Typescript
category: 🙏잡학사전
---

JavaScript로는 대규모 프로그램을 개발할 때 한계가 있어 TypeScript가 등장하였습니다. JavaScript의 한계는 주로 동적 타입 시스템과 연관이 있는데요,

먼저 ① 타입시스템이 무엇인지 알아보고 ② 자바스크립트의 한계점과 ③ 타입스크립트가 이러한 한계점을 극복하는 방법, 차별점과 특징에 대해서도 알아보도록 하겠습니다.

## 타입 시스템

> 프로그래밍 언어에서 사용되는 값들을 타입으로 분류하고, 타입 간의 규칙을 정의하는 체계입니다.

이 체계는 언어의 문법과 규칙을 통해 변수, 함수, 객체 등의 값들이 어떤 타입에 속하는지 결정하고, 이에 따라 해당 값들이 어떤 연산이 가능하고 어떤 동작을 수행할 수 있는지를 제한합니다.

### 타입 시스템의 목적

1. 타입 검사(Type Checking):

   프로그램의 정확성을 검증하기 위해 타입 오류를 찾아내고 방지합니다.

   타입 검사는 컴파일러나 인터프리터가 프로그램을 실행하기 전에 수행되어 오류를 사전에 찾아낼 수 있습니다.

2. 타입 추론(Type Inference)

   변수나 식(expression)의 타입을 자동으로 추론할 수 있습니다. 타입 추론은 변수에 초기값을 할당하거나 함수의 반환값을 분석하여 타입을 결정하는 기능입니다. 타입 추론을 통해 타입을 명시적으로 선언하지 않아도 타입 안정성을 유지할 수 있습니다.

3. 인터페이스 정의

   인터페이스를 정의하여 다른 코드와의 상호작용을 명확하게 할 수 있습니다. 인터페이스는 객체나 모듈 등의 구성 요소의 속성, 메서드, 타입 등을 명시하여 코드의 의도를 명확히 전달하고 재사용성을 높일 수 있습니다.

4. 코드 문서화 및 가독성 향상

   타입 시스템은 코드의 의미를 명확히 표현할 수 있도록 도와줍니다. 타입 정보를 코드에 명시하면 코드를 읽고 이해하기 쉬워지며, 개발자들 간의 협업과 유지보수가 용이해집니다.

모든 프로그래밍 언어는 각자의 타입 시스템을 가지고 있습니다. 그 중, 가장 대표적인 분류법으로 정적 타입 시스템과 동적 타입 시스템이 있습니다.

### 정적 타입 시스템(Static Type System)

> 코드 실행전에 모든 변수의 타입을 고정적으로 결정하는 타입 시스템입니다.

프로그램의 타입을 **컴파일 시간**에 분석하고 검사하는 방식입니다. 명시적으로 타입을 지정하며, 컴파일러가 코드를 컴파일하는 과정에서 타입 오류를 검출할 수 있습니다. 따라서 엄격하고 고정적인 시스템이라고 볼 수 있습니다.

주로 C, C++, Java, C#과 같은 언어들이 정적 타입 시스템을 사용합니다.

**장점**

- 타입 오류를 컴파일 시간에 검출할 수 있습니다.
  - 코드를 실행하기 전에 오류를 사전에 발견하고 수정할 수 있습니다.
  - 실 전에 Editor에서 미리 타입 에러가 나면 알려줍니다.
- 높은 안정성과 신뢰성
  - 타입을 명시함으로써 발생할 수 있는 예상치 못한 동작이나 버그를 사전에 방지할 수 있습니다.

**단점**

- **타입 선언의 추가 부담**
  - 모든 변수, 매개변수, 반환 값 등에 타입을 명시적으로 선언해야한다는 번거로움이 있습니다
- 가독성이 낮다.
  - 추가적인 설명이 없다면 함수의 파라미터에 어떤 타입의 값이 들어가야 하고 리턴되는 값은 어떤 타입이어야 하는지 구체적인 코드를 봐야 이해할 수 있습니다.

### 동적 타입 시스템(D**ynamic Type System)**

> 코드를 실행하기 전에는 타입을 결정하지 않고 코드를 실행하고 나서 그때 그때마다 유동적으로 변수의 타입을 결정하는 타입시스템입니다.

프로그램의 타입을 **런타임**에 결정하고 검사하는 방식입니다. 따라서 타입 오류가 발생하는 경우는 런타임에야 알 수 있습니다. 변수에는 명시적인 타입 선언이 필요하지 않으며, 값이 할당될 때 해당 값의 타입에 따라 동적으로 타입이 결정됩니다. 따라서 자유롭고 유연한 시스템이라 볼 수 있습니다.

Python, **JavaScript**, Ruby와 같은 언어들이 동적 타입 시스템을 사용합니다.

**장점**

- 자유로움과 유연성
  - 타입을 명시적으로 선언하지 않아도 변수에 다양한 타입의 값을 할당할 수 있습니다.

**단점**

- **런타임 오류 발생 가능성**
  - 타입 검사가 런타임 시에 이루어지므로 예기치 못한 타입 관련 오류가 발생할 수 있습니다. 이에 따라 디버깅과 유지보수를 어렵게 만들 수 있습니다.
  - 잘못된 코드(타입에러)여도 실행은 되지만, 프로그램이 비정상적으로 종료됩니다.
  - 프로그램은 실행 전에 검사를 해서 에러가 있다면 애초에 실행되지 않는 것이 효율적이고 안전합니다.
- 높은 가독성
  - 코드에 명시적인 타입 정보가 포함되어 가독성이 향상되고, 코드의 의도를 명확하게 전달할 수 있습니다.

## 자바스크립트의 한계

자바스크립트의 한계는 동적 타입 시스템의 단점과 동일합니다.

자바스크립트는 동적 타입 시스템을 가지고 있어서 타입을 미리 지정하지 않아도 코드를 실행할 수 있습니다. 이는 자유로움과 유연성을 제공하지만, 실행 중에 타입 관련 오류가 발생할 수 있습니다. **타입 에러는 런타임에야 알게 되기 때문**에 디버깅이 어려울 수 있고, 프로그램의 안정성이 떨어질 수 있습니다.

## \***\*타입스크립트와 점진적 타입 시스템\*\***

타입스크립트는 정적 타입 시스템 + 동적 타입 시스템을 합친 **점진적 타입 시스템 (Gradual Type System)**을 사용합니다.

이로 인해 정적 타입 시스템을 가지는 자바스크립트의 단점을 보완하여 타입 안정성을 확보하면서도 **_추론_**을 통해 동적 타입 시스템의 단점인 과도한 번거로움을 해결하고 유연함을 확보합니다.

<aside>
💡 **타입 추론**

타입스크립트에서는 이렇게 변수의 타입을 명시 하지 않아도 변수에 담기는 초기값을 기준으로 자동으로 타입을 알아서 추론합니다.

</aside>

## 정리 : 타입스크립트의 이점

**컴파일 단계에서 오류를 포착**할 수 있고, **코드를 통해 어떤 타입의 값이 필요한지 쉽게 파악**할 수 있어 코드의 흐름을 이해하기 쉽고 협업에 도움이 됩니다.

## 출처

- [JS의 단점과 TS의 장점](https://ts.winterlood.com/228976ad-1b7a-40c8-91a3-c0e0fbcb6701)
