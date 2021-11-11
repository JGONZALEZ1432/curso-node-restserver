const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares')


const { esRoleValido,emailExiste,existeUsuarioPorId } = require('../helpers/db-validator');




const { userGet, 
    userPut, 
    userPost, 
    userDelete, 
    userPatch } = require('../controllers/user');



    const router = Router();


router.get('/',userGet );
router.put('/:id',[
    check('id','No es un Id Valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],userPut);
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser más de 6 letras').isLength({min:6}),
    check('correo','el correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], userPost);
router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTA_ROLE','OTRO_ROL'),
    check('id','No es un Id Valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],userDelete);
router.patch('/',userPatch);

module.exports = router;