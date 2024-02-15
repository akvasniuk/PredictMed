const router = require('express').Router();

const {commentController, diseaseController, diseaseHistoryController} = require('../controllers');
const {userMiddleware, authMiddleware, commentMiddleware} = require("../middlewars");

router.get('/:userId',
    userMiddleware.isUserExists,
    diseaseHistoryController.getDiseasesHistory);
router.post('/:userId/:diseaseId',
    userMiddleware.isUserExists,
    diseaseHistoryController.createDiseaseHistory);

module.exports = router;