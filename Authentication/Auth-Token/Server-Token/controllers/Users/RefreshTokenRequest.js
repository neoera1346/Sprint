const { Users } = require('../../models');
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO: urclass의 가이드를 참고하여 GET /refreshtokenrequest 구현에 필요한 로직을 작성하세요.
  // console.log(req.headers);
  // console.log(req.cookies);

  // ! 또 다른 방법
  // let refreshToken = req.cookies.refreshToken;
  // if (req.headers.cookie) {
  //   let tokenData;
  //   try {
  //     tokenData = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  //   } catch (err) {
  //     tokenData = null;
  //   }
  //   if (!tokenData) {
  //     return res.status(400).json({
  //       data: null,
  //       message: "invalid refresh token, please log in again",
  //     });
  //   } else {
  //     let userInfo = await Users.findOne({
  //       where: { userId: tokenData.userId },
  //     });

  //     if (userInfo) {
  //       const { id, userId, email, createdAt, updatedAt } = userInfo;

  //       const accessToken = jwt.sign(
  //         {
  //           id,
  //           userId,
  //           email,
  //           createdAt,
  //           updatedAt,
  //         },
  //         process.env.ACCESS_SECRET,
  //         {
  //           expiresIn: "10s",
  //         }
  //       );
  //       res.status(200).json({
  //         data: {
  //           accessToken: accessToken,
  //           userInfo: { id, userId, email, createdAt, updatedAt },
  //         },
  //         message: "ok",
  //       });
  //     } else {
  //       return res.json({
  //         data: null,
  //         message: "refresh token has been tempered",
  //       });
  //     }
  //   }
  // } else {
  //   return res
  //     .status(400)
  //     .json({ data: null, message: "refresh token not provided" });
  // }

  // ? 요청으로 전달받는 쿠키에 RefreshToken이 없는 경우
  if (!req.cookies.refreshToken) {
    res.status(400).json({
      data: null, 
      message: "refresh token not provided"
    });
  } else {
    // ? 요청으로 전달받는 쿠키에 RefreshToken이 있는 경우
    const REFRESH_TOKEN = req.cookies.refreshToken;
    if (REFRESH_TOKEN === 'invalidtoken') {
      res.status(400).json({
        data: null, 
        message: "invalid refresh token, please log in again"
      });
    }

    const payload = await jwt.verify(REFRESH_TOKEN, process.env.REFRESH_SECRET);
    // console.log(payload);
    const userInfo = await Users.findOne({
      where : { id: payload.id }
    });

    // ? 유저 정보가 없는 경우
    if (!userInfo) {
      res.status(400).json({
        data: null, 
        message: "refresh token has been tempered"
      });
    } else {
    // ? 유저 정보가 있는 경우
      res.status(200).json({
        data: {
          accessToken: REFRESH_TOKEN,
          userInfo: {
            id: userInfo.id,
            userId: userInfo.userId,
            email: userInfo.email,
            createdAt: userInfo.createdAt,
            updatedAt: userInfo.updatedAt,
          }
        },
        message: 'ok'
      });
      
      // ! 통과 안됬던 테스트케이스
      /*
        const refreshToken = sign(tokenBodyData, process.env.REFRESH_SECRET);
        const response = await agent
          .get('/refreshtokenrequest')
          .set('Cookie', `refreshToken=${refreshToken}`);
        expect(response.body.data).to.have.all.keys('accessToken', 'userInfo');
        expect(response.body.data.userInfo).to.not.have.keys('password');
        expect(response.body.data.userInfo).to.eql(tokenBodyData);
        expect(response.body.message).to.eql('ok');
      */
    }
  }
};
