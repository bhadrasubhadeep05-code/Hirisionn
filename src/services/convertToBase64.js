export const convertToBase64 = (file) =>{
    return new Promise((resolve, reject)=>{
        const reader = new FileReader(file);
         reader.addEventListener("load", () => {
      resolve(reader.result);
    });

    reader.addEventListener("error", () => {
      reject(new Error("Failed to read file"));
    });

    reader.readAsDataURL(file);
    });
};