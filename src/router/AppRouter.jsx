/* React - Router - Dom */
import { Navigate, Route, Routes } from "react-router-dom";
/* Ruta de autentificacion routes */
import { AuthRoutes } from "../auth/routes";
import { useCheckAuth } from "../hooks";
/* Carpeta Rutas Journal */
import { JournalRoutes } from "../journal/routes";
/* interfaz ui */
import { CheckingAuth } from "../ui/";

export const AppRouter = () => {
  /* si es de la otra forma no hay necesidad de desestructurarlo
  
  const status = useCheckAuth();
  
  */
  const {status} = useCheckAuth();
  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
      {/* Login y Registro*/}
      {/* <Route path="/auth/*" element={<AuthRoutes />}/> */}

      {/* Journal-App */}

      {/* <Route path="/*" element={<JournalRoutes />}/> */}
    </Routes>
  );
};
