const {chatController, analysisController} = require("../controllers");
const {userMiddleware, authMiddleware} = require("../middlewars");

const router = require('express').Router();

router.post('/:diseaseName',
    analysisController.analyse);

module.exports = router;