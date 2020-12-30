/*************************************************************

request handler 함수를 여기서 작성합니다.

reuqestHandler 함수는 이미 basic-server.js 파일에서 사용 했지만, 아직 작동하지 않습니다.

requestHandler 함수를 export 하여 basic-server.js 에서 사용 할 수 있게 하세요

**************************************************************/

let returnValue = { results: [] };

var id = 0;

const requestHandler = function (request, response) {
  // if get
  const headers = defaultCorsHeaders;
  // 응답 헤더에 응답하는 컨텐츠의 자료 타입을 헤더에 기록 합니다.
  // 200 create
  function change(base, body) {
    base.username = body.username;
    base.text = body.text;
    base.roomname = body.roomname;
    base.id = id;
    base.date = new Date();
    return base;
  }

  let basicFormat = {
    username: undefined,
    roomname: undefined,
    text: undefined,
    data: undefined,
    id: undefined,
  };

  let body = [];

  if (request.method === "GET") {
    if (request.url === "/messages") {
      response.writeHead(200, headers);
      response.end(JSON.stringify(returnValue));
    } else {
      response.writeHead(404, headers);
      response.end("No such URL found");
    }
  } else if (request.method === "POST") {
    if (request.url === "/messages") {
      request.on("data", (chunk) => {
        body.push(chunk);
      });
      request.on("end", () => {
        body = Buffer.concat(body).toString();
        body = JSON.parse(body);
        returnValue.results.push(change(basicFormat, body));
        // let number = id;
        // id++;
        response.writeHead(201, headers);
        response.end(JSON.stringify({ basicFormat }));
      });
    } else {
      response.writeHead(404, headers);
      response.end("No such URL found");
    }
  } else {
    response.writeHead(200, headers);
    response.end("Only valid method is POST");
  }
  //else
  //404 요청을 하고
  // response.end();
  // node server 의 requestHandler는 항상 request, response를 인자로 받습니다.
  // 또한 http 요청은 항상 요청과 응답이 동반 되어야 합니다.
  //
  // 이것들은 요청에 대한 정보를 담고 있습니다. 예를들면, 요청 url과 method 등을 담고 있습니다.
  //
  // 기본적인 로그를 작성 하세요
  //
  // 간단한 로그를 작성 하는 것은, 서버를 디버깅 하는데 매우 수월하게 해줍니다.
  // 아래는 모든 리퀘스트의 메소드와 url을 로깅 해줍니다.
  /* eslint no-console: 0 */

  console.log(
    "Serving request type " + request.method + " for url " + request.url
  );
  // 기본 CORS 설정이 되어있는 코드 입니다. 아래에 있습니다.
  // CORS에 대해서는 조금더 알아보세요.
  // .writeHead() 메소드의 두번째 인자로는 응답 헤더와 키와 값을 객체 형태로 적어줍니다.
  // 노드 서버에 대한 모든 요청은 응답이 있어야 합니다. response.end 메소드는 요청에 대한 응답을 보내줍니다.
  headers["Content-Type"] = "text/plain";
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
const defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
};
module.exports = requestHandler;
