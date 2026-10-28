
import { useState, type FormEvent, type ChangeEvent } from "react";
import { isAxiosError } from "axios";
import { accountService } from "../../services/AccountService";
import type { RegisterDTO } from "../../contracts/Account/RegisterDTO";
import "./Register.css";

type RegisterProps = {
    onLogin: () => void;
};

function Register({ onLogin }: RegisterProps) {
    const [formData, setFormData] = useState<RegisterDTO>({
        name: "",
        dateOfBirth: "",
        location: "",
        email: "",
        password: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (formData.password.length < 8) {
            setError("Het wachtwoord moet minimaal 8 tekens bevatten.");
            return;
        }

        if (formData.password !== confirmPassword) {
            setError("De wachtwoorden komen niet overeen.");
            return;
        }

        setLoading(true);

        try {
            await accountService.register(formData);

            setSuccess("Je account is succesvol aangemaakt! Je kunt nu inloggen.");

            setFormData({
                name: "",
                dateOfBirth: "",
                location: "",
                email: "",
                password: "",
            });

            setConfirmPassword("");
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                if (!err.response) {
                    setError("Kan geen verbinding maken met de backend.");
                } else {
                    setError(
                        `Registratie mislukt (HTTP ${err.response.status}). Controleer je gegevens.`
                    );
                }
            } else {
                setError("Er is een onverwachte fout opgetreden.");
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

                <div className="auth-content register-content">
                    <div className="auth-eyebrow">
                        BEGIN JE ZOEKTOCHT
                    </div>

                    <h1>Vind jouw <span>nieuwe thuis.</span></h1>

                    <p className="auth-subtitle">
                        Maak gratis een account aan en ontdek woningen
                        die aansluiten bij jouw wensen.
                    </p>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label htmlFor="name">Volledige naam</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Voor- en achternaam"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="name"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label htmlFor="dateOfBirth">Geboortedatum</label>
                                <input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    max={new Date().toLocaleDateString("en-CA")}
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="location">Locatie</label>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    placeholder="Bijv. Tilburg"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <label htmlFor="register-email">E-mailadres</label>
                            <input
                                id="register-email"
                                name="email"
                                type="email"
                                placeholder="naam@voorbeeld.nl"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="register-password">Wachtwoord</label>

                            <div className="password-field">
                                <input
                                    id="register-password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Minimaal 8 tekens"
                                    value={formData.password}
                                    onChange={handleChange}
                                    minLength={8}
                                    autoComplete="new-password"
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

                        <div className="form-field">
                            <label htmlFor="confirmPassword">Herhaal wachtwoord</label>
                            <input
                                id="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="Vul je wachtwoord opnieuw in"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                autoComplete="new-password"
                                required
                            />
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
                            {loading ? "Account aanmaken..." : "Account aanmaken →"}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Al een account?{" "}
                        <button type="button" onClick={onLogin}>
                            Inloggen
                        </button>
                    </p>
                </div>

                <p className="auth-footer">© 2026 WoningMatch</p>
            </section>

            <aside className="auth-visual">
                <div className="visual-decoration visual-decoration-one" />
                <div className="visual-decoration visual-decoration-two" />

                <div className="visual-content">
                    <div className="visual-tag">
                        ✦ JOUW WOONWENSEN CENTRAAL
                    </div>

                    <h2>Jouw zoektocht. <em>Onze match.</em></h2>

                    <p>
                        Stel jouw persoonlijke woonvoorkeuren in en
                        ontdek welke woningen het beste bij je passen.
                    </p>

                    <div className="visual-preview">
                        <div className="preview-icon">⌂</div>

                        <div>
                            <span className="preview-label">WONINGMATCH</span>
                            <strong>Meer dan alleen zoeken.</strong>
                            <small>Ontdek woningen op basis van jouw wensen.</small>
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

export default Register;
