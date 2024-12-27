import axios from "axios";

const API_URL = "http://localhost:8080/api/events";

export interface Event {
    id?: string;
    type: string;
    data: any;
    timestamp?: string;
}

export const sendEvent = async (event: Event) => {
    await axios.post(API_URL, event, {
        headers: {"Content-Type": "application/json"}
    });
}

export const fetchEvents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}