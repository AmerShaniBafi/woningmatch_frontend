
import { useState, type FormEvent } from "react";
import { isAxiosError } from "axios";
import { accountService } from "../../services/AccountService";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const user = await accountService.login({
                email,
                password
            });

            setSuccess(`Welkom terug, ${user.name}!`);
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                console.error("Login fout:", err.response?.status);
                setError(`Inloggen mislukt (${err.response?.status ?? "netwerkfout"})`);
            } else {
                setError("Er is iets misgegaan.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h1>Inloggen</h1>

                <label htmlFor="email">E-mailadres</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Wachtwoord</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Bezig..." : "Inloggen"}
                </button>
            </form>
        </div>
    );
}

export default Login;
