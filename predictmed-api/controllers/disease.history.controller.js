const axios = require("axios");

const {userService, viewService, commentService, diseaseService, diseaseHistoryService} = require("../services");
const {statusCode, successfulMessage} = require("../constants");
const {userHelper} = require("../helpers");


module.exports = {
    getDiseasesHistory: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const diseasesHistory = await diseaseHistoryService.findDiseaseHistory({userId});

            res.status(statusCode.UPDATED).json({diseasesHistory});
        } catch (e) {
            next(e);
        }
    },

    createDiseaseHistory: async (req, res, next) => {
        try {
            const {userId, diseaseId} = req.params;
            const {prediction} = req.body;

            const diseaseHistory = await diseaseHistoryService.createDiseaseHistory({userId, diseaseId, prediction});

            res.status(statusCode.UPDATED).json(diseaseHistory);
        } catch (e) {
            next(e);
        }
    },
}