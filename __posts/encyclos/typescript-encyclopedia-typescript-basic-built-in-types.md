---
title: 타입스크립트 백과사전 : 타입스크립트 기본(내장) 타입
date: 2023-06-14
slug: 타입스크립트-백과사전-타입스크립트-기본-타입
tags: Typescript
category: 🏫백과사전
---

> 한 입 크기로 잘라먹는 타입스크립트 강의를 듣고 정리하였습니다.🫡

타입스크립트에는 자바스크립트의 기본 타입 뿐만 아니라 더 다양한 타입이 있다.

타입 지정은 변수 뒤에 `:type`으로 하면 된다

```tsx
let hiEva: string = 'eva입니다';
```

## 원시 타입 (Primitive type)

하나의 값만 저장하는 타입

- `number`: 양수, 음수, 소수, 음의 소수, `Infinity`, `-Infinity`, `NaN`
- `string`: “”, ‘’, ``, `${}
- `boolean`: true, false
- `null`: null
- `undefind`: undefined
- **리터럴 타입**
  - `let numA : 10 = 10`: 10 말고는 다른 값 할당 불가능. 즉, 값으로도 타입을 지정할 수 있다.

```json
// tsconfig.json
{
  "compilerOptions": {
		...
    "strict": true, // strictNullChecks의 상위 옵션
		"strictNullChecks" : false, // 하위 옵션. null 검사를 업격하게 하지 않기 때문에 타입이 달라도 null을 할당할 수 있게 함. 기본은 true
  },
...
}
```

## 배열과 튜플

### 배열

두가지 방식이 있다

- 배열 요소의 타입을 지정하고 대괄호를 붙이는 방식
- `Array<boolean>`처럼 제네릭 문법으로 타입 지정하는 방식

```tsx
let numArr: number[] = [1, 2, 3];
let boolArr: Array<boolean> = [true, false, true];

// 배열에 들어가는 요소들의 타입이 다앙할 경우 union type을 사용하면 된다
let multiArr: (number | string)[] = [1, 'hello'];

// 다차원 배열의 타입 정의
let doubleArr: number[][] = [
  // 2차원이기때문에 대괄호 2개
  [1, 2, 3],
  [4, 5],
];
```

### 튜플

- JavaScript에는 없고 TypeScript에만 있다.
- **길이**와 **타입**이 고정된 배열
- 튜플은 배열을 사용할 때 인덱스의 위치에 따라 넣어야하는 값들이 정해져있고, 그 순서가 중요할 때 유용하다.

```tsx
let tup1: [number, number] = [1, 2];
let tup2: [number, string, boolean] = [1, '2', true];

// 어차피 js의 배열이기 때문에 배열 메소드를 사용 가능
tup1.push(1); // 길이 제한 에러가 나지 않는다. 따라서 주의해서 사용해야한다.

let users: [string, number][] = [
  ['이정환', 1],
  ['eva', 2],
];
```

## 객체

### 구조적 타입 시스템 (=Property Based Type System)

타입스크립트는 **구조를 기준으로 타입을 지정**한다. 이런 시스템을 구조적 타입 시스템 (=Property Based Type System)이라 한다.

vs **명목적 타입 시스템**

- C언어나 Java 등과 같이 대부분의 언어는 **이름을 기준으로 타입을 지정**하는 시스템

```tsx
let user1: object = {
  id: 1,
  name: 'eva',
};

user1.id; // 에러. 타입을 object로 할당하면 점표기법으로 접근 시 오류 발생
// 즉, 해당 객체의 프로퍼티와 값을 인식하지 못함
// 따라서 객체 리터럴을 사용해야함

// 구조적 타입 시스템
let user2: {
  id: number;
  name: string;
} = {
  id: 1,
  name: 'eva',
};

user2.id; // 접근 가능
```

### Optional Property와 readonly

```tsx
let user1: {
  readonly id: number; // readonly 프로퍼티
  name: string;
  id?: number; // age 프로퍼티는 있어도 되고 없어도 되지만, 있으면 number type이어야함.
} = {
  id: 1,
  name: 'eva',
  age: '100',
};

user1.id = '2'; // error
```

## 타입 별칭과 인덱스 시그니처

### 타입 별칭

- 블록 스코프를 가진다 (=let의 스코프와 동일)

```tsx
type User = {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
};
```

### 인덱스 시그니처

- key와 value의 규칙을 기준으로 객체의 type을 정의할 수 있는 문법

```tsx
type CountryCodes = {
  [key: string]: string;
  Korea: string; // stirng를 가지는 Korea property는 필수. 인덱스 시그니처와 value의 타입은 같아야함!!
};

let countryCodes: CountryCodes = {
  Korea: 'ko',
  UnitedState: 'us',
  UnitedKingdom: 'uk',
};
```

- 주의할 점
  - 인덱스 시그니처는 규칙을 위반만 하지 않으면 에러가 나지 않는다. 즉, 객체에 아무런 프로프티가 없을 경우에도 error가 나지 않는다.
  - 인덱스 시그니처의 추가적인 프로퍼티의 value의 type이 인덱스 시그니처의 value의 type과 일치하거나 호환해야한다.
  ```
  type CountryCodes = {
    [key: string]: string;
  	Korea: number // 에러
  };
  ```

## 열거형 타입 Enumerable Type

여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입. JS에는 없음

컴파일의 결과 js 파일에서도 사라지지 않고 **JS의 객체로 변환**된다.

- 숫자형 enum

  ```tsx
  //enum 타입
  enum Role {
    ADMIN,
    USER = 11,
    GUEAT,
  }

  const user1 = {
    name: 'user1 ',
    role: Role.ADMIN, // <- 0이 할당됨
  };
  console.log(user1); //{name : 'user1', role: 0}

  const user2 = {
    name: 'user2',
    role: Role.USER, // <- 11이 할당됨
  };
  console.log(user2); // {name : 'user2', role: 11}
  ```

  이때 enum에 숫자를 할당하지 않으면 자동으로 0부터 순서대로 할당된다.

  ```tsx
  //enum 타입
  enum Company {
    CODEIT, // <- 0
    PAGODA, // <- 1
    SHINHANBANK, // <- 2
  }

  const company1 = {
    name: 'codeit',
    Company: Company.CODEIT, // <- 0이 할당됨
  };
  console.log(company1); // {name : 'codeit', Company: 0}
  ```

- 문자형 enum

  ```tsx
  enum Language {
    korean = 'ko',
    english = 'en',
  }

  const user = {
    name: 'user',
    language: Language.korean,
  };
  console.log(user);
  ```

## Any 타입과 Unknown 타입

- 타입스크립트에서만 제공되는 타입

### Any

특정 변수의 타입을 우리가 확실히 모를 때 사용한다.

타입 상관 없이 어떠한 타입이던지 할당하고 싶으면 사용할 수 있다.

- `{}` 객체, `()⇒{}` 함수 등 그 어떤 타입이라도 가능!

모든 타입의 변수에 any 타입을 담을 수도 있다.

```tsx
let anyVar: any = 10;
anyVar = 'hello';
anyVar = () => {};

let num: number = 10;
num = anyVar; // 모든 타입의 변수에 any 타입을 담을 수 있다.
anyVar.toUpperCase(); // 어떠한 메서드든 쓸 수 있다
```

→ 즉, 타입 에러가 있어도 런타임에 에러가 발생한다!(= JS와 동일해짐. 즉 타입 검사를 안함)

### Unknown

마찬가지로 타입 상관 없이 어떠한 타입이던지 할당하고 싶으면 사용할 수 있다.

그러나 Any와 달리 타입이 특정되지 않기 때문에 **모든 메서드, 모든 연산자를 사용할 수 없다.**

```tsx
let unknownVar: unknownl;
unknownVar = 1;
unknownVar = () => {};

let num: number = 10;
num = unknownVar; // error
unknownVar.toUpperCase(); // error.
// 타입이 특정되지 않기 때문에 모든 메서드, 모든 연산자를 사용할 수 없다.

// 타입 정제해서 사용 가능
if (typeof unknownVar === 'number') {
  num = unknownVar; // 가능
}
```

## Void 타입과 Never 타입

### void

아무것도 없음을 의미하는 타입

```tsx
// 반환값이 없거나 undefined여야 한다.
constfunc2 = (): void => {
  console.log('하이');
};

let a: void; // void(아무값도 없음)이기 때문에 undefined 외 그 어떤 값도 할당할 수 없다.
a = 1; // error
a = undefined; // 가능
// ts 컴파일러 옵션에 "strictNullChecks": false로 되어있으면 null도 할당 가능
```

- undefinde, null과의 차이

  ```tsx
  const func1 = (): undefined => {
    console.log('하이');
    return; // return으로 undefined를 꼭 반환해줘야한다. (return; === return undefined)
  };

  const func2 = (): null => {
    console.log('하이');
    return null; // return으로 null을 꼭 반환해줘야한다.
  };
  ```

### Never

존재하지 않는, 불가능한 타입

```tsx
const func3 = (): never => {
  while (true) {} // 무한 루프이기 때문에 반환값 자체가 있는 것이 모순
};

const func4 = (): never => {
  throw new Error(); // 에러가 나기 때문에 반환값 자체가 있는 것이 모순
};

let anyVar: any;
let a: never;
a = undefined; // error. undefined나 null을 포함한 그 어떤 값도 할당될 수 X
// ts 컴파일러 옵션에 "strictNullChecks": false여도 null할당 XX
a = anyVar; // error. any type의 값도 넣을 수 없음
// 즉 할당 자체가 불가능함. 그 어떤 값도 저장할 수가 없음
```
