import api from "./api";

export const createBlog = async (blogData) =>{
    const res = await api.post("/createblog/blog", blogData);
    return res.data;
};

export const getBlog = async () =>{
    const res = await api.get("/blog/BlogData");
    return res.data
};
export const getworkforce = async () =>{
    const res = await api.get("/blog/workforce");
    return res.data
};export const getIndustry = async () =>{
    const res = await api.get("/blog/industry");
    return res.data
}