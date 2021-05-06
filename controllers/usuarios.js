const {response} = require('express')

//GET
const usuariosGet = (req, res=response) => {

    const {q, nombre='No name', apikey, page="1", limit} = req.query

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

// POST
const usuariosPost = (req, res=response) => {

    const {nombre, edad} = req.body

    res.json({
        msg: 'post API - Controlador',
        nombre,
        edad,
    })
}

//PUT
const usuariosPut = (req, res=response) => {

    const id = req.params.id

    res.json({
        msg: 'put API - Controlador',
        id
    })
}

//PATCH
const usuariosPatch = (req, res=response) => {
    res.json({
        msg: 'patch API - Controlador'
    })
}

//DELETE
const usuariosDelete = (req, res=response) => {
    res.json({
        msg: 'delete API - Controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}



