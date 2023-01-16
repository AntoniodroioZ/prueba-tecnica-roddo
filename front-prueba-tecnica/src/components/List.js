import Header from "./Header";
import Cards from "./Cards";

import '../index.css';

import React from "react";

import Container from '@mui/material/Container';
import axios from "axios";

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import swal from '@sweetalert/with-react';

const List = () => {
    const [dataApi, setDataApi] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    let navigate = useNavigate();

    const refreshPage = () => {
        window.location.reload();
    }

    const elementos = [];

    React.useEffect(() => {
        axios.get(`http://18.216.205.212:8000/api/getAll?user=${sessionStorage.getItem("username")}&hash=${sessionStorage.getItem("token")}`)
            .then(res => {
                const apiData = res.data;
                setDataApi(apiData);
                // console.log(dataApi);
            });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        const addressInp = e.target.addressInput.value;
        const descriptionInp = e.target.descriptionInput.value;
        const fieldInp = e.target.fieldInput.value;
        const constructionInp = e.target.constructionInput.value;
        const bathroomsInp = e.target.bathroomsInput.value;
        const bedroomsInp = e.target.bedroomsInput.value;
        const parkingLotsInp = e.target.parkingLotsInput.value;
        const contactMailInp = e.target.contactMailInput.value;
        const contactPhoneInp = e.target.contactPhoneInput.value;
        console.log(addressInp,descriptionInp,fieldInp,constructionInp,bathroomsInp,bedroomsInp,parkingLotsInp,contactMailInp,contactPhoneInp);
    
        if(addressInp!="" && descriptionInp!="" && fieldInp!=""&&constructionInp!="" && bathroomsInp!="" && bedroomsInp!=""&& parkingLotsInp!=""&&contactMailInp!=""&&contactPhoneInp!=""){
          axios.post(`http://18.216.205.212:8000/api/createResource?&description=${descriptionInp}&field=${fieldInp}&construction=${constructionInp}&address=${constructionInp}&contactPhone=${contactPhoneInp}&contactMail=${contactMailInp}&bathrooms=${bathroomsInp}&bedrooms=${bedroomsInp}&parkingLots=${parkingLotsInp}&hash=${sessionStorage.getItem("token")}&user=${sessionStorage.getItem("username")}`)
          .then(res=>{
            if(res.data.code == 0){
                  navigate("/listado", { replace: true });
                  refreshPage();
            }else{
              swal("Error", "Algo ha ocurrido, intente de nuevo con datos validos.", "error");
            }
          })
        }
      }
    Object.keys(dataApi).forEach(function (key, idx) {
        // elementosJson.push(dataApi[key]);
        // console.log(dataApi[key].ID)
        elementos.push(
            <Cards key={key} ID={dataApi[key].ID} Address={dataApi[key].Address} Description={dataApi[key].Description} Field={dataApi[key].Field} Construction={dataApi[key].Construction} Bathrooms={dataApi[key].Bathrooms} ContactPhone={dataApi[key].ContactPhone} ContactMail={dataApi[key].ContactMail} Bedrooms={dataApi[key].Bedrooms} ParkingLots={dataApi[key].ParkingLots} />
        );
    })

    return (
        <div>
            <Header />
            <Container fixed >
                <div className="listCard">
                    {/* <Cards /> */}
                    {elementos}
                </div>
                <a className="btn-flotante" onClick={handleClickOpen}>Nuevo</a>
            </Container>

            <Dialog open={open} onClose={handleClose} sx={{ minWidth: 500 }}>
                <DialogTitle>Editar</DialogTitle>
                <DialogContent>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={1}>
                            <p>Dirección:</p>
                            <TextField id="addressInput" label="" variant="standard" defaultValue="Address" />
                            <p>Descripción:</p>
                            <TextField id="descriptionInput" label="" variant="standard" defaultValue="Description" />
                            <p>Campo:</p>
                            <TextField id="fieldInput" label="" variant="standard" defaultValue="Field" />
                            <p>Construcción:</p>
                            <TextField id="constructionInput" label="" variant="standard" defaultValue="Construction" />
                            <p>Baños:</p>
                            <TextField id="bathroomsInput" label="" variant="standard" defaultValue="Bathrooms" />
                            <p>Habitaciones:</p>
                            <TextField id="bedroomsInput" label="" variant="standard" defaultValue="Bedrooms" />
                            <p>Estacionamiento:</p>
                            <TextField id="parkingLotsInput" label="" variant="standard" defaultValue="ParkingLots" />
                            <p>Email:</p>
                            <TextField id="contactMailInput" label="" variant="standard" defaultValue="ContactMail" />
                            <p>Telefono:</p>
                            <TextField id="contactPhoneInput" label="" variant="standard" defaultValue="ContactPhone" />

                        </Stack>
                        <Button size="small" type="submit">Agregar</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default List;