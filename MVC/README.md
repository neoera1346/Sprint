# MVC

이번 스프린트에서는 bit.ly 와 같이 긴 URL을 짧게 단축시켜주는 앱을 구현하는 것이다.

더불어, 이번에 MVC와 ORM을 배웠지만, View를 제외한 Models와 Controllers만 작성할 것이며, SQL문을 사용하지 않고 ORM과 Sequelize 모듈을 통해 구현하는 것이 목표다.

- **Persistence(영속성)** : 서버가 재시작해도 저장된 Data가 지워지지 않는 것을 의미하며, 대부분의 어플리케이션에서 요구되는 기능이다.

웹 서버가 MySQL 데이터베이스에 연결되고, 연결을 통해 데이터가 저장되고 메시지를 받아올 수 있도록 만들어야 한다.

---

## TODO

1. 사전 준비: 필수 파일 및 모듈 설치

- Sequelize ORM 공식 사이트를 통해 Sequelize를 설치하세요. 현재 가장 최신 버전인 v6가 설치되었는지 package.json을 이용해 확인하세요.
- Sequelize - Migrations 문서를 통해 sequelize-cli 를 설치할 수 있습니다. 마이그레이션을 할 수 있도록 돕는 툴로, CLI에서 모델을 생성해주거나, 스키마 적용을 할 수 있도록 돕습니다.
  - 마이그레이션은 스키마 변경에 따른 데이터 이주(migration)를 뜻합니다.
  - 공식 문서 외에 npx sequelize-cli --help 을 통해 명령의 종류를 파악할 수 있습니다.
- 설치하지 않으면 테스트를 실행할 수 없습니다.

```js
// Sequelize 모듈 설치하는 방법이다.
$ npm install --save sequelize

// mysql2는 mysql과 시퀄라이즈를 이어주는 드라이버이다.
$ npm install --save sequelize mysql2

// Sequelize 명령어를 실행하기 위한 패키지다.
$ npm install --save-dev sequelize-cli

// Bootstraping(프로젝트 초기단계를 자동으로 설정)해준다.
$ npx sequelize-cli init
```

2. ORM 설정을 해야 한다.

- Bootstraping이 성공적으로 끝났다면 아래 파일들이 자동으로 생성된다.

```
config/config.json
models/
migrations/
seeders/
```

- 설정 파일을 이용해 MySQL 접속 설정을 해야 한다.

  - short.ly에서 사용할 데이터베이스는 직접 생성해야 한다.

- 중요 질문 :
  - 기본적으로 development, test, production 환경 중 어떤 환경을 사용하고 있나요?
  - 어떻게 다른 환경으로 전환할 수 있나요?
  - 여러 개의 환경이 분리되어 있는 이유는 무엇인가요?
  - 설정 파일은 .gitignore에 등록되어 있습니다. 설정 파일을 git의 관리를 받게 하는 대신, 환경 변수를 사용하게 만들 수 있나요?

3. CLI를 통해 모델 생성을 해야 한다.

- 모델은 엔티티를 객체로 표현한 형태로, 데이터 구조를 기술하고, 데이터에 수행할 수 있는 명령의 모음을 의미한다.
- url, title, visits 필드를 생성해야 한다.
- id, createdAt, updatedAt 필드는 자동으로 생성된다.
- 모델을 잘못 만든 경우, 생성된 파일을 직접 수정하거나 삭제 후 명령을 다시 실행할 수 있다.
- 중요 질문 :
  - MySQL의 varchar나 int 타입은 Sequelize에서는 어떤 형태로 정의해야 하나요?
  - 왜 Sequelize의 타입 정의와 MySQL의 타입 정의가 다를까요?

4. 스키마 변경이 있을 때마다 마이그레이션을 실행해줘야 한다.

   - 마이그레이션을 할 때 주의해야 할 점을 기억하자.
   - Up이 있다면 Down도 꼭 함께 있어야 한다. (생성과 이전 취소)

   - 해당 파일은 MySQL 모듈로 데이터베이스 서버와 연결하는 파일이다.

5. Controller 작성 및 Router 연결을 해주어야 한다.

- 웹 개발에 있어서 Router는 Controller로 진입할 수 있게 도와주는 Endpoint이다.
- Router에 Controller를 연결해야 한다.

6. Controller에서 여러 Endpoint에 대한 각기 다른 구현을 해야한다.
