import axios from "@/config/axios.config";

export async function getMemberDeatils({ workspaceId, memberId }) {
  try {
    const resposne = await axios.post(
      "/member/member-deatils",
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

    return resposne?.data?.data;
  } catch (err) {
    throw err.response.data;
  }
}
