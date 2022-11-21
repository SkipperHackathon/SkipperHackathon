const { Router } = require('express');
const Payment = require("../controllers/topupController")
const router = Router();


router.post("/topup", Payment.makePayment);


module.exports = router;