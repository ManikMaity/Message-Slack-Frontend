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