import api from "../axiosConfig";
import type { RegisterDTO } from "../contracts/Account/RegisterDTO";

export class AccountService {

    async register(account: RegisterDTO): Promise<void> {
        await api.post("/api/auth/register", account);
    }
}

export const accountService = new AccountService();