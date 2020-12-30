const express = require('express');
const router = express.Router();

const PersonaModel = require('../models/persona');

//POST '/persona' recibe: {nombre: string, apellido: string, alias: string, email: string} 
//retorna: status: 200, {id: numerico, nombre: string, apellido: string, alias: string, email: string} 
// status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "el email ya se encuentra registrado", "error inesperado"
router.post('/', async(req, res, next) => {
    const persona = new PersonaModel({
        nombre: req.body.nombre.toUpperCase(),
        apellido: req.body.apellido.toUpperCase(),
        alias: req.body.alias.toUpperCase(),
        email: req.body.email.toLowerCase()
    });
    try {
        //Validacion de datos
        if(!req.body.nombre || req.body.nombre == '' ) {
            res.send("Falta el nombre por completar");
        }
        if(!req.body.apellido || req.body.apellido == '' ) {
            res.send("Falta el apellido por completar");
        }
        if(!req.body.alias || req.body.alias == '' ) {
            res.send("Falta el alias por completar");
        }
        if(!req.body.email || req.body.email == '' ) {
            res.send("Falta el email por completar");
        }
        const personaGuardada = await persona.save();
        res.status(200).json(personaGuardada);
    } catch (error) {
        res.status(413);
        res.send("El email ya se encuentra registrado");
        next(error);
    }
});

router.get('/', async(req, res) => {
    try {
        const persona = await PersonaModel.find();
        res.status(200).json(persona);
    } catch (error) {
        res.status(413);
        res.send("mensaje: 'Error inesperado'");
        next(error)
    }
});
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const persona = await PersonaModel.findById(id);
        res.status(200).json(persona);
    } catch (error) {
        res.status(413);
        res.send("mensaje: 'Error inesperado', 'No se encuentra esa persona'");
        next(error)
    }
});


router.put('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const updatedPersona = await PersonaModel.findByIdAndUpdate(id, {
            nombre: req.body.nombre.toUpperCase(),
            apellido: req.body.apellido.toUpperCase(),
            alias: req.body.alias.toUpperCase(),
        }, { new: true });
        res.status(200).json(updatedPersona);
    } catch (error) {
        console.log(error);
        res.status(413).send("mensaje: 'Error inesperado', 'Solo se pude modificar la descripcion del libro'");
        next(error);
    }
});

router.delete('/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const personaBorrada = await PersonaModel.findByIdAndDelete(id);
        res.status(200).json(personaBorrada);
        console.log('Se borro correctamente');
    } catch (error) {
        res.status(413).send(error, { mensaje: 'Error inesperado, No existe esa persona, Esa persona tiene libros asociados no se puede eliminar' });
        next(error);
    }
});

module.exports = router;