const images = require('../resources/resources');

module.exports = async (req, res) => {
  // TODO : Mypage로부터 access token을 제대로 받아온 것이 맞다면, resource server의 images를 클라이언트로 보내주세요.
  // console.log(req.headers.authorization);

  /* 
    /images: 받아온 Access token을 확인한 후, local에 저장되어 있는 resource images를 클라이언트로 보내주는 라우터입니다.
  */

  // ! 방법 1.
  // if (req.headers.authorization) {
  //   res.status(200).json({images: images});
  // } else {
  //   res.status(403).json({message: 'no permission to access resources'});
  // }

  // ! 방법 2.
  if (!req.headers.authorization) {
    res.status(403).json({
      images: null,
      message: 'no permission to access resources'
    });
  } else {
    res.status(200).json({ 
      images: images,
      message: 'ok'
    });
  }
}