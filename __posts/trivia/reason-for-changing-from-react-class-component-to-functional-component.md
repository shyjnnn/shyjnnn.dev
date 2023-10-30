---
title: React 클래스형 컴포넌트에서 함수형 컴포넌트로 바뀐 이유?
date: 2023-05-10
slug: React-클래스형-컴포넌트에서-함수형-컴포넌트로-바뀐-이유
tags: React.js
category: 🙏잡학사전
---

현재 [리액트 공식 문서](https://react.dev/reference/react/Component)에서는 함수형 컴포넌트와 Hook을 사용하는 것을 권장하고 있습니다. 클래스 컴포넌트는 라이프 사이클 기능과 state 관리 기능이 코드에 구현되며, 함수형 컴포넌트는 hook 을 통해 라이프 사이클 기능과 state 관리 기능 코드를 짤 수 있는데요

## 클래스형 컴포넌트와 함수형 컴포넌트의 차이점

- 클래스형 컴포넌트는 코드 안에 라이프사이클 기능과 state 기능이 구현이 가능합니다.
- 함수형 컴포넌트는 **hook을 사용**하여 라이프사이클 기능과 state 기능을 구현할 수 있습니다.

클래스형 컴포넌트를 사용할 경우에는 `render` 함수가 필수적으로 사용되어야 합니다.

### 그래서 왜 함수형 컴포넌트?

- 클래스형 컴포넌트보다 **선언하기가 편합니다**. 즉, 작성 코드가 더 적습니다.
  - 클래스 형은 Class 선언, render()함수 선언, Component 상속을 해야하고, 상태관리를 위해 constructor, 생성자 메소드 전언 등…이 필요합니다
- 클래스형 컴포넌트보다 **메모리 자원을 덜 사용**합니다.
- 클래스형 컴포넌트보다 **빌드 후 파일 크기가 더 작습니다**.
- 함수형 컴포넌트는 `render()`함수가 필요 없어서 컴포넌트 마운트 속도가 더 빠르고, 가독성이 좋은 장점이 있다.

> 와닿지 않아서 예시로 보자

### class 형 컴포넌트의 재앙

```
class ProfilePage extends React.Component {
	showMessage = () => {
		alert(`${this.props.user} 를 팔로우 했습니다`);
	}

	handleClick = () => {
		// const {user} = this.props; 이렇게 미리 할당해둬서 해결은 가능
    // setTimeout(() => this.showMessage(user), 3000);
		setTimeout(this.showMessage, 5000); // this.showMessage 대신 user 넣으면 해결 가능
	}

	render() {
		return <button onClick={this.handleClick}>Follow</button>;
	}
}

```

**A 유저를 팔로우 한 후** 빛의 속도로 3초만에 B 유저 프로필로 이동하면, "B를 팔로우했습니다" 라는 alert 메세지가 나타납니다. 그러나 나는 A 유저를 팔로우 했습니다!🤷

- 팔로우 한 당시의 유저가 아니라 `showMessage()`가 호출되었을 때의 유저를 바라보고 있기 때문에 생긴 버그
- this는 mutable(변경가능)합니다. 그리고 이러한 현상 때문에 예기치 못한 결과(결국 production에서는 버그임)가 발생할 수 있습니다.
  - 그것이 `this`가 클래스에서 존재하는 목적이죠. 리액트가 시간이 지남에 따라 `this`
  - 를 변경하기 때문에 `render`나 라이프사이클 메서드를 호출할 때 업데이트된 값들을 읽어 올 수 있는 것입니다.

> 아래에 class 컴포넌트 문제를 해결하는 다양한 방법이 친절하게 나와있어요! 클로저 사용 등. 이 블로그에서 가져온 예제이기 때문에 읽어보는 것을 추천~

[함수형 컴포넌트와 클래스, 어떤 차이가 존재할까?](https://overreacted.io/ko/how-are-function-components-different-from-classes/)

### 함수형 컴포넌트로 바꾸면?

```
function ProfilePage(props) {
	showMessage = () => {
		alert(`${props.user}를 팔로우 했습니다`);
	}

	handleClick = () => {
		setTimeout(showMessage, 5000);
	}
	return (
		<button onClick={handleClick}>Follow</button>
	)
}

```

페이지를 B로 이동해도 팔로우를 눌렀을 시점의 유저 이름이 정상적으로 출력됩니다.

<aside>
💡 확인해보고 싶다면 **[라이브 데모 참고!](https://codesandbox.io/s/pjqnl16lm7)**

</aside>

> 즉, this는 mutable하지만, props는 immutable합니다. + state도 불변값

### 즉, 함수형 컴포넌트의 장점은?

1. 리랜더링 될 때의 값을 유지합니다. 즉, immutable 하다는 것. (위의 예제참고)
2. 함수형 컴포넌트는 props에 따른 랜더링 결과를 보장받습니다.

- immutable한 props를 받기 때문에 결국엔 랜더링 결과가 보장된다는 것. 함수형 프로그래밍의 특징과 일맥상통함이 있습니다

1. 매개변수로 받는 props의 destructuring을 활용해 가독성을 보장받을 수 있습니다.
2. 함수의 모든 장점을 이용할 수 있습니다. (결국 함수니까)
3. 함수형 컴포넌트를 사용했을 때 코드가 간결해지고 가독성도 좋습니다!

### 클래스형과 함수형 컴포넌트의 배치 업데이트?

리액트 공식문서에 따르면 “리액트는 성능을 위해 setState()를 단일 업데이트(batch update)로 한꺼번에 처리”할 수있습니다.

batch update기능의 주된 아이디어는 리액트의 이벤트 핸들러와 생명주기 메서드를 사용해 얼마나 많은 setState를 호출하든 간에 단 하나의 업데이트로 일괄처리하여 re-render가 한번만 발생하도록 해, 불필요한 렌더링을 방지합니다.

함수형과 클래스형 컴포넌트 모두에서 이벤트 핸들러 내부의 업데이트에 batch update가 적용됩니다.

### reference

[https://overreacted.io/ko/how-are-function-components-different-from-classes/](https://overreacted.io/ko/how-are-function-components-different-from-classes/)
