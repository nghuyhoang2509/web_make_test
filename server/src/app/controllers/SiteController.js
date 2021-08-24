const jwtUtil = require('../util/jwt')
class SiteController{

    //[GET] /
    async index(req,res,next){
        const accessToken = req.signedCookies['auth-token']
        if (!accessToken){
            return res.json({hello:"hello"}) 
        }
        try{
            await jwtUtil.verifyToken(accessToken,process.env.secret)
        }
        catch(error){
            return res.render('auth/login',{layout: 'login'})
        }
        return res.send('homeerror')
    }


}

module.exports = new SiteController