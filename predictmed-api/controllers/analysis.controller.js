const {commentService} = require("../services");
const {statusCode, constants} = require("../constants");
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: constants.OPENAI_API_KEY
});

module.exports = {
    analyse: async (req, res, next) => {
        try {
            const {diseaseName} = req.params;

            const chatCompletion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {role: 'user', content: `Give the analyse of the ${diseaseName} disease`}
                ]
            })

            res.status(statusCode.CREATED).json({analyse: chatCompletion.choices[0].message.content});
        } catch (e) {
            next(e);
        }
    },

}