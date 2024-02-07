import {axiosService} from "./axios.service";

import {urls} from "../configs";

const statisticsService = {
    getNumberOfUsers: () => axiosService.get(urls.statistics.getNumberOfUsers),
    getNumberOfViews: () => axiosService.get(urls.statistics.getNumberOfViews),
    setView: () => axiosService.post(urls.statistics.setView, null),
    getNumberOfUsersByMonth: () => axiosService.get(urls.statistics.getNumberOfUsersByMonth),
    getNumberOfViewsByMonth: () => axiosService.get(urls.statistics.getNumberOfViewsByMonth),
    getNumberOfUsersByWeek: () => axiosService.get(urls.statistics.getNumberOfUsersByWeek),
    getNumberOfViewsByWeek: () => axiosService.get(urls.statistics.getNumberOfViewsByWeek),
}

export {
    statisticsService
}