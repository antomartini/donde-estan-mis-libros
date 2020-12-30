const noEncontrado = (req, res, next) => {
    res.status(404);
    const error = new Error(`No encontrado: ${req.originalUrl}`);
    next(error);
};

const manejadorDeErrores = (err, req, res, next) => {
    const statusCode = res.statusCode != 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? 'No te pueden modtrar' : err.stack
    });
}

module.exports = {
    noEncontrado,
    manejadorDeErrores
}