import api from "./api";

export const getNews = async () =>{
    const res = await api.get("/news/business");
    return res.data
};