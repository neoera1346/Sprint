const { Users } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async(req, res) => {
    // TODO: urclass의 가이드를 참고하여 POST /login 구현에 필요한 로직을 작성하세요.

    let userInfo = await Users.findOne({
        where: { userId: req.body.userId, password: req.body.password },
    })

    // ? DB에 유저 정보가 없는 경우
    if (!userInfo) {
        res.status(400).json({
            data: null,
            message: 'not authorized'
        });
    } else {
        // ? DB에 유저 정보가 있는 경우
        // Create Token: jwt.sign(payload, secretOrPrivateKey, [options, callback])
        // ? RefreshToken 생성용
        const refreshPayload = {
            id: userInfo.id,
            userId: userInfo.userId,
            email: userInfo.email,
            createdAt: userInfo.createdAt,
            updatedAt: userInfo.updatedAt,
            iat: Math.floor(Date.now() / 1000) - 30, // backdate a jwt 30 seconds
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hour of expiration
        };
        const REFRESH_TOKEN = await jwt.sign(refreshPayload, process.env.REFRESH_SECRET);
        res.cookie('refreshToken', REFRESH_TOKEN, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        // ? AccessToken 생성용
        const accessPayload = {
            id: userInfo.id,
            userId: userInfo.userId,
            email: userInfo.email,
            createdAt: userInfo.createdAt,
            updatedAt: userInfo.updatedAt,
            iat: Math.floor(Date.now() / 1000) - 30, // backdate a jwt 30 seconds
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour of expiration
        };
        const ACCESS_TOKEN = await jwt.sign(accessPayload, process.env.ACCESS_SECRET);
        res.status(200).json({ data: { accessToken: ACCESS_TOKEN }, message: 'ok' })
    }

    // ! 또 다른 방법
    // if (userInfo) {
    //     const { id, userId, email, createdAt, updatedAt } = userInfo;
    //     const accessToken = jwt.sign({
    //             id,
    //             userId,
    //             email,
    //             createdAt,
    //             updatedAt,
    //         },
    //         process.env.ACCESS_SECRET, {
    //             expiresIn: "15s",
    //         }
    //     );

    //     const refreshToken = jwt.sign({
    //             id,
    //             userId,
    //             email,
    //             createdAt,
    //             updatedAt,
    //         },
    //         process.env.REFRESH_SECRET, {
    //             expiresIn: "7d",
    //         }
    //     );

    //     res.cookie("refreshToken", refreshToken, {
    //         httpOnly: true,
    //         sameSite: 'none',
    //         secure: true
    //     })

    //     res.json({ data: { accessToken }, message: "ok" });
    // } else {
    //     res.status(400).json({ data: null, message: "not authorized" });
    // }

    // 일치하는 유저가 없을 경우
    // 로그인 요청을 거절

    // 일치하는 우저가 있을 경우
    // 필요 데이터를 담은 두 종류의 JWT를 생성
    // 생성한 JWT를 적절한 방법으로 반환
};