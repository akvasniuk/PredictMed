const {userService, viewService, userHealthService} = require("../services");
const {statusCode, successfulMessage} = require("../constants");
const {UserHealth} = require("../database");


module.exports = {
    getUserHealth: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const latestUserHealth = await userHealthService.getLatestUserHealth(userId);

            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const latestSevenDays = await userHealthService.getLatestSevenDays(userId, sevenDaysAgo);
            console.log(latestSevenDays)

            res.status(statusCode.UPDATED).json({latestUserHealth, latestSevenDays});
        } catch (e) {
            next(e);
        }
    },


    createUserHealth: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const userHealth = await userHealthService.insertUserHealth({...req.body, userId});

            res.status(statusCode.CREATED).json({userHealth});
        } catch (e) {
            next(e);
        }
    },
}