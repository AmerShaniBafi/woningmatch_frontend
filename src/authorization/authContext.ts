
import { createContext } from "react";
import type { UserResponseDTO } from "../contracts/Account/UserResponseDTO";

export type AuthContextType = {
    user: UserResponseDTO | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    refreshUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);
