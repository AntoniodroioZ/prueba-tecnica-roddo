import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


const styleCardLogin={margin:"auto"}

const Login = () => {
    return (
        <>
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
                        <Button color="inherit">Register</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Card sx={{ maxWidth: 275 }} style={styleCardLogin}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Login
                    </Typography>

                    
                    <TextField id="standard-basic" label="Username" variant="standard" />
                    
                    <TextField id="standard-basic" label="Password" type="password" variant="standard" />
                    
                </CardContent>
                <CardActions>
                    <Button size="small">Login</Button>
                </CardActions>
            </Card>
        </>

    );
}

export default Login;