---
title: '[나자신] cloneElement을 사용해서 공통 컴포넌트 input을 만들어보자'
date: 2023-08-09
slug: create-a-common-component-input-using-cloneElement
tags: React.js, 👻나자신
summary: 나자신 프로젝트 공통컴포넌트 제작기. compound pattern과 cloneElement 사용
category: '🌱회고'
---

## TL;DR

1. **컴포넌트 분리와 관심사 분리를 했다.**

   `Input`와 `TextField` 컴포넌트는 각각의 역할과 책임을 가지도록 분리했다.

   `Input`은 Wrapping 역할, 필요한 스타일링을 적용하며, `TextField`는 실제 `input` 요소를 감싸고 필요한 이벤트 핸들링을 수행한다. 이런 분리는 코드의 가독성을 높이고 컴포넌트 간의 관심사를 분리하여 한 컴포넌트가 다른 컴포넌트의 내부 동작에 의존하지 않도록 한다.

2. **속성 기반 스타일링을 통한 유연성 `variant`**

   `variant` 속성을 통해 스타일을 동적으로 적용했다. 추후, 새로운 `variant` 값을 추가하거나 수정함으로써 다양한 스타일링을 적용할 수 있을 것으로 예상된다.

3. **`cloneElement`를 사용해 프로퍼티 전달을 용이하게 했다.**

   `Input` 컴포넌트가 자식 컴포넌트에 추가적인 프로퍼티를 전달하거나 변경사항을 적용하기 위해서 `cloneElement`를 사용했다. `TextField`의 경우, 스타일, 기능 추가, 에러 및 상태관리, 이벤트 핸들링 등을 위한 추가 프로퍼티가 필요할 가능성이 크다. 따라서 `cloneElement`를 통해 기존 엘리먼트의 props를 수정하지 않고도 전달할 수 있도록 했다.

## Motivation

프로젝트 전반에서 common하게 사용될 수 있는 `input`을 만들어야했다. `input`의 스타일은 underline만 존재했다. 디자인 시스템에 따라 `input`의 크기는 세 종류이지만, 확장 가능성도 고려해야한다.

가장 크게 고려한 것은 확장가능성이다. 스타일에 대한 확장도 고려해야하지만, `input`에 여러가지가 붙었을 경우(`label`, `bottom-text`, `suffix` 등) 붙이기 쉬워야했다.

## Result

`Input` 컴포넌트

```jsx
interface InputProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement
  variant: string
}

export function Input({ children, variant }: InputProps) {
  const child = Children.only(children)

  return (
    <div className={cx('inputWrapper')}>
      {cloneElement(child, {
        className: cx('inputTextField', [variant]),
        ...child.props,
        variant,
      })}
    </div>
  )
}
```

만약 단순히 `input`으로 만들었다면, input을 둘러싼 `label`과 `bottom-text`가 필요한 경우 붙이기가 까다롭다. 따라서 wrap하는 컴포넌트를 만들고, 그 내부에 `input`을 넣어 추후, wrapper에 `label`과 `bottom-text`만 `children`으로 넣어주면 되도록 설계했다.

`TextField` 컴포넌트

```jsx
Input.TextField = forwardRef(function TextField(
  { onChange, ...props }: TextFeildProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      className={cx('inputTextField')}
      ref={ref}
      onChange={onChange}
      {...props}
    />
  )
})

```

`TextField`는 `forwardRef`를 사용하여 `input` 요소를 반환하는 함수 컴포넌트이다. `ref`와 `onChange` 속성을 포함한 나머지 속성은 `Input` 컴포넌트에서 받는다.

결과적으로 `Input` 컴포넌트에 `TextField`를 만들어서 **compound Pattern**, 즉, `children`**으**로 넣었다. 결과적으로 추후 제목과 경고문을 넣어야해서 `label`과 `bottom-text`가 필요하다면 동일하게 `children`으로 넣으면 되기 때문에 확장성이 좋아진다.

- 확장했을 경우

  ```jsx
  export function Input({
    label,
    children,
    variant,
    bottomText,
    ...props
  }: InputProps) {
    const child = Children.only(children)

    return (
      <div className={cx('inputWrapper')} {...props}>
        <label>{label}</label>
        {cloneElement(child, {
          className: cx('inputTextField', [variant]),
          ...child.props,
          variant,
        })}
        <p>{bottomText}</p>
      </div>
    )
  }
  ```

이때, `TextField`의 경우, `Input`에 종속적인 새로운 프로퍼티인 `variant`를 받야아한다. 하지만 하나씩 추가될 때마다 기존 엘리먼트의 `props`를 변경해야하면 매우 번거롭다. 따라서 `cloneElement`를 사용해서 기존 프로퍼티는 유지하되 추가가 수월하도록 했다.

## React의 cloneElement

기존의 React 엘리먼트를 복제하면서 새로운 프로퍼티나 속성을 추가하거나 변경하는 데 사용된다.

- 형식
  ```jsx
  React.cloneElement(element, [props], [...children]);
  ```
  - `element`: 복제할 React 엘리먼트
  - `props` \*\*\*\*(option): 새로운 프로퍼티를 추가하거나 기존의 프로퍼티를 수정할 객체
  - `children` (option): 자식 엘리먼트를 재정의한다
- 사용 예시

  ```jsx
  import React from 'react';

  const originalElement = <button>Hello</button>;

  const clonedElement = React.cloneElement(
    originalElement,
    {
      style: { backgroundColor: 'blue', color: 'white' },
      onClick: () => console.log('Button clicked'),
    },
    // 새로운 자식 엘리먼트 추가
    <span>Additional Content</span>
  );

  function App() {
    return <div>{clonedElement}</div>;
  }

  export default App;
  ```

- 주의 할 점
  - 복제된 엘리먼트가 새로운 속성을 가지면서도 부모 컴포넌트의 상태나 속성을 수정하지 않는다.
  - React의 단방향 데이터 흐름 원칙을 유지하기 위해 중요한 점이다.

## 번외 : story 제작 - 짜치는 코드

compound로 구현된 컴포넌트의 story를 제작하기 위해 꽤 많이 삽질을 했다.

> 사실 지금도 별로인 코드라고 생각한다. 맨땅에 헤딩했기 때문.. 스토리북 공부는 차차 할 예정이다. 따라서 참고하지 않는 것을 추천!

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './input';
import { TextField } from './inputTextField.stories';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Small: Story = {
  args: {
    variant: 'small',
    children: <Input.TextField {...TextField.args} />,
  },
};

export const Medium: Story = {
  args: {
    variant: 'medium',
    children: <Input.TextField {...TextField.args} />,
  },
};
export const Large: Story = {
  args: {
    variant: 'large',
    children: <Input.TextField {...TextField.args} />,
  },
};
```

우선, Input 컴포넌트에 대한 스토리이다. Small, Medium, Large 크기가 있고, variant로 각 크기를 선택한다. children으로 Input.TextField를 받는데, 이 컴포넌트의 props는 Input.TextField 스토리에서 받아온다.

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './input';

const meta: Meta<typeof Input.TextField> = {
  title: 'Input/TextField',
  component: Input.TextField,
};
export default meta;

type Story = StoryObj<typeof Input.TextField>;

export const Empty: Story = {
  args: {},
};

export const TextField: Story = {
  args: {
    placeholder: 'placeholder입니다',
    onChange: () => console.log('small'),
  },
};
```

TextFiled의 args에는 placeholder와 onChange가 있다. 사실 스토리북으로 action 테스트도 하고싶은데 아직 방법을 모르겠다.

굉장히 짜치는 코드라는 것을 알고 있다. 차차 공부하며 리팩토링하자.
