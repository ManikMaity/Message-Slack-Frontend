import axios from "@/config/axios.config";

export async function getAllUserWorkspaces() {
  try {
    const response = await axios.get("/workspace", {
      headers: {
        slack_token: localStorage.getItem("access-token"),
      },
    });
    return response.data;
  } catch (error) {
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
          "https://picsum.photos/seed/picsum/600/600",
      },
      {
        headers: {
          slack_token: localStorage.getItem("access-token"),
        },
      }
    );

    return response.data?.data;
  } catch (error) {
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
        slack_token: localStorage.getItem("access-token"),
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
          slack_token: localStorage.getItem("access-token"),
        },
      }
    );

    return response?.data?.data;
  } catch (err) {
    throw err.response.data;
  }
}

export async function changeWorkspaceJoinCode({ workspaceId }) {
  try {
    const response = await axios.put(
      `/workspace/change-joinCode/${workspaceId}`,
      {},
      {
        headers: {
          slack_token: localStorage.getItem("access-token"),
        },
      }
    );

    return response?.data?.data;
  } catch (err) {
    throw err.response.data;
  }
}

export async function joinWorkspaceByJoinCode({ joinCode }) {
  try {
    const response = await axios.put(
      `/workspace/joinByCode/${joinCode}`,
      {},
      {
        headers: {
          slack_token: localStorage.getItem("access-token"),
        },
      }
    );

    return response?.data?.data;
  } catch (err) {
    throw err.response.data;
  }
}

export async function getChannelDetails({ channelId }) {
  try {
    const response = await axios.get(`/channel/${channelId}`, {
      headers: {
        slack_token: localStorage.getItem("access-token"),
      },
    });

    return response?.data?.data;
  } catch (err) {
    throw err.response.data;
  }
}

export async function leaveWorkspace(workspaceId) {
  try {
    const response = await axios.post(
      `/workspace/leave/${workspaceId}`,
      {},
      {
        headers: {
          slack_token: localStorage.getItem("access-token"),
        },
      }
    );

    return response?.data;
  } catch (err) {
    throw err.response.data;
  }
}

export async function makeMemberAdmin({ workspaceId, memberId }) {
  try {
    const response = await axios.post(
      "/workspace/makeAdmin",
      {
        workspaceId,
        memberId,
      },
      {
        headers: {
          slack_token: localStorage.getItem("access-token"),
        },
      }
    );
    return response?.data?.data;
  } catch (err) {
    throw err.response.data;
  }
}

export async function removeMembersFromWorkspace({ memberId, workspaceId }) {
  try {
    const reponse = await axios.patch(
      "/workspace/remove-member",
      { memberId, workspaceId },
      {
        headers: {
          slack_token: localStorage.getItem("access-token"),
        },
      }
    );

    return reponse?.data?.data;
  } catch (err) {
    throw err.response.data;
  }
}
