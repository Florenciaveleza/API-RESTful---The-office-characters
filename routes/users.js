import express from 'express';
import verifyToken from '../middlewares/auth.js';
import {userList, findByName, findUser, createUser, updateUser, deleteUser, limitUsers, sortByEmail} from '../controllers/users_controller.js';
// import Joi from 'joi';

const route = express.Router();

//Obtenemos todos los usuarios registrados
route.get('/', verifyToken, (req, res) => {
    let result = userList();
    result.then(users => {
        res.json({
            users
        })
    }).catch(err => {
        res.status(400).json({err})
    })
})

//Paginado
route.get('/limit-users', verifyToken, (req, res) => {
    let result = limitUsers(req.query.limit);
    result.then(value => {
        res.json(value)
    }).catch(err => {
        res.status(400).json(err)
    })
});

//Ordenamiento
//Ordenamos mostrando primero el último mail registrado
route.get('/sort-by-email', verifyToken, (req, res) => {
    let result = sortByEmail();
    result.then(value => {
        res.json(value)
    }).catch(err => {
        res.status(400).json(err)
    })
})


//Buscamos usuarios por id
route.get('/:id', verifyToken, (req, res) => {
    let result = findUser(req.params.id);
    result.then(value => {
        res.json(value);
    }).catch(err => {
        res.status(400).json({err})
    })
})

//Buscamos usuarios por su nombre
route.get('/name/:name', verifyToken, (req, res) => {
    let result = findByName(req.params.name);
    result.then(value => {
        res.json(value);
    }).catch(err => {
        res.status(400).json({err})
    })
})

//Creación de usuarios
route.post('/', verifyToken, (req, res) => {
    let body = req.body;
    let result = createUser(body);
    result.then(user => {
        res.json({
            value: user
        })
    }).catch(err => {
        res.status(400).json({err})
    })
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
        res.status(400).json({err})
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
        res.status(400).json(err)
    })
})


export default route;