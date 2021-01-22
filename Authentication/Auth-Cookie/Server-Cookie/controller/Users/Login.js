const { Users } = require('../../models');

module.exports = {
  post: async (req, res) => {
    // 데이터베이스에 해당되는 유저정보가 없는 경우에 대한 에러 핸들링,
    // 유저정보가 데이터베이스에 존재하는 경우에 대하여 응답에 쿠키를 설정하기
    // console.log(userInfo);
    // const { userId, password } = req.body;

    let userInfo = await Users.findOne({
      where: { userId: req.body.userId, password: req.body.password },
    })
    
    let obj = {};
    obj.data = null;

    if (userInfo) { // 유저 정보가 DB에 있는 경우
      obj.message = "ok";
      res.cookie("id", userInfo.id, {
        domain:"localhost",
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(200).json(obj);
    } else { // 없는 경우
      obj.message = "not authorized";
      res.status(400).json(obj);
    }

    // console.log(res);

    /**
     * ! 단계2. 유어클래스를 참고하여 로그인 로직을 구현하세요.
     * HINT: userInfo에는 이미 데이터베이스에 데이터 요청을 한 결과가 존재합니다.
     * 한번 콘솔에 userInfo를 출력해 보세요. 빈객체가 출력된다면 클라이언트가 전달해준 유저정보, 데이터베이스를 확인해 보세요.
     * 이후 controller/users/userinfo.js에서 다음 단계를 진행합니다.
     */
  },
};
