import api from "../api";

export const previewImport = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/import/preview", formData);

    return response.data;
};

export const importDonors = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/import/donors", formData);

    return response.data;
};

export const importDonorsExcel = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/import/donors/excel", formData);

    return response.data;
};