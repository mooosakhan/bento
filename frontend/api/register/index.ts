import apiClient from "@/lib/axios";

export type Role =
  | "delegate"
  | "instructor"
  | "vip"
  | "workshop_attendee"
  | "hackathon_attendee"
  | "volunteer"
  | "exhibitor"
  | "admin";

// Base fields common to all users
export interface BaseUserData {
  name: string;
  email: string;
  contact_number: number;
  gender: "male" | "female";
  role: Role;
}

// Delegate specific fields
export interface DelegateData extends BaseUserData {
  role: "delegate";
  organization: string;
  occupation: string;
  cnic: number;
}

// Instructor specific fields
export interface InstructorData extends BaseUserData {
  role: "instructor";
  workshop: string;
  password: string;
  cnic?: number;
}

// VIP specific fields
export interface VIPData extends BaseUserData {
  role: "vip";
  cnic: number;
  organization: string;
  occupation: string;
}

// Workshop Attendee specific fields
export interface WorkshopAttendeeData extends BaseUserData {
  role: "workshop_attendee";
  workshop: string;
  cnic: number;
  organization: string;
  occupation: string;
}

// Hackathon Attendee (Team Registration)
export interface HackathonMember {
  name: string;
  email: string;
  contact_number: number;
  gender: "male" | "female";
  role: "hackathon_attendee";
}

export interface HackathonAttendeeData {
  team_name: string;
  hackathon_category: "ai" | "web_dev" | "mobile_dev" | "data_science";
  leader: HackathonMember;
  members: HackathonMember[];
}

// Volunteer specific fields
export interface VolunteerData extends BaseUserData {
  role: "volunteer";
  cnic: number;
  password: string;
}

// Exhibitor specific fields
export interface ExhibitorData extends BaseUserData {
  role: "exhibitor";
  organization: string;
  occupation: string;
  cnic: number;
}

// Admin specific fields
export interface AdminData extends BaseUserData {
  role: "admin";
  password: string;
  status: "active" | "inactive";
}

export type RegisterData =
  | DelegateData
  | InstructorData
  | VIPData
  | WorkshopAttendeeData
  | HackathonAttendeeData
  | VolunteerData
  | ExhibitorData
  | AdminData;

export async function registerUser(role: Role, data: RegisterData) {
  const response = await apiClient.post(`/users/register/${role}`, data);
  return response.data;
}
