const Role = require('../models/rol')
const Usuario = require('../models/usuario')
const Categoria = require('../models/categoria')
const Producto = require('../models/producto')


const validRole = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El Rol ${rol} no está registrado en la base de datos`)
    }
}

const emailExist = async ( correo = '' ) => {

    const existeEmail = await Usuario.findOne({ correo: correo })

    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado`)
        }
}

const idUserExist = async ( id ) => {

    const existeUser = await Usuario.findById(id)

    if (!existeUser) {
        throw new Error(`El id no existe ${id}`)
        }
}

const idCatExist = async ( id ) => {

    const existeCat = await Categoria.findById(id)

    if (!existeCat) {
        throw new Error(`El id no existe ${id}`)
        }
}

const idProdExist = async ( id ) => {

    const existeProd = await Producto.findById(id)

    if (!existeProd) {
        throw new Error(`El id no existe ${id}`)
        }
}

const coleccionesPermitidas = async(coleccion='', colecciones = []) => {

    const incluida = colecciones.includes(coleccion)

    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida`)
    }

    return true

}


module.exports = {
    validRole,
    emailExist,
    idUserExist,
    idCatExist,
    idProdExist,
    coleccionesPermitidas
    //catExist
}


