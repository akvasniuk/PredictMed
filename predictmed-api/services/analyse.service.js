const {Analyse} = require('../database');

module.exports = {
    insertAnalyse: () => Analyse.create({numberOfAnalyse: 1}),
    totalAnalysis: () => Analyse.countDocuments(),
    getAnalysisFromYear: (lastYearDate) => Analyse.aggregate([
        {
            $match: {
                createdAt: {$lte: lastYearDate},
            },
        },
        {
            $group: {
                _id: null,
                totalAnalyse: {$sum: 1}
            }
        }
    ]),
}