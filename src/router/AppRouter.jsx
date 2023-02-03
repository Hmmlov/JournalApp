
import { Route, Routes } from "react-router-dom";
/* Rutas */
import { AuthRoutes } from "../auth/routes";
import { JournalRoutes } from "../journal/routes";

export const AppRouter = () => {
  return (
    <Routes> 
        {/* Login y Registro*/}
        <Route path="/auth/*" element={<AuthRoutes />}/>

        {/* Journal-App */}

        <Route path="/*" element={<JournalRoutes />}/>

    </Routes>
  );
};
