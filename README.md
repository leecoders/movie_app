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
import React from "react";

function Potato() {
  return <h3>I love potato</h3>;
}

export default Potato;
```

**App.js (component 사용 방법)**

```javascript
import React from "react";
import Potato from "./Potato";

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
import React from "react";

function Food({ fav }) {
  console.log(fav);
  return <h1>I like {fav}</h1>;
}

function App() {
  return (
    <div className="App">
      <h1>hello</h1>
      <Food fav="Potato" something={[1, 2, 3]} />
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
- `map`은 component인 Food들의 배열을 반환하겠지만 이 component 배열이 `div` 내에서 여러 개의 component 즉, HTML 코드로 출력된다. (React가 그것을 해준다.)

## #2 3

### component 배열을 다른 component에 전달할 때 배열의 각요소를 unique하게 구분할 수 있도록 `key`라는 property가 있어야 한다.

- React는 각 component를 구분하지 못하기 때문에 아래와 같은 warning 메시지를 출력한다.
  ![react_needs_key_property](https://user-images.githubusercontent.com/47619140/63220945-7c098a80-c1cc-11e9-820f-522d8f2fff7b.png)

**해결책**

```javascript
import React from "react";

function Food({ fav }) {
  console.log(fav);
  return <h1>I like {fav}</h1>;
}

const foodList = [
  {
    id: 0,
    name: "김밥"
  },
  {
    id: 1,
    name: "김치"
  },
  {
    id: 2,
    name: "볶음밥"
  },
  {
    id: 3,
    name: "라면"
  }
];

function App() {
  return (
    <div className="App">
      {foodList.map(dish => (
        <Food key={dish.id} fav={dish.name} />
      ))}
    </div>
  );
}

export default App;
```

- `key`라는 프로퍼티는 `Food()`로 전달되지 않는다.
  - 단지 React 내부적으로 사용되는 프로퍼티일 뿐이다.

### React에서 `img` 태그를 사용할 때는 `alt prop`을 추가해야 한다.

- 이미지에 대한 이름을 등록한다.

**component에 이미지 넣기**

```javascript
import React from "react";

function Food({ fav, picture }) {
  console.log(fav);
  return (
    <div>
      <img src={picture} alt={fav} />
      <h1>I like {fav}</h1>
    </div>
  );
}

const foodList = [
  {
    id: 0,
    name: "김밥",
    img: "https://i.ytimg.com/vi/2G5SAC3UI3M/maxresdefault.jpg"
  },
  {
    id: 1,
    name: "김치",
    img: "https://i.ytimg.com/vi/2G5SAC3UI3M/maxresdefault.jpg"
  },
  {
    id: 2,
    name: "볶음밥",
    img: "https://i.ytimg.com/vi/2G5SAC3UI3M/maxresdefault.jpg"
  },
  {
    id: 3,
    name: "라면",
    img: "https://i.ytimg.com/vi/2G5SAC3UI3M/maxresdefault.jpg"
  }
];

function App() {
  return (
    <div className="App">
      {foodList.map(dish => (
        <Food key={dish.id} fav={dish.name} picture={dish.img} />
      ))}
    </div>
  );
}

export default App;
```

## #2 4

### component 함수에서 전달 받은 prop의 타입을 사용하기 전에 올바른 타입인지 체크하는 방법

- `npm i prop-types`를 통해 패키지 install

```javascript
...
import PropTypes from 'prop-types';
...
Food.propTypes = {
  fav : PropTypes.number.isRequired, // number를 요구!!
  picture : PropTypes.string.isRequired
};
...
```

- Food 객체(함수)에 `propTypes`라는 프로퍼티를 추가하고 타입을 체크하고 싶은 프로퍼티들과 같은 이름의 프로퍼티들을 갖는 객체를 할당한다.
  - 각 프로퍼티에 `PropTypes.<type>`으로 `요구되는 타입`을 지정
    ![example_prop-types](https://user-images.githubusercontent.com/47619140/63221216-bd039e00-c1d0-11e9-8fc4-0299541f029b.png)
- `number`로 지정되어 있으나 `string`으로 파라미터로 Food 객체(함수)로 넘어왔기 때문에 위와 같은 warning 메시지를 확인할 수 있다.
- 다른 이름의 프로퍼티를 전달받으면 `undefined`라는 warning 메시지도 받을 수 있다.
- Food 객체에 `prop-types`사용을 목적으로 추가하는 프로퍼티 이름으로 `propTypes`만을 사용해야 한다.

## #3 0

### 함수 component -> 클래스 component

- React는 자동적으로 모든 `class component`의 `render` 메서드를 실행시킨다.
  - `render()` 안에서 HTML 코드를 return 시키도록 한다.

```javascript
import React from "react";

class App extends React.Component {
  render() {
    return <h1>I'm a class component</h1>;
  }
}
export default App;
```

- `class component`를 사용하려면 `React.Component`를 상속하도록 해야 한다.

### HTML의 `<button>`태그의 onClick 속성에 JS 함수를 전달할 때 `함수명()`을 전달하지 않는다.

- `add()`라는 함수가 클래스 내에 있을 때

```javascript
<button onClick={this.add()}>Add</button>
```

```javascript
<button onClick={this.add}>Add</button>
```

- 첫 번째 방법으로 onClick으로 지정하는 방법은 `this.add()`를 즉시 호출하는 것이다.
  - 코드가 실행될 때(버튼이 추가되며 onClick 속성으로 전달) 함수를 호출하고 싶은 것이 아니라, 일단 속성으로 전달하고 버튼이 클릭되었을 때 실행되기를 원한다면 함수를 `전달`만 해야 하기 때문에 참조값인 `()`를 뺀 이름만을 전달한다.

### state 개념

- component의 동적으로 변경되는 데이터를 다루기 위해서 사용된다.

- function 내에서는 동적인 데이터를 다룰 수 없기 때문에 class와 함께 사용된다.

- constructor 없이 class fields 내에 `객체`로 정의하면 된다.

  - class fields를 사용하지 않는다면?

  ```javascript
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    }
  }
  ```

  - 이렇게 해야됨..

    > constructor 에서 super(props) 를 호출 한 이유는, 우리가 컴포넌트를 만들게 되면서, Component 를 상속했으며, 우리가 이렇게 constructor 를 작성하게 되면 기존의 클래스 생성자를 덮어쓰게 됩니다. 그렇기에, 리액트 컴포넌트가 지니고있던 생성자를 super 를 통하여 미리 실행하고, 그 다음에 우리가 할 작업 (state 설정) 을 해주는 것 입니다.
    > [참고](https://velopert.com/3629)

## #3 1

### setState() : class fields에 정의된 state를 변경하는 방법

- 단지 `this.state.count++`와 같은 코드는 적용되지 않는다.
  - 버튼의 `onClick` 속성을 통해 `render()` 에서 호출된 `add()` 내에서 값이 갱신되더라도 render는 다시 HTML을 갱신하지 않는다.
    - render의 HTML 생성 -> 버튼 클릭 -> 값의 변경 -> ?
    - 버튼이 클릭되었다고 해서 HTML을 갱신하기 위해 render가 다시 호출되지 않는다.
- `setState()`를 사용하면 React가 state를 refresh하고 render function을 다시 호출한다.
  - state는 object이므로 setState는 `새로운 object`를 받아야 한다.

```javascript
class App extends React.Component {
  state = {
    count: 0
  };
  add = () => {
    console.log("add");
    this.setState({ count: this.state.count + 1 });
  };
  minus = () => {
    console.log("minus");
    this.setState({ count: this.state.count - 1 });
  };
  render() {
    return (
      <div>
        <h1>The number is {this.state.count}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </div>
    );
  }
}
```

- setState 내에서 state에 의존하는 것은 좋지 않기 때문에 권장되는 방법이 아니다.

```javascript
this.setState({ count: this.state.count + 1 });
```

```javascript
this.setState(current => ({ count: current.count + 1 }));
```

- 두 번째 방법을 사용하는 것이 좋다.
  - setState 내에서 외부 state에 의존하지 않는 가장 좋은 방법

**결론 : setState()가 호출되면 React는 새로운 state와 함께 render()를 다시 호출한다.**

## #3 2 Component Life Cycle

### mounting

- constructor() : JS에서 클래스가 생성될 때 호출되는 함수
- render() : 렌더링될 때 실행
- componentDidMount() : component가 마운트(component의 첫 렌더링)된 후에 실행(render보다 나중에 실행됨)

### updating

- render() : 다시 렌더링될 때 실행
- componentDidUpdate() : component가 업데이트(다시 렌더링)된 후에 실행

### unmounting

- componentWillUnmount()

## #4 0 Fetching Movies from API

### axios

- fetch를 보다 편하게 작동시키기 위해 만들어진 모듈
- 이를 통해 웹에서 데이터를 가져오자

### URL이 계속 바뀔 수 있기 때문에 아래 주소에서 JSON 문자열을 얻어오자

> https://yts-proxy.now.sh/list_movies.json

## #4 1 Rendering the Movies

### `axios.get()`은 비동기적으로 실행되므로 async/await 패턴을 사용해야 함

```javascript
  getMovies = async () => {
    const {
      data : {
        data : { movies }
       }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    console.log(movies);
  }
  componentDidMount() {
    this.getMovies();
  }
```

- 추가로, `movies` 객체를 얻는 것이 목적인데 객체가 너무 얽혀있음.. 그래서 위의 코드 처럼 `ES6`문법을 활용하여 객체 내부 어딘가의 `movies`를 꺼내어 초기화시킬 수 있다.

### setState에 새로운 객체를 전달하는 방법

```javascript
  ...
  state = {
    isLoading : true,
    movies : []
  };
  getMovies = async () => {
    const {
      data : {
        data : { movies }
       }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    this.setState({ movies });
  }
  ...
```

- JS가 내부적으로 전달받은 객체에서 같은 이름의 프로퍼티를 통해 새로 초기화시킨 뒤 render()를 다시 호출한다.
  - 그렇기 때문에, 위의 코드처럼 `{movies}`만 전달해도 알아서 꺼내서 초기화 시킨다.
  - 그러므로 isLoading은 따로 전달하지 않아도 상관 없다.

### component가 state를 필요로 하지 않는다면 class component일 필요 없다.

## #4 2 Styling the Movies

### `<img>` 태그의 `title prop`은 이미지에 마우스를 올렸을 때의 텍스트를 지정한다.

### React의 CSS 통합
- create-react-app 덕분에 CSS 통합이 쉬워졌다.
- CSS 파일을 생성하고 JS 파일에서 import하면된다.

**import 예시**

```javascript
import "./App.css";
```
- 객체에 대한 이름이 필요 없다.

### HTML 태그에 class를 통해 CSS를 적용하는 방법에 대한 추가 공부가 필요할 것 같다.

## #4 3 Adding Genres

### JSX는 HTML처럼 보이지만 사실은 JS 문법이 base이다.
- React는 `class` 키워드에 의해 혼동할 수 있다.
  - component를 class로 정의한 경우 class 내부의 `render()` 안에서 return되는 HTML 코드에도 `class`라는 키워드를 사용하게 된다. (JS의 `class`와 키워드가 중복됨)
  - component를 function으로 정의하더라도 `class` 키워드는 혼동을 줄 수 있기 때문에 에러 메시지를 출력한다.
  - JSX 문법으로 `className`으로 HTML 태그의 prop을 지정하면 `view-source:localhost:3000`에서는 HTML 문법인 `class`로 자동으로 변경되는 것을 알 수 있다.

**결론 : HTML의 class prop은 `class`이지만 JSX에서는 `className`으로 혼동을 피하도록 한다.**

- 또 다른 예로, HTML 태그 중 `<label>`에는 `for`라는 prop이 있다.
  - `<label for=...>` -> `<label htmlFor=...>`로 사용해야 한다.

### movie component에서 사용할 genres prop 추가하기
1. `Movie.propTypes`에 먼저 추가한다.
  - `genres: PropTypes.arrayOf(PropTypes.string).isRequired`를 추가한다.
    - 체크하고자 하는 prop의 type이 배열인 경우 `PropTypes.array.isRequired`로 하면 된다.
    - 체크하고자 하는 prop이 배열이고 각 요소가 가져야 할 값을 따로 체크하기 위해 `PropTypes.arrayOf(PropTypes.<type>).isRequired`를 사용한다.

```javascript
Movie.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};
```

2. Movie component를 호출하는 쪽인 `App.js`에서 prop을 전달한다. (적절한 json 객체 데이터)
3. Movie component에서 파라미터를 통해 prop을 넘겨 받는다.
  - `genres` prop은 `arrayOf(string)` type이므로 `Array.prototype.map`을 사용해 각 요소를 출력한다.
    - `<ul>`, `<li>` 태그 사용해서 리스트화 및 각 태그에 적당한 className 지정

```javascript
function Movie({ id, year, title, summary, poster, genres }) {
  return (
    <div className="movie">
      <img src={poster} alt={title} title={title} />
      <div className="movie_data">
        <h3 className="movie_title">{title}</h3>
        <h5 className="movie_year">{year}</h5>
        <ul className="genres">
          {genres.map((genre, idx) => (
            <li key={idx} className="genres_genre">
              {genre}
            </li>
          ))}
        </ul>
        <p className="movie_summary">{summary}</p>
      </div>
    </div>
  );
}
```

## #4 5

### `String.prototype.slice`도 있다!
- `Array.prototype.slice()`처럼 똑같이 사용할 수 있다.

## #5 0 Deploying to Github Pages

### 과정
1. `npm i gh-pages`
2. `git remote -v`
3. `npm i gh-pages`
4. `package.json` -> `"homepage"` 프로퍼티 생성해서 홈페이지 등록(gh-pages가 동작하기 위해 중요한 단계)
  - 주의 : 대/소문자 구분을 한다!
5. (6번에서 할 것 미리 테스트, 생략 가능)`npm run build` -> `build` 폴더 생성됨(최적화된 코드 자동 생성) -> 이 폴더를 `gh-pages`에 업로드할 것
6. `package.json` -> `"scripts"` 프로퍼티에 스크립트 추가
  - `"deploy"` 프로퍼티 생성해서 `"gh-pages -d build"` 추가
  - `"predeploy"` 프로퍼티 생성해서 `"npm run build"` 추가
    - `npm`이 `predeplay`를 먼저 호출할 것
    - `predeploy`가 `npm run build`를 할 것
    - `build`가 자기 script인 build script(`npm run build`)를 호출할 것
    - 그 script가 폴더를 생성할 것
    - `deploy`가 `gh-pages`를 호출하고 -> `build` 폴더를 업로드(publish)할 것(`gh-pages -d build`)
7. `npm run deploy`
   - 기본적으로 먼저 `predeploy`를 먼저 호출

### `public` -> `index.html`에서 홈페이지 title 수정하기
- 변경 사항이 있을 때는 `npm run deploy`를 다시 해야 한다.