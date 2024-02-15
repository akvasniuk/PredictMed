const router = require('express').Router();

const {commentController, diseaseController} = require('../controllers');
const {userMiddleware, authMiddleware, commentMiddleware} = require("../middlewars");

router.get('/', diseaseController.getDiseases);
router.get('/:diseaseId', diseaseController.getDisease);
router.post('/:diseaseName', diseaseController.predictDisease);

module.exports = router;