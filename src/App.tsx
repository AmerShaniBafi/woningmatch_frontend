
import { useState } from "react";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  const [page, setPage] = useState<"login" | "register">("login");

  return (
      <>
        {page === "login" ? (
            <Login onRegister={() => setPage("register")} />
        ) : (
            <Register onLogin={() => setPage("login")} />
        )}
      </>
  );
}

export default App;