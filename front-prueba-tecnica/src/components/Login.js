import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import swAlert from '@sweetalert/with-react'
import axios from 'axios';

import { useNavigate } from 'react-router-dom'


const styleCardLogin = { margin: "auto" }

const Login = () => {
    let navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        const username = e.target.usernameTextField.value;
        const password = e.target.passwordTextField.value;
        if(username === "" || password === ""){
            swAlert(
                <h2>Campos vacios</h2>
            );
            // return;
        }
        axios.post(`/api/login?username=${username}&password=${password}`,)
        .then(res=>{
            if(res.data.code == 1){
                swAlert(
                    <h2>Error en tus credenciales</h2>
                );
            }else{
                sessionStorage.setItem("username",res.data.user);
                sessionStorage.setItem("token",res.data.hash);
                navigate("../listado", { replace: true });
            }
        }); 

    };

    return (
        <>
            {/* Navbar */}
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Prueba Tecnica
                        </Typography>
                        {/* <Button color="inherit">Registro</Button> */}
                    </Toolbar>
                </AppBar>
            </Box>
            {/* Formulario */}
            <Card sx={{ maxWidth: 275 }} style={styleCardLogin}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Iniciar sesión
                    </Typography>

                    <form onSubmit={submitHandler}>
                        <Stack spacing={2}>

                        <TextField id="usernameTextField" label="Usuario" variant="standard" />

                        <TextField id="passwordTextField" label="Contraseña" type="password" variant="standard" />
                        
                        <Button size="small" type="submit">Iniciar sesión</Button>
                        </Stack>
                    </form>

                </CardContent>
            </Card>
        </>

    );
}

export default Login;