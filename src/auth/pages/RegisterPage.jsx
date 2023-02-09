import { Grid, TextField, Link, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout";

const formData = {
    email: 'miguel@gmail.com',
    password: '123456',
    displayName: 'Miguel Martin'
  }

const formValidations = {
  email: [(value) => value.includes('@'),'El Correo debe de contener un @'],
  password: [(value) => value.length >=6 ,'El password debe de tener más de 6 letras'],
  displayName: [(value) => value.length >=1 ,'El nombre es obligatorio'],
}


export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);


  console.log({displayNameValid});

  

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;

    console.log(formState);

  } 

  return (
    <AuthLayout title="Register">
      <h1>FormValid: {isFormValid ? 'Valido' : 'Incorrecto'}</h1>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Hmmlov"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted} //doble negación para convertilo en un booleano 
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="You@Email.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted} //doble negación para convertilo en un booleano 
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted} //doble negación para convertilo en un booleano 
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button 
                type="submit"
                variant="contained" 
                fullWidth>
                Registrarse
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{mr:1}}>¿Ya tienes una cuenta de Jornal?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
