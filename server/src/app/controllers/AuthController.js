const User = require('../../model/User');
const jwtUtil = require('../util/jwt');
const argon2 = require('argon2');


class AuthController {

    //[POST] /auth/login
    //Public
    async login(req, res, next) {
        await User.findOne({ username: req.body.username })
            .then(async user => {
                if (!user) {
                    return res.json({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không chính xác' })
                }
                const verify = await argon2.verify(user.password, req.body.password)
                if (!verify) {
                    return res.json({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không chính xác' })
                }
                const accessTokenSecret = process.env.secret
                const accessRefreshSecret = process.env.secretRefresh
                const refreshTokenLife = process.env.tokenRefreshLife
                const tokenLife = process.env.tokenLife

                const accessToken = await jwtUtil.generateToken({ username: user.username }, accessTokenSecret, tokenLife)
                const refreshToken = await jwtUtil.generateToken({ username: user.username }, accessRefreshSecret, refreshTokenLife)
                res.cookie('access', accessToken, { signed: true })
                res.cookie('refresh', refreshToken, { signed: true })
                return res.json({
                    success: true,
                    message: 'Đăng nhập thành công',
                    info: {
                        username: user.username,
                        id: user._id
                    }
                })
            })
            .catch(error => { console.log(error) })
    }



    //[POST] /auth/signup
    //Public
    async signup(req, res, next) {
        const password = await argon2.hash(req.body.password, {
            type: argon2.argon2id
        })

        return await User.create({
            username: req.body.username,
            password: password
        })
            .then(() => res.json({ success: true, message: 'Đăng ký thành công' }))
            .catch(() => res.json({ success: false, message: 'Tên đăng nhập đã tồn tại' }))
    }

    //[GET] /auth/logout
    //Public
    async logout(req, res, next) {
        try {
            req.session.destroy()
            res.clearCookie("access", { path:'/' })
            res.clearCookie("refresh", { path:'/' })
            return res.json({ success: true, message: "logout thành công" })
        }
        catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: error })
        }
    }

    
    //[GET] /auth
    //public
    async auth(req, res, next) {
        const accessTokenSecret = process.env.secret
        const accessRefreshSecret = process.env.secretRefresh
        const refreshTokenLife = process.env.tokenRefreshLife
        const tokenLife = process.env.tokenLife
        const tokenFromClient = req.signedCookies['access']
        const tokenRefreshFromClient = req.signedCookies['refresh']

        if (tokenFromClient && tokenRefreshFromClient) {
            try {
                const refreshDecoded = await jwtUtil.verifyToken(tokenRefreshFromClient, accessRefreshSecret, { ignoreExpiration: true })
                const expNow = Math.floor(Date.now() / 1000)
                if (refreshDecoded.exp < expNow) {
                    return res.json({ success: false, message: "token hết hạn" })
                }
                const decoded = await jwtUtil.verifyToken(tokenFromClient, accessTokenSecret, { ignoreExpiration: true })
                if (decoded.exp < expNow) {
                    const accessToken = await jwtUtil.generateToken({ username: decoded.data.username }, accessTokenSecret, tokenLife)
                    const refreshToken = await jwtUtil.generateToken({ username: decoded.data.username }, accessRefreshSecret, refreshTokenLife)
                    res.cookie('refresh', refreshToken, { signed: true })
                    res.cookie('access', accessToken, { signed: true })
                }
                const user = await User.findOne({ username: decoded.data.username })
                return res.json({
                    success: true,
                    message: "đăng nhập thành công",
                    info: {
                        username: user.username,
                        id: user._id
                    }
                })
            }
            catch (error) {
                return res.json({ success: false, message: error })
            }

        } else {
            // Không tìm thấy token trong request
            /*  res.clearCookie('auth-token')
             res.clearCookie('auth-refresh-token') */
            return res.json({ success: false, message: "không tìm thấy hoặc token không hợp lệ" })
        }
    }
}

module.exports = new AuthController