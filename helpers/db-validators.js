const Role = require('../models/rol')
const Usuario = require('../models/usuario')


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


module.exports = {
    validRole,
    emailExist,
    idUserExist
}


