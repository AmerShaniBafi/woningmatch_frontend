import api from "../axiosConfig";
import type { RegisterDTO } from "../contracts/Account/RegisterDTO";
import type { LoginDTO } from "../contracts/Account/LoginDTO";

export class AccountService {

    async register(account: RegisterDTO): Promise<void> {

        const csrfResponse = await api.get<string>("/api/auth/csrf");

        await api.post("/api/auth/register", account, {
            headers: {
                "X-XSRF-TOKEN": csrfResponse.data
            }
        });
    }

    async login(account: LoginDTO): Promise<void> {

        const csrfResponse = await api.get<string>("/api/auth/csrf");

        await api.post("/api/auth/login", account, {
            headers: {
                "X-XSRF-TOKEN": csrfResponse.data
            }
        });
    }
}

export const accountService = new AccountService();