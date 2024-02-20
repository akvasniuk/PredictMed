const baseURL = process.env.REACT_APP_API_URL

const urls = {
    auth: {
        login: "/auth/login",
        register: "/users",
        loginGoogle: "/auth/loginGoogle",
        refresh: "/auth/refresh",
        logout: "/auth/logout"
    },
    statistics: {
        getNumberOfUsers: "/statistics/totalUserStatistics",
        getNumberOfViews: "/statistics/totalViewStatistics",
        getNumberOfPredictions: "/statistics/totalPredictionStatistics",
        getNumberOfAnalysis: "/statistics/totalAnalysisStatistics",
        setView: "/statistics/view",
        getNumberOfUsersByMonth: "/statistics/totalUsersStatisticsByMonth",
        getNumberOfViewsByMonth: "/statistics/totalViewStatisticsByMonth",
        getNumberOfUsersByWeek: "/statistics/totalUsersStatisticsByWeek",
        getNumberOfViewsByWeek: "/statistics/totalViewStatisticsByWeek",
        getNumberOfPredictionsByWeek: "/statistics/totalPredictionStatisticsByWeek",
    },
    user: {
        userURL: "/users/",
        userHealthURL: '/health'
    },
    comment: {
        commentURL: "/comments"
    },
    chat: {
        addMessage: '/chat/postMessage',
        getMessages: '/chat/getMessages'
    },
    disease: {
        diseaseURL: "/diseases",
        analyseURL: "/analysis",
        diseasesHistoryURL: "/diseasesHistory",
    }
}

export {
    baseURL,
    urls,
}