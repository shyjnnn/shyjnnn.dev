---
title: 자바스크립트 객체 지향 기본기 백과사전
date: 2023-04-14
slug: 자바스크립트-객체-지향-기본기-백과사전
tags: JavaScript
category: 🏫백과사전
---

## 객체 지향 프로그래밍

프로퍼티와 메소드로 이루어진 각 객체들의 상호 작용을 중심으로 코드를 작성하는 것

## 객체 만들기

### Object-Literal

```
const user = {
    email,
    birthdate,
    buy(item) {
      console.log(`${this.email} buys ${item.name}`);
    },

```

### Factory function

새로운 객체를 리턴하는 함수이다. new 키워드 없이 객체를 반환한다. 객체를 찍어내는 형태이기 때문에 붙은 이름이라고 한다.

```
function person(name, age, gender) {
  const person = {};
  person.name = name;
  person.age = age;
  person.gender = gender;
  person.hi = function () {console.log(`Hi, My name is ${this.name}`)}
  return person;
}

const person1 = person('emily', 18, 'W');
const person2 = person('tom', 22, 'M');

console.log(person1); // {name: 'emily', age: 18, gender: 'W'}
console.log(person2); // {name: 'tom', age: 22, gender: 'M'}

```

### Constructor function

new 키워드를 사용하여 객체를 생성하는 함수로 생성자 함수라고 한다. 생성자 함수는 유사한 객체를 여러 개 생성해야 할 때 활용하며 함수명은 대문자로 시작한다.

```
function Person(name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
	this.hi = function () {console.log(`Hi, My name is ${this.name}`)}
}

const person3 = new Person('emily', 18, 'W');
const person4 = new Person('tom', 22, 'M');

console.log(person3); // {name: 'emily', age: 18, gender: 'W'}
console.log(person4); // {name: 'tom', age: 22, gender: 'M'}

```

### Factory Function vs Contructor Function

각 객체의 `__proto__`를 보면 차이점이 있다.

Factory Function을 사용해 생성된 객체의 `__proto__`는 Object.prototype을 가리키는 반면, Contructor Function을 사용해 생성된 객체의 `__proto__`는 constructor function의 prototype을 가리킨다.

- this의 차이
  - Factory 함수 내의 this는 window를 가리키고, Contructor 함수 내의 this는 생성자 함수의 protopyte을 `__proto__`로 받는다.

<aside>
✅ Constructor Function을 사용할 경우, Person 인스턴스가 생성될 때마다 그 객체의 hi 프로퍼티에 새로운 함수가 정의되고 할당된다. 만약 100개의 Person 객체를 생성한다치면, 모두가 같은 일을 하는 자신만의 hi 메소드를 가지게되는 것이다.

- 이를 더 효율적인 방법으로 hi 속성을 단 한번만 정의하는 것이 있다. 그리고 각 Person 객체는 같은 함수를 참조하면 되는 것이다. 이를 위해서 함수의 `prototype`을 쓸 수 있다.
</aside>

```
Person.prototype.hi = function () {
    console.log('hi my name is' + this.name)
}

```

# Class

ES6부터 도입된 개념이다.

객체의 틀을 정의하고, 마찬가지로 그 앞에 new를 붙여서 객체를 생성하는 방법이다. class를 사용할 때는 보통 프로퍼티의 경우 constructor 안에 정의하고, 메소드의 경우 constructor 밖에 정의한다.

```
class User {
  constructor(email, birthdate) {
    this.email = email;
    this.birthdate = birthdate;
  }

  buy(item) {
    console.log(`${this.email} buys ${item.name}`);
  }
}

const user1 = new User('chris123@google.com', '1992-03-21');
const user2 = new User('jerry99@google.com', '1995-07-19');
const user3 = new User('alice@google.com', '1993-12-24');

```

- 외관만 다른 객체지향프로그래밍의 Class 처럼 작동하는 것 처럼 보여도 기존 자바스크립트 방식으로 구동된다.
  - 다른 언어에서의 class는 object를 만들내는 설계도이지 class 자체로 object가 아니라고 한다. 하지만 js에서는 class도 obejct!
  - 따라서 사실 어차피 기존에 쓰던 Constructor Function 방식과 내부적으로는 똑같이 동작한다고 한다. 즉, prototypal inheritance를 통해 구현되는 것이다.
- 따라서 ES6의 class는 기존 OOP 언어에 친숙한 개발자들을 위한 일종의 Syntactic Sugar인 셈이라고 한다 ㅎㅎ

## 클래스 기반 vs 프로토타입 기반

객체 지향 언어에는 클래스 기반의 객체지향언어(ex. JAVA), 프로토타입 기반의 객체지향언어(ex. JavaScript)가 있습니다.

### 프로토타입이란

자바스크립트는 프로토타입을 기반으로 상속을 구현한다. 이는 클래스 기반 객체지향 프로그래밍 언어보다 더 효율적이며 강력한 객체지향 프로그래밍을 가능하게 한다. 각각의 객체는 [[Prototype]]이라는 private 속성을 가지는데 자신의 **프로토타입**이 되는 다른 객체를 가리킨다. 프로토타입에 모든 인스턴스가 공통적으로 사용하는 프로퍼티나 메서드를 구현해 두면 모든 인스턴스는 **상속을 통해 부모 객체인 프로토타입의 자산을 공유**하여 사용할 수 있다.

- 배열 arr과 Array, 프로토타입의 관계 모식도

![https://velog.velcdn.com/images/shinyejin0212/post/8227b5a9-b499-42a2-b7f0-f6957a836512/image.png](https://velog.velcdn.com/images/shinyejin0212/post/8227b5a9-b499-42a2-b7f0-f6957a836512/image.png)

### 프로토타입 체인

자바스크립트가 특정 프로퍼티에 접근할 때 **해당 객체에 프로퍼티가 없으면 Prototype 내부 참조를 따라 상위 프로토타입의 프로퍼티를 순차적으로 검색**하는 현상이다.

즉 인스턴스 객체의 key에 접근할 때, 해당 객체에게 key가 없다면 그 다음 상위 프로토타입(원형) 속성에서 key가 있는지 확인하고, 없다면 그것을 찾기위해 더 상위 프로토타입(부모)에서 찾는다.

<aside>
💡 Array의 원형은 Object.

</aside>

- `hasOwnProperty` 메소드를 사용해서 어디서 온 건지 알 수 있다!
  객체가 특정 프로퍼티를 가지고 있는지를 나타내는 불리언 값을 반환
  객체가 특정 프로퍼티를 자기만의 직접적인 프로퍼티로서 소유하고 있는지를 판단하는데 사용된다. `in` 연산과는 다르게, 이 메소드는 객체의 프로토타입 체인을 확인하지는 않는다.
  - overriding을 하면 자신만의 프로퍼티가 되기때문에 true

### 그렇다면 프로토타입 체인의 종착역은? null

상속 관점에서 자바스크립트의 유일한 생성자는 객체 뿐이다. 각각의 객체의 [[Prototype]] 속성은 자신의 **프로토타입**이 되는 다른 객체를 가리킵니다. 그 객체의 프로토타입 또한 프로토타입을 가지고 있고 이것이 반복되다가, 결국 **`null`**을 프로토타입으로 가지는 오브젝트에서 끝난다.

- null은 더 이상의 프로토타입이 없다고 정의되며, **프로토타입 체인**의 종점 역할을 하는 것이다.
- 참고

  ```
  Array.prototype.constructor === Array; // true
  Array.prototype === [1,2,3].__proto__; // true
  Array.prototype.name === [1,2,3].name; // true

  ```

## 객체 지향 프로그래밍 핵심 개념 4가지

### 추상화

어떤 구체적인 존재를 원하는 방향으로 간략화해서 나타내는 것.

### 캡슐화

객체의 특정 프로퍼티에 대한 접근을 미리 정해진 메소드들을 통해서만 가능하도록 해 사용자가 직접 접근하지 못하도록 막는 것.

- `__email` 처럼 프로퍼티명에 `__`를 붙여서 직접 접근을 막기
- setter 메소드를 사용하기 - JS에서는 메소드 앞에 `set`을 붙여준다.
- getter 메소드를 사용하기 - JS에서는 메소드 앞에 `get`을 붙여준다.

### Clouser

자바스크립트에서 어떤 함수와 그 함수가 참조할 수 있는 값들로 이루어진 환경을 하나로 묶은 것이다.

즉, 함수가 정의된 당시에 참조할 수 있었던 변수들을 계속 참조할 수 있는 상태의 함수를 클로저라고 한다.

자바스크립트의 함후는 태어나면서 본인의 내부 슬롯에 상위 스코프의 참조를 저장하기 때문에 가능한 것이다.

한 중첩함수 중에서 상위 스코프의 식별자를 참조(=자유변수)하고 있고 본인의 외부 함수 보다 더 오래 살아있다면 클로저이다.

> 클로저는 하나의 state를 의도치 않게 변경되지 않도록 state를 안전하게 은닉하고 또는 특정 함수에게만 state 변경을 허용하기 위해 사용합니다.

### 완벽한 캡슐화는 클로저를 사용해서 할 수 있다

[https://jijong.github.io/2017-03-24/closure/](https://jijong.github.io/2017-03-24/closure/)

- 메소드도 캡슐화할 수 있다.

  ```
  function createUser(email, birthdate) {
    const _email = email;
    let _point = 0;

    function increasePoint() { // 캡슐화 되어있다
      _point += 1;
    }

    const user = {
      birthdate,

      get email() {
        return _email;
      },

      get point() {
        return _point;
      },

      buy(item) {
        console.log(`${this.email} buys ${item.name}`);
        increasePoint();
      },
    };

    return user;
  }

  const item = {
    name: '스웨터',
    price: 30000,
  };

  const user1 = createUser('chris123@google.com', '19920321');
  user1.buy(item);
  user1.buy(item);
  user1.buy(item);
  console.log(user1.point);
  user1.increasePoint(); // error

  ```

### 상속

`class PremiumUser exetends User` 처럼 User class를 PremiumUser class에 상속하는 것

그리고 자식 class에서 `sper(파라미터들..)`를 호출해서 부모 class의 constructor를 불러와야함

### 다형성

오바리이딩(overriding!) 생각하면 된다.

> 하나의 변수가 여러 종류의 객체를 가리킬 수 있는 성질
>
> 타입의 참조변수를 통해 여러 타입의 객체를 참조할 수 있도록 만든 것. 상위 클래스 타입의 참조변수로 하위 클래스의 객체를 참조할 수 있도록 하는 것
>
> 한 객체가 여러 맥락에서 다른 모습으로 취급받을 수 있는 것

등으로 설명 가능..ㅎㅎ

자바스크립트에서는 이것을 프로토타입간의 상속을 가능케 하여 구현하고 있다

- `super.메소드(파라미터)`하면 부모 class에 있는 매소드를 그대로 호출 가능

`instance of` : 현재 변수가 가리키는 객체가 정확히 어느 클래스로 만든 객체인지 알 수 있다. boolean값 반환

- `user instaceof User` 형식
- 자식 클래스로 만든 객체는 부모 클래스로 만든 객체로도 인정 되어 true

### static 프로퍼티, static 메소드

클래스에 직접적으로 딸려있는 프로퍼티와 메서드

객체를 생성하지 않아도 사용할 수 있는 프로퍼티와 메서드이다. 즉, 클래스 자체에 소속되는 프로퍼티와 메소드들로, 객체에 직접 소속되는 것들이 아니라는 사실!!!(중요)

# references

[함수 생성자와 클래스의 차이](https://uiyoji-journal.tistory.com/101)[Class vs Function Construtor](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=jdub7138&logNo=221028381283)

---

**프로토타입 관련 references**[javascript prototype 이해하기](https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67)[프로토타입 체인](https://medium.com/@njel7799/prototype-chain-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85-%EC%B2%B4%EC%9D%B8-81911be02b44)[프로토타입과 프로토타입체인](https://hanamon.kr/javascript-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85%EA%B3%BC-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85%EC%B2%B4%EC%9D%B8/)
