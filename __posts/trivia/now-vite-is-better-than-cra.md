---
title: 이제는 CRA보다 Vite?!
date: 2023-05-01
slug: 이제는-CRA보다-Vite
tags: React.js
category: 🙏잡학사전
---

## 왜 CRA 대신 Vite인가?

`Create React App(CRA)`는 Webpack을 사용한다.

- Webpack은 자바스크립트 코드로 구성된 툴이다. 자바스크립트는 interpreted 언어이기 때문에 느리다.
  - Hot Module Replacement([HMR](https://webpack.kr/concepts/hot-module-replacement/))기능을 사용하더라도 느.리.다.
- Go와 같은 저급언어(low-level language)를 활용하여 자바스크립트 툴을 사용해 만든 빌드 툴인 `ESbuild`가 나왔다.

> Vite는 Esbuild를 기반으로 만들어진 프론트엔드 빌드툴이다.

### Vite의 핵심

ES Module을 사용해 브라우저가 필요로 하는 애플리케이션 코드 일부분만 변환하고 제공한다.

Vite는 먼저 애플리케이션의 모듈을 **dependencies**와 **Source code** 두가지에서 dev server start time을 개선한다.

1. **dependencies**

   dependency 모듈은 `node_modules` 폴더로부터 import 되는 자바스크립트 모듈. 대부분 개발 중에 자주 변경되지 않는 일반 자바스크립트이다.

   Vite는 `esbuild`를 사용해 dependency를 사전 번들링한다. esbuild는 Go로 작성되어 JavaScript 기반 번들러보다 10~100배 빠르게 종속성을 사전 번들링한다.

2. **Source Code**

   변환이 필요한 일반 자바스크립트가 아닌 것(JSX, CSS 등)이 포함되어 있는 경우가 많고 자주 편집한다. 또한 모든 소스 코드를 동시에 로드할 필요는 없다.

   Vite는 [native ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)을 통해 소스 코드를 제공한다. 이는 브라우저가 번들러의 작업 일부를 대신하도록 하는 것이다. Vite는 브라우저의 요청에 따라, 필요에 따라 소스 코드를 변환하여 제공하기만 하면 된다.

![https://velog.velcdn.com/images/shinyejin0212/post/3012f9be-b2de-4b11-85f7-3c81fd93ff6f/image.png](https://velog.velcdn.com/images/shinyejin0212/post/3012f9be-b2de-4b11-85f7-3c81fd93ff6f/image.png)

![https://velog.velcdn.com/images/shinyejin0212/post/9e2998cc-933f-4f95-ad8d-0aa49a04bf99/image.png](https://velog.velcdn.com/images/shinyejin0212/post/9e2998cc-933f-4f95-ad8d-0aa49a04bf99/image.png)

**HMR :** 페이지의 나머지 부분에 영향을 주지 않고 특정 모듈만 "즉시 반영" 될 수 있도록하는 Hot Module Replacement. 애플리케이션의 크기가 커지면 HMR 업데이트 속도도 크게 저하된다.

Vite에서 HMR은 native ESM을 통해 수행된다. Vite는 편집된 모듈과 가장 가까운 HMR 경계(대부분 모듈 자체만) 사이의 체인만 정확하게 무효화하면 되기 때문에 애플리케이션의 크기에 관계없이 일관되게 빠른 HMR 업데이트가 가능하다.

- [https://vitejs.dev/guide/why.html#slow-server-start](https://vitejs.dev/guide/why.html#slow-server-start)

## **Create React App과 Vite의 차이점**

1. **Absolute imports**

   vite에서는 항상 절대경로를 사용해야한다.

   `import Cards from “/src/components/cards.jsx”`

   - aliasing해서 사용하기

     - project의 root 폴더에서 `vite.config.js` 파일에서 설정 가능하다.
       - `resolve` 함수는 Node.js의 내장 모듈인 `path`에서 제공된다.

     ```jsx
     import { defineConfig } from 'vite';
     import react from '@vitejs/plugin-react-swc';
     import { resolve } from 'path'; // 추가

     // <https://vitejs.dev/config/>
     export default defineConfig({
       plugins: [react()],

       //추가
       resolve: {
         alias: [
           { find: '@', replacement: resolve(__dirname, 'src') },
           {
             find: '@components',
             replacement: path.resolve(__dirname, 'src/components'),
           },
         ],
       },
     });
     ```

     - resolve를 꼭 import 해와야한다.
       ![https://velog.velcdn.com/images/shinyejin0212/post/a5b0765e-d6d3-448f-8ac3-1ec4a17830bd/image.png](https://velog.velcdn.com/images/shinyejin0212/post/a5b0765e-d6d3-448f-8ac3-1ec4a17830bd/image.png)
     - lint 설정 파일에서도 설정 가능 - eslint 플러그인 사용

       - `.eslintrc.js`

       ```jsx
       module.exports = {
       ...settings: {
               'import/resolver': {
                   node: {
                       extensions: ['.js', '.vue', '.ts', '.d.ts'],
                   },alias: {
                       extensions: ['.vue', '.js', '.ts', '.scss', '.d.ts'],
                       map: [
                           ['@/components', './src/components'],
                           ['@/pages', './src/pages'],
                       ],
                   },
               },
           },
       ...
       };
       ```

   `.eslintrc.cjs` 와 `vite.config.js`에서 alias 하는 것의 차이

   - `.eslintrc.cjs` 파일은 ESLint에서 모듈을 가져오는 데 사용되고, `vite.config.js` 파일은 Vite에서 모듈을 가져오는 데 사용한다.
   - 따라서 `.eslintrc.cjs`에서 설정하면, ESLint를 사용해 JavaScript 코드를 분석할 때, 상대 경로 대신 alias를 사용하여 모듈을 가져온다.
   - `vite.config.js`로 설정하면 Vite를 사용하여 프로젝트를 빌드하고 실행할 때, 상대 경로 대신 alias를 사용하여 모듈을 가져온다
   - 이 파일들의 alias 설정은 서로 독립적으로 작동하고, 다른 파일에서 별도로 설정해야한다.

   > 결론적으로, alias를 설정하는 것은 주로 모듈 번들러나 빌드 도구에서 수행하는 것이 좋다. ESLint에서 alias를 설정하는 것은 코드 분석에 영향을 미치지 않으므로 적절하지 않다.

2. **Environment variables**

   ```shell
   //Instead of this
   REACT_APP_ API_KEY = 1234567890..
   //Use this
   VITE_API_KEY = 1234567890..
   ```

   - [vite-plugin-env-compatible](https://www.npmjs.com/package/vite-plugin-env-compatible) package를 설치해서 이름을 변경하지 않고 기존 환경 변수를 사용할 수도 있다. (아래 불로그 참고)

3. **코드 엔트리포인트**

   vite에서는 index.html을 보면 main.jsx파일부터 시작한다. CRA에서는 app.js가 엔트리포인트이다.

## Vite 사용하기

```bash
npm create vite@latest
npm install
npm run dev // pord 5173
```

Vite는 3000번이 아닌 5173 포트를 사용한다.

![https://velog.velcdn.com/images/shinyejin0212/post/f1f07eff-75c6-41f3-a6ca-e1e0d9eb7cc6/image.png](https://velog.velcdn.com/images/shinyejin0212/post/f1f07eff-75c6-41f3-a6ca-e1e0d9eb7cc6/image.png)

![https://velog.velcdn.com/images/shinyejin0212/post/e64035b0-1537-4ea9-b8a7-a5b5591879f2/image.png](https://velog.velcdn.com/images/shinyejin0212/post/e64035b0-1537-4ea9-b8a7-a5b5591879f2/image.png)

![https://velog.velcdn.com/images/shinyejin0212/post/15786b92-4eab-4c76-9867-29d6e404e3cc/image.png](https://velog.velcdn.com/images/shinyejin0212/post/15786b92-4eab-4c76-9867-29d6e404e3cc/image.png)

- index.html
  ![https://velog.velcdn.com/images/shinyejin0212/post/86476f1e-1d35-4a15-95e4-1c582137c3f7/image.png](https://velog.velcdn.com/images/shinyejin0212/post/86476f1e-1d35-4a15-95e4-1c582137c3f7/image.png)
- main.jsx
  ![https://velog.velcdn.com/images/shinyejin0212/post/73c24177-ab20-4710-8f3d-1763079015c3/image.png](https://velog.velcdn.com/images/shinyejin0212/post/73c24177-ab20-4710-8f3d-1763079015c3/image.png)
