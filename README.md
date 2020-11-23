# kakaopay frontend type game

카카오페이 프론트엔드개발 사전과제 - 타자게임

## 개발환경

- Visual Studio Code 1.51.1
- Mac OS
- Node.js v12.1.0
- Npm v6.9.0

## 문제 해결 전략

서비스 진입시 페이지 렌더링은 router.js가 담당하고 해당 페이지에서 필요한 기능들은 컨트롤러를 통해 나눠지게 된다. <br/>컨트롤러에서는 init 메서드를 통해 타자게임을 할 수 있는 template/game.js 가 렌더링되고 타자게임에 필요한 기능들을 정의한 pages/games.js 를 setup 메서드를 통해 초기화한다.

- 남은시간
  - countDown 함수는 문제당 주어진 시간을 차감하는 함수로서 setInterval을 이용해서 1초씩 차감하였으며 GameView 안에서 어디서든 clearInterval이 가능하도록 this.timer 변수에 담았다.
  - 단어당 해결시간을 구하기 위해 1초씩 차감될때마다 this.solveTime 변수에 카운트하였으며 0초가 되어 실패할 경우는 평균 시간에 포함하지 않으므로 해당 단어에 주어진 시간을 차감하였음.
- 점수
  - this.score 변수에 총 문제수를 기본값으로 넣고 문제풀이 시간이 0초가 될 때마다 1씩 차감하였음.
- 입력
  - 입력된 단어가 제시된 경우와 맞을 경우 this.index값을 올려서 서버에서 받아온 결과값의 다음 배열 데이터를 가져오도록 함.
  - this.index의 값이 총문제수를 충족할 경우 문제를 다 푼것이므로 router를 이용해서 '/complete' 페이지로 이동. 이때 결과값의 점수와 평균타자시간을 화면에 표시하기 위해 this.score와 this.solveTime을 문제수로 나눠준 값을 파라미터로 넘긴다.
- 시작
  - 모든 게임이 초기화 되는 부분은 reset 함수에서 화면에 표시된 데이터와 동작에 필요한 데이터들을 기본값으로 돌렸다.

### 1. API 통신

- models/list.js

url을 인자로 받는 getList라는 함수생성.
Promise객체를 리턴.
api통신 성공 시 결과값을 JSON.parse를 통해 파싱.
게임시작전에 통신하여 데이터를 들고있다가 게임이 시작되면 가져온 데이터를 순차적으로 화면에 표시한다.

```javascript
export const getList = function (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject("통신에러입니다.");
        }
      }
    };
    xhr.open("GET", url);
    xhr.send();
  });
};
```

### 2. 화면구성

- template/game.js
- template/result.js

html파일로 구성했었으나 라우팅할때 해당영역만을 마운트시키는게 더 깔끔해보여서 화면별로 템플릿리터럴을 사용해 화면구성.<br/>
router.js에서 세그먼트별 페이지 렌더링에 사용됌. <br/> \${}를 사용해 템플릿리터럴 안에서 바로 데이터를 표기하는 방법도 생각해 보았으나
그렇게하면 기능구현부분이 깔끔하지 않을 것 같아서 분리함.

### 3. 라우팅

- router.js

History API 를 사용하여 세그먼트별로 해당 template를 렌더링하여 화면구성<br/>
최초 루트 라우팅을 위한 `initialRoutes` 함수와 다른 세그먼트로 이동할 수 있는 `historyRouterPush` 함수 제공

### 4. 컨트롤러

- controllers/mainController.js

화면전환은 라우팅을 통해 템플릿전환을 하였다. <br/>
화면에 필요한 기능은 dispatch 이벤트를 통해 각 페이지에서 필요한 동작들을 정의한 js를 맵핑시켰다.<br/>
게임완료 후 재시작을 할 때 `this.init()` 을 통해 초기화를 할 경우 자동으로 재시작되어서 `GameView.reset()` 으로 리셋작업만 수행.
