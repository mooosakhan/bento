import apiClient from "@/lib/axios";

interface MarkAttendanceData {
  user_id: string;
}

interface AttendanceResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    user: string;
    marked_by: string;
    date: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Mark attendance for a user
 * @param user_id - MongoDB ObjectId of the user whose attendance is being marked
 * @param token - Set to true to send authentication token (default: true)
 * @returns Attendance record
 */
export async function MarkAttendance(
  user_id: string,
  token: boolean = true
): Promise<AttendanceResponse> {
  try {
    const response = await apiClient.post(
      `/attendance/mark`,
      { user_id },
      { requiresAuth: token } as any
    );
    console.log("MarkAttendance response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("MarkAttendance error:", error);
    // Re-throw with proper error message
    throw new Error(
      error?.response?.data?.message || 
      error?.message || 
      "Failed to mark attendance"
    );
  }
}
