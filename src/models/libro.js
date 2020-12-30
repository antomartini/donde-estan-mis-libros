const mongoose = require('mongoose');

const LibroSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    categoria_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoria',
        required: true
    }],
    persona_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'persona',
        required: false
    }]

}, {
    versionKey: false
});
const LibroModel = mongoose.model('libro', LibroSchema);

module.exports = LibroModel;