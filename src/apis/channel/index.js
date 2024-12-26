import axios from "@/config/axios.config";

const slack_token = localStorage.getItem("access-token");

export async function updateChannel({ id, data }) {
  try {
    const resposne = await axios.post(`/channel/${id}`, data, {
      headers: {
        slack_token,
      },
    });
    return resposne?.data?.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function deleteChannel(id) {
  try {
    console.log("delete channel api", id);
    const response = await axios.delete(`/channel/${id}`, {
      headers: {
        slack_token,
      },
    });

    return response?.data?.data;
    
  } catch (error) {
    throw error.response.data;
  }
}
