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
    // Transform frontend structure to backend structure
    const backendPayload: any = {};
    
    // Map flat frontend fields to nested backend structure
    if (payload.displayName !== undefined || payload.bio !== undefined || payload.avatarUrl !== undefined) {
      backendPayload.profile = {};
      if (payload.displayName !== undefined) backendPayload.profile.displayName = payload.displayName;
      if (payload.bio !== undefined) backendPayload.profile.bio = payload.bio;
      if (payload.avatarUrl !== undefined) {
        backendPayload.profile.avatar = {
          type: 'url',
          value: payload.avatarUrl
        };
      }
    }
    
    // Direct mappings
    if (payload.handle !== undefined) backendPayload.handle = payload.handle;
    if (payload.blocks !== undefined) backendPayload.blocks = payload.blocks;
    if (payload.published !== undefined) backendPayload.published = payload.published;
    
    // Map theme
    if (payload.theme !== undefined) {
      backendPayload.theme = {
        mode: payload.theme.mode,
        accentColor: payload.theme.accentColor || '#111827',
        cardStyle: payload.theme.cardStyle || 'solid',
      };
    }
    
    // Map layout/sectionGap
    if (payload.sectionGap !== undefined) {
      backendPayload.layout = backendPayload.layout || {};
      backendPayload.layout.page = backendPayload.layout.page || {};
      backendPayload.layout.page.sectionGap = payload.sectionGap;
    }
    
    const response = await apiClient.put(`/profiles/me`, backendPayload, {
      requestAuth: true,
    } as any);
    return response.data;
  } catch (error) {
    console.error("updateMyProfile error:", error);
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
