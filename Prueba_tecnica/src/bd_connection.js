
import mysql from 'mysql'; //importamos la libreria de mysql
import bcrypt from 'bcryptjs' //importamos bcryptjs para el hash de contraseñas 
import e, { query } from 'express';
let data;
//Creación de conexión a la BD
const conn = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'prueba_tecnica_roddo'
    }
);

// Verificamos la conexión a la BD
const conectar = () => {
    conn.connect(err => {
        if (err) throw err;
        console.log("conectado");
    })
    conn.end();
}

// Login de usuarios
const login = async (username, password) => {
    let hashLogin = await bcrypt.hash(username, 10);
    const queryUser = `SELECT * FROM users WHERE Username = "${username}"`;
    return new Promise((resolve, reject) => {
        conn.query(queryUser, (err, result, fields) => {
            if (err) return reject(err);
            if (result == 0) {
                return resolve(
                    {
                        "message": "Tu usuario o contreseñas no son validos.",
                        "code": "1"
                    });
            } else {
                let compare = bcrypt.compareSync(password, result[0].Password);
                if (compare) {
                    return resolve(
                        {
                            "message": "Acceso permitido",
                            "code": "0",
                            "user": username,
                            "hash": hashLogin
                        });
                } else {
                    return resolve(
                        {
                            "message": "Tu usuario o contreseñas no son validos.",
                            "code": "1"
                        });
                }
            }
            // console.log(result)
        });
    });
}

// Registro de nuevos usuarios
const register = async (username, password) => {
    let passwordHashed = await bcrypt.hash(password, 8);
    const verificaUser = `SELECT * FROM users WHERE Username = "${username}"`;
    const queryRegistro = `INSERT INTO users(Id, Password, Username, CreatedDate, DeletedDate) VALUES (NULL,'${passwordHashed}','${username}',current_timestamp(), current_timestamp())`;
    return new Promise((resolve, reject) => {
        conn.query(verificaUser, (err, result, fields) => {
            if (err) return reject(err);
            if (result == 0) {
                conn.query(queryRegistro, (err, result, fields) => {
                    if (err) return reject(err);
                });
                return resolve(true);
            } else {
                return resolve(false);
            }
        });
    });
}

// Seleccionamos todos los elementos de la BD y verificamos que tenga permisos para poder acceder por medio de un hash generado con base al nombre de usuario
const selectAll = (user, token) => {
    const sql = "SELECT * FROM real_state_list";
    let compare = bcrypt.compareSync(user, token);
    if (compare) {
        // console.log(true);
        return new Promise((resolve, reject) => {

            conn.query(sql, (err, result, fields) => {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    } else {
        return (
            {
                "message": "No tienes permiso para acceder a estos datos.",
                "code": 2
            })
    }
}

// Creacion de un nuevo recurso en la tabla "real_state_list" y verificación de permiso para la acción
const createResource = async (bandera, user, hash, description,address,contactPhone,contactMail,field,construction,bathrooms,bedrooms,parkingLots) => {
    let compare = bcrypt.compareSync(user, hash);
    if (bandera, compare) {
        const queryCreate = `INSERT INTO real_state_list (ID, Description, Field, Construction, Address, ContactPhone, ContactMail, Bathrooms, Bedrooms, ParkingLots, CreatedDate, DeletedDate) VALUES (NULL,'${description}','${field}','${construction}','${address}','${contactPhone}','${contactMail}','${bathrooms}','${bedrooms}','${parkingLots}',current_timestamp(),'null')`;
        return new Promise((resolve, reject) => {
            conn.query(queryCreate, (err, result, fields) => {
                if (err) return reject(err);
                return resolve(true);
            })
        })
    } else {
        return false;
    }
}

// Borrar un recurso en la tabla "real_state_list" y verificación de permiso para la acción
const deleteResource = async (id, user, hash) => {
    let compare = bcrypt.compareSync(user, hash);
    if (compare) {
        const queryDelete = `DELETE FROM real_state_list WHERE ID = ${id}`;
        return new Promise((resolve, reject) => {
            conn.query(queryDelete, (err, result, fields) => {
                if (err) return reject(err);
                return resolve(true);
            })
        })
    } else {
        return false;
    }
}

// Actualizar un recurso en la tabla "real_state_list" y verificación de permiso para la acción
const updateResource = async (id,bandera,user,hash, description, address, contactPhone, contactMail, field, construction, bathrooms, bedrooms,parkingLots) => {
    let compare = bcrypt.compareSync(user, hash);
    if (bandera, compare) {
        const queryUpdate = `UPDATE real_state_list SET Description='${description}',Field='${field}',Construction='${construction}',Address='${address}',ContactPhone='${contactPhone}',ContactMail='${contactMail}',Bathrooms='${bathrooms}',Bedrooms='${bedrooms}',ParkingLots='${parkingLots}',DeletedDate='null' WHERE ID = ${id}`
        return new Promise((resolve, reject) => {
            conn.query(queryUpdate, (err, result, fields) => {
                if (err) return reject(err);
                return resolve(true);
            })
        })
    } else {
        return false;
    }
}
export { conectar, selectAll, register, login, createResource, deleteResource, updateResource };