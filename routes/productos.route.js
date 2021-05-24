const { Router, response } = require('express')
const { check } = require('express-validator')

const validarCampos = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const { esAdminRol } = require('../middlewares/validar-roles')
const { todosProductos, crearProducto, obtenerProducto, actualizarProducto, eliminarProducto, productoSinStock } = require('../controllers/productos.controller')
const { idProdExist, idCatExist } = require('../helpers/db-validators')


const router = Router()

// Obtener todos los productos - publico
router.get('/', todosProductos)


// Para obetener un producto por id
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(idProdExist),
    validarCampos
],obtenerProducto)


//Crear Producto - privado - cualquier con token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El id no existe').isMongoId(),
    check('categoria').custom(idCatExist),
    validarCampos
],crearProducto)


//Actualizar por id - privado - cualquier con token válido
router.put('/:id', [
    validarJWT,
    //check('categoria', 'La categoría no existe').isMongoId(),
    check('id').custom(idProdExist),
    //check('categoria').custom(idCatExist),
    validarCampos
], actualizarProducto)


//Borrar Producto
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(idProdExist),
    validarCampos
],eliminarProducto)

//Sin Stock
router.delete('/stock/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(idProdExist),
    validarCampos
],productoSinStock)



module.exports = router;