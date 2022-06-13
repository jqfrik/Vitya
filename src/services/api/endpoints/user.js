import axios from "../axios"

const endpoints = {
    getAllUsersBySearchString: (data) => axios.post("/Users/GetAllUsersBySearchString", data),
    getUserById: (data) => axios.post("/Users/GetUserById",data),
    uploadPhoto: (data) => axios.post("/Users/UploadPhoto",data)
}

export default endpoints