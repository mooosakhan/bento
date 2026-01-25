import apiClient from "@/lib/axios";

export interface Workshop {
  _id: string;
  title: string;
  description: string;
  image_url: string;
  instructor?:
    | {
        _id: string;
        name: string;
      }
    | string;
  date: string;
  duration_hours: number;
  participant_limit: number;
  registered_participants?: number;
  seats_left?: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetWorkshopsParams {
  page?: number;
  limit?: number;
}

export interface CreateWorkshopData {
  title: string;
  description: string;
  image_url: string;
  instructor?: string;
  date: string;
  duration_hours: number;
  participant_limit: number;
}

export interface UpdateWorkshopData {
  title?: string;
  description?: string;
  image_url?: string;
  instructor?: string;
  date?: string;
  duration_hours?: number;
  participant_limit?: number;
}

// Get all workshops
export async function GetWorkshops(params?: GetWorkshopsParams) {
  try {
    const response = await apiClient.get("/workshops", {
      params,
      requiresAuth: true,
    } as any);

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
}

// Get workshop by ID
export async function GetWorkshopById(id: string) {
  try {
    const response = await apiClient.get(`/workshops/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
}

// Create workshop (Admin only)
export async function CreateWorkshop(data: CreateWorkshopData) {
  try {
    const response = await apiClient.post("/workshops", data, {
      requiresAuth: true,
    } as any);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
}

// Update workshop (Admin only)
export async function UpdateWorkshop(id: string, data: UpdateWorkshopData) {
  try {
    const response = await apiClient.put(`/workshops/${id}`, data, {
      requiresAuth: true,
    } as any);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
}

// Delete workshop (Admin only)
export async function DeleteWorkshop(id: string) {
  try {
    const response = await apiClient.delete(`/workshops/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
}
