const {User} = require('../database');

module.exports = {
    getAllUsers: () => User.find({deleted: false}),
    getAllUsersByParam: (userId, isAdmin) => User.find({
        _id: {$ne: userId},
        role: isAdmin ? "ADMIN" : "USER",
        deleted: false
    }).select([
        "firstname",
        "lastname",
        "avatar",
        "_id"
    ]),

    insertUser: (user) => User.create(user),

    findUser: (userParam) => User.findOne({...userParam, deleted: false}),

    updateUser: (user, updatedUser) => User.updateOne(user, updatedUser),

    deleteUser: (user) => Object.assign(user, {deleted: true, deletedAt: Date.now()}),

    findUserByEmail: (email) => User.findOne({email, deleted: false}),

    getUsersFromYear: (lastYearDate) => User.aggregate([
        {
            $match: {
                createdAt: {$lte: lastYearDate},
            },
        },
        {
            $group: {
                _id: null,
                totalUsers: {$sum: 1}
            }
        }
    ]),

    getNumberOfUsers: () => User.countDocuments(),

    getMonthlyUserStatist: (currentYear) => User.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(currentYear),
                },
            },
        },
        {
            $group: {
                _id: {
                    year: {$year: '$createdAt'},
                    month: {$month: '$createdAt'}
                },
                count: {$sum: 1},
            },
        },
        {
            $sort: {'_id': 1}
        },
    ]),

    getWeekUserStatist: (currentWeek) => User.aggregate([
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
