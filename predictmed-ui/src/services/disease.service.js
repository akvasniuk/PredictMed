import {axiosService} from "./axios.service";

import {urls} from "../configs";

const diseaseService = {
    getDiseases: (page = 1) => axiosService.get(urls.disease.diseaseURL, {params: {page}}),
    getDisease: (diseaseId) => axiosService.get(`${urls.disease.diseaseURL}/${diseaseId}`),
    predictDisease: (diseaseName, data) => axiosService.post(`${urls.disease.diseaseURL}/${diseaseName}`, data),
    predictDiseasePhoto: (diseaseName, data) => axiosService.post(`${urls.disease.diseaseURL}/${diseaseName}`, data,
        {headers: {
                'Content-Type': 'multipart/form-data'
            }}),
    analyse: (diseaseName) => axiosService.post(`${urls.disease.analyseURL}/${diseaseName}`),
    createDiseaseHistory: (userId, diseaseId, data) => axiosService.post(`${urls.disease.diseasesHistoryURL}/${userId}/${diseaseId}`, data),
    getDiseaseHistory: (userId) => axiosService.get(`${urls.disease.diseasesHistoryURL}/${userId}`),
}

export {
    diseaseService
}