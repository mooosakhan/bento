import apiClient from "@/lib/axios";

export interface HackathonCategory {
  _id: string;
  name: string;
  submission_open: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryData {
  name: string;
  submission_open?: boolean;
}

export interface UpdateCategoryData {
  name?: string;
  submission_open?: boolean;
}

// Get all hackathon categories
export async function getHackathonCategories() {
  const response = await apiClient.get(
    "/hackathon-categories",
    { requiresAuth: true } as any,
  );
  return response.data;
}

// Get single hackathon category by ID
export async function getHackathonCategoryById(id: string) {
  const response = await apiClient.get(`/hackathon-categories/${id}`);
  return response.data;
}

// Create a new hackathon category
export async function createHackathonCategory(data: CreateCategoryData) {
  const response = await apiClient.post("/hackathon-categories", data , {
    requiresAuth: true,
  } as any);
  return response.data;
}

// Update a hackathon category
export async function updateHackathonCategory(
  id: string,
  data: UpdateCategoryData,
) {
  const response = await apiClient.patch(`/hackathon-categories/${id}`, data, {
    requiresAuth: true,
  } as any
  );
  return response.data;
}

// Toggle submission status (open/close)
export async function toggleCategorySubmission(id: string, is_open: boolean) {
  const response = await apiClient.patch(
    `/hackathon-categories/toggle/${id}`,
    {},
    {
      requiresAuth: true,
    } as any,
  );
  return response.data;
}

// Delete a hackathon category
export async function deleteHackathonCategory(id: string) {
  const response = await apiClient.delete(`/hackathon-categories/${id}`, {
    requiresAuth: true,
  } as any);
  return response.data;
}
