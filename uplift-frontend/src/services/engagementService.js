import api from "../api";

export const getEngagements = async () => {
    const response = await api.get("/engagements");
    return response.data;
};

export const createEngagement = async (engagement) => {
    const response = await api.post("/engagements", engagement);
    return response.data;
};