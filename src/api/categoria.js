const express = require('express');
const router = express.Router();

const CategoriaModel = require('../models/categoria')

// POST '/categoria' recibe: {nombre: string} 
// retorna: status: 200, {id: numerico, nombre: string} - 
// status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "ese nombre de categoria ya existe", "error inesperado"

router.post('/', async(req, res, next) => {
    try {
        //Validacion de datos
        if(!req.body.nombre || req.body.nombre == '' ) {
            res.status(413).send({message:"Faltan datos por completar"});
        }

        const categoria = new CategoriaModel({
            nombre: req.body.nombre.toUpperCase()
        });
        const categoriaGuardada = await categoria.save();
        res.status(200).json(categoriaGuardada);
        console.log(categoriaGuardada);
    } catch (error) {
        res.status(413).send({message:"Ese nombre de categoria ya existe"});
        next(error);
    }
});

// GET '/categoria' retorna: status 200  y [{id:numerico, nombre:string}]  - status: 413 y []
router.get('/', async(req, res, next) => {
    try {
        const categoria = await CategoriaModel.find();
        res.status(200).json(categoria);
        console.log(categoria);
    } catch (error) {
        res.status(413)//.send("Mensaje:'Error inesperado'");
        next(error);
    }
});


//GET '/categoria/:id' retorna: status 200 y {id: numerico, nombre:string} - status: 413, {mensaje: <descripcion del error>} que puede ser: "error inesperado", "categoria no encontrada"

router.get('/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const categoria = await CategoriaModel.findById(id);
        res.status(200).json(categoria);
    } catch (error) {
        res.status(413);res.send({message:"Categoria no encontrada"});
        next(error);
    }
});

//  DELETE '/categoria/:id' retorna: status 200 y {mensaje: "se borro correctamente"} - status: 413, {mensaje: <descripcion del error>} que puese ser: "error inesperado", "categoria con libros asociados, no se puede eliminar", "no existe la categoria indicada"

router.delete('/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const categoriaBorrada = await CategoriaModel.findByIdAndDelete(id);
        res.status(200).json(categoriaBorrada);
        console.log('Se borro correctamente');
    } catch (error) {
        res.status(413).send({ mensaje: 'No existe Categoria indicada' });
        next(error);
    }
});

module.exports = router;