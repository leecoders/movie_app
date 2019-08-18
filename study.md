# 알게된 내용

## #1 2
### React에서는 파일만 save하면 새로고침하지 않아도 동적으로 refresh된다.
### React 작동 원리
- `index.html`이 브라우저에 올라간다.
- `App.js`에서 삽입할 html 코드를 생성하도록 function을 정의한다.
- `index.js`에서 `App.js`를 import하여 `index.html`에 rending한다.

> 그렇기 때문에, `view-source:localhost:3000`에서는 `App.js`에서 삽입된 html 코드를 확인할 수 없다. React가 virtual DOM에 html 코드를 삽입해주는 역할을 하는 것이다. 결론은, html 코드를 미리 생성하지 않고 React가 virtual DOM을 통해 삽입해주기 때문에 이것이 React가 빠른 이유이다.

## #2 0

### JSX
- `index.js`의 `<App />` 부분은 html이 아니라 `component`라고 한다.
`ReactDOM.render(<App />, document.getElementById('root'));`
- `<App />` -> `App`으로 바꾸면 동작하지 않는다.
- React에서는 component를 사용해 html을 작성하기 위해 사용되는 문법이라고 할 수 있다.

### `ReactDOM` 에서는 오직 하나의 component를 가져올 수 있다.
- component를 추가하기 위해서는 `index.js`가 아니라 `App.js`에 추가해야 한다.
> `다수의 component -> App.js -> index.js` 와 같은 흐름을 갖는다.
- 물론 component는 파일 또는 함수로 따로 만들어야 한다.
**Potato.js (component)**
```javascript
import React from 'react';

function Potato() {
    return (
        <h3>I love potato</h3>
    );
}

export default Potato;
```
**App.js (component 사용 방법)**
```javascript
import React from 'react';
import Potato from './Potato';

function App() {
  return (
    <div className="App">
      hello
      <Potato /> // 이렇게 component 가져다 쓰면 됨
    </div>
  );
}
export default App;
```

## #2 1

### JSX에서 이해해야 하는 것은 component 간에 정보를 주고 받을 수 있다는 것이다.
- component를 재사용할 수 있다는 장점이 있다.
  - component를 만들어 두고 반복해서 사용할 수 있다.

### JSX에서는 `태그`에 HTML에서는 안되는 것을 할 수 있다.
- `<Food fav="Potato" something={[true, 1, 2, 3]}/>` 처럼 태그에 property를 줄 수 있다.
  - App component에서 미리 함수 형태로 정의된 component를 `<Food/>`를 호출하며 `props`라는 인자를 전달하는 것이다.
  - import React from 'react';
**예시 : App.js**
```javascript
import React from 'react';

function Food({ fav }) {
  console.log(fav);
  return (
    <h1>I like {fav}</h1>
  );
}

function App() {
  return (
    <div className="App">
      <h1>hello</h1>
      <Food fav="Potato" something={[1, 2, 3]}/>
    </div>
  );
}

export default App;

```
- property에는 문자열 또는 다른 object가 올 수 있는데 문자열 외에는 위의 코드처럼 `{}`로 감싸서 전달해야 한다.
- 전달받은 component `Food()`에서는 object type으로 props를 전달받으며 파라미터를 `{}`로 감싸서 받으면 프로퍼티 자체를 파라미터로 받을 수도 있다.
- `Food()`에서 return하는 HTML 코드에서 `{}`로 감싸서 사용할 수 있다.
- `<Food fav="kimchi"/>`, `<Food fav="honey"/>` 등으로 인자로 다른 값을 넘겨주며 component를 재사용하면 동적으로 변경되는 `jsx + props`를 경험할 수 있다.

## #2 2

### `App()`에서 return되는 `div`태그 안에 JS 문법을 사용하려면 `{}`로 감싸면 된다.

### `map`을 사용하여 component를 동적으로 여러 개 rendering하기
```javascript
import React from 'react';

function Food({ fav }) {
  console.log(fav);
  return (
    <h1>I like {fav}</h1>
  );
}

const foodList = ["김밥", "김치", "볶음밥", "라면"];

function App() {
  return (
    <div className="App">
      {foodList.map(dish => (
          <Food fav={dish}/>
      )}
    </div>
  );
}

export default App;
```
- `{}` 안에 `{}`를 또 쓸 수 있다.
- `{}` 안에 HTML 코드는 그냥 넣으면 된다.