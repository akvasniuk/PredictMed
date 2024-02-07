import {axiosService} from "./axios.service";

import {urls} from "../configs";

const userService = {
    updateUser: (userId, updatedUser) => axiosService.patch(`${urls.user.userURL}${userId}`, updatedUser),
    deleteUser: (userId) => axiosService.delete(`${urls.user.userURL}${userId}`),

}

export {
    userService
}