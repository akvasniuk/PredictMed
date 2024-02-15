const {DiseaseHistory} = require('../database');

module.exports = {
    findDiseaseHistory: (diseaseParam, selected = {}) => DiseaseHistory.find(diseaseParam).select(selected),
    createDiseaseHistory: (diseaseHistory) => DiseaseHistory.create(diseaseHistory),
};
