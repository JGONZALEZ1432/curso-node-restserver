const {response} = require('express');


const userGet = (req,res)=>{
    const {q , nombre='No name' , apikey , page = 1 , limit = 1} = req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const userPost = (req,res)=>{
    const {nombre, edad} = req.body;
    console.log(req.body)
    res.json({
        msg:'post Api . controlador',
        nombre,
        edad     
    });
}
const userPut = (req,res)=>{
    const id = req.params.id;
    res.json({
        msg:'put Api . controlador',
        id
    });
}
const userPatch = (req,res)=>{
    res.json({
        msg:'patch Api . controlador'
    });
}
const userDelete = (req,res)=>{
    res.json({
        msg:'delete Api . controlador'
    });
}


module.exports={
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}