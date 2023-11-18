---
title: 'FE 개발 환경 세팅 - ESLint & Prettier'
date: 2023-07-06
slug: frontend-setting-eslint-prettier
tags: ESLint, Prettier, 👩‍🍳더줄게
category: 🙏잡학사전
---

## TL;DR

1. Linting은 ESLint로, Code Formatting은 Prettier로 하자
2. ESLint와 Prettier가 자동으로 적용될 수 있게 Husky와 Lint-staged 활용
   - 커밋 시 ESLint와 Prettier가 적용된 후에만 커밋이 수행 되도록 할 수 있다.

## 1. ESLint 설정

Next.js 버전 11.0.0부터 ESLint가 함께 통합됐기 때문에 Next 설치 때 eslint 설치에 yes했다면, ESLint를 추가 설치하거나 `.eslintrc.json`을 따로 생성하지 않아도 된다.

### Airbnb 규칙 설정 - `eslint-config-airbnb` 리액트 관련 규칙

- eslint-config-airbnb의 의존성 패키지 목록 확인 명령어
  ```bash
  npm info "eslint-config-airbnb@latest" peerDependencies
  ```
- 위 명령어를 통해 조회된 종속 패키지목록이다. 버전에 맞는 패키지들을 같이 설치해줘야 한다.
  ```json
  {
    "eslint": "^7.32.0 || ^8.2.0",
    "eslint-plugin-import": "^2.25.3",
    "eslint-plugin-jsx-a11y": "^6.5.1",
    "eslint-plugin-react": "^7.28.0",
    "eslint-plugin-react-hooks": "^4.3.0"
  }
  ```

**설치하기**

```bash
# 1. airbnb + 종속 패키지까지 설치하기
npx install-peerdeps --dev eslint-config-airbnb
# 또는 각각 개별적 설치
npm install -D eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-ally
#------------

# 2. TypeScript 관련 airbnb, lint 패키지 설치하기
npm install --save-dev typescript eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

`eslint-config-airbnb-base` - 리액트 제외 규칙

- 종속성 패키지 확인 명령어
  ```shell
  npm info "eslint-config-airbnb-base@latest" peerDependencies
  ```

**설치하기**

```
npx install-peerdeps --dev eslint-config-airbnb-base
```

- `.eslintrc.json`에 설정 추가
  ```json
  "env": {
      "browser": true,
      "node": true,
    },
    "extends": "airbnb-base",
    "rules": {
      "linebreak-style": 0,
    },
  ```

## 2. Prettier 및 플러그인 설치

eslint와 prettier를 함께 사용할 시 규칙들이 충돌된다. 따라서 의존성 패키지들을 설치해야한다.

```bash
npm install -D prettier eslint-plugin-prettier eslint-config-prettier
```

- `eslint-plugin-prettier` : eslint에서 prettier랑 충돌할 규칙 비활성화
- `eslint-config-prettier` : 포매팅할때 prettier 사용하게 하기

> 더 줄게 프로젝트의 prettier```shell 밑 eslint 설정이다. 상황에 따라 커스텀해서 사용하면 된다.

<details>
<summary><strong><code>.prettierrc.json</code> 파일 생성</strong></summary>
<div>

```json
{
  "semi": false, // 세미콜론 사용여부. (Next.js는 세미콜론 ; 사용안해서 false함)
  "singleQuote": true, // 작은 따옴표 ' 사용
  "tabWidth": 2, // 탭 너비 설정
  "trailingComma": "all" // 여러 줄일때 마지막에 후행 콤마 사용
}
```

</div>
</details>

<details>
<summary><strong><code>.eslintrc.json</code> 파일 생성</strong></summary>
<div>

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "parserOptions": {
    "project": "./tsconfig.json",
    "createDefaultProgram": true
  },
  "env": {
    // 전역객체를 eslint가 인식하는 구간
    "browser": true,
    "node": true,
    "es6": true
  },
  "ignorePatterns": ["node_modules/"], // eslint 미적용될 폴더나 파일 명시
  "extends": [
    "airbnb", // eslint-config-airbnb는 Airbnb의 .eslintrc를 확장이 가능한 공유된 config로서 제공하는 패키지
    "airbnb-typescript",
    "airbnb/hooks",
    "next/core-web-vitals", // next 설치시 자동으로 설치
    "plugin:jsx-a11y/recommended", // JSX 정적 평가
    "plugin:import/typescript", //.cts/.mts/.ts/.tsx/.d.cts/.d.mts/.d.ts 확장자를 가진 파일을 import/require 할 수 있다.tsconfig.json에 정의된 paths를 사용할 수 있다.
    "plugin:@typescript-eslint/recommended", // ESLint, Pretter가 TypeScript를 지원할 수 있도록 하는 도구
    "plugin:prettier/recommended", // eslint의 포매팅을 prettier로 사용. prettier와 eslint 충돌 방지
    "prettier" // eslint-config-prettier prettier와 중복된 eslint 규칙 제거
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["warn", { "extensions": [".ts", ".tsx"] }],
    "no-useless-catch": "off",

    "no-warning-comments": "warn",
    "import/order": "error",
    "react/function-component-definition": [
      "error",
      { "namedComponents": "arrow-function" }
    ],
    "no-console": "off",
    "import/prefer-default-export": "off",
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "react/require-default-props": "off",
    "react/prop-types": "off",
    "consistent-return": "off",
    "curly": "error",
    "eqeqeq": ["error", "smart"],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variable",
        "format": ["camelCase", "UPPER_CASE"]
      },
      {
        "selector": "parameter",
        "format": ["camelCase"],
        "leadingUnderscore": "allow"
      },
      {
        "selector": "function",
        "format": ["camelCase", "PascalCase"]
      },
      {
        "selector": "typeLike",
        "format": ["PascalCase"]
      }
    ],
    "@typescript-eslint/array-type": ["error", { "default": "array-simple" }],
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    "arrow-body-style": ["error", "as-needed"],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ]
  }
}
```

- rules배열의 첫번째 값을 0,1,2나 "off", "warn", "error"로 규칙 표시

    <details>
    <summary>rules 정리 (매우 김)</summary>
    <div>

  - `"no-warning-comments": "warn"`
    - 특정한 단어를 포함하는 주석에 대해 보고하는 규칙.
    - TODO, FIXME, XXX, BUG와 같은 주석에 대해 경고를 표시한다.
  - `"import/order": "error"`
    - require나 import 문의 순서 컨벤션을 정하고 그것을 강제하는 규칙.
    - import 문의 순서 컨벤션을 지정된 규칙에 따라 정렬하도록 설정되어 있다.
  - `"react/function-component-definition": ["error", {"namedComponents": "arrow-function"}]`
    - 함수 컴포넌트를 사용할 때 특정한 함수 타입을 적용하도록 도와주는 규칙.
    - **화살표 함수**를 사용하여 함수 컴포넌트를 정의하도록 설정.
  - `"no-console": "off"`
    - console의 사용을 금지하는 규칙.
    - 비활성화하여 console을 사용할 수 있도록 설정
  - `"react/jsx-filename-extension": ["error", { "extensions": [".tsx"] }]`
    - JSX 문법을 포함하는 파일이 .tsx 확장자를 사용하도록 권장하는 규칙
  - `"import/prefer-default-export": "off"`
    - export하는 파일 내에서 default export를 사용하도록 권장하는 규칙.
    - 비활성화
  - `"no-plusplus": ["error", { "allowForLoopAfterthoughts": true }]`
    - 단항 연산자 ++, --를 허용하지 않는 규칙.
    - 단항 연산자를 사용하지 않도록 설정되어 있으며, for 문에서는 단항 연산자를 허용한다.
    - allowForLoopAfterthoughts 옵션을 사용하여 for 문에서의 단항 연산자 사용을 허용한다.
  - `"react/require-default-props": "off"`
  - 컴포넌트의 props가 required 타입이 아닐 때 대응되는 defaultProps 값을 설정하도록 강제하는 규칙.
    - TypeScript를 사용하기 때문에 defaultProps 값이 필요하지 않으므로 이 규칙을 비활성화한다.
  - `"react/prop-types": "off"`
    - 컴포넌트의 props에 대한 타입인 propTypes을 설정하도록 강제하는 규칙.
    - TypeScript를 사용하기 때문에 propTypes 값이 필요하지 않으므로 이 규칙을 비활성화
  - `"consistent-return": "off"`
  - return 문을 사용하도록 강제하는 규칙. 비활성화
  - `"curly": "error"` : 모든 block 문에 대해 일관적인 괄호({}) 스타일을 강제하는 규칙.
  - `"eqeqeq": ["error", "smart"]`
    - strict equality operator(===, !==)를 사용하도록 강제하는 규칙.
    - **smart** 옵션을 사용하여 literal 값을 비교할 때, typeof 연산자의 반환값을 평가할 때, null과 비교할 때의 3가지 경우에 이 규칙이 적용되지 않도록 설정
  - `"@typescript-eslint/naming-convention": [...]`
    - 코드 전반에 네이밍 컨벤션을 강제하는 규칙.
    - 변수와 매개변수는 camelCase 또는 UPPER_CASE 형식을 따르도록 설정
  - `"@typescript-eslint/array-type": ["error", { "default": "array-simple" }]`
    - 배열 타입을 일관적으로 정의하도록 강제하는 규칙.
    - 모든 배열 타입을 T[]의 형태로 정의하도록 설정
  - `"no-unused-vars": ["error", { "argsIgnorePattern": "^*", "varsIgnorePattern": "^*" }]`
    - 변수가 사용되지 않는 것을 허용하지 않는 규칙
    - 사용되지 않는 인수와 구조 분해 할당 시 사용하지 않는 변수에 대해 경고를 표시한다.
    - \_로 시작하는 변수와 매개변수는 무시되도록 설정
  - `"react/react-in-jsx-scope": "off"`
    - JSX를 사용할 때 scope 내에 React가 있는지 확인하는 규칙.
    - React 17 버전 이후부터 새로운 JSX transform에서 자동으로 react/jsx-runtime 함수를 불러오므로, 비활성화
  - `"arrow-body-style": ["error", "as-needed"]`: arrow function의 내부를 괄호로 감싸도록 강제하는 규칙.
    - 내부 로직이 한 줄인 경우 괄호를 생략하도록 설정
  - `"import/extensions": ["error", "ignorePackages", { "js": "never", "jsx": "never", "ts": "never", "tsx": "never" }]`
    - source path를 import할 때 파일 확장자의 사용 여부를 결정하는 규칙.
    - TypeScript resolver가 import 경로에서 파일 확장자의 생략을 허용하므로, import 경로에 파일 확장자를 사용하지 않도록 설정
    - **이미지 파일과 같이 특정 파일 확장자를 사용해야 하는 경우에는 이 설정을 수정**해야 함.
    </div>
    </details>

</div>
</details>

### Prettier & ESLint 실행

1. prettier 실행

- `npx prettier --write app`

2. eslint 실행

- `npm run lint`
- 만약 에러나면 구글링해서 `.eslintrc` rules에서 해당 속성을 끄거나 설정해주면 된다.

## 3. **husky와 lint-staged로 편리하게 사용하기**

[Husky와 Lint-Staged](https://velog.io/@xmun74/Next.js-TS%EC%97%90%EC%84%9C-ESLint-Prettier-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)

`Husky` 와 `Lint-Staged` 를 활용하여, **git**에서 특정 이벤트(commit, push 등)가 발생할 때에 미리 설정한 스크립트를 실행할 수 있다.

git 환경에서 commit 실행 전에 미리 설정한 git Hook 설정하는 `Husky` 를 사용하여 작업 프로세스를 거는 것을 hook이라고 한다. 프로세스를 걸어 실행 전 원하는 스크립트를 실행할 수 있고, 걸린 파일을 `Lint-Staged`를 통해 분석 도구 및 포맷팅을 실행한다. 만약 문법이 올바르지 않다면 commit은 취소될 수 있다. 또한 commit 시 전체가 아니라 변경된 파일만 eslint, prettier 실행할 수 있고 staged된 파일만 특정 명령어를 실행한다.

### [Husky version 6](https://typicode.github.io/husky/)

- 호박 너구리 글 : https://blog.pumpkin-raccoon.com/85

깃 훅에 따라 원하는 동작을 하게 도와주는 패키지

git add나 commit, push가 시행되기 전이나 후에 원하는 스크립트를 실행시킨다.

**첫 설치 시에는 자동으로 설치**

```jsx
npx husky-init && npm install
// npx husky-init && yarn
```

**husky를 수동으로 설치하는 법**

```jsx
npm install --save-dev husky
// yarn add --dev husky
```

```jsx
npx husky install
```

→ .husky 라는 폴더가 루트에 생김

### set up

`package.json`에 추가 - 설치 후 자동적으로 깃 훅이 가능하도록 해줌

```jsx
{
  ...,
  "scripts": {
    ...
    "prepare": "husky install"
  },
  ...
}
```

### lint-staged

```bash
npm i -D lint-staged
```

p**ackage.json에 명령어 추가하기**

변경된 js,jsx,ts,tsx 파일만 밑 명령어 실행하게 함

```json
"lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ]
  }
```

### `.husky/pre-commit` 에 명령어 추가 [(참고)](https://github.com/okonet/lint-staged#examples)

```json
#!/usr/bin/env sh. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged # 추가
```

## Reference

- [ESLint, Prettier 세팅과 Husky, Lint-Staged 사용하기 🤔](https://velog.io/@lee7198/ESLint-Prettier-세팅과-Husky-Lint-Staged-사용하기)

- [Next.js + TS에서 ESLint, Prettier 설정하기 (+ styled-components, airbnb, husky, lint-staged)](https://velog.io/@xmun74/Next.js-TS에서-ESLint-Prettier-설정하기)

- [밑바닥부터 Next.js 개발 환경 구축하기 - All in One](https://leo-xee.github.io/Next/next-setup-allinone/)
