const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mascotaSchema = new Schema({
    nombre: String,
    descripcion: String
})
//crear modelo:nombre + esquema
const Mascota = mongoose.model('Mascota', mascotaSchema);

module.exports = Mascota;
//usar modelo en la rutas