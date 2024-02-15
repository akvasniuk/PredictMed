const {Disease} = require('../database');

module.exports = {
    findDisease: (diseaseParam, selected = {}) => Disease.findOne(diseaseParam)
        .select(selected),
    countDisease: () => Disease.countDocuments(),
    getDiseases: (page, perPage) =>
        Disease.find()
            .limit(perPage)
            .skip(perPage * (page - 1))
            .sort({createdAt: 'desc'})
            .select({__v: 0, apiPath: 0})
};
