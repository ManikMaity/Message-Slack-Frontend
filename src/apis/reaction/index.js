import axios from "@/config/axios.config";

export async function getMessageReactions(messageId) {
    try {
        const response = await axios.get(`/like/${messageId}`, {
            headers: {
                slack_token: localStorage.getItem("access-token"),
            },
        });
        return response.data?.data;
    }
    catch (error) {
        throw error.response.data;
    }
}