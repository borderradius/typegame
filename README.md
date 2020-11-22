# kakaopay frontend type game

카카오페이 프론트엔드개발 사전과제 - 타자게임

## 개발환경

- Visual Studio Code 1.51.1
- Mac OS
- Node.js v12.1.0
- Npm v6.9.0

## API 통신

- models/list.js

url을 인자로 받는 getList라는 함수생성.
Promise객체를 리턴.
api통신 성공 시 결과값을 JSON.parse를 통해 파싱.

## 화면구성

- template/home.js
- template/result.js

화면별로 템플릿리터럴을 사용해 html 구성
router.js에서 segment별 페이지 렌더링에 사용됌.

## 라우팅

- router.js

History API 를 사용하여 세그먼트별로 해당 template를 렌더링하여 화면구성

## 컨트롤러

- controllers/mainController.js

컨트롤러에서 각 화면에 필요한 동작들을 정의한 js들을 맵핑








