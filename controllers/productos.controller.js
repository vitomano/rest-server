const { response } = require("express")
const { check } = require('express-validator')
const Categoria = require("../models/categoria")

const Producto = require('../models/producto')

// Obtener todos los productos
const todosProductos = async (req, res = response) => {

    const { limit = 5, desde = 0 } = req.query

    const query = { estado: true }

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.json({
        total,
        productos
    })
}

//Obtener producto id
const obtenerProducto = async (req, res = response) => {

    const { id } = req.params

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')

    res.json({
        producto
    })


}

//Crear producto
const crearProducto = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body

    const productoDB = await Producto.findOne({ nombre: body.nombre })

    if (productoDB) {
        res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        })
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data)

    await producto.save()

    res.status(201).json(producto)
}


//Actualizar Producto
const actualizarProducto = async (req, res = response) => {

    const { id } = req.params

    const { estado, usuario, ...resto } = req.body

    if (resto.nombre) {
        resto.nombre = resto.nombre.toUpperCase();
    }

    
    resto.usuario = req.usuario._id

    const producto = await Producto.findByIdAndUpdate(id, resto, { new: true })
        .populate('categoria', 'nombre')

    res.json({
        producto
    })
}

//Eliminar producto
const eliminarProducto = async (req, res = response) => {

    const id = req.params.id

    const productoBorrado = await Producto.findByIdAndUpdate(id, {
        estado: false
    }, { new: true })

    res.json({
        productoBorrado
    })
}


//Sin Stock
const productoSinStock = async (req, res = response) => {

    const id = req.params.id

    const productoStock = await Producto.findByIdAndUpdate(id, {
        stock: false
    }, { new: true })

    res.json({
        productoStock
    })
}




module.exports = {
    todosProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    productoSinStock
}