import express from 'express';
import verifyToken from '../middlewares/auth.js';
import {userList, findByName, findUser, createUser, updateUser, deleteUser} from '../controllers/users_controller.js'

const route = express.Router();

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

route.get('/:id', verifyToken, (req, res) => {
    let result = findUser(req.params.id);
    result.then(value => {
        res.json(value);
    }).catch(err => {
        res.status(400).json({err})
    })
})

route.get('/name/:name', verifyToken, (req, res) => {
    let result = findByName(req.params.name);
    result.then(value => {
        res.json(value);
    }).catch(err => {
        res.status(400).json({err})
    })
})

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

//Filtros 
route.get('/:name', verifyToken, (req, res) => {
    let result = filterByName(req.params.name);
    result.then(value => {
        res.json(value)
    }).catch(err => {
        res.status(400).json(err)
    })
})


export default route;