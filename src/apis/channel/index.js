import axios from "@/config/axios.config";

export async function updateChannel({ id, data }) {
  try {
    const resposne = await axios.post(`/channel/${id}`, data, {
      headers: {
        slack_token : localStorage.getItem("access-token"),
      },
    });
    return resposne?.data?.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function deleteChannel(id) {
  try {
    const response = await axios.delete(`/channel/${id}`, {
      headers: {
        slack_token : localStorage.getItem("access-token"),
      },
    });

    return response?.data?.data;
    
  } catch (error) {
    throw error.response.data;
  }
}
