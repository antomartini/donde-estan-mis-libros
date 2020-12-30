const mongoose = require('mongoose');

const PersonaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    alias: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    versionKey: false
});
const PersonaModel = mongoose.model('persona', PersonaSchema);

module.exports = PersonaModel;