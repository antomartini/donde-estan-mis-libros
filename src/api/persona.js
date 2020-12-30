const express = require('express');
const router = express.Router();

const PersonaModel = require('../models/persona');

//POST '/persona' recibe: {nombre: string, apellido: string, alias: string, email: string} 
//retorna: status: 200, {id: numerico, nombre: string, apellido: string, alias: string, email: string} 
// status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "el email ya se encuentra registrado", "error inesperado"
router.post('/', async (req, res, next) => {
    try {
        //Validacion de datos
        if (!req.body.nombre || req.body.nombre == '') {
            res.status(413).send("Falta el nombre por completar");
        }
        if (!req.body.apellido || req.body.apellido == '') {
            res.status(413).send("Falta el apellido por completar");
        }
        if (!req.body.alias || req.body.alias == '') {
            res.status(413).send("Falta el alias por completar");
        }
        if (!req.body.email || req.body.email == '') {
            res.status(413).send("Falta el email por completar");
        }

        const persona = new PersonaModel({
            nombre: req.body.nombre.toUpperCase(),
            apellido: req.body.apellido.toUpperCase(),
            alias: req.body.alias.toUpperCase(),
            email: req.body.email.toLowerCase()
        });

        const existePersona = await PersonaModel.findOne({email: req.body.email.toLowerCase()});
        console.log("Existe Persona: ", existePersona);
        if (existePersona) {
            res.status(413).send({message:"El email ya se encuentra registrado"});
        }

        const personaGuardada = await persona.save();
        res.status(200).json(personaGuardada);

    } catch (error) {
        res.status(413).send({message:"Error Inesperado"});
        next(error);
    }
});

// GET '/persona' retorna status 200 y [{id: numerico, nombre: string, apellido: string, alias: string, email; string}] o bien status 413 y []
router.get('/', async (req, res) => {
    try {
        const persona = await PersonaModel.find();
        res.status(200).json(persona);
    } catch (error) {
        res.status(413);
        next(error);
    }
});

//GET '/persona/:id' retorna status 200 y {id: numerico, nombre: string, apellido: string, alias: string, email; string} - status 413 , {mensaje: <descripcion del error>} "error inesperado", "no se encuentra esa persona"
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const persona = await PersonaModel.findById(id);
        res.status(200).json(persona);
    } catch (error) {
        res.status(413).send({message:"Esa persona no se encuentra"})
        next(error);
    }
});

// PUT '/persona/:id' recibe: {nombre: string, apellido: string, alias: string, email: string} el email no se puede modificar. retorna status 200 y el objeto modificado o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "no se encuentra esa persona"

router.put('/:id', async (req, res) => {
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

//DELETE '/persona/:id' retorna: 200 y {mensaje: "se borro correctamente"} o bien 413, {mensaje: <descripcion del error>} "error inesperado", "no existe esa persona", "esa persona tiene libros asociados, no se puede eliminar"

router.delete('/:id', async (req, res, next) => {
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