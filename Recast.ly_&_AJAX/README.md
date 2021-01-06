# Recast.ly

지난 스프린트의 목표는, 실제 데이터를 이용하지는 않지만, 컴포넌트간의 상호작용을 구현해내는 것이었다.

이번에 주어진 임무는 YouTube Data API의 데이터를 AJAX로 호출하여 연결하고 이 애플리케이션을 가짜 데이터가 아닌 실제 데이터로 사용하는 것이다.

다음은 추가적으로 구현하고, 변경해야할 웹앱의 컴포넌트들이다.

- App - 전체 애플리케이션의 최상위 컨테이너입니다. 이 컴포넌트는 DOM에 직접 렌더링될 것입니다.
- Nav - 상단 내비게이션 바에 대한 컨테이너 컴포넌트입니다.
- Search - 검색 입력 필드(`<input>`)에 대한 정보를 알고 전달해야 합니다.
- LoadingIndicator - fetch가 완료될 때까지 화면에 로딩을 표시해주는 컴포넌트다.

이외의 컴포넌트들은 이전의 스프린트인 Recast.ly에서 그대로 가져온다.

**이번 시간에 Bottom-up, 즉 컴포넌트부터 만들고 조립하는 상향식 개발을 진행할 것이다.**

---

## TODO

- recast.ly 앱에서 네트워크 요청을 보내고, 요청에 따른 응답을 결과 목록에 적용시킨다.
- 실제 YouTube 검색을 위해 YouTube Data API를 recast.ly 앱에 연결합니다.

1. 각각의 함수와 컴포넌트 구현을 완료해야 한다.

2. Youtube API를 발급 받아 기존에 사용되던 fakedata를 대체한다.

   - [Youtube API 발급 받는 방법](https://console.developers.google.com/apis/library?folder=&organizationId=&project=youtube-api-300814)

3. '네트워크 요청(fetch와 같은 AJAX 요청)에 따른 응답에 목록이 전송되는 중'에는 로딩 화면을 띄워줘야 한다.
