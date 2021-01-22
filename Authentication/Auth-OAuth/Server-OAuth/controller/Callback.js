require('dotenv').config();

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const axios = require('axios');

module.exports = async (req, res) => {
  // req의 body로 authorization code가 들어옵니다. console.log를 통해 서버의 터미널창에서 확인해보세요!
  console.log(req.body);

  // TODO : 이제 authorization code를 이용해 access token을 발급받기 위한 post 요청을 보냅니다. 다음 링크를 참고하세요.
  // https://docs.github.com/en/free-pro-team@latest/developers/apps/identifying-and-authorizing-users-for-github-apps#2-users-are-redirected-back-to-your-site-by-github

  /* 
   Parameter: client_id, client_secret, code, ...
   Client한테 Auth Code를 받아왔고, 이 코드를 OAuth Server에 보내주고,
   OAuth의 응답으로 Access token을 부여받는다.
   이 Access token을 Client에게 다시 전달한다.
  */ 

  // ! 방법 1.
  // // ! Server에서 OAuth Server로 인증 코드를 보낸다
  // axios.post("https://github.com/login/oauth/access_token", {
  //   client_id: clientID,
  //   client_secret: clientSecret,
  //   code: req.body.authorizationCode
  // })
  // .then((result) => result.data)
  // .then((data) => { 
  // // ! OAuth Server에서 토큰을 발급 받아서 Client에게 전달한다
  // res.status(200).json({accessToken: data.access_token})
  // console.log(data);
  // })

  // ! 방법 2.
  const auth = await axios.post(
    'https://github.com/login/oauth/access_token',
    { client_id: clientID, client_secret: clientSecret, code: req.body.authorizationCode }
  ).then(res => res.data);

  // console.log(auth);
  if (!auth.access_token) {
    res.status(400).json({
      accessToken: null,
      message: 'not authorized'
    })
  } else {
    res.status(200).json({ 
      accessToken: auth.access_token,
      message: 'ok' 
    });
  }
}
