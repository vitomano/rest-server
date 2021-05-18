const {response} = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const { generarJWT } = require('../helpers/generar-jwt')


const login = async(req, res = response) => {

    const { correo, password } = req.body

    try {

        //Verficar si el email existe
        const usuario = await Usuario.findOne({correo})

        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //Si el usuario está activo
        if( usuario.estado === false ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)

        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id)

        res.json({
            msg: 'Login Ok',
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login
}