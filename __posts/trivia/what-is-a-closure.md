---
title: 클로저란 무엇인가?
date: 2023년 6월 26일
slug: 클로저란-무엇인가
tags: JavaScript
category: 🙏잡학사전
---

## 1. 클로저의 정의

클로저는 자바스크립트 고유의 개념이 아니라 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어(Functional Programming language: 얼랭(Erlnag), 스칼라(Scala), 하스켈(Haskell), 리스프(Lisp)…)에서 사용되는 중요한 특성입니다.

즉, 함수형 프로그래밍을 사용하는 언어에서 사용되는 보편적이고 중요한 특성입니다. 해당 언어로 함수형 프로그래밍이 가능하면 클로저 현상도 발생한다고 볼 수 있습니다.

<aside>
💡 **이곳 저곳의 클로저 정의**

- 자신을 내포하는 함수의 컨텍스트에 접근할 수 있는 함수 — 더글라스 크록포드, 《자바스크립트 핵심 가이드》, 한빛미디어(p68)
- 함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 것 — 에단 브라운, 《러닝 자바스크립트》, 한빛미디어 (p196)
- 함수를 선언할 때 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수 — 존 레식, 《자바스크립트 닌자 비급》, 인사이트(p116)
- 이미 생명 주기상 끝난 외부 함수의 변수를 참조하는 함수 — 송형주 고현준, 《인사이드 자바스크립 트》, 한빛미디어(p157)
- 자유변수가 있는 함수와 자유변수를 알 수 있는 환경의 결합 — 에릭 프리먼, 《Head First Javascript Programming》, 한빛미디어(p534)
</aside>

MDN에서는 클로저에 대해 다음과 같이 소개합니다.

> “A closure is the combination of a function and the lexical environment within which that function was declared.”

“클로저는 함수와 그 함수가 **선언될 당시의 lexical environment의 상호관계**에 따른 현상”

여기서 주의 깊게 봐야 할 것은 `Lexical environment`의 상호 관계라는 말입니다. 이것은 자바스크립트의 동작 원리와 긴밀한 관계가 있는데요, 여기서`Lexical Environment`는 무엇일까요?

**실행 컨텍스트와 `LexicalEnvironment`**
`LexicalEnvironment`는 실행 컨텍스트의 구성 요소로, 그 내부에는 `LexicalEnvironmentRecord`와 `OuterEnvironmentReference` 두 가지 주요 구성 요소가 있습니다.

이 두 가지의 관점에서 클로저의 동작 과정에 대해 살펴보며 클로저에 대해 알아볼텐요, 아래부터는 두 가지를 각각 `Record`와 `Outer`로 축약해 부르도록 하겠습니다.

- `Record`: 현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장됩니다.
- `Outer` : 식별자의 유효 범위를 안에서 부터 바깥으로 차례로 검색해나가는 스코프 체인을 가능하게 하는 상위 `LexicalEnvironment`를 참조하는 포인터입니다.

### JavaScript에서 클로저의 동작 과정

아래의 코드를 기반으로 콜스택과 실행 컨텍스트의 관점에서 클로저의 동작 과정을 살펴보도록 하겠습니다.

```jsx
var outer = function () {
  var a = 1;
  var inner = function () {
    console.log(++a);
  };
  return inner;
};

var plus = outer();
console.log(plus()); // 2
console.log(plus()); // 3
```

가장 먼저, 자바스크립트에서는 코드를 실행하기 앞서 코드 평가를 진행하는데요, Global에 `LexicalEnvironment`를 생성하고 전역 코드 평가가 이루어집니다.

![Untitled](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/002b4dc3-7354-4f4c-9eec-a273e71b9f9d)

코드 평가에서는 outer와 plus변수를 호이스팅해 Record에 outer변수를 기록해둡니다. 이때 outer변수와 plus변수는 undefined로 초기화됩니다.

현재 전역 코드 평가가 이루어지고 있기 때문에 `Outer`에는 null이 할당되구요

이후 콜스택에 Global의 `LexicalEnvironment`를 push하게 됩니다.

그리고 변수 outer에 함수 표현식이 할당되는 부분에 도달하면 할당 연산이 이루어집니다. 따라서 함수 표현식이 함수 값으로 평가되고 변수 outer의 값이 해당 함수로 변경됩니다.

![Untitled 1](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/217decdb-daf3-4eb4-9639-a6ae658d1a84)

전역 평가 과정이 종료되고 코드가 순차적으로 실행되는데 plus변수에 값을 할당하기 위해 outer 함수를 호출하게 됩니다. Global의 `LexicalEnvironment` 코드 평가 과정과 동일하게 outer 함수의 실행 컨텍스트가 생성되는데요, 즉, oute 함수r의 `LexicalEnvironment`를 생성하고 outer 함수 내부의 코드 평가가 이루어집니
다.

`Outer`에는 Global의 `LexicalEnvironment`를 가르킵니다. 함수 표현식의 `LexicalEnvironment`의 `Outer`는 변수의 스코프와 동일한 `LexicalEnvironment`를 가리키는 데요, 따라서 outer 함수의 `LexicalEnvironment`의 `Outer`는 outer 변수가 선언된 `LexicalEnvironment`를 가리키게 되는 것입니다.

이후 콜스택에 outer 함수의 `LexicalEnvironment`를 push하게 됩니다.

outer 함수를 실행하면서 변수 inner에 함수 표현식이 할당되는 부분에 도달하면 할당 연산이 이루어집니다. 따라서 함수 표현식이 함수 값으로 평가되고 outer 함수의 `Record`의 변수 inner의 값이 해당 함수로 기록됩니다.

이후에 실행할 코드가 없으니 outer의 `LexicalEnvironment`는 콜 스택에서 pop 되고
![Untitled 2](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/800e34a1-773d-4fc5-bf66-7a4dbf894a34)

다시 Global의 `LexicalEnvironment`로 돌아와 plus변수에 outer 함수의 리턴 값인 inner 함수를 할당하고 `Record`에 있는 plus변수에 inner 함수를 할당합니다.

이때, 여기서 plus변수에 inner 함수를 할당 받은 모습으로 풀어서 이렇게 볼 수 있습니다.

```jsx
var plus = function () {
  return ++a;
};
```

plus함수의 호출이 일어나면 plus에 `LexicalEnvironment`를 생성하고 plus함수 내부 코드 평가가 이뤄집니다.

![Untitled 3](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/803e1ddc-562f-42a9-84f8-11d8829df9e6)

plus함수의 `Record`에는 수집할 정보가 없습니다. 다음으로 `Outer`에는 inner 함수가 선언된 위치의 `LexicalEnvironment`를 가리키게 됩니다.

> 여기서 이상한 점!

현재 콜 스택에는 Global의 `LexicalEnvironment`만 존재하는데, 어떻게 plus의 `LexicalEnvironment`의 `Outer`는 outer의 `LexicalEnvironment`를 가리키게 할 수 있을까요?

이러한 현상을 가지고 있는 자바스크립트의 특성 때문에 **클로저**라는 현상이 일어나게 되는 것입니다.

다시 한번 말하지만 함수 표현식의 `LexicalEnvironment`의 `Outer`는 변수의 스코프와 동일한 `LexicalEnvironment`를 가리키는데요.

inner 함수는 outer 함수 내부에서 선언되었기 때문에 plus함수의 `Outer`는 outer 함수의 `LexicalEnvironment`를 가리키게 됩니다.

즉, outer 함수 내부 코드 평가 과정을 진행할 때ninner 변수에 현재 실행 중인 실행 컨텍스트인 outer의 `LexicalEnvironment`를 등록해 놓은 것입니다.

이렇듯, 어떤 함수의 `Outer`는 어떤 `LexicalEnvironment`에서 **선언**되었는지가 중요합니다.

또 다른 관점에서 보자면 콜 스택에서 빠져나간 실행 컨텍스트를 버리기 위해 수집하는 가비지 컬렉터는 어떤 함수의 `LexicalEnvironment`가 참조할 예정인 다른 실행 컨텍스트가 있으면, 실행 종료 이후 수집하지 않습니다.

다시 코드로 돌아와서, 앞서 설명 드린 이유에 의해 plus의 `LexicalEnvironment`의 `Outer`는 콜 스택에 없는 inner의 `LexicalEnvironment`를 가리킬 수 있으니 이제 plus의 `LexicalEnvironment`는 콜스택에 push 됩니다

![Untitled 4](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/c13d0cd6-815b-4f82-9492-b80020e5bddc)

plus함수 내부 코드의 평가 과정의 끝이 나고 코드를 한 줄씩 실행하게 됩니다. 이때 우리는 plus함수의 `Record` 안에 존재하지 않는 a 변수를 마주하게 되는데요, 이때 스코프 체이닝이 일어납니다.

a 변수는 첫 번째로 실행 중인 실행 컨텍스트인 plus 함수의 `Record` 를 탐색하게 됩니다. 하지만 plus의 `Record` 안에 a 변수가 선언되어 있지 않기 때문에 outer 함수의 `LexicalEnvironment`를 확인하게 됩니다. outer 함수의 `Record`를 확인하니 a 변수에 1 할당되어 있는 것을 확인하고 다시 본래 코드로 돌아갑니다.

다시 정리하자면 outer 함수의 `LexicalEnvironment`는 콜 스택에 존재하지 않지만 plus 함수의 `LexicalEnvironment`의 Outer가 가리키고 있는 outer함수의 `LexicalEnvironment`가 가지고 있는 변수 a가 사라지지 않는 현상을 **클로저 현상**이라 할 수 있습니다.

즉, 스코프 체이닝에 따라 outer에서 선언한 변수 a에 접근해 1만큼 증가 시킨 다음, 2를 반환하고

그 다음 줄도 마찬가지로, plus를 호출하면 같은 방식으로 a에 접근해 2에서 3으로 1 증가 시킨 후 3을 반환합니다.

다음으로 plus함수의 실행 컨텍스트가 pop되고, 마지막으로 Global의 LexicalEnvironment도 콜 스택에서 pop되며 프로그램이 종료됩니다.

### **클로저 개념 정리**

위 동작 원리에서 살펴본 것처럼,

클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부 함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 후에도 변수 a가 사라지지 않는 현상을 말합니다.

## 클로저의 활용

<aside>
💡 그래서 클로저를 왜 알아야할까?

</aside>

클로저를 알아야 하는 이유는 함수형 프로그래밍과 밀접한 관계가 있습니다. 물론, 자바스크립트에서는 일반적으로 그동안 하지 못했던 은닉화를 위해 사용되지만, 범용적인 의미에서 클로저는 함수형 프로그래밍에서 완전히 채택되었습니다.

따라서 은닉화와 함수형 프로그래밍, 2가지 관점으로 나눠 설명하겠습니다.

### 1. 자바스크립트에서 은닉화에 활용

직접적으로 변경되면 안 되는 변수에 대한 접근을 막는 것을 은닉화라고 하는데요. ES2019 이전의 Javascript에는 다른 언어와 같이 private 접근 제한자가 없었습니다. (현재는 `#` prefix가 있다고 해요)

따라서 클로저를 활용해 접근 제한을 구현했는데요.

```jsx
function makeFunc() {
  let name = "eva";
  function printNameWithAge() {
    console.log("24살 " + name);
  }
  function printNameWithGender() {
    console.log("여성 " + name);
  }
  return { name, printNameWithAge, printNameWithGender };
}
```

이 코드를 보면 `makeFunc()` 함수는 3가지 속성을 포함하고 잇는데요, 이 3가지 속성을 가지는 객체를 반환하는 걸 볼 수 있습니다.

![Untitled 5](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/44b7c74e-b816-4722-8a54-daf6807e2527)

먼저 `printEvaInfo` 변수에 `makeFunc()`을 실행해 할당하면 return 문의 3가지 속성이 담긴 객체가 할당되는데요.
printEvaInfo 객체의 `printNameWithAge()` 함수를 호출하면, 24살 eva라는 문자열이 출력 됩니다. 마찬가지로 printEvaInfo 객체의 `printNameWithGender()` 함수를 호출해도 미리 설정한 여성 eva가 출력 됩니다.

여기서 printEvaInfo 객체의 name 속성의 값을 바꾸면 어떻게 될까요?
![Untitled 6](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/fbbfe2bc-05af-43b7-b923-08bce032b785)

`printEvaInfo`를 출력해보면 바뀐것을 확인할 수 있고요.
printEvaInfo 객체의 printNameWithAge() 함수를 호출하면, 신예진이 아닌 eva라고 출력 됩니다.

그 이유는 **클로저** 때문인데요. printNameWithAge()는 리턴 되는 시점에 name의 값이 이미 정해지기 때문입니다. 따라서 직접적으로 접근해 변경하지 못하도록 name을 private하게 관리할 수 있는 것이죠.

### 2. 함수형 프로그래밍에서의 사용

아까 초반에 말씀 드린 클로저 개념, 기억 나시나요?

여기서 언급되는 2가지 키워드가 일급 객체와 함수형 프로그래밍입니다.

**일급 객체의 특성**

- 변수에 할당할 수 있다.
- 다른 함수를 인자로 전달 받는다.
- 다른 함수의 결과로서 리턴 될 수 있다.

일급객체의 이러한 특성 덕분에 **고차 함수**를 만들 수 있게 됩니다.

이렇게 함수를 일급 객체로 취급하는 함수형 프로그래밍은 패러다임입니다.

과거에는 절차 지향 프로그래밍에서 객체 지향 프로그래밍으로 패러다임이 변화했습니다. 그에 따라 객체 지향은 마치 정답처럼 여겨졌는데요. 오늘날엔 객체 지향 패러다임에서 함수형 패러다임으로 넘어오고 있습니다.

이런 함수형 프로그래밍이 도대체 뭐길래 이리도 주목 받고 있을까요?

### **이제는 객체 지향 보다는 함수형이 대세?**

객체 지향 **프로그래밍** 패러다임은 객체를 중심으로 사고하고 프로그램을 작성하는 것입니다. 반면 데이터를 **함수**로 연결하는 것을 중심으로 사고하고 **프로그래밍**을 하는 것을 **함수형 프로그래밍** (패러다임) 이라고 부릅니다.

먼저 기존의 객체 지향 프로그래밍은 다음과 같습니다. 예를 들어 초콜릿을 만드는 공장이 있다고 하면, 공장장, 로스팅 담당자, 분쇄 담당자 등이 있고 각 담당자가 해야 하는 업무를 맡아서 진행합니다. 각각의 객체는 잘 정의된 인터페이스를 통해 서로 상호 작용하면서 초콜릿을 만들죠.

반면 함수형 프로그래밍의 경우 자신에게 주어진 업무만 수행하면 되는데요. 해야 할 일에 따라 인풋을 받아서 아웃풋을 만들어내기만 하면 되기 때문에 다른 사람이 어떤 일을 하는지 상호 작용할 필요가 전혀 없습니다.

## 함수형 프로그래밍이란?

1. **수학 함수**를 사용하고 **side effec**t를 피하는 것이 특징인 프로그래밍 패러다임
2. **side effec**t 없이 **pure function**만 사용하는 프로그래밍 스타일

### 함수형 프로그래밍의 특징

함수형 프로그래밍에서는 `순수함수`, `불변성`, `선언적 패턴` 이라는 3가지 요소가 굉장히 중요합니다.

1. input과 output이 있다 = `순수함수`
   - 함수의 동작에 의한 변수의 부수적인 값 변경을 원천 배제합니다. = `불변성`
   - 따라서 예측 가능한 코드를 작성 가능!
2. 함수도 값으로 활용합니다.

이 중, `불변성`에 대해 살펴보자면 함수형 프로그래밍은 형태로 어떤 input이 같다면 output은 항상 동일한 불변성을 가집니다. 따라서 함수의 동작에 의한 변수의 부수적인 값 변경을 원천 배제하기 때문에 예측 가능한 코드를 작성할 수 있는 것이죠

![Untitled 7](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/51350d11-55ed-4b6f-b8f5-ab3e203b254c)

이러한 함수형 프로그래밍은 불변성과 부작용이 최소화되기 때문에 프로세서의 발전 속도가 사용자의 필요에 뒤쳐지면서 멀티 코어에 의한 멀티 프로세싱이 중요해진 오늘날 더 주목 받고 있습니다

### 고차 함수 (HOF)

이런 특성 덕에 고차 함수가 가능한데요. 고차 함수란 함수를 값처럼 사용하는 것입니다.

```jsx
const operator = (oper) => (x, y) => console.log(x + oper + y);

let add = (operator(‘+’)) ;
let multiply = (operator(‘*’)) ;

add(2, 3))
calc(2, 3)
```

## 결론

클로저는 현재 상태를 기억하고 변경된 최신 상태를 유지하고, 정보 은닉을 할 때 유용합니다. 또한 함수형 프로그래밍의 핵심인 고차 함수를 활용할 때에도 사용됩니다.

클로저는 자신이 생성될 때의 환경을 기억해야 하므로 메모리 차원에서 손해를 볼 수 있지만 필요에 따라 유용하게 사용하면 좋습니다.

패러다임이 변화하고 있는 만큼, 클로저를 적극 활용하면 좋을 것 같습니다!

## reference

- 코어 자바스크립트
- 모던 자바스크립트 딥다이브
- 쏙쏙 들어오는 함수형 코딩
- [Closures — A moment of truth (Functional Programming and JavaScript)](https://medium.com/beginners-guide-to-mobile-web-development/closures-in-functional-programming-and-javascript-3ed730e08fc2)
- [4. 클로저와 고차 함수](https://velog.io/@developyoun/4.-%ED%81%B4%EB%A1%9C%EC%A0%80%EC%99%80-%EA%B3%A0%EC%B0%A8-%ED%95%A8%EC%88%98)
- [다시 쓰는 함수형 프로그래밍](https://velog.io/@teo/functional-programming)
- [클로저와 함수형 프로그래밍](https://www.youtube.com/watch?v=1wTkVQEMvl4)
- [[10분 테코톡] 꼬재의 클로저](https://www.youtube.com/watch?v=PJjPVfQO61o&t=26s)
- [함수형 프로그래밍이 뭔가요?](https://www.youtube.com/watch?v=jVG5jvOzu9Y&t=493s)
- [[FP 패턴 #4] closure (클로저) 소개,](https://www.youtube.com/watch?v=_zeRx0ZUl2U)
