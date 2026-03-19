import { apiPOST } from "@app/api/client";
import { useAuthStore } from "@app/store/auth/auth.store";


type LoginResponse = {
  token: string,
  user: {
    id: number,
    email: string,
    role: 'ORGANIZER' | 'TEAM_ADMIN'
    is_onboarded: boolean
  }
}

export interface AuthInput {
  email: string
  password: string
  role?: "ORGANIZER" | "TEAM_ADMIN"
}



export async function login({ email, password }: AuthInput) {
  const data: LoginResponse = await apiPOST("/auth/login", {
    body: JSON.stringify({ email, password })
  });

  return data
}

export async function signup({ email, password, role }: AuthInput) {
  const data: LoginResponse = await apiPOST("/auth/register", {
    body: JSON.stringify({ email, password, role })
  })

  return data
}

export async function logout() {
  useAuthStore.getState().logout();
  await apiPOST("/auth/logout", { method: "POST" });
}


//export async function refreshToken() {}
