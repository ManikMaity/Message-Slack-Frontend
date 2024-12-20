import axios from "@/config/axios.config";

const slack_token = localStorage.getItem("access-token");

export async function getAllUserWorkspaces() {
  try {
    const response = await axios.get("/workspace", {
      headers: {
        slack_token: localStorage.getItem("access-token"),
      },
    });
    return response.data;
  } catch (error) {
    console.log("Get User All Workspace error", error);
    throw error.response.data;
  }
}

export async function createWorkspace({ name, description, imageUrl = null }) {
  try {
    const response = await axios.post(
      "/workspace/create",
      {
        name,
        description,
        image:
          imageUrl ??
          "https://firebasestorage.googleapis.com/v0/b/opendoor-db7d9.appspot.com/o/pexels-hillaryfox-1595385.jpg?alt=media&token=f6237fb3-c078-4ba8-b838-6a4629c4abcc",
      },
      {
        headers: {
          slack_token: localStorage.getItem("access-token"),
        },
      }
    );

    return response.data?.data;
  } catch (error) {
    console.log("Get User All Workspace error", error);
    throw error.response.data;
  }
}

export async function getWorkspaceData(id) {
  try {
    const response = await axios.get(`/workspace/${id}`, {
      headers: {
        slack_token: localStorage.getItem("access-token"),
      },
    });

    return response?.data?.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function deleteWorkspace(id) {
  try {
    const response = await axios.delete(`/workspace/${id}`, {
      headers: {
        slack_token: localStorage.getItem("access-token"),
      },
    });

    return response?.data?.data;
  } catch (err) {
    throw err.response.data;
  }
}

export async function updateWorkspace({ id, data }) {
  try {
    const response = await axios.post(`/workspace/update/${id}`, data, {
      headers: {
        slack_token,
      },
    });

    return response?.data?.data;
  } catch (err) {
    throw err.response.data;
  }
}

export async function addChannelToWorkspace({ channelName, workspaceId }) {
  try {
    const response = await axios.put(
      "/workspace/add-channel",
      {
        channelName,
        workspaceId,
      },
      {
        headers: {
          slack_token,
        },
      }
    );

    return response?.data?.data;
  } catch (err) {
    throw err.response.data;
  }
}
