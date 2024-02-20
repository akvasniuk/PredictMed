import {axiosService} from "./axios.service";

import {urls} from "../configs";

const statisticsService = {
    getNumberOfUsers: () => axiosService.get(urls.statistics.getNumberOfUsers),
    getNumberOfViews: () => axiosService.get(urls.statistics.getNumberOfViews),
    getNumberOfPredictions: () => axiosService.get(urls.statistics.getNumberOfPredictions),
    getNumberOfAnalysis: () => axiosService.get(urls.statistics.getNumberOfAnalysis),
    setView: () => axiosService.post(urls.statistics.setView, null),
    getNumberOfUsersByMonth: () => axiosService.get(urls.statistics.getNumberOfUsersByMonth),
    getNumberOfViewsByMonth: () => axiosService.get(urls.statistics.getNumberOfViewsByMonth),
    getNumberOfUsersByWeek: () => axiosService.get(urls.statistics.getNumberOfUsersByWeek),
    getNumberOfViewsByWeek: () => axiosService.get(urls.statistics.getNumberOfViewsByWeek),
    getNumberOfPredictionsByWeek: () => axiosService.get(urls.statistics.getNumberOfPredictionsByWeek),
}

export {
    statisticsService
}