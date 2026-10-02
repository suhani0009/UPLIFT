import api from "../api";

export const getContributions = async () => {
    const response = await api.get("/contributions");
    return response.data;
};

export const createContribution = async (contribution) => {
    const response = await api.post("/contributions", contribution);
    return response.data;
};