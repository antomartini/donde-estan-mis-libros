const express = require('express');
const router = express.Router();

const LibroModel = require('../models/libro');
const Categoria = require('../models/categoria');

//POST '/libro' recibe: {nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null}
// devuelve 200 y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null}
//o bien status 413,  {mensaje: <descripcion del error>} que puede ser "error inesperado", "ese libro ya existe",
// "nombre y categoria son datos obligatorios", "no existe la categoria indicada", "no existe la persona indicada"
router.post('/', async (req, res, next) => {
    try {
        //Validacion de datos
        if (!req.body.nombre || req.body.nombre == '' || !req.body.categoria_id || req.body.categoria_id == '') {
            res.status(413).send("Nombre y Categoria son datos obligatorios");
        }

        const libro = new LibroModel({
            nombre: req.body.nombre.toUpperCase(),
            descripcion: req.body.descripcion.toUpperCase(),
            categoria_id: req.body.categoria_id,
            persona_id: req.body.persona_id
        });

        //Validacion de categoria
        const categoriaValida = await Categoria.findById(req.body.categoria_id);
        if (!categoriaValida) {
            res.status(413).send({message: "La categoria no existe"});
        }
        const libroGuardado = await libro.save();
        res.status(200).json(libroGuardado);

    } catch (error) {
        res.status(413);
        //res.send('"ese libro ya existe", "nombre y categoria son datos obligatorios", "no existe la categoria indicada", "no existe la persona indicada"');
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const libro = await LibroModel.find()
        //const libro = await LibroModel.find().populate('persona_id');
        //populate muestra todos los datos de la persona que tiene el libro
        res.status(200).json(libro);
    } catch (error) {
        res.status(413);
        res.send("mensaje: 'Error inesperado'");
        next(error)
    }
});
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        //const libro = await LibroModel.findById(id);
        const libro = await LibroModel.findById(id).populate('persona_id');
        //populate muestra todos los datos de la persona que tiene el libro
        res.status(200).json(libro);
    } catch (error) {
        res.status(413);
        res.send("mensaje: 'Error inesperado, No se encuentra ese libro'");
        next(error)
    }
});


router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedLibro = await LibroModel.findByIdAndUpdate(id, { descripcion: req.body.descripcion.toUpperCase() }, { new: true });
        res.status(200).json(updatedLibro);
    } catch (error) {
        console.log(error);
        res.status(413).send("mensaje: 'Error inesperado', 'Solo se pude modificar la descripcion del libro'");
        next(error);
    }
});

router.put('/devolver/:id', async (req, res) => {
    try {
        res.status(200).send('Se Devolvio!!');
    } catch (error) {
        console.log(error);
        res.status(413).send({ mensaje: 'Error inesperado, No Se encuentra esa persona' });
    }
});

router.put('/prestar/:id', async (req, res) => {
    try {
        res.status(200).send('Se Presto!!');
    } catch (error) {
        console.log(error);
        res.status(413).send({ mensaje: 'Error inesperado, No Se encuentra esa persona' });
    }
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const libroBorrado = await LibroModel.findByIdAndDelete(id);
        res.status(200).json(libroBorrado);
        console.log('Se borro correctamente');
        //const respuesta = await categoriaModel.find();
    } catch (error) {
        res.status(413).send({ mensaje: 'Error inesperado, No se encuentra es libro, Ese libro eta prestado no se puede eliminar' });
        next(error);
    }
});

module.exports = router;