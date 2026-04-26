import api from "./api";

export const createBlog = async (blogData) =>{
    const res = await api.post("/createblog/blog", blogData);
    return res.data;
};

export const getLetastInterviewBlog = async () =>{
    const res = await api.get("/getlatestblog/interview");
    return res.data.data
}

export const getLetastIndustryBlog = async () =>{
    const res = await api.get("/getlatestblog/industry");
    return res.data.data
}
export const getAllInterviewBlogs = async (page = 1) =>{
    const res = await api.get(`/getallblogs/interview?page=${page}` );
    return res.data
}
export const getAllIndustryBlogs = async (page = 1) =>{
    const res = await api.get(`/getallblogs/industry?page=${page}`);
    return res.data
}
export const getAllOtherBlogs = async (page = 1) =>{
    const res = await api.get(`/getallblogs/other?page=${page}`);
    return res.data
}