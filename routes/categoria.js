const express = require('express');
const router = express.Router();

const CategoriaModel = require('../models/categoria')

router.post('/', async(req, res, next) => {
    const categoria = new CategoriaModel({
        nombre: req.body.nombre.toUpperCase()
    });
    try {
        const categoriaGuardada = await categoria.save();
        res.status(201).json(categoriaGuardada);
    } catch (error) {
        res.status(413);
        res.send('"faltan datos", "ese nombre de categoria ya existe", "error inesperado"')
        next(error);
    }
});

router.get('/', async(req, res, next) => {
    try {
        const categoria = await CategoriaModel.find();
        res.status(200).json(categoria);
    } catch (error) {
        res.status(413);
        res.send(error, { mensaje: 'Error inesperado' });
        next();
    }
});

router.get('/:id', async(req, res) => {
    try {
        res.status(200).send('Categoria con id pedido');
        //const respuesta = await categoriaModel.find();
    } catch (error) {
        res.status(413).send(error, { mensaje: 'Error inesperado, Categoria no encontrada' });
    }
});

router.delete('/:id', async(req, res) => {
    try {
        res.status(200).send({ mensaje: 'Se borro correctamente' });
        //const respuesta = await categoriaModel.find();
    } catch (error) {
        res.status(413).send(error, { mensaje: 'Error inesperado, Categoria con libros asociados no se puede eliminar, No existe Categoria indicada' });
    }
});

module.exports = router;