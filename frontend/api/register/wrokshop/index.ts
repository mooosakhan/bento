"use server";
import apiClient from "@/lib/axios";

export type WorkshopData = {
  _id: string;
  title: string;
  description: string;
  image_url?: string;
  date: string;
  duration_hours?: number;
  instructor?: {
    _id: string;
    name: string;
  };
  seats_left?: number;
};

export async function fetchWorkshops(): Promise<WorkshopData[]> {
  try {
    const res = await apiClient.get("/workshops");
    const list = res?.data?.data;

    if (Array.isArray(list)) {
      return list;
    }
    return [];
  } catch (error) {
    return [];
  }
}