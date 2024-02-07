const router = require('express').Router();

const {statisticsController} = require("../controllers");

router.get('/totalUserStatistics', statisticsController.getNumberOfUsers);
router.post("/view", statisticsController.createView);
router.get("/totalViewStatistics", statisticsController.getNumberOfViews);
router.get("/totalUsersStatisticsByMonth", statisticsController.getNumberOfUsersByMonth);
router.get("/totalViewStatisticsByMonth", statisticsController.getNumberOfViewsByMonth);
router.get("/totalUsersStatisticsByWeek", statisticsController.getNumberOfUsersByWeek);
router.get("/totalViewStatisticsByWeek", statisticsController.getNumberOfViewsByWeek);

module.exports = router;