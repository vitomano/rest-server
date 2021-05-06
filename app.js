require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()

 
//Middlewares
app.use(cors())
app.use(express.json()) //Lectura y parse del body
app.use(express.static('public')) //Directorio Público

//Routes
app.use('/api/usuarios', require('./routes/usuarios'))

 
app.listen(process.env.PORT, ()=> {
    console.log(`Servidor en puerto`, process.env.PORT)
})