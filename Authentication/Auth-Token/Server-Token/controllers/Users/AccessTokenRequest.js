const { Users } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  // TODO: urclass의 가이드를 참고하여 GET /accesstokenrequest 구현에 필요한 로직을 작성하세요.
  // console.log(req.headers); => { authorization: "Bearer <ACCESS_TOKEN>", ... }
  if (!req.headers.authorization) {
    res.status(400).json({
      data: null,
      message: 'invalid access token'
    });
  }
  console.log(req.headers)
  
  const ACCESS_TOKEN = req.headers.authorization.split(' ')[1];
  const payload = await jwt.verify(ACCESS_TOKEN, process.env.ACCESS_SECRET);
  // console.log(payload);
  const userInfo = await Users.findOne({
    where: { id: payload.id }
  });
  // console.log(userInfo);

  if (!userInfo) {
    res.status(400).json({
      data: null,
      message: 'access token has been tempered'
    });
  } else {
    res.status(200).json({
      data: {
        userInfo: {
          id: userInfo.id,
          userId: userInfo.userId,
          email: userInfo.email,
          createdAt: userInfo.createdAt,
          updatedAt: userInfo.updatedAt,
        },
      },
      message: 'ok'
    });
  }
};
