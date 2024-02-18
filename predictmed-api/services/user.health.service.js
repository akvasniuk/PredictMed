const {UserHealth} = require('../database');
const {Types} = require("mongoose");

module.exports = {
    insertUserHealth: (data) => UserHealth.create(data),
    getLatestUserHealth: (userId) => UserHealth.findOne({userId})
        .sort({createdAt: -1})
        .limit(1),
    getLatestSevenDays: (userId, daysAgo) => UserHealth.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: daysAgo,
                    $lte: new Date()
                },
                userId: new Types.ObjectId(userId)
            },
        },
        {
            $sort: {createdAt: -1}
        },
        {
            $group: {
                _id: {
                    year: { $year: { date: '$createdAt', timezone: 'UTC' } },
                    month: { $month: { date: '$createdAt', timezone: 'UTC' }},
                    day: { $dayOfMonth: { date: '$createdAt', timezone: 'UTC' } }
                },
                latestRecord: { $first: '$$ROOT' }
            }
        },
        {
            $replaceRoot: { newRoot: '$latestRecord' }
        }
    ])
}