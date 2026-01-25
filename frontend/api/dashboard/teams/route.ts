import apiClient from "@/lib/axios";

export async function getHackathonTeams() {
  // This endpoint is assumed, update if actual endpoint differs
  const response = await apiClient.get("/hackathon-teams", {
    requiresAuth: true,
  } as any);
  return response.data;
}

export async function getHackathonTeamById(id: string) {
  // Fetch a single team by id — update endpoint if backend differs
  const response = await apiClient.get(`/hackathon-teams/${id}`, {
    requiresAuth: true,
  } as any);
  return response.data;
}
