const { Router } = require('express')
const { check } = require('express-validator')

const validarCampos = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const { crearCategoria, todasCategorias, categoriaId, categoriaPut, deleteCategoria } = require('../controllers/categorias.controller')
const { idCatExist } = require('../helpers/db-validators')
const { esAdminRol } = require('../middlewares/validar-roles')


const router = Router()

// Obtener todas las categorias - publico
router.get('/', todasCategorias)


// Para obetener una categoria por id
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(idCatExist),
    validarCampos
], categoriaId)


//Crear categoria - privado - cualquier con token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria
)

//Actualizar por id - privado - cualquier con token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(idCatExist),
    validarCampos
], categoriaPut)

//Borrar una categoría
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(idCatExist),
    validarCampos
],deleteCategoria)




module.exports = router;