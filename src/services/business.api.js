import api from "./api";

export const enquiry = async (userData) =>{
    const res = await api.post("/enquiry/create", userData);
    return res.data;
};

