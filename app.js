const express = require('express');
const app=  express();
const port = 3000;

//motor de plantillas ejs
app.set('view engine','ejs');

//INDICAR donde estan las plantillas
app.set('views', __dirname + '/views');

//con __dirname hace referencia a las rutas de caarpetas dinamicas(leera las rutas dentro del hostiing que se esta usando)
//es un midlewares porque esta ejecutando una 
app.use(express.static(__dirname+"/public"));



app.get('/', (req,res)=>{
    //res.send('Mi respuesta desde express')
    res.render("index", {titulo: "mi titulo dinamico"})
})

app.get('/servicios', (req,res)=>{
    //res.send('estas en servicios')
    res.render("servicios",{tituloServicio: "mensaje dinamico  de servicio"})
})

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