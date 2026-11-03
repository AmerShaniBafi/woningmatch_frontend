import api from "../axiosConfig";
import type { RegisterDTO } from "../contracts/Account/RegisterDTO";
import type { LoginDTO } from "../contracts/Account/LoginDTO";
import type { UserResponseDTO } from "../contracts/Account/UserResponseDTO";

export class AccountService {

    // CSRF-token ophalen voordat een POST-verzoek wordt verstuurd.
    private async getCsrfToken(): Promise<string> {
        const response = await api.get<string>("/api/auth/csrf");
        return response.data;
    }
    async getCurrentUser(): Promise<UserResponseDTO> {
        const response = await api.get<UserResponseDTO>("/api/auth/me");
        return response.data;
    }
    // Een nieuw account registreren.
    async register(account: RegisterDTO): Promise<UserResponseDTO> {
        const csrfToken = await this.getCsrfToken();

        const response = await api.post<UserResponseDTO>(
            "/api/auth/register",
            account,
            {
                headers: {
                    "X-XSRF-TOKEN": csrfToken
                }
            }
        );

        return response.data;
    }

    // Inloggen. De backend plaatst het JWT in een HttpOnly-cookie.
    async login(account: LoginDTO): Promise<UserResponseDTO> {
        const csrfToken = await this.getCsrfToken();

        const response = await api.post<UserResponseDTO>(
            "/api/auth/login",
            account,
            {
                headers: {
                    "X-XSRF-TOKEN": csrfToken
                }
            }
        );

        return response.data;
    }
}

export const accountService = new AccountService();