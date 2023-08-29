import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useNavigate } from 'react-router-dom'

import '../index.css';
import axios from 'axios';
import swal from '@sweetalert/with-react';

const Cards = (props) => {
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
      axios.post(`/api/updateResource?id=${props.ID}&description=${descriptionInp}&field=${fieldInp}&construction=${constructionInp}&address=${constructionInp}&contactPhone=${contactPhoneInp}&contactMail=${contactMailInp}&bathrooms=${bathroomsInp}&bedrooms=${bedroomsInp}&parkingLots=${parkingLotsInp}&hash=${sessionStorage.getItem("token")}&user=${sessionStorage.getItem("username")}`)
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

  const Delete = () => {

    swal({
      title: "Eliminando recurso",
      text: "¿Estás seguro de querer eliminar este recurso?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.post(`/api/deleteResource?id=${props.ID}&user=${sessionStorage.getItem("username")}&hash=${sessionStorage.getItem("token")}`)
            .then(res => {
              swal("Eliminado", "El recurso ha sido eliminado", "success");
              navigate("/listado", { replace: true });
              refreshPage();
            });
        };
      });
  };
  return (
    <>

      <Card sx={{ maxWidth: 275, minWidth: 200, margin: "10px" }}>
        <CardActions className='botonesCard'>
          <Button size="small" onClick={handleClickOpen}>Update</Button>
          <Button size="small" onClick={Delete}>Delete</Button>
        </CardActions>
        <CardContent>
          <Typography variant="h5" component="div">

          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Dirección: {props.Address}
          </Typography>
          <Typography variant="body2">
            {props.Description}
          </Typography>
          <Typography variant="body2">
            Campo: {props.Field}
          </Typography>
          <Typography variant="body2">
            Construcción: {props.Construction}
          </Typography>
          <Typography variant="body2">
            Baños: {props.Bathrooms}
          </Typography>
          <Typography variant="body2">
            Habitaciones: {props.Bedrooms}
          </Typography>
          <Typography variant="body2">
            Estacionamiento: {props.ParkingLots}
          </Typography>

          <Typography variant="h6">
            Contacto:
          </Typography>
          <Typography variant="body2">
            Email: {props.ContactPhone}
          </Typography>
          <Typography variant="body2">
            Telefono: {props.ContactMail}
          </Typography>


        </CardContent>

      </Card>
      <Dialog open={open} onClose={handleClose} sx={{ minWidth: 500 }}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <form onSubmit={submitHandler}>
            <Stack spacing={1}>
              <p>Dirección:</p>
              <TextField id="addressInput" label="" variant="standard" defaultValue={props.Address} />
              <p>Descripción:</p>
              <TextField id="descriptionInput" label="" variant="standard" defaultValue={props.Description} />
              <p>Campo:</p>
              <TextField id="fieldInput" label="" variant="standard" defaultValue={props.Field} />
              <p>Construcción:</p>
              <TextField id="constructionInput" label="" variant="standard" defaultValue={props.Construction} />
              <p>Baños:</p>
              <TextField id="bathroomsInput" label="" variant="standard" defaultValue={props.Bathrooms} />
              <p>Habitaciones:</p>
              <TextField id="bedroomsInput" label="" variant="standard" defaultValue={props.Bedrooms} />
              <p>Estacionamiento:</p>
              <TextField id="parkingLotsInput" label="" variant="standard" defaultValue={props.ParkingLots} />
              <p>Email:</p>
              <TextField id="contactMailInput" label="" variant="standard" defaultValue={props.ContactMail} />
              <p>Telefono:</p>
              <TextField id="contactPhoneInput" label="" variant="standard" defaultValue={props.ContactPhone} />

            </Stack>
            <Button size="small" type="submit">Editar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>


  );
}

export default Cards;