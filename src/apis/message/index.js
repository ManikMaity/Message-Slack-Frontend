import axios from "@/config/axios.config";


export async function getChannelMessages({channelId, page = 1, limit = 20, workspaceId}) {
  try {
    const response = await axios.get(`/message/messages/${workspaceId}/${channelId}?page=${page}&limit=${limit}`, {
      headers: {
        slack_token : localStorage.getItem("access-token"),
      },
    });

    return response?.data?.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function getDMMessages({page = 1, limit = 20, workspaceId, roomId}) {
  try {
    const response = await axios.get(`/message/dm/${workspaceId}/${roomId}?page=${page}&limit=${limit}`, {
      headers: {
        slack_token : localStorage.getItem("access-token"),
      },
    });

    return response?.data?.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function searchMessages({workspaceId, searchQuery = ""}){
  try {
    const response = await axios.post("/message/search-message", {workspaceId, searchQuery}, {
      headers: {
        slack_token : localStorage.getItem("access-token"),
      },
    });
    return response?.data?.data;
  }
  catch (err) {
    throw err.response.data;
  }
}