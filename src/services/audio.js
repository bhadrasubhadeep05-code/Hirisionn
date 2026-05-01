import api from "./api";

export const createAudio = async (audioData) =>{
    const res = await api.post("/createaudio/audio", audioData);
    return res.data;
};


export const getAudio = async () =>{
    const res = await api.get("/audio/audioData");
    return res.data
};
export const getworkforceAudio = async () =>{
    const res = await api.get("/audio/workforce");
    return res.data
};
export const getIndustryAudio = async () =>{
    const res = await api.get("/audio/industry");
    return res.data
}