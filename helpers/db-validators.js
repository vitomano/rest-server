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

// const catExist = async ( nombre ) => {

//     const estaCat = await Categoria.findOne({nombre})

//     if (!estaCat) {
//         throw new Error(`La categoria ${nombre} no existe`)
//         }

//     req.categoria = nombre

// }


module.exports = {
    validRole,
    emailExist,
    idUserExist,
    idCatExist,
    idProdExist,
    //catExist
}


