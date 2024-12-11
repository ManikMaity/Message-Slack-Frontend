import axios from "@/config/axios.config";

export async function getAllUserWorkspaces() {
  try {
    const response = await axios.get("/workspace", {
      headers: {
        "slack_token": localStorage.getItem("access-token"),
      },
    });

    return response.data;
  } catch (error) {
    console.log("Get User All Workspace error", error);
    throw error.response.data;
  }
}
