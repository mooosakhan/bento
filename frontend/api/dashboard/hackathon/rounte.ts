import apiClient from "@/lib/axios";

interface GetSubmissionsParams {
  category?: string;
  page?: number;
  limit?: number;
  team?: string;
}

interface SubmissionsResponse {
  success: boolean;
  data: {
    submissions: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
    };
  };
}

export async function GetHackathonSubmissions(
  params?: GetSubmissionsParams,
  token: boolean = true,
): Promise<SubmissionsResponse> {
  try {
    const queryParams = new URLSearchParams();

    if (params?.category) queryParams.append("category", params.category);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const url = `/hackathon-submissions`;

    const response = await apiClient.get(url, {
      requiresAuth: token,
    } as any);

    console.log("GetHackathonSubmissions response:", response.data);
    return response.data;
  } catch (error) {
    console.error("GetHackathonSubmissions error:", error);
    throw error;
  }
}

export async function ToggleSubmissionApproval(
  submissionId: string,
  token: boolean = true,
): Promise<{ success: boolean; message: string }> {
  try {
    const url = `/toggle-approval/${submissionId}`;

    const response = await apiClient.post(url, {}, {
      requiresAuth: token,
    } as any);

    console.log("ToggleSubmissionApproval response:", response.data);
    return response.data;
  } catch (error) {
    console.error("ToggleSubmissionApproval error:", error);
    throw error;
  }
}

export async function SubmitHackathonSubmission(formData: {
  title: string;
  description: string;
  project_url: string;
  team: string;
  category: string;
}): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const response = await apiClient.post("/hackathon-submissions", formData, {
      requiresAuth: true,
    } as any);
    return response.data;
  } catch (error) {
    console.error("SubmitHackathonSubmission error:", error);
    throw error;
  }
}
