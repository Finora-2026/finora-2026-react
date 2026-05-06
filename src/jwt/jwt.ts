
export type JwtPayload = {
  sub: string; // email
  exp: number;
  userId: string;
  role: string;
};

export const getTokenPayload = (token: string | null): JwtPayload | null => {
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};