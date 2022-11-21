const { Router } = require('express');
const transfer = require("../controllers/transferController");
const router = Router();



router.post("/transfer", transfer.sendMoney);


module.exports = router;