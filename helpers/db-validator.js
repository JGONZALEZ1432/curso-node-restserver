const Role = require('../models/role');
const Usuario = require('../models/usuarios');

const esRoleValido = async(rol= '')=>{
    const existeRol =  await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} No se encuentra regitrado`)
    }
}



const emailExiste = async(correo = '')=>{
    const existeMail = await Usuario.findOne({correo});
    if(existeMail){
        throw new Error(`Este correo ya esta regsitrado`)
    }
}


const existeUsuarioPorId = async(id)=>{
    const existeusuario = await Usuario.findById(id);
    if(!existeusuario){
        throw new Error(`El id no existe`)
    }
}


module.exports={
    esRoleValido,emailExiste,existeUsuarioPorId
}