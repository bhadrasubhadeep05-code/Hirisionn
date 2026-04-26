import api from "./api";

export const uploadImage = async (base64Image) =>{
   const res = await api.post("/upload/image", {
    image: base64Image, // backend expects { image: "<base64 string>" }
  });
    return res.data;
};

export const deleteImage = async (public_id) =>{
    const res = await api.delete("/delete/image",{
        data: {public_id},
    });
    return res;
};
