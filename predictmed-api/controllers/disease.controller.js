const axios = require("axios");

const {userService, viewService, commentService, diseaseService} = require("../services");
const {statusCode, successfulMessage} = require("../constants");
const {userHelper} = require("../helpers");


module.exports = {
    getDiseases: async (req, res, next) => {
        try {
            const {page = 1, perPage = 5} = req.query;

            const diseasesCount = await diseaseService.countDisease();
            const diseases = await diseaseService.getDiseases(+page, +perPage);

            res.status(statusCode.UPDATED).json({
                diseases,
                page: +page,
                pages: diseasesCount ? Math.ceil(diseasesCount / perPage) : 1
            });
        } catch (e) {
            next(e);
        }
    },

    getDisease: async (req, res, next) => {
        try {
            const {diseaseId} = req.params;
            const disease = await diseaseService.findDisease({_id: diseaseId}, {apiPath: 0, __v: 0});

            res.status(statusCode.UPDATED).json({disease});
        } catch (e) {
            next(e);
        }
    },

    predictDisease: async (req, res, next) => {
        try {
            const {diseaseName} = req.params;
            const bodyData = req.body;
            const disease = await diseaseService.findDisease({name: diseaseName}, {__v: 0});
            const {imagePrediction} = req;
            let responseData;

            if (imagePrediction) {
                const formData = new FormData();
                const fileBlob = new Blob([imagePrediction.data], { type: imagePrediction.mimetype })
                formData.append("file", fileBlob, imagePrediction.name);
                const {data} = await axios.post(disease.apiPath, formData);
                responseData = data;
            } else {
                const {data} = await axios.post(disease.apiPath, bodyData)
                responseData = data;
            }

            res.status(statusCode.UPDATED).json(responseData);
        } catch (e) {
            next(e);
        }
    },
}