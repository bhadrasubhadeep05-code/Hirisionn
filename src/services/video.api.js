import api from "./api";

export const createVideo = async (videodata) =>{
    const res = await api.post("/createvideo/video", videodata);
    return res.data;
};

export const getLetastInterviewVideo = async () =>{
    const res = await api.get("/getlatestvideo/interview");
    return res.data.data
}

export const getLetastIndustryVideo = async () =>{
    const res = await api.get("/getlatestvideo/industry");
    return res.data.data
}
export const getAllInterviewVideos = async (page = 1) =>{
    const res = await api.get(`/getallvideos/interview?page=${page}`);
    return res.data
}
export const getAllIndustryVideos = async (page = 1) =>{
    const res = await api.get(`/getallvideos/industry?page=${page}`);
    return res.data
}
export const getAllOtherVideoCon = async (page = 1) =>{
    const res = await api.get(`/getallvideos/other?page=${page}`);
    return res.data
}