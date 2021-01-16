# Process

## Day One

백엔드의 Backbone인 데이터베이스를 배우게 되어서 들뜬 상태였다.
첫째날에 진행한 스프린트는 아주 간단한 MySQL Commands와 Schema 이해도를 확인하는 문제들이었다. 이 날은 페어와 둘이서 빠르고 쉽게 그리고 재미있게 풀 수 있었다.

# Day Two

둘째날은 첫날 진행했던 간단한 문제들을 서둘러 먼저 마무리를 했고, 이번 SQL 배우는 기간의 핵심인 Chatterbox Database 스프린트를 몇시간 일찍 시작할 수 있었다. 이 스프린트의 시작은 조금 헤메었지만 우선 SQL Server와 Database Server를 연결을 먼저 해주었고, 그 뒤로 Database 생성 및 Table들을 생성했다. 여기까지는 배운 SQL 문법을 사용하는 것이었고, 여기부터 진짜 index.js 파일들을 작업함으로서 라우팅에 따른 API 처리를 해주어야했다. 이 날은 우선 messages 루트의 get 메소드까지만 작업을 하게 되었다.

# Last Day

마지막 날에는 messages 루트의 post 메소드와 users 루트의 get/post 메소드 그리고 기타 수정이 필요한 파일들까지 작업하여 결국 과제를 성공적으로 마무리 할 수 있었다. 그러나, 이 날, client에서 보내는 데이터가 잘 받아와지나, messages 테이블의 username만 계속 null이 나와서 이를 해결하는데에만 몇 시간을 보내게 됬는데, 결국에는, 헬프 데스크의 엔지니어분에게 문제 원인을 확인을 받고 코드에는 문제가 없었음을 알게 되었다. 해당 스프린트에서는, client app에 해당 username으로 로그인을 했고, 그 username이 users 테이블에 등록되어있고, client app의 user 텍스트 입력창에 해당 Username을 입력해야만 데이터가 정상적으로 보여지는 것이었다. 문제가 해결되니 매우 기뻤다.
