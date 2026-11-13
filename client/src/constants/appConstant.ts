export const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export const API_URL = {
    LOGIN: `${BASE_API_URL}/api/auth/login`,
    REGISTER_OWNER: `${BASE_API_URL}/api/auth/register-owner`,
}