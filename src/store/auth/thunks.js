import { singInWithGoogle } from "../../firebase/providers";
/* importación de Store/Auth/index */
import { checkingCredentials, login, logout } from "./index"

export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

    }
}
export const startGoogleSignIn = () => {
    return async(dispatch) =>{
        dispatch(checkingCredentials());
        const result = await singInWithGoogle()
        if (!result.ok) dispatch(logout(result.errorMessage));
        
        dispatch(login(result))
    }
}

