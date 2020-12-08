const express = require('express');
//lo siguiente es un middleware el cual ocuparemos en vista
//no tan solo obtendra el Get sino que podra actualizar y eliminar
const router = express.Router();
const Mascota= require('../models/mascota');

//respuesta de la base de datos
router.get('/', async (req,res)=>{
    try{
        //espera al modelo, moongose traera la coleccion de mascotas de la db
        const arrayMascotasDB = await Mascota.find()
        console.log(arrayMascotasDB)
        res.render("mascotas",{
            arrayMascotas:arrayMascotasDB
        })
    }catch(error){
        console.log(error)
    }

    
})

module.exports = router;