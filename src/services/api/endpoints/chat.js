import axios from "../axios"

const endpoints = {
    getMessagesByChatId: (data) => axios.post("/Chat/GetMessagesByChatId",data),
    createChat: (data) => axios.post("/Chat/Create",data),
    getChatById: (chatId) => axios.get(`/Chat/GetChatById/${chatId}`),
    getMessagesByChatId: (data) => axios.post("/Chat/GetMessagesByChatId/",data),
    getAllChatsByUserId: (chatId) => axios.get(`/Chat/GetAllChatsByUserId/${chatId}}`)
}
export default endpoints