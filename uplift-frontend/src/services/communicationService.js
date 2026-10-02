import api from "../api";

export const getCommunications = async () => {
    const response = await api.get("/communications");
    return response.data;
};

export const createCommunication = async (communication) => {
    const response = await api.post("/communications", communication);
    return response.data;
};