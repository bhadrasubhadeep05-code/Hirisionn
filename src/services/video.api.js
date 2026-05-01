import api from "./api";

export const createVideo = async (videodata) =>{
    const res = await api.post("/createvideo/video", videodata);
    return res.data;
};

export const getVideo = async () =>{
    const res = await api.get("/video/videoData");
    return res.data
};
export const getworkforceVideo = async () =>{
    const res = await api.get("/video/workforce");
    return res.data
};export const getIndustryVideo = async () =>{
    const res = await api.get("/video/industry");
    return res.data
}