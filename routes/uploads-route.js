const { Router } = require('express')
const { check } = require('express-validator')

const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads.controller')
const { coleccionesPermitidas } = require('../helpers/db-validators')
const { validarArchivoSubir } = require('../middlewares/validar-archivo')

const validarCampos = require('../middlewares/validar-campos')



const router = Router()

router.post('/',validarArchivoSubir ,cargarArchivo)

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'Debe ser un Mongo id').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos']) ),
    validarCampos
], actualizarImagenCloudinary)

router.get('/:coleccion/:id', mostrarImagen)

module.exports = router;
