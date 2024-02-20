const {DiseaseHistory} = require('../database');

module.exports = {
    findDiseaseHistory: (diseaseParam, selected = {}) => DiseaseHistory.find(diseaseParam).select(selected),
    createDiseaseHistory: (diseaseHistory) => DiseaseHistory.create(diseaseHistory),
    getDiseasesFromYear: (lastYearDate) => DiseaseHistory.aggregate([
        {
            $match: {
                createdAt: {$lte: lastYearDate},
            },
        },
        {
            $group: {
                _id: null,
                totalPredictions: {$sum: 1}
            }
        }
    ]),
    getTotalDiseases: () => DiseaseHistory.countDocuments(),

    getWeekDiseaseStatist: (currentWeek) => DiseaseHistory.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(currentWeek),
                },
            },
        },
        {
            $group: {
                _id: {
                    week: {$week: '$createdAt'},
                    day: {$dayOfWeek: '$createdAt'}
                },
                count: {$sum: 1},
            },
        },
        {
            $sort: {'_id': 1}
        },
    ]),

};
