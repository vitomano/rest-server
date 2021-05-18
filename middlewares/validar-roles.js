const { response } = require("express");


const esAdminRol = async(req, res = response, next) => {

    if( !req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar primero'
        })
    }

    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        })
    }

    
    next()
}


const tieneRol = (...roles) => {

    return (req, res = response, next) => {

        if( !req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar primero'
            })
        }

        if( !roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de esots roles ${ roles }`
            })
        }

        next()
    }

}


module.exports = {
    esAdminRol,
    tieneRol
}


