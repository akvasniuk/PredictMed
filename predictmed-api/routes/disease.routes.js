const router = require('express').Router();

const {commentController, diseaseController} = require('../controllers');
const {userMiddleware, authMiddleware, commentMiddleware, fileMiddleware} = require("../middlewars");

router.get('/', diseaseController.getDiseases);
router.get('/:diseaseId', diseaseController.getDisease);
router.post('/:diseaseName',
    fileMiddleware.checkFiles,
    fileMiddleware.checkImageForPrediction,
    diseaseController.predictDisease);

module.exports = router;