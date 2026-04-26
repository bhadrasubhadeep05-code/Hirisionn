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