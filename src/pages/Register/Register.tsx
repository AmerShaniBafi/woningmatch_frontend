
import { useState, type FormEvent } from "react";
import { isAxiosError } from "axios";
import { accountService } from "../../services/AccountService";
import type { RegisterDTO } from "../../contracts/Account/RegisterDTO";
import "./Register.css";

function Register() {
    const [formData, setFormData] = useState<RegisterDTO>({
        name: "",
        dateOfBirth: "",
        location: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

        setLoading(true);

        try {
            await accountService.register(formData);

            setSuccess("Je account is succesvol aangemaakt!");

            setFormData({
                name: "",
                dateOfBirth: "",
                location: "",
                email: "",
                password: "",
            });

        } catch (error: unknown) {
            console.error("Registratiefout:", error);

            if (isAxiosError(error)) {
                console.log("HTTP-status:", error.response?.status);
                console.log("Backend-response:", error.response?.data);
                console.log("Axios-melding:", error.message);

                if (!error.response) {
                    setError("Kan geen verbinding maken met de backend.");
                } else {
                    setError(
                        `Registratie mislukt. HTTP-status: ${error.response.status}`
                    );
                }
            } else {
                setError("Er is een onverwachte fout opgetreden.");
            }
        }

    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h1>Account aanmaken</h1>
                <p>Maak een account aan bij WoningMatch.</p>

                <label htmlFor="name">Naam</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="dateOfBirth">Geboortedatum</label>
                <input
                    id="dateOfBirth"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    max={new Date().toLocaleDateString("en-CA")}
                    required
                />

                <label htmlFor="location">Locatie</label>
                <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">E-mailadres</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Wachtwoord</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                />

                {error && <p className="error-message" role="alert">{error}</p>}
                {success && <p className="success-message" role="status">{success}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Bezig met registreren..." : "Registreren"}
                </button>
            </form>
        </div>
    );
}

export default Register;
