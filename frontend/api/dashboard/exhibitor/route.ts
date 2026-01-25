import apiClient from "@/lib/axios";

interface GetCardAllocationsParams {
  exhibitorId?: string;
  cardType?: 'vip' | 'delegate';
}

interface CardAllocationData {
  personName: string;
  personEmail: string;
  personPhone: string;
  personTitle: string;
  cardType: 'vip' | 'delegate';
  organization?: string;
}

/**
 * Get card allocations for an exhibitor
 * @param params - Query parameters for filtering
 * @param token - Set to true to send authentication token (default: true)
 * @returns Card allocations list
 */
export async function GetCardAllocations(
  params?: GetCardAllocationsParams,
  token: boolean = true
): Promise<any> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.exhibitorId) queryParams.append('exhibitorId', params.exhibitorId);
    if (params?.cardType) queryParams.append('cardType', params.cardType);
    
    const queryString = queryParams.toString();
    const url = `/exhibitor/cards${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiClient.get(url, {
      requiresAuth: token
    } as any);
    
    console.log("GetCardAllocations response:", response.data);
    return response.data;
  } catch (error) {
    console.error("GetCardAllocations error:", error);
    throw error;
  }
}

/**
 * Allocate a card to a person
 * @param data - Card allocation data
 * @param token - Set to true to send authentication token (default: true)
 * @returns Created card allocation
 */
export async function AllocateCard(
  data: CardAllocationData,
  token: boolean = true
): Promise<any> {
  try {
    const response = await apiClient.post('/exhibitor/cards', data, {
      requiresAuth: token
    } as any);
    
    console.log("AllocateCard response:", response.data);
    return response.data;
  } catch (error) {
    console.error("AllocateCard error:", error);
    throw error;
  }
}

/**
 * Update a card allocation
 * @param id - Card allocation ID
 * @param data - Updated card data
 * @param token - Set to true to send authentication token (default: true)
 * @returns Updated card allocation
 */
export async function UpdateCardAllocation(
  id: string,
  data: Partial<CardAllocationData>,
  token: boolean = true
): Promise<any> {
  try {
    const response = await apiClient.put(`/exhibitor/cards/${id}`, data, {
      requiresAuth: token
    } as any);
    
    console.log("UpdateCardAllocation response:", response.data);
    return response.data;
  } catch (error) {
    console.error("UpdateCardAllocation error:", error);
    throw error;
  }
}

/**
 * Delete a card allocation
 * @param id - Card allocation ID
 * @param token - Set to true to send authentication token (default: true)
 * @returns Deletion confirmation
 */
export async function DeleteCardAllocation(
  id: string,
  token: boolean = true
): Promise<any> {
  try {
    const response = await apiClient.delete(`/exhibitor/cards/${id}`, {
      requiresAuth: token
    } as any);
    
    console.log("DeleteCardAllocation response:", response.data);
    return response.data;
  } catch (error) {
    console.error("DeleteCardAllocation error:", error);
    throw error;
  }
}

/**
 * Get card allocation statistics
 * @param token - Set to true to send authentication token (default: true)
 * @returns Card allocation statistics
 */
export async function GetCardStats(token: boolean = true): Promise<any> {
  try {
    const response = await apiClient.get('/exhibitor/cards/stats', {
      requiresAuth: token
    } as any);
    
    console.log("GetCardStats response:", response.data);
    return response.data;
  } catch (error) {
    console.error("GetCardStats error:", error);
    throw error;
  }
}
