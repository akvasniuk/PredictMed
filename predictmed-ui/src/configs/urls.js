const baseURL = process.env.REACT_APP_API_URL

const urls = {
    auth: {
        login: "/auth/login",
        register: "/users",
        loginGoogle: "/auth/loginGoogle",
        refresh: "/auth/refresh"
    },
    statistics: {
        getNumberOfUsers: "/statistics/totalUserStatistics",
        getNumberOfViews: "/statistics/totalViewStatistics",
        setView: "/statistics/view",
        getNumberOfUsersByMonth: "/statistics/totalUsersStatisticsByMonth",
        getNumberOfViewsByMonth: "/statistics/totalViewStatisticsByMonth",
        getNumberOfUsersByWeek: "/statistics/totalUsersStatisticsByWeek",
        getNumberOfViewsByWeek: "/statistics/totalViewStatisticsByWeek"
    },
    user: {
        userURL: "/users/"
    },
    comment: {
        commentURL: "/comments"
    }
}

export {
    baseURL,
    urls,
}