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
    console.log("Get User All Workspace error", error);
    throw error.response.data;
  }
}

export async function createWorkspace({ name, description, imageUrl }) {
  try {
    const response = await axios.post(
      "/workspace/create",
      {
        name,
        description,
        image: imageUrl,
      },
      {
        headers: {
          slack_token: localStorage.getItem("access-token"),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Get User All Workspace error", error);
    throw error.response.data;
  }
}
