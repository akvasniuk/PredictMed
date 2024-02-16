const {Disease} = require('../database');
const {errorMessage, ErrorHandler} = require("../error");
const {constants} = require("../constants");
const {textDiseases} = require("./text.diseases");
const {imageDiseases} = require("./image.diseases");

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

module.exports = {
    initializeDatabase: async () => {
        try {
            const existingDisease = await Disease.find();
            if (existingDisease.length > 0) {
                console.log('Disease already exist. Skipping database initialization.');
                return;
            }

            const diseases = [...textDiseases, ...imageDiseases];
            const shuffledDiseases = shuffleArray(diseases);

            await Disease.create(shuffledDiseases);

            console.log('Database initialized.');
        } catch (error) {
            throw new ErrorHandler(error, errorMessage.UNKNOWN_ERROR.message, errorMessage.UNKNOWN_ERROR.code)
        }
    }
}