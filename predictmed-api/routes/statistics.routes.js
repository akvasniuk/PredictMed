const router = require('express').Router();

const {statisticsController} = require("../controllers");

router.get('/totalUserStatistics', statisticsController.getNumberOfUsers);
router.get("/totalViewStatistics", statisticsController.getNumberOfViews);
router.get("/totalPredictionStatistics", statisticsController.getNumberOfPredictions);
router.get("/totalAnalysisStatistics", statisticsController.getNumberOfAnalysis);
router.post("/view", statisticsController.createView);
router.get("/totalUsersStatisticsByMonth", statisticsController.getNumberOfUsersByMonth);
router.get("/totalViewStatisticsByMonth", statisticsController.getNumberOfViewsByMonth);
router.get("/totalUsersStatisticsByWeek", statisticsController.getNumberOfUsersByWeek);
router.get("/totalViewStatisticsByWeek", statisticsController.getNumberOfViewsByWeek);
router.get("/totalPredictionStatisticsByWeek", statisticsController.getNumberOfPredictionsByWeek);

module.exports = router;