
import { useState } from "react";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useAuth } from "./authorization/userAuth";

function App() {
    const { user, loading } = useAuth();
    const [page, setPage] = useState<"login" | "register">("login");

    if (loading) {
        return <p>Gebruiker controleren...</p>;
    }

    if (user) {
        return (
            <main style={{ padding: "40px" }}>
                <h1>Welkom, {user.name}!</h1>
                <p>E-mailadres: {user.email}</p>
                <p>Rol: {user.role}</p>
            </main>
        );
    }

    return page === "login" ? (
        <Login onRegister={() => setPage("register")} />
    ) : (
        <Register onLogin={() => setPage("login")} />
    );
}

export default App;
