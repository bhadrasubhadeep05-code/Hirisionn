import adminApi from "./AdminApi";

export const adminLogin = async (userData) =>{
    const res = await adminApi.post("admin/loginAdmin", userData);
    return res.data
}

export const deleteBlog = async (blogId) => {
    const res = await adminApi.delete(`delete/blog/${blogId}`);
    return res.data;
};

export const deleteVideo = async (videoId) => {
    const res = await adminApi.delete(`delete/video/${videoId}`);
    return res.data;
};
export const deleteAudio = async (audioId) => {
    const res = await adminApi.delete(`delete/audio/${audioId}`);
    return res.data;
};

// User Management Endpoints
export const getAllUsers = async () => {
    const res = await adminApi.get("/admin/users");
    return res.data;
};

export const getUserStats = async () => {
    const res = await adminApi.get("/admin/users/stats");
    return res.data;
};

//internship get route
export const getInternships = async () => {
    const res = await adminApi.get("/admin/internship-applicants");
    return res.data;
};

export const getInternshipsFulfilled = async () => {
    const res = await adminApi.get("/admin/internship-fulfill");
    return res.data;
};

export const fulfillInternship = async (data) => {
    const res = await adminApi.put("/admin/internship-status", data);
    return res.data;
};

export const downloadUserResume = async (userId) => {
    const res = await adminApi.post(`/admin/users/${userId}/download-resume`, {}, {
        responseType: 'blob'
    });
    return res.data;
};

export const exportAllUsersCSV = async () => {
    const res = await adminApi.get("/admin/users/export/csv", {
        responseType: 'blob'
    });
    return res.data;
};

export const exportNewUsersCSV = async (lastDownloadTimestamp) => {
    const url = lastDownloadTimestamp 
        ? `/admin/users/export/csv/new?lastDownloadTimestamp=${lastDownloadTimestamp}`
        : `/admin/users/export/csv/new`;
    
    const res = await adminApi.get(url, {
        responseType: 'blob'
    });
    return res.data;
};

//placement 
export const getPlacment = async () => {
    const res = await adminApi.get("/admin/jobplacement-applicants");
    return res.data;
};

export const updatePlacement = async (data) => {
    const res = await adminApi.put("/admin/jobplacement-status", data);
    return res.data;
};

//live Project 
export const getLiveProject = async () => {
    const res = await adminApi.get("/admin/liveproject-applicants");
    return res.data;
};

export const updateLiveProject = async (data) => {
    const res = await adminApi.put("/admin/liveproject-status", data);
    return res.data;
};

//soft skill
export const getSoftSkill = async () => {
    const res = await adminApi.get("/admin/softskills-applicants");
    return res.data;
};

export const updateSoftSkill = async (data) => {
    const res = await adminApi.put("/admin/softskills-status", data);
    return res.data;
};


