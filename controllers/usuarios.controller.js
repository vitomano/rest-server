const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')


//GET
const usuariosGet = async (req, res = response) => {


    const { limit = Usuario.countDocuments(), desde = 0 } = req.query
    //const { limit = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.json({
        total,
        usuarios
    })
}

// POST
const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar base de datos
    await usuario.save();

    res.json({
        msg: 'post API - Controlador',
        usuario
    })
}

//PUT
const usuariosPut = async (req, res = response) => {

    const id = req.params.id
    const { _id, password, google, correo, ...resto } = req.body

    //Validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario)
}


//DELETE
const usuariosDelete = async(req, res = response) => {

    const {id} = req.params

    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate( id, {
        estado: false
    })

    res.json(usuario)
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}



