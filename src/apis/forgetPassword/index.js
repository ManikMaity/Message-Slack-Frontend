import axios from "@/config/axios.config";

export async function forgetPasswordRequest(email){
    try {
        const response = await axios.post("/user/forget-password", {email});
        return response.data;
    }
    catch(err){
        console.log(err, "Foget password api error");
        throw err.response.data;
    }
}