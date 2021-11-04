const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarios');




const userGet = async(req,res)=>{
    //const {q , nombre='No name' , apikey , page = 1 , limit = 1} = req.query;
    const {limit = 5, desde = 5 } = req.query;
    const query = {estado: true}




    const [total, usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limit))

    ]);

    res.json({
        total,
        usuarios
    });
}

const userPost = async(req,res)=>{

const {nombre, correo, password, rol} = req.body;
const usuario = new Usuario({nombre, correo, password, rol});
//verificar si el corre existe


// encriptar la constraseña
const salt = bcryptjs.genSaltSync();
usuario.password = bcryptjs.hashSync(password,salt);
//Guardar en base de detos

    await usuario.save();

    res.json({
        usuario   
    });
}
const userPut = async(req,res)=>
{
    
    const {id} = req.params;
    const { _id,password,google,correo, ...resto} = req.body;

    //TODO VALIDAR CONTRA LA BASE DE DATOS
    if (password){
        //encriptatr contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);    
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto) 
    res.json({
        usuario
    });
}
const userPatch = (req,res)=>{
    res.json({
        msg:'patch Api . controlador'
    });
}
const userDelete = async(req , res = response)=>{

    const { id }= req.params;
    //fisicamente lo borramos
   // const usuario = await Usuario.findByIdAndDelete(id);
   const usuario = await Usuario.findByIdAndUpdate(id,{estado: false});
    res.json({
       usuario
    });
}


module.exports={
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}