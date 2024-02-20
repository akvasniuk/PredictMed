const {commentService, userThreadService, analyseService} = require("../services");
const {statusCode, constants} = require("../constants");
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: constants.OPENAI_API_KEY
});

module.exports = {
    analyse: async (req, res, next) => {
        try {
            const {diseaseName} = req.params;
            await analyseService.insertAnalyse();

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

    getUserThread: async (req, res, next) => {
        try {
            const {userId} = req.params;

            let userThread = await userThreadService.findUserThread({userId});

            if (!userThread) {
                const thread = await openai.beta.threads.create();
                userThread = await userThreadService.createUserThread({
                    userId,
                    threadId: thread.id,
                })
            }

            res.status(statusCode.CREATED).json({userThread});
        } catch (e) {
            next(e);
        }
    },
    createRun: async (req, res, next) => {
        try {
            const {threadId} = req.params;

            const run = await openai.beta.threads.runs.create(threadId, {
                assistant_id: constants.ASSISTANT_API_ID
            });

            res.status(statusCode.CREATED).json({run});
        } catch (e) {
            next(e);
        }
    },

    retrieveRun: async (req, res, next) => {
        try {
            const {threadId, runId} = req.params;

            const run = await openai.beta.threads.runs.retrieve(threadId, runId);

            res.status(statusCode.CREATED).json({run});
        } catch (e) {
            next(e);
        }
    },

    getMessages: async (req, res, next) => {
        try {
            const {threadId} = req.params;
            const response = await openai.beta.threads.messages.list(threadId);

            res.status(statusCode.CREATED).json({messages: response.data});
        } catch (e) {
            next(e);
        }
    },
    createMessage: async (req, res, next) => {
        try {
            const {threadId} = req.params;
            const {message, fromUser = false} = req.body;

            const threadMessage = await openai.beta.threads.messages.create(threadId, {
                role: "user",
                content: message,
                metadata: {
                    fromUser
                }
            });

            res.status(statusCode.CREATED).json({message: threadMessage});
        } catch (e) {
            next(e);
        }
    },

}