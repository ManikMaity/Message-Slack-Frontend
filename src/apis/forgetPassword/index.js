import axios from "@/config/axios.config";

export async function forgetPasswordRequest(email){
    try {
        const response = await axios.post("/user/forget-password", {email});
        return response.data;
    }
    catch(err){
        throw err.response.data;
    }
}

export async function resetPasswordRequest(data){
    try {
        const response = await axios.post("/user/reset-password", data);

        return response.data;
    }
    catch(err){
        throw err.response.data;
    }
}