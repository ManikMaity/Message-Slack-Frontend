import axios from "@/config/axios.config";

const slack_token = localStorage.getItem("access-token");

export async function getChannelMessages({channelId, page = 1, limit = 20}) {
  try {
    const response = await axios.get(`/message/messages/${channelId}?page=${page}&limit=${limit}`, {
      headers: {
        slack_token,
      },
    });

    return response?.data?.data;
  } catch (err) {
    return err.response.data;
  }
}
