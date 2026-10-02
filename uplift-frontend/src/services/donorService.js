import api from "../api";

export const getDonors = async () => {
    const response = await api.get("/donors");
    return response.data;
};

export const getDonor360 = async (donorId) => {
    const response = await api.get(`/donors/${donorId}/360`);
    return response.data;
};

export const createDonor = async (donor) => {
    const response = await api.post("/donors", donor);
    return response.data;
};