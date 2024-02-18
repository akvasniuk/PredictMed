const {Schema, model} = require('mongoose');

const {dataBaseTablesEnum} = require('../constants/index');

const userThreadSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: dataBaseTablesEnum.USER,
        required: true,
    },
    threadId: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = model(dataBaseTablesEnum.USER_THREAD, userThreadSchema);