import apiClient from "@/lib/axios";

export async function GetStats(token: boolean = true) {
  try {
    const response = await apiClient.get(`/metadata/stats`, {
      requiresAuth: token
    } as any);
    console.log("GetStats response:", response.data);
    return response.data;
  } catch (error) {
    console.error("GetStats error:", error);
    throw error;
  }
}