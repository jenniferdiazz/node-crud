const express = require('express');
const bodyParser = require('body-parser')
const app=  express();

//configurar el body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

require('dotenv').config()

const port = process.env.PORT || 3000;


const mongoose = require('mongoose');

//url de conexion
const uri=`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.1y8z3.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, 
{useNewUrlParser: true, useUnifiedTopology: true}
)
.then(()=>console.log('Base de datos conectada'))
.catch(e=>console.log(e))

//motor de plantillas ejs
app.set('view engine','ejs');

//INDICAR donde estan las plantillas
app.set('views', __dirname + '/views');

//con __dirname hace referencia a las rutas de caarpetas dinamicas(leera las rutas dentro del hostiing que se esta usando)
//es un midlewares porque esta ejecutando una 
app.use(express.static(__dirname+"/public"));


//rutas de la web o de la api
app.use('/', require('./router/RutasWeb'));
app.use('/mascotas', require('./router/Mascotas'));
app.use((req, res, next)=>{
    res.status(404).render("404",
    {
        titulo:"404",
        descripcion: "Titulo del sitio web"
    })
})

//el servidor escuuchado:
app.listen(port,()=>{
    console.log('servidor en el puerto', port)
})











/*2-------------------------------------------------------------------------
funcion flecha es un callback que recibe un requerimiento y una respuesta
const http = require('http');
const server = http.createServer((req, res)=>{
    res.end('estoy respondiendo a tu solicitud')
})

const puerto =3000;
server.listen(puerto,  ()=>{
    console.log('escuchando solicitudes')
})*

/*1-------------------------
const {frutas, dinero} = require('./frutas')

const cowsay =require("cowsay");
console.log(cowsay.say({
    text: "I'm a moooodule",
    e:"oO",
    T:"U"
}));
frutas.forEach(item=>{
    console.count(item)
})

console.log(dinero)*/