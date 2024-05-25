const AuthService = require('../services/AuthService');

class AuthController {
    async registration(req, res, next) {
        try {
          
            const {email, password} = req.body
            const userData = await AuthService.registration(email, password)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24* 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)  
        } catch (error) {
            next(error)
        }
        
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await AuthService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                httpOnly: true,
                sameSite: 'strict', 
                secure: true
            })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }


    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const token = await AuthService.logout(refreshToken);
            res.clearCookie('refreshToken');
            await AuthService.logout(refreshToken)
            res.json(200)
        } catch (error) {
            next(error)
        }

    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await AuthService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                httpOnly: true,
                sameSite: 'strict', 
                secure: true
            })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();
