---
title: 타입스크립트 백과사전: 함수와 타입
date: 2023-06-16
slug: 타입스크립트-백과사전-함수와-타입
tags: Typescript
category: 🏫백과사전
---

## 함수 타입 정의

```tsx
// 함수의 반환값 타입은 자동으로 추론되기 때문에 생략 가능
function func(a: number = 1, b: number): number {
  return a + b;
}
```

### 선택적 매개변수 설정

- 매개변수의 이름뒤에 물음표(?)를 붙여주면 선택적 매개변수가 되어 생략 가능
- 선택적 매개변수의 타입은 `undefined`와 유니온 타입으로 추론됨을 유의!
  - 원래 타입으로 사용하고 싶으면 타입 좁히기를 사용해야함
- 선택적 매개변수는 필수 매개변수 앞에 올 수 없다. 반드시 뒤에 배치

```tsx
function introduce(name = '이정환', tall?: number) {
  console.log(`name : ${name}`);
  console.log(`tall : ${tall}`);
}

introduce('이정환', 156);

introduce('이정환');
```

### rest 파라미터

```tsx
function getSum(...rest: number[]) {
  let sum = 0;
  rest.forEach((it) => (sum += it));
  return sum;
}
```

- rest 파라미터의 길이를 고정하고 싶다면 튜플 타입을 이용하면 된다.
  - `function getSum(...rest: [number, number, number])`

## \***\*함수 타입 표현식과 호출 시그니쳐\*\***

함수 타입을 별도로 정의하는 문법

### 함수 타입 표현식

- 여러개의 함수가 동일한 타입을 갖는 경우에 유용

```tsx
// 함수 타입 표현식
type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b;
```

### 호출 시그니쳐 (Call 시그니쳐)

```tsx
type Operation2 = {
  (a: number, b: number): number;
};

const add2: Operation2 = (a, b) => a + b;
const sub2: Operation2 = (a, b) => a - b;
const multiply2: Operation2 = (a, b) => a * b;
const divide2: Operation2 = (a, b) => a / b;
```

**하이브리드 타입**

호출 시그니쳐 아래에 프로퍼티를 추가 정의하는 것

```tsx
type Operation2 = {
  (a: number, b: number): number;
  name: string;
};

const add2: Operation2 = (a, b) => a + b;

add2(1, 2);
add.name;
```

## 함수 타입의 호환성

특정 함수 타입을 다른 함수 타입으로 괜찮은지 판단하는 것

- 두 함수의 반환값 타입이 호환되는가?
- 두 함수의 매개변수의 타입이 호환되는가?

### \***\*기준 1 : 반환값 타입이 호환되는가?\*\***

- A 반환값 타입이 B 반환값 타입의 슈퍼타입이라면 두 타입은 호환됨

```tsx
type A = () => number;
type B = () => 10;

let a: A = () => 10;
let b: B = () => 10;

a = b; // ✅ 업 캐스팅
b = a; // ❌ 다운 캐스팅
```

### 기준 2 : 매개변수의 타입이 호환되는가?

1. \***\*매개변수의 개수가 같을 때\*\***

   - 업캐스팅일 때 호환 X
   - 다운캐스팅일 때 호환 O

   ```tsx
   type C = (value: number) => void;
   type D = (value: 10) => void;

   let c: C = (value) => {};
   let d: D = (value) => {};

   c = d; // ❌ 업 캐스팅
   d = c; // ✅ 다운 캐스팅
   ```

   객체타입일 때 살펴보자

   ```tsx
   type Animal = {
     //super type
     name: string;
   };

   type Dog = {
     // sub type
     name: string;
     color: string;
   };

   let animalFunc = (animal: Animal) => {
     console.log(animal.name); // ✅
     console.log(animal.color); // ❌
   };

   let dogFunc = (dog: Dog) => {
     console.log(dog.name);
     console.log(dog.color);
   };

   animalFunc = dogFunc; // ❌ 업 캐스팅
   dogFunc = animalFunc; // ✅ 다운 캐스팅
   ```

2. **매개변수의 개수가 다를 때**

   - 할당하려고 하는 function의 매개변수의 개수가 적을 때 호환 가능
   - 매개변수의 타입 자체가 다르면 당연히 안됨

   ```tsx
   type Func1 = (a: number, b: number) => void;
   type Func2 = (a: number) => void;

   let func1: Func1 = (a, b) => {};
   let func2: Func2 = (a) => {};

   func1 = func2; // ✅
   func2 = func1; // ❌
   ```

## 함수 오버로딩

함수를 매개변수의 개수나 타입에 따라 여러가지 버전으로 정의하는 방법

- JS에는 X, TS에만 있는 문법

**오버로드 시그니쳐**

- 구현부 없이 선언부만 만들어둔 함수

```tsx
// 버전들 -> 오버로드 시그니쳐
function func(a: number): void;
function func(a: number, b: number, c: number): void;
```

**구현 시그니쳐**

- 실제로 함수가 어떻게 실행될 지 정의하는 부분
- 구현 시그니쳐의 매개변수 타입은 모든 오버로드 시그니쳐와 호환되도록 만들어야 한다.

```tsx
// 버전들 -> 오버로드 시그니쳐
function func(a: number): void;
function func(a: number, b: number, c: number): void;

// 실제 구현부 -> 구현 시그니쳐
function func(a: number, b?: number, c?: number) {
  if (typeof b === 'number' && typeof c === 'number') {
    console.log(a + b + c);
  } else {
    console.log(a * 20);
  }
}

func(1); // ✅ 버전 1 - 오버로드 시그니쳐
func(1, 2); // ❌
func(1, 2, 3); // ✅ 버전 3 - 오버로드 시그니쳐
```

## \***\*사용자 정의 타입가드 (Custom type guard)\*\***

- 참 또는 거짓을 반환하는 함수를 이용해 사용자 정의 타입 가드를 정의
- `매개변수(A) is 타입(B)` 형태로 사용
  - 함수가 true를 반환하면 조건문 내부에서 A가 B타입임 보장

```tsx
// type을 건들이지 못할때 사용
type Dog = {
  name: string;
  isBark: boolean;
};

type Cat = {
  name: string;
  isScratch: boolean;
};

type Animal = Dog | Cat;

// Dog 타입인지 확인하는 타입 가드
// 함수가 true를 반환하면 조건문 내부에서는 animal이 Dog 타입임을 보장
function isDog(animal: Animal): animal is Dog {
  return (animal as Dog).isBark !== undefined; // 타입 단
}

// Cat 타입인지 확인하는 타입가드
function isCat(animal: Animal): animal is Cat {
  return (animal as Cat).isScratch !== undefined;
}

function warning(animal: Animal) {
  if (isDog(animal)) {
    console.log(animal.isBark ? '짖습니다' : '안짖어요');
  } else {
    console.log(animal.isScratch ? '할큅니다' : '안할퀴어요');
  }
}
```
