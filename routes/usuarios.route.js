
const { Router } = require('express')
const { check } = require('express-validator')

const validarCampos = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { esAdminRol, tieneRol } = require('../middlewares/validar-roles')

const { validRole, emailExist, idUserExist } = require('../helpers/db-validators')

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete } = require('../controllers/usuarios.controller')

const router = Router()

router.get('/', usuariosGet)

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom(emailExist),
        check('rol').custom(validRole),
        validarCampos
], usuariosPost)

router.put('/:id', [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(idUserExist),
        check('rol').custom(validRole),
        validarCampos
], usuariosPut)

router.delete('/:id', [
        validarJWT,
        //esAdminRol,
        tieneRol('ADMIN_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(idUserExist),
        validarCampos
], usuariosDelete)


module.exports = router