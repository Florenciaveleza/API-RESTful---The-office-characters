import express from 'express';
import verifyToken from '../middlewares/auth.js';
import {userList, findByName, findUser, createUser, updateUser, deleteUser, limitUsers, sortByEmail} from '../controllers/users_controller.js';
import Joi from 'joi';

const route = express.Router();

//Validaciones de Joi para la creación de usuarios.
const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),

    password: Joi.string()
              .pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')),
    email: Joi.string()
           .email({minDomainSegments: 2, tlds: {allow: ['com', 'edu', 'ar']}})
});


//Obtenemos todos los usuarios registrados
route.get('/', verifyToken, (req, res) => {
    let result = userList();
    result.then(users => {
        res.json({
            users
        })
    }).catch(err => {
        res.status(400).json({err, message: "Hubo un problema al intentar obtener la lista de usuarios."})
    })
})

//Paginado
//Limitamos la cantidad de documentos a devolver en una query
//También en la query incluimos la página actual
//http://localhost:3000/users/limit-users?page=num&limit=num
route.get('/limit-users', verifyToken, (req, res) => {
    let result = limitUsers(req.query.page , req.query.limit);
    result.then(value => {
        res.json(value)
    }).catch(err => {
        res.status(400).json({err, message: "La solicitud de paginación y límite de resultados es incorrecta. Asegúrate de incluir los parámetros 'page' y 'limit' en la consulta y proporcionar valores válidos."})
    })
});

//Ordenamiento
//Ordenamos mostrando primero el último mail registrado
route.get('/sort-by-email', verifyToken, (req, res) => {
    let result = sortByEmail();
    result.then(value => {
        res.json(value)
    }).catch(err => {
        res.status(400).json({err, message: "Se ha producido un error al intentar ordenar los usuarios."})
    })
})


//Buscamos usuarios por id
route.get('/:id', verifyToken, (req, res) => {
    let result = findUser(req.params.id);
    result.then(value => {
        res.json(value);
    }).catch(err => {
        res.status(400).json({err, message: "No se encontró el usuario solicitado"})
    })
})

//Buscamos usuarios por su nombre
route.get('/name/:name', verifyToken, (req, res) => {
    let result = findByName(req.params.name);
    result.then(value => {
        res.json(value);
    }).catch(err => {
        res.status(400).json({err, message: "No se encontró el usuario solicitado"})
    })
})

//Creación de usuarios
route.post('/', (req, res) => {
    let body = req.body;
    const {error, value} = schema.validate({
        name: body.name,
        email: body.email,
        password: body.password
    })
    if(!error) {
        let result = createUser(body);
        result.then(user => {
        res.json({
            value: user
        })
        }).catch(err => {
            res.status(400).json({err, message: "Se ha producido un error al intentar crear un nuevo usuario. Por favor, verificá los datos proporcionados."})
    })
    } else {
        res.status(400).json({
            error
        })
    }
    
})

//Modifición de información del usuario
//Permite modificar nombre y contraseña
route.put('/:email', verifyToken, (req, res) => {
    let result = updateUser(req.body, req.params.email);
    result.then(value => {
        res.json({
            value
        })
    }).catch(err => {
        res.status(400).json({err, message: "Se ha producido un error al intentar modificar el email. Por favor, verificá los datos proporcionados."})
    })
})

//Eliminar usuario por id
route.delete('/:id', verifyToken, (req, res) => {
    let result = deleteUser(req.params.id);
    result.then(value => {
        res.json({
            value
        })
    }).catch(err => {
        res.status(400).json({err, message: "El usuario solicitado no existe"})
    })
})


export default route;