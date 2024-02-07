const {userService, viewService} = require("../services");
const {statusCode, successfulMessage} = require("../constants");


module.exports = {
    getNumberOfUsers: async (req, res, next) => {
        try {
            const totalUsers = await userService.getNumberOfUsers();

            const currentDate = new Date();
            const lastYearDate = new Date(currentDate.getFullYear() - 1,
                currentDate.getMonth(), currentDate.getDate());

            const result = await userService.getUsersFromYear(lastYearDate);
            const totalUsersFromLastYear = result?.length > 0 ? result[0].totalUsers : 0;
            const percentage = ((totalUsers - totalUsersFromLastYear) / totalUsers) * 100;
            const totalNewUsers = totalUsers - totalUsersFromLastYear;

            res.status(statusCode.UPDATED).json({totalUsers, percentage, totalNewUsers});
        } catch (e) {
            next(e);
        }
    },


    createView: async (req, res, next) => {
        try {
            await viewService.insertView();
            res.status(statusCode.CREATED).json(successfulMessage.VIEW_CREATED);
        } catch (e) {
            next(e);
        }
    },

    getNumberOfViews: async (req, res, next) => {
        try {
            const totalViews = await viewService.totalViews();

            const currentDate = new Date();
            const lastYearDate = new Date(currentDate.getFullYear() - 1,
                currentDate.getMonth(), currentDate.getDate());

            const result = await viewService.getViewsFromYear(lastYearDate);
            const totalViewsFromLastYear = result?.length > 0 ? result[0].totalUsers : 0;
            const percentage = ((totalViews - totalViewsFromLastYear) / totalViews) * 100;
            const totalNewViews = totalViews - totalViewsFromLastYear;

            res.status(statusCode.UPDATED).json({totalViews, percentage, totalNewViews});
        } catch (e) {
            next(e);
        }
    },

    getNumberOfUsersByMonth: async (req, res, next) => {
        try {
            const currentYear = new Date(new Date().getFullYear(),
                0, 1);
            const numberOfUsersByYear = await userService.getMonthlyUserStatist(currentYear);

            res.status(statusCode.UPDATED).json(numberOfUsersByYear);
        }catch (e){
            next(e);
        }
    },

    getNumberOfViewsByMonth: async (req, res, next) => {
        try {
            const currentYear = new Date(new Date().getFullYear(),
                0, 1);
            const numberOfViewsByYear = await viewService.getMonthlyViewStatist(currentYear);

            res.status(statusCode.UPDATED).json(numberOfViewsByYear);
        }catch (e){
            next(e);
        }
    },

    getNumberOfUsersByWeek: async (req, res, next) => {
        try {
            const currentYear = new Date();
            const currentWeek = new Date(currentYear);
            currentWeek.setDate(currentYear.getDate() - currentYear.getDay());
            currentWeek.setDate(currentWeek.getDate() + 1)

            const numberOfUsersByWeek = await userService.getWeekUserStatist(currentWeek);

            res.status(statusCode.UPDATED).json(numberOfUsersByWeek);
        }catch (e){
            next(e);
        }
    },

    getNumberOfViewsByWeek: async (req, res, next) => {
        try {
            const currentYear = new Date();
            const currentWeek = new Date(currentYear);
            currentWeek.setDate(currentYear.getDate() - currentYear.getDay());
            currentWeek.setDate(currentWeek.getDate() + 1)

            const numberOfViewsByWeek = await viewService.getWeekViewStatist(currentWeek);

            res.status(statusCode.UPDATED).json(numberOfViewsByWeek);
        }catch (e){
            next(e);
        }
    },
}