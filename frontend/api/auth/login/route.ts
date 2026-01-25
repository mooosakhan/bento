import apiClient from "@/lib/axios";

interface LoginData {
  email: string;
  password: string;
}

export async function Login(loginData: LoginData) {
  try {
    const response = await apiClient.post(`/auth/login`, loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
