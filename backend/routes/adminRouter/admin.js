const router = require('express').Router();
const adminAuth = require("../../controller/admin/adminController")
const Token = require("../../middleware/Auth/Admin")
router.post('/adminVeri',Token.checkUser)
router.post('/login',adminAuth.Admin_login)
router.get('/home',adminAuth.admin_Home)
router.get('/details/:id',adminAuth.user_details)
router.patch('/editUser',adminAuth.user_edit)
router.delete('/userDelete/:id',adminAuth.user_Delete)
router.post("/addUser",adminAuth.addUser_data)

module.exports = router