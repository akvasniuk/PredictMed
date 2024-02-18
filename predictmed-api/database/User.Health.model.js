const {Schema, model} = require('mongoose');

const {dataBaseTablesEnum} = require('../constants/index');

const userHealthSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: dataBaseTablesEnum.USER,
        required: true,
    },
    glucoseLevel: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    bloodPressure: {
        type: String,
        required: true
    },
    stepCount: {
        type: Number,
        required: true
    },
    heartRate: {
        type: Number,
        required: true
    },
    bodyFat: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = model(dataBaseTablesEnum.USER_HEALTH, userHealthSchema);