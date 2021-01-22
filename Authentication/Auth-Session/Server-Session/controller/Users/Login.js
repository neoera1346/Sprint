const { Users } = require('../../models');

module.exports = {
    post: async(req, res) => {
        const userInfo = await Users.findOne({
            where: { userId: req.body.userId, password: req.body.password },
        });

        console.log(req.session);

        // TODO: userInfo 결과 존재 여부에 따라 응답을 구현하세요.
        // 결과가 존재하는 경우 세션 객체에 userId가 저장되어야 합니다.
        if (!userInfo) {
            // your code here
            res.status(400).json({ data: null, message: "not authorized" });
        } else {
            // your code here
            // HINT: req.session을 사용하세요.
            req.session.userId = userInfo.id;
            res.status(200).json({ data: null, message: "ok" });
        }
    }
}

/*
console.log(req)

session:
   Session {
     cookie:
      { path: '/',
        _expires: 2021-01-21T06:47:59.903Z,
        originalMaxAge: 86400000,
        httpOnly: true,
        domain: 'localhost:4000',
        sameSite: true,
        secure: true } },
*/