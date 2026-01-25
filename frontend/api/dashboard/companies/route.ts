import apiClient from "@/lib/axios";

interface GetCompaniesParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface CompanyResponse {
  success: boolean;
  data: {
    companies: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
    };
  };
}

interface CreateCompanyData {
  name: string;
  logo?: string;
  hostNumber: string;
  hostName: string;
  hostPerson: string;
}

/**
 * Get all companies with optional pagination and search
 * @param params - Query parameters for filtering and pagination
 * @param token - Set to true to send authentication token (default: true)
 * @returns Companies list with pagination
 */
export async function GetCompanies(
  params?: GetCompaniesParams,
  token: boolean = true
): Promise<CompanyResponse> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    const url = `/companies${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiClient.get(url, {
      requiresAuth: token
    } as any);
    
    console.log("GetCompanies response:", response.data);
    return response.data;
  } catch (error) {
    console.error("GetCompanies error:", error);
    throw error;
  }
}

/**
 * Create a new company
 * @param data - Company data to create
 * @param token - Set to true to send authentication token (default: true)
 * @returns Created company data
 */
export async function CreateCompany(
  data: CreateCompanyData,
  token: boolean = true
): Promise<any> {
  try {
    const response = await apiClient.post('/companies', data, {
      requiresAuth: token
    } as any);
    
    console.log("CreateCompany response:", response.data);
    return response.data;
  } catch (error) {
    console.error("CreateCompany error:", error);
    throw error;
  }
}

/**
 * Update an existing company
 * @param id - Company ID to update
 * @param data - Updated company data
 * @param token - Set to true to send authentication token (default: true)
 * @returns Updated company data
 */
export async function UpdateCompany(
  id: string,
  data: Partial<CreateCompanyData>,
  token: boolean = true
): Promise<any> {
  try {
    const response = await apiClient.put(`/companies/${id}`, data, {
      requiresAuth: token
    } as any);
    
    console.log("UpdateCompany response:", response.data);
    return response.data;
  } catch (error) {
    console.error("UpdateCompany error:", error);
    throw error;
  }
}

/**
 * Delete a company
 * @param id - Company ID to delete
 * @param token - Set to true to send authentication token (default: true)
 * @returns Deletion confirmation
 */
export async function DeleteCompany(
  id: string,
  token: boolean = true
): Promise<any> {
  try {
    const response = await apiClient.delete(`/companies/${id}`, {
      requiresAuth: token
    } as any);
    
    console.log("DeleteCompany response:", response.data);
    return response.data;
  } catch (error) {
    console.error("DeleteCompany error:", error);
    throw error;
  }
}
