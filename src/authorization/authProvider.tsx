
import { useEffect, useState, type ReactNode } from "react";
import { accountService } from "../services/AccountService";
import type { UserResponseDTO } from "../contracts/Account/UserResponseDTO";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<UserResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);

    // Controleer of de gebruiker nog is ingelogd.
    const refreshUser = async () => {
        try {
            const currentUser = await accountService.getCurrentUser();
            setUser(currentUser);
        } catch {
            setUser(null);
        }
    };

    // Bij het openen of vernieuwen van de applicatie.
    useEffect(() => {
        let active = true;

        accountService.getCurrentUser()
            .then(currentUser => {
                if (active) setUser(currentUser);
            })
            .catch(() => {
                if (active) setUser(null);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

    // Inloggen via de backend.
    const login = async (email: string, password: string) => {
        const loggedInUser = await accountService.login({
            email,
            password
        });

        setUser(loggedInUser);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, refreshUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}
