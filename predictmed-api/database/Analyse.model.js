const {Schema, model} = require('mongoose');

const {dataBaseTablesEnum} = require('../constants/index');

const analyseSchema = new Schema({
    numberOfAnalyse: {
        type: Number,
        default: 1
    }
}, {timestamps: true});

module.exports = model(dataBaseTablesEnum.ANALYSE, analyseSchema);