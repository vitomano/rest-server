require('dotenv').config()
const cors = require('cors')
const express = require('express')
const { dbConnection } = require('./database/configDB')
const app = express()


//Conectar a base de datos
dbConnection()

 
//Middlewares
app.use(cors())
app.use(express.json()) //Lectura y parse del body
app.use(express.static('public')) //Directorio Público


//Routes
app.use('/api/usuarios', require('./routes/usuarios'))


 
app.listen(process.env.PORT, ()=> {
    console.log(`Server in Port`, process.env.PORT)
})