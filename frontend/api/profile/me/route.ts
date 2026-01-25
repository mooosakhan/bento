import apiClient from "@/lib/axios";

interface GetMyProfileResponse {
  id: string;
  name: string;
  email: string;
  role: string;
}

export type ProfileDoc = any; // replace with your Profile type later

export async function getMyProfile(): Promise<ProfileDoc> {
  try {
    const response = await apiClient.get(`/profiles/me`, {
      requestAuth: true,
    } as any);
    return response.data;
  } catch (error) {
    console.error("getMyProfile error:", error);
    throw error;
  }
}

export async function updateMyProfile(
  payload: Partial<ProfileDoc>,
): Promise<ProfileDoc> {
  try {
    const response = await apiClient.put(`/profiles/me`, { ...payload }, {
      requestAuth: true,
    } as any);
    return response.data;
  } catch (error) {
    console.error("getMyProfile error:", error);
    throw error;
  }
}

export async function getPublicProfile(handle: string): Promise<ProfileDoc> {
  try {
    const response = await apiClient.get(`/u/${encodeURIComponent(handle)}`);
    return response.data;
  } catch (error) {
    console.error("getPublicProfile error:", error);
    throw error;
  }
}
