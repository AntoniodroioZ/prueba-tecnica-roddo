import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import swal from '@sweetalert/with-react';

import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom';




const Header = (props) => {
    const cerrarSesion = () => {

        swal({
            title: "¿Estás seguro?",
            text: "¿Estás seguro de querer cerrar tu sesión?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    sessionStorage.clear();
                    navigate('/', { replace: true });
                }
            });

    }
    let navigate = useNavigate();

    let token = sessionStorage.getItem('token');

    return (
        <>
            {!token && <Navigate to="/" />}
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Prueba Tecnica
                        </Typography>
                        <div>
                            <Typography component="div" sx={{ flexGrow: 1 }}>
                                Bienvenido {sessionStorage.getItem('username')}
                            </Typography>
                            <Button onClick={cerrarSesion} color="inherit">Cerrar sesión</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default Header;