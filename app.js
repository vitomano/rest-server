require('dotenv').config()
const cors = require('cors')
const express = require('express')
const fileUpload = require('express-fileupload')
const { dbConnection } = require('./database/configDB')
const app = express()


//Conectar a base de datos
dbConnection()

 
//Middlewares
app.use(cors())
app.use(express.json()) //Lectura y parse del body
app.use(express.static('public')) //Directorio Público
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true
})) //Fileupload - Carga de archivos


//Routes
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/usuarios', require('./routes/usuarios.route'))
app.use('/api/categorias', require('./routes/categorias.route'))
app.use('/api/productos', require('./routes/productos.route'))
app.use('/api/buscar', require('./routes/buscar.route'))
app.use('/api/uploads', require('./routes/uploads-route'))


 
app.listen(process.env.PORT, ()=> {
    console.log(`Server in Port`, process.env.PORT)
})