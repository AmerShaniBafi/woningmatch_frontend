
import { useState, type FormEvent } from "react";
import { isAxiosError } from "axios";
import { accountService } from "../../services/AccountService";
import "./Login.css";

type LoginProps = {
    onRegister: () => void;
};

function Login({ onRegister }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await accountService.login({ email, password });
            setSuccess("Je bent succesvol ingelogd. Welkom terug!");
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                setError(
                    `Inloggen mislukt (${err.response?.status ?? "netwerkfout"}). Controleer je gegevens.`
                );
            } else {
                setError("Er is iets misgegaan. Probeer het opnieuw.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <section className="auth-panel">
                <div className="auth-brand">
                    <span className="brand-icon">⌂</span>
                    <span>Woning<span className="brand-accent">Match</span></span>
                </div>

                <div className="auth-content">
                    <div className="auth-eyebrow">
                        WELKOM TERUG
                    </div>

                    <h1>Fijn dat je er <span>weer bent.</span></h1>

                    <p className="auth-subtitle">
                        Log in en ontdek welke woningen het beste
                        aansluiten bij jouw wensen.
                    </p>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label htmlFor="email">E-mailadres</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="naam@voorbeeld.nl"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="password">Wachtwoord</label>

                            <div className="password-field">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Vul je wachtwoord in"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    autoComplete="current-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Verberg wachtwoord" : "Toon wachtwoord"}
                                >
                                    {showPassword ? "Verberg" : "Toon"}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="form-alert error-message" role="alert">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="form-alert success-message" role="status">
                                {success}
                            </div>
                        )}

                        <button
                            className="auth-submit"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Bezig met inloggen..." : "Inloggen →"}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Nog geen account?{" "}
                        <button type="button" onClick={onRegister}>
                            Maak een account aan
                        </button>
                    </p>
                </div>

                <p className="auth-footer">
                    © 2026 WoningMatch
                </p>
            </section>

            <aside className="auth-visual">
                <div className="visual-decoration visual-decoration-one" />
                <div className="visual-decoration visual-decoration-two" />

                <div className="visual-content">
                    <div className="visual-tag">
                        ✦ SLIMMER WONINGEN VINDEN
                    </div>

                    <h2>Een woning die <em>écht</em> bij je past.</h2>

                    <p>
                        Geen eindeloos zoeken. Ontdek woningen die passen
                        bij jouw persoonlijke woonvoorkeuren.
                    </p>

                    <div className="visual-preview">
                        <div className="preview-icon">⌂</div>
                        <div>
                            <span className="preview-label">JOUW IDEALE MATCH</span>
                            <strong>Jouw wensen, jouw thuis.</strong>
                            <small>Persoonlijk · Slim · Overzichtelijk</small>
                        </div>
                        <span className="preview-check">✓</span>
                    </div>
                </div>

                <div className="visual-bottom">
                    WoningMatch — Vind jouw plek.
                </div>
            </aside>
        </main>
    );
}

export default Login;
