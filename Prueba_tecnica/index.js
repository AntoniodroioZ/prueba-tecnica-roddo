import express from 'express'; //importamos express 

import { conectar, selectAll, register, login, createResource, deleteResource, updateResource } from './src/bd_connection.js'; //importamos el objeto de conexión

const app = express();
let data;
// Iniciando el servidor
app.listen('8000', function () {
    console.log('Aplicacion iniciada en el puerto 8000');
});

app.get('/', function (req, res) {
    res.send("Prueba");
})

app.post('/api/login', async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    let resultQuery = await login(username, password);


    res.send(resultQuery);
})

app.post('/api/register', async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    let resultQuery = await register(username, password);
    if (resultQuery == true) {
        res.send({
            "message": "Registro exitoso",
            "code": 0,
        });
    } else if (resultQuery == false) {
        res.send({
            "message": "El nombre de usuario ya esta en uso, pruebe con otro.",
            "code": 1,
        });
    }
    else {
        res.send({
            "message": "Algo ha ocurrido, intente de nuevo.",
            "code": 10
        });
    }

})

app.get('/api/getAll', async (req, res) => {
    const user = req.query.user;
    const hashToken = req.query.hash;

    const data = await selectAll(user, hashToken);
    res.send(data);
});

app.post('/api/createResource', async (req, res) => {
    let bandera = true;
    let newResource = new Object();
    const user = req.query.user;
    const hashToken = req.query.hash;

    if(req.query.description.length == 0 || req.query.address.length == 0 || req.query.contactPhone.length == 0 || req.query.contactMail.length === 0){
        bandera = false;
        res.send({
            "message": "El recurso no se pudo agregar correctamente, intente de nuevo",
            "code":1
        });
    } else{
        newResource.description = req.query.description;
        newResource.address = req.query.address;
        newResource.contactPhone = req.query.contactPhone;
        newResource.contactMail = req.query.contactMail;
    }
    if(req.query.field == "" || typeof parseInt(req.query.field) != "number" || Number.isNaN(parseInt(req.query.field))==true){
        bandera = false;
        res.send({
            "message": "El recurso no se pudo agregar correctamente, intente de nuevo",
            "code":1
        });
    }else{
        newResource.field = req.query.field;
    }
    if(req.query.construction == "" || typeof parseInt(req.query.construction) != "number" || Number.isNaN(parseInt(req.query.construction))==true){
        bandera = false;
        res.send({
            "message": "El recurso no se pudo agregar correctamente, intente de nuevo",
            "code":1
        });
    }else{
        newResource.construction = req.query.construction;
    }
    if(req.query.bathrooms == "" || typeof parseInt(req.query.bathrooms) != "number" || Number.isNaN(parseInt(req.query.bathrooms))==true){
        bandera = false;
        res.send({
            "message": "El recurso no se pudo agregar correctamente, intente de nuevo",
            "code":1
        });
    }else{
        newResource.bathrooms = req.query.bathrooms;
    }
    if(req.query.bedrooms == "" || typeof parseInt(req.query.bedrooms) != "number" || Number.isNaN(parseInt(req.query.bedrooms))==true){
        bandera = false;
        res.send({
            "message": "El recurso no se pudo agregar correctamente, intente de nuevo",
            "code":1
        });
    }else{
        newResource.bedrooms = req.query.bedrooms;
    }
    if(req.query.parkingLots == "" || typeof parseInt(req.query.parkingLots) != "number" || Number.isNaN(parseInt(req.query.parkingLots))==true){
        bandera = false;
        res.send({
            "message": "El recurso no se pudo agregar correctamente, intente de nuevo",
            "code":1
        });
    }else{
        newResource.parkingLots = req.query.parkingLots;
    }

    const data = await createResource(newResource,bandera,user,hashToken);

    if (data == true && bandera == true) {
        res.send({
            "message": "Recurso agregado correctamente",
            "code":0
        });
    }else if(data == 0){
        res.send({
            "message": "No tienes autorización para hacer esta acción",
            "code":2
        });
    }
});

app.post('/api/deleteResource', async (req,res)=>{
    const id = req.query.id;
    const user = req.query.user;
    const hashToken = req.query.hash;
    const data = await deleteResource(id,user,hashToken);
    
    if(data){
        res.send({
            "message": "Recurso eliminado correctamente",
            "code":0
        });
    } else{
        res.send({
            "message": "No tienes autorización para hacer esta acción",
            "code":2
        });
    }
})

app.post('/api/updateResource', async (req,res)=>{
    const id = req.query.id;
    const user = req.query.user;
    const hashToken = req.query.hash;
    let bandera = true;

    let editResource = new Object();

    if(req.query.description.length == 0 || req.query.address.length == 0 || req.query.contactPhone.length == 0 || req.query.contactMail.length === 0){
        bandera = false;
        res.send({
            "message": "El recurso no se pudo agregar correctamente, intente de nuevo",
            "code":1
        });
    } else{
        editResource.description = req.query.description;
        editResource.address = req.query.address;
        editResource.contactPhone = req.query.contactPhone;
        editResource.contactMail = req.query.contactMail;
    }
    if(req.query.field == "" || typeof parseInt(req.query.field) != "number" || Number.isNaN(parseInt(req.query.field))==true){
        bandera = false;
        res.send({
            "message": "El recurso no se pudo agregar correctamente, intente de nuevo",
            "code":1
        });
    }else{
        editResource.field = req.query.field;
    }
    if(req.query.construction == "" || typeof parseInt(req.query.construction) != "number" || Number.isNaN(parseInt(req.query.construction))==true){
        bandera = false;
        res.send({
            "message": "El recurso no se pudo agregar correctamente, intente de nuevo",
            "code":1
        });
    }else{
        editResource.construction = req.query.construction;
    }
    if(req.query.bathrooms == "" || typeof parseInt(req.query.bathrooms) != "number" || Number.isNaN(parseInt(req.query.bathrooms))==true){
        bandera = false;
        res.send({
            "message": "El recurso no se pudo agregar correctamente, intente de nuevo",
            "code":1
        });
    }else{
        editResource.bathrooms = req.query.bathrooms;
    }
    if(req.query.bedrooms == "" || typeof parseInt(req.query.bedrooms) != "number" || Number.isNaN(parseInt(req.query.bedrooms))==true){
        bandera = false;
        res.send({
            "message": "El recurso no se pudo agregar correctamente, intente de nuevo",
            "code":1
        });
    }else{
        editResource.bedrooms = req.query.bedrooms;
    }
    if(req.query.parkingLots == "" || typeof parseInt(req.query.parkingLots) != "number" || Number.isNaN(parseInt(req.query.parkingLots))==true){
        bandera = false;
        res.send({
            "message": "El recurso no se pudo agregar correctamente, intente de nuevo",
            "code":1
        });
    }else{
        editResource.parkingLots = req.query.parkingLots;
    }

    const data = await updateResource(editResource,id,bandera,user,hashToken);

    if (data == true && bandera == true) {
        res.send({
            "message": "Recurso editado correctamente",
            "code":0
        });
    }else if(data == 0){
        res.send({
            "message": "No tienes autorización para hacer esta acción",
            "code":2
        });
    }
})