const router = require('express').Router();
const AuthRouter = require('../../controller/user/AuthController');
const Token = require('../../middleware/Auth/Token')
const upload = require('../../middleware/multer/multer')
router.post('/',Token.checkUser)
router.post('/signup',AuthRouter.Signup_page)
router.post('/login',AuthRouter.login_page)
router.post('/profile/:id',upload.single("photo"),AuthRouter.profile_page)
router.post('/uploadImage',AuthRouter.upload_Image)

module.exports = router