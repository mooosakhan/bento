import apiClient from "@/lib/axios";

interface GetUsersParams {
  role?: string;
  page?: number;
  limit?: number;
}

interface UserResponse {
  success: boolean;
  data: {
    stats: Array<{ role: string; count: number }>;
    users: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
    };
  };
}

/**
 * Get registered users with optional role filtering and pagination
 * @param params - Query parameters for filtering and pagination
 * @param token - Set to true to send authentication token (default: true)
 * @returns Users list with stats and pagination
 */
export async function GetRegisteredUsers(
  params?: GetUsersParams,
  token: boolean = true
): Promise<UserResponse> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.role) queryParams.append('role', params.role);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const queryString = queryParams.toString();
    const url = `/users${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiClient.get(url, {
      requiresAuth: token
    } as any);
    
    console.log("GetRegisteredUsers response:", response.data);
    return response.data;
  } catch (error) {
    console.error("GetRegisteredUsers error:", error);
    throw error;
  }
}
            