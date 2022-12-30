const express = require('express')
const { register, signin } = require('../controller/user.controller')

const router = express.Router()



router.route('/createUser').post(register).get(signin)
router.route('/loginAccount').post(signin).get(signin)

module.exports = router