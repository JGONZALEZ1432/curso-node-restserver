const { response } = require("express");
const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt')

const login = async(req, res = response ) =>{
    const {correo, password} = req.body;
    try{
        //verificar si el emalil existe
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){ //SI EL CORREO NO EXISTE
            return res.status(400).json({
                msg: 'Uusario / passsword no son correctos'
            })
        }

        //si el usuario está activo
        if(usuario.estado === false){ // SI EL USUARIO ESTA EN FALSE 
            return res.status(400).json({
                msg: 'Uusario / passsword no son correctos - estado: false'
            })
        }
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Uusario / passsword no son correctos - password'
            })
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        msg: 'Login ok',
        token
    }) 
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'hable con el administrador'
        })
    }


}

module.exports = {
    login
} 