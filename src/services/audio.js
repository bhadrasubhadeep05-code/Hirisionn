import api from "./api";

export const createAudio = async (audioData) =>{
    const res = await api.post("/createaudio/audio", audioData);
    return res.data;
};


export const getAllInterviewAudio = async (page = 1) =>{
    const res = await api.get(`/createaudio/interview?page=${page}`);
    return res.data
}
export const getAllIndustryAudio = async (page = 1) =>{
    const res = await api.get(`/createaudio/industry?page=${page}`);
    return res.data
}
export const getAllOtherAudioCon = async (page = 1) =>{
    const res = await api.get(`/createaudio/other?page=${page}`);
    return res.data
}