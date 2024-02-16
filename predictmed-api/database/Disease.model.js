const {Schema, model} = require('mongoose');

const {dataBaseTablesEnum} = require('../constants/index');

const diseaseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    apiPath: {
        type: String,
        required: true
    },
    diseases: Array,
    partsOfTheBody: Array,
    description: {
        type: String,
        required: true
    },
    fields: [{
        fieldName: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        dataType: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        constraints: Array
    }]

}, {timestamps: true});

module.exports = model(dataBaseTablesEnum.DISEASE, diseaseSchema);