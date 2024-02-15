const {Schema, model} = require('mongoose');

const {dataBaseTablesEnum} = require('../constants/index');

const diseaseHistorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: dataBaseTablesEnum.USER,
        required: true,
    },
    diseaseId: {
        type: Schema.Types.ObjectId,
        ref: dataBaseTablesEnum.DISEASE,
        required: true
    },
    prediction: {
        type: Number,
        required: true
    },

}, {timestamps: true});

diseaseHistorySchema.pre('find', function () {
    this.populate('userId');
    this.populate('diseaseId')
});

module.exports = model(dataBaseTablesEnum.DISEASE_HISTORY, diseaseHistorySchema);