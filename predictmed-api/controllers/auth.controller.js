const {statusCode, successfulMessage} = require('../constants');
const {OAuth} = require('../database');
const {authHelper, passwordHelper} = require('../helpers');
const {userHelper} = require('../helpers');
const {mailService, userService} = require('../services');
const {
    emailActionsEnum: {WELCOME},
    emailActionImage: {REGISTER_IMAGE}
} = require('../constants');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {_id} = req.user;

            const tokenPair = authHelper.generateTokenPair();

            await OAuth.updateOne({user: _id}, {...tokenPair});

            const normalizedUser = userHelper.userNormalizator(req.user.toJSON());

            res.status(statusCode.UPDATED).json({...tokenPair, user: normalizedUser});
        } catch (e) {
            next(e);
        }
    },

    loginGoogle: async (req, res, next) => {
        try {
            const {userInfo} = req;

            const user = {
                firstname: userInfo?.given_name,
                lastname: userInfo?.family_name,
                email: userInfo?.email,
                isUserActivated: true,
                avatar: userInfo?.picture
            }

            const hashedPassword = await passwordHelper.hash(userInfo?.picture);
            const insertedUser = await userService.insertUser({...user, password: hashedPassword});
            await OAuth.create({user: insertedUser._id});

            const tokenPair = authHelper.generateTokenPair();

            await OAuth.updateOne({user: insertedUser._id}, {...tokenPair});

            const normalizedUser = userHelper.userNormalizator(insertedUser.toJSON());

            res.status(statusCode.UPDATED).json({...tokenPair, user: normalizedUser});
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {accessToken} = req.user;
            const {userId} = req.params;

            await OAuth.deleteOne({accessToken});

            onlineUsers.delete(userId);

            res.status(statusCode.DELETED).json(successfulMessage.SUCCESSFUL_LOGOUT);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {user: {_id}, refreshToken, user} = req.user;

            const tokenPair = authHelper.generateTokenPair();

            await OAuth.remove({refreshToken});
            await OAuth.create({...tokenPair, user: _id});

            res.status(statusCode.UPDATED).json({...tokenPair, user});
        } catch (e) {
            next(e);
        }
    },

    activate: async (req, res, next) => {
        try {
            const {email, name, _id} = req.user;

            await userService.updateUser({_id}, {isUserActivated: true});
            await mailService.sendMail(email, WELCOME, {userName: name, img: REGISTER_IMAGE});

            res.status(statusCode.UPDATED).json(successfulMessage.ACCOUNT_SUCCESSFUL_ACTIVATED);
        } catch (e) {
            next(e);
        }
    },

    changePassword: (req, res, next) => {
        try {
            const {tokenObject: {passwordToken}} = req;

            res.status(statusCode.UPDATED).json({changeTokenPassword: passwordToken});
        } catch (e) {
            next(e);
        }
    }
};
