---
title: 모던 자바스크립트 백과사전
date: 2023-04-14
slug: 모던-자바스크립트-백과사전
tags: JavaScript
category: 🏫백과사전
---

### [ECMAScript](ECMA-International 공식 ECMA-262문서)

ECMA-262 - 자바스크립트 표준 명세서. ecma 국제 표준 기구에서 ECMA-262 문서로 관리한다. 1997년부터(ES1) ~ 현재까지 발전되고 있고, ES6 버전 (ECMAScript 2015~)부터는 1년 단위로 버전이 업데이트되어서 ES6로 통일했다. ES6+ 라고도 한다.

- 모든 스크립트 언어가 지켜야하는 표준이다! 따라서 JavaScript ≠ ECMAScript. JavaScript는 ECMAScript를 준수해서 만든 결과물일 뿐! 따라서 ECMAScript에 정의된 내용 뿐만 아니라 부가적인 기능도 있다.
  - 예를 들어 DOM을 다루는 문법은 ECMAScript가 아닌 WebIDL에서 표준화된 기술이다.
- 브라우저 지원 현황
  - [한눈에 확인하는 호환성 테이블](http://kangax.github.io/compat-table/es6/)
  - [문법 검색으로 확인하는 호환성 테이블](https://caniuse.com/)

**Modern JavaScript**

현시점에 사용하기 적합한 범위 내에서 최신 버전의 표준을 준수하는 자바스크립트

## 추가된 Primitive 데이터 타입

### Symbol

코드 내에서 유일한 값을 가진 변수 이름을 만들 때 사용한다. **다른 어떤 값과 비교해도 true가 될 수 없는 고유한 변수**가 된다.

```
const symbolA = Symbol('this is Symbol');
const symbolB = Symbol('this is Symbol');

console.log(symbolA === symbolB); // false

```

### BigInt

아주 큰 정수를 표현하기 위해 등장한 데이터 타입이다.

자바스크립트에서 안전한 정수는 `-(2**53 - 1)`~`2**53 - 1` 사이의 수(약 9000조)이다. 이 숫자 범위를 초과하는 정숫값을 사용하려 하면 연산에 미세한 오류가 발생한다.

- avaScript가 [IEEE 754](https://ko.wikipedia.org/wiki/IEEE_754)에 기술된 [배정밀도 부동소수점 형식 숫자체계](https://ko.wikipedia.org/wiki/%EB%B6%80%EB%8F%99%EC%86%8C%EC%88%98%EC%A0%90)를 사용하기 때문이다.
- 정수 타입이기 때문에 소수 표현을 쓰게 될 경우 소수점 아랫 부분은 버려지고 정수 형태로 리턴된다.
- BigInt 타입끼리만 연산 가능하고, 서로 다른 타입끼리의 연산은 명시적으로 타입 반환을 해야햔다.
- 숫자 뒤에 `n`을 붙이거나 `BigInt()` 안에 숫자를 집어넣으면 된다.

## type of 연산자

### 1. null이 object라고?

- `typeof numm`을 하면 문자열 null이 리턴되는 것이 아니라 object가 리턴된다. 이유는 설계탓. ECMAScript에서 수정이 제안되었지만 버그의 우려로 반영이 X

### 2. typeof <함수>는 function을 리턴한다.

함수는 object이지만 특별히 function으로 리턴된다.

## Truthy & Falsy

- **truthy**인 값(참 같은 값) Boolean(불리언) 문맥에서 `true`로 평가되는 값입니다. falsy값으로 정의된 값이 아니면 모두 truthy값으로 평가됩니다.
  - 💡`[]`, `{}` 처럼 빈배열과 빈객체는 truthy이다.
- **falsy**인 값(거짓 같은 값)은 Boolean 문맥에서 `false`로 평가되는 값으로 다음과 같습니다.
  - `0` : Number zero.(0.0, 0x0 등등 또한 해당된다)
  - `0` : Number Negative zero.(-0.0, -0x0 등등 또한 해당된다)
  - `0n` : BigInt zero. (0x0n 도 포함) BigInt negative zero는 없음에 유의 (0n의 negative는 0n이다.)
  - **`""`, `''`, ````** : 빈 문자열 값
  - `null` , `undefined`, `NaN`

### AND와 OR 연산자

> 둘 중 하나를 선택하는 조건문 처럼 사용하기!

boolean값이 아닌 값일 때

- `&&` 은 왼쪽 피연산자가 truthy한 값이면 오른쪽 데이터를, 왼쪽 피연산자가 falsy한 값이면 왼쪽 데이터를 반환한다.
- `||`은 왼쪽 피연산자가 truthy한 값이면 왼쪽 데이터를, 왼쪽 피연산자가 falsy 한 값이면 오른쪽 데이터를 반환한다.

## null 병합 연산자 `??`

`??`를 사용해 null 혹은 undefined 값을 가려내는 연산자

`a ?? b` 에서 a(왼쪽 값)가 `null` or `undefined`라면 b(오른쪽 값)가 리턴되고 a가 `null` or `undefined`가 아니라면 a가 리턴된다.

- OR 연산자와의 차이점

  ```
  const title1 = false || 'codeit';
  const title2 = false ?? 'codeit';

  console.log(title1); // codeit
  console.log(title2); // false

  ```

  null 병합 연산자는 왼쪽값이 false인지 확인하는 것이 아니라 `null`이나 `undefined` 인지 확인하는 것!!!

## 함수를 표현하는 방법

### 1. **Function Declaration(함수 선언식)**

```
helloB(); // 하이
function helloB() {
    return "하이";
}; // var처럼 호이스팅이 일어남

```

### 2. **Function Expression(함수 표현식)**

함수 선언을 값처럼 사용하는 것. 일반적으로 변수에 할당함

```
const helloA = function() {
    return "하이";
}; //호이스팅이 일어나지 않음 let, var으로 선언한 함수에 할당해도 똑같음

```

- 함수에 이름이 붙어있는 **Named Function Expression**

  - `cons sayHi = function printHiInConsole() { ~~}`
  - 변수의 name property는 함수 이름을 문자열로 가진다.
  - 이 함수 이름은 **함수 내부에서 함수 자체를 가리킬 때 사용 (재귀함수)**할 수 있고 함수를 외부에서 함수로 호출할 때 사용은 XX. Error 발생!

    ```
    const sayHi = function printHiInConsole() {
      console.log('Hi');
    };

    printHiInConsole(); // ReferenceError

    ```

- 함수에 이름이 없는 **Anonymous Function Expression**

  - `const sayHi = function () { ~~ }`
  - 이때 변수의 name property는 변수 이름 그 자체를 문자열로 가짐
  - 외부 호출 가능
  - 함수 내부에서 함수 자신을 사용하려고 하면 함수표현식에서는 반드시 **기명 함수 표현식**을 사용하는 것이 좋다.

    - 함수를 복사하려고 다른 변수에 똑같이 담았다가, countdown 변수에 담긴 값이 변하게 되면 문제가 발생한다.

    ```
    let countdown = function(n) {
      ~~~
    };

    let myFunction = countdown;

    countdown = null;

    myFunction(5); // TypeError

    ```

💡 **함수 선언식과 함수 표현식의 차이점**

1. 호이스팅 - 함수 선언식은 호이스팅이 되지만 함수 표현식은 호이스팅이 X. 따라서 함수 표현식은 선언 이전에 접근을 할 수 없다.
2. 스코프
   - 함수 선언식은 함수 스코프를 가진다
   - 함수 표현식은 할당된 변수에 따라 스코프가 결정된다.

### 3. **Arrow Function(화살표 함수)**

- ES2015에서 새로 등장!
- 익명함수이기 때문에 일반적으로 어떤 이름을 가진 변수에 할당하거나 다른함수의 아규먼트로 선언할 때 활용된다.
- 함수 내부의 내용에 따라 더 축약(shorten)해서 나타낼 수도 있다

  ```
  // 1. 함수의 파라미터가 하나 뿐일 때
  const getTwice = (number) => {
    return number * 2;
  };

  // 파라미터를 감싸는 소괄호 생략 가능
  const getTwice = number => {
    return number * 2;
  };

  // 2. 함수 동작 부분이 return문만 있을 때
  const sum = (a, b) => {
    return a + b;
  };

  // return문과 중괄호 생략 가능
  const sum = (a, b) => a + b;

  ```

- `arguments` 객체가 없음!!!
- `this`값은 arrow function이 선언되기 직전의 this와 같은 값을 가르킨다.

### 즉시 실행 함수 (**IIFE)**

Immediately Invoked Function Expression)

```
(function () {
  console.log('Hi!');
})();

```

- 함수 선언 부분을 소괄호로 감싼 다음 바로 뒤에 함수를 실행하느 ㄴ소괄호를 한번 더 붙여주는 방식. 함수가 선언된 순간 바로 실행된다.
- 마찬가지로 함수에 이름을 지어주더라도 외부에서 재사용할 수 없지만 재귀적인 구조를 만들때는 이름이 필요 (즉 내부에서는 사용 가능)
- 일반적으로 초기화 기능이나 재사용이 필요없는 일회성 동작을 구성할 때 = 함수의 리턴값을 바로 변수에 할당하고 싶을 때 활용한다.

### 일급함수를 가진 자바스크립트

자바스크립트의 함수는 변수나 다른 데이터 구조 안에 할당될 수 있고 다른 함수의 파라미터로 전달될 수 있고, 다른 함수의 리턴값이 될 수도 있다.

함수를 리턴하는 함수를 고차함수라고 한다.

> 함수 선언 부분에서 소괄호 안에 작성되는 것이 파라미터, 함수를 호출하는 부분에서 파라미터로 전달하는 값에 해당하는 부분이 아규먼트이다. 구분할 것

### 파라미터에서 기본 할당문의 활용

- 기본 할당문은 가급적 오른쪽에 배치하기

```
function defaultTest(x, y = x + 3) {
	console.log(x, y);
}
defaultTest(2); // 2, 5
defaultTest(2,3); // 2, 3
defaultTest(); // undefined, undefined
defaultTest(undefined, 3) // undefined, 3
defaultTest(2, null) // 2, null
defaultTest(2, undefined) // 2, 5

```

### **arguments 객체**

자바스크립트 함수 안에는 `arguments`라는 객체가 있다. 함수를 호출할 때 전달한 아규먼트들을 배열의 형태로 모아둔 유사 배열 객체이다.

- length 메소드나 인덱싱은 가능. but 배열의 다른 메소드는 XX
- `arguments`라는 객체를 활용하고자 한다면 함수 안에서 사용할 파라미터나 변수, 함수의 이름을 `arguments`라고 짓는 것은 피해야한다.

### Rest Parameter `...others`

ES2015버전에서 나온 새로운 파라미터.

파라미터 앞에 마침표 세 개 `…`를 붙여주면, 불규칙적으로 여러 개로 전달되는 아규먼트들을 **배열**로 다룰 수 있다. 파라미터의 가장 마지막 (오른쪽)에 배치해야한다.

- 배열 메소드를 자유롭게 활용할 수 있는 것이 장점!!!

## what is This

객체의 메소드를 정의하기 위한 함수 안에선 **메소드를 호출한 객체**를 가르킨다. 호출한 객체가 없다면 웹 브라우저에서 this가 사용될 때는 전역 객체, Window 객체를 가진다.

## 자바스크립트 문법과 표현들

### 문장과 표현식

**문장 (statements)**

**어떤 동작이 일어나도록 작성된 최소한의 코드 덩어리**

- 조건문, 할당문, 선언문, 반복문 ….
- 표현식인 문장은 `;`이 한 문장, 표현식이 아닌 문장은 `{}`가 한 문장

**표현식 (expressions)**

결과적으로 하나의 **값**이 되는 모든 코드.

```
// 할당 연산자는 값을 할당하는 동작도 하지만, 할당한 값을 그대로 가지는 표현식이다.
title = 'JavaScript'; // JavaScript

// 함수 호출은 함수를 실행하는 동작도 하지만, 실행한 함수의 리턴 값을 가지는 표현식이다.
sayHi(); // sayHi 함수의 리턴 값

// console.log 메소드는 콘솔에 아규먼트를 출력하는 동작도 하지만, undefined 값을 가지는 표현식이다.
console.log('hi'); // undefined

```

**표현식인 문장** vs **표현식이 아닌 문장**

구분하고자 하는 문장을 변수에 할당하거나, 어떤 함수의 아규먼트로 전달해 구별 가능하다.

```
let x;
x = 3;

console.log(if (x < 5) { // error - 조건문은 값으로 평가 X 문장으로만 평가됨
  console.log('x는 5보다 작다');
} else {
  console.log('x는 5보다 크다');
});

const someloop = for (let i = 0; i < 5; i++) { //반복문도 마찬가지로 문장으로만 평가
  console.log(i);
};

```

- 즉, error가 나면 표현식이 아닌 문장인 것! 대표적으로 반복문, 조건문 등이 있다.

### 조건 연산자 (Conditional operator) = 삼항 연산자

`조건 ? 조건이 truthy 할 때 표현식 : 조건이 falsy 할 때 표현식;`

- 조건에는 표현식이 아닌 문장은 올수 없음

### **Spread 구문 `...`**

여러 개의 값을 묶어놓은 배열이나 객체와 같은 값은 바로 앞에 마침표 세 개를 붙여서 펼칠 수 있다.

- 배열이나 객체를 복사하거나 혹은 복사해서 새로운 요소들을 추가할 때 활용된다.
- 배열은 객체로 펼칠 수 있지만 객체는 배열로 펼칠 수 없다.
  - 객체를 spread할 때는 **반드시 객체를 표현하는 중괄호 안에서 활용해야 한다**
- spread 구문을 값이라고 오해하면 안된다. 매칭되는 거임. 따라서 하나의 값으로 평가되는 것이 아니라 목록으로 평가되는 것

  ```
  const number = [1]
  const numbers = ...number // error!!!!

  ```

### **모던한 프로퍼티 표기법**

ES2015 이후부터는 자바스크립트에서 변수나 함수룰 활용해서 프로퍼티를 만들 때

- 프로퍼티 네임과 변수나 함수 이름이 같다면 축약 가능
- 메소드에도 function 키워드 생략 가능

```
function getAge() {
  const date = new Date();
  return date.getFullYear() - this.birth + 1;
}

const user = {
  title,
  birth,
  job,
  sayHi,
	getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
	getAge,
};

```

- 대괄호를 활용하면 다양한 표현식으로 프로퍼티 네임 작성 가능!

  ```
  const propertyName = 'birth';
  const getJob = () => 'job';

  const codeit = {
    ['topic' + 'name']: 'Modern JavaScript',
    [propertyName]: 2017,
    [getJob()]: '프로그래밍 강사',
  };

  console.log(codeit);

  ```

### Optional Chaining `?.`

- 객체 내의 속성을 참조할 때, 해당 속성이 `null` 혹은 `undefined` 인 경우 에러를 반환하지 않고 `undefined` 를 반환하여 에러를 방지한다
- 누락될 가능성이 있는 값에 옵셔널 체이닝을 사용하면 TypeError가 발생하지 않고 참조값에 `undefined` 가 할당된다

**short-circuit 단축 평가**

> 옵셔닝 체이닝에서는 물음표 바로 앞에 있는 것이 평가 대상이며, 해당 평가 대상이 null 혹은 undefined 인 경우, 평가를 멈추는 것이다.

```
const data = {
	admin : {
      name : 'Yumin',
  	  id : 'qhahd78',
	},
}

const guestName = data.guests?.guest.name
// undefined

```

물음표 바로 앞에 있는 `guesets`가 평가 대상이 된다. 평가 결과 `undefined`이기 때문에 평가를 멈추고(뒤에 있는 guest, name 까지 평가하지 않음.) 바로 `undefined` 를 반환한다.

> 참고로 객체 프로퍼티 접근때 쓰는 .을 체이닝 이라고 하고 ?가 있어서 옵셔널 체이닝이다.

### 구조 분해 Destructuring

ES2015부터 생긴 문법

```
const [num1, num2] = [1, 2]
console.log(num1, num2) // 1, 2

[num2, num1] = [num1, num2]
console.log(num1, num2) // 2,1

```

- 객체의 destructuring은 프로퍼티 네임으로 구분해서 분해된다.
  - `프로퍼티네임 : 변수`로 새로운 이름으로 변수 선언 가능
    - 객체안의 프로퍼티 네임이 변수로 활용할 수 없는 string값일 경우 등에서 활용
  ```
  const macbookPro = {
  	price: 3690000,
    ---
  ```

---

title: '맥북 프로 16형',
trashValue1 : "ㅋㅋㅋ"
trashValue2 : "ㅎㅎㅎ"
};
const { title, price } = macbookPro;
console.log(title, price) // 맥북 프로 16형, 3690000

    const {---

---

title: '맥북 프로 16형',
console.log(product, rest) // '맥북 프로 16형', 3690000, ㅋㅋㅋ, ㅎㅎㅎ

    ```

- rest parameter도 사용 가능

  ```
  const numbers = [1, 2, undefined, 3, 4];
  const [a, b, c = 100, ...nums] = numbers;
  console.log(a,b,c,nums) // 1, 2, 100, undefiend, 3, 4

  ```

- Nested Object Destructuring 중첩 객체 구조 분해 라는 것도 있음

### try … catch … finally 문

```
try {
  // 실행할 코드
} catch (error) {
  // 에러 발생 시 동작할 코드
} finally {
  // 항상 실행할 코드
}

```

> error 객체는 기본적으로 에러 이름을 담고 있는 name 프로퍼티와 내용을 담고 있는message 프로퍼티를 가지고 있다.

## JS의 각종 메소드들

### forEach 메소드

첫 번째 아규먼트로 콜백 함수를 전달받는다. 이 콜백함수의 파라미터에는 (배열의 요소, index, 메소드를 호출한 array) 이 전달된다. return 값이 없다

- 2, 3번째 파라미터인 index와 array는 생략 가능하다

```
const numbers = [1, 2, 3];

numbers.forEach((element, index, array) => {
  console.log(element); // 순서대로 콘솔에 1, 2, 3이 한 줄씩 출력됨.
});

```

### map 메소드

배열의 요소를 하나씩 보면서 반복작업을 하는 메소드

첫번째 아규먼트로 전달하는 콜백 함수가 매번 return하는 값들을 모아서 새로운 배열을 만들어 return한다.

```
const numbers = [1, 2, 3];
const twiceNumbers = numbers.map((element, index, array) => {
  return element * 2;
});

console.log(twiceNumbers); // (3) [2, 4, 6]

```

✅ forEach 메소드나 map 메소드의 최대 반복 횟수는 메소드를 처음 호출할 때 당시의 요소의 개수이다.

- 따라서 반복 중에 요소의 개수가 늘어나도 (push해도) 처음 요소의 갯수 만큼만 반복된다.
- 하지만 반복 중에 요소의 개수가 줄어들면 (pop하면) 그 수만큼 반복횟수가 줄어든다.

### filter 메소드

배열의 요소를 하나씩 살펴보면서 콜백함수가 리턴하는 조건과 일치하는 요소만 모아서 새로운 **배열**을 리턴하는 메소드

- 값이 하나여도 길이가 1인 배열로 리턴됨

```
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = numbers.filter((num) => {
  return num % 2 === 0;
});

console.log(evenNumbers); // [2, 4]

```

### find 메소드

배열의 요소들을 반복하는 중에 콜백함수가 리턴하는 조건과 일치하는 가장 첫번째 요소를 리턴하고 반복을 종료하는 메소드

```
const fruits = ["apple", "banana", "orange", "pear"];

const foundFruit = fruits.find((fruit) => {
  return fruit === "orange";
});

console.log(foundFruit); // "orange"

```

### some 메소드

조건을 만족하는 요소가 1개 이상 있는지 불린 값으로 반환

```
const numbers = [1, 2, 3, 4, 5];

const hasEvenNumber = numbers.some((num) => {
  return num % 2 === 0;
});

console.log(hasEvenNumber); // true

```

### every 메소드

모든 요소가 조건을 만족하는지 = 조건을 만족하지 않는 요소가 1개 이상 있는지 불린 값으로 반환

→ some과 every 메소드 둘다 배열이 빈 배열이라면 callback이 실행 되지도 않고 바로 false 반환

```
const numbers = [1, 2, 3, 4, 5];

const allEvenNumbers = numbers.every((num) => {
  return num % 2 === 0;
});

console.log(allEvenNumbers); // false

```

### reduce 메소드

누적값을 계산할 때 활용하는 독특한 메소드이다.

reduce 메소드는 일반적으로 두개의 파라미터가 있다.

1. 첫번째 파라미터는 반복 동작할 콜백함수. 매번 실행되는 콜백함수의 리턴값이 다음 동작할 콜백함수의 첫 번째 파라미터로 전달된다. 결과적으로 마지막 콜백함수가 리턴하는 값이 최종 리턴값
2. 두번째 파라미터로 전달된 초기값이 첫번째로 실행될 콜백함수의 가장 첫번째 파라미터(accumlator)로 전달된다.

```
const numbers = [1, 2, 3, 4];

// reduce
const sumAll = numbers.reduce((accumulator, element, index, array) => {
  return accumulator + element;
}, 0);

console.log(sumAll); // 10

```

### sort 메서드

메소드를 실행하는 원본 배열의 요소들을 정렬하는 메소드. 아무런 아규먼트도 전달하지 않으면 [유니코드](https://ko.wikipedia.org/wiki/%EC%9C%A0%EB%8B%88%EC%BD%94%EB%93%9C)에 정의된 문자열 순서에 따라 정렬된다. 따라서 숫자를 정렬할 때는 상식적으로 이해하는 오름차순이나 내림차순 정렬이 XX. 콜백함수로 제대로 정렬 가능

- 오름차순 정렬 : `arr.sort((a,b) => a-b)`
- 내림차순 정렬 : `arr.sort((a,b) => b-a)`

**반환 값에 따른 sort() 함수 해석**

- 반환 값 < 0 : a가 b보다 앞에 있어야 한다.
- 반환 값 = 0 : a와 b의 순서를 바꾸지 않는다.
- 반환 값 > 0 : b가 a보다 앞에 있어야 한다.

### Map과 Set 객체

**Map 객체**

키와 값의 쌍으로 이루어진 collection 데이터 구조입니다. 객체와 유사하지만 다음과 같은 차이가 있다.

- 객체는 키로 사용할 수 있는 값이 문자열 또는 심벌값이고 Map 객체는 객체를 포함한 모든 값.
- 객체는 iterable(자료를 반복할 수 있는 객체)이 아니지만 Map 객체는 iterable.
- 요소 개수를 확인할 때 객체는 `Object.keys(obj).length`를 Map 객체는 `map.size`를 사용한다.
- 할당연산자를 통해 값을 추가하고 점 표기법이나 대괄호 표기법으로 접근하는 일반 객체와 다르게 Map은 메소드를 통해서 값을 추가하거나 접근할 수 있다.

Map 생성자 함수는 이터러블을 인수로 전달받아 Map 객체를 생성한다. 이때 인수로 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소로 구성되어야 한다.

Map 생성자 함수의 인수로 전달한 이터러블에 중복된 키를 갖는 요소가 존재하면 값이 덮어씌어진다. 따라서 Map 객체에는 중복된 키를 갖는 요소가 존재할 수 없다.

```
const map1 = new Map([['key1', 'value1'], ['key2', 'value2']]);
console.log(map1); // Map(2) {"key1" => "value1", "key2" => "value2"}
const map2 = new Map([1, 2]); // TypeError: Iterator value 1 is not an entry object

// 중복된 키가 있으면 덮어 써진다.
const map = new Map([['key1', 'value1'], ['key1', 'value2']]);
console.log(map); // Map(1) {"key1" => "value2"}

```

- `map.set(key, value)`: key를 이용해 value를 추가하는 메소드.
- `map.get(key)`: key에 해당하는 값을 얻는 메소드. key가 존재하지 않으면 undefined를 반환.
- `map.has(key)`: key가 존재하면 true, 존재하지 않으면 false를 반환하는 메소드.
- `map.delete(key)`: key에 해당하는 값을 삭제하는 메소드.
- `map.clear()`: Map 안의 모든 요소를 제거하는 메소드.
- `map.size`: 요소의 개수를 반환하는 프로퍼티. (메소드가 아닌 점 주의! 배열의 length 프로퍼티와 같은 역할)

**Set**

여러 개의 값을 순서대로 저장한다는 점에서 배열과 비슷하다. 하지만, 배열의 메소드는 활용할 수 없고 Map과 비슷하게 Set만의 메소드를 통해서 값을 다루는 특징이 있다.

- `set.add(value)`: 값을 추가하는 메소드. (메소드를 호출한 자리에는 추가된 값을 가진 Set 자신을 반환.)
- `set.has(value)`: Set 안에 값이 존재하면 `true`, 아니면 `false`를 반환하는 메소드.
- `set.delete(value)`: 값을 제거하는 메소드. (메소드를 호출한 자리에는 셋 내에 값이 있어서 제거에 성공하면 true, 아니면 false를 반환.)
- `set.clear()`: Set 안의 모든 요소를 제거하는 메소드.
- `set.size`: 요소의 개수를 반환하는 프로퍼티. (**메소드가 아닌 점** 주의! 배열의 length 프로퍼티와 같은 역할)

set에는 개별 값에 바로 접근하는 방법이 없다.

- 중복을 허용하지 않습니다. **최초에 추가된 순서를 유지**하면서 중복된 값을 추가하려고 하면 그 값은 무시한다.

## 자바스크립트 모듈

- ES6에서 나온 문법

공통된 기능이나 특별한 목적에 따라 각각의 파일(=모듈)로 분리하는 과정을 모듈화(Modularization)라고 한다. 코드를 좀 더 효율적으로 관리하고 비슷한 기능이 필요할 때 다른 프로그램에서 재사용 할 수 있다는 장점이 있다.

### 모듈 스코프

모듈 파일 안에서 선언한 변수는 외부에서 자유롭게 접근할 수 없도록 막아야한다. 즉, 모듈은 파일 안에서 **모듈 파일만의 독립적인 스코프를 가지고 있어야**한다.

- HTML파일에서 자바스크립트 파일을 불러올 때 모듈 스코프를 갖게 하려면 `type = "module"`로 지정해주어야한다.

  ```
  <script type="module" src="index.js"></script>
  <script type="module" src="printer.js"></script>

  ```

  만약 `type= "module"`로 모듈 스코프를 지정해주지 않으면 js파일들이 불려진 HTML 파일 안에서 모든 js 파일끼리 **스코프를 공유**한다. 마치 하나의 js 파일인 것처럼..

### 모듈 문법

`export`와 `import` 로 모듈을 내보내고 불러올 수 있다!

이를 사용하면 Html 파일에서는 자바스크립트 코드의 진입점 역할을 하는 파일 하나만 불러오면 된다.

N**amed export**

- 이름 바꿔서 import나 export 하기 : `as` 사용
- 한꺼번에 import 하기 : `` 사용 (와일드카드 문자라고 함)
  - → as 없이는 사용 X
  - [https://velog.io/@pjh1011409/JavaScriptimportexport](https://velog.io/@pjh1011409/JavaScriptimportexport)
- 한꺼번에 export 하기
  - `export { title as printerTitle, print, printArr };` 이런식으로 하면된다.

**Default export**

- `export default ~~` : 모듈 파일에서 기본적으로 export할 대상을 정할 수 있다.
- 일반적으로 모듈 파일에서 export 대상이 하나일 때 사용.
  - import 해오는 법 `import { default as printerJS } from './printer.js';`
  - `import printerJS from './printer.js';` 식으로 축약형 문법으로 import도 가능
- 만약 `export default { title, print }` 를 하게 되면 객체를 export 하는 것이다.
  - 즉, 원래는 `export default { title : title, print : print}` 인데 축약형 문법이 쓰인 것

> ✅ prototype, class, closure, Execution Context 찾아보기!
