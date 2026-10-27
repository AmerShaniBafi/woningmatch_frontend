
import api from "../axiosConfig";
import type { RegisterDTO } from "../contracts/Account/RegisterDTO";
import type { LoginDTO } from "../contracts/Account/LoginDTO";

export type UserResponse = {
    id: number;
    name: string;
    email: string;
    role: string;
};

export class AccountService {
    async register(account: RegisterDTO): Promise<void> {
        await api.post("/api/auth/register", account);
    }

    async login(account: LoginDTO): Promise<UserResponse> {
        const response = await api.post<UserResponse>(
            "/api/auth/login",
            account
        );

        return response.data;
    }
}

export const accountService = new AccountService();
