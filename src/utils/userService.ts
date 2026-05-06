import { BackendConfig } from "../config/BackendConfig";

export type UserCreateRequestDto = {
  name: string;
  email: string;
  password: string;
};

export type UserCreateResponseDto = {
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

// ==========================
// Create User (Sign Up)
// ==========================
export const userService = async (
  payload: UserCreateRequestDto
): Promise<UserCreateResponseDto> => {
  const res = await fetch(`${BackendConfig.springApiUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  return res.json();
};