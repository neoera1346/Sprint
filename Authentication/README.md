# Authentication Sprints

다음 폴더들은 HTTPS에서 여러 기반의 인증들을 구현하고 익히는 스프린트들이다.

1. Auth-Cookie
2. Auth-Session
3. Auth-Token
4. Auth-OAuth

---

# Achievement Goals

## Auth-Cookie

- 어떻게 브라우저에 쿠키가 저장되는지 이해할 수 있다.
- 브라우저에서 저장된 쿠키를 확인하는 법을 알 수 있다.
- 쿠키가 요청에 어떻게 전송되는지 이해할 수 있다.
- 전송된 쿠키를 서버에서 어떻게 조회하는지 알 수 있다.
- 네트워크 탭을 이용해 HTTP 헤더에서 다음 정보를 찾아낼 수 있다.
  - 응답을 통해 쿠키를 설정하는 것을 확인할 수 있다.
  - 요청과 함께 쿠키가 전송되는 것을 확인할 수 있다.
- 쿠키의 한계를 이해할 수 있다.
- (Advanced) 인증 외에 어떤 목적으로 쿠키가 사용되는지 알 수 있다.

## Auth-Session

- 세션의 개념을 이해할 수 있다.
- 쿠키와 세션은 서로 어떤 관계이며, 각각이 인증에 있어서 어떤 목적으로 존재하는지 이해할 수 있다.
- 세션의 한계를 이해할 수 있다.

## Auth-Token

- 토큰의 개념을 이해할 수 있다.
- 쿠키 / 세션 방식과의 차이를 이해할 수 있다.
- 토큰방식의 한계를 이해할수 있다.

**질문**

- 만료된 토큰은 어떻게 확인할 수 있을까?
- 다른 누군가가 만료된 토큰을 이용하는걸 막는 방법은 없을까?
- 만료된 토큰은 어떻게 처리해야 할까?
- 토큰이 유출되지 않았음을 확인할 수 있을까?
- 토큰을 만드는 비밀키는 주기적으로 교체해야 할까?