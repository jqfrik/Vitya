import axios from "../axios"

const endpoints = {
    getAllUsersBySearchString: (data) => axios.post("/Users/GetAllUsersBySearchString", data),
    getUserById: (data) => axios.post("/Users/GetUserById",data)
}

export default endpoints