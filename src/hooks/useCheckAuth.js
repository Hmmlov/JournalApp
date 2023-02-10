/* Firebase autentificación*/
import { onAuthStateChanged } from "@firebase/auth";
/* React - Redux */
import { useDispatch, useSelector } from "react-redux";
/* React UseEffect */
import { useEffect } from "react";
/* Ruta de configuración de Firebase */
import { FirebaseAuth } from "../firebase/config";
/* Carpeta Store/auth - Autentificación */
import { login, logout } from "../store/auth";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });
  }, []);
  /* otra forma  */
  /* return status;  */
  return {
    status
  }
};
