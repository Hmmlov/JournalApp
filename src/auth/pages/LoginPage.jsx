import {useMemo} from 'react';
/* ---------- React Redux ----------*/
import { useDispatch, useSelector } from "react-redux";
/* ---------- React Router ----------*/
import {Link as RouterLink} from "react-router-dom";
/* ---------- importación de material ui ----------*/
import { Google } from "@mui/icons-material";
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material";
/* ---------- Hooks ----------*/
import { useForm } from "../../hooks";
/* ---------- Store/auth/index ----------*/
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";
/* ---------- Layour reutilizable ----------*/
import { AuthLayout } from "../layout/AuthLayout";
export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth)


  const dispatch = useDispatch();

  const {email, password, onInputChange} = useForm({
    email: '',
    password: '',

  })

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (e) => {
    event.preventDefault();
    /* console.log({email, password}); */
    // No es esta accióna despachar
    dispatch(startLoginWithEmailPassword({email, password}));
  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch(startGoogleSignIn());
  }


  return (
    <AuthLayout title="Login">
         <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={12} sx={{ mt:2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="You@Email.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt:2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="contraseña"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </Grid>
            <Grid container>
              <Grid item xs={12} sx={{mt: 1 }} display={ !!errorMessage ? '' : 'none'}>
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
            </Grid>
            

            <Grid container spacing={2} sx={{mb:2, mt:1}}>
              <Grid item xs={12} sm={6}>
                <Button
                  disabled = {isAuthenticating}
                  type="submit" 
                  variant='contained' 
                  fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  disabled = {isAuthenticating}
                  onClick={onGoogleSignIn} 
                  variant='contained'
                  fullWidth
                >
                  <Google />
                  <Typography sx={{ml:1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={RouterLink} color='inherit' to='/auth/register'>Crear una cuenta</Link>
            </Grid>

          </Grid>
        </form>
    </AuthLayout>
  );
};
