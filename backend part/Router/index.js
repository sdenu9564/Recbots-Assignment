const express = require('express');
const usercontroller = require('../Controller/user');

const router = express.Router();

router.post('/usersingup',usercontroller.usersingup);
router.post('/userlogin',usercontroller.userlogin);
router.post('/upgradeplan',usercontroller.upgrade);

module.exports = router;

