const express = require('express');
const router = express.Router();
const { signup, signIn, getAllUsers } = require('../Controller/authController');

router.post("/signup", signup);
router.get("/signIn", signIn);
router.get("/getAllUsers", getAllUsers);



module.exports = router;

