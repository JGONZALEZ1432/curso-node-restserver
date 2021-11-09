const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuarios');

const validarJWT  =async(req, res=response, next)=>{
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    try{
        const {uid} =  jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        //leer el usuario que corresponde al uid
        const usuario =  await Usuario.findById(uid);

        //usuario no existente
        if(!usuario){
            return res.status(401).json({
                msg:'Token No valido - usuario no existe en DB'
            })
        }

        //usuario no ha sido boorado
            if(!usuario.estado){
                return res.status(401).json({
                    msg:'Token No valido - Usuario con estado falso'
                })
            }

        
        req.usuario =usuario;

    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    console.log(token);
    next();
    }
module.exports = {
    validarJWT
}