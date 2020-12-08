const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    //res.send('Mi respuesta desde express')
    res.render("index", {titulo: "mi titulo dinamico"})
})

router.get('/servicios', (req,res)=>{
    //res.send('estas en servicios')
    res.render("servicios",{tituloServicio: "mensaje dinamico  de servicio"})
})

module.exports = router;