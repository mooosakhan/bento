import apiClient from "@/lib/axios";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function Register(data: RegisterData) {
  try {
    const response = await apiClient.post(`/auth/register`, {
      ...data,
    });
    return response;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}
