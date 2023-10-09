import express from 'express';
import User from '../models/users_models.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const route = express.Router();

route.post('/', (req,res) => {
    User.findOne({email: req.body.email})
    .then(data => {
        if(data) {
            const validPass = bcrypt.compareSync(req.body.password, data.password);
            if(!validPass) {
                return res.status(400).json({
                    message: 'Contraseña incorrecta'
                })        
            }
            const jwToken = jwt.sign({
                user: {_id: data._id, name: data.name, email: data.email}
            }, process.env.SEED, {expiresIn: process.env.EXPIRATION})
            res.json({
                user:{
                    _id: data._id, 
                    nombre: data.nombre, 
                    email: data.email
                },
                jwToken
            })

        } else {
            res.status(400).json({
                message: 'Usuario incorrecto'
            })        
        }
    }).catch(err => {
        res.status(400).json({
            message: 'Error en el servicio'
        })    
    })
})

export default route;