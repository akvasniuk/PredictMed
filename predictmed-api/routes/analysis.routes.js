const {chatController, analysisController} = require("../controllers");
const {userMiddleware, authMiddleware} = require("../middlewars");

const router = require('express').Router();

router.post('/diseases/:diseaseName', analysisController.analyse);
router.get('/userThread/:userId',
    userMiddleware.isUserExists,
    analysisController.getUserThread);
router.post('/run/:threadId', analysisController.createRun);
router.get('/run/:threadId/:runId', analysisController.retrieveRun);
router.get('/messages/:threadId', analysisController.getMessages);
router.post('/messages/create/:threadId', analysisController.createMessage);

module.exports = router;