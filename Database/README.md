# Database

이번 스프린트에서는 지난 시간에 구현했던 Chatterbox Client, Server를 합치고 SQL을 사용하여 Chatterbox Server가 영속적인 데이터를 가질 수 있도록 만드는 것이 목표이다.

- **Persistence(영속성)** : 서버가 재시작해도 저장된 Data가 지워지지 않는 것을 의미하며, 대부분의 어플리케이션에서 요구되는 기능이다.

웹 서버가 MySQL 데이터베이스에 연결되고, 연결을 통해 데이터가 저장되고 메시지를 받아올 수 있도록 만들어야 한다.

---

## TODO

1. 각 Entity를 만들고, Table을 만드는 Schema.sql 파일을 먼저 작성한다.

2. 먼저, 아래 명령어를 실행해서 SQL을 레포에 받는다. 이 모듈은 Chatterbox Server가 MySQL Server와 상호작용할 수 있게 만든다.

   `npm install mysql --save`

3. 서버를 작성하고 실행하기 전에 MySQL 비밀번호를 입력해야하는데, 보안상의 이유로 아래와 같이 환경 변수에 담아 사용하는 편이 좋다.

   `$ export MY_VARIABLE=my_value`

4. `server/db/index.js` 파일을 작성한다.

   - 해당 파일은 MySQL 모듈로 데이터베이스 서버와 연결하는 파일이다.

5. `server/models/index.js` 파일과 `server/spec/server-spec.js`파일을 작성한다.
