const router = require('express').Router();

const {statisticsController, userHealthController} = require("../controllers");
const {userMiddleware} = require("../middlewars");

router.get('/:userId',
    userMiddleware.isUserExists,
    userHealthController.getUserHealth);
router.post("/:userId",
    userMiddleware.isUserExists,
    userMiddleware.isUserHealthDataValid,
    userHealthController.createUserHealth);

module.exports = router;