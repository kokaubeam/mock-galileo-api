const express = require('express')
const router = express.Router()

router.use('/health', require('./health'))
router.use('/createAccount', require('./create-account'))
router.use('/modifyStatus', require('./modify-status'))

module.exports = router
