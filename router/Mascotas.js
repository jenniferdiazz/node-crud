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
router.get('/crear', (req, res)=>{
    res.render('crear')
})

//recibe informacion de nuestro sitio web

router.post('/', async (req, res)=>
{
    //recibe lo que viene del formulario
    const body = req.body
    
    //ahora se debe escribir en la base de datos
    try{
        //al modelo mascota le pasamos el body
        const mascotaDB = new Mascota(body)
        await mascotaDB.save()
        //console.log(mascotaDB)
        //ewmpuja al usuario a una ruta que nosotros queramos
        res.redirect('/mascotas')

    }catch{
        
    }

})
//obtener informacion
router.get('/:id', async(req, res)=>{
    //aca va la leer la id que estara en el url /mascotas/id -> nos devolveria la info de un unico doc
    //en mongodb los id estan con guion bajo
    const id= req.params.id
    try{
        const mascotaDB = await Mascota.findOne({_id: id})
        //console.log(mascotaDB);
        res.render('detalle',{
            mascota:mascotaDB,
            error:false
        })
    }catch(error){
        console.log(error)
        res.render('detalle',{
            error:true,
            mensaje: 'No se encuentra el id seleccionado'
        })
    }
})

router.delete('/:id', async(req, res)=>{
    const id = req.params.id
    try{
        const mascotaDB= await Mascota.findByIdAndDelete({_id:id})
        if(mascotaDB){
            //si hacemos un redirect altiro saldra error
            //como hacemos un json tendremos que hacer un fetch que vamos a configurar en una ruta en especifico
            res.json({
                estado:true,
                mensaje:"eliminado!"
            })

        }else{
            res.json({
                estado:false,
                mensaje:'fallo eliminar!'
            })

        }

    }catch{

    }
})

//el async porque espera la respuesta de la db
router.put('/:id', async(req,res)=>{
    const id = req.params.id
    //el body son los campos que vienen de nuestros input
    const body = req.body
    try{
        const mascotaDB = await Mascota.findByIdAndUpdate(id, body,{ useFindAndModify:false})
        console.log(mascotaDB)
        res.json({
            estado:true,
            mensaje:'Editado'
        })
    }catch(error){
        console.log(error)
        res.json({
            estado:false,
            mensaje:'fallo'
        })

    }
})

module.exports = router;