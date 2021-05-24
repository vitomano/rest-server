const { response } = require("express")

const Categoria = require('../models/categoria')


const todasCategorias = async (req, res = response) => {

    const { limit = 5, desde = 0 } = req.query

    const query = { estado: true }

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.json({
        total,
        categorias
    })

}



//Obtener categoría - populate{}
const categoriaId = async (req, res = response) => {

    const { id } = req.params

    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre')

    res.json({
        categoria
    })
}


const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre })


    if (categoriaDB) {
        return res.status(400).json({
            msg: `La catogría ${categoriaDB.nombre} ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)

    //Guarda DB
    await categoria.save()

    res.status(201).json(categoria)

}


//Actualizar categoría
const categoriaPut = async (req, res = response) => {

    const id = req.params.id
    const { estado, usuario, ...data } = req.body

    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id

    const newCategoria = await Categoria.findByIdAndUpdate(id, data, {new: true})

    res.json(newCategoria)
}

//Borrar categoría - estado: false
const deleteCategoria = async (req, res = response) => {

    const id = req.params.id

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {
        estado: false
    }, {new: true} )

    res.json({
        categoriaBorrada
    })
}



module.exports = {
    crearCategoria,
    todasCategorias,
    categoriaId,
    categoriaPut,
    deleteCategoria
}