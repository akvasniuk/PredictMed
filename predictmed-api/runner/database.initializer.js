const {Disease} = require('../database');
const {errorMessage, ErrorHandler} = require("../error");
const {constants} = require("../constants");
const {textDiseases} = require("./text.diseases");

module.exports = {
    initializeDatabase: async () => {
        try {
            const existingDisease = await Disease.find();
            if (existingDisease.length > 0) {
                console.log('Disease already exist. Skipping database initialization.');
                return;
            }

            await Disease.create(textDiseases);

            console.log('Database initialized.');
        } catch (error) {
            throw new ErrorHandler(error, errorMessage.UNKNOWN_ERROR.message, errorMessage.UNKNOWN_ERROR.code)
        }
    }
}