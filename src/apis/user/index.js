import axios from "@/config/axios.config";

export async function updateUserProfile( data ) {
    try {
        const response = await axios.put("/user/update-profile", data, {
            headers: {
                slack_token: localStorage.getItem("access-token"),
            },
        });
        return response.data?.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function sendVerifyEmail(email) {
    try {
        const response = await axios.post("/user/resend-verifyEmail", { email });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function verifyEmail(token) {
    try {
        const response = await axios.get(`user/verifyEmail/${token}`);
        return response.data;
    }
    catch(error){
        throw error.response.data;
    }
}


export async function getUserProfile() {
    try {
        const response = await axios.get("/user", {
            headers: {
                slack_token: localStorage.getItem("access-token"),
            },
        });
        return response.data?.data;
    } catch (error) {
        throw error.response.data;
    }
}