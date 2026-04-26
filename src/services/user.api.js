import api from "./api";

export const register = async (userData) =>{
    const res = await api.post("/createuser/register", userData);
    return res.data;
};

export const completeProfile = async (userData) =>{
    const res = await api.put("/complete/profile", userData)
    return res.data;
}
export const login = async (userData) =>{
    const res = await api.post("user/login", userData);
    return res.data
}

// Forgot Password API methods
export const verifyUserForReset = async (data) => {
    const res = await api.post("/user/forgot-password/verify-user", data);
    return res.data;
}

export const verifySecurityAnswers = async (data) => {
    const res = await api.post("/user/forgot-password/verify-answers", data);
    return res.data;
}

export const resetPassword = async (data) => {
    const res = await api.post("/user/forgot-password/reset", data);
    return res.data;
}

//get user

export const getUser  = async () =>{
    const res = await api.get("/user/getUser");
    return res.data;
}

//update user
export const updateUser = async(data)=>{
    const res = await api.put("/user/update", data);
    return res.data
}

export const internshipUpdate = async(data)=>{
    const res = await api.post("/user/apply-internship", data);
    return res.data
}


