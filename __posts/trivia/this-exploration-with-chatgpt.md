---
title: This 탐구생활
date: 2023-04-25
slug: This-탐구생활
tags: JavaScript
category: 🙏잡학사전
---

스터디원들과 JavaScript this에 대해 이야기하다가 의문점이 풀리지 않아서 ChatCPT와 100분 토론을 했다.
생각보다 ~~멍청한 자식~~..이었지만 구글링의 수고를 덜어줘서 고마웠다. 잘못된 정보도 있어서 여러 블로그도 함께 참고했다.

![https://velog.velcdn.com/images/shinyejin0212/post/4a082547-9612-417a-9ee1-55b1feb2939c/image.png](https://velog.velcdn.com/images/shinyejin0212/post/4a082547-9612-417a-9ee1-55b1feb2939c/image.png)

## 1. This가 뭔데?

JavaScript에서 현재 실행되고 있는 함수의 컨텍스트를 참조 (= 함수 내에서 현재 객체를 참조)하는 특별한 키워드이다.
함수 내부에서 사용되며, 함수가 호출되는 방식에 따라 동적으로 결정된다.

- 즉, 함수를 호출하는 방법에 따라 다르게 결정된다!

> 일반적으로 this는 객체 지향 프로그래밍에서 객체를 참조할 때 사용되는 개념입니다. this는 현재 실행되고 있는 메서드가 속한 객체를 가리키는 참조 변수로 사용됩니다. 객체 내부에서 메서드가 호출될 때, 메서드 내부에서 this 키워드를 사용하면 해당 메서드를 호출한 객체를 참조할 수 있습니다.

1. 함수 호출: 함수명()
2. 메소드 호출: 객체명.메소드명()
3. 생성자 함수 호출: new 함수명()
4. apply/call/bind 메소드를 사용한 호출

각 호출 방법에 따라 this가 가리키는 객체가 결정된다.

예를 들어, 함수 호출 방식으로 함수를 호출하면 this는 <u>전역 객체</u>를 가리키지만, 메소드 호출 방식으로 함수를 호출하면 this는 해당 메소드를 <u>소유하는 객체</u>를 가리킨다.

또한, Arrow Function에서는 this가 상위 스코프의 this를 따르기 때문에 함수 호출 방식에 따라 this값이 결정되는 일반 함수와는 달리 this값이 고정된다.

> this를 사용할 때는 호출 방법에 따라서 this값이 어떻게 결정되는지 잘 파악해야 한다.

```
const obj = {
  name: "John",
  sayName: function() {
    console.log(this.name); // this
  },
  obj2: {
    name: "Sarah",
    sayName: function() {
      console.log(this.name); //this
    }
  }
};

const sayName = obj.sayName;
const sayName2 = obj.obj2.sayName;

sayName(); // undefined
sayName2(); // undefined
obj.sayName(); // John
obj.sayName(); // Sarah

```

- sayName()과 sayName2()를 호출할 때 undefined가 출력된다. 이는 sayName()과 sayName2()를 **호출하는 곳**이 obj 객체가 아니기 때문이다. 즉, this는 obj 객체를 참조하지 않으므로(전역 객체를 참조하기 때문에) undefined를 반환한다.
  - 즉, 현재 실행 환경에서의 this와는 별개로, obj의 프로퍼티로 할당된 함수를 참조하고있어 실행할 때 this는 전역객체가 되는 것!
- 이와 다르게 `obj.sayName()`과 같이 메서드가 속한 객체를 명시적으로 지정하여 호출하면 this가 obj를 가르키게 된다.
  - 즉 이러한 표기법은 객체 안에서 메서드를 호출한 것과 같다! 따라서 호출한 곳이 객체인 것!

## 2. Arrow Function에서 this가 어떻게 다른건데?

Arrow Function는 일반 함수와는 다르게 자신만의 this 컨텍스트를 가지지 않는다. 그 이유는 화살표 함수가 생성될 때 this를 lexical적으로 상위 스코프의 this 값으로 캡처하기 때문이다.

### 엥? lexical적으로 상위 스코프의 this값으로 캡처한다는게 뭔말;;?

화살표 함수가 자신만의 this 컨텍스트를 가지지 않고, 대신 부모 함수의 this 값을 가져오는 방식을 말한다. 이렇게 캡처된 this는 화살표 함수가 실행될 때 어디에서 호출되든 항상 같은 값을 가진다.

### 동문서답이잖아. lexical적이라는 게 뭔말이야?

lexical적이란 해당 변수 또는 함수가 선언된 위치에 따라 유효 범위가 결정되는 것을 의미한다. 즉, lexical this라는 말은 this값이 현재 함수의 lexical scope에 의해 결정된다는 말이다.

다시 정리하자면 Arrow Function의 this는 렉시컬 스코프를 따른다. 즉, 상위 스코프의 this를 자동으로 참조하는 것이다.

그러니까, Lexical scope가 함수가 선언된 위치에 따라 유효범위가 결정되는 것처럼 Lexical this는 함수가 선언된 위치에 따라 this가 결정된다. 따라서 Arrow Function이 선언된 상위 스코프에서의 this 값을 유지한다.

> 잊지 말아야할 점은 일반함수에서 this는 함수를 호출한 객체에 따라 결정된다.

```jsx
const person = {
  name: "John",
  sayHi: function () {
    console.log(`Hi, my name is ${this.name}`);
  },
  sayHiArrow: () => {
    console.log(`Hi, my name is ${this.name}`);
  },
};

person.sayHi(); // Output: Hi, my name is John
person.sayHiArrow(); // Output: Hi, my name is undefined
```

- sayHi()를 호출할 때 this는 person 객체를 가리키게 된다.(일반함수)
- sayHiArrow()는 Arrow Function이기 때문에 자신만의 this를 가지지 않아 undefined가 출력된다.
  - 즉, Arrow Function이 선언된 시점에서 `this`를 참조하고 있기 때문에, `person` 객체가 아닌 (화살표함수가 선언되어있는) 객체, 즉 상위스코프의 this를 상속받고 이것이 전역객체인 것이다.

### 아오 헷갈려. 그러니까 lexical scope는 선언된 위치에 따라 결정되는 스코프인 것이고, 상위 스코프 안에서 선언되는 거니까 상위 스코프 > 렉시컬 스코프인 것은 맞지?

맞다. 상위 스코프는 렉시컬 스코프보다 상위 개념이다. 렉시컬 스코프는 함수가 선언된 위치에 따라 정의되는 스코프이고, 상위 스코프는 현재 스코프를 둘러싸는 스코프 중 가장 가까운 스코프를 말한다. 함수의 렉시컬 스코프에는 해당 함수를 감싸는 상위 스코프가 포함되어 있다.

### 근데 이건 이유가 아니라 결과잖아?

맞다. 정확히는 "결과"이다. 좀 더 정확하게 말하면, 화살표 함수의 내부 동작 메커니즘이 일반 함수와 다르기 때문에, 화살표 함수는 this를 바인딩하지 않는다. 이러한 결과가 발생하는 이유는 내부 메커니즘이 복잡하고 다양하기 때문인데, 이는 앞서 제가 설명해드린 대로, 화살표 함수가 Lexical this를 사용하기 때문이다.

## 이것을 끝으로.. 정리하자면

1. 자바스크립트에서 this는 함수가 호출될 때, 호출한 객체에 따라 동적으로 결정된다.
2. 그러나 화살표 함수에서는 this가 선언될 때 결정되며, 선언된 위치의 Lexical Scope에서 값을 참조한다.
3. 따라서, 화살표 함수 내에서 this를 사용할 경우, 전역 객체(Global Object)를 참조할 가능성이 있으므로 주의해야 한다.
4. 또한, 일반 함수에서의 this는 함수를 호출한 객체에 따라 동적으로 결정되는 반면, 메서드 호출 시 메서드가 속한 객체를 명시적으로 지정하여 호출하면 this가 해당 객체를 가리키게 된다.
5. 렉시컬 스코프는 함수를 어디서 호출하느냐가 아닌 함수를 어디에 선언하느냐에 따라 결정되는 스코프이며, 상위 스코프와 관계가 있다.

## 마지막으로..

![https://velog.velcdn.com/images/shinyejin0212/post/6b06881d-9dd4-4d24-b784-84dad3ce6774/image.png](https://velog.velcdn.com/images/shinyejin0212/post/6b06881d-9dd4-4d24-b784-84dad3ce6774/image.png)

미안해 ChatGPT
