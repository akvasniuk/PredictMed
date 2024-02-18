const {UserThread} = require('../database');

module.exports = {
    findUserThread: (userThreadParams, selected = {}) => UserThread.findOne(userThreadParams).select(selected),
    createUserThread: (userThread) => UserThread.create(userThread),
};