import axios from "axios";

const API_URL =  "http://localhost:8080/api/messages";

export const sendMessage = async (message: string) => {
    await axios.post(API_URL, message, {
        headers: {"Content-Type": "application/json"}
    })
}

export const fetchMessages = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}